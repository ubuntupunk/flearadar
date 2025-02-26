import React from 'react';
import Explorer from '../components/Explorer'; // Adjust the path if necessary
import Header from '../components/Header';
import Footer from '../components/Footer';
const ExplorerPage = () => {
    return (
        <div>
            <Header />
            <h1>Explore Vendors, Markets, and Food Trucks</h1>
            <Explorer />
            <Footer />
        </div>
    );
};

export default ExplorerPage;