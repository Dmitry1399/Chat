import { Link } from 'react-router-dom';



const NotFound = () => {
  return (
    <div className="text-center mt-5">
      <img src={'#'} alt="Страница не найдена" className="img-fluid" />
      <h1 className="h4 text-muted">{'h1'}</h1>
      <p className="text-muted">
        {'Но вы можете перейти'}
        {' '}
        <Link to="/">{'на главную страницу'}</Link>
      </p>
    </div>
  );
};

export default NotFound;