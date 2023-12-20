import Swal from "sweetalert2";
import { URL } from "../helper/url";

export default function Register() {
  const submit = () => {
    let u = document.getElementById("User_Name").value;
    let email = document.getElementById("user_email").value;
    let p = document.getElementById("password").value;

    fetch(`${URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: u,
        email: email,
        password: p,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.data === null 
          ? Swal.fire({
              title: "Error",
              text: "user has been Already exsites",
              icon: "error",
            })
          : Swal.fire({
              title: "Good job!",
              text: "USER created!",
              icon: "success",
            });
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container">
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="user_email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <button type="button" className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
