import React from "react";
import { MdDoneOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import "./ThankYouPage.scss";
import { connect } from "react-redux";
import { emptyCart } from "../../Redux/Shop/ShopActions";

const ThankYouPage = (props) => {
  //empty cart when reached this page
  props.emptyCart();
  return (
    <div className="ThankYouPage">
      <MdDoneOutline></MdDoneOutline>
      <h3 className="ThankYouPageTitle">Thank You</h3>
      <p className="ThankYouPageDesc">
        Cám ơn bạn đã tin tưởng và đặt hàng tại FEAER, bộ phận bán hàng sẽ liên
        hệ bạn sớm nhất để xác nhận đơn hàng. Nếu cần hỗ trợ hãy liên hệ ngay
        với chúng tôi qua
        <a href={"tel:0779639904"}> Hotline </a> hoặc
        <a href="https://www.facebook.com/"> Fanpage</a>
      </p>

      <div className="ThankYouPageActions">
        <Link to="/" className="ThankYouPageBack">
          Về Trang Chủ
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    emptyCart: () => {
      return dispatch(emptyCart());
    },
  };
};
export default connect(null, mapDispatchToProps)(ThankYouPage);
