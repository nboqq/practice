import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// @route   GET /api/balance
// @desc    Get user balance
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      balance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/balance/topup
// @desc    Top up user balance
// @access  Private
router.post('/topup', protect, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    const user = await User.findById(req.user.id);
    user.balance += amount;

    await user.save();

    res.status(200).json({
      success: true,
      message: `Balance topped up by ${amount}`,
      balance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
