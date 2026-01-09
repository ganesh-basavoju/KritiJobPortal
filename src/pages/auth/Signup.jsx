import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import styles from './Auth.module.css';

const Signup = () => {
    const { register, error } = useContext(AuthContext);
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'candidate'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (role) => {
        setFormData({ ...formData, role });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            addToast("Passwords don't match!", 'error');
            return;
        }

        try {
            // Pass false for autoLogin to just register and not store token
            await register(formData.name, formData.email, formData.password, formData.role, false);
            addToast('Registration successful! Please log in.', 'success');
            navigate('/login');
        } catch (err) {
            console.error('Registration failed', err);
            addToast(err.message || 'Registration failed', 'error');
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={`glass-card ${styles.authCard}`} style={{marginTop: '100px', paddingBottom: '2rem'}}>
                <h2 className="text-gradient">Create Account</h2>
                <p className={styles.subtitle}>Join as a Candidate or Employer</p>

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.roleSwitcher}>
                    <div 
                        className={`${styles.roleOption} ${formData.role === 'candidate' ? styles.active : ''}`}
                        onClick={() => handleRoleChange('candidate')}
                    >
                        Candidate
                    </div>
                    <div 
                        className={`${styles.roleOption} ${formData.role === 'employer' ? styles.active : ''}`}
                        onClick={() => handleRoleChange('employer')}
                    >
                        Employer
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input 
                        label="Full Name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
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
                    <Input 
                        label="Re-enter Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    
                    <Button type="submit" variant="primary" className={styles.submitBtn}>
                        Create Account
                    </Button>
                </form>
                
                <p className={styles.footerText}>
                    Already have an account? <a href="/login" className={styles.link}>Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
