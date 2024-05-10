import { CollectionPlayFill, PersonCircle, List } from 'react-bootstrap-icons'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function NavigationBar() {
    return (
        <header className="d-flex flex-row">
            <nav className="navbar flex-grow-1 p-2 bg-primary text-light">
                <button className="navbar-toggler d-sm-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsable">
                    <List className="bi bi-list bg-primary text-light"></List>
                </button>
                <brand-logo>
                    <CollectionPlayFill className="bi bi-collection-play"></CollectionPlayFill>
                    <text className="h3">Film Library</text>
                </brand-logo>
                <search-box className="d-none d-sm-block">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" />
                    </form>
                </search-box>
                <user-icon>
                    <PersonCircle className="bi bi-person-circle"></PersonCircle>
                </user-icon>
            </nav>
        </header>
    );
}