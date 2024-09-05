import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar /> {/* Use the Navbar component */}
      <div className="text-red-500">Hello World!</div>
    </>
  );
}

export default App;
