import React, { useState } from 'react';
import styles from './Auth.module.css'; // Reusing Auth styles or create specific
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ForgotPasswordModal = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSendOtp = (e) => {
        e.preventDefault();
        // Mock API call
        setTimeout(() => setStep(2), 1000);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        // Mock Verify
        setTimeout(() => setStep(3), 1000);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        // Mock Reset
        alert('Password Reset Success!');
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
        }} onClick={onClose}>
            <div className={`glass-card ${styles.authCard}`} style={{ maxWidth: '400px', margin: '20px' }} onClick={e => e.stopPropagation()}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                     <h3 className="text-gradient">Reset Password</h3>
                     <i className="fas fa-times" onClick={onClose} style={{cursor:'pointer', color: '#9ca3af'}}></i>
                </div>

                {step === 1 && (
                    <form onSubmit={handleSendOtp}>
                        <p style={{color: '#9ca3af', marginBottom: '20px'}}>Enter your email to receive an OTP.</p>
                        <Input 
                            label="Email Address" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <Button type="submit" variant="primary" style={{width: '100%'}}>Send OTP</Button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp}>
                        <p style={{color: '#9ca3af', marginBottom: '20px'}}>Enter the OTP sent to {email}</p>
                        <Input 
                            label="Enter OTP" 
                            type="text" 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                            placeholder="123456"
                            required 
                        />
                        <Button type="submit" variant="primary" style={{width: '100%'}}>Verify OTP</Button>
                        <p onClick={() => setStep(1)} style={{textAlign:'center', color:'#fbbf24', cursor:'pointer', marginTop:'10px', fontSize:'0.9rem'}}>Back</p>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <p style={{color: '#9ca3af', marginBottom: '20px'}}>Create a new password.</p>
                        <Input 
                            label="New Password" 
                            type="password" 
                            name="newPassword"
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            required 
                        />
                         <Input 
                            label="Confirm Password" 
                            type="password" 
                            name="confirmNewPassword"
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                        <Button type="submit" variant="primary" style={{width: '100%'}}>Reset Password</Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
