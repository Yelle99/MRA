import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from './img.png';
import logo from './logo.png';
import aos from 'aos';
import "aos/dist/aos.css";



const Home = () => {

    useEffect(() => {
        aos.init();
        aos.refresh()
    }, [])

    const style1 = {
        color: 'white',
        fontSize: '20px',
        textDecoration: 'none',
        padding: '10px 40px 10px 40px'
    }

    return (
        <div>
            <div className = "wrapper">
                <header>
                    <div class = "logo-container">
                        <h3>M  R  A</h3>
                    </div>
                    <nav>
                        <ul className = "nav-links">
                            <li><a className = "nav-link" href = "#">Home</a></li>
                            <li><a className = "nav-link" href = "#prvi">Get Similar Artists</a></li>
                            <li><a className = "nav-link" href = "#drugi">Get Top Albums</a></li>
                            <li><a className = "nav-link" href = "#treci">Get Similar Songs</a></li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <section className = "presentation">
                        <div className = "introduction">
                            <div className = "intro-text">
                                <h1>Music Recommendations</h1>
                                <p>Get recommendations based on your favorite music artists and songs! This app uses <a target = "_blank" href = "https://www.last.fm/home">Last FM</a> data to provide you with best music recommendations.</p>
                            </div>
                        </div>
                        <div className = "cover">
                            <img src = {img} />
                        </div>
                    </section>
                </main>
            </div>
            <a name = "prvi"></a>
            <div data-aos="fade-up" className = "prvi">
                <div data-aos="fade-up" className = "ikona1">
                    <i class="fas fa-music"></i>
                </div>
                <div data-aos="fade-up" className = "tekst1">
                    <h2>Get Similar Artists</h2>
                    <p>Searching for someone similar to your favorite musician?</p>
                    <button><Link style = {style1} to = "/getsimilarartists">Try it!</Link></button>
                </div>
            </div>

            <a name = "drugi"></a>
            <div className = "drugi">    
                <div data-aos="fade-up" className = "tekst2">
                    <h2>Get Top Albums</h2>
                    <p>Want to listen to more albums by your favorite artists but don't know where to start?</p>
                    <button><Link className = "link2" to = "/gettopalbums">Try it!</Link></button>
                </div>
                <div data-aos="fade-up" className = "ikona2">
                    <i class="fas fa-compact-disc"></i>
                </div>
            </div>

            <a name = "treci"></a>
            <div data-aos="fade-up" className = "treci">
                <div data-aos="fade-up" className = "ikona3">
                    <i class="fas fa-headphones-alt"></i>
                </div>
                <div data-aos="fade-up" className = "tekst3">
                    <h2>Get Similar Songs</h2>
                    <p>Want to find similar songs to your favorite ones?</p>
                    <button><Link className = "link3" to = "/getsimilartracks">Try it!</Link></button>
                </div>
            </div>

            <footer>
                <p>Music Recommendation App &copy; by Jelena</p>
            </footer>
        </div>
    )
}

export default Home

/*<Link style = {style} to = "/getsimilarartists">Get Similar Artists</Link>


<Link style = {style} to = "/gettopalbums">Get Top Albums</Link> 


<Link style = {style} to = "/getsimilartracks">Get Similar Songs</Link>*/
