import React, { useState } from "react";
import AdminDefault from "./AdminComponents/AdminDefault/AdminDefault";
import AdminProducts from "./AdminComponents/AdminProducts/AdminProducts";
import "./AdminPage.scss";

const AdminPage = () => {
  let [activeTab, setActiveTab] = useState("Admin");
  let [activeSub, setActiveSub] = useState(0);
  let handleAdminPageContent = () => {
    if (activeTab == "Admin") {
      return <AdminDefault></AdminDefault>;
    } else if (activeTab == "Products") {
      return <AdminProducts activeSub={activeSub}></AdminProducts>;
    }
  };
  return (
    <div className="AdminPage">
      <div className="AdminPageNavigation">
        <ul className="AdminPageList">
          <li
            className={
              activeTab == "Admin"
                ? "AdminPageItem AdminPageItemDefault activatedTab"
                : "AdminPageItem AdminPageItemDefault"
            }
            onClick={() => setActiveTab("Admin")}
          >
            <h3 className="AdminPageItemTitle">Admin</h3>
          </li>
          <li
            className={
              activeTab == "Products"
                ? "AdminPageItem AdminPageItemProducts activatedTab"
                : "AdminPageItem AdminPageItemProducts"
            }
            onClick={() => setActiveTab("Products")}
          >
            <h3 className="AdminPageItemTitle">Products</h3>
            <ul className="AdminPageSubList AdminPageItemProductsList">
              <li
                className={
                  activeSub == 1
                    ? "AdminPageSubItem AdminPageItemProductsItem activeSub"
                    : "AdminPageSubItem AdminPageItemProductsItem"
                }
                onClick={() => setActiveSub(1)}
              >
                <h3 className="AdminPageItemProductsTitle">Add Products</h3>
              </li>
              <li
                className={
                  activeSub == 2
                    ? "AdminPageSubItem AdminPageItemProductsItem activeSub"
                    : "AdminPageSubItem AdminPageItemProductsItem"
                }
                onClick={() => setActiveSub(2)}
              >
                <h3 className="AdminPageItemProductsTitle">Edit Products</h3>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="AdminPageContent">{handleAdminPageContent()}</div>
    </div>
  );
};

export default AdminPage;
