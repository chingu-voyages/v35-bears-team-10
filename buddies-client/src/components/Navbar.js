import React from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
    return (
        <div>
             <div className="div-3">
        <span className="span-3">
          Buddies
        </span>
        
        <div className="buttons"><Link to="/login"><button className="myButton" >Log in</button></Link>
           <Link to="/register"><button className="myButton-2">Get Started</button></Link> </div>
        
      </div>
        </div>
    )
}

export default Navbar
 