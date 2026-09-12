import { Link } from "react-router-dom";
import "./navigation.scss";

const Navigation = () => {
  return (
    <div className="header-container">
      <Link
        to={"/1"}
        className="title">
        NEXIT'S STORE
      </Link>
    </div>
  );
};

export default Navigation;
