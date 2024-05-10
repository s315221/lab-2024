
import FilmTable from "./FilmTable";

export default function Content(props) {
    return (
        props.is === 'film-table' ?
            <FilmTable className={props.className} filmArray={props.filmArray} activeFilter={props.activeFilter} />
            :
            <>
            </>
    );
}