import React from 'react';
import styles from './HowItWorks.module.css';

// Using the generated 3D image
import illustration from '../../assets/images/how_it_works_illustration.png'; 

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: "Build Your Resume",
            desc: "Create a standout resume with your skills.",
            icon: "fas fa-file-alt"
        },
        {
            id: 2,
            title: "Apply for Job",
            desc: "Find and apply for jobs that match your skills.",
            icon: "fas fa-search"
        },
        {
            id: 3,
            title: "Get Hired",
            desc: "Connect with employers and start your new job.",
            icon: "fas fa-check-circle"
        }
    ];

    return (
        <section className={styles.section}>
            <div className="focused-container">
                <div className={styles.header}>
                    <h2>How it <span className="text-gradient">Works</span></h2>
                    <p>Effortlessly navigate through the process and land your dream job.</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.blob}></div>
                        {/* We will need to move the generated image to this path or use the absolute path for now in dev */}
                        <img src="/src/assets/images/how_it_works_illustration.png" alt="How it works" className={styles.illustration} />
                        
                        {/* 3D Floating Card Overlay */}
                        <div className={`${styles.floatingCard} glass-card`}>
                            <div className={styles.userAvatar}>
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                            </div>
                            <div className={styles.cardInfo}>
                                <h4>Complete your profile</h4>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill}></div>
                                </div>
                                <span>70% Completed</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.stepsWrapper}>
                        {steps.map((step, index) => (
                            <div key={step.id} className={styles.stepItem} style={{animationDelay: `${index * 0.2}s`}}>
                                <div className={styles.stepIcon}>
                                    <i className={step.icon}></i>
                                </div>
                                <div className={styles.stepInfo}>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
