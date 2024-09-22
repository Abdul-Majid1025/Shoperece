import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import Sidebar from "../../../components/Sidebar/Sidebar.component";
import "./Edit-Store.Styles.css";

import { useDispatch, useSelector } from "react-redux";
import {
  getSingleStoreInfo,
  getSingleStoreInformation,
  deleteMerchantStore,
} from "../../../Redux/Actions/Stores.Actions";

function Editstore(props) {
  const dispatch = useDispatch();

  const currentStore = useSelector((state) => state.currentStore);
  const { CurrentStore } = currentStore;

  const getStoreInfo = useSelector((state) => state.getStoreInfo);
  const { storeInfo, loading, error } = getStoreInfo;
  console.log("storeInfo", storeInfo);

  const deleteAStore = useSelector((state) => state.deleteAStore);
  const { success: deleteAStoreSuccess } = deleteAStore;

  if (deleteAStoreSuccess) {
    window.location.href = "/merchantstores";
  }

  const deleteStore = () => {
    dispatch(deleteMerchantStore(props.match.params.id));
  };

  useEffect(() => {
    dispatch(getSingleStoreInformation(props.match.params.id));
  }, [props.match.params.id]);
  return (
    <>
      <MyNavbarComponent />
      <div className="setsidebar">
        <Sidebar storeId={props.match.params.id}></Sidebar>
        <div className="editstorecontainer">
          <Container className="my-3 container1">
            <Row>
              <Col xs={12} md={1}>
                <Link to={`/settings/${props.match.params.id}`}>
                  <button
                    style={{
                      width: "35px",
                      height: "35px",
                      border: "1px solid lightgray",
                      borderRadius: "5px",
                      color: "gray",
                      backgroundColor: "rgb(241,242,243,1)",
                    }}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      class="Polaris-Icon__Svg_375hu"
                      focusable="false"
                      aria-hidden="true"
                    >
                      <path d="M17 9H5.414l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L5.414 11H17a1 1 0 1 0 0-2z"></path>
                    </svg>
                  </button>
                </Link>
              </Col>
              <Col className="my-2" xs={12} md={11}>
                <div>
                  <h5 style={{ float: "left" }}>General</h5>
                </div>
              </Col>
            </Row>
            <Row className="my-3">
              <Col className="my-3" xs={12} lg={4}>
                <div>
                  <h6 className="mb-4">Store details</h6>
                  <span>
                    Shoperece will use this information to contact you.
                  </span>
                </div>
              </Col>

              <Col xs={12} lg={8}>
                <div
                  className="p-4"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <span>Store name</span>
                  <br />
                  <input
                    type="text"
                    required
                    style={{ width: "100%" }}
                    value={storeInfo ? storeInfo[0].storeName : ""}
                  />

                  <Row className="my-3">
                    <Col xs={6}>
                      <span>Store contact email</span>
                      <input
                        type="text"
                        required
                        style={{ width: "100%" }}
                        value={storeInfo ? storeInfo[0].email : ""}
                      />
                      <span>
                        We'll use this address if we need to contact you about
                        your store.
                      </span>
                    </Col>
                    <Col xs={6}>
                      <span>Sender email</span>
                      <input type="text" required style={{ width: "100%" }} />
                      <span>
                        Your customers will see this address if you email them.
                      </span>
                    </Col>
                  </Row>
                  <span>Store industry</span>
                  <br />
                  <select className="mt-1" style={{ width: "100%" }}>
                    <option value="beauty">Beauty</option>
                    <option value="clothing">Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="handcrafts">Handcrafts</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="painting">Painting</option>
                    <option value="photography">Photography</option>
                    <option value="restaurants">Restaurants</option>
                    <option value="groceries">Groceries</option>
                    <option value="other_food_drink">
                      Other food &amp; drink
                    </option>
                    <option value="sports">Sports</option>
                    <option value="toys">Toys</option>
                    <option value="services">Services</option>
                    <option value="virtual_services">Virtual services</option>
                    <option value="other">Other</option>
                    <option value="do_not_know">I haven’t decided yet</option>
                  </select>
                </div>
              </Col>
            </Row>
            <hr />
            <Row className="my-3">
              <Col className="my-3" xs={12} lg={4}>
                <div>
                  <h6 className="mb-4">Store address</h6>
                  <span>
                    This address will appear on your invoices. You can edit the
                    address used to calculate shipping rates in your
                    <a className="ms-1" href="#">
                      shipping settings.
                    </a>
                  </span>
                  <br />
                  <br />
                  <span>
                    Your primary business location could affect which apps can
                    be used on your store.
                    <a className="ms-1" href="#">
                      {" "}
                      Learn more about app compatibility
                    </a>
                  </span>
                </div>
              </Col>

              <Col xs={12} lg={8}>
                <div
                  className="p-4"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <span>Legal name of company</span>
                  <br />
                  <input type="text" required style={{ width: "100%" }} />
                  <br />
                  <br />
                  <span className="mt-3">Phone</span>
                  <br />
                  <input type="text" required style={{ width: "100%" }} />
                  <br />
                  <br />
                  <span className="mt-3">Address</span>
                  <br />
                  <input type="text" required style={{ width: "100%" }} />
                  <br />
                  <br />
                  <span className="mt-3">Apartment, suite, etc.</span>
                  <br />
                  <input type="text" required style={{ width: "100%" }} />
                  <br />
                  <br />
                  <span className="mt-3">City</span>
                  <br />
                  <input type="text" required style={{ width: "100%" }} />

                  <Row className="my-3">
                    <Col xs={6}>
                      <span>Country/region</span>
                      <input type="text" required style={{ width: "100%" }} />
                    </Col>
                    <Col xs={6}>
                      <span>Postal code</span>
                      <input type="text" required style={{ width: "100%" }} />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <hr />
            <Row className="my-3">
              <Col className="my-3" xs={12} lg={4}>
                <div>
                  <h6 className="mb-4">Standards and formats</h6>
                  <span>
                    Standards and formats are used to calculate product prices,
                    shipping weights, and order times.
                  </span>
                </div>
              </Col>

              <Col xs={12} lg={8}>
                <div
                  className="p-4"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <span>Time zone</span>
                  <br />
                  <select style={{ width: "100%" }}>
                    <option value="Etc/GMT+12">
                      (GMT-12:00) International Date Line West
                    </option>
                    <option value="Pacific/Pago_Pago">
                      (GMT-11:00) American Samoa
                    </option>
                    <option value="Pacific/Midway">
                      (GMT-11:00) Midway Island
                    </option>
                    <option value="Pacific/Honolulu">(GMT-10:00) Hawaii</option>
                    <option value="America/Juneau">(GMT-09:00) Alaska</option>
                    <option value="America/Los_Angeles">
                      (GMT-08:00) Pacific Time (US &amp; Canada)
                    </option>
                    <option value="America/Tijuana">(GMT-08:00) Tijuana</option>
                    <option value="America/Phoenix">(GMT-07:00) Arizona</option>
                    <option value="America/Chihuahua">
                      (GMT-07:00) Chihuahua
                    </option>
                    <option value="America/Mazatlan">
                      (GMT-07:00) Mazatlan
                    </option>
                    <option value="America/Denver">
                      (GMT-07:00) Mountain Time (US &amp; Canada)
                    </option>
                    <option value="America/Guatemala">
                      (GMT-06:00) Central America
                    </option>
                    <option value="America/Chicago">
                      (GMT-06:00) Central Time (US &amp; Canada)
                    </option>
                    <option value="America/Mexico_City">
                      (GMT-06:00) Guadalajara, Mexico City
                    </option>
                    <option value="America/Monterrey">
                      (GMT-06:00) Monterrey
                    </option>
                    <option value="America/Regina">
                      (GMT-06:00) Saskatchewan
                    </option>
                    <option value="America/Bogota">(GMT-05:00) Bogota</option>
                    <option value="America/New_York">
                      (GMT-05:00) Eastern Time (US &amp; Canada)
                    </option>
                    <option value="America/Indiana/Indianapolis">
                      (GMT-05:00) Indiana (East)
                    </option>
                    <option value="America/Lima">
                      (GMT-05:00) Lima, Quito
                    </option>
                    <option value="America/Halifax">
                      (GMT-04:00) Atlantic Time (Canada)
                    </option>
                    <option value="America/Caracas">(GMT-04:00) Caracas</option>
                    <option value="America/Guyana">
                      (GMT-04:00) Georgetown
                    </option>
                    <option value="America/La_Paz">(GMT-04:00) La Paz</option>
                    <option value="America/Puerto_Rico">
                      (GMT-04:00) Puerto Rico
                    </option>
                    <option value="America/Santiago">
                      (GMT-04:00) Santiago
                    </option>
                    <option value="America/St_Johns">
                      (GMT-03:30) Newfoundland
                    </option>
                    <option value="America/Sao_Paulo">
                      (GMT-03:00) Brasilia
                    </option>
                    <option value="America/Argentina/Buenos_Aires">
                      (GMT-03:00) Buenos Aires
                    </option>
                    <option value="America/Godthab">
                      (GMT-03:00) Greenland
                    </option>
                    <option value="America/Montevideo">
                      (GMT-03:00) Montevideo
                    </option>
                    <option value="Atlantic/South_Georgia">
                      (GMT-02:00) Mid-Atlantic
                    </option>
                    <option value="Atlantic/Azores">(GMT-01:00) Azores</option>
                    <option value="Atlantic/Cape_Verde">
                      (GMT-01:00) Cape Verde Is.
                    </option>
                    <option value="Europe/London">
                      (GMT+00:00) Edinburgh, London
                    </option>
                    <option value="Europe/Lisbon">(GMT+00:00) Lisbon</option>
                    <option value="Africa/Monrovia">
                      (GMT+00:00) Monrovia
                    </option>
                    <option value="Etc/UTC">(GMT+00:00) UTC</option>
                    <option value="Europe/Amsterdam">
                      (GMT+01:00) Amsterdam
                    </option>
                    <option value="Europe/Belgrade">
                      (GMT+01:00) Belgrade
                    </option>
                    <option value="Europe/Berlin">(GMT+01:00) Berlin</option>
                    <option value="Europe/Zurich">
                      (GMT+01:00) Bern, Zurich
                    </option>
                    <option value="Europe/Bratislava">
                      (GMT+01:00) Bratislava
                    </option>
                    <option value="Europe/Brussels">
                      (GMT+01:00) Brussels
                    </option>
                    <option value="Europe/Budapest">
                      (GMT+01:00) Budapest
                    </option>
                    <option value="Africa/Casablanca">
                      (GMT+01:00) Casablanca
                    </option>
                    <option value="Europe/Copenhagen">
                      (GMT+01:00) Copenhagen
                    </option>
                    <option value="Europe/Dublin">(GMT+00:00) Dublin</option>
                    <option value="Europe/Ljubljana">
                      (GMT+01:00) Ljubljana
                    </option>
                    <option value="Europe/Madrid">(GMT+01:00) Madrid</option>
                    <option value="Europe/Paris">(GMT+01:00) Paris</option>
                    <option value="Europe/Prague">(GMT+01:00) Prague</option>
                    <option value="Europe/Rome">(GMT+01:00) Rome</option>
                    <option value="Europe/Sarajevo">
                      (GMT+01:00) Sarajevo
                    </option>
                    <option value="Europe/Skopje">(GMT+01:00) Skopje</option>
                    <option value="Europe/Stockholm">
                      (GMT+01:00) Stockholm
                    </option>
                    <option value="Europe/Vienna">(GMT+01:00) Vienna</option>
                    <option value="Europe/Warsaw">(GMT+01:00) Warsaw</option>
                    <option value="Africa/Algiers">
                      (GMT+01:00) West Central Africa
                    </option>
                    <option value="Europe/Zagreb">(GMT+01:00) Zagreb</option>
                    <option value="Europe/Athens">(GMT+02:00) Athens</option>
                    <option value="Europe/Bucharest">
                      (GMT+02:00) Bucharest
                    </option>
                    <option value="Africa/Cairo">(GMT+02:00) Cairo</option>
                    <option value="Africa/Harare">(GMT+02:00) Harare</option>
                    <option value="Europe/Helsinki">
                      (GMT+02:00) Helsinki
                    </option>
                    <option value="Asia/Jerusalem">
                      (GMT+02:00) Jerusalem
                    </option>
                    <option value="Europe/Kaliningrad">
                      (GMT+02:00) Kaliningrad
                    </option>
                    <option value="Europe/Kiev">(GMT+02:00) Kyiv</option>
                    <option value="Africa/Johannesburg">
                      (GMT+02:00) Pretoria
                    </option>
                    <option value="Europe/Riga">(GMT+02:00) Riga</option>
                    <option value="Europe/Sofia">(GMT+02:00) Sofia</option>
                    <option value="Europe/Tallinn">(GMT+02:00) Tallinn</option>
                    <option value="Europe/Vilnius">(GMT+02:00) Vilnius</option>
                    <option value="Asia/Baghdad">(GMT+03:00) Baghdad</option>
                    <option value="Europe/Istanbul">
                      (GMT+03:00) Istanbul
                    </option>
                    <option value="Asia/Kuwait">(GMT+03:00) Kuwait</option>
                    <option value="Europe/Minsk">(GMT+03:00) Minsk</option>
                    <option value="Europe/Moscow">
                      (GMT+03:00) Moscow, St. Petersburg
                    </option>
                    <option value="Africa/Nairobi">(GMT+03:00) Nairobi</option>
                    <option value="Asia/Riyadh">(GMT+03:00) Riyadh</option>
                    <option value="Europe/Volgograd">
                      (GMT+03:00) Volgograd
                    </option>
                    <option value="Asia/Tehran">(GMT+03:30) Tehran</option>
                    <option value="Asia/Muscat">
                      (GMT+04:00) Abu Dhabi, Muscat
                    </option>
                    <option value="Asia/Baku">(GMT+04:00) Baku</option>
                    <option value="Europe/Samara">(GMT+04:00) Samara</option>
                    <option value="Asia/Tbilisi">(GMT+04:00) Tbilisi</option>
                    <option value="Asia/Yerevan">(GMT+04:00) Yerevan</option>
                    <option value="Asia/Kabul">(GMT+04:30) Kabul</option>
                    <option value="Asia/Yekaterinburg">
                      (GMT+05:00) Ekaterinburg
                    </option>
                    <option value="Asia/Karachi">
                      (GMT+05:00) Islamabad, Karachi
                    </option>
                    <option value="Asia/Tashkent">(GMT+05:00) Tashkent</option>
                    <option value="Asia/Kolkata">
                      (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi
                    </option>
                    <option value="Asia/Colombo">
                      (GMT+05:30) Sri Jayawardenepura
                    </option>
                    <option value="Asia/Kathmandu">
                      (GMT+05:45) Kathmandu
                    </option>
                    <option value="Asia/Almaty">(GMT+06:00) Almaty</option>
                    <option value="Asia/Dhaka">
                      (GMT+06:00) Astana, Dhaka
                    </option>
                    <option value="Asia/Urumqi">(GMT+06:00) Urumqi</option>
                    <option value="Asia/Rangoon">(GMT+06:30) Rangoon</option>
                    <option value="Asia/Bangkok">
                      (GMT+07:00) Bangkok, Hanoi
                    </option>
                    <option value="Asia/Jakarta">(GMT+07:00) Jakarta</option>
                    <option value="Asia/Krasnoyarsk">
                      (GMT+07:00) Krasnoyarsk
                    </option>
                    <option value="Asia/Novosibirsk">
                      (GMT+07:00) Novosibirsk
                    </option>
                    <option value="Asia/Shanghai">(GMT+08:00) Beijing</option>
                    <option value="Asia/Chongqing">
                      (GMT+08:00) Chongqing
                    </option>
                    <option value="Asia/Hong_Kong">
                      (GMT+08:00) Hong Kong
                    </option>
                    <option value="Asia/Irkutsk">(GMT+08:00) Irkutsk</option>
                    <option value="Asia/Kuala_Lumpur">
                      (GMT+08:00) Kuala Lumpur
                    </option>
                    <option value="Australia/Perth">(GMT+08:00) Perth</option>
                    <option value="Asia/Singapore">
                      (GMT+08:00) Singapore
                    </option>
                    <option value="Asia/Taipei">(GMT+08:00) Taipei</option>
                    <option value="Asia/Ulaanbaatar">
                      (GMT+08:00) Ulaanbaatar
                    </option>
                    <option value="Asia/Tokyo">
                      (GMT+09:00) Osaka, Sapporo, Tokyo
                    </option>
                    <option value="Asia/Seoul">(GMT+09:00) Seoul</option>
                    <option value="Asia/Yakutsk">(GMT+09:00) Yakutsk</option>
                    <option value="Australia/Adelaide">
                      (GMT+09:30) Adelaide
                    </option>
                    <option value="Australia/Darwin">(GMT+09:30) Darwin</option>
                    <option value="Australia/Brisbane">
                      (GMT+10:00) Brisbane
                    </option>
                    <option value="Australia/Melbourne">
                      (GMT+10:00) Canberra, Melbourne
                    </option>
                    <option value="Pacific/Guam">(GMT+10:00) Guam</option>
                    <option value="Australia/Hobart">(GMT+10:00) Hobart</option>
                    <option value="Pacific/Port_Moresby">
                      (GMT+10:00) Port Moresby
                    </option>
                    <option value="Australia/Sydney">(GMT+10:00) Sydney</option>
                    <option value="Asia/Vladivostok">
                      (GMT+10:00) Vladivostok
                    </option>
                    <option value="Asia/Magadan">(GMT+11:00) Magadan</option>
                    <option value="Pacific/Noumea">
                      (GMT+11:00) New Caledonia
                    </option>
                    <option value="Pacific/Guadalcanal">
                      (GMT+11:00) Solomon Is.
                    </option>
                    <option value="Asia/Srednekolymsk">
                      (GMT+11:00) Srednekolymsk
                    </option>
                    <option value="Pacific/Auckland">
                      (GMT+12:00) Auckland, Wellington
                    </option>
                    <option value="Pacific/Fiji">(GMT+12:00) Fiji</option>
                    <option value="Asia/Kamchatka">
                      (GMT+12:00) Kamchatka
                    </option>
                    <option value="Pacific/Majuro">
                      (GMT+12:00) Marshall Is.
                    </option>
                    <option value="Pacific/Chatham">
                      (GMT+12:45) Chatham Is.
                    </option>
                    <option value="Pacific/Tongatapu">
                      (GMT+13:00) Nuku'alofa
                    </option>
                    <option value="Pacific/Apia">(GMT+13:00) Samoa</option>
                    <option value="Pacific/Fakaofo">
                      (GMT+13:00) Tokelau Is.
                    </option>
                  </select>
                  <br />
                  <br />

                  <Row className="my-3">
                    <Col xs={6}>
                      <span>Unit system</span>
                      <br />

                      <select style={{ width: "100%" }}>
                        <option value="METRIC_SYSTEM">Metric system</option>
                        <option value="IMPERIAL_SYSTEM">Imperial system</option>
                      </select>
                    </Col>
                    <Col xs={6}>
                      <span>Default weight unit</span>
                      <br />
                      <select style={{ width: "100%" }}>
                        <option value="KILOGRAMS">Kilogram (kg)</option>
                        <option value="GRAMS">Gram (g)</option>
                      </select>
                    </Col>
                  </Row>
                  <hr />
                  <h6>EDIT ORDER ID FORMAT (OPTIONAL)</h6>
                  <span>
                    Order numbers start at #1001 by default. While you can’t
                    change the order number itself, you can add a prefix or
                    suffix to create IDs like "EN1001" or "1001-A."
                  </span>
                  <Row className="my-3">
                    <Col xs={6}>
                      <span>Prefix</span>
                      <br />

                      <input style={{ width: "100%" }} type="text" />
                    </Col>
                    <Col xs={6}>
                      <span>Suffix</span>
                      <br />
                      <input style={{ width: "100%" }} type="text" />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <hr />

            <Row className="my-3">
              <Col className="my-3" xs={12} lg={4}>
                <div>
                  <h6 className="mb-4">Store currency</h6>
                  <span>
                    This is the currency your products are sold in. After your
                    first sale, currency is locked in and can’t be changed. To
                    change your payout currency, go to
                    <a className="ms-1" href="#">
                      payments settings.
                    </a>
                  </span>
                  <br />
                  <br />
                  <span>
                    Learn more about your{" "}
                    <a className="ms-1" href="#">
                      {" "}
                      store currency
                    </a>
                  </span>
                </div>
              </Col>

              <Col xs={12} lg={8}>
                <div
                  className="p-3"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <Row>
                    <Col xs={7} xl={9}>
                      <h6>Store onwer</h6>
                    </Col>
                    <Col xs={5} xl={3}>
                      <button
                        style={{
                          float: "right",
                          backgroundColor: "white",
                          border: "none",
                          color: "blue",
                        }}
                      >
                        Tranfer onwership
                      </button>
                    </Col>
                  </Row>
                  <select style={{ width: "100%" }}>
                    <option value="USD">US dollars (USD)</option>
                    <option value="EUR">euros (EUR)</option>
                    <option value="GBP">British pounds (GBP)</option>
                    <option value="CAD">Canadian dollars (CAD)</option>
                    <option value="AFN">Afghan afghanis (AFN)</option>
                    <option value="ALL">Albanian lekë (ALL)</option>
                    <option value="DZD">Algerian dinars (DZD)</option>
                    <option value="AOA">Angolan kwanzas (AOA)</option>
                    <option value="ARS">Argentine pesos (ARS)</option>
                    <option value="AMD">Armenian drams (AMD)</option>
                    <option value="AWG">Aruban florin (AWG)</option>
                    <option value="AUD">Australian dollars (AUD)</option>
                    <option value="BBD">Barbadian dollars (BBD)</option>
                    <option value="AZN">Azerbaijani manats (AZN)</option>
                    <option value="BDT">Bangladeshi takas (BDT)</option>
                    <option value="BSD">Bahamian dollars (BSD)</option>
                    <option value="BHD">Bahraini dinars (BHD)</option>
                    <option value="BIF">Burundian francs (BIF)</option>
                    <option value="BZD">Belize dollars (BZD)</option>
                    <option value="BMD">Bermudian dollars (BMD)</option>
                    <option value="BTN">Bhutanese ngultrums (BTN)</option>
                    <option value="BAM">
                      Bosnia-Herzegovina convertible marks (BAM)
                    </option>
                    <option value="BRL">Brazilian reals (BRL)</option>
                    <option value="BOB">Bolivian bolivianos (BOB)</option>
                    <option value="BWP">Botswanan pulas (BWP)</option>
                    <option value="BND">Brunei dollars (BND)</option>
                    <option value="BGN">Bulgarian leva (BGN)</option>
                    <option value="MMK">Myanmar kyats (MMK)</option>
                    <option value="KHR">Cambodian riels (KHR)</option>
                    <option value="CVE">Cape Verdean escudos (CVE)</option>
                    <option value="KYD">Cayman Islands dollars (KYD)</option>
                    <option value="XAF">
                      Central African CFA francs (XAF)
                    </option>
                    <option value="CLP">Chilean pesos (CLP)</option>
                    <option value="CNY">Chinese yuan (CNY)</option>
                    <option value="COP">Colombian pesos (COP)</option>
                    <option value="KMF">Comorian francs (KMF)</option>
                    <option value="CDF">Congolese francs (CDF)</option>
                    <option value="CRC">Costa Rican colóns (CRC)</option>
                    <option value="HRK">Croatian kunas (HRK)</option>
                    <option value="CZK">Czech korunas (CZK)</option>
                    <option value="DKK">Danish kroner (DKK)</option>
                    <option value="DOP">Dominican pesos (DOP)</option>
                    <option value="XCD">East Caribbean dollars (XCD)</option>
                    <option value="EGP">Egyptian pounds (EGP)</option>
                    <option value="ETB">Ethiopian birr (ETB)</option>
                    <option value="XPF">CFP francs (XPF)</option>
                    <option value="FJD">Fijian dollars (FJD)</option>
                    <option value="GMD">Gambian dalasis (GMD)</option>
                    <option value="GHS">Ghanaian cedis (GHS)</option>
                    <option value="GTQ">Guatemalan quetzals (GTQ)</option>
                    <option value="GYD">Guyanaese dollars (GYD)</option>
                    <option value="GEL">Georgian laris (GEL)</option>
                    <option value="HTG">Haitian gourdes (HTG)</option>
                    <option value="HNL">Honduran lempiras (HNL)</option>
                    <option value="HKD">Hong Kong dollars (HKD)</option>
                    <option value="HUF">Hungarian forints (HUF)</option>
                    <option value="ISK">Icelandic krónur (ISK)</option>
                    <option value="INR">Indian rupees (INR)</option>
                    <option value="IDR">Indonesian rupiahs (IDR)</option>
                    <option value="ILS">Israeli new shekels (ILS)</option>
                    <option value="IQD">Iraqi dinars (IQD)</option>
                    <option value="JMD">Jamaican dollars (JMD)</option>
                    <option value="JPY">Japanese yen (JPY)</option>
                    <option value="JEP">JEP (JEP)</option>
                    <option value="JOD">Jordanian dinars (JOD)</option>
                    <option value="KZT">Kazakhstani tenges (KZT)</option>
                    <option value="KES">Kenyan shillings (KES)</option>
                    <option value="KWD">Kuwaiti dinars (KWD)</option>
                    <option value="KGS">Kyrgystani soms (KGS)</option>
                    <option value="LAK">Laotian kips (LAK)</option>
                    <option value="LVL">LVL (LVL)</option>
                    <option value="LBP">Lebanese pounds (LBP)</option>
                    <option value="LSL">Lesotho maloti (LSL)</option>
                    <option value="LRD">Liberian dollars (LRD)</option>
                    <option value="LTL">LTL (LTL)</option>
                    <option value="MGA">Malagasy ariary (MGA)</option>
                    <option value="MKD">Macedonian denari (MKD)</option>
                    <option value="MOP">Macanese patacas (MOP)</option>
                    <option value="MWK">Malawian kwachas (MWK)</option>
                    <option value="MVR">Maldivian rufiyaa (MVR)</option>
                    <option value="MXN">Mexican pesos (MXN)</option>
                    <option value="MYR">Malaysian ringgits (MYR)</option>
                    <option value="MUR">Mauritian rupees (MUR)</option>
                    <option value="MDL">Moldovan lei (MDL)</option>
                    <option value="MAD">Moroccan dirhams (MAD)</option>
                    <option value="MNT">Mongolian tugriks (MNT)</option>
                    <option value="MZN">Mozambican meticals (MZN)</option>
                    <option value="NAD">Namibian dollars (NAD)</option>
                    <option value="NPR">Nepalese rupees (NPR)</option>
                    <option value="ANG">
                      Netherlands Antillean guilders (ANG)
                    </option>
                    <option value="NZD">New Zealand dollars (NZD)</option>
                    <option value="NIO">Nicaraguan córdobas (NIO)</option>
                    <option value="NGN">Nigerian nairas (NGN)</option>
                    <option value="NOK">Norwegian kroner (NOK)</option>
                    <option value="OMR">Omani rials (OMR)</option>
                    <option value="PAB">Panamanian balboas (PAB)</option>
                    <option value="PKR">Pakistani rupees (PKR)</option>
                    <option value="PGK">Papua New Guinean kina (PGK)</option>
                    <option value="PYG">Paraguayan guaranis (PYG)</option>
                    <option value="PEN">Peruvian soles (PEN)</option>
                    <option value="PHP">Philippine pesos (PHP)</option>
                    <option value="PLN">Polish zlotys (PLN)</option>
                    <option value="QAR">Qatari rials (QAR)</option>
                    <option value="RON">Romanian lei (RON)</option>
                    <option value="RUB">Russian roubles (RUB)</option>
                    <option value="RWF">Rwandan francs (RWF)</option>
                    <option value="WST">Samoan tala (WST)</option>
                    <option value="SAR">Saudi riyals (SAR)</option>
                    <option value="STD">STD (STD)</option>
                    <option value="RSD">Serbian dinars (RSD)</option>
                    <option value="SCR">Seychellois rupees (SCR)</option>
                    <option value="SGD">Singapore dollars (SGD)</option>
                    <option value="SDG">Sudanese pounds (SDG)</option>
                    <option value="SYP">Syrian pounds (SYP)</option>
                    <option value="ZAR">South African rand (ZAR)</option>
                    <option value="KRW">South Korean won (KRW)</option>
                    <option value="SSP">South Sudanese pounds (SSP)</option>
                    <option value="SBD">Solomon Islands dollars (SBD)</option>
                    <option value="LKR">Sri Lankan rupees (LKR)</option>
                    <option value="SRD">Surinamese dollars (SRD)</option>
                    <option value="SZL">Swazi emalangeni (SZL)</option>
                    <option value="SEK">Swedish kronor (SEK)</option>
                    <option value="CHF">Swiss francs (CHF)</option>
                    <option value="TWD">New Taiwan dollars (TWD)</option>
                    <option value="THB">Thai baht (THB)</option>
                    <option value="TZS">Tanzanian shillings (TZS)</option>
                    <option value="TTD">
                      Trinidad &amp; Tobago dollars (TTD)
                    </option>
                    <option value="TND">Tunisian dinars (TND)</option>
                    <option value="TRY">Turkish Lira (TRY)</option>
                    <option value="TMT">Turkmenistani manat (TMT)</option>
                    <option value="UGX">Ugandan shillings (UGX)</option>
                    <option value="UAH">Ukrainian hryvnias (UAH)</option>
                    <option value="AED">UAE dirhams (AED)</option>
                    <option value="UYU">Uruguayan pesos (UYU)</option>
                    <option value="UZS">Uzbekistani som (UZS)</option>
                    <option value="VUV">Vanuatu vatu (VUV)</option>
                    <option value="VND">Vietnamese dong (VND)</option>
                    <option value="XOF">West African CFA francs (XOF)</option>
                    <option value="YER">Yemeni rials (YER)</option>
                    <option value="ZMW">Zambian kwachas (ZMW)</option>
                    <option value="BYN">Belarusian roubles (BYN)</option>
                    <option value="BYR">BYR (BYR)</option>
                    <option value="DJF">Djiboutian francs (DJF)</option>
                    <option value="ERN">Eritrean nakfas (ERN)</option>
                    <option value="FKP">Falkland Islands pounds (FKP)</option>
                    <option value="GIP">Gibraltar pounds (GIP)</option>
                    <option value="GNF">Guinean francs (GNF)</option>
                    <option value="IRR">Iranian rials (IRR)</option>
                    <option value="KID">KID (KID)</option>
                    <option value="LYD">Libyan dinars (LYD)</option>
                    <option value="MRU">Mauritanian ouguiyas (MRU)</option>
                    <option value="SLL">Sierra Leonean leones (SLL)</option>
                    <option value="SHP">St Helena pounds (SHP)</option>
                    <option value="SOS">Somali shillings (SOS)</option>
                    <option value="TJS">Tajikistani somonis (TJS)</option>
                    <option value="TOP">Tongan paʻanga (TOP)</option>
                    <option value="VEF">VEF (VEF)</option>
                    <option value="VES">Venezuelan bolívars (VES)</option>
                    <option value="XXX">XXX (XXX)</option>
                  </select>
                </div>
              </Col>
            </Row>
            <hr />
            <Button
              style={{ float: "right" }}
              variant="danger"
              onClick={deleteStore}
            >
              Delete
            </Button>
            <Button
              style={{ float: "right", marginRight: "20px" }}
              variant="primary"
            >
              Save
            </Button>

            <br />
            <br />
          </Container>
        </div>
      </div>
    </>
  );
}

export default withRouter(Editstore);
