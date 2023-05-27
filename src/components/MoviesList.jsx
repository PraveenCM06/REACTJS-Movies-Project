import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

const MoviesList = ({ movies, title }) => {

        let [favId, setFavId] = useState(null);
        let [alter, setAlter]=useState(0);

        useEffect(()=>{
           let fav=  JSON.parse(localStorage.getItem("fav"));
           setFavId(fav.map((mapmovie)=>{return mapmovie.id}))
        },[alter])


        let addMovie =((movie)=>{

            let fav=  JSON.parse(localStorage.getItem("fav"));
            if(fav.some((m)=>{return m.id==movie.id})){
                alert("Movie already present")
            }
            else{
            fav.push(movie);
            localStorage.setItem("fav", JSON.stringify(fav));
            alert("movie added to favorites")
            setAlter(alter+1)}
        })

        let removeMovie=(id)=>{
           let fav= JSON.parse(localStorage.getItem("fav"));
           fav=fav.filter((value)=>{ return value.id!=id})
           localStorage.setItem("fav", JSON.stringify(fav));
           alert("movie removed from favorites")
           setAlter(alter-1)
        }


    return (
        <>
            <h1 id="all-movies">{title}</h1>
            {movies && <div className="movies-list">
                {movies.map((movie) => {
                    return( <div id="moviediv">
                        {favId&&favId.includes(movie.id) ? 
                        <button className="fav-btn" onClick={()=>{removeMovie(movie.id)}}>🧡</button>
                        :
                        <button className="fav-btn" onClick={()=>{addMovie(movie)} }>🤍</button>}
                        <Link to={`/details/${movie.id}`} id="link"> 
                            <img src={movie.poster} alt={'image of ' + movie.moviename} height="300px" width="250px" />
                            <h4>  {movie.moviename}</h4>
                            <p>  {movie.genre}</p>
                        </Link>
                    </div>)
                }
                )
                }
            </div>}
        </>);
}

export default MoviesList;
//we use Route Parameter when we dont have any relationship between two components => <Link to={`/details/${movie.id}`} id="link">