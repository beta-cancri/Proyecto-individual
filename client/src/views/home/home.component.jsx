import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getByName, getVideogames} from "../../redux/actions";

import Navbar from '../../components/navbar/navbar.components';
// import Card from '../../components/card/card.components';
import Cards from '../../components/cards/cards.components';

import './home.styles.css';

function Home() {

const dispatch = useDispatch();
const allVideogames = useSelector((state)=> state.allVideogames);

const [searchString, setSearchString] = useState("");


function handleChange(e){
  e.preventDefault();
  setSearchString(e.target.value)
}

function handleSubmit(e){
  e.preventDefault()
  dispatch(getByName(searchString))
}

// const [filtered,setFiltered] = useState(allVideogames);
// const [searchString, setSearchString] = useState("");

// useEffect(()=>{
//   dispatch(getVideogames());
//   // unmount this is in order to clear the state and not save the info
//   // return (()=>{
//   //   clearVideogameDB()
//   // });
// },[dispatch]);

// useEffect(() => {
//   // Filter the allVideogames based on searchString
//   const filteredData = allVideogames.filter(videogame =>
//     videogame.name.toLowerCase().includes(searchString.toLowerCase())
//   );
//   setFiltered(filteredData);
// }, [allVideogames, searchString]);

// function handleChange(e){
//   e.preventDefault();
//   setSearchString(e.target.value)
// }

// function handleSubmit(e){
//   e.preventDefault();
//   const filtered = allVideogames.filter((videogame)=>
//     videogame.name.includes(searchString));
//   setFiltered(filtered);
// }

useEffect(()=>{
  dispatch(getVideogames());
  // unmount this is in order to clear the state and not save the info
  // return (()=>{
  //   clearVideogameDB()
  // });
},[dispatch]);

useEffect(() => {
  console.log("Updated allVideogames in Home component:", allVideogames);

}, [allVideogames]);

  return (
    <div className="home">
      <h2 className='home-title'>home page</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit}/>
      <Cards allVideogames = {allVideogames}/>
    </div>
  );
}

export default Home;
 