import Branding from './Branding';
import Form from 'react-bootstrap/Form';
import { PersonCircle } from 'react-bootstrap-icons';

export default function NavigationBar(props) {
    return (
        <div className={props.className}>
            <div className='d-flex flex-col'>
                <Branding fontSize={'xx-large'} />
            </div>
            <div className='d-flex flex-col'>
                <Form.Control type="search" placeholder='Search'></Form.Control>
            </div>
            <div className='d-flex flex-col'>
                <PersonCircle></PersonCircle>
            </div>
        </div>
    );
}

const old = `
<header className="d-flex flex-div">
            <nav className="navbar flex-gdiv-1 p-2 bg-primary text-light">
                <NavbarToggle className="navbar-toggler d-sm-none" type="button" data-bs-toggle="divlapse"
                    data-bs-target="#divlapsable">
                    <List className="bi bi-list bg-primary text-light"></List>
                </NavbarToggle>
                <brand-logo>
                    <divlectionPlayFill className="bi bi-divlection-play"></divlectionPlayFill>
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
`;