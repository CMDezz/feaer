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
import AdminPage from "./AdminPage/Dashboard/Dashboard";
import NotFound from "./Components/NotFound/NotFound";
import CommonRoute from "./CommonRouteComp";
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

          {/* admin Pages  */}
          <Route exact path="/admin" element={<AdminPage></AdminPage>}></Route>
          <Route path="*" element={< CommonRoute comp={<NotFound/>}/>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
