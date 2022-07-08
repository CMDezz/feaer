import React, { useEffect, useState } from "react";
import { useSelector, connect } from "react-redux";
import CartProduct from "../CartProduct/CartProduct";
import { setCartInfo } from "../../Redux/Shop/ShopActions";
import { Link } from "react-router-dom";
import "./Cart.scss";

const Cart = (props) => {
  let CartFromRedux = useSelector((state) => state.shop.cart);
  let [sCart, setCart] = useState(CartFromRedux);

  let [reload, setReload] = useState(false);

  let callBackDeleted = (p) => {
    let newArr = sCart;
    let index = newArr.findIndex(
      (item) => item._id == p._id && item.sizePicked == p.sizePicked
    );
    newArr.splice(index, 1);
    setCart([...newArr]);
    console.log("deleted");
  };
  let callBackReload = (p) => {
    let newArr = sCart;
    let index = newArr.findIndex(
      (item) => item._id == p._id && item.sizePicked == p.sizePicked
    );
    newArr[index] = p;
    setCart([...newArr]);
  };
  let [shippingMethod, setShippingMethod] = useState("Standard");

  let numToPrice = (x) => {
    return (x = x.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    }));
  };

  let handleToCheckout = (e) => {
    let shippingType = shippingMethod;
    let shippingFee = handleShippingFee();
    let cartTotal = handleTotalPrice();
    props.setCartInfo(shippingType, shippingFee, cartTotal);
  };
  let handleTempPrice = (cart) => {
    let tempPrice = 0;
    cart.map((p) => {
      tempPrice += p.FinalPrice * p.qty;
    });
    return tempPrice;
  };
  let [tempPrice, setTempPrice] = useState(handleTempPrice(sCart));
  useEffect(() => {
    setTempPrice(handleTempPrice(sCart));
  }, [sCart]);
  let callbackPrice = (cart) => {
    setTempPrice(cart);
  };

  let handleShippingFee = () => {
    if (shippingMethod == "Standard") return 0;
    if (shippingMethod == "Fast") return 15000;
  };
  let handleTotalPrice = () => {
    return tempPrice + handleShippingFee();
  };
  useEffect(() => {}, [shippingMethod]);

  let handleCartProducts = (Cart) => {
    if (Cart.length > 0) {
      return Cart.map((p, k) => {
        return (
          <CartProduct
            data={p}
            callBackReload={callBackReload}
            callBackDeleted={callBackDeleted}
            key={k}
          ></CartProduct>
        );
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
      <p className="CartNumOfProducts">{sCart.length} sản phẩm</p>
      <div className="CartInfo">
        <div className="CartProducts">{handleCartProducts(sCart)}</div>
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
              Tạm tính: <span>{numToPrice(tempPrice)}</span>
            </p>
            <p className="CartTotalsShippingFee">
              Phí vận chuyển: <span>{numToPrice(handleShippingFee())}</span>
            </p>
            <p className="CartTotalsTotalPrice">
              Tổng tiền: <span>{numToPrice(handleTotalPrice())}</span>
            </p>
          </div>
          <div className="CartTotalsActions">
            <Link
              to="/checkout/shipping"
              className="CartTotalsCheckout"
              onClick={(e) => handleToCheckout(e)}
            >
              TIẾN HÀNH THANH TOÁN
            </Link>
            <Link to="/" className="CartTotalsContinue">
              TIẾP TỤC MUA SẮM
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCartInfo: (shippingType, shippingFee, cartTotal) => {
      return dispatch(setCartInfo(shippingType, shippingFee, cartTotal));
    },
  };
};

export default connect(null, mapDispatchToProps)(Cart);
