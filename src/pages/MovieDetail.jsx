import React, { useEffect, useState } from 'react'
import {useParams, NavLink} from "react-router-dom";

const MovieDetail = () => {
  const API_KEY = process.env.REACT_APP_API_KEY; 
  const {id} = useParams();

  
  const [myMovie , setMyMovie] = useState("")
  const [myVideo , setMyVideo] = useState("")

  const getMovieVideo = ()=>{
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

    fetch(movieUrl).then((res)=> res.json()).then((data)=>setMyVideo(data.results[0].key)).catch((error)=>console.log(error))
  }

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

     fetch(url).then((res)=> {

      if(!res.ok){
        throw new Error("Something went wrong")
      }

      return res.json();
     }
     ).then((data)=>setMyMovie(data)).catch((error)=> console.log(error));

     //! movie video fetch process
     getMovieVideo();
  }, [])
  
// console.log(myMovie);
   const { overview, release_date, vote_average , vote_count, poster_path , original_title} = myMovie;

  return (
    <div style={{ marginTop: "7rem" }} className="d-flex flex-column gap-4">
      <h3 className='text-center mx-auto' style={{borderBottom:"1px solid lightgrey", display:"inline-block"}}>{original_title}</h3>
      <div className="movie-div" style={{ margin: "auto" }}>
        <iframe  width="500px" height="300px" src={`https://www.youtube.com/embed/${myVideo}`}>Youtube</iframe>
      </div>

      <div className="card mb-3" style={{ width: "80%", margin: "auto" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w1280${poster_path}`
                  : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6IaDlVJZTX4mguRojFVaASliLpGGG3O-Kmg&usqp=CAU`
              }
              className="img-fluid rounded-start"
              alt="poster"
            />
          </div>

          <div className="col-md-8 d-flex flex-column justify-content-space-between">
            <div className="card-body">
              <h5 className="card-title">Overview</h5>
              <p className="card-text">{overview}</p>
            </div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">Release Date: {release_date}</li>
              <li className="list-group-item">Rate: {vote_average}</li>
              <li className="list-group-item">Total Vote: {vote_count}</li>
              <li className="list-group-item">
                <NavLink to="/" className="card-link">
                  Go Back
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail