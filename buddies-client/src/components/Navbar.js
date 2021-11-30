import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
        <a className="navbar-brand" href="#">Buddies</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <FontAwesomeIcon icon={faBars} style={{color: '#1EF5D1'}} />
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
           
            <li className="nav-item">
              <a className="nav-link" href="/register">Sign up</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Sign in</a>
            </li>
          </ul>
          
        </div>
        </div>    
      </nav>
    )

}

export default Navbar
