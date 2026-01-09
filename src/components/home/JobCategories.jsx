import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Home.module.css';

// Custom Arrows
const NextArrow = ({ onClick }) => (
    <div className={`${styles.arrow} ${styles.nextArrow}`} onClick={onClick}>
        <i className="fas fa-arrow-right"></i>
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div className={`${styles.arrow} ${styles.prevArrow}`} onClick={onClick}>
        <i className="fas fa-arrow-left"></i>
    </div>
);

const categories = [
    { title: 'Digital Marketing', desc: 'Promote brands online with marketing strategies', count: '1.5k+', icon: 'fa-bullhorn' },
    { title: 'Web Developer', desc: 'Build and maintain websites for clients', count: '2k+', icon: 'fa-code' },
    { title: 'Arts & Design', desc: 'Create visual content for branding and media', count: '500+', icon: 'fa-palette' },
    { title: 'UI-UX Designer', desc: 'Design user interfaces and enhance user experience', count: '800+', icon: 'fa-layer-group' },
    { title: 'Content Writing', desc: 'Write and edit content for various platforms', count: '1.5k+', icon: 'fa-pen-nib' },
    { title: 'Data Entry', desc: 'Input data into systems accurately and efficiently', count: '1k+', icon: 'fa-keyboard' },
    { title: 'Customer Support', desc: 'Assist customers with inquiries and issues', count: '1.2k+', icon: 'fa-headset' },
    { title: 'Finance', desc: 'Manage financial records and transactions', count: '700+', icon: 'fa-chart-pie' },
];

const JobCategories = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false, // User requested "not auto scrolling" but circular
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    arrows: false, // Hide arrows on mobile for cleaner look
                    dots: true // Show dots instead
                }
            }
        ]
    };

    return (
        <section className={styles.categoriesSection}>
            <div className="full-width-container">
                <h2 className={styles.sectionTitle}>
                    Browse <span className={styles.highlight}>Job</span> Category
                </h2>
                <p className={styles.subtitle}>
                    Explore diverse job opportunities tailored to your skills. Start your career journey today!
                </p>

                <div className={styles.carouselWrapper}>
                    <Slider {...settings}>
                        {categories.map((cat, index) => (
                            <div key={index}> {/* Wrapper for slick slide */}
                                <div className={styles.categoryCard}>
                                    <div className={styles.iconWrapper}>
                                        <i className={`fas ${cat.icon}`}></i>
                                    </div>
                                    <h3 className={styles.cardTitle}>{cat.title}</h3>
                                    <p className={styles.cardDesc}>{cat.desc}</p>
                                    <div className={styles.jobCount}>
                                        {cat.count} <small style={{ color: '#8892b0', fontWeight: '400' }}>new job posted</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default JobCategories;
