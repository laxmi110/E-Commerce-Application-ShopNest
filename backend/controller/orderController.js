const Order = require("../model/order")
const sendEmail = require("../utils/sendEmail")

const createOrder = async (req, res) => {
  try {
    const products = req.body.items || req.body.products
    const { totalAmount, address, paymentId, paymentMethod = 'COD' } = req.body

    if (!products || products.length === 0 || !totalAmount || !address) {
      return res.status(400).json({ message: 'Invalid order data' })
    }

    const newOrder = new Order({
      user: req.user._id,
      products,
      totalAmount,
      address,
      paymentId,
      paymentMethod,
    })

    const createdOrder = await newOrder.save()
    await sendEmail(
      req.user.email,
      'Order Confirmation',
      `Your order with ID ${createdOrder._id} has been successfully placed. Total Amount: ${totalAmount}. Thank you for shopping with us!`
    )

    res.status(201).json(createdOrder)
  } catch (error) {
    console.error('createOrder error:', error)
    res.status(500).json({ message: 'server error' })
  }
}

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email')
    res.json(orders)
  } catch (error) {
    console.error('getOrders error:', error)
    res.status(500).json({ message: 'server error' })
  }
}

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('user', 'name email').populate('products.product', 'name price')
    res.json(orders)
  } catch (error) {
    console.error('getMyOrders error:', error)
    res.status(500).json({ message: 'server error' })
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const ord = await Order.findById(req.params.id)
    if (ord) {
      ord.orderStatus = req.body.status || ord.orderStatus
      const updatedOrder = await ord.save()
      res.json(updatedOrder)
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    console.error('updateOrderStatus error:', error)
    res.status(500).json({ message: 'server error' })
  }
}

module.exports = { createOrder, getMyOrders, getOrders, updateOrderStatus }