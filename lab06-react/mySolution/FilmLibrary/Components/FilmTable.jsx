import Form from 'react-bootstrap/Form'
import dayjs from "dayjs";
import { Pencil, Plus, Star, StarFill, Trash } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';


export default function FilmTable(props) {

    function checkChangeHandler(e) {
        e.preventDefault();
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
                                    <td><Form.Check label="Favorite" checked={film.isFavorite} onChange={checkChangeHandler} /></td>
                                    <td>{film.date ? dayjs(film.date).format('MMMM DD, YYYY') : ''}</td>
                                    <td>
                                        {[1, 2, 3, 4, 5].map(i => film.rating >= i ? <StarFill key={i} /> : <Star key={i} />)}
                                    </td>
                                    <td><Pencil /> <Trash /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="d-flex flex-row position-fixed bottom-0 end-0  translate-middle">
                <Button variant='primary' className='rounded-circle p-2'><Plus /></Button>
            </div>
        </div >
    );
}
