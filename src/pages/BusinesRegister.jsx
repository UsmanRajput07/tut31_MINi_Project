import React, { useEffect, useState } from "react";
import { URL } from "../helper/url";

export default function BusinesRegister() {
  const [businesscategories, setbusinesscategories] = useState([]);
  const [businessid, setBusinessid] = useState();
  const [cities, setCities] = useState([]);
  const [business, setBusiness] = useState();
  const [cityID, setCityId] = useState();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const handleChange = (e) => {
    console.log("businessid---->", e.target.value);
    setBusinessid(e.target.value);
  };
  const citiesId = (e) => {
    setCityId(parseInt(e.target.value));
    console.log("cityId====>", e.target.value);
  };

  const BusinessRegister = () => {
    // get the token from localstorage
    let token = window.localStorage.getItem('jwt_token');

    fetch(`${URL}/api/bussinesses`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: business,
          business_category: businessid,
          cities: [cityID],
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  };
  const getstate = (e) => {
    console.log("get states---->", e.target.value);
    const stateID = e.target.value;

    fetch(`${URL}/api/states?filters[country][id][$eq]=${stateID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(`states--->`, data.data);
        setStates(data.data);
      })
      .catch((err) => err);
  };

  //  get city by state id
  const getcities = (e) => {
    console.log("cities---->", e.target.value);
    const stateid = e.target.value;

    fetch(`${URL}/api/cities?filters[state][id][$eq]=${stateid}`)
      .then((res) => res.json())
      .then((cities) => setCities(cities.data))
      .catch((err) => err);
  };
  useEffect(() => {
    fetch(`${URL}/api/business-categories`)
      .then((res) => res.json())
      .then((data) => setbusinesscategories(data.data))
      .catch((err) => console.log(err));

    fetch(`${URL}/api/business-categories?populate=*`)
      .then((res) => res.json())
      .then((data) => console.log(data.data))
      .catch((err) => err);

    fetch(`${URL}/api/countries`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.data);
      })
      .catch((err) => err);
  }, []);

  return (
    <>
      <div className="container">
        <select
          class="form-select mt-5"
          aria-label="Default select example"
          onClick={(e) => getstate(e)}
        >
          {countries.map((cv, idx) => {
            return (
              <option key={idx} value={cv.id}>
                {cv.attributes.name}
              </option>
            );
          })}
        </select>
        {states.length !== 0 && (
          <select
            class="form-select mt-5"
            aria-label="Default select example"
            onClick={(e) => getcities(e)}
          >
            {states.map((cv, idx) => {
              return (
                <option key={idx} value={cv.id}>
                  {cv.attributes.name}
                </option>
              );
            })}
          </select>
        )}
        {cities.length !== 0 && (
          <select
            class="form-select mt-5"
            aria-label="Default select example"
            onClick={(e) => citiesId(e)}
          >
            {cities.map((cv, idx) => {
              return (
                <option key={idx} value={cv.id}>
                  {cv.attributes.name}
                </option>
              );
            })}
          </select>
        )}

        <select
          id="business-categories"
          class="form-select mt-5"
          aria-label="Default select example"
          onClick={(e) => {
            handleChange(e);
          }}
        >
          {businesscategories.map((cv, idx) => {
            return (
              <option key={idx} value={cv.id}>
                {cv.attributes.name}
              </option>
            );
          })}
        </select>
        <form className="mt-5">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="User_Name"
              aria-describedby="emailHelp"
              value={business}
              onChange={(e) => {
                setBusiness(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={BusinessRegister}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
