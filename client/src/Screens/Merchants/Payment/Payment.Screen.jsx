import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import Sidebar from "../../../components/Sidebar/Sidebar.component";
import MyNavbarComponent from "../../../components/Navbar/Navbar.Component";
import "./Payment.Styles.css";
import { withRouter } from "react-router-dom";

function Mypayment(props) {
  return (
    <>
      <MyNavbarComponent />
      <div className="setsidebar">
        <Sidebar storeId={props.match.params.id}></Sidebar>
        <div className="addpaymentscreencontainer">
          <Container className="container1">
            <Row>
              <Col xs={12} md={1}>
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
              </Col>
              <Col className="my-2" xs={12} md={11}>
                <div>
                  <h5>Payments</h5>
                </div>
              </Col>
            </Row>

            <Row className="my-3">
              <Col className="my-3" xs={12} lg={4}>
                <div>
                  <h6 className="mb-4">Payment providers</h6>
                  <button
                    style={{
                      backgroundColor: "rgb(241,242,243,1)",
                      color: "blue",
                      border: "none",
                    }}
                  >
                    Accept payments
                  </button>
                  on your store using third-party providers such as PayPal or
                  other payment methods.
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
                  <h6>Payment providers</h6>
                  <br />

                  <span>
                    Providers that enable you to accept payment methods at a
                    rate set by the third-party. An additional fee will apply to
                    new orders once you
                    <a href="#" className="ms-2" style={{ display: "inline" }}>
                      select a plan.
                    </a>
                  </span>
                  <br />
                  <br />
                  <Button
                    style={{ border: "1px solid lightgray", float: "right" }}
                    variant="light"
                  >
                    Choose a provider
                  </Button>
                  <br />
                  <br />
                </div>
                <div
                  className="p-4 my-4"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <div style={{ width: "20%", height: "20%" }}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU0AAACXCAMAAACm/PkLAAAA3lBMVEX///8xLTz8//7/0tH9AAAmsV7+/v8xLTswLDxRTFouKDcpJTUnITMxLT4gGi3///2ysbbv7+8+OkdubXUbFinKys2DgIcmIjGmpKpfXGX5+fkbFSopIjUiHS8fGS3Qz9OOjZLd3N/m5ed7eYKbmZ4XEScMrlS1s7lJR1K8u71CP0wbFCyhnqYWESYhHCs1MT1raHGKiY5VU1zr+vLS7N1sx42p27wxtmyN0aYArU2Dzp1Vvn3g8uim3LW74sqw4MMLAB4/PUZfXmIAAB3R6NxLuXN5y5g3tWZjwIYYDy2pqsBRAAAQM0lEQVR4nO1ca5ubOLIGn9OgRhiMDTYXAwaML+12+9KdmXRuk+xukp3//4dWV5Bod+K485xszqP3Q6ZtRKn0qlSqKsmjaQoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCr8Eruuif43er9bj/wd6PeP+4cE1FJ8/BfevFo+Lqz96xEYVXgJDu/9zcYWweI3+VngRXEN7Rci8unp8+NXK/PZwjfsrjje/WpnfHob7wEzzavH2Vyvz26OnvWvYfPWrlfn90Ys/czbfq13ohUBB0YdHSuafKt58KQzD0P5YLK4Wi8/vDGWbL4ervXv96stfyjJ/CnrUJn95ImR8XwWWrZG6QtO4u6KaJeaendy54n+kD+ctV+FFAyXqWIMnXVO1npfnCq1+wlxQEbFXlt4zEht28B/u9wbqns+m0D+XfmbbM2F874V2aD8o+VmBWjmorq1JaluraumdbFMs54fxbFCQ8ebVGKMKxBZeHs7G1Wg8D3NJxGxMEYtfrpmEQmpCPsRIzgwJkdo3qpatHpqgB/roMSG3Ei9uGYSzalQd5svipETc3fgwX3uiJocLNzL8WjGyHdsCGNbUt8aevCwMLR4cUz+17TTzj0v0zfKjjfExZA1czQsj23dSG9q4FdwPYr7c3VWK26a6NJawphLofKwc8inBXc2HWZraqZPtDmXXXrAeDtbDcY5Lo9VjgB96Eypkz3lEL5fz6zukOITQTv1sOM5leciMxnqWUp3RzBpMk3R3cVgQj33Y1xuYILXXrQvEf+Ur3+KPYRKV2jojLZ0B0ymegzsIWhkA+rsB9wjXFpYOhjKbDmnoB6wJeWuCrG14B5ggkDq3sqb5Kml6mRI9HBP/TfXw6Itw1JDpjdM7S1RrkkUSn8bcsZvn0Jlr2pFqMryUzXKV9gUyddDvW3/PhR61dQL7fbNpAPVi7Qhsum55TKy+oLXe7wOQ7Bl9P8LmuhYEmaY/at2eqy3voNCHbu+YHpxNU2ZTy/sp+kYYG1ILJrNWiXif6WhcdGh9YCbVS9ks+5KKbBy1QGewAfJTeBPaAptaORREAG5aenqMGVXgO2y6lM3+Lk86XTkjFPgwctbdh9bN7aT/HJuGFmSWfgLJmLo3wzX2affZLOq/hM34ZsoZREJaTjbNBuOlT5QCtKWZUTYj2xSetaaVHRib37NNxqa+uwFME47+JuQ+3IOWLtOJuwLPsal5O8vUT8G/ZdMz9/ud+dGtnf4SNis2PWCaJLWzTZgbMeGNwWLLvd1nFNrJZpukxND0hs2etkzofAKY1b6d1oljoUWKqXBK94fYNLFgMM02GTTZ8uvfleyN0dSkbfrTpMadgGYdnGRzlgLyArCTrWOnSHPuQh0i0i0T7gSsrK5xn40pXMhmXrNR1NG6iI24mNuQjiNZkgZukTDu4N0hL73itj/lE0rYdLUIUrKT/bo0NMMrwuuaqpUSf3H2Siew7fFgHY4S7jzsir5Q1Kxb626M9Qh1u3nnFJvxDtA5TqqAqJXPhz5tjtTCZFVcQLYaFF4ZVLXJjflCNikTyBPmPOb2VvQrKyLj1CpI/Ti8LslnLa4ckU2+lfbvllQENseAetJ0j9U+3zaRSL+izbw968UklmRoFZvE6YoZa6vHSTaLjPJi4k2cBWvLlLY4kuZ8ehK+R+QmN9bL2Mw3dP4j4WUPskkl4WzMXCT81Ebko6mw0rWSOl64FwV7n4AOaxSO/CCb/qxpUWXMckhQG7Nlan1qxYy4yz/FZsCGJmynaLxoki3br7BVDDI2f22Lwn7RSp85XQ3xMIiSwCFpSpAwhXO+GxiaJ/pNxD4d5rUkOdhsjgFNfn9gpSOraYsAN5YwTUHNDClvMwtvxx3h82xOKqFTQ7v1nd2MGveeujRqqFyr7CVsfiJWs5ESRG1mc/4Q5ukTy0M6pS2bLnNQur3PG74RJ6s1z3zPtk1Tr/OGTQOnCGQaYOyKeggBKNPjWyvdnIzLRiLaeVbLmOll003KCdr5c+MhXQIXsVkSP2Id5W8jahPUNveUWn8tvZcJbGojtmHAZDVeFh7TvOXufDZl+zZ2gPixBOfkdFWbmaCHoZX28xFSPGSGa6fH2bqknRttilfWJBJDaokVGmZJF7EZkF3MOpbil4OUBhYW4eVIqZrIpRA2ehpvrpkzQBGLnWW76EDKC62O56/0VHRyrjamQ8MMGnRvNG1BDxS9XYPnondDm/NVC6CdOMMIUeoKatFoRoeVJrIZ0FT1IjZzygO0xoFHX4/z8R3VAUZkA6czDD6Jr5GNvmVT4ykFVQTafro65G5T5Dxtm+kJNmvZ5QwcGmeFWA/SwrqRR0n1OM2mxzM0kjsCmPqT47xo9ndmA2koCSzty1e6NqMRGLAduIpG1f64S3msnqwFDbvOgC4IzqZ3nXVzTzs5fttv3tIVIK/0WlokfLKxxbItHUayHnP7OTYRCmvaSYagk+551WNAFgfIJBfGQ5hL2ERLpUrwxKH1DixctbJYHAL66Yhw4dEvrM4oqGVxNjWvSqa6mBEigdNNxLg5udLnp2zzo+xP2EZiowQ1ZpGiFIY1Uk6zqZXRFiJ2zCYoN00AE1ZnpUMAmbwcjN2lbBr398jKtt1UldDCKxaMTdixzVuZTWRGoxQlpTiO7ze5rz0sGZsnbHMMz2AzwbUDMMVs2j9umwjrKMmmQB5hFsUtm3rXNi9n8+EPXJnZdZcpMsXtKKbLlIV03ZV+kFY6gbesbvzasadtBQyuYsrmCduMTrG57bDpk113OmtWYHdWZ99mEw2hCEdDlNTbQsUkJSEoDd67K927PEJ69xVXu+IQbKYWzsHogoDpx1XQnBV9ovW+XSxsfD0WFHE2eQ0S5cKDQ2TWGQQ0lqNpDLPNXcsmDuzACTbrQtIvSIgU7DeNIas7ClOCdpP9s7sQU4tUbrwgHB8nHx1ItdK32HcGtOAthRGIfGqxF7Dp3j++pt0GVX+bJGmaOtk2u54VwgEfrZ7qvrQ/GEOxIoc0XguryyiXe5+qba1QfOcy2wSi4TGX2GGzYyhh2lbWeQtBD9eNb75RQ0INwlnbOi7Ca1b1QFGRwes9HU+8zi5lsxdfLT5gMvAElsEynIeDgISKxrvGEitxLXW44La5XtU2sRkDRR9EjZwODOBymsts0xEnhG0fnT19OpYU/AfN/TJ8hkb1AKJvcbWC1T1OsonWXE0dg8FjtQHdy6xPaI69j0QgMCXvMp5eXi1+u1g8oGmS33R7Pe3z1weWN7AoG1639mowt0nZjAfDxDI34kmS1nilBC/diJIiplM8G+3YJkCT0vbCMi7ge4g4lkEjB96cPzfh/Sk2vTl0kIKy62AlCN3Cc9+n695ftl26HgSX+k1Xe78g1ikDkfn68Wrx6h2x2ZybYdspSkj1ls3wnwDnhHKCxryS7mMPNaKleVi1KfaYF9NkNvvprTC1lCuzjyN2ly5MAITBawWvgZ5gc1RjIzsdUQHCZkUn2boRXPGM184v2NPJlcfH1z18SwJzga0L70vv8WWzxdV7fKMHbRe4UxOYBScjPkKhhhRsyHN7bzChBNxB4NXNLFlPC763hc0Jj8QmShORMSHbozVSn5zsmSle/i4NBAEyKOYwXKzH82yGDs05Z81g8T9HYS9jLtJMeZXJRXmlfjGbCG8xbV//wnwiKjGphnb/hd8fJzeeORfWLiA9auWR16wJm16f2tV0JZyt3t41DgqrTQaG7Jeuu7It8z6pb1q7glWtA5ZImBsql+sBd6yfMmoOb0+wWbAJy0b02ILWuSdCC5YQYDqZ61xOuMDL2PwX/RXD1zcf7ukXvYfXV80d3Qc8pUXCchzL2Q/yfD22mgNKugsdWFBh+dGg8OLYKwbHlJ1kzMiw6daMDOsuOszGx2zSnuc9OcmwJjMkxMvHPAqGK6pZ4bOUF/j7JdYDwuZw99QuxIIRMIGjNVVrfsNOA2vqwQ9sUoG9mwV5HkZ3TTJ34UnGG0rdYnH1+dWXN1/efl1wLvEvRQia4xMAnSTJsEHQyg2vvSMjYoUFxwG7nZ46bCAA0lXJInVEIbRtiJv39cp6mqfr+FwfpI45NDPmTPp86LIefuITw+w/HyEFWyIOq5Wl+m4HMn72ypIKt7zjuTCw/SRxIKAaXMqma/TeNuwhStu/0Tp/y4Jyb9I9AQaWEG+62tJv8wwAhFNan4UzvG7eAEV5LLFLOrV3dojSyrCbfYSRJaihW8Nn65uudvDFpsLfGXdJ4VbvlEUQjZezifac+88ihS0W/26ClaAWM13TBNNVKGSW+FwaPFELfd4e2Jxp8i0AJM0pWA0pyQU2wXB2Z0qCgLXzeKJ14pbEKnz2dgIKfEe+fgI4KtDY5cJR53YCSG7ZAeyF5+m9+O3jCTIf3whXdAdbwTpNAPWS3ZzhsXTowM5A0frazJuIyLuxxUdgO9cOE8pmIbI50Ua+OHE6NMWAcbmVrqU0ejyXWR624v0q2vcErttALY4c6aE/5nd4LmTTMNz3VwvZPheLPz9I9x6DndMM0sqOpbaU2ERJSZRIfFowObY8GJp33LQTAvG1HJZhb0uBTX2CIr66FWRtI0+6JSfqAZIjvtX1PJs4LripJf6t1K9K8cKmcfDbqy4Qn16+jE1sgvevrx5F9/n5vSuV9/EduF3iTBHSZBgintc1hNCa1oxNF9+ktBIHbTEQtck2epW3t0tJshUOkQD0cOpsj7mGqx5k6Hckg2pt09VyXESDqKWTkIM6QQ+j1cNGeqBv1n9D3HRD2cTyIXT4QRz+d72HuF8qb3MzKySJWO99usECp5m/xxH10cZt7ctvHCItex++fMa70GLx9e3rB5xddhpocX47iqL9PCAHkuvrCOMoViniPBzv0Zej2UC+durSOzhEQDS6JTF8kRE24VHrskmKaKhhFRaaZJh0+EyPWUBulwdHQQ8vojhIr3jBbYXU2ldzfBOlCxw/r2foeTUoyTgrKmN/OZs9lEyiqP3dw8O7e/yX2+teEnfbJBxN7cnLz1JiKd3UNqJSvHXuYls9TMg+iwJScjlbZNM9KaT58vQQpMvj7QfDkPV6cvldvFMunsFpp/r+L4Crjf9eda9Il9Q5mlvqXFs2Fb6D0O9PIplOg53SWzf0s2LzXOQoZTcnK3o1iybMRsW25prew1NsnouSVjIhDBvzDK5Z0MxTcMXmuVh/pNkNSHeHdVEWwfy6uZpZ8xRPsXku5gkrTeDSQpb4zb1vs25OJRSbZ2O+tbr5HaHuY/vzFcXm+QhMnP9JiTwAUDyS0BSb5yM+3GVkubOqsQ6m9T+kI+VrqNg8E/h3g/ObLGXFS8vO7FHnF3qKzR+AgdP0+f7GmtgTczV++rtY/OvGNE2TX6Hc7wrDwzj1xGP4v9bo98c3fv3+X1pqUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUHgRXIWfB/y/QFH4WdD+R+HnQftfhZ+H/wD5So4oV2eqxgAAAABJRU5ErkJggg=="
                      alt="EasyPaisa"
                    />
                  </div>
                  <br />
                  <h6>Express Checkout</h6>
                  <br />

                  <span>
                    A button that enables customers to use PayPal directly from
                    your checkout. Learn more about
                    <a href="#" className="ms-2" style={{ display: "inline" }}>
                      PayPal Express Checkout.
                    </a>
                  </span>
                  <br />
                  <br />
                  <span>
                    Receive payments in foreign currencies with PayPal.
                    <a href="#" className="ms-2" style={{ display: "inline" }}>
                      Learn more.
                    </a>
                  </span>
                  <br />
                  <br />
                  <Button
                    style={{ border: "1px solid lightgray", float: "right" }}
                    variant="light"
                  >
                    Choose a provider
                  </Button>
                  <br />
                  <br />
                </div>

                <div
                  className="p-4"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <h6>Alternative payment methods</h6>
                  <br />

                  <span>
                    External payment methods that can be used in addition to
                    either a third-party provider or Shopify Payments.
                  </span>
                  <br />
                  <br />
                  <Button
                    style={{ border: "1px solid lightgray", float: "right" }}
                    variant="light"
                  >
                    Choose alternative payment
                  </Button>
                  <br />
                  <br />
                </div>
                <div
                  className="my-4 p-4"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <h6>Methods payment methods</h6>
                  <br />

                  <span>
                    Payments that are processed outside your online store. When
                    a customer makes a manual payment, you need to approve their
                    order before fulfilling.
                  </span>
                  <br />
                  <br />

                  <select
                    style={{
                      padding: "5px",
                      backgroundColor: "rgb(250,251,252,1)",
                      float: "right",
                    }}
                    name="cars"
                    id="cars"
                  >
                    <option value="volvo">Manual payment method</option>
                    <option value="saab">Bank deposite</option>
                    <option value="mercedes">Money order</option>
                    <option value="audi">Cash on delivery(COD)</option>
                  </select>
                  <br />
                  <br />
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col className="my-3" xs={12} lg={4}>
                <div>
                  <h6 className="mb-4">Payment capture</h6>
                  <span>
                    After a customer’s payment method is authorized, it needs to
                    be captured so that the sale can be processed. Choose
                    between
                    <a className="ms-2" href="#">
                      automatic and manual capture.
                    </a>
                  </span>
                </div>
              </Col>
              <Col className="my-2" xs={12} lg={8}>
                <div
                  className="my-4 p-4"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <Row>
                    <Col xs={7} xl={9}>
                      <h6>Payment capture set to Automatic</h6>
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
                        Manage
                      </button>
                    </Col>
                  </Row>
                  <br />
                  The customer’s payment method is authorized and charged
                  automatically.
                </div>
                <span className="p-5">
                  <svg
                    style={{ width: "20px", height: "20px" }}
                    viewBox="0 0 20 20"
                    class="Polaris-Icon__Svg_375hu"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-9 3a1 1 0 1 0 2 0v-2a1 1 0 1 0-2 0v2zm0-6a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"
                    ></path>
                  </svg>
                  Learn more about{" "}
                  <a className="ms-1" href="#">
                    payment
                  </a>
                </span>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default withRouter(Mypayment);
