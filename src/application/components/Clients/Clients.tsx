/** @jsx jsx */

import { Fragment } from "react";
import { jsx, css } from "@emotion/react";
import { gql, useQuery } from "@apollo/client";
import { rem } from "polished";
import { Loading } from "../Cache/common/Loading";

import { SidebarLayout } from "../Layouts/SidebarLayout";
import { EntityList } from "./sidebar/EntityList";
import { SWITCH_CLIENT } from "../../../extension/constants";

const { Sidebar } = SidebarLayout;

const noDataStyles = css`
  margin-left: ${rem(12)};
  text-transform: uppercase;
  font-size: ${rem(13)};
  font-weight: normal;
  letter-spacing: ${rem(1)};
  color: var(--whiteTransparent);
  padding-top: ${rem(16)};
`;

const GET_CLIENTS = gql`
  query GetClients {
    clients @client {
      ids
      current
    }
  }
`;

const switchClient = (clientId: string): void => {
  window.dispatchEvent(
    new CustomEvent(SWITCH_CLIENT, {
      detail: {
        message: SWITCH_CLIENT,
        payload: clientId,
      },
    })
  );
};

export const receiveSwitchClient = (callback: () => void): (() => void) => {
  window.addEventListener(SWITCH_CLIENT, callback);

  return () => {
    window.removeEventListener(SWITCH_CLIENT, callback);
  };
};

export function Clients({ navigationProps }: {
  navigationProps: {
    queriesCount: number,
    mutationsCount: number,
  }
}): jsx.JSX.Element {
  const { loading, data } = useQuery(GET_CLIENTS);

  let currentClientId: string | null = null;
  let clientIds: Array<string> = [];

  if (!loading && data && data.clients) {
    currentClientId = data.clients.current;
    clientIds = data.clients.ids;
  }

  const dataExists = currentClientId && clientIds.length > 0;

  return (
    <SidebarLayout navigationProps={navigationProps}>
      <Sidebar navigationProps={navigationProps}>
        {loading ? (
          <Loading />
        ) : dataExists ? (
          <Fragment>
            <EntityList
              data={clientIds}
              clientId={currentClientId}
              setClientId={switchClient}
            />
          </Fragment>
        ) : (
          <h3 css={noDataStyles}>No clients available</h3>
        )}
      </Sidebar>
    </SidebarLayout>
  );
}
