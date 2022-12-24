import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "../pages/Home";
import Post from "../pages/Post";
import User from "../pages/User";

const index = () => {
  axios.defaults.baseURL = "https://dummyapi.io/data/v1/";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
