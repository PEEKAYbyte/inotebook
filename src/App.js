import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="hi i am paras"/>
        <div className="container">
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/about" element={<About />} />
          <Route  path="/login" element={<Login />} />
          <Route  path="/signup" element={<Signup />} />
          {/* <Route exact path="page2" element={<Page2 />} />
          <Route exact path="page3" element={<Page3 />} /> */}
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
