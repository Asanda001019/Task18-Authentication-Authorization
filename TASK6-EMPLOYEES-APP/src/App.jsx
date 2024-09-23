import './App.css'
import React from 'react';
import Home from './components/Home';
import RegisterForm from './components/registerForm';
import Footer from './components/footer';


function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Home />
      <RegisterForm />
      <Footer />
    </div>
  );
}

export default App;

