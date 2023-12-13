import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [bussnesscategories, setBussnesscategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:1337/api/business-categories?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setBussnesscategories(data.data);
        console.log(data.data);
      });
  }, []);

  return (
    <div className="container mt-5">
      <ul>
        {bussnesscategories.map((cv) => {
          return (
            <Link className="me-3" to="/register">
              <img
                src={"http://localhost:1337"+cv.attributes.logo.data.map((cv2)=>{
                    return cv2.attributes.url
                })}
                alt="logo"
              />
             {cv.attributes.name}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
