import React, { useState, useEffect } from "react";
import "./SearchResultPage.scss";
import { useParams } from "react-router-dom";
import ProductList from "./../../Components/ProductList/ProductList";
import { TbMoodEmpty } from "react-icons/tb";

const SearchResultPage = () => {
  const { keyword } = useParams();
  const [result, setResult] = useState([]);
  const baseApiUrl = "http://localhost:5000/api";
  const [loading, setLoading] = useState(true);

  const apiUrl = [baseApiUrl + "/product/getProductsByName?keyword=" + keyword];
  let handleFilter = (e) => {
    let pList = result;
    switch (e.target.value) {
      case "az":
        return setResult([
          ...pList.sort((a, b) => a.Name.localeCompare(b.Name)),
        ]);
      case "za":
        return setResult([
          ...pList.sort((a, b) => b.Name.localeCompare(a.Name)),
        ]);
      case "increase":
        return setResult([
          ...pList.sort((a, b) => a.FinalPrice - b.FinalPrice),
        ]);
      case "decrease":
        return setResult([
          ...pList.sort((a, b) => b.FinalPrice - a.FinalPrice),
        ]);

      default:
        break;
    }
  };
  useEffect(() => {
    Promise.all(
      apiUrl.map((url) => {
        return fetch(url).then((res) => res.json());
      })
    ).then(([searchResult]) => {
      setResult(searchResult);
      setLoading(false);
    });
  }, [keyword]);
  return result.length > 0 ? (
    <div className="SearchResultPage">
      <div className="SearchResultPageContainer">
        <div className="SearchResultPageTop">
          <div className="tempBox"></div>
          <h3 className="SearchResultPageTitle">
            Kết Quả Tìm kiếm cho "{keyword}"
          </h3>
          <div className="FilterAndSort">
            <div className="Sort">
              <select
                name="SortProduct"
                id="SortProduct"
                onChange={(e) => handleFilter(e)}
              >
                <option value="">Sắp Xếp Theo</option>
                <option value="az">Tên A-Z</option>
                <option value="za">Tên Z-A</option>
                <option value="increase">Giá Tăng Dần</option>
                <option value="decrease">Giá Giảm Dần</option>
              </select>
            </div>
          </div>
        </div>

        <div className="SearchResultPageResult">
          <ProductList
            isLoading={loading}
            dataProductList={result}
          ></ProductList>
        </div>
      </div>
    </div>
  ) : (
    <div className="SearchResultPageNoResult">
      <div className="SearchResultPageNoResultContainer">
        <div className="icon">
          <TbMoodEmpty></TbMoodEmpty>
        </div>
        <div className="text">
          <h3>Rất tiếc, không có kết quả tìm kiếm phù hợp!</h3>
          <p>Vui lòng tìm kiếm với từ khóa khác</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;

// {
// (
// <div className="SearchResultPageNoResult">
//   <div className="icon">
//     <TbMoodEmpty></TbMoodEmpty>
//   </div>
//   <div className="text">
//     <h3>Rất tiếc, không có kết quả tìm kiếm phù hợp!</h3>
//     <p>Vui lòng tìm kiếm với từ khóa khác</p>
//   </div>
// </div>
// )
// }
