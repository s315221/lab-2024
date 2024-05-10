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
                <Form.Control name='Search' type="search" placeholder='Search'></Form.Control>
            </div>
            <div className='d-flex flex-col'>
                <PersonCircle></PersonCircle>
            </div>
        </div>
    );
}
