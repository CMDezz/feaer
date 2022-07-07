import React, { useState } from "react";
import "./CheckoutForm.scss";
import AddressData from "./Addressdata";
import Select from "react-select";
import CategoryList from "../CategoryList/CategoryList";

const CheckoutForm = () => {
  //   let [defaultDistrictValue, setDefaultDistrictValue] = useState(null);
  //   let [defaultWardValue, setDefaultWardValue] = useState(null);

  // let
  let [districtsList, setDistrictsList] = useState([{}]);
  let [wardsList, setWardList] = useState([{}]);
  let [cityPicked, setCityPicked] = useState("");
  let [districtPicked, setDistrictPicked] = useState("");
  let [wardPicked, setWardPicked] = useState("");

  //validate
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [address, setAddress] = useState("");

  let cityOptions = AddressData.map((city) => {
    return {
      value: city.code,
      label: city.name,
    };
  });
  let handleCitySelect = (city) => {
    //find city  - get District
    let Districts = AddressData.find((c) => c.code == city.value).districts;
    let DistrictOptions = Districts.map((dis) => {
      return {
        value: dis.id,
        label: dis.name,
      };
    });
    setDistrictsList(DistrictOptions);
    setCityPicked(city);
    setDistrictPicked("");
    setWardPicked("");
  };

  let handleDistrictSelect = (e) => {
    setDistrictPicked(e);
    let Districts = AddressData.find(
      (c) => c.code == cityPicked.value
    ).districts;
    let Wards = Districts.find((d) => d.id == e.value).wards;
    let WardsOptions = Wards.map((ward) => {
      return {
        value: ward.id,
        label: ward.name,
      };
    });
    setWardList(WardsOptions);
    setWardPicked("");
  };

  let handleWardSelect = (e) => {
    setWardPicked(e);
  };

  return (
    <div className="CheckoutForm">
      <form action="" className="CheckoutFormBox">
        <div className="CheckoutFormContact">
          <h4 className="CheckoutFormContactTitle">THÔNG TIN LIÊN HỆ</h4>
          <div className="CheckoutFormContactBox">
            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormEmail"
                className="CheckoutFormLabel CheckoutFormEmail"
              >
                EMAIL XÁC NHẬN ĐƠN HÀNG
              </label>
              <input
                type="email"
                className="CheckoutFormInput CheckoutFormEmail"
                name="CheckoutFormEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {email == "" ? <p className="warn">*Không thể trống</p> : ""}
            </div>
            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormPhone"
                className="CheckoutFormLabel CheckoutFormPhone"
              >
                ĐIỆN THOẠI (DI ĐỘNG)
              </label>
              <input
                type="tel"
                className="CheckoutFormInput CheckoutFormPhone"
                name="CheckoutFormPhone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {phone == "" ? <p className="warn">*Không thể trống</p> : ""}
            </div>
          </div>
        </div>
        <div className="CheckoutFormShipping">
          <h4 className="CheckoutFormShippingTitle">THÔNG TIN GIAO HÀNG</h4>

          <div className="CheckoutFormShippingBox">
            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormLastName"
                className="CheckoutFormLabel CheckoutFormLastName"
              >
                TÊN
              </label>
              <input
                type="tel"
                className="CheckoutFormInput CheckoutFormLastName"
                name="CheckoutFormLastName"
                id="CheckoutFormLastNameInput"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {firstName == "" ? <p className="warn">*Không thể trống</p> : ""}
            </div>

            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormFirstName"
                className="CheckoutFormLabel CheckoutFormFirstName"
              >
                HỌ
              </label>
              <input
                type="tel"
                className="CheckoutFormInput CheckoutFormFirstName"
                name="CheckoutFormFirstName"
                id="CheckoutFormFirstNameInput"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {lastName == "" ? <p className="warn">*Không thể trống</p> : ""}
            </div>

            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormCity"
                className="CheckoutFormLabel CheckoutFormCity"
              >
                TỈNH/ THÀNH PHỐ
              </label>
              <Select
                className="CheckoutFormCitySelect CheckoutFormCity"
                name="CheckoutFormCity"
                id="CheckoutFormCitySelect"
                onChange={(e) => handleCitySelect(e)}
                options={cityOptions}
                value={cityPicked}
              />
              {cityPicked == "" ? <p className="warn">*Không thể trống</p> : ""}
            </div>

            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormDistrict"
                className="CheckoutFormLabel CheckoutFormDistrict"
              >
                QUẬN/ HUYỆN
              </label>
              <Select
                className="CheckoutFormDistrictSelect CheckoutFormCity"
                name="CheckoutFormDistrict"
                id="CheckoutFormDistrictSelect"
                // value={defaultDistrictValue}
                options={districtsList}
                onChange={(e) => handleDistrictSelect(e)}
                value={districtPicked}
              />
              {districtPicked == "" ? (
                <p className="warn">*Không thể trống</p>
              ) : (
                ""
              )}
            </div>

            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormWard"
                className="CheckoutFormLabel CheckoutFormWard"
              >
                PHƯỜNG/ THỊ XÃ
              </label>
              <Select
                className="CheckoutFormWardSelect CheckoutFormCity"
                name="CheckoutFormWard"
                id="CheckoutFormWard"
                // value={defaultWardValue}
                options={wardsList}
                onChange={(e) => handleWardSelect(e)}
                value={wardPicked}
              />
              {wardPicked == "" ? <p className="warn">*Không thể trống</p> : ""}
            </div>

            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormAddress"
                className="CheckoutFormLabel CheckoutFormAddress"
              >
                ĐỊA CHỈ GIAO HÀNG
              </label>
              <input
                type="tel"
                className="CheckoutFormInput CheckoutFormAddress"
                name="CheckoutFormAddress"
                id="CheckoutFormAddressInput"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              {address == "" ? <p className="warn">*Không thể trống</p> : ""}
            </div>
          </div>
        </div>
        <div className="CheckoutFormNote">
          <div className="CheckoutFormNoteInput">
            <label
              htmlFor="CheckoutFormNote"
              className="CheckoutFormLabel CheckoutFormNote"
            >
              GHI CHÚ CHO ĐƠN HÀNG
            </label>
            <textarea
              className="CheckoutFormInput CheckoutFormNote"
              name="CheckoutFormNote"
              id="CheckoutFormNoteInput"
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
