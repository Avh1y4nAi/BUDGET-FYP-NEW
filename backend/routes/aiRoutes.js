const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const Goal = require("../models/Goal");
const { protect } = require("../middleware/authMiddleware");

// @desc    Get AI insights for user transactions and goals
// @route   POST /api/ai/insights
// @access  Private
router.post("/insights", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    const goals = await Goal.find({ user: req.user.id });

    if (transactions.length === 0) {
      return res.json({ 
        success: true, 
        insight: "Welcome to Budgeter! Add some transactions to get personalized AI financial insights and tips. Tracking your spending is the first step to wealth." 
      });
    }

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

    let insight = "";
    if (savingsRate > 30) {
      insight = `Excellent! Your savings rate is ${savingsRate.toFixed(1)}%. You are in the top tier of financial health. `;
    } else if (savingsRate > 20) {
      insight = `Great job! Your savings rate is ${savingsRate.toFixed(1)}%. You're on track to build significant wealth. `;
    } else if (savingsRate > 0) {
      insight = `You're saving ${savingsRate.toFixed(1)}% of your income. Aim for 20% by identifying non-essential expenses. `;
    } else {
      insight = "Your expenses exceed your income. This is a critical situation. Focus on reducing fixed costs and cutting all discretionary spending immediately. ";
    }

    // Add category specific insight
    const categories = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
    });

    const topCategory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b, "");
    if (topCategory && categories[topCategory] > (totalExpense * 0.4)) {
        insight += `Your '${topCategory}' spending is ${((categories[topCategory]/totalExpense)*100).toFixed(0)}% of total expenses. This is quite high; look for ways to optimize costs here. `;
    } else if (topCategory) {
        insight += `Your highest spending is in '${topCategory}'. Keep an eye on it. `;
    }

    // Goal tracking insight
    if (goals.length > 0) {
        const activeGoals = goals.filter(g => g.currentAmount < g.targetAmount);
        if (activeGoals.length > 0) {
            const nearestGoal = activeGoals[0];
            const percent = (nearestGoal.currentAmount / nearestGoal.targetAmount) * 100;
            insight += `You are ${percent.toFixed(0)}% of the way to your '${nearestGoal.title}' goal. Keep going! `;
        }
    } else {
        insight += "Consider setting a savings goal to stay motivated and track your progress towards big purchases.";
    }

    res.json({ success: true, insight });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;