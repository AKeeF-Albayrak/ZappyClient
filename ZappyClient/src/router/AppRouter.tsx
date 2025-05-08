import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';     
import LoginPage from '../features/Login/LoginPage';
import SignupPage from '../features/SignUp/SignUpPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignupPage/>}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;
