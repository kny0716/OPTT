import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/section/Main";

const Home = lazy(() => import("./pages/Home"));
const Survey = lazy(() => import("./pages/Survey"));
const Result = lazy(() => import("./pages/Result"));
const Explain = lazy(() => import("./pages/Explain"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Not = lazy(() => import("./pages/Not"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Main />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/result" element={<Result />} />
          <Route path="/explain" element={<Explain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Not />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
