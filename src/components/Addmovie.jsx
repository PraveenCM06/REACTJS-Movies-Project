import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


const Addmovie = () => {

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

    let handleAddNewMovie =(e)=>{
        e.preventDefault()
        //create a new movie object 
        let newMovie={
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
                newMovie.languages.push(options[i].value)
            }
        }
        
        fetch("http://localhost:4000/movies", {
                                                method: "POST",
                                                headers: {"Content-Type": "application/json"},
                                                body: JSON.stringify(newMovie)
                                            }
            )
        .then(()=>{
            alert("new movie added to database");
            navigate("/")
        })
    }
    return (
        <div id="addmovie">
        <h1>Add new Movie</h1>
        <form onSubmit={handleAddNewMovie}>
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
        <input type="submit" value="Add movie"/>
        </form>
    </div> 
);
}

export default Addmovie;