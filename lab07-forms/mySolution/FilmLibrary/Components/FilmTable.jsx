import Form from 'react-bootstrap/Form'
import dayjs from "dayjs";
import { Pencil, Plus, Star, StarFill, Trash } from 'react-bootstrap-icons';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import { Film } from '../src/filmlibrary.mjs';

export default function FilmTable(props) {

    const states = {
        DEFAULT: 0,
        ADD: 1,
    }

    const [state, setState] = useState(states.DEFAULT);


    const emptyFilm = {
        title: '',
        isFavorite: false,
        date: '',
        rating: 0
    }
    const [newFilm, setNewFilm] = useState(emptyFilm);

    function checkChangeHandler(e) {
        e.preventDefault();
    }

    function handleNewFilmButtonClick(e) {
        e.preventDefault();
        setState(states.ADD);
    }

    function handleNewFilmChange(e) {
        e.preventDefault();
        const { name, value, checked } = e.target;
        const updatedFilm = { ...newFilm, [name]: value };
        if (name === "isFavorite") {
            updatedFilm["isFavorite"] = checked;
        }
        setNewFilm(updatedFilm);
    }

    function addNewFilmHandler(e) {
        e.preventDefault();
        props.addNewFilm(newFilm);
        setNewFilm(emptyFilm);

    }
    function cancelNewFilmHandler(e) {
        e.preventDefault();
        setState(states.DEFAULT);
    }

    return (
        <div className="d-flex flex-column flex-fill">
            <h1 className="d-flex flex-row">{props.activeFilter}</h1>
            <div className="d-flex flex-row">
                <table className='table m-0 text-start'>
                    <tbody>
                        {
                            props.filmArray.map(film =>
                                <tr key={film.id}>
                                    <td>{film.title}</td>
                                    <td><Form.Check name='isFavorite' label="Favorite" checked={film.isFavorite} onChange={checkChangeHandler} /></td>
                                    <td>{film.date ? dayjs(film.date).format('MMMM DD, YYYY') : ''}</td>
                                    <td>
                                        {[1, 2, 3, 4, 5].map(i => film.rating >= i ? <StarFill key={i} /> : <Star key={i} />)}
                                    </td>
                                    <td><Pencil /> <Trash /></td>
                                </tr>
                            )
                        }
                        <tr hidden={!(state == states.ADD)}>
                            <td>
                                <Form.Control name='title' placeholder='Title' value={newFilm.title} onChange={handleNewFilmChange}></Form.Control>
                            </td>
                            <td><Form.Check name='isFavorite' label="Favorite" checked={newFilm.isFavorite} onChange={handleNewFilmChange} /></td>
                            <td><Form.Control type='date' name='date' placeholder='Last Watched date' value={newFilm.date ? newFilm.date : ''} onChange={handleNewFilmChange}></Form.Control></td>
                            <td><Form.Control name='rating' placeholder='Rating' value={newFilm.rating} onChange={handleNewFilmChange}></Form.Control></td>
                            <td>
                                <ButtonGroup>
                                    <Button variant='outline-primary' onClick={addNewFilmHandler}>Add</Button>
                                    <Button variant='outline-danger' onClick={cancelNewFilmHandler}>Cancel</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="d-flex flex-row position-fixed bottom-0 end-0  translate-middle">
                <Button variant='primary' className='rounded-circle p-2' onClick={handleNewFilmButtonClick} hidden={state == states.ADD}><Plus /></Button>
            </div>
        </div >
    );
}
