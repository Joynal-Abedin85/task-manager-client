import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut  } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from './firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';

export const Authcontext = createContext()
const googleprovider = new GoogleAuthProvider()

const Authprovider = ({children}) => {

    const [user,setuser] = useState(null)
    const [loading , setloading] = useState(true)
    const [data, setData] = useState([]);
    const [error, seterror] = useState(null);

    const createuser = (email,password)=> {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email,password)
    }

    const signinuser = (email,password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logout = ()=> {
        setloading(true)
        return signOut(auth)
    }

    const signingoogle = () => {
        setloading(true)
        return signInWithPopup(auth,googleprovider)
    }

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (currentUser)=>{
          setuser(currentUser)
          setloading(false)
      });
      return () =>  unsub();
      
  },[])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://job-task-server-dusky.vercel.app/tasks`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result); // Store fetched data in state
      } catch (err) {
        seterror(err.message); // Handle errors
      } finally {
        setloading(false); // Ensure loading is false after fetch
      }
    };

    fetchData();
  }, [])

 

    const userinfo = {
        user,
        loading,
        createuser,
        signinuser,
        setuser,
        logout,
        signingoogle,
        data,
        error
    }
    return (
        <Authcontext.Provider value={userinfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;