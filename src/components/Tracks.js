import React from 'react'

const Tracks = ({ name, artist }) => {
    return (
        <div>
            <p className = "lista">{name} by {artist}</p>
        </div>
    )
}

export default Tracks
