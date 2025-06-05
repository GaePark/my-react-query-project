import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import './App.css';
import Home from "./pages/main/Home";
import Header from "./pages/main/Header";
import Footer from "./pages/main/Footer";
import {Fragment} from "react";

function App() {
  return (
      <div className={"min-h-screen flex flex-col"}>
      <Router>
          <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
          <Footer/>
      </Router>
      </div>
  );
}

export default App;
