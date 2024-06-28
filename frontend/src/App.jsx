import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, ErrorBoundary } from '@rollbar/react';
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

const rollbarConfig = {
  accessToken: 'sYUec0__ZNdJWnleAAAC',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
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
      </ErrorBoundary>
    </Provider>
);


export default App;