import { useEffect, useState, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { IProduct } from "../../types/products.api.interface";
import ProductItem from "../../components/product-item/product-item.component";
import { getProductsPage } from "../../services/products.requests";
import { SortEnum } from "../../types/products.api.interface";
import "./page.scss";

const CATEGORY_PATH: Record<string, string[]> = {
  tops: ["HOME", "WOMEN", "CATEGORIES", "TOPS"],
  "womens-dresses": ["HOME", "WOMEN", "CATEGORIES", "DRESSES"],
  "womens-shoes": ["HOME", "WOMEN", "CATEGORIES", "SHOES"],
  "womens-bags": ["HOME", "WOMEN", "CATEGORIES", "BAGS"],
  "womens-jewellery": ["HOME", "WOMEN", "CATEGORIES", "JEWELLERY"],
  "womens-watches": ["HOME", "WOMEN", "CATEGORIES", "WATCHES"],
  "mens-shirts": ["HOME", "MEN", "CATEGORIES", "SHIRTS"],
  "mens-shoes": ["HOME", "MEN", "CATEGORIES", "SHOES"],
  "mens-watches": ["HOME", "MEN", "CATEGORIES", "WATCHES"],
  sunglasses: ["HOME", "ACCESSORIES", "CATEGORIES", "SUNGLASSES"],
  beauty: ["HOME", "BEAUTY", "CATEGORIES", "BEAUTY"],
  "skin-care": ["HOME", "BEAUTY", "CATEGORIES", "SKIN CARE"],
  fragrances: ["HOME", "BEAUTY", "CATEGORIES", "FRAGRANCES"],
  "home-decoration": ["HOME", "HOME", "CATEGORIES", "DECORATION"],
  furniture: ["HOME", "HOME", "CATEGORIES", "FURNITURE"],
  "kitchen-accessories": ["HOME", "HOME", "CATEGORIES", "KITCHEN"],
  all: ["HOME", "ALL PRODUCTS"],
};

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const hasQuery = Boolean(category || search);

  const path = search
    ? ["HOME", "SEARCH", search.toUpperCase()]
    : category
    ? CATEGORY_PATH[category] || ["HOME", category.toUpperCase()]
    : [];

  const fetchProducts = useCallback(async () => {
    if (!hasQuery) {
      setProducts([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await getProductsPage(1, 30, SortEnum.default, category, search);
      setProducts(res.products || []);
    } catch (err) {
      console.error(err);
      setProducts([]);
      setError("Failed to load products. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, [category, search, hasQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!hasQuery) {
    return <div className="shop-page empty" />;
  }

  return (
    <div className="shop-page">
      
      <div className="breadcrumb">
        {path.map((item, index) => (
          <span key={index}>
            {index > 0 && <span className="separator"> / </span>}
            {index === 0 ? (
              <Link to="/shop">{item}</Link>
            ) : (
              <span className={index === path.length - 1 ? "current" : ""}>
                {item}
              </span>
            )}
          </span>
        ))}
      </div>

      {loading && <div className="loading">Loading...</div>}

      {error && (
        <div className="error-state">
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchProducts}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductItem key={product.id} item={product} />
            ))
          ) : (
            <div className="loading">No products found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;