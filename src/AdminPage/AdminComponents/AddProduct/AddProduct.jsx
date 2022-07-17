import React from "react";

const AddProduct = () => {
  function uploadImage(e) {
    var files = document.getElementsByClassName("input-image")[0].files[0];
    console.log(files[0]);
    if (files) {
      //   if (files[0].size > $(this).data("max-size") * 1024) {
      //     console.log("Vui lòng chọn file có dung lượng nhỏ hơn!");
      //     return false;
      //   }

      console.log("Đang upload hình ảnh lên imgur...");

      var apiUrl = "https://api.imgur.com/3/image";
      var apiKey = "5a823def27c9647";

      var settings = {
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: "POST",
        url: apiUrl,
        headers: {
          Authorization: "Client-ID " + apiKey,
          Accept: "application/json",
        },
        mimeType: "multipart/form-data",
      };

      var formData = new FormData();
      formData.append("image", files);
      settings.data = formData;

      fetch(apiUrl, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify(formData),
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        headers: {
          Authorization: "Client-ID " + apiKey,
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }
  return (
    <div>
      <h3 className="AdminProductsTitle">Thêm Sản Phẩm</h3>;
      <form>
        <input
          className="input-image"
          onChange={(e) => uploadImage(e)}
          name="file[]"
          type="file"
          multiple="multiple"
        />
      </form>
    </div>
  );
};

export default AddProduct;
