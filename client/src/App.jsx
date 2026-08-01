import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages.jsx/Home";
import Layout from "./Pages.jsx/Layout";
import Dashboard from "./Pages.jsx/Dashboard";
import ResumeBuilder from "./Pages.jsx/ResumeBuilder";
import Preview from "./Pages.jsx/Preview";
import Login from "./Pages.jsx/Login";
import { useDispatch } from "react-redux";
import api from "./configs/api.js";
import { login, setLoading } from "./app/features/authSlice.js";

import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: { Authorization: token },
        });
        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        <Route path="view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;
