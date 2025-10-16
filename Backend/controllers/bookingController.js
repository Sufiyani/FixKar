import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Service from "../models/Service.js";
import Vendor from "../models/Vendor.js";

// ✅ Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, address, serviceId, notes } = req.body;

    // Find the service and populate vendor details
    const service = await Service.findById(serviceId).populate("vendorId");
    
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.status !== "Approved") {
      return res.status(400).json({ message: "Service is not approved" });
    }

    // Create or update user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, phone, address });
    } else {
      user.name = name;
      user.phone = phone;
      user.address = address;
      await user.save();
    }

    // Create booking
    const booking = await Booking.create({
      userId: user._id,
      vendorId: service.vendorId._id,
      serviceId: service._id,
      userName: name,
      userEmail: email,
      userPhone: phone,
      userAddress: address,
      vendorName: service.vendorId.name,
      vendorPhone: service.vendorId.phone,
      vendorEmail: service.vendorId.email,
      serviceCategory: service.category,
      serviceLocation: service.location,
      servicePrice: service.price,
      notes: notes || "",
    });

    // Populate booking with full details
    const populatedBooking = await Booking.findById(booking._id)
      .populate("userId")
      .populate("vendorId")
      .populate("serviceId");

    res.status(201).json({
      message: "Booking created successfully! You can now contact the vendor.",
      booking: populatedBooking,
      vendorContact: {
        name: service.vendorId.name,
        phone: service.vendorId.phone,
        email: service.vendorId.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all bookings (Admin only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId")
      .populate("vendorId")
      .populate("serviceId")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId")
      .populate("vendorId")
      .populate("serviceId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Confirmed", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("userId")
      .populate("vendorId")
      .populate("serviceId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get booking stats
export const getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: "Pending" });
    const confirmedBookings = await Booking.countDocuments({ status: "Confirmed" });
    const completedBookings = await Booking.countDocuments({ status: "Completed" });
    const cancelledBookings = await Booking.countDocuments({ status: "Cancelled" });

    res.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};