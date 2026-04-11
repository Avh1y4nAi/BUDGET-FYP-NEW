import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, BarChart, Bar 
} from 'recharts';
import { Plus, Trash2, Edit3, Download, TrendingUp, Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { Modal, Button, Form } from 'react-bootstrap';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Dashboard() {
  const { user, token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ text: "", amount: "", type: "expense", category: "General", date: new Date().toISOString().split('T')[0] });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
       navigate("/login");
    } else {
      fetchTransactions();
    }
  }, [token, navigate]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/transactions');
      if (data.success) {
        setTransactions(data.data);
      }
    } catch (err) {
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/transactions', formData);
      if (data.success) {
        setTransactions([data.data, ...transactions]);
        setFormData({ text: "", amount: "", type: "expense", category: "General", date: new Date().toISOString().split('T')[0] });
      }
    } catch (err) {
      setError("Error adding transaction");
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const { data } = await axios.delete(`/api/transactions/${id}`);
      if (data.success) {
        setTransactions(transactions.filter((t) => t._id !== id));
      }
    } catch (err) {
      setError("Error deleting transaction");
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
      setError("Error updating transaction");
    }
  };

  // Calculations
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = totalIncome - totalExpense;

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Description", "Date", "Category", "Type", "Amount"];
    const tableRows = [];

    transactions.forEach((t) => {
      const transactionData = [
        t.text,
        new Date(t.date).toLocaleDateString(),
        t.category,
        t.type.charAt(0).toUpperCase() + t.type.slice(1),
        `Rs. ${Number(t.amount).toLocaleString()}`,
      ];
      tableRows.push(transactionData);
    });

    // Add title and summary
    doc.setFontSize(20);
    doc.text("Financial Report", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`User: ${user?.name}`, 14, 30);
    doc.text(`Date Generated: ${new Date().toLocaleString()}`, 14, 36);
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Total Balance: Rs. ${balance.toLocaleString()}`, 14, 48);
    doc.text(`Total Income: Rs. ${totalIncome.toLocaleString()}`, 14, 54);
    doc.text(`Total Expenses: Rs. ${totalExpense.toLocaleString()}`, 14, 60);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 70,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] }, // Emerald-500 color from your UI
    });

    doc.save(`Financial_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Chart Data Preparation
  const chartData = useMemo(() => {
    const dailyData = {};
    [...transactions].reverse().forEach(t => {
      const date = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!dailyData[date]) dailyData[date] = { date, income: 0, expense: 0 };
      if (t.type === 'income') dailyData[date].income += Number(t.amount);
      else dailyData[date].expense += Number(t.amount);
    });
    return Object.values(dailyData);
  }, [transactions]);

  const categoryData = useMemo(() => {
    const cats = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      if (!cats[t.category]) cats[t.category] = 0;
      cats[t.category] += Number(t.amount);
    });
    return Object.keys(cats).map(name => ({ name, value: cats[name] }));
  }, [transactions]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  if (loading && transactions.length === 0) {
      return <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border text-primary" role="status"></div>
      </div>
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <div className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Dashboard</h2>
            <p className="text-muted">Welcome back, {user?.name}! <Link to="/settings" className="text-primary text-decoration-none fw-bold small">Manage Settings</Link></p>
          </div>
          <button onClick={exportPDF} className="btn btn-primary-custom d-flex align-items-center gap-2">
            <Download size={18} /> Export Report
          </button>
        </div>

        {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>}

        {/* Summary Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card-custom p-4 border-0 h-100 bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <p className="text-muted text-uppercase small fw-bold mb-1">Total Balance</p>
                  <h3 className="fw-bold mb-0">Rs. {balance.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-primary bg-opacity-10 rounded-3 text-primary">
                  <Wallet size={24} />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <span className="badge bg-success bg-opacity-10 text-success rounded-2 px-2 py-1 me-2">
                  <TrendingUp size={12} className="me-1" /> 2.5%
                </span>
                <span className="text-muted small">from last month</span>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card-custom p-4 border-0 h-100 bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <p className="text-muted text-uppercase small fw-bold mb-1">Total Income</p>
                  <h3 className="fw-bold text-success mb-0">+Rs. {totalIncome.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-success bg-opacity-10 rounded-3 text-success">
                  <ArrowUpCircle size={24} />
                </div>
              </div>
               <div className="d-flex align-items-center">
                <span className="text-muted small">Real-time update</span>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-custom p-4 border-0 h-100 bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <p className="text-muted text-uppercase small fw-bold mb-1">Total Expenses</p>
                  <h3 className="fw-bold text-danger mb-0">-Rs. {totalExpense.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-danger bg-opacity-10 rounded-3 text-danger">
                  <ArrowDownCircle size={24} />
                </div>
              </div>
               <div className="d-flex align-items-center">
                <span className="badge bg-danger bg-opacity-10 text-danger rounded-2 px-2 py-1 me-2">
                  1.2%
                </span>
                <span className="text-muted small">spending increase</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          {/* Trends Chart */}
          <div className="col-lg-8">
            <div className="card-custom p-4 border-0 h-100 bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Financial Trends</h5>
                <div className="badge bg-light text-primary border px-3 py-2 rounded-2">Real-time</div>
              </div>
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} dy={10} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quick Add Form */}
          <div className="col-lg-4">
            <div className="card-custom p-4 border-0 h-100 bg-white shadow-sm">
              <h5 className="fw-bold mb-4">Add Transaction</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small text-muted fw-bold text-uppercase">Description</label>
                  <input
                    type="text"
                    className="form-control bg-light border-0 py-2"
                    placeholder="e.g. Starbucks"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-6">
                        <label className="form-label small text-muted fw-bold text-uppercase">Amount</label>
                        <input
                            type="number"
                            className="form-control bg-light border-0 py-2"
                            placeholder="0.00"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-6">
                        <label className="form-label small text-muted fw-bold text-uppercase">Date</label>
                        <input
                            type="date"
                            className="form-control bg-light border-0 py-2"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                 <div className="mb-3">
                  <label className="form-label small text-muted fw-bold text-uppercase">Category</label>
                  <select 
                    className="form-select bg-light border-0 py-2"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="General">General</option>
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Travel">Travel</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Salary">Salary</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label small text-muted fw-bold text-uppercase">Type</label>
                  <div className="d-flex gap-2">
                    <div className="form-check flex-fill p-0">
                      <input
                        type="radio"
                        className="btn-check"
                        name="type"
                        id="type-income"
                        value="income"
                        checked={formData.type === "income"}
                        onChange={handleInputChange}
                      />
                      <label className="btn btn-outline-success w-100 py-2" htmlFor="type-income">Income</label>
                    </div>
                    <div className="form-check flex-fill p-0">
                      <input
                        type="radio"
                        className="btn-check"
                        name="type"
                        id="type-expense"
                        value="expense"
                        checked={formData.type === "expense"}
                        onChange={handleInputChange}
                      />
                      <label className="btn btn-outline-danger w-100 py-2" htmlFor="type-expense">Expense</label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary-custom w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                  <Plus size={20} /> Add Transaction
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="row g-4">
           {/* Recent Transactions */}
           <div className="col-lg-8">
            <div className="card-custom p-4 border-0 bg-white shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Recent Transactions</h5>
                <button className="btn btn-link text-accent text-decoration-none small fw-bold p-0">View All</button>
              </div>
              
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 text-muted small text-uppercase ps-3 py-3">Description</th>
                      <th className="border-0 text-muted small text-uppercase py-3">Date</th>
                      <th className="border-0 text-muted small text-uppercase py-3">Category</th>
                      <th className="border-0 text-muted small text-uppercase py-3">Type</th>
                      <th className="border-0 text-muted small text-uppercase text-end py-3">Amount</th>
                      <th className="border-0 pe-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => (
                      <tr key={t._id}>
                        <td className="ps-3 border-bottom-0">
                          <span className="fw-bold text-dark">{t.text}</span>
                        </td>
                        <td className="text-muted border-bottom-0 small">{new Date(t.date).toLocaleDateString()}</td>
                         <td className="text-muted border-bottom-0">
                            <span className="badge bg-light text-dark fw-normal rounded-2 px-3 border">{t.category}</span>
                         </td>
                        <td className="border-bottom-0">
                          <span className={`badge ${t.type === 'income' ? 'bg-success' : 'bg-danger'} bg-opacity-10 ${t.type === 'income' ? 'text-success' : 'text-danger'} rounded-2 px-3`}>
                            {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                          </span>
                        </td>
                        <td className={`text-end fw-bold border-bottom-0 ${t.type === 'income' ? 'text-success' : 'text-dark'}`}>
                          {t.type === 'income' ? '+' : '-'}Rs. {Number(t.amount).toLocaleString()}
                        </td>
                         <td className="text-end border-bottom-0 pe-3">
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
                    {transactions.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-5 text-muted">
                          <div className="mb-3">No transactions found</div>
                          <button className="btn btn-outline-primary btn-sm" onClick={() => document.getElementsByName('text')[0].focus()}>
                              Add your first transaction
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
           </div>

           {/* Stats Sidebar */}
           <div className="col-lg-4">
              <div className="row g-4">
                  <div className="col-12">
                      <div className="card-custom p-4 border-0 bg-white shadow-sm">
                          <h5 className="fw-bold mb-4">Income vs Expenses</h5>
                          <div style={{ width: '100%', height: 200 }}>
                              <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={[
                                      { name: 'Income', amount: totalIncome, fill: '#10b981' },
                                      { name: 'Expense', amount: totalExpense, fill: '#ef4444' }
                                  ]}>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                      <YAxis axisLine={false} tickLine={false} hide />
                                      <Tooltip cursor={{fill: 'transparent'}} />
                                      <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                                          {
                                              [
                                                  { name: 'Income', amount: totalIncome, fill: '#10b981' },
                                                  { name: 'Expense', amount: totalExpense, fill: '#ef4444' }
                                              ].map((entry, index) => (
                                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                                              ))
                                          }
                                      </Bar>
                                  </BarChart>
                              </ResponsiveContainer>
                          </div>
                      </div>
                  </div>
                  <div className="col-12">
                      <div className="card-custom p-4 border-0 bg-white shadow-sm">
                          <h5 className="fw-bold mb-4">Spending by Category</h5>
                          <div style={{ width: '100%', height: 200 }}>
                              <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                      <Pie
                                          data={categoryData}
                                          cx="50%"
                                          cy="50%"
                                          innerRadius={50}
                                          outerRadius={70}
                                          paddingAngle={5}
                                          dataKey="value"
                                      >
                                          {categoryData.map((entry, index) => (
                                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                          ))}
                                      </Pie>
                                      <Tooltip />
                                  </PieChart>
                              </ResponsiveContainer>
                          </div>
                          <div className="mt-3">
                              {categoryData.slice(0, 3).map((cat, index) => (
                                  <div key={cat.name} className="d-flex justify-content-between align-items-center mb-2">
                                      <div className="d-flex align-items-center">
                                          <div className="rounded-circle me-2" style={{width: 8, height: 8, backgroundColor: COLORS[index % COLORS.length]}}></div>
                                          <span className="text-muted small">{cat.name}</span>
                                      </div>
                                      <span className="fw-bold small">Rs. {cat.value.toLocaleString()}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
      
      {/* Edit Modal */}
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
}

export default Dashboard;
