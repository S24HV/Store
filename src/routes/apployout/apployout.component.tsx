import { Route, Routes } from "react-router-dom";

import Home from "../home/home.component";
import ProductPage from "../products-page/products-page.component";
import ItemPage from "../item-page/item-page.component";

function AppLoyout() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:page" element={<ProductPage />} />
      <Route path="/product/:id" element={<ItemPage />} />
    </Routes>
  );
}

export default AppLoyout;