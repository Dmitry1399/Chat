import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  BrowserRouter, Routes, Route, 
} from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Login from './pages/Login.jsx';
import AppContainer from './сomponents/AppContainer.jsx';
import PrivateRoute from './containers/Routes/PrivateRoute.jsx';
import Home from './pages/Home.jsx';
import { Provider } from 'react-redux';
import store from './store/index.js';
import AuthProvider from './context/auth/AuthProvider.jsx';

const App = () => (
  <Provider store={store}>
  <AuthProvider>
  <BrowserRouter>
    <AppContainer>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppContainer>
  </BrowserRouter>
  </AuthProvider>
  </Provider> 
);

export default App;