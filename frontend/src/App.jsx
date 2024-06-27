import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  BrowserRouter, Routes, Route, 
} from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Login from './pages/Login.jsx';
import AppContainer from './components/AppContainer.jsx'
import PrivateRoute from './containers/Routes/PrivateRoute.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import NavBar from './components/NavBar.jsx';


const App = () => (
  <BrowserRouter>
        <AppContainer>
          <NavBar />
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppContainer>
      </BrowserRouter>
);


export default App;