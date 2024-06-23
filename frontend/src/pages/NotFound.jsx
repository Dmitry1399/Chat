import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
            <div className="text-center mt-5">
              <img src="https://www.stixosfm.com/images/404img2.png" alt="Страница не найдена" className="img-fluid" />
              <h1 className="h4 text-muted">Страница не найдена</h1>
              <p className="text-muted">
              Но вы можете перейти 
                <Link to="/">на главную страницу</Link>
              </p>
            </div>
    );
};

export default NotFound;