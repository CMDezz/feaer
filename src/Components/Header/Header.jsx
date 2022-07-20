import React, { useState, useRef, useEffect } from "react";
import "./Header.scss";
import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const ref = useRef(null);
  const ref2 = useRef(null);

  const cart = useSelector((state) => state.shop.cart);
  const [keyword, setKeyword] = useState("");
  const [isActive, setActive] = useState("");
  const [isSearchActive, setSearchActive] = useState(false);

  const [expand, setExpand] = useState(false);

  const navigate = useNavigate();
  // let elmOffset = 0;

  let handleKeypress = (e) => {
    if (e.key === "Enter") {
      navigate("/search/" + keyword, { replace: true });
    }
  };
  if (expand == true || isSearchActive == true) {
    document.body.classList.add("no-scroll");
  } else {
  }
  let handleOC = (e) => {
    if (ref && !ref.current.contains(e.target)) {
      console.log("1");
      setExpand(false);
      document.body.classList.remove("no-scroll");
    }
  };
  let handleOC2 = (e) => {
    if (ref2 && !ref2.current.contains(e.target)) {
      console.log("2");
      setSearchActive(false);
      document.body.classList.remove("no-scroll");
    }
  };

  return (
    <div className="Header">
      <ul className="HeaderMenu">
        <li className="HeaderMenuItem">
          <Link
            to="/product/product-list-by-sex/Men"
            className="HeaderMenuItemLink"
          >
            Nam
          </Link>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-cate/Áo%20Nam">Áo nam</Link>{" "}
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-cate/Quần%20Nam">
                Quần nam
              </Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-cate/Phụ%20Kiện">
                Phụ kiện
              </Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-tag/Sale%20Off%20Nam">
                Sale off nam
              </Link>
            </li>
          </ul>
        </li>
        <li className="HeaderMenuItem">
          <Link
            to="/product/product-list-by-sex/Women"
            className="HeaderMenuItemLink"
          >
            Nữ
          </Link>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-cate/Áo%20Nữ">Áo nữ</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-cate/Quần%20Nữ">Quần nữ</Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-cate/Váy%20Nữ">
                Váy/ đầm nữ
              </Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-tag/Sale%20Off%20Nữ">
                Sale off nữ
              </Link>
            </li>
          </ul>
        </li>
        <li className="HeaderMenuItem">
          <Link
            to="/product/product-list-by-tag/New%20Arrivals"
            className="HeaderMenuItemLink"
          >
            New Arrivals
          </Link>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-tag/New%20Arrivals%20Nam">
                New arrivals nam
              </Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-tag/New%20Arrivals%20Nữ">
                New arrivals nữ
              </Link>
            </li>
          </ul>
        </li>
        <li className="HeaderMenuItem">
          <Link to="/collection/all-collection" className="HeaderMenuItemLink">
            Collection
          </Link>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <Link to="product/product-list-by-collection/Hè%20Thoáng%20Mát">
                Hè Thoáng Mát
              </Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="product/product-list-by-collection/Sơ%20Mi%20Lịch%20Lãm">
                Sơ Mi Lịch Lãm
              </Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="product/product-list-by-collection/Set%20Nữ%20Ngày%20Hè">
                Set Nữ Ngày Hè
              </Link>
            </li>
          </ul>
        </li>
        <li className="HeaderMenuItem active">
          <Link
            to="/product/product-list-by-tag/Sale%20Off"
            className="HeaderMenuItemLink"
          >
            Summer Sale
          </Link>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-discount/Giảm%20giá%2010%25">
                Sale off 10%
              </Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-discount/Giảm%20giá%2030%25">
                Sale off 30%
              </Link>
            </li>
            <li className="HeaderMenuItemSubItem">
              <Link to="/product/product-list-by-discount/Đồng%20giá%20150k">
                Đồng giá 150k
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <div className="HeaderMenuIcon">
        <AiOutlineMenu
          onClick={() => {
            setExpand(!expand);
            setSearchActive(false);
          }}
        ></AiOutlineMenu>
      </div>
      <div
        className={(expand == true ? "BarActive " : "") + "HeaderMenuBarBox"}
        id="HeaderMenuBarBox"
        onClick={(e) => handleOC(e)}
      >
        <ul className="HeaderMenuBar" ref={ref}>
          <li
            className={
              (isActive == "Nam" ? "active " : "") + "HeaderMenuBarItem"
            }
            onClick={() => (isActive == "" ? setActive("Nam") : setActive(""))}
          >
            <Link to="#" className="HeaderMenuBarItemLink">
              Nam
            </Link>
            <ul className="HeaderMenuBarItemSubMenu">
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-by-cate/Áo%20Nam">Áo nam</Link>{" "}
              </li>
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-by-cate/Quần%20Nam">
                  Quần nam
                </Link>
              </li>
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-by-cate/Phụ%20Kiện">
                  Phụ kiện
                </Link>
              </li>
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-by-tag/Sale%20Off%20Nam">
                  Sale off nam
                </Link>
              </li>
            </ul>
          </li>
          <li
            className="HeaderMenuBarItem"
            className={
              (isActive == "Nữ" ? "active " : "") + "HeaderMenuBarItem"
            }
            onClick={() => (isActive == "" ? setActive("Nữ") : setActive(""))}
          >
            <Link to="#" className="HeaderMenuBarItemLink">
              Nữ
            </Link>
            <ul className="HeaderMenuBarItemSubMenu">
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-by-cate/Áo%20Nữ">Áo nữ</Link>
              </li>
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-by-cate/Quần%20Nữ">
                  Quần nữ
                </Link>
              </li>
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-by-cate/Váy%20Nữ">
                  Váy/ đầm nữ
                </Link>
              </li>
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-by-tag/Sale%20Off%20Nữ">
                  Sale off nữ
                </Link>
              </li>
            </ul>
          </li>
          <li className="HeaderMenuBarItem">
            <Link
              to="/product/product-list-by-tag/New%20Arrivals"
              className="HeaderMenuBarItemLink"
            >
              New Arrivals
            </Link>
            <ul className="HeaderMenuBarItemSubMenu">
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-by-tag/New%20Arrivals%20Nam">
                  New arrivals nam
                </Link>
              </li>
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-by-tag/New%20Arrivals%20Nữ">
                  New arrivals nữ
                </Link>
              </li>
            </ul>
          </li>
          <li className="HeaderMenuBarItem">
            <Link
              to="/collection/all-collection"
              className="HeaderMenuBarItemLink"
            >
              Collection
            </Link>
            <ul className="HeaderMenuBarItemSubMenu">
              <li className="HeaderMenuBarItemSubItem">
                <Link to="product/product-list-by-collection/Hè%20Thoáng%20Mát">
                  Hè Thoáng Mát
                </Link>
              </li>
              <li className="HeaderMenuBarItemSubItem">
                <Link to="product/product-list-by-collection/Sơ%20Mi%20Lịch%20Lãm">
                  Sơ Mi Lịch Lãm
                </Link>
              </li>
              <li className="HeaderMenuBarItemSubItem">
                <Link to="product/product-list-by-collection/Set%20Nữ%20Ngày%20Hè">
                  Set Nữ Ngày Hè
                </Link>
              </li>
            </ul>
          </li>
          <li className="HeaderMenuBarItem active">
            <Link
              to="/product/product-list-by-tag/Sale%20Off"
              className="HeaderMenuBarItemLink"
            >
              Summer Sale
            </Link>
            <ul className="HeaderMenuItemSubMenu">
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-by-discount/Giảm%20giá%2010%25">
                  Sale off 10%
                </Link>
              </li>
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-by-discount/Giảm%20giá%2030%25">
                  Sale off 30%
                </Link>
              </li>
              <li className="HeaderMenuBarItemSubItem">
                <Link to="/product/product-list-byBar-discount/Đồng%20giá%20150k">
                  Đồng giá 150k
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
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
        <li className="HeaderNavigateItem HeaderSearch HeaderSearchMobile">
          <Link to="#" onClick={() => setSearchActive(!isSearchActive)}>
            <AiOutlineSearch />
          </Link>
        </li>
        <li className="HeaderNavigateItem">
          <Link to="/signin" className="HeaderNavigateItemLink">
            <span>Đăng nhập</span>
            <AiOutlineUser></AiOutlineUser>
          </Link>
        </li>
        {/* <li className="HeaderNavigateItem">
          <Link to="/product/product-list-by-cate/" className="HeaderNavigateItemLink">
            Trợ giúp
          </Link>
        </li> */}
        <li className="HeaderNavigateItem ">
          <Link to="/cart" className="HeaderNavigateItemLink CartLink">
            <span>
              Giỏ hàng <span className="numOfCart">({cart.length})</span>
            </span>
            <AiOutlineShoppingCart></AiOutlineShoppingCart>
          </Link>
        </li>
      </ul>
      <div
        className={(isSearchActive ? "Active " : "") + "HeaderSearchBar"}
        onClick={(e) => handleOC2(e)}
      >
        <div className="HeaderSearchBarBox" ref={ref2}>
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
        </div>
      </div>
    </div>
  );
};

export default Header;
