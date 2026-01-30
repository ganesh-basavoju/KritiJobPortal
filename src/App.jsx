import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import DashboardLayout from './components/layout/DashboardLayout';
import CompanyProfile from './pages/employer/CompanyProfile';
import PostJob from './pages/employer/PostJob';
import EditJob from './pages/employer/EditJob';
import ApplicantList from './pages/employer/ApplicantList';
import JobListing from './pages/jobs/JobListing';
import MyJobs from './pages/employer/MyJobs';
import JobDetails from './pages/jobs/JobDetails';
import CompanyListing from './pages/companies/CompanyListing';
import CompanyDetails from './pages/companies/CompanyDetails';
import CandidateProfile from './pages/candidate/CandidateProfile';
import MyApplications from './pages/candidate/MyApplications';
import SavedJobs from './pages/candidate/SavedJobs';
import ResumeManager from './pages/candidate/ResumeManager';
import About from './pages/About';
import FindTalent from './pages/employer/FindTalent';
import CandidateDetails from './pages/employer/CandidateDetails';
import NotFound from './pages/NotFound';

import AdminAuthGuard from './components/auth/AdminAuthGuard';
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers from './pages/admin/AdminUsers';
import AdminJobs from './pages/admin/AdminJobs';
import AdminPostJob from './pages/admin/AdminPostJob';
import AdminContent from './pages/admin/AdminContent';
import AdminReports from './pages/admin/AdminReports';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <SocketProvider>
          <Router>
            <div className="app">
               <Navbar />
               <Routes>

                 <Route path="/" element={<Home />} />
                 <Route path="/about" element={<About />} />
                 <Route path="/jobs" element={<JobListing />} />
                 <Route path="/jobs/:id" element={<JobDetails />} />
                 <Route path="/companies" element={<CompanyListing />} />
                 <Route path="/company/:id" element={<CompanyDetails />} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/signup" element={<Signup />} />
                 
                 <Route path="/dashboard" element={<DashboardLayout />}>
                    {/* Employer Routes */}
                    
                    <Route path="employer/company" element={<CompanyProfile />} />
                    <Route path="employer/jobs" element={<MyJobs />} />
                    <Route path="employer/post-job" element={<PostJob />} />
                    <Route path="employer/jobs/edit/:id" element={<EditJob />} />
                    <Route path="employer/applicants" element={<ApplicantList />} />
                    <Route path="employer/jobs/:jobId/applicants" element={<ApplicantList />} />
                    <Route path="employer/find-talent" element={<FindTalent />} />
                    <Route path="employer/candidate/:id" element={<CandidateDetails />} />
                    
                    {/* Admin Routes */}
                    <Route path="admin" element={<AdminAuthGuard />}>
                        <Route path="overview" element={<AdminOverview />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="jobs" element={<AdminJobs />} />
                        <Route path="post-job" element={<AdminPostJob />} />
                        <Route path="content" element={<AdminContent />} />
                        <Route path="reports" element={<AdminReports />} />
                    </Route>

                    {/* Candidate Routes */}
                    <Route path="candidate/profile" element={<CandidateProfile />} />
                    <Route path="candidate/savedjobs" element={<SavedJobs />} />
                    <Route path="candidate/applications" element={<MyApplications />} />
                    <Route path="candidate/resume" element={<ResumeManager />} />
                    
                    <Route index element={<div className="container" style={{paddingTop: '30px', color: 'white', textAlign: 'center'}}><h2>Welcome to your Dashboard</h2><p style={{color: '#aaa'}}>Select an option from the sidebar to get started.</p></div>} />
                 </Route>
       

          <Route path="*" element={<NotFound />} />
        </Routes>
            </div>
          </Router>
        </SocketProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
