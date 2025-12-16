
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from  './App';
// const App = () => (
//   <div className="text-center text-maroon p-10">
//     <h1 className="text-4xl font-serif">Jyothi Dental Clinic</h1>
//     <p className="text-sm mt-2">Facial Surgery Speciality Clinic</p>
//   </div>
// );



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
