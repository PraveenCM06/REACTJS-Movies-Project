import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {

    let [searchword, setSearchword] = useState("");
    let [movienames, setMovienames] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/movies")
            .then((res) => { return res.json() })
            .then((data) => {
                let names = data.map((m) => { return { moviename: m.moviename, id: m.id } })
                let filteredNames = names.filter((movie) => { return movie.moviename.toLowerCase().includes(searchword.toLowerCase()) })
                setMovienames(filteredNames);
            })
    }, [searchword])

    return (
        <nav>
            <div id="logo">
                <Link to="/"> <h1 id="main-logo"> <i>Zeflix</i> </h1></Link>
            </div>
            <div id="search-bar">
                <input type="search"
                    placeholder="Search for movies"
                    value={searchword}
                    onChange={(e) => { setSearchword(e.target.value); }}
                />
                <Link to={`/search/${searchword}`}><button>Search</button></Link>
            </div>
            <div id="add-movie">
                <Link to="/fav">Favorite movies</Link>
            </div>
            <div id="add-movie">
                <Link to="/add"> Add Movie</Link>
            </div>
            <div id="ham">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </div>
            {searchword != "" && <div id="search-drop-down">
                <ul>
                    {movienames.map((movie) => {
                        return (
                            <Link
                                onClick={() => { setSearchword("") }}
                                id="search-drop-down-link"
                                to={`/details/${movie.id}`}>
                                <li >{movie.moviename}</li>
                            </Link>)
                    })
                    }
                </ul>
            </div>}
        </nav>
    );
}

export default Navbar;  