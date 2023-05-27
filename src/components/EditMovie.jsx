import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const EditMovie = () => {
    
    let {id}=useParams();

    let navigate=  useNavigate()
    let moviename= useRef();
    let hero= useRef();
    let heroine= useRef();
    let director= useRef();
    let genre= useRef();
    let poster=useRef();
    let trailer= useRef();
    let release= useRef();
    let rating= useRef();
    let synopsis= useRef();

    useEffect(()=>{
        fetch("http://localhost:4000/movies/"+id)
        .then((res)=>{return res.json()})
        .then((data)=>{
            moviename.current.value = data.moviename;
            hero.current.value = data.hero;
            heroine.current.value = data.heroine;
            director.current.value = data.director;
            genre.current.value = data.genre;
            poster.current.value = data.poster;
            trailer.current.value = data.trailer;
            rating.current.value = data.rating;
            release.current.value = data.release;
            synopsis.current.value = data.synopsis;

        })
    },[])


    let handleEditMovie =(e)=>{
        e.preventDefault()
        //create a new movie object 
        let updatedMovie={
            moviename : moviename.current.value,
            hero : hero.current.value,
            heroine : heroine.current.value,
            director : director.current.value,
            languages:[],
            genre:  genre.current.value,
            poster: poster.current.value,
            trailer: trailer.current.value,
            release: release.current.value,
            rating: rating.current.value,
            synopsis: synopsis.current.value
        }
        let options= document.getElementsByName("lang");
        for(let i=0; i<options.length; i++)
        {
            if(options[i].checked==true)
            {
                updatedMovie.languages.push(options[i].value)
            }
        }
        
        fetch("http://localhost:4000/movies/"+id, {
                                                method: "PUT",
                                                headers: {"Content-Type": "application/json"},
                                                body: JSON.stringify(updatedMovie)
                                            }
            )
        .then(()=>{
            alert("Updated to database");
            navigate("/details/"+id);
        })
    }
    return (
        <div id="addmovie">
        <h1>Update Movie</h1>
        <form onSubmit={handleEditMovie}>
        <input type="text" placeholder="Movie name" ref={moviename} /> <br />
        <input type="text" placeholder="hero" ref={hero}/> <br />
        <input type="text" placeholder="heroine" ref={heroine}/> <br />
        <input type="text" placeholder="director" ref={director}/> <br />
       <fieldset>
        <legend>Select language </legend>
        <input type="Checkbox" name="" id="1" value="kannada"/><label htmlFor="1">Kannada</label>
        <input type="Checkbox" name="" id="2"value="hindi"/><label htmlFor="2">Hindi</label>
        <input type="Checkbox" name="" id="3"value="telugu"/><label htmlFor="3">Telugu</label>
        <input type="Checkbox" name="" id="4"value="tamil"/><label htmlFor="4">Tamil</label>
       </fieldset>
        <input type="text" placeholder="Genre" ref={genre}/>
        <input type="text" placeholder="poster" ref={poster}/>
        <input type="text" placeholder="Trailer" ref={trailer}/>
        <input type="number" min="1969"  max="2023" placeholder="Release Year" ref={release}/>
        <input type="number" step="0.1" min="1" max="10" placeholder="Rating" ref={rating}/>
        <textarea name="" id="" cols="30" rows="10" placeholder="Synopsys" ref={synopsis}></textarea>
        <input type="submit" value="Edit movie"/>
        </form>
    </div> 
);
}

export default EditMovie;