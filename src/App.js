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

function App() {
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
            path="/product/product-list/:category"
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
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
