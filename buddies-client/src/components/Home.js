import React from 'react'
import {Link} from 'react-router-dom'


function Home() {
    return (
        <div className="Home">
         
            <img src="/num59282011.png" alt="buddiesImg" />
           <h2 className="title-home">Find social activities with buddies</h2>
           <p className="desc-home">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac fermentum vulputate lobortis velit eu fringilla dictum massa.</p>
           <div >
           <Link to="/register">
               <button className="getStarted btn btn-primary">
                  Get Started
                </button>
                </Link></div>
        </div>
    )
}

export default Home
