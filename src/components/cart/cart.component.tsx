import { useCart } from "../../context/cart.context";
import "./cart.scss";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <>
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>BAG</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>
            CLOSE
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">Your bag is empty</div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>

                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p className="cart-item-price">${item.price}</p>

                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.id)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>TOTAL</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">CHECKOUT</button>
            </div>
          </>
        )}
      </div>

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      )}
    </>
  );
};

export default Cart;