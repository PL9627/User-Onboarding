import React, { useState, useEffect } from 'react';
import './App.css';
import UserForm from './components/UserForm';


function App() {
  return (
    <div className="App">
      <h1>User Onboarding</h1>
      <UserForm />
    </div>
  );
}

export default App;
