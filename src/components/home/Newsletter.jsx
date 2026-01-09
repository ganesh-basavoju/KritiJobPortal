import React from 'react';
import styles from './Newsletter.module.css';
import Button from '../ui/Button';

const Newsletter = () => {
    return (
        <section className={styles.section}>
            <div className="focused-container">
                <div className={styles.banner}>
                    <div className={styles.content}>
                        <h2>
                            Never Wants to Miss Any <span className="text-gradient">Job News?</span>
                        </h2>
                    </div>
                    <div className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <input type="email" placeholder="Your@email.com" />
                        </div>
                        <Button variant="primary" className={styles.subscribeBtn}>Subscribe</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
