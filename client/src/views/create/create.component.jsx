import './create.styles.css';
import { useState } from "react";

function Create() {

  const [input, setInput] = useState({
    name: "",
    description: "",
    platforms: "",
    image: "",
    released: "",
    rating: "",
    created: "",
  })

  const [error, setError] = useState({
    name: "* Required",
    description: "* Required",
    platforms: "* Required",
    image: "* Required",
    released: "* Required",
    rating: "* Required",
    created: "* Required",
  })

  const validate = (input) => {
    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
      setError({...error,image:"Must be an URL"});
      return;
    }
    setError({...error,image:""})
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    validate({
      ...input,
      [e.target.name]: e.target.value,
    });
  }



  return (
    <div >
      <form onSubmit={""}>
        <div>
          <label> Name
          </label>
          <input name="name" value={input.value} onChange={handleChange} />
        </div>

        <div>
          <label> Description
          </label>
          <input name="description" value={input.value} onChange={handleChange} />
        </div>

        <div>
          <label> Platforms
          </label>
          <input name="platforms" value={input.value} onChange={handleChange} />
        </div>

        <div>
          <label> Image
          </label>
          <input name="image" value={input.value} onChange={handleChange} />
          <span>{error.image}</span>
        </div>

        <div>
          <label> released
          </label>
          <input name="released" value={input.value} onChange={handleChange} />
        </div>

        <div>
          <label> rating
          </label>
          <input name="rating" value={input.value} onChange={handleChange} />
        </div>

        <div>
          <label> Genre
          </label>
          <input name="genre" value={input.value} onChange={handleChange} />
        </div>
        {/* {error.image ? null : <button type='submit' >Submit</button>} */}
        <button type='submit' >Submit</button>
      </form>
    </div>


  );
}

export default Create;
