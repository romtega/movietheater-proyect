/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import Movie from "../models/Movie.js";

const handleServerError = (res, error) => {
  res.status(500).json({ message: error.message });
};

const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const createTicket = async (req, res) => {
  try {
    const ticketData = req.body;

    if (
      !ticketData.user ||
      !ticketData.movie ||
      !ticketData.seats ||
      !Array.isArray(ticketData.seats)
    ) {
      return res.status(400).json({ msg: "Ticket data is missing or invalid" });
    }

    const user = await User.findById(ticketData.user);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const movie = await Movie.findById(ticketData.movie);
    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    const newTicket = await Ticket.create(ticketData);
    res.status(201).json(newTicket);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("user").populate("movie");
    res.status(200).json(tickets);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getTicketById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ msg: "Invalid ticket ID" });
  }

  try {
    const ticket = await Ticket.findById(id).populate("user").populate("movie");
    if (!ticket) {
      return res.status(404).json({ msg: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateTicketById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ msg: "Invalid ticket ID" });
  }

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTicket) {
      return res.status(404).json({ msg: "Ticket not found" });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteTicketById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ msg: "Invalid ticket ID" });
  }

  if (req.query.destroy === "true") {
    try {
      const deletedTicket = await Ticket.findByIdAndDelete(id);
      if (!deletedTicket) {
        return res.status(404).json({ msg: "Ticket not found" });
      }
      res.status(204).json();
    } catch (error) {
      handleServerError(res, error);
    }
  } else {
    try {
      const ticket = await Ticket.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: false }
      );
      if (!ticket || ticket.isActive === false) {
        return res.status(404).json({ msg: "Ticket not found" });
      }
      res.status(204).json();
    } catch (error) {
      handleServerError(res, error);
    }
  }
};

export {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
};
