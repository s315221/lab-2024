import Form from 'react-bootstrap/Form'
import dayjs from "dayjs";
import { Check, Pencil, Plus, Star, StarFill, Trash, X } from 'react-bootstrap-icons';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function FilmTable(props) {

    const states = {
        DEFAULT: 0,
        ADD: 1,
        EDIT: 2,
    }

    const [state, setState] = useState(states.DEFAULT);

    const emptyFilm = {
        _id: -1,
        title: '',
        isFavorite: false,
        date: '',
        rating: 0
    }

    const [selectedFilm, setSelectedFilm] = useState(emptyFilm);


    function handleNewFilmButtonClick(e) {
        e.preventDefault();
        setSelectedFilm(emptyFilm);
        setState(states.ADD);
    }



    function handleSelectedFilmChange(e) {
        e.preventDefault();
        const { name, value, checked } = e.target;
        const updatedFilm = { ...selectedFilm, [name]: value };
        if (name === "isFavorite") {
            updatedFilm["isFavorite"] = checked;
        }
        setSelectedFilm(updatedFilm);
    }

    useEffect(() => console.log(selectedFilm), [selectedFilm]
    )

    function handleNewFilmConfirm(e) {
        e.preventDefault();
        props.addNewFilm({ ...selectedFilm, _id: undefined });
        setSelectedFilm(emptyFilm);
        setState(states.DEFAULT);
    }

    function handleEditFilmConfirm(e) {
        e.preventDefault();
        props.editFilm({ ...selectedFilm });
        setSelectedFilm(emptyFilm);
        setState(states.DEFAULT);
    }

    function handleFilmCancel(e) {
        e.preventDefault();
        setState(states.DEFAULT);
    }


    function ratingsToStars(ratings) {
        return [1, 2, 3, 4, 5].map(i => ratings >= i ? <StarFill key={i} /> : <Star key={i} />)

    }


    function editFilm(filmId) {
        setState(states.EDIT);
        setSelectedFilm(props.filmArray.find(film => film._id === filmId));
        //setSelectedFilm(props.filmArray.find(film => film == e.target.key));
    }

    return (
        <div className="d-flex flex-column flex-fill">
            <h1 className="d-flex flex-row">{props.activeFilter}</h1>
            <div className="d-flex flex-row">
                <table className='table m-0 text-start'>
                    <tbody>
                        {
                            props.filmArray.map(film =>
                                (state === states.EDIT && film._id === selectedFilm._id) ?
                                    <tr key={film._id}>
                                        <td>
                                            <Form.Control name='title' placeholder='Title' value={selectedFilm.title} onChange={handleSelectedFilmChange}></Form.Control>
                                        </td>
                                        <td><Form.Check name='isFavorite' label="Favorite" checked={selectedFilm.isFavorite} onChange={handleSelectedFilmChange} /></td>
                                        <td><Form.Control type='date' name='date' value={selectedFilm.date ? dayjs(selectedFilm.date).format('YYYY-MM-DD') : ''} max={dayjs().format('YYYY-MM-DD')} onChange={handleSelectedFilmChange}></Form.Control></td>
                                        <td><Form.Select name='rating' placeholder='Rating' defaultValue={selectedFilm.rating} onChange={handleSelectedFilmChange}>
                                            <option value='0' >Rating</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </Form.Select></td>
                                        <td>
                                            <ButtonGroup>
                                                <Button variant='outline-primary' onClick={handleEditFilmConfirm}><Check /></Button>
                                                <Button variant='outline-danger' onClick={handleFilmCancel}><X /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    :
                                    <tr key={film._id}>
                                        <td>{film.title}</td>
                                        <td><Form.Check name='isFavorite' label="Favorite" checked={film.isFavorite} readOnly /></td>
                                        <td>{film.date ? dayjs(film.date).format('MMMM DD, YYYY') : ''}</td>
                                        <td>{ratingsToStars(film.rating)}</td>
                                        <td>
                                            <Button variant='' onClick={() => editFilm(film._id)}><Pencil /></Button>
                                            <Button variant=''><Trash /></Button>
                                        </td>
                                    </tr>
                            )
                        }
                        <tr key={selectedFilm._id} hidden={!(state == states.ADD)}>
                            <td>
                                <Form.Control name='title' placeholder='Title' value={selectedFilm.title} onChange={handleSelectedFilmChange}></Form.Control>
                            </td>
                            <td><Form.Check name='isFavorite' label="Favorite" checked={selectedFilm.isFavorite} onChange={handleSelectedFilmChange} /></td>
                            <td><Form.Control type='date' name='date' value={selectedFilm.date ? dayjs(selectedFilm.date).format('YYYY-MM-DD') : ''} max={dayjs().format('YYYY-MM-DD')} onChange={handleSelectedFilmChange}></Form.Control></td>
                            <td><Form.Select name='rating' placeholder='Rating' defaultValue={selectedFilm.rating} onChange={handleSelectedFilmChange}>
                                <option value='0' >Rating</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </Form.Select></td>
                            <td>
                                <ButtonGroup>
                                    <Button variant='outline-primary' onClick={handleNewFilmConfirm}><Check /></Button>
                                    <Button variant='outline-danger' onClick={handleFilmCancel}><X /></Button>
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


