import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Relavant from "./RelavantMovies";


const Moviedetails = () => {
        let {id}=  useParams();
        let navigate= useNavigate();
        let [movie, setMovie] = useState(null);
        let[error, setError]=useState(null);
        let[pending, setPending]=useState(true);
        useEffect(() => {
            setMovie(null)
            setPending(true)
            setTimeout(() => {
                    fetch("http://localhost:4000/movies/"+id)
                        .then((res) => { return res.json() })
                        .then((data) => {setMovie(data);setPending(false)})
                        .catch((err)=>{setError("error loading!! chech your internet Connection")
                                        setPending(false)})
            }, 1000)
        }, [id])
        
        let deleteMovie=()=>{
            let p= prompt("are you sure you want to delete? y/n");
            if(p=="y"){
            fetch("http://localhost:4000/movies/" + id, {method: "DELETE"})
            .then(()=>{navigate("/")})
            }
            else{
                navigate("/");
                alert("movie not deleted")
            }
        }
        
   
   return ( <div>
            {pending==true && <><h1 className="loading-text">Loading...</h1> <div class="spinner"></div> </>}

       {movie && <div id="details"> 
                    <iframe width="600" height="350" src={movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        <div>
                            <img id="detailsimage" src={movie.poster} alt="" height="300px" width="250px"/>
                            <h1>{movie.moviename}</h1>
                            <h5>Actors: {movie.hero}, {movie.heroine}</h5>
                            <h5>Director : {movie.director}</h5>
                            <h5>languages: {movie.languages.join(", ")}.</h5>
                            <h5>Genre: {movie.genre}</h5>
                            <h5>Rating: {movie.rating}</h5>
                            <button id="deletebutton" onClick={deleteMovie}> <h5>Delete Movie</h5> </button>
                           <Link to={`/edit/${id}`}><button id="deletebutton"> <h5> Edit Movie</h5></button></Link> 
                        </div>
                </div>}
        {movie && <Relavant genre={movie.genre}/>}
    </div> );
}
 
export default Moviedetails;