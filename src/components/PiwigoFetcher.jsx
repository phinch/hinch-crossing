import React from 'react'

const PiwigoFetcher = () => {
  const fetchPiwigoInfo = async () => {
    const response = await fetch('/.netlify/functions/testFunction').then(response => response.json());
    console.log(response);
  }

  return (
    <button onClick={fetchPiwigoInfo}>click to fetch</button>
  )
}

export default PiwigoFetcher
