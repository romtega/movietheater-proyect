/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
import express from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
} from "../controllers/ticketController.js";

const ticketRouter = express.Router();

ticketRouter.post("/", createTicket);
ticketRouter.get("/", getAllTickets);
ticketRouter.get("/:id", getTicketById);
ticketRouter.put("/:id", updateTicketById);
ticketRouter.delete("/:id", deleteTicketById);

export default ticketRouter;
