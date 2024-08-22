import React from 'react';
import Header from './Header'
import { BG_URL } from '../utils/constants';

const Login = () => {
  return (
    <div>
      <Header />
      <div className="w-full absolute">
        <img className="h-screen" src={BG_URL} alt="logo" style={{width: '100%', objectFit: 'cover'}} />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
        Sign In
        </h1>

        <input
          // ref={name}
          type="text"
          placeholder="Full Name"
          className="p-2 my-2 w-full bg-gray-700"
        />
        <input
          // ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 my-2 w-full bg-gray-700"
        />
        <input
          // ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2">{'errorMessage'}</p>
        <button
          className="p-2 my-2 bg-red-700 w-full rounded-lg"
          // onClick={handleButtonClick}
        >
          Sign In
        </button>
        <p className="py-4 cursor-pointer" 
            // onClick={toggleSignInForm}
        >
        New to Netflix? Sign Up Now
        </p>
      </form>
    </div>
  )
}

export default Login