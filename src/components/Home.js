import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {

    const style = {
        fontSize: '1.3rem',
        padding: '25px',
        color: 'rgb(0, 93, 214)',
        display: 'block'
    }

    return (
        <div className = "wrapper">
           <div className = "container">

                <h1>Music Recommendations</h1>
                <p>Get recommendations based on your favorite music artists and songs! This app uses <a target = "_blank" href = "https://www.last.fm/home">Last FM</a> data to provide you with best music recommendations. Just click on an option below and get started!</p>
                
      
                <Link style = {style} to = "/getsimilarartists">Get Similar Artists</Link>


                <Link style = {style} to = "/gettopalbums">Get Top Albums</Link> 


                <Link style = {style} to = "/getsimilartracks">Get Similar Songs</Link>


            </div>
        </div>
    )
}

export default Home
