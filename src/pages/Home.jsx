import React from 'react';
import Hero from '../components/layout/Hero';
import TrustedCompanies from '../components/home/TrustedCompanies';
import JobCategories from '../components/home/JobCategories';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import Footer from '../components/layout/Footer';

const Home = () => {
    return (
        <main>
            <Hero />
            <TrustedCompanies />
            <JobCategories />
            <HowItWorks />
            <Testimonials />
            <Newsletter />
            <Footer />
        </main>
    );
};

export default Home;
