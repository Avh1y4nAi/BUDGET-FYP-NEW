import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Users, Mail, CreditCard, BarChart3, ShieldAlert, Trash2, ShieldCheck, ShieldX } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("stats");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/dashboard");
      return;
    }

    fetchAdminData();
  }, [user, navigate]);

  const fetchAdminData = async () => {
    try {
      const [statsRes, contactsRes, usersRes] = await Promise.all([
        axios.get("/api/admin/stats"),
        axios.get("/api/admin/contacts"),
        axios.get("/api/admin/users")
      ]);
      setStats(statsRes.data);
      setContacts(contactsRes.data);
      setUsers(usersRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admin data", error);
      setError("Failed to load admin data");
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (id === user.id) {
        alert("You cannot delete yourself!");
        return;
    }
    if (!window.confirm("Are you sure you want to permanently delete this user and all their data?")) return;
    
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      // Refresh stats
      const statsRes = await axios.get("/api/admin/stats");
      setStats(statsRes.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`/api/admin/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
      // Refresh stats
      const statsRes = await axios.get("/api/admin/stats");
      setStats(statsRes.data);
    } catch (err) {
      alert("Failed to delete message");
    }
  };

  if (loading) return <div className="text-center py-5">Loading Admin Panel...</div>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container py-5 flex-grow-1">
        <div className="d-flex align-items-center gap-3 mb-5">
          <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-3">
            <ShieldAlert size={32} />
          </div>
          <div>
            <h1 className="fw-bold mb-0">Admin Control Panel</h1>
            <p className="text-muted mb-0">Manage users and platform activity</p>
          </div>
        </div>

        {error && <div className="alert alert-danger mb-4">{error}</div>}

        {/* Tab Navigation */}
        <div className="nav nav-pills mb-4 gap-2">
          <button 
            className={`nav-link px-4 py-2 rounded-3 ${activeTab === 'stats' ? 'active bg-dark' : 'bg-light text-dark'}`}
            onClick={() => setActiveTab('stats')}
          >
            <BarChart3 size={18} className="me-2" /> Overview
          </button>
          <button 
            className={`nav-link px-4 py-2 rounded-3 ${activeTab === 'users' ? 'active bg-dark' : 'bg-light text-dark'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={18} className="me-2" /> Users
          </button>
          <button 
            className={`nav-link px-4 py-2 rounded-3 ${activeTab === 'contacts' ? 'active bg-dark' : 'bg-light text-dark'}`}
            onClick={() => setActiveTab('contacts')}
          >
            <Mail size={18} className="me-2" /> Contact Messages
          </button>
        </div>

        {activeTab === 'stats' && stats && (
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                <div className="text-primary mb-3"><Users size={24} /></div>
                <h6 className="text-muted mb-1">Total Users</h6>
                <h3 className="fw-bold mb-0">{stats.userCount}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                <div className="text-success mb-3"><CreditCard size={24} /></div>
                <h6 className="text-muted mb-1">Total Transactions</h6>
                <h3 className="fw-bold mb-0">{stats.transactionCount}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                <div className="text-warning mb-3"><BarChart3 size={24} /></div>
                <h6 className="text-muted mb-1">Total Volume</h6>
                <h3 className="fw-bold mb-0">${stats.totalVolume.toLocaleString()}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                <div className="text-info mb-3"><Mail size={24} /></div>
                <h6 className="text-muted mb-1">Inquiries</h6>
                <h3 className="fw-bold mb-0">{stats.contactCount}</h3>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3 border-0">Name</th>
                    <th className="px-4 py-3 border-0">Email</th>
                    <th className="px-4 py-3 border-0">Joined Date</th>
                    <th className="px-4 py-3 border-0">Role</th>
                    <th className="px-4 py-3 border-0 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id}>
                      <td className="px-4 py-3 fw-medium">{u.name}</td>
                      <td className="px-4 py-3 text-muted">{u.email}</td>
                      <td className="px-4 py-3 text-muted">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`badge rounded-pill ${u.isAdmin ? 'bg-danger' : 'bg-primary'}`}>
                          {u.isAdmin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <div className="d-flex gap-2 justify-content-end">
                            <button 
                                className="btn btn-sm btn-light text-danger border rounded-2"
                                onClick={() => deleteUser(u._id)}
                                title="Delete User"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="row g-4">
            {contacts.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No contact messages yet.</p>
              </div>
            ) : (
              contacts.map(c => (
                <div className="col-md-6" key={c._id}>
                  <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="fw-bold mb-0 text-truncate pe-3">{c.subject || "No Subject"}</h5>
                      <div className="d-flex align-items-center gap-2">
                        <small className="text-muted">{new Date(c.createdAt).toLocaleDateString()}</small>
                        <button 
                            className="btn btn-sm btn-light text-danger border-0 p-1"
                            onClick={() => deleteContact(c._id)}
                        >
                            <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-muted mb-3 italic">"{c.message}"</p>
                    <div className="mt-auto pt-3 border-top">
                      <p className="mb-0 fw-bold">{c.name}</p>
                      <p className="mb-0 small text-muted">{c.email}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
