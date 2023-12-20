import React from "react";
import { URL } from "../helper/url";

export default function Login() {
  const Login = () => {
    const u = document.getElementById("user_name").value;
    const p = document.getElementById("password").value;
    fetch(`${URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: u,
        password: p,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.jwt !== undefined){
            window.localStorage.setItem("jwt_token", data.jwt)
            window.location.href= "/Business_Register"
        }else {
           alert("token not generate")
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <form className="mt-5">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              User name
            </label>
            <input
              type="text"
              className="form-control"
              id="user_name"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <button type="button" className="btn btn-primary" onClick={Login}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
