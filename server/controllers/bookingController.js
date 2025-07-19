const Booking = require("../models/bookingModel");

exports.bookMeal = async (req, res) => {
  try {
    const { mealType, date, paymentId } = req.body;
    const userId = req.user.userId; // Set by auth middleware

    // Prevent duplicate booking for same user, date, mealType
    const existing = await Booking.findOne({ user: userId, date, mealType });
    console.log("Existing booking:", existing);
    if (existing) return res.status(400).json({ message: "Already booked for this meal." });

    const booking = new Booking({
      user: userId,
      mealType,
      date,
      paymentId,
    });
    await booking.save();
    res.status(201).json({ message: "Booking saved!" });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

// exports.getPaidUsers = async (req, res) => {



//   // The .populate('user', 'name usermail branch role') in your code is a Mongoose method that:

// // Replaces the user field (which is just a user ID in each booking)
// // With the actual user document from the User collection
// // But only includes the fields: name, usermail, branch, and role
// // Why use populate?
// // Without populate, booking.user is just an ObjectId (e.g., "65f...abc").
// // With populate, booking.user becomes an object like:
// // {
// //   name: "Sagar Sharma",
// //   usermail: "sagar@gmail.com",
// //   branch: "CSE",
// //   role: "user"
// // }


//   try {
//     const today = new Date().toISOString().split('T')[0];
//     const bookings = await Booking.find({ date: today }).populate('user', 'name usermail branch role');
//     res.json(bookings.map(b => ({
//       name: b.user.name,
//       usermail: b.user.usermail,
//       branch: b.user.branch,
//       role: b.user.role,
//       mealType: b.mealType,
//       paymentId: b.paymentId,
//       date: b.date,
//     })));
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch paid users", error: err.message });
//   }
// };

exports.getPaidUsers = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const bookings = await Booking.find({date: today}).populate('user', 'name usermail branch role');
    // const bookings = await Booking.find({ date: today }).populate('user', 'name usermail branch role');
    console.log("Bookings found for today:", bookings); // Add this line
    res.json(bookings.map(b => ({
      name: b.user.name,
      usermail: b.user.usermail,
      branch: b.user.branch,
      role: b.user.role,
      mealType: b.mealType,
      paymentId: b.paymentId,
      date: b.date,
    })));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch paid users", error: err.message });
  }
};