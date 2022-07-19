import React from "react";
import "./Collection.scss";
import { Link } from "react-router-dom";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
const Collection = (props) => {
  let renderCollection = () => {
    return props.dataCollection.map((i, k) => {
      return (
        <SwiperSlide>
          <div className="CollectionItem" key={k}>
            <img src={i.Image} alt="" className="CollectionItemImg" />
            <div className="CollectionItemInfo">
              <h4 className="CollectionItemTitle">{i.Title}</h4>
              <p className="CollectionItemDesc">{i.Desc}</p>
              <Link
                to="/collection/all-collection"
                className="CollectionItemBtnViewDetail"
              >
                Xem Tất Cả
              </Link>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };
  return (
    <div className="Collection">
      <Swiper
        slidesPerView={1}
        breakpoints={{
          992: {
            // width: 768,
            slidesPerView: 2,
          },
        }}
        className="CollectionSwiper"
      >
        {renderCollection()}
      </Swiper>
    </div>
  );
};

export default Collection;
