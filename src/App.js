import React from 'react';
import './App.css';
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-full">
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/todo" element={<Todo/>} />
            </Routes>
            <Footer/>
        </Router>
    </div>
  );
}

export default App;
