import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";


const Home = () => {
    let [movies, setMovies] = useState(null);
    let [pending, setPending]=useState(true);
    let[error, setError]=useState(null);

    useEffect(() => {

        if(localStorage.getItem("fav")==null){
            localStorage.setItem("fav","[]")
        }

        
        setTimeout(() => {
                fetch("http://localhost:4000/movies")
                    .then((res) => { return res.json() })
                    .then((data) => {
                        console.log(data);
                        setMovies(data);
                        setPending(false)
                    })
                    .catch((err)=>{setError("404 error issue!! please try again")})
                    setPending(false)
        }, 1000)
    }, [])
    return (
        <div className="home">
    
            {pending==true && <><h1 className="loading-text">Loading...</h1> <div class="spinner"></div> </>}
            {error && <h1>{error}</h1>}
            {movies && <MoviesList movies={movies} title="All Movies"/>}
            {movies && <MoviesList movies={movies.filter((m)=>{return m.genre.includes("drama") })} title="Adventure"/>}
            {movies && <MoviesList movies={movies.filter((m)=>{return m.genre.includes("Comedy") })} title="Comedy"/>}
            {movies && <MoviesList movies={movies.filter((m)=>{return m.genre.includes("drama") })} title="Drama"/>}
            {movies && <MoviesList movies={movies.filter((m)=>{return m.genre.includes("War") })} title="War"/>}
            {movies && <MoviesList movies={movies.filter((m)=>{return m.genre.includes("action") })} title="Action"/>}



    </div>
    );
}

export default Home;