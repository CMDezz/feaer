import React from "react";
import "./Collection.scss";

const Collection = (props) => {
  let renderCollection = () => {
    return props.dataCollection.map((i, k) => {
      return (
        <div className="CollectionItem" key={k}>
          <img src={i.img} alt="" className="CollectionItemImg" />
          <div className="CollectionItemInfo">
            <h4 className="CollectionItemTitle">{i.title}</h4>
            <p className="CollectionItemDesc">{i.desc}</p>
            <a className="CollectionItemBtnViewDetail">Xem Chi Tiết</a>
          </div>
        </div>
      );
    });
  };
  return <div className="Collection">{renderCollection()}</div>;
};

export default Collection;
