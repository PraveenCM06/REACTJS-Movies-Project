import { useEffect, useState } from "react"; 
import MoviesList from "./MoviesList";
 const Relavant = ({genre}) => {
    let [movies, setMovies] = useState(null);

    useEffect(() => {
        fetch("http://localhost:4000/movies")
        .then((res) => { return res.json()})
        .then((data) => {console.log(data);
                        setMovies(data);})
},[])

return(
    <div className="relavant">
        {movies && 
            <MoviesList 
            movies={movies.filter(
                            (movie)=>{return genre.split(" ").some
                                        ((genre)=>
                                            { return movie.genre.includes(genre)}
                                        )
                                    }
                                    )
                    } title="relavant movies"/>}
    </div>
)
 }
export default Relavant;
