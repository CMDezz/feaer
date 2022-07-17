import React from "react";
import AddProduct from "../AddProduct/AddProduct";

const AdminProducts = (props) => {
  let indexSub = props.activeSub;
  let renderAdminProducts = () => {
    if (indexSub == 1) {
      return <AddProduct></AddProduct>;
    } else if (indexSub == 2) {
      return <h3 className="AdminProductsTitle">Chỉnh Sửa Sản Phẩm</h3>;
    } else {
      return <h3 className="AdminProductsTitle">Quản Lý Sản Phẩm</h3>;
    }
  };
  return <div className="AdminProducts">{renderAdminProducts()}</div>;
};

export default AdminProducts;
