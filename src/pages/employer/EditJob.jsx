import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PostJob.module.css';
import RichTextEditor from '../../components/common/RichTextEditor';
import TagInput from '../../components/common/TagInput';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import api from '../../utils/api';
import { useToast } from '../../context/ToastContext';

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [jobData, setJobData] = useState({
        title: '',
        experienceLevel: '',
        type: '', 
        location: '', 
        salaryRange: '', 
        skillsRequired: [],
        description: '',
        status: 'Open'
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const { data } = await api.get(`/jobs/${id}`);
                if (data.success) {
                    const job = data.data;
                    setJobData({
                        title: job.title,
                        experienceLevel: job.experienceLevel || '',
                        type: job.type || '',
                        location: job.location || '',
                        salaryRange: job.salaryRange || '',
                        skillsRequired: job.skillsRequired || [],
                        description: job.description || '',
                        status: job.status || 'Open'
                    });
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                addToast('Failed to load job', 'error');
                navigate('/dashboard/employer/jobs');
            }
        };

        fetchJob();
    }, [id, navigate]);

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
        setSaving(true);

        try {
            await api.put(`/jobs/${id}`, {
                ...jobData
            });

            addToast('Job updated successfully!', 'success');
            navigate('/dashboard/employer/jobs');
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || 'Failed to update job';
            addToast(msg, 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="focused-container" style={{textAlign:'center', padding:'50px'}}>Loading job details...</div>;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h1>Edit Job</h1>
            </div>

            <form className={styles.formGrid} onSubmit={handleSubmit}>
                {/* Row 1 */}
                <Input 
                    label="Job Title"
                    name="title" 
                    value={jobData.title} 
                    onChange={handleChange} 
                    required
                />
                
                {/* Row 2 */}
                <Select 
                    label="Experience"
                    name="experienceLevel" 
                    value={jobData.experienceLevel} 
                    onChange={handleChange}
                    options={["Entry Level", "Intermediate", "Expert"]}
                    required
                />
                <Select 
                    label="Job Type"
                    name="type" 
                    value={jobData.type} 
                    onChange={handleChange}
                    options={["Full-Time", "Part-Time", "Contract", "Freelance", "Internship"]}
                    required
                />

                {/* Row 3 */}
                <Input 
                    label="Location"
                    name="location" 
                    value={jobData.location} 
                    onChange={handleChange} 
                    required
                />
                <Input 
                    label="Salary Range"
                    name="salaryRange" 
                    value={jobData.salaryRange} 
                    onChange={handleChange} 
                    required
                />

                <Select 
                    label="Status"
                    name="status" 
                    value={jobData.status} 
                    onChange={handleChange}
                    options={["Open", "Closed"]}
                    required
                />

                {/* Row 4 */}
                <div className={styles.fullWidth}>
                    <TagInput 
                        label="Skills"
                        tags={jobData.skillsRequired} 
                        onChange={handleSkillsChange} 
                    />
                </div>

                {/* Row 5 */}
                <div className={styles.fullWidth}>
                    <label className={styles.label}>Job Description</label>
                    <RichTextEditor 
                        content={jobData.description} 
                        onChange={handleDescriptionChange} 
                    />
                </div>

                <div className={styles.actions}>
                    <button type="button" className={styles.draftBtn} onClick={() => navigate('/dashboard/employer/jobs')}>Cancel</button>
                    <button type="submit" className={styles.submitBtn} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditJob;
