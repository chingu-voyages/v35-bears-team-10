import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div className="Home">
      <svg className="design" width="146" height="137" viewBox="0 0 146 137" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M82 37C82 92.2285 37.2285 137 -18 137C-73.2285 137 -118 92.2285 -118 37C-118 -18.2285 -73.2285 -63 -18 -63C37.2285 -63 82 -18.2285 82 37Z" fill="#D98C00" fill-opacity="0.71"/>
<circle cx="46" cy="-18" r="100" fill="#E9C441" fill-opacity="0.71"/>
</svg>


            <img src="/num59282011.png" alt="buddiesImg" />
           <h2 className="title-home">Find social activities with buddies</h2>
           <p className="desc-home">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac fermentum vulputate lobortis velit eu fringilla dictum massa.</p>
           <div >
           <Link to="/register">
           <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#FFBC05", borderColor: "#FFBC05" }}
                >
                  Get Started
                </button>
                </Link></div>
        </div>
    )
}

export default Home
