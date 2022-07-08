import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";

import "./SameProducts.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
// import ProductList from "../ProductList/ProductList";

const SameProducts = (props) => {
  let products = props.dataSameProduct || [];
  let numToPrice = (x) => {
    return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  };

  let renderSameProducts = (products) => {
    console.log(products);

    return products.map((p, key) => {
      return (
        <SwiperSlide key={"pSlide" + key}>
          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="nestedSwiper"
          >
            {p.Image.map((pp, k) => {
              return (
                <SwiperSlide key={"cSlide" + k}>
                  <Link
                    className="ImgLink"
                    to={"/product/product-detail/" + p._id}
                  >
                    <img src={pp} alt="" />
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {p.Discount & (p.Discount != "") ? (
            <p className="SameProductsSaleTitle">{p.Discount.Name}</p>
          ) : (
            ""
          )}
          <div className="SameProductsInfo">
            <Link to="#" className="SameProductsName">
              {p.Name}
            </Link>
            <div className="SameProductsPriceBox">
              {p.Discount & (p.Discount != "") ? (
                <p className="SameProductsSalePrice">
                  {numToPrice(p.FinalPrice)}
                </p>
              ) : (
                ""
              )}
              <p className="SameProductsPrice">{numToPrice(p.Price)}</p>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };

  return (
    <div className="SameProducts">
      <h3 className="SameProductsTitle">Sản Phẩm Tương Tự: </h3>
      <div className="SameProductsSlide">
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          className="SameProductSwiper"
          //   navigation={true}
          modules={[Navigation]}
          noSwiping={true}
          navigation={{
            nextEl: ".SameProduct-button-next",
            prevEl: ".SameProduct-button-prev",
          }}
          noSwipingClass="SameProductSwiper"
        >
          {renderSameProducts(products)}
          {/* <ProductList dataProductList={props.dataSameProduct}></ProductList> */}
        </Swiper>
        <div className="swiper-button-prev  SameProduct-button-prev"></div>
        <div className="swiper-button-next  SameProduct-button-next"></div>
      </div>
    </div>
  );
};

export default SameProducts;
