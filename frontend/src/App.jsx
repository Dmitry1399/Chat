import { 
  BrowserRouter, Routes, Route, 
} from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Login from './pages/Login.jsx';

const App = () => {
 return (
 <BrowserRouter>
  <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="*" element={<NotFound />} />
  </Routes>
  </BrowserRouter>
 );
};

export default App;