import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navigation from "./components/navigation/navigation.component";
import ProductsPage from "./routes/products-page/products-page.component";
import ItemPage from "./routes/item-page/item-page.component";
import "./App.scss";

function App() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const isHome =
    !searchParams.get("category") &&
    !searchParams.get("search") &&
    !location.pathname.includes("/shop/");

  useEffect(() => {
    document.body.classList.toggle("page-home", isHome);
    document.body.classList.toggle("page-light", !isHome);

    return () => {
      document.body.classList.remove("page-home", "page-light");
    };
  }, [isHome]);

  return (
    <div className={`app ${isHome ? "is-home" : "is-light"}`}>
      {isHome && (
        <>
          <video
            className="bg-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src={`${import.meta.env.BASE_URL}rickowens.mp4`}
              type="video/mp4"
            />
          </video>
          <div className="bg-overlay" />
        </>
      )}

      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/shop" replace />} />
          <Route path="/shop" element={<ProductsPage />} />
          <Route path="/shop/:id" element={<ItemPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;