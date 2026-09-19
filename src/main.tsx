import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cart.context";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/Store">
 HEAD
      <CartProvider>
        <App />
      </CartProvider>

      <App />
 41daa9639ec41d334c055bb8b1db0e11dd2022dd
    </BrowserRouter>
  </StrictMode>
);