import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../Firebase/firebaseconfig';

import { doc, onSnapshot } from 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const unsubscribeUser = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            console.log("User data:", userData);
            setUser({
              id: firebaseUser.uid,
              name: userData.name || '',
              email: userData.email,
              avatar_url: userData.avatar_url || '',
              level: userData.level || 0,
              create_at: userData.create_at || '',
              role: userData.role || '',
            });
          } else {
            setUser(null);
          }
        });

        // cleanup user data listener
        return unsubscribeUser;
      } else {
        console.log("No user is signed in.");
        setUser(null);
      }
    });

    // cleanup auth listener
    return () => unsubscribeAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
