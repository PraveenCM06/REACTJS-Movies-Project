import { useEffect } from "react";
import { useState } from "react";
import MoviesList from "./MoviesList";

const Favorites = () => {
    let [fav, setFav]=useState(null);
    
    useEffect(()=>{
        setFav(JSON.parse(localStorage.getItem("fav")));
    },)
    return ( 
        <div>
            {fav && <MoviesList movies={fav} title="Favorites"/>}
        </div> );
}
 
export default Favorites;