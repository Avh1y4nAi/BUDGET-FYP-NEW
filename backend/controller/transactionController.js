const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add transaction
// @route   POST /api/transactions
// @access  Private
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount, type, category, date } = req.body;

    const transaction = await Transaction.create({
      text,
      amount,
      type,
      category, 
      date,
      user: req.user.id
    });

    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Update transaction

// @route   PUT /api/transactions/:id

// @access  Private

exports.updateTransaction = async (req, res, next) => {

  try {

    let transaction = await Transaction.findById(req.params.id);



    if (!transaction) {

      return res.status(404).json({

        success: false,

        error: 'No transaction found'

      });

    }



    // Make sure user owns transaction

    if (transaction.user.toString() !== req.user.id) {

      return res.status(401).json({

        success: false,

        error: 'User not authorized'

      });

    }



    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {

      new: true,

      runValidators: true

    });



    return res.status(200).json({

      success: true,

      data: transaction

    });

  } catch (err) {

    return res.status(500).json({

      success: false,

      error: 'Server Error'

    });

  }

};



// @desc    Delete transaction

// @route   DELETE /api/transactions/:id

// @access  Private

exports.deleteTransaction = async (req, res, next) => {

  try {

    const transaction = await Transaction.findById(req.params.id);



    if (!transaction) {

      return res.status(404).json({

        success: false,

        error: 'No transaction found'

      });

    }



    // Make sure user owns transaction

    if (transaction.user.toString() !== req.user.id) {

      return res.status(401).json({

        success: false,

        error: 'User not authorized'

      });

    }



    await transaction.deleteOne();



    return res.status(200).json({

      success: true,

      data: {}

    });

  } catch (err) {

    return res.status(500).json({

      success: false,

      error: 'Server Error'

    });

  }

};
