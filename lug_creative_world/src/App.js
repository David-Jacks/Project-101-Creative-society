import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
// import About from "./Pages/About/about";
// import Profile from "./Pages/Profile/profile";
// import Home from "./Pages/Home/home";
// import Article from "./components/Article/article";
import Loginpage from "./Pages/Loginpage/Loginpage";
import Joinpage from "./Pages/Joinpage/Joinpage";
// import Dashboard from "./Pages/Dashboard/dashboard";
// import Writepage from "./Pages/Writepage/Writepage";
// import Stories from "./components/Stories/stories";
import { Suspense, lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./components/Modals/loadingmodal/loading";
// import { lazyLoad } from "./lazyload";

const App = () => {
  const Home = lazy(()=>import("./Pages/Home/home"));
  const About = lazy(()=>import("./Pages/About/about"));
  const Dashboard = lazy(()=>import("./Pages/Dashboard/dashboard"));
  const Writepage = lazy(()=>import("./Pages/Writepage/Writepage"));
  const Article = lazy(()=>import("./components/Article/article"));
  const Profile = lazy(()=>import("./Pages/Profile/profile"));

  const [darkmode, setDarkMode] = useState(false);
  const theme = useSelector((state)=>state.theme.value);


  useEffect(() => {
    // Set darkmode state based on the theme value
    if (theme) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [theme]);


  // function PrivateRoute({ children }) {
  //   const user = localStorage.getItem("user");

  //   if (!user || user.trim() === ""){
  //     return <Navigate to="/loginpage" replace/>;
  //   } else {
  //     return children;
  //   }
  // }

  return (
    <div className={`App ${darkmode ? "dark-mode": ""}`}>
      <Suspense fallback={<Loading />}>
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
        </Routes>
      </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
