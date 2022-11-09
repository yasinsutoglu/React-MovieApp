import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";


const Main = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")

  const getMovies = async (url)=>{      
      try {
        const {data:{results}} = await axios(url)
        if(results.length == 0){
          alert("Check movie search name!!");
          setSearch("");
        }else{
          setMovies(results);
        }        
      } catch (error) {
        console.log(error)
      }
      
  }

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
    getMovies(url)
  }, [])
  

  const handleSearch=(e)=>{
      e.preventDefault();
      if(!search){
        alert("Please fill the search input!")
      }else{
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
      getMovies(url)
      }
  }

  return (
    <>
      <div
        className="bg-secondary d-flex justify-content-center align-items-center"
        style={{ marginTop: "3.5rem", height: "5rem" }}
      >
        <div className="input-group mb-3 w-50 pt-4">
          <input
            type="search"
            className="form-control"
            placeholder="Search a movie"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
          />
          <button
            className="btn btn-outline-dark"
            type="button"
            id="button-addon2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="movie-cards d-flex gap-2 flex-wrap justify-content-center mt-5">
        {movies?.map((movie)=>{
          const {id} = movie
          return(
            <MovieCard key={id} movie={movie} />
          )
        })}        
      </div>
    </>
  );
}

export default Main