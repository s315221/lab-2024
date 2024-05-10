
import 'bootstrap/dist/css/bootstrap.min.css';


import { useState } from 'react';

import NavigationBar from '../Components/NavigationBar'
import SideBar from '../Components/SideBar'
import Content from '../Components/Content'
import './App.css'


import { Film, FilmLibrary } from "./filmlibrary.mjs";


function App() {
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

  const filters = ["All", "Favorites", "Best Rated", "Seen Last Month", "Unseen"];

  const [currentFilter, setCurrentFilter] = useState(filters[0]);

  return (
    <>
      <div className='d-flex flex-column'>
        <header className="d-flex flex-row">
          <NavigationBar className='d-flex flex-fill justify-content-between align-items-center p-2 bg-primary text-light border' />
        </header>
        <div className='d-flex flex-row border'>
          <SideBar className='d-flex flex-column border' is='filter-list' filters={filters} variant="light" />
          <Content className='d-flex flex-column border' is='film-table' filmLibrary={filmLibrary} currentFilter={currentFilter} />
        </div>
      </div>
    </>
  )
}

export default App
