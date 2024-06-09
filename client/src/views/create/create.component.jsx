import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getVideogames } from '../../redux/actions';
import './create.styles.css';

function Create() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    platforms: [],
    image: "",
    released: "",
    rating: "",
    genres: [],
  });

  const [error, setError] = useState({
    name: "* Required",
    description: "* Required",
    platforms: "* Required",
    image: "* Required",
    released: "* Required",
    rating: "* Required",
    genres: "* Required",
  });

  const [formValid, setFormValid] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(true);
  const [genresList, setGenresList] = useState([]);

  const platformsList = useSelector(state => state.platforms);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    document.body.classList.add('create-page');
    return () => {
      document.body.classList.remove('create-page');
    };
  }, []);

  useEffect(() => {
    dispatch(getVideogames());
    fetchGenres();
  }, [dispatch]);

  useEffect(() => {
    const isFormValid = Object.values(error).every(err => err === "");
    setFormValid(isFormValid);
  }, [error]);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:3001/genre/');
      setGenresList(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching genres:', error);
      setLoading(false);
    }
  };

  const validate = (input) => {
    let errors = {};

    if (!input.name) {
      errors.name = "Name is required";
    } else if (/[^a-zA-Z0-9 ]/.test(input.name)) {
      errors.name = "Name cannot contain symbols";
    }

    if (!input.description) {
      errors.description = "Description is required";
    }

    if (!input.platforms.length) {
      errors.platforms = "Platforms are required";
    }

    if (!input.image) {
      errors.image = "Image URL is required";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
      errors.image = "Must be a valid URL";
    }

    if (!input.released) {
      errors.released = "Release date is required";
    }

    if (!input.rating) {
      errors.rating = "Rating is required";
    } else if (input.rating < 0 || input.rating > 5) {
      errors.rating = "Rating must be between 0 and 5";
    }

    if (!input.genres.length) {
      errors.genres = "At least one genre is required";
    }

    setError(errors);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });

    validate({
      ...input,
      [name]: value,
    });
  }

  function handleGenreChange(e) {
    const { options } = e.target;
    const selectedGenres = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedGenres.push(options[i].value);
      }
    }
    setInput({
      ...input,
      genres: selectedGenres,
    });

    validate({
      ...input,
      genres: selectedGenres,
    });
  }

  function handlePlatformChange(e) {
    const { options } = e.target;
    const selectedPlatforms = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedPlatforms.push(options[i].value);
      }
    }
    setInput({
      ...input,
      platforms: selectedPlatforms,
    });

    validate({
      ...input,
      platforms: selectedPlatforms,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
      try {
        const genreIds = input.genres.map((genreName) => {
          const foundGenre = genresList.find((genre) => genre.name === genreName);
          return foundGenre ? foundGenre.id : null;
        }).filter(Boolean);

        const dataToSend = {
          name: input.name,
          description: input.description,
          platforms: input.platforms,
          image: input.image,
          released: input.released,
          rating: parseFloat(input.rating),
          genreIds: genreIds,
        };

        console.log('Data to send:', dataToSend);

        const response = await axios.post('http://localhost:3001/videogame', dataToSend);
        console.log('Videogame created successfully:', response.data);
        setInput({
          name: "",
          description: "",
          platforms: [],
          image: "",
          released: "",
          rating: "",
          genres: [],
        });
        setSubmitError("");
        history.push('/home');
      } catch (error) {
        console.error('Error creating videogame:', error);
        setSubmitError("An error occurred while creating the videogame.");
      }
    }
  };

  if (loading) {
    return <div>Loading genres...</div>;
  }

  return (
    <div className="create-container">
      <div className="button-group">
        <button className="button button-home" onClick={() => history.push('/home')}></button>
        <button className="button button-back" onClick={() => history.goBack()}></button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-field">
            <label>Name</label>
            <input name="name" value={input.name} onChange={handleChange} />
            <span>{error.name}</span>
          </div>
          <div className="form-field">
            <label>Image</label>
            <input name="image" value={input.image} onChange={handleChange} />
            <span>{error.image}</span>
          </div>
        </div>
        <div className="form-group">
          <div className="form-field">
            <label>Platforms</label>
            <select multiple name="platforms" value={input.platforms} onChange={handlePlatformChange} size="5">
              {platformsList.map((platform, index) => (
                <option key={index} value={platform}>{platform}</option>
              ))}
            </select>
            <span>{error.platforms}</span>
          </div>
          <div className="form-field">
            <label>Genres</label>
            <select multiple name="genres" value={input.genres} onChange={handleGenreChange} size="5">
              {genresList.map((genre) => (
                <option key={genre.id} value={genre.name}>{genre.name}</option>
              ))}
            </select>
            <span>{error.genres}</span>
          </div>
        </div>
        <div className="form-group">
          <div className="form-field">
            <label>Release Date</label>
            <input type="date" name="released" value={input.released} onChange={handleChange} />
            <span>{error.released}</span>
          </div>
          <div className="form-field">
            <label>Rating</label>
            <input type="number" name="rating" value={input.rating} onChange={handleChange} step="0.1" min="0" max="5" />
            <span>{error.rating}</span>
          </div>
        </div>
        <div className="form-group">
          <div className="form-field" style={{ flex: 2 }}>
            <label>Description</label>
            <textarea name="description" value={input.description} onChange={handleChange} rows="4" />
            <span>{error.description}</span>
          </div>
        </div>
        <button type="submit" className="button button-create-game" disabled={!formValid}></button>
        {submitError && <p className="error">{submitError}</p>}
      </form>
    </div>
  );
}

export default Create;
