import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Search, Filter, ArrowUpDown, Trash2, Edit3, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { Modal, Button, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Transactions = () => {
  const { user, token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const currencySymbol = user?.currency === 'USD' ? '$' : 'Rs.';

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    } else {
      fetchTransactions();
    }
  }, [token]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/transactions');
      if (data.success) {
        setTransactions(data.data);
      }
    } catch (err) {
      setError('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    try {
      const { data } = await axios.delete(`/api/transactions/${id}`);
      if (data.success) {
        setTransactions(transactions.filter((t) => t._id !== id));
      }
    } catch (err) {
      setError('Error deleting transaction');
    }
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setShowEditModal(true);
  };

  const handleUpdateTransaction = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/transactions/${editingTransaction._id}`, editingTransaction);
      if (data.success) {
        setTransactions(transactions.map(t => t._id === editingTransaction._id ? data.data : t));
        setShowEditModal(false);
      }
    } catch (err) {
      setError('Error updating transaction');
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || t.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, searchTerm, typeFilter, categoryFilter]);

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Description", "Date", "Category", "Type", "Amount"];
    const tableRows = [];

    filteredTransactions.forEach((t) => {
      const transactionData = [
        t.text,
        new Date(t.date).toLocaleDateString(),
        t.category,
        t.type.charAt(0).toUpperCase() + t.type.slice(1),
        `${currencySymbol} ${Number(t.amount).toLocaleString()}`,
      ];
      tableRows.push(transactionData);
    });

    doc.setFontSize(20);
    doc.text("Full Transaction History", 14, 22);
    doc.setFontSize(11);
    doc.text(`User: ${user?.name}`, 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 36);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] },
    });

    doc.save(`Full_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  if (loading && transactions.length === 0) {
    return <div className="d-flex justify-content-center align-items-center min-vh-100"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />
      <div className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Transaction History</h2>
            <p className="text-muted">Review and manage all your financial activities.</p>
          </div>
          <button onClick={exportPDF} className="btn btn-primary-custom d-flex align-items-center gap-2">
            <FileText size={18} /> Export Current View
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Filters and Search */}
        <div className="card-custom p-4 border-0 mb-4 bg-white shadow-sm">
          <div className="row g-3">
            <div className="col-lg-4 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><Search size={18} className="text-muted" /></span>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="Search descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><Filter size={18} className="text-muted" /></span>
                <select 
                  className="form-select bg-light border-0"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
               <div className="input-group">
                <span className="input-group-text bg-light border-0"><ArrowUpDown size={18} className="text-muted" /></span>
                <select 
                  className="form-select bg-light border-0"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="General">General</option>
                  <option value="Food">Food</option>
                  <option value="Rent">Rent</option>
                  <option value="Travel">Travel</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Salary">Salary</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 d-grid">
               <button className="btn btn-light border text-muted" onClick={() => {setSearchTerm(''); setTypeFilter('all'); setCategoryFilter('all');}}>
                 Reset Filters
               </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="card-custom p-0 border-0 bg-white shadow-sm overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 text-muted small text-uppercase ps-4 py-3">Description</th>
                  <th className="border-0 text-muted small text-uppercase py-3">Date</th>
                  <th className="border-0 text-muted small text-uppercase py-3">Category</th>
                  <th className="border-0 text-muted small text-uppercase py-3">Type</th>
                  <th className="border-0 text-muted small text-uppercase text-end py-3">Amount</th>
                  <th className="border-0 pe-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t._id}>
                    <td className="ps-4 border-bottom">
                      <span className="fw-bold text-dark">{t.text}</span>
                    </td>
                    <td className="text-muted border-bottom small">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="text-muted border-bottom">
                      <span className="badge bg-light text-dark fw-normal rounded-2 px-3 border">{t.category}</span>
                    </td>
                    <td className="border-bottom">
                      <span className={`badge ${t.type === 'income' ? 'bg-success' : 'bg-danger'} bg-opacity-10 ${t.type === 'income' ? 'text-success' : 'text-danger'} rounded-2 px-3`}>
                        {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                      </span>
                    </td>
                    <td className={`text-end fw-bold border-bottom ${t.type === 'income' ? 'text-success' : 'text-dark'}`}>
                      {t.type === 'income' ? '+' : '-'}{currencySymbol} {Number(t.amount).toLocaleString()}
                    </td>
                    <td className="text-end border-bottom pe-4">
                      <div className="d-flex gap-2 justify-content-end">
                        <button className="btn btn-sm btn-light text-primary border rounded-2 p-2" onClick={() => handleEditClick(t)}>
                          <Edit3 size={14} />
                        </button>
                        <button className="btn btn-sm btn-light text-danger border rounded-2 p-2" onClick={() => deleteTransaction(t._id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No transactions matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Placeholder */}
          <div className="p-4 bg-light d-flex justify-content-between align-items-center">
            <span className="text-muted small">Showing {filteredTransactions.length} of {transactions.length} transactions</span>
            <div className="d-flex gap-2">
               <button className="btn btn-sm btn-white border disabled"><ChevronLeft size={16} /></button>
               <button className="btn btn-sm btn-white border disabled"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal (Same as Dashboard) */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Edit Transaction</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateTransaction}>
          <Modal.Body className="pt-4">
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold text-uppercase">Description</Form.Label>
              <Form.Control 
                type="text" 
                value={editingTransaction?.text || ''} 
                onChange={(e) => setEditingTransaction({...editingTransaction, text: e.target.value})}
                required
                className="bg-light border-0 py-2"
              />
            </Form.Group>
            <div className="row">
                <div className="col-6">
                    <Form.Group className="mb-3">
                        <Form.Label className="small text-muted fw-bold text-uppercase">Amount</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={editingTransaction?.amount || ''} 
                            onChange={(e) => setEditingTransaction({...editingTransaction, amount: e.target.value})}
                            required
                            className="bg-light border-0 py-2"
                        />
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="mb-3">
                        <Form.Label className="small text-muted fw-bold text-uppercase">Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            value={editingTransaction?.date ? new Date(editingTransaction.date).toISOString().split('T')[0] : ''} 
                            onChange={(e) => setEditingTransaction({...editingTransaction, date: e.target.value})}
                            required
                            className="bg-light border-0 py-2"
                        />
                    </Form.Group>
                </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold text-uppercase">Category</Form.Label>
              <Form.Select 
                value={editingTransaction?.category || ''} 
                onChange={(e) => setEditingTransaction({...editingTransaction, category: e.target.value})}
                className="bg-light border-0 py-2"
              >
                <option value="General">General</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Travel">Travel</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Salary">Salary</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" className="px-4" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary-custom" type="submit" className="px-4">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Footer />
    </div>
  );
};

export default Transactions;
