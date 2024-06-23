import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  BrowserRouter, Routes, Route, 
} from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Login from './pages/Login.jsx';
import AppContainer from './сomponents/AppContainer.jsx';

const App = () => {
 return (
 <AppContainer>
 <BrowserRouter>
  <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="*" element={<NotFound />} />
  </Routes>
  </BrowserRouter>
  </AppContainer>
 );
};

export default App;