import {useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
// components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
export default function HomePageNav({ user }) {
  const history = useHistory();
  const [loggedUser, setLoggedUser] = useState({})
  const handleLogout = () => {
    localStorage.removeItem('ShopEZToken');
    localStorage.removeItem("ShopEZUser")
    history.push("/login")
  }
  useEffect(()=>{
    setLoggedUser(user);
  },[user])
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Link className="navbar-brand" to="/question">SHOPEZ</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {user?.email ? (
              <>
                <NavDropdown title={`Hi ${loggedUser.firstName}!`}>
                  <Nav.Item><Link className={'nav-link'}to={`/profile/${user._id}`}>Your Profile</Link></Nav.Item>
                  <Nav.Item className="nav-item"
                    onClick={() => handleLogout()}
                  >
                    <li className="nav-link">
                      Logout
                    </li>
                  </Nav.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className='nav-item'>
                  <Link to="/signup" className='nav-link'>Sign Up</Link>
                </li>
              </>
            )}
            {user?.userType !== "admin" ? <>
              <li className='nav-item'>
                <Link to="/createstore">
                  <button className='btn btn-sm btn-outline-dark mt-1'>LIST YOUR BUSINESS</button>
                </Link>
              </li>
            </> : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
