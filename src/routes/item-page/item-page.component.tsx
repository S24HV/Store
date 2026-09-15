import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { discoundPrice } from "../../utils/helper-functions";
import { getOneProduct } from "../../services/products.requests";
import { IProduct } from "../../types/products.api.interface";
import { useCart } from "../../context/cart.context";
import ImageSlide from "../../components/image-slide/image-slide.component";
import "./item-page.scss";

const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getOneProduct(Number(id));
        setItem(product);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="item-loading">Loading...</div>;
  }

  if (!item) {
    return <div className="item-loading">Product not found</div>;
  }

  const finalPrice = item.discountPercentage
    ? discoundPrice(item.price, item.discountPercentage)
    : item.price.toString();

  const handleAddToCart = () => {
    addToCart(item);
    setIsCartOpen(true);
  };

  return (
    <div className="item-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← BACK
      </button>

      <div className="item-content">
        <div className="item-gallery">
          <ImageSlide images={item.images || []} />
        </div>

        <div className="item-details">
          <h1 className="item-title">{item.title}</h1>

          <div className="item-price-block">
            <span className="current-price">${finalPrice}</span>
            {item.discountPercentage > 0 && (
              <span className="old-price">${item.price}</span>
            )}
          </div>

          <p className="item-description">{item.description}</p>

          <div className="item-meta">
            <span>{item.stock} in stock</span>
          </div>

          <button className="add-to-bag" onClick={handleAddToCart}>
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;