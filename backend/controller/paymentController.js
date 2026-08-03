const createOrder = async (req, res) => {
  res.status(501).json({ message: 'Payment integration removed. Use COD checkout via /api/order.' })
}

module.exports = { createOrder }

module.exports = { createOrder }