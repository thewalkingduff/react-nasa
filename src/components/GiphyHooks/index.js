import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GifHooks = () => {
    const [gifs, setGifs] = useState([])
    const [savedGifs, setSavedGifs] = useState([])


    useEffect(() => {
        const savedGifs = localStorage.getItem('savedGifs')

        if (savedGifs) setSavedGifs(JSON.parse(savedGifs))
    }, [])

    // const handleInput = (event) => {
    //     setGifInput(event.target.value);
    // }

    const handleRemoveGif = (index) => {
        const newArray = [...savedGifs];

        newArray.splice(index, 1);

        setSavedGifs(newArray)
        localStorage.setItem('savedGifs', JSON.stringify(newArray))

    }

    const handleSaveGif = (gif) => {
        const newArray = [...savedGifs, gif]

        setSavedGifs(newArray)
        localStorage.setItem('savedGifs', JSON.stringify(newArray))
    }

    const handleSearchGifs = async () => {
        // if (!gifInput) return;

        let api_key = '315qqaaVO6uwQ5uQD6ok0qsQqaAilA1NxE0Lj0e5'

        // const res = await axios.get(`https://api.giphy.com/v1/gifs/search?&q=${gifInput}&api_key=${api_key}`)
        const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`)
        // const res = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${api_key}`)

        console.log('response: ', res)

        setGifs(res.data)
    }

    return (
        <div className='container'>
            <h1>NASA<span style={{ color: '#FFE62E' }}> ASTRONOMY PICTURE OF THE DAY</span> </h1>

            <div className='fav-gifs'>

{savedGifs.map((gif, index) => {
    console.log(gif)
    return (
        <div key={index} className="single-fav-gif">
            {/* <img src={gif.images.fixed_width.url} alt=' ' /> */}
            <h1>{gifs.title}</h1>
            <img src={gifs.url} alt=' ' />
            <p>{gifs.explanation}</p>
            <button className="save-remove-button" onClick={() => handleRemoveGif(index)} >Remove</button>
        </div>
    )
})}
</div>

            <section className='search-section'>
                {/* <h2>LOAD ASTRONOMY PICTURE OF THE DAY!</h2> */}
                <button className="search-button" onClick={handleSearchGifs}>LOAD</button>
            </section>


            <div className='searched-gifs'> 
        
                        <div className="single-search-gif">
                            <h1>{gifs.title}</h1>
                            <img src={gifs.url} alt=''/>
                            <p>{gifs.explanation}</p>
                            <button className="save-remove-button" onClick={() => handleSaveGif(gifs.url)}>Save</button>
                        </div>
     
            </div>
        </div>
    );
}

export default GifHooks
