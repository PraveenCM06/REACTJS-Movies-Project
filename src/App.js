import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Addmovie from "./components/Addmovie";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Moviedetails from "./components/Moviedetails";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import EditMovie from "./components/EditMovie";

function App() {
  return (
      <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element={<Addmovie/>}/>
        <Route path="/details/:id" element={<Moviedetails/>}/>
        <Route path="/search/:searchkey" element={<Search/>}/>
        <Route path="/fav" element={<Favorites/>}/>
        <Route path="/edit/:id" element={<EditMovie/>}/>
      </Routes>
    </div>
      </BrowserRouter>
  );
}

export default App;
