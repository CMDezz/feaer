import "./App.css";
import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Homepage from "./Pages/Homepage/Homepage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage";

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
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
