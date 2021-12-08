import React from "react";
import { Route, Routes } from "react-router-dom";
import Error404 from "./Errors/Error404";
import Correction from "./Pages/Correction/Correction";
import Deployment from "./Pages/Deployment/Deployment";

export default function App() {
  return (
    <Routes>
      <Route path="/Correction" element={<Correction />} />
      <Route path="/Deployment" element={<Deployment />} />
      <Route element={<Error404 />} />
    </Routes>
  );
}
