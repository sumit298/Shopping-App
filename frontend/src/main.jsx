import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CounterProvider } from "./App/CounterContext.jsx";
import CartProvider from "./App/CartContext.jsx";
import { Provider } from "react-redux";
import Store from "./App/Redux/Store.js";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./App/ThemeContext.jsx";



import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-u2vfx43qcgcgoaeb.us.auth0.com";
const clientId = "6pMjsVj8m6CwMREp5WXDBG8I3i0xqtIN";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin + '/profile'
    }}
  >
    <React.StrictMode>
      <ThemeProvider>
        <CounterProvider>
          <CartProvider>
            <BrowserRouter>
              <Provider store={Store}>
                <App />
              </Provider>
            </BrowserRouter>
          </CartProvider>
        </CounterProvider>
      </ThemeProvider>
    </React.StrictMode>
  </Auth0Provider>
);
