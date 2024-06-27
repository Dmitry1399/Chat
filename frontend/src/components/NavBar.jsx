import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext.js';

const NavBar = () => {
  const { isAuthed, logOut } = useAuthContext();

  const handleExit = () => logOut();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Hexlet Chat
        </Link>
        {isAuthed && (
          <button type="button" className="btn btn-primary" onClick={handleExit}>
            {'Выйти'}
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;