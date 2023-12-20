import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../helper/url";

const API_End = `https://api.openweathermap.org/data/3.0/onecall?`;

export default function Navbar() {
  const [logo, setLogo] = useState();
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");

  const Logout = () => {
    window.localStorage.removeItem("jwt_token");
    window.location.href = "/login";
  };

  useEffect(() => {

    
    // navigator.geolocation.getCurrentPosition((position) => {
    //   console.log(position.coords);
    //   setLatitude(position.coords.latitude);
    //   setLongitude(position.coords.longitude);
    // });

    fetch(`http://localhost:1337/api/logo?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        console.log(
          "logo=========>",
          data.data.attributes.logo.data.attributes.url
        );
        setLogo(data.data.attributes.logo.data.attributes.url);
      })
      .catch((err) => err);
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            <img src={`${URL}${logo}`} alt="Bootstrap" width="60" />
          </Link>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse me-3"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-3 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li>
                <button className="btn btn-sm btn-success">GEt Location</button>
              </li>

              <input
                className="form-control me-2 ms-2"
                id="demo"
                disabled
                type="text"
                readOnly
                placeholder="Search"
                aria-label="Search"
              />
              {window.localStorage.getItem("jwt_token") === null && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      login
                    </Link>
                  </li>
                </>
              )}
              {window.localStorage.getItem("jwt_token") !== null && (
                <>
                  <li className="nav-item">
                    <div className="nav-link " onClick={Logout}>
                      LOGOUT
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="/Business_Register">
                      business register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
