import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PostJob.module.css';
import RichTextEditor from '../../components/common/RichTextEditor';
import TagInput from '../../components/common/TagInput';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import api from '../../utils/api';
import { useToast } from '../../context/ToastContext';

const PostJob = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);

    const [jobData, setJobData] = useState({
        title: '',
        experienceLevel: '', 
        type: '', 
        location: '', 
        salaryRange: '', 
        skillsRequired: [], 
        description: '',
        applicationDeadline: '' 
    });

    const handleChange = (e) => {
        setJobData({
            ...jobData,
            [e.target.name]: e.target.value
        });
    };

    const handleSkillsChange = (newSkills) => {
        setJobData({
            ...jobData,
            skillsRequired: newSkills
        });
    };

    const handleDescriptionChange = (htmlContent) => {
        setJobData({
            ...jobData,
            description: htmlContent
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/jobs', {
                title: jobData.title,
                description: jobData.description,
                type: jobData.type,
                location: jobData.location,
                salaryRange: jobData.salaryRange,
                experienceLevel: jobData.experienceLevel,
                skillsRequired: jobData.skillsRequired,
                applicationDeadline: jobData.applicationDeadline, // Send Deadline
                status: 'Open' 
            });

            addToast('Job posted successfully!', 'success');
            navigate('/dashboard/employer/jobs');
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || 'Failed to post job';
            if (msg.includes('create a company')) {
                 addToast('You must create a company profile before posting a job.', 'error');
                 navigate('/dashboard/employer/company');
            } else {
                 addToast(msg, 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h1 className="text-gradient" style={{fontSize: '2rem', margin: 0}}>Post a Job</h1>
            </div>

            <form className={styles.formGrid} onSubmit={handleSubmit}>
                {/* Row 1 */}
                <Input 
                    label="Job Title"
                    name="title" 
                    value={jobData.title} 
                    onChange={handleChange} 
                    placeholder="e.g. Senior Product Designer"
                    required
                />
                
                <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                    <label style={{fontSize:'0.9rem', color:'#d1d5db', fontWeight:'500'}}>Application Deadline</label>
                    <input 
                        type="date"
                        name="applicationDeadline"
                        value={jobData.applicationDeadline}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                        style={{
                            padding: '10px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            color: 'white',
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Row 2 */}
                <Select 
                    label="Experience"
                    name="experienceLevel" 
                    value={jobData.experienceLevel} 
                    onChange={handleChange}
                    placeholder="Enter Experience Level"
                    options={["Entry Level", "Intermediate", "Expert"]}
                    required
                />
                <Select 
                    label="Job Type"
                    name="type" 
                    value={jobData.type} 
                    onChange={handleChange}
                    placeholder="Enter Job Type"
                    options={["Full-Time", "Part-Time", "Contract", "Freelance", "Internship"]}
                    required
                />

                {/* Row 3 */}
                <Input 
                    label="Location"
                    name="location" 
                    value={jobData.location} 
                    onChange={handleChange} 
                    placeholder="e.g. New York, Remote"
                    required
                />
                <Input 
                    label="Salary Range"
                    name="salaryRange" 
                    value={jobData.salaryRange} 
                    onChange={handleChange} 
                    placeholder="e.g. $100k - $120k"
                    required
                />

                {/* Row 4 */}
                <div className={styles.fullWidth}>
                    <TagInput 
                        label="Skills"
                        tags={jobData.skillsRequired} 
                        onChange={handleSkillsChange} 
                        placeholder="Add skill + Enter"
                    />
                </div>

                {/* Row 5 */}
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Job Description</label>
                    <RichTextEditor 
                        content={jobData.description} 
                        onChange={handleDescriptionChange} 
                        placeholder="Write detailed job description..."
                    />
                </div>

                <div className={styles.actions}>
                    {/* Draft functionality not in Phase 2 scope, sticking to Publish */}
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Publishing...' : 'Publish Job'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostJob;
