import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CssBaseline } from "@mui/material";
import { CssVarsProvider } from "@mui/material/styles";

import App from "./App";
import theme from "./theme";
import { store, persistor } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssVarsProvider theme={theme} defaultMode="light">
          <CssBaseline enableColorScheme />
          <App />
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
