import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import About from "./Pages/About/about";
import Profile from "./Pages/Profile/profile";
import Home from "./Pages/Home/home";
import Article from "./components/Article/article";
import Loginpage from "./Pages/Loginpage/Loginpage";
import Joinpage from "./Pages/Joinpage/Joinpage";
import Dashboard from "./Pages/Dashboard/dashboard";
import Writepage from "./Pages/Writepage/Writepage";
import Stories from "./components/Stories/stories";

const App = () => {
  // function PrivateRoute({ children }) {
  //   const user = localStorage.getItem("user");

  //   if (!user || user.trim() === ""){
  //     return <Navigate to="/loginpage" replace/>;
  //   } else {
  //     return children;
  //   }
  // }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/about" element={<About />} />
          <Route path="/profile/:userid" element={
            <Profile />
          } />
          <Route path="/article/:articleid" element={<Article />} />
          <Route path="/dashboard" element={
            <Dashboard />
          } />
          <Route path="/loginpage" element={<Loginpage />} />
          <Route path="/joinpage" element={<Joinpage />} />
          <Route path="/writepage" element={<Writepage />} />
          <Route path="/stories" element={<Stories />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
