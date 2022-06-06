import React from "react";
import "./Header.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header">
      <ul className="HeaderMenu">
        <li className="HeaderMenuItem">
          <a href="#" className="HeaderMenuItemLink">
            Nam
          </a>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <a href="#">Áo nam</a>{" "}
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">Quần nam</a>
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">Phụ kiện</a>
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">Sale off nam</a>
            </li>
          </ul>
        </li>
        <li className="HeaderMenuItem">
          <a href="#" className="HeaderMenuItemLink">
            Nữ
          </a>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <a href="#">Áo nữ</a>
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">Quần nữ</a>
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">Váy/ đầm nữ</a>
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">Sale off nữ</a>
            </li>
          </ul>
        </li>
        <li className="HeaderMenuItem">
          <a href="#" className="HeaderMenuItemLink">
            New Arrivals
          </a>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <a href="#">New arrivals nam</a>
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">New arrivals nữ</a>
            </li>
          </ul>
        </li>
        <li className="HeaderMenuItem">
          <a href="#" className="HeaderMenuItemLink">
            Collection
          </a>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <a href="#">Bộ sưu tập</a>
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">Không làm gì</a>
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">Xanh</a>
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">Right now</a>
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">Polo Preminium</a>
            </li>
          </ul>
        </li>
        <li className="HeaderMenuItem active">
          <a href="#" className="HeaderMenuItemLink">
            Summer Sale
          </a>
          <ul className="HeaderMenuItemSubMenu">
            <li className="HeaderMenuItemSubItem">
              <a href="#">Sale off 30%</a>
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">Sale off 30%</a>
            </li>
            <li className="HeaderMenuItemSubItem">
              <a href="#">Đồng giá 199k</a>
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
          <input type="text" placeholder="TÌM KIẾM" />
          <AiOutlineSearch />
        </li>
        <li className="HeaderNavigateItem">
          <a href="#" className="HeaderNavigateItemLink">
            Đăng nhập
          </a>
        </li>
        <li className="HeaderNavigateItem">
          <a href="#" className="HeaderNavigateItemLink">
            Trợ giúp
          </a>
        </li>
        <li className="HeaderNavigateItem ">
          <a href="#" className="HeaderNavigateItemLink">
            Giỏ hàng
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
