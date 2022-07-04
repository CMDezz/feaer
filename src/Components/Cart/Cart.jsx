import React, { useEffect, useState } from "react";
import { useSelector, connect } from "react-redux";
import CartProduct from "../CartProduct/CartProduct";
import "./Cart.scss";

const Cart = (props) => {
  let CartFromRedux = useSelector((state) => state.shop.cart);
  let [shippingMethod, setShippingMethod] = useState("Standard");
  let numToPrice = (x) => {
    return (x = x.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    }));
  };
  let handleTempPrice = () => {
    let tempPrice = 0;
    CartFromRedux.map((p) => {
      if (p.SalePrice && p.SalePrice > 0) {
        tempPrice += p.SalePrice * p.qty;
      } else {
        tempPrice += p.Price * p.qty;
      }
    });
    return tempPrice;
  };
  let handleShippingFee = () => {
    if (shippingMethod == "Standard") return 0;
    if (shippingMethod == "Fast") return 15000;
  };
  let handleTotalPrice = () => {
    return handleTempPrice() + handleShippingFee();
  };
  useEffect(() => {}, [shippingMethod]);

  let handleCartProducts = (Cart) => {
    if (Cart.length > 0) {
      return Cart.map((p, k) => {
        return <CartProduct data={p} key={k}></CartProduct>;
      });
    } else {
      return (
        <div className="CartProduct CartProductEmpty">
          <h3 className="CartProductEmptyTitle">
            Giỏ hàng trống, hãy thử thêm một vài sản phẩm nhé!
          </h3>
        </div>
      );
    }
  };
  return (
    <div className="Cart">
      <h3 className="CartTitle">Giỏ Hàng</h3>
      <p className="CartNumOfProducts">{CartFromRedux.length} sản phẩm</p>
      <div className="CartInfo">
        <div className="CartProducts">{handleCartProducts(CartFromRedux)}</div>
        <div className="CartTotals">
          <div className="CartTotalsContent">
            <p className="CartTotalsNote">
              * Mọi thông tin sẽ được chúng tôi bảo mật
            </p>
            <div className="CartTotalsShipping">
              <p className="CartTotalsShippingTitle">
                Chọn phương thức vận chuyển:{" "}
              </p>
              <div
                className="CartTotalsShippingBox"
                onChange={() => setShippingMethod("Standard")}
              >
                <input
                  type="radio"
                  className="CartTotalsShippingRadio CartTotalsShippingStandard"
                  name="ShippingOption"
                  id="ShippingStandard"
                  value={0}
                  defaultChecked={shippingMethod == "Standard"}
                />
                <label
                  className="CartTotalsShippingLabel CartTotalsShippingStardardLabel"
                  htmlFor="ShippingStandard"
                >
                  Vận chuyển thường :<span> 0 VND</span>
                </label>
              </div>
              <div
                className="CartTotalsShippingBox"
                onChange={() => setShippingMethod("Fast")}
              >
                <input
                  type="radio"
                  className="CartTotalsShippingRadio CartTotalsShippingFast"
                  name="ShippingOption"
                  id="ShippingFast"
                  value={15000}
                  defaultChecked={shippingMethod == "Fast"}
                />
                <label
                  className="CartTotalsShippingLabel CartTotalsShippingFastLabel"
                  htmlFor="ShippingFast"
                >
                  Vận chuyển nhanh: <span>+15.000 VND</span>
                </label>
              </div>
            </div>
            <p className="CartTotalsTempPrice">
              Tạm tính: <span>{numToPrice(handleTempPrice())}</span>
            </p>
            <p className="CartTotalsShippingFee">
              Phí vận chuyển: <span>{numToPrice(handleShippingFee())}</span>
            </p>
            <p className="CartTotalsTotalPrice">
              Tổng tiền: <span>{numToPrice(handleTotalPrice())}</span>
            </p>
          </div>
          <div className="CartTotalsActions">
            <a href="#" className="CartTotalsCheckout">
              TIẾN HÀNH THANH TOÁN
            </a>
            <a href="#" className="CartTotalsContinue">
              TIẾP TỤC MUA SẮM
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
