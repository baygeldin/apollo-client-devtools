import {
  initDevTools,
  writeData,
  handleReload,
  handleReloadComplete,
} from "../../application";
import {
  receiveSwitchClient,
} from "../../application/components/Clients/Clients";
import {
  receiveExplorerRequests,
  receiveSubscriptionTerminationRequest,
  sendResponseToExplorer,
} from "../../application/components/Explorer/explorerRelay";

(window as any).__DEVTOOLS_APPLICATION__ = {
  initialize: initDevTools,
  writeData,
  receiveExplorerRequests,
  receiveSubscriptionTerminationRequest,
  sendResponseToExplorer,
  handleReload,
  handleReloadComplete,
  receiveSwitchClient,
};
