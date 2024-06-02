import './navbar.styles.css';

function Navbar({handleChange, handleSubmit}) {
  return (
    <div className='search-box'>
      <form onChange={handleChange}>
        <input placeholder='Search' type='search'/>
        <button type = "Submit" onClick={handleSubmit}>
          Search</button>
      </form>
    </div>
  );
}

export default Navbar;
 