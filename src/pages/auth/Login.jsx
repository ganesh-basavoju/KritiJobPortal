import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import styles from './Auth.module.css';
import ForgotPasswordModal from './ForgotPasswordModal';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showForgotModal, setShowForgotModal] = useState(false);
    const { login, error } = useContext(AuthContext);
    const { addToast } = useToast(); // Use Toast
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData.email, formData.password);
            addToast('Login successful!', 'success');
            
            // Redirect based on role
            if (data.role === 'employer') {
                navigate('/dashboard/employer/company'); // Or post-job
            } else if (data.role === 'candidate') {
                navigate('/dashboard/candidate/profile');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err);
            addToast('Login failed. Please check your credentials.', 'error');
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={`glass-card ${styles.authCard}`}>
                <h2 className="text-gradient">Welcome Back</h2>
                <p className={styles.subtitle}>Access your professional dashboard</p>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <Input 
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input 
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    
                    <div className={styles.forgotPassword}>
                        <span onClick={() => setShowForgotModal(true)} className={styles.forgotLink}>Forgot Password?</span>
                    </div>



                    <Button type="submit" variant="primary" className={styles.submitBtn}>
                        Sign In
                    </Button>
                </form>
                
                <p className={styles.footerText}>
                    Don't have an account? <a href="/signup" className={styles.link}>Sign Up</a>
                </p>
            </div>
            {showForgotModal && <ForgotPasswordModal onClose={() => setShowForgotModal(false)} />}
        </div>
    );
};

export default Login;
