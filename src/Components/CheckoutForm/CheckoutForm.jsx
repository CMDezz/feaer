import React, { useState, useEffect } from "react";
import "./CheckoutForm.scss";
import AddressData from "./Addressdata";
import Select from "react-select";
import CategoryList from "../CategoryList/CategoryList";

const CheckoutForm = (props) => {
  //   let [defaultDistrictValue, setDefaultDistrictValue] = useState(null);
  //   let [defaultWardValue, setDefaultWardValue] = useState(null);

  let [districtsList, setDistrictsList] = useState([{}]);
  let [wardsList, setWardList] = useState([{}]);

  //create info
  let [orderForm, setOrderForm] = useState({
    CustomerEmail: "",
    CustomerPhone: "",
    CustomerFirstName: "",
    CustomerLastName: "",
    District: "",
    Ward: "",
    City: "",
    Address: "",
    Note: "",
  });

  let cityOptions = AddressData.map((city, k) => {
    return {
      value: city.code,
      label: city.name,
    };
  });
  let handleCitySelect = (city) => {
    //find city  - get District
    let Districts = AddressData.find((c) => c.code == city.value).districts;
    let DistrictOptions = Districts.map((dis, k) => {
      return {
        value: dis.id,
        label: dis.name,
      };
    });
    setDistrictsList(DistrictOptions);
    setOrderForm({ ...orderForm, City: city, District: "", Ward: "" });
  };
  useEffect(() => {
    props.handleOrderForm(orderForm);
  }, [orderForm]);

  let handleDistrictSelect = (e) => {
    setOrderForm({ ...orderForm, District: e, Ward: "" });
    let Districts = AddressData.find(
      (c) => c.code == orderForm.City.value
    ).districts;
    let Wards = Districts.find((d) => d.id == e.value).wards;
    let WardsOptions = Wards.map((ward, k) => {
      return {
        value: ward.id,
        label: ward.name,
      };
    });
    setWardList(WardsOptions);
  };

  let handleWardSelect = (e) => {
    setOrderForm({ ...orderForm, Ward: e });
  };

  return (
    <div className="CheckoutForm">
      <form action="" className="CheckoutFormBox">
        <div className="CheckoutFormContact">
          <h4 className="CheckoutFormContactTitle">TH??NG TIN LI??N H???</h4>
          <div className="CheckoutFormContactBox">
            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormEmail"
                className="CheckoutFormLabel CheckoutFormEmail"
              >
                EMAIL X??C NH???N ????N H??NG
              </label>
              <input
                type="email"
                className="CheckoutFormInput CheckoutFormEmail"
                name="CheckoutFormEmail"
                value={orderForm.CustomerEmail}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, CustomerEmail: e.target.value })
                }
              />
              {orderForm.CustomerEmail == "" ? (
                <p className="warn">*Kh??ng th??? tr???ng</p>
              ) : (
                ""
              )}
            </div>
            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormPhone"
                className="CheckoutFormLabel CheckoutFormPhone"
              >
                ??I???N THO???I (DI ?????NG)
              </label>
              <input
                type="tel"
                className="CheckoutFormInput CheckoutFormPhone"
                name="CheckoutFormPhone"
                value={orderForm.CustomerPhone}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, CustomerPhone: e.target.value })
                }
              />
              {orderForm.CustomerPhone == "" ? (
                <p className="warn">*Kh??ng th??? tr???ng</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="CheckoutFormShipping">
          <h4 className="CheckoutFormShippingTitle">TH??NG TIN GIAO H??NG</h4>

          <div className="CheckoutFormShippingBox">
            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormLastName"
                className="CheckoutFormLabel CheckoutFormLastName"
              >
                T??N
              </label>
              <input
                type="tel"
                className="CheckoutFormInput CheckoutFormLastName"
                name="CheckoutFormLastName"
                id="CheckoutFormLastNameInput"
                value={orderForm.CustomerLastName}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    CustomerLastName: e.target.value,
                  })
                }
              />
              {orderForm.CustomerLastName == "" ? (
                <p className="warn">*Kh??ng th??? tr???ng</p>
              ) : (
                ""
              )}
            </div>

            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormFirstName"
                className="CheckoutFormLabel CheckoutFormFirstName"
              >
                H???
              </label>
              <input
                type="tel"
                className="CheckoutFormInput CheckoutFormFirstName"
                name="CheckoutFormFirstName"
                id="CheckoutFormFirstNameInput"
                value={orderForm.CustomerFirstName}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    CustomerFirstName: e.target.value,
                  })
                }
              />
              {orderForm.CustomerFirstName == "" ? (
                <p className="warn">*Kh??ng th??? tr???ng</p>
              ) : (
                ""
              )}
            </div>

            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormCity"
                className="CheckoutFormLabel CheckoutFormCity"
              >
                T???NH/ TH??NH PH???
              </label>
              <Select
                className="CheckoutFormCitySelect CheckoutFormCity"
                name="CheckoutFormCity"
                id="CheckoutFormCitySelect"
                onChange={(e) => handleCitySelect(e)}
                options={cityOptions}
                value={orderForm.City}
              />
              {orderForm.City == "" ? (
                <p className="warn">*Kh??ng th??? tr???ng</p>
              ) : (
                ""
              )}
            </div>

            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormDistrict"
                className="CheckoutFormLabel CheckoutFormDistrict"
              >
                QU???N/ HUY???N
              </label>
              <Select
                className="CheckoutFormDistrictSelect CheckoutFormCity"
                name="CheckoutFormDistrict"
                id="CheckoutFormDistrictSelect"
                // value={defaultDistrictValue}
                options={districtsList}
                onChange={(e) => handleDistrictSelect(e)}
                value={orderForm.District}
              />
              {orderForm.District == "" ? (
                <p className="warn">*Kh??ng th??? tr???ng</p>
              ) : (
                ""
              )}
            </div>

            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormWard"
                className="CheckoutFormLabel CheckoutFormWard"
              >
                PH?????NG/ TH??? X??
              </label>
              <Select
                className="CheckoutFormWardSelect CheckoutFormCity"
                name="CheckoutFormWard"
                id="CheckoutFormWard"
                // value={defaultWardValue}
                options={wardsList}
                onChange={(e) => handleWardSelect(e)}
                value={orderForm.Ward}
              />
              {orderForm.Ward == "" ? (
                <p className="warn">*Kh??ng th??? tr???ng</p>
              ) : (
                ""
              )}
            </div>

            <div className="CheckoutFormBoxInput">
              <label
                htmlFor="CheckoutFormAddress"
                className="CheckoutFormLabel CheckoutFormAddress"
              >
                ?????A CH??? GIAO H??NG
              </label>
              <input
                type="tel"
                className="CheckoutFormInput CheckoutFormAddress"
                name="CheckoutFormAddress"
                id="CheckoutFormAddressInput"
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    Address: e.target.value,
                  })
                }
                value={orderForm.Address}
              />
              {orderForm.Address == "" ? (
                <p className="warn">*Kh??ng th??? tr???ng</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="CheckoutFormNote">
          <div className="CheckoutFormNoteInput">
            <label
              htmlFor="CheckoutFormNote"
              className="CheckoutFormLabel CheckoutFormNote"
            >
              GHI CH?? CHO ????N H??NG
            </label>
            <textarea
              className="CheckoutFormInput CheckoutFormNote"
              name="CheckoutFormNote"
              id="CheckoutFormNoteInput"
              cols="30"
              rows="5"
              value={orderForm.Note}
              onChange={(e) =>
                setOrderForm({
                  ...orderForm,
                  Note: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
