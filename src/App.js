import "./App.css";
import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage";
import ProductByCategoryPage from "./Pages/ProductByCategoryPage/ProductByCategoryPage";
import CartPage from "./Pages/CartPage/CartPage";
import ContactPage from "./Pages/ContactPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import ThankYouPage from "./Pages/ThankYouPage/ThankYouPage";
import SearchResultPage from "./Pages/SearchResultPage/SearchResultPage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import React, { useState, useEffect } from "react";
import CollectionPage from "./Pages/CollectionPage/CollectionPage";
import AdminPageLogin from "./AdminPage/Login/Login";
import AdminPageDashboard from "./AdminPage/Dashboard/Dashboard";
import NotFound from "./Components/NotFound/NotFound";
import CommonRoute from "./CommonRouteComp";
import {FloatButton,Drawer} from 'antd'
import { MessageOutlined } from '@ant-design/icons';
import DrawerMessage from "./Components/DrawerMessage";
function App() {
  // const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // function fakeRequest() {
  //   return new Promise((resolve) => setTimeout(() => resolve(), 500));
  // }

  // useEffect(() => {
  //   fakeRequest().then(() => {
  //     const el = document.querySelector(".loader-container");
  //     if (el) {
  //       el.remove();
  //       setLoading(!isLoading);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return null;
  // }
  const showDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<CommonRoute comp={<Homepage/>} />}></Route>
          <Route
            exact
            path="/product/product-detail/:id"
            element={< CommonRoute comp={<ProductDetailPage/>} />}
          ></Route>
          <Route
            exact
            path="/product/product-list-by-cate/:param"
            element={<CommonRoute comp={<ProductByCategoryPage/>}  />}
          ></Route>
          <Route
            exact
            path="/product/product-list-by-tag/:param"
            element={<CommonRoute comp={<ProductByCategoryPage/>}  />}
          ></Route>
          <Route
            exact
            path="/product/product-list-by-collection/:param"
            element={<CommonRoute comp={<ProductByCategoryPage/>}  />}
          ></Route>
          <Route
            exact
            path="/product/product-list-by-sex/:param"
            element={<CommonRoute comp={<ProductByCategoryPage/>}  />}
          ></Route>
          <Route
            exact
            path="/product/product-list-by-collection/:param"
            element={<CommonRoute comp={<ProductByCategoryPage/>}  />}
          ></Route>
          <Route
            exact
            path="/product/product-list-by-discount/:param"
            element={<CommonRoute comp={<ProductByCategoryPage/>}  />}
          ></Route>
          <Route exact path="/cart" element={<CommonRoute comp={<CartPage/>}/>}></Route>
          <Route
            exact
            path="/checkout/shipping"
            element={<CommonRoute comp={<CheckoutPage/>} />}
          ></Route>
          <Route
            exact
            path="/checkout/payment"
            element={<CommonRoute comp={<PaymentPage/>}/>}
          ></Route>
          <Route
            exact
            path="/checkout/thankyou"
            element={<CommonRoute comp={<ThankYouPage/>} />}
          ></Route>
          <Route
            exact
            path="/search/:keyword"
            element={<CommonRoute comp={<SearchResultPage/>} />}
          ></Route>
          <Route
            exact
            path="/signin"
            element={<CommonRoute comp={<SignInPage/>}/>}
          ></Route>
          <Route
            exact
            path="/collection/all-collection"
            element={<CommonRoute comp={<CollectionPage/>}/>}
          ></Route>

          <Route exact path="/contactPage" element={<CommonRoute comp={<ContactPage/>}/>} ></Route>
          {/* admin Pages  */}
          <Route exact path="/admin" element={<AdminPageLogin/>}></Route>
          <Route exact path="/admin/dashboard" element={<AdminPageDashboard/>}></Route>
          <Route path="*" element={< CommonRoute comp={<NotFound/>}/>} />

          {/* Contact page */}
        </Routes>

      </Router>
      <FloatButton
      icon={<MessageOutlined />}
      description="Chat"
      shape="square"
      style={{ right: 24 }}
      onClick={showDrawer}
    />
    <DrawerMessage onClose={closeDrawer} open={open} />
    </div>
  );
}

export default App;
