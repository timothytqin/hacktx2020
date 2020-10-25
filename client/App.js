import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/RootDrawerNav';
import Auth from './screens/AuthStackNav';
import { db } from './firebase/firebase';

console.disableYellowBox = true;

const AuthContext = React.createContext({
  users: null,
  user: null,
  setUser: null,
  properties: [],
  setProperties: null,
});

const properties = require('./data/properties.json');
export default function App() {
  const [user, setUser] = React.useState(null);
  const [listingsById, setListingsById] = React.useState([]);
  const [listingIds, setListingIds] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    db.collection('listings').onSnapshot((listings) => {
      const listingsById = {};
      const listingIds = [];
      listings.forEach((listing) => {
        listingsById[listing.id] = listing.data();
        listingIds.push(listing.id);
      });
      setListingIds(listingIds);
      setListingsById(listingsById);
    });
    db.collection('users').onSnapshot((usersSnapshot) => {
      const usersByUid = {};
      usersSnapshot.forEach((userSnapshot) => {
        usersByUid[userSnapshot.id] = userSnapshot.data();
      });
      setUsers(usersByUid);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ users, user, setUser, listingsById, listingIds }}
    >
      <NavigationContainer>{!user ? <Auth /> : <Home />}</NavigationContainer>
    </AuthContext.Provider>
  );
}

export { AuthContext };
