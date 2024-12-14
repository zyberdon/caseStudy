import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/Home';
import Header from './Components/Header';
import Upload from './Components/Upload';
import InventoryTable from './Components/Inventory';

const Routess = (props) => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<LandingPage {...props} />} />
                <Route path="/inventory" element={<InventoryTable {...props} />} />
                <Route path="/upload" element={
                    <Upload {...props} />
                } />
            </Routes>
        </Router>
    );
};

export default Routess;
