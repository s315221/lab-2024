
import 'bootstrap/dist/css/bootstrap.min.css';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import NavigationBar from '../Components/NavigationBar'
import SideBar from '../Components/SideBar'
import Content from '../Components/Content'
import './App.css'

function App() {

  return (
    <>
      <div className='d-flex flex-column'>
        <header className="d-flex flex-row">
          <NavigationBar className='d-flex flex-fill justify-content-between align-items-center p-2 bg-primary text-light border' />
        </header>
        <div className='d-flex flex-row border'>
          Sidebar     FilmList
        </div>
      </div>
    </>
  )
}

export default App
