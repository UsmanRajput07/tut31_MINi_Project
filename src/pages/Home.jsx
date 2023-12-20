import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../helper/url";

export default function Home() {
  const [bussnesscategories, setBussnesscategories] = useState([]);

  useEffect(() => {
    fetch(`${URL}/api/business-categories?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setBussnesscategories(data.data);
        console.log(data.data);
      });
  }, []);

  return (
    <>
      <div className="container">
        <h1>Home</h1>
        <ul>
          {bussnesscategories.map((cv) => {
            return (
              <Link className="me-3" to="/search">
                <img
                  src={
                    `${URL}` +
                    cv.attributes.logo.data.map((cv2) => {
                      return cv2.attributes.url;
                    })
                  }
                  alt="logo"
                />
                {cv.attributes.name}
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}
