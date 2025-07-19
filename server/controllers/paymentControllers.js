const Razorpay = require("razorpay");

exports.createOrder = async (req, res) => {
  try {
        const { mealType } = req.body;
    let amount = 0;
    if (mealType === "breakfast") amount = 20;
    else if (mealType === "lunch" || mealType === "dinner") amount = 60;
    else return res.status(400).json({ message: "Invalid meal type" }); 

    // sbse phle we will make an instance

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_ID_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const options = {
      amount: amount * 100, // amount in paise (e.g., 500 for ₹5)
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
    
  } catch (err) {
     console.error("Payment error:", err);
    res.status(500).json({ message: "Payment order creation failed", error: err.message });
  }
};