import { Link, useLocation, useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext';
import { useContext } from 'react';

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const alertcontext = useContext(alertContext);
  const {showAlert} = alertcontext;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    showAlert('User logged out Successfully', 'success');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MyHandbook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <Link className="nav-link" activeclassname="active" aria-current="page" to="/">Home</Link> */}
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                {/* <Link className="nav-link" activeclassname="active" to="/about">About</Link> */}
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">About</Link>
              </li>

            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
            <Link className="btn btn-primary mx-1" to="/login" role="button">LogIn</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
            </form> : <button className="btn btn-primary" onClick={handleLogout} >Logout</button> }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;