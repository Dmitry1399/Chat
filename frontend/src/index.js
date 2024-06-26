import ReactDOM from 'react-dom/client';
import Init from './Init.jsx';

const runApp = async () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));

    root.render(await Init());
};

runApp();

