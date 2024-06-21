import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
            <div className="text-center mt-5">
              <img src="https://frontend-chat-ru.hexlet.app/static/media/404.38677c8fa96b7e2b6537040f39020684.svg" alt="Страница не найдена" className="img-fluid" />
              <h1 className="h4 text-muted">Страница не найдена</h1>
              <p className="text-muted">
              Но вы можете перейти 
                <Link to="/">на главную страницу</Link>
              </p>
            </div>
    );
};

export default NotFound;