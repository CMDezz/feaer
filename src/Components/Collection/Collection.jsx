import React from "react";
import "./Collection.scss";
import { Link } from "react-router-dom";

const Collection = (props) => {
  let renderCollection = () => {
    return props.dataCollection.map((i, k) => {
      return (
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
      );
    });
  };
  return <div className="Collection">{renderCollection()}</div>;
};

export default Collection;
