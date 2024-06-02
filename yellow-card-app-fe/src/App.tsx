import "./App.css";
import React from "react";
import "./index.css"; // Import Tailwind CSS
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SuccessPage from "./components/successPage";
import ErrorPage from "./components/errorPage";
import MainForm from "./pages/mainForm";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
