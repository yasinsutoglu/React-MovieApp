import React from "react";
import "./MovieCard.scss"
import { useNavigate } from "react-router";

const Card = ({movie}) => {
  const { poster_path, original_title, vote_average, overview , id } = movie;
  const navigate = useNavigate();

  return (
    <div className="mycard" onClick={()=> navigate(`moviedetail/${id}`)}>
      <div>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w1280${poster_path}`
              : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6IaDlVJZTX4mguRojFVaASliLpGGG3O-Kmg&usqp=CAU`
          }
          alt="img"
        />
      </div>
      <div className="title">
        <p>{original_title}</p>
        <span>{vote_average}</span>
      </div>
      <div className="card-over">
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default Card;
