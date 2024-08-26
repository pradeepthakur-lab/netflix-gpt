import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GPTSearch = () => {
  return (
    <>
      {/* <div className="fixed -z-10">
        <img className="h-screen object-cover" src={BG_URL} alt="logo" />
      </div> */}
      <div className="w-full fixed -z-10">
        <img className="h-screen" src={BG_URL} alt="logo" style={{width: '100%', objectFit: 'cover'}} />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  )
}

export default GPTSearch