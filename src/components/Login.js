import React, { useRef, useState } from 'react';
import Header from './Header'
import { BG_URL } from '../utils/constants';
import { checkVelidData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slice/userSlice';



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkVelidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return

    if(!isSignInForm){
      // Signed up 
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4"
          }).then(() => {
            const { uid, email } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4" }));  
            navigate("/browse");
          }).catch((error) => {
            console.log('error', error)
            setErrorMessage(error?.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('error', error)
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Signed in 
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {          
          const user = userCredential.user;
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('error', error)
          setErrorMessage(errorCode + "-" + errorMessage);
          // navigate("/")
        });
    }
  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };


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
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 my-2 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-2 my-2 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" 
          onClick={toggleSignInForm}
        >
        {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  )
}

export default Login