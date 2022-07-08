import React, { useState } from "react";
import "./Header.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.shop.cart);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  let handleKeypress = (e) => {
    if (e.key === "Enter") {
      navigate("/search/" + keyword, { replace: true });
    }
  };
  return (
    <div className="Header">
      <ul className="HeaderMenu">
        <li className="HeaderMenuItem">
          <Link
            to="/product/product-list/Thời%20Trang%20Nam"
            className="HeaderMenuItemLink"
          >
            Nam
          </Link>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/Áo%20Nam">Áo nam</Link>{" "}
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/Quần%20Nam">Quần nam</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/Phụ%20Kiện">Phụ kiện</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/Sale%20Off%20Nam">
                Sale off nam
              </Link>
            </li>
          </ul>
        </li>
        <li className="HeaderMenuItem">
          <Link
            to="/product/product-list/Thời%20Trang%20Nữ"
            className="HeaderMenuItemLink"
          >
            Nữ
          </Link>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/Áo%20Nữ">Áo nữ</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/Quần%20Nữ">Quần nữ</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/Váy%20Nữ">Váy/ đầm nữ</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/Sale%20Off%20Nữ">
                Sale off nữ
              </Link>
            </li>
          </ul>
        </li>
        <li className="HeaderMenuItem">
          <Link
            to="/product/product-list/New%20Arrivals"
            className="HeaderMenuItemLink"
          >
            New Arrivals
          </Link>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/New%20Arrivals%20Nam">
                New arrivals nam
              </Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/New%20Arrivals%20Nữ">
                New arrivals nữ
              </Link>
            </li>
          </ul>
        </li>
        <li className="HeaderMenuItem">
          <Link
            to="/product/product-list/Collection"
            className="HeaderMenuItemLink"
          >
            Collection
          </Link>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/">Bộ sưu tập</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/">Không làm gì</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/">Xanh</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/">Right now</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/">Polo Preminium</Link>
            </li>
          </ul>
        </li>
        <li className="HeaderMenuItem active">
          <Link to="/product/product-list/" className="HeaderMenuItemLink">
            Summer Sale
          </Link>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/">Sale off 30%</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/">Sale off 30%</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list/">Đồng giá 199k</Link>
            </li>
          </ul>
        </li>
      </ul>
      <div className="HeaderLogo">
        <Link to="/">
          <img src="/assets/img/logo.svg" alt="" />
        </Link>
      </div>
      <ul className="HeaderNavigate">
        <li className="HeaderNavigateItem HeaderSearch">
          <input
            type="text"
            placeholder="TÌM KIẾM"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeypress}
          />
          <Link to={"/search/" + keyword}>
            <AiOutlineSearch />
          </Link>
        </li>
        <li className="HeaderNavigateItem">
          <Link to="/signin" className="HeaderNavigateItemLink">
            Đăng nhập
          </Link>
        </li>
        <li className="HeaderNavigateItem">
          <Link to="/product/product-list/" className="HeaderNavigateItemLink">
            Trợ giúp
          </Link>
        </li>
        <li className="HeaderNavigateItem ">
          <Link to="/cart" className="HeaderNavigateItemLink CartLink">
            Giỏ hàng <span className="numOfCart">({cart.length})</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
