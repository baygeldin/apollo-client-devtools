/** @jsx jsx */

import React from "react";
import { jsx, css } from "@emotion/react";
import { List } from "@apollo/space-kit/List";
import { ListItem } from "@apollo/space-kit/ListItem";
import { colors } from "@apollo/space-kit/colors";
import { rem } from "polished";

import { useTheme } from "../../../theme";

const listStyles = css`
  font-family: monospace;
  color: ${colors.silver.lighter};

  > div {
    height: ${rem(32)};
    font-size: ${rem(13)};
  }
`;

export function EntityList({ data, clientId, setClientId }) {
  const theme = useTheme();
  const ids = data;
  return (
    <List
      css={listStyles}
      selectedColor={theme.sidebarSelected}
      hoverColor={theme.sidebarHover}
    >
      {ids.map((listClientId: string, index) => {
        return (
          <ListItem
            key={`${listClientId}-${index}`}
            onClick={() => setClientId(listClientId)}
            selected={listClientId === clientId}
            highlighted={ids.includes(listClientId)}
          >
            {listClientId}
          </ListItem>
        );
      })}
    </List>
  );
}
