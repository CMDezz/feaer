import "./App.css";
import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage";
import ProductByCategoryPage from "./Pages/ProductByCategoryPage/ProductByCategoryPage";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import ThankYouPage from "./Pages/ThankYouPage/ThankYouPage";
import SearchResultPage from "./Pages/SearchResultPage/SearchResultPage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import React, { useState, useEffect } from "react";
import CollectionPage from "./Pages/CollectionPage/CollectionPage";
import AdminPage from "./AdminPage/AdminPage";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  // const [isLoading, setLoading] = useState(true);

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

  return (
    <div className="App">
      <Router>
        <Banner></Banner>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route
            exact
            path="/product/product-detail/:id"
            element={<ProductDetailPage />}
          ></Route>
          <Route
            exact
            path="/product/product-list-by-cate/:param"
            element={<ProductByCategoryPage />}
          ></Route>
          <Route
            exact
            path="/product/product-list-by-tag/:param"
            element={<ProductByCategoryPage />}
          ></Route>
          <Route
            exact
            path="/product/product-list-by-collection/:param"
            element={<ProductByCategoryPage />}
          ></Route>
          <Route
            exact
            path="/product/product-list-by-sex/:param"
            element={<ProductByCategoryPage />}
          ></Route>
          <Route
            exact
            path="/product/product-list-by-collection/:param"
            element={<ProductByCategoryPage />}
          ></Route>
          <Route
            exact
            path="/product/product-list-by-discount/:param"
            element={<ProductByCategoryPage />}
          ></Route>
          <Route exact path="/cart" element={<CartPage></CartPage>}></Route>
          <Route
            exact
            path="/checkout/shipping"
            element={<CheckoutPage></CheckoutPage>}
          ></Route>
          <Route
            exact
            path="/checkout/payment"
            element={<PaymentPage></PaymentPage>}
          ></Route>
          <Route
            exact
            path="/checkout/thankyou"
            element={<ThankYouPage></ThankYouPage>}
          ></Route>
          <Route
            exact
            path="/search/:keyword"
            element={<SearchResultPage></SearchResultPage>}
          ></Route>
          <Route
            exact
            path="/signin"
            element={<SignInPage></SignInPage>}
          ></Route>
          <Route
            exact
            path="/collection/all-collection"
            element={<CollectionPage></CollectionPage>}
          ></Route>

          {/* admin Pages  */}
          <Route exact path="/admin" element={<AdminPage></AdminPage>}></Route>
          <Route path="*" element={<NotFound></NotFound>} />
        </Routes>

        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
