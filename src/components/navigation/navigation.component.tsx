import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart.context";
import Cart from "../cart/cart.component";
import "./navigation.scss";

interface SubLink {
  label: string;
  category?: string;
  href?: string;
}

interface MegaGroup {
  heading: string;
  links: SubLink[];
}

interface Tab {
  key: string;
  label: string;
  groups?: MegaGroup[];
}

const TABS: Tab[] = [
  {
    key: "women",
    label: "WOMEN",
    groups: [
      {
        heading: "Categories",
        links: [
          { label: "Tops", category: "tops" },
          { label: "Dresses", category: "womens-dresses" },
          { label: "Shoes", category: "womens-shoes" },
          { label: "Bags", category: "womens-bags" },
          { label: "Jewellery", category: "womens-jewellery" },
          { label: "Watches", category: "womens-watches" },
        ],
      },
    ],
  },
  {
    key: "men",
    label: "MEN",
    groups: [
      {
        heading: "Categories",
        links: [
          { label: "Shirts", category: "mens-shirts" },
          { label: "Shoes", category: "mens-shoes" },
          { label: "Watches", category: "mens-watches" },
        ],
      },
    ],
  },
  {
    key: "accessories",
    label: "ACCESSORIES",
    groups: [
      {
        heading: "Categories",
        links: [
          { label: "Sunglasses", category: "sunglasses" },
          { label: "Jewellery", category: "womens-jewellery" },
          { label: "Bags", category: "womens-bags" },
          { label: "Watches", category: "mens-watches" },
        ],
      },
    ],
  },
  {
    key: "beauty",
    label: "BEAUTY",
    groups: [
      {
        heading: "Categories",
        links: [
          { label: "Beauty", category: "beauty" },
          { label: "Skin Care", category: "skin-care" },
          { label: "Fragrances", category: "fragrances" },
        ],
      },
    ],
  },
  {
    key: "home",
    label: "HOME",
    groups: [
      {
        heading: "Categories",
        links: [
          { label: "Home Decoration", category: "home-decoration" },
          { label: "Furniture", category: "furniture" },
          { label: "Kitchen Accessories", category: "kitchen-accessories" },
        ],
      },
    ],
  },
];

const SECONDARY_LINKS: SubLink[] = [
  { label: "All Products", category: "all" },
  { label: "Tops", category: "tops" },
  { label: "Dresses", category: "womens-dresses" },
  { label: "Mens Shirts", category: "mens-shirts" },
];

const SearchIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const HamburgerIcon = () => (
  <svg className="icon hamburger-icon" viewBox="0 0 24 24" aria-hidden="true">
    <line x1="3" y1="6.5" x2="21" y2="6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="3" y1="17.5" x2="21" y2="17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openTab, setOpenTab] = useState<string | null>(null);
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue("");
      setMenuOpen(false);
    }
  };

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setOpenTab(null);
  };

  const goToLink = (link: SubLink) => {
    setMenuOpen(false);
    setOpenTab(null);
    if (link.category) {
      navigate(`/shop?category=${link.category}`);
    } else if (link.href) {
      navigate(link.href);
    }
  };

  return (
    <>
      <header className="header">
        <div className="main-row">
          <div className="row-left">
            <button className="icon-btn menu-btn" onClick={() => setMenuOpen(true)}>
              <HamburgerIcon /> MENU
            </button>
          </div>

          <Link to="/shop" className="logo">
            S24HV
          </Link>

          <div className="row-right">
            <button className="icon-btn search-btn" onClick={() => setSearchOpen(true)}>
              <SearchIcon /> SEARCH
            </button>
            <button className="icon-btn bag-btn" onClick={() => setIsCartOpen(true)}>
              BAG [ {cartCount} ]
            </button>
          </div>
        </div>
      </header>

      <div className={`full-menu ${menuOpen ? "open" : ""}`}>
        <div className="full-menu-topbar">
          <button className="fm-close" onClick={() => setMenuOpen(false)}>
            <span className="fm-x">×</span> CLOSE
          </button>
          <button
            className="fm-search"
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(true);
            }}
          >
            <SearchIcon /> SEARCH
          </button>
        </div>

        <div className="full-menu-content">
          <div className="full-menu-left">
            <div className="fm-primary">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  className={`fm-tab ${openTab === tab.key ? "active" : ""}`}
                  onClick={() => {
                    if (tab.groups) {
                      setOpenTab((prev) => (prev === tab.key ? null : tab.key));
                    } else {
                      setMenuOpen(false);
                      navigate("/shop");
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="fm-secondary">
              {SECONDARY_LINKS.map((link) => (
                <button key={link.label} onClick={() => goToLink(link)}>
                  {link.label}
                </button>
              ))}
            </div>

            <div className="fm-footer">
              <button className="fm-wishlist" onClick={() => setMenuOpen(false)}>
                WISHLIST [ 0 ]
              </button>
              <button className="fm-region">UNITED STATES</button>
            </div>
          </div>

          {openTab && (
            <div className="full-menu-right">
              {TABS.find((t) => t.key === openTab)?.groups?.map((group) => (
                <div className="fm-group" key={group.heading}>
                  <h4>{group.heading}</h4>
                  {group.links.map((link) => (
                    <button key={link.label} onClick={() => goToLink(link)}>
                      {link.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`search-panel ${searchOpen ? "open" : ""}`}>
        <div className="search-header">
          <button className="close-btn" onClick={() => setSearchOpen(false)}>
            CLOSE
          </button>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="TYPE HERE"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
        </form>
      </div>

      {(menuOpen || searchOpen) && <div className="overlay" onClick={closeAll} />}

      <Cart />
    </>
  );
};

export default Navigation;