import { createContext } from 'react';

export default createContext({
  isAuthed: false,
  setAuth: () => {},
  logOut: () => {},
});
