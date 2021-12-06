import React from "react";
import { Route, Routes } from "react-router-dom";
import Error404 from "./Errors/Error404";

export default function App() {
  return (
    <Routes>
      <Route element={<Error404 />} />
    </Routes>
  );
}
