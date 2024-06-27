import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext.js';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
    const { t } = useTranslation();

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
                 {t('homePage.logOutButton')}
            </button>
            )}
        </div>
        </nav>
    );
    };

export default NavBar;