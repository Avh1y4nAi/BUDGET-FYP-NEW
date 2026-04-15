import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { User, Mail, Shield, Camera, Moon, Sun } from 'lucide-react';

const Profile = () => {
  const { user, updateUserInfo, theme, toggleTheme } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(user?.profilePic || '');
  const [monthlyBudget, setMonthlyBudget] = useState(user?.monthlyBudget || 50000);
  const [currency, setCurrency] = useState(user?.currency || 'NPR');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
        window.location.href = '/login';
    }
  }, [user]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    setError(null);
    setMessage(null);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/auth/profile/upload', formData, config);
      setProfilePic(data.profilePic);
      updateUserInfo(data);
      setUploading(false);
      setMessage('Profile picture updated successfully');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Upload failed');
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.put('/api/auth/profile', {
        name,
        email,
        password,
        profilePic,
        theme,
        monthlyBudget,
        currency
      });
      updateUserInfo(data);
      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-custom p-4 border-0 bg-white shadow-sm">
              <h2 className="fw-bold mb-4">User Settings</h2>
              
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="d-flex align-items-center mb-5 p-3 bg-light rounded-3">
                <div className="position-relative">
                  <img
                    src={profilePic || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="rounded-circle object-fit-cover"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <label htmlFor="image-upload" className="position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle cursor-pointer" style={{ cursor: 'pointer' }}>
                    <Camera size={16} />
                    <input
                      type="file"
                      id="image-upload"
                      className="d-none"
                      onChange={uploadFileHandler}
                    />
                  </label>
                </div>
                <div className="ms-4">
                  <h4 className="fw-bold mb-1">{user?.name}</h4>
                  <p className="text-muted mb-0">{user?.email}</p>
                  {uploading && <div className="spinner-border spinner-border-sm text-primary mt-2" role="status"></div>}
                </div>
              </div>

              <form onSubmit={submitHandler}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label small text-muted fw-bold text-uppercase">Full Name</label>
                    <div className="input-group shadow-sm">
                      <span className="input-group-text bg-white border-end-0"><User size={18} className="text-muted" /></span>
                      <input
                        type="text"
                        className="form-control border-start-0 ps-0"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted fw-bold text-uppercase">Email Address</label>
                    <div className="input-group shadow-sm">
                      <span className="input-group-text bg-white border-end-0"><Mail size={18} className="text-muted" /></span>
                      <input
                        type="email"
                        className="form-control border-start-0 ps-0"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted fw-bold text-uppercase">New Password</label>
                    <div className="input-group shadow-sm">
                      <span className="input-group-text bg-white border-end-0"><Shield size={18} className="text-muted" /></span>
                      <input
                        type="password"
                        className="form-control border-start-0 ps-0"
                        placeholder="Leave blank to keep current"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted fw-bold text-uppercase">Confirm Password</label>
                    <div className="input-group shadow-sm">
                      <span className="input-group-text bg-white border-end-0"><Shield size={18} className="text-muted" /></span>
                      <input
                        type="password"
                        className="form-control border-start-0 ps-0"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted fw-bold text-uppercase">Monthly Budget Goal ({currency === 'NPR' ? 'Rs.' : '$'})</label>
                    <div className="input-group shadow-sm">
                      <span className="input-group-text bg-white border-end-0">{currency === 'NPR' ? 'Rs.' : '$'}</span>
                      <input
                        type="number"
                        className="form-control border-start-0 ps-0"
                        value={monthlyBudget}
                        onChange={(e) => setMonthlyBudget(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-5" />

                <div className="mb-4">
                  <h5 className="fw-bold mb-3">Preferences</h5>
                  
                  {/* Currency Selection */}
                  <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 mb-3 border">
                    <div className="d-flex align-items-center">
                      <div className="bg-white p-2 rounded-circle me-3 text-success shadow-sm">
                        <span className="fw-bold fs-5">{currency === 'NPR' ? 'रु' : '$'}</span>
                      </div>
                      <div>
                        <p className="fw-bold mb-0">Currency Settings</p>
                        <p className="text-muted small mb-0">Choose your preferred currency (NPR or USD)</p>
                      </div>
                    </div>
                    <div>
                      <select 
                        className="form-select border-0 bg-white shadow-sm fw-medium px-4" 
                        value={currency} 
                        onChange={(e) => setCurrency(e.target.value)}
                        style={{minWidth: '120px'}}
                      >
                        <option value="NPR">🇳🇵 NPR</option>
                        <option value="USD">🇺🇸 USD</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 border">
                    <div className="d-flex align-items-center">
                      {theme === 'light' ? 
                        <div className="bg-white p-2 rounded-circle me-3 text-warning shadow-sm"><Sun size={20} /></div> : 
                        <div className="bg-white p-2 rounded-circle me-3 text-primary shadow-sm"><Moon size={20} /></div>
                      }
                      <div>
                        <p className="fw-bold mb-0">Theme Mode</p>
                        <p className="text-muted small mb-0">Switch between light and dark mode</p>
                      </div>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="themeSwitch"
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        style={{ width: '3rem', height: '1.5rem' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-5">
                   <button type="submit" className="btn btn-dark btn-lg px-5 py-2 rounded-3 shadow-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
