// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { CssVarsProvider } from "@mui/material/styles";

import App from "./App.jsx";
import theme from "./theme.js";
import store from "./redux/store.js"; // مسیر خودت

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={theme} defaultMode="light">
        <CssBaseline enableColorScheme />
        <App />
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);
