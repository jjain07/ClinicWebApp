import logo from './logo.svg';
import './App.css';
import React from 'react';
import HeaderTopBar from './component/HeaderTopBar';
import Header from './component/Header';
import Footer from './component/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
 
 
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HeroSection from './component/HeroSection';
import Procedures from './pages/procedures';
import AddProcedure from './pages/admin/procedure';
import BlogEditorCopy from './pages/admin/BlogEditorCopy';
import BlogEditor  from './pages/admin/BlogEditor';
function App() {
  return (
    <div className="App">
      <Router>
  
      
      <div className="flex flex-col min-h-screen">
        <HeaderTopBar />
        <Header />
        <HeroSection/>
        <main className="flex-grow">
          <Routes>
              <Route path="/" Component={Home} />
               <Route path="/About" Component={About} />
             <Route path="/procedures" element={<Procedures />} />
             <Route path="/contact" element={<Contact />} />
               <Route path="/admin/procedure" element={<AddProcedure />} />
                              <Route path="/admin/blogeditor" element={<BlogEditor />} />

             {/* <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<FAQ />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>

    </div>
  );
    }

export default App;
