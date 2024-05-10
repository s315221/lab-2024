
import 'bootstrap/dist/css/bootstrap.min.css';


import { useEffect, useState } from 'react';

import NavigationBar from '../Components/NavigationBar'
import SideBar from '../Components/SideBar'
import Content from '../Components/Content'
import './App.css'

import dayjs from 'dayjs';
import { Film, FilmLibrary } from "./filmlibrary.mjs";

// Preparing film library
const pulpFiction = new Film(1, "Pulp Fiction", true, "2024-04-10", 5);
const grams21 = new Film(2, "21 Grams", true, "2024-04-17", 4);
const starWars = new Film(3, "Star Wars", false);
const matrix = new Film(4, "Matrix", true);
const shrek = new Film(5, "Shrek", false, "2024-04-21", 3);
const shrek2 = new Film(52, "Shrek 2", false, "2024-04-01", 3);

let filmLibrary = new FilmLibrary();
filmLibrary.addNewFilm(pulpFiction);
filmLibrary.addNewFilm(grams21);
filmLibrary.addNewFilm(starWars);
filmLibrary.addNewFilm(matrix);
filmLibrary.addNewFilm(shrek);
filmLibrary.addNewFilm(shrek2);

function App() {

  const filters = ["All", "Favorites", "Best Rated", "Seen Last Month", "Unseen"];

  const [filmArray, setFilmArray] = useState(filmLibrary.films);
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  useEffect(
    () => {
      switch (activeFilter) {
        case "All":
          setFilmArray(filmLibrary.films);
          break;
        case "Favorites":
          setFilmArray(filmLibrary.getFavorites());
          break;
        case "Best Rated":
          setFilmArray(filmLibrary.getBestRated());
          break;
        case "Seen Last Month":
          setFilmArray(filmLibrary.getSeenAfter(dayjs().subtract(1, 'month').startOf('month')));
          break;
        case "Unseen":
          setFilmArray(filmLibrary.getUnSeen());
          break;
        default:
          setFilmArray([]);
      }
    }, [activeFilter]
  );

  return (
    <div className='d-flex flex-column flex-fill'>
      <header className="d-flex flex-row">
        <NavigationBar className='d-flex flex-fill justify-content-between align-items-center p-2 bg-primary text-light' />
      </header>
      <div className='d-flex flex-row'>
        <SideBar className='d-flex flex-column col-3 bg-light' is='filter-list' filters={filters} activeFilter={activeFilter} variant="light" setActiveFilter={setActiveFilter} />
        <Content className='d-flex flex-column' is='film-table' filmArray={filmArray} activeFilter={activeFilter} />
      </div>
    </div>
  )
}

export default App
