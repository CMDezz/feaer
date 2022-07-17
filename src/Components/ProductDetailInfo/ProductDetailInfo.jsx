import React, { useState } from "react";
import { FaCottonBureau } from "react-icons/fa";
import { FaTencentWeibo } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { addToCart } from "../../Redux/Shop/ShopActions";
import Swal from "sweetalert2";
import "./ProductDetailInfo.scss";
import { connect } from "react-redux";

const ProductDetailInfo = (props) => {
  let discount = props.data.Discount || "";
  let finalP = props.data.FinalPrice || "";
  let dataPrice = props.data.Price || 0;
  let dataName = props.data.Name || 0;
  let dataSold = props.data.TotalSold || 0;
  let dataSize = props.data.SizeAndStock || 0;
  let dataId = props.data._id || 0;
  let dataDesc = props.data.Desc || 0;
  let [sizeClicked, setSizeClicked] = useState("");
  let [Quantity, setQuantity] = useState(1);

  let numToPrice = (x) => {
    return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  };
  let handleClick = (event) => {
    const value = event.target.value;

    setSizeClicked(value);
  };
  let renderSize = (e) => {
    let sizes = Object.keys(dataSize);
    return sizes.map((s, i) => (
      <input
        key={i}
        className={
          sizeClicked == s
            ? "ProductDetailInfoSize SizeClicked"
            : "ProductDetailInfoSize"
        }
        onClick={handleClick}
        readOnly
        value={s}
      ></input>
    ));
  };
  let handleQuantity = (e) => {
    let type = e.target.innerText;
    type == "+"
      ? setQuantity(Quantity + 1)
      : Quantity - 1 > 0
      ? setQuantity(Quantity - 1)
      : setQuantity(1);
  };
  return (
    <div className="ProductDetailInfo">
      <div className="ProductDetailInfoBasic">
        <div className="toLeft">
          <h3 className="ProductDetailInfoName">{props.data.Name}</h3>
          {/* <h3 className="ProductDetailInfoPrice">{numToPrice(dataPrice)}</h3> */}
          <div className="ProductDetailInfoPrice">
            {discount && discount != "" ? (
              <p className="ProductDetailInfoPriceSale">{numToPrice(finalP)}</p>
            ) : (
              ""
            )}
            <p className="ProductDetailInfoPriceBase">
              {numToPrice(dataPrice)}
            </p>
          </div>
          <p className="ProductDetailInfoId">
            Mã Hàng Hóa: <span>{dataId}</span>
          </p>
        </div>
        <div className="toRight">
          <p className="ProductDetailInfoSale">
            {dataSold} Lượt mua | <span className="status">Còn Hàng</span>
          </p>
        </div>
      </div>

      <div className="ProductDetailInfoAdd">
        <div className="ProductDetailInfoDesc">
          <p className="title">Mô tả: </p>
          <p className="content">{dataDesc}</p>
        </div>
        <div className="ProductDetailInfoSizes">
          <p>Chọn kích cỡ: </p>
          {renderSize()}
        </div>
      </div>
      <div className="ProductDetailInfoAction">
        <div className="ProductDetailInfoQuantity">
          <span className="DecreaseQuantity" onClick={handleQuantity}>
            -
          </span>

          <input
            type="number"
            min={0}
            readOnly
            value={Quantity}
            className="ProductDetailInfoQuantityInput"
          />
          <span className="IncreaseQuantity" onClick={handleQuantity}>
            +
          </span>
        </div>

        <a
          href="#"
          className="ProductDetailInfoAddToCart"
          onClick={() => {
            props.addToCart(props.data);
            Swal.fire({
              title: "Thêm thành công!",
              text: "Sản phẩm đã thêm vào giỏ hàng",
              icon: "success",
              timer: 1300,
            });
          }}
        >
          Thêm Vào Giỏ Hàng
        </a>
      </div>
      <div className="WeConfirm">
        <p className="WeConfirmTitle">Chúng tôi mang đến cam kết cho bạn: </p>
        <ul className="WeConfirmList">
          <li className="WeConfirmItem">
            <span>
              <FaCottonBureau></FaCottonBureau>
              <span className="highLight">Chất vải Cotton </span> thoáng mát co
              dãn, tạo sự thoải mái
            </span>
          </li>
          <li className="WeConfirmItem">
            <span>
              <FaTencentWeibo></FaTencentWeibo>Công nghệ xử lý vải
              <span className="highLight"> nhanh khô, chống nhăn khi giặt</span>
            </span>
          </li>
          <li className="WeConfirmItem">
            <span>
              <MdOutlineLocalShipping></MdOutlineLocalShipping>
              <span className="highLight">Miễn phí giao hàng </span>
              cho đơn hàng trên 500K
            </span>
          </li>
          <li className="WeConfirmItem">
            <span>
              <MdOutlineSettingsBackupRestore></MdOutlineSettingsBackupRestore>
              Đổi trả miễn phí trong vòng{" "}
              <span className="highLight">7 ngày </span>
              cho khách hàng
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      const qty =
        document.getElementsByClassName("ProductDetailInfoQuantityInput")[0]
          .value * 1;
      const sizePicked =
        document.getElementsByClassName("SizeClicked")[0].value;
      return dispatch(
        addToCart({ ...product, qty: qty, sizePicked: sizePicked })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailInfo);
