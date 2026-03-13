import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/transactions', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                
                if (data) {
                    // If backend returns data in a specific format, adjust here
                    const transData = Array.isArray(data) ? data : (data.data || []);
                    setTransactions(transData);

                    const income = transData
                        .filter(t => t.type === 'income')
                        .reduce((acc, t) => acc + t.amount, 0);
                    const expense = transData
                        .filter(t => t.type === 'expense')
                        .reduce((acc, t) => acc + t.amount, 0);

                    setSummary({
                        totalIncome: income,
                        totalExpense: expense,
                        balance: income - expense
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <h2>My Budget Dashboard</h2>

            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card bg-success text-white p-3">
                        <h5>Total Income</h5>
                        <h3>${summary.totalIncome}</h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-danger text-white p-3">
                        <h5>Total Expenses</h5>
                        <h3>${summary.totalExpense}</h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-primary text-white p-3">
                        <h5>Total Balance</h5>
                        <h3>${summary.balance}</h3>
                    </div>
                </div>
            </div>

            <h4 className="mt-5">Recent Transactions</h4>
            <div className="list-group mt-3">
                {transactions.map((t, index) => (
                    <div key={t._id || index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{t.text}</span>
                        <span className={t.type === 'income' ? 'text-success' : 'text-danger'}>
                            {t.type === 'income' ? '+' : '-'}${t.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
