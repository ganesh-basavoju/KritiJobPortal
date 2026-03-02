import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../utils/api';
import styles from './Subscription.module.css';

const Subscription = () => {
    const { user } = useContext(AuthContext);
    const { addToast } = useToast();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (!user || user.role !== 'candidate') {
            navigate('/dashboard');
        } else {
            fetchStatus();
        }
    }, [user, navigate]);

    const fetchStatus = async () => {
        try {
            const { data } = await api.get('/subscriptions/status');
            if (data.success) {
                setStatus(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch subscription status', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpgrade = async () => {
        setProcessing(true);
        try {
            // 1. Create order
            const { data: orderData } = await api.post('/subscriptions/create-order');
            
            if (!orderData.success) throw new Error(orderData.message);

            const { orderId, amount, currency, razorpayKeyId } = orderData.data;

            // 2. Initialize Razorpay Checkout
            const options = {
                key: razorpayKeyId,
                amount: amount,
                currency: currency,
                name: "JobConnect",
                description: "Premium Candidate Subscription",
                order_id: orderId,
                handler: async function (response) {
                    // 3. Verify Payment
                    try {
                        const { data: verifyData } = await api.post('/subscriptions/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyData.success) {
                            addToast('Subscription upgraded successfully!', 'success');
                            fetchStatus(); // Refresh status
                        } else {
                            addToast('Payment verification failed', 'error');
                        }
                    } catch (error) {
                        console.error(error);
                        addToast('Error verifying payment', 'error');
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: "#0ea5e9"
                }
            };

            const rzp = new window.Razorpay(options);
            
            rzp.on('payment.failed', function (response) {
                addToast('Payment failed: ' + response.error.description, 'error');
            });

            rzp.open();

        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || err.message || 'Failed to initiate checkout';
            addToast(msg, 'error');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Plan Details...</div>;

    const isPremium = status?.isPremium;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerRow}>
                <h1 className={styles.title}>Supercharge Your Job Search</h1>
                <p className={styles.subtitle}>Choose the plan that fits your career goals.</p>
            </div>

            {/* Current Status Widget */}
            <div className={styles.statusCard}>
                <div className={styles.statusInfo}>
                    <h3>Current Plan: {isPremium ? 'Premium' : 'Free'}</h3>
                    {isPremium ? (
                        <p>Your subscription is active until {new Date(status.subscriptionExpiresAt).toLocaleDateString()}</p>
                    ) : (
                        <p>You are on the free tier. Upgrade for unlimited applications!</p>
                    )}
                </div>
                <div className={styles.usageStats}>
                    <span className={styles.usageCount}>
                        {status?.currentMonthApplications || 0} / {status?.applicationLimit}
                    </span>
                    <br />
                    <span className={styles.usageLabel}>Applications Used This Month</span>
                </div>
            </div>

            <div className={styles.pricingGrid}>
                {/* Free Plan */}
                <div className={styles.pricingCard}>
                    <h2 className={styles.planName}>Basic Free</h2>
                    <h3 className={styles.planPrice}>₹0 <span>/ month</span></h3>
                    <ul className={styles.planFeatures}>
                        <li><i className="fas fa-check"></i> Profile Creation</li>
                        <li><i className="fas fa-check"></i> Basic Job Search</li>
                        <li><i className="fas fa-check"></i> Up to 10 Applications / month</li>
                    </ul>
                    <button 
                        className={styles.actionBtn} 
                        disabled={true}
                    >
                        {isPremium ? 'N/A' : 'Current Plan'}
                    </button>
                </div>

                {/* Premium Plan */}
                <div className={`${styles.pricingCard} ${styles.premium}`}>
                    <div className={styles.popularBadge}>Most Popular</div>
                    <h2 className={styles.planName}>Premium Plus</h2>
                    <h3 className={styles.planPrice}>₹499 <span>/ month</span></h3>
                    <ul className={styles.planFeatures}>
                        <li><i className="fas fa-check"></i> Everything in Basic</li>
                        <li><i className="fas fa-star"></i> <strong>Unlimited</strong> Applications</li>
                        <li><i className="fas fa-star"></i> Priority Support</li>
                        <li><i className="fas fa-star"></i> Profile Highlighted to Employers</li>
                    </ul>
                    <button 
                        className={`${styles.actionBtn} ${styles.primary}`} 
                        onClick={handleUpgrade}
                        disabled={processing || isPremium}
                    >
                        {processing ? 'Processing...' : (isPremium ? 'Currently Active' : 'Upgrade Now')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
