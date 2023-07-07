import React from "react";
import ReactDOM from "react-dom/client";
import "./firebase/config"
import "./index.css";


import App from "./App";
import { ThemeContextProvider } from "./components/services/theme/theme.context";
import TranslationContextProvider from "./components/services/translation/translation.context";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TranslationContextProvider>
        <App />
      </TranslationContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
