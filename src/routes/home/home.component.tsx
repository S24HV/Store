import { Link } from "react-router-dom";
import "./home.scss";

const Home = () => {
  return (
    <div className="cover">
      <div className="cover-content">
        <h1 className="cover-title">S24HV</h1>
        <p className="cover-subtitle">Online Store</p>
        <Link to="/1" className="cover-btn">
          Go to Catalog
        </Link>
      </div>
    </div>
  );
};

export default Home;