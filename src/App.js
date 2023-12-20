import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BusinesRegister from "./pages/BusinesRegister";
import ElementSearch from "./pages/ElementSearch";

function App() {
  // if(window.localStorage.getItem("jwt_token") === null){
  //   return <Login/>
  // }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="search" element={<ElementSearch />}></Route>
            {window.localStorage.getItem("jwt_token") !== null && (
              <Route
                path="Business_Register"
                element={<BusinesRegister />}
              ></Route>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
