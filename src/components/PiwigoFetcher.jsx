import React from 'react'

const PiwigoFetcher = () => {
  const fetchPiwigoInfo = async () => {
    const response = await fetch('/server/testFunction');
    console.log(response);
  }

  return (
    <button onClick={fetchPiwigoInfo}>click to fetch</button>
  )
}

export default PiwigoFetcher
