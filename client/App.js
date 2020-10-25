import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/HomeStackNav';

export default function App() {
  const [user, setUser] = React.useState(null);
  const AuthContext = React.createContext({ user: null });
  return (
    <AuthContext.Provider value={{ user: user }}>
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
