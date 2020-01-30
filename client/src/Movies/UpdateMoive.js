import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

function UpdateMoive(props) {
  const [movie, setMovie] = useState({
    id: props.match.params.id,
    title: "",
    director: "",
    metascore: 0,
    stars: [""]
  });

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => console.log(err.response));
  }, []);

  const handelSubmit = e => {
    e.preventDefault();
    console.log("Movie:", movie);

    Axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.history.push(`/movies/${movie.id}`);
      })
      .catch(err => console.log(err));
  };
  const handelChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handelSubmit} className="form">
        <input
          placeholder="Enter Title"
          name="title"
          value={movie.title}
          onChange={handelChange}
        />
        <input
          placeholder="Enter Director"
          name="director"
          value={movie.director}
          onChange={handelChange}
        />
        <input
          placeholder="Enter Metascore"
          name="metascore"
          value={movie.metascore}
          onChange={handelChange}
        />
        <button type="submit">Done</button>
      </form>
    </div>
  );
}

export default UpdateMoive;
