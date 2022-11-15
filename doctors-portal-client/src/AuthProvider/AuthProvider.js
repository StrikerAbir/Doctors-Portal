import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const AuthContext = createContext();
const auth=getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // create user with email and password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // login with email and password
    const signIn =(email,password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    // logout
    const logOut = () => {
        return signOut(auth)
    }

    // observer
    useEffect(() => {
      const   unsubscribe = onAuthStateChanged(auth, currentUser => {
          setUser(currentUser);
      })
        return () => unsubscribe();
    },[])

    const authInfo={
        user,
        createUser,
        signIn,
        logOut
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;