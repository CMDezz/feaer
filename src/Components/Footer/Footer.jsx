import React from "react";
import { AiOutlinePhone } from "react-icons/ai";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="FooterContainer">
        <img src="/assets/img/logo2.svg" alt="" className="FooterLogo" />
        <div className="FooterInfo">
          <p className="FooterDesc">
            FEAER là thương hiệu thời trang trực tuyến hàng đầu dành cho nam
            giới, khai thác các khía cạnh độc đáo trên các thiết kế nhằm tạo ra
            các bộ sưu tập mới mỗi tháng. Các kết hợp giữa họa tiết cổ điển và
            hiện đại, trên các item vốn quen thuộc với tủ đồ các anh như polo,
            áo sơ mi, quần short, áo thun,... Các sản phẩm tại Feaer luôn mang
            đến sự bứt phá, khác biệt và nổi bật dành cho các tín đồ thời trang
            nam giới Việt.
          </p>
          <ul className="FooterNavigation">
            <li className="FooterNavigationItem">
              <p className="FooterNavigationItemTitle">Sản Phẩm</p>
              <ul className="FooterNavigationItemLinks">
                <li className="FooterNavigationItemLink">
                  <a href="#">Sản Phẩm Nam</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Sản Phẩm Nữ</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Phụ Kiện</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Bộ Sưu Tập</a>
                </li>
              </ul>
            </li>
            <li className="FooterNavigationItem">
              <p className="FooterNavigationItemTitle">Dịch Vụ Khách Hàng</p>
              <ul className="FooterNavigationItemLinks">
                <li className="FooterNavigationItemLink">
                  <a href="#">Hỏi Đáp - FAQs</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Thành Viên</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Khách Hàng Hài Lòng</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Chính Sách</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Sản Phẩm Của Chúng Tôi</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Hướng Dẫn Chọn Size</a>
                </li>
              </ul>
            </li>
            <li className="FooterNavigationItem">
              <p className="FooterNavigationItemTitle">Mạng Xã Hội</p>
              <ul className="FooterNavigationItemLinks">
                <li className="FooterNavigationItemLink">
                  <a href="#">Shopee</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Lazada</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Facebook</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Instagram</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Youtube</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Tiktok</a>
                </li>
              </ul>
            </li>
            <li className="FooterNavigationItem">
              <p className="FooterNavigationItemTitle">Về Feaer</p>
              <ul className="FooterNavigationItemLinks">
                <li className="FooterNavigationItemLink">
                  <a href="#">Câu Chuyện Về FEAER</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Tuyển Dụng</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">Danh Sách Chi Nhánh</a>
                </li>
                <li className="FooterNavigationItemLink">
                  <a href="#">
                    <AiOutlinePhone /> 0779898281
                  </a>
                </li>
              </ul>
            </li>
            <li className="FooterNavigationItem">
              <p className="FooterNavigationItemTitle">Ý Kiến Đóng Góp</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
