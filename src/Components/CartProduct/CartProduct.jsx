import React, { useEffect, useState } from "react";
import "./CartProduct.scss";
import Swal from "sweetalert2";
import { deleteFromCart, adjustQty } from "../../Redux/Shop/ShopActions";
import { useSelector, connect } from "react-redux";

const CartProduct = (props) => {
  const p = props.data;
  let [qty, setQty] = useState(p.qty);
  let numToPrice = (x) => {
    return (x = x.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    }));
  };
  let handleQty = (e) => {
    let action = e.target.innerText;
    if (action == "+") {
      setQty(qty + 1);
    } else if (action == "-") {
      if (qty - 1 > 0) setQty(qty - 1);
    }
  };
  useEffect(() => {
    p.qty = qty;
    props.adjustQty(p);
  }, [qty]);
  let showDeleteWarning = () => {
    Swal.fire({
      title: "Xóa sản phẩm?",
      text: "Bạn chắc chắn xóa sản phẩm khỏi giỏ hàng chứ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy",
      confirmButtonText: "Xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteFromCart(p);
        Swal.fire({
          title: "Đã xóa!",
          text: "Đã xóa sản phẩm khỏi giỏ hàng.",
          icon: "success",
          timer: 1300,
        });
      }
    });
  };
  return (
    <div className="CartProduct">
      <img
        src={p.Image[0]}
        alt="Image of cart product"
        className="CartProductImg"
      />
      <div className="CartProductInfo">
        <p className="CartProductName">
          <span className="CartProductNameContent">Tên: {p.Name} </span>
          <span className="deleteFromCart" onClick={() => showDeleteWarning()}>
            x
          </span>
        </p>
        <p className="CartProductSize">Kích cỡ: {p.sizePicked}</p>
        <p className="CartProductPrice">
          Giá:{" "}
          {numToPrice(p.SalePrice && p.SalePrice > 0 ? p.SalePrice : p.Price)}
        </p>
        <div className="CartProductQuantityBox">
          <span className="DecreaseQty" onClick={(e) => handleQty(e)}>
            -
          </span>
          <input
            type="Number"
            min={0}
            value={qty}
            readOnly
            className="QtyContent"
          />
          <span className="IncreaseQty" onClick={(e) => handleQty(e)}>
            +
          </span>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (product) => {
      return dispatch(deleteFromCart(product));
    },
    adjustQty: (product) => {
      return dispatch(adjustQty(product));
    },
  };
};

export default connect(null, mapDispatchToProps)(CartProduct);
