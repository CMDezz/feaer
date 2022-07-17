import React, { useState, useEffect } from "react";
import "./CollectionPage.scss";
// import HomepageData from "./HomepageData";
import HeroSection from "../../Components/HeroSection/HeroSection";
import { Link, useParams } from "react-router-dom";

const CollectionPage = () => {
  window.scrollTo({ top: 0 });
  const baseApiUrl = process.env.REACT_APP_API_URL;

  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const fetchUrl = [baseApiUrl + "/collection"];
    Promise.all(
      fetchUrl.map((url) => {
        return fetch(url).then((res) => res.json());
      })
    ).then(([collection]) => {
      setCollection([...collection]);
      setIsLoading(false); // Hide loading screen
    });
  }, []);

  let renderCollection = (collect) => {
    return collect.map((c) => {
      return (
        <div className="CollectionItem">
          <div className="CollectionImage">
            <img src={c.Image} alt="" />
          </div>
          <div className="CollectionInfo">
            <Link
              to={"/product/product-list-by-collection/" + c.Name}
              className="CollectionTitle"
            >
              {c.Title}
            </Link>
            <p className="CollectionDesc">{c.Desc}</p>
            <Link
              to={"/product/product-list-by-collection/" + c.Name}
              className="CollectionBtn"
            >
              Xem Sản Phẩm
            </Link>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="CollectionPage">
      <div className="BackgroundBanner">
        <h3 className="BackgroundBannerTitle">Bộ Sưu Tập</h3>
      </div>
      <div className="CollectionBox">{renderCollection(collection)}</div>
    </div>
  );
};

export default CollectionPage;
