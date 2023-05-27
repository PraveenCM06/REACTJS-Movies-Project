import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MoviesList from "./MoviesList";

const Search = () => {
    let {searchkey}=useParams();
    let [movie, setMovie] = useState(null);
    let[pending, setPending]=useState(true);
    let[error, setError]=useState(null);


    useEffect(() => {

        setMovie(null);
        setPending(true);
        setTimeout(() => {
                fetch("http://localhost:4000/movies/")
                    .then((res) => { return res.json() })
                    .then((data) => {
                        let d=data.filter((m)=>{
                            return (m.moviename.toLowerCase().startsWith(searchkey.toLowerCase())) ||
                            (m.genre.toLowerCase()===searchkey.toLowerCase())||
                            (m.languages.some((lang)=>{ return lang.toLowerCase()===searchkey.toLowerCase()}))
                        })
                        setMovie(d);setPending(false)})
                    .catch((err)=>{setError("error loading!! chech your internet Connection")
                                    setPending(false)})
        }, 1000)
    }, [searchkey])

    return ( 
        <div className="search-cont">
            {pending==true && <h1>Loading...</h1> }
            {movie && <MoviesList movies={movie} title="seached movies"/>}
        </div>
     );
}
 
export default Search;