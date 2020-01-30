import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import MovieCard from "./MovieCard";
import { Redirect } from "react-router-dom";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  deleteMovie = () => {
    console.log("Deleted");

    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        console.log("Result", res);
        this.props.history.push(`/`);
      })
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };
  editMoive = () => {
    this.props.history.push(`/update-form/${this.state.movie.id}`);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button">
          <button className="btn one" onClick={this.saveMovie}>
            Save
          </button>
          <button className="btn two" onClick={this.editMoive}>
            Edit
          </button>
          <button className="btn three" onClick={this.deleteMovie}>
            Delete Movie
          </button>
        </div>
      </div>
    );
  }
}
