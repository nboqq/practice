import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', protect, async (req, res) => {
  try {
    const { productId, name, description, price, priceNum, image } = req.body;

    const user = await User.findById(req.user.id);

    // Check if item already exists in cart
    const existingItem = user.cart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      user.cart.push({
        productId,
        name,
        description,
        price,
        priceNum,
        image,
        qty: 1,
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/cart
// @desc    Get user cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      cart: user.cart,
      total: user.cart.reduce((sum, item) => sum + item.priceNum * item.qty, 0),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/cart/remove
// @desc    Remove item from cart
// @access  Private
router.post('/remove', protect, async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter((item) => item.productId !== productId);

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/cart/update-qty
// @desc    Update item quantity in cart
// @access  Private
router.post('/update-qty', protect, async (req, res) => {
  try {
    const { productId, qty } = req.body;

    if (qty < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const user = await User.findById(req.user.id);
    const item = user.cart.find((item) => item.productId === productId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.qty = qty;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Quantity updated',
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/cart/clear
// @desc    Clear user cart
// @access  Private
router.post('/clear', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = [];

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
