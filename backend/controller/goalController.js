const Goal = require("../models/Goal");

// @desc    Get all user goals
// @route   GET /api/goals
// @access  Private
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: goals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new goal
// @route   POST /api/goals
// @access  Private
exports.createGoal = async (req, res) => {
  try {
    const { title, targetAmount, currentAmount, category, targetDate } = req.body;

    if (!title || !targetAmount) {
      return res.status(400).json({ success: false, message: "Please provide title and target amount." });
    }

    const goal = new Goal({
      title,
      targetAmount,
      currentAmount: currentAmount || 0,
      category: category || "General",
      targetDate,
      user: req.user.id
    });

    await goal.save();
    res.status(201).json({ success: true, data: goal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a goal
// @route   PUT /api/goals/:id
// @access  Private
exports.updateGoal = async (req, res) => {
  try {
    const { title, targetAmount, currentAmount, category, targetDate } = req.body;
    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ success: false, message: "Goal not found" });
    }

    if (goal.user.toString() !== req.user.id) {
        return res.status(401).json({ success: false, message: "Not authorized" });
    }

    goal.title = title || goal.title;
    goal.targetAmount = targetAmount || goal.targetAmount;
    goal.currentAmount = currentAmount !== undefined ? currentAmount : goal.currentAmount;
    goal.category = category || goal.category;
    goal.targetDate = targetDate || goal.targetDate;

    await goal.save();
    res.json({ success: true, data: goal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
// @access  Private
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ success: false, message: "Goal not found" });
    }

    if (goal.user.toString() !== req.user.id) {
        return res.status(401).json({ success: false, message: "Not authorized" });
    }

    await goal.deleteOne();
    res.json({ success: true, message: "Goal deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
