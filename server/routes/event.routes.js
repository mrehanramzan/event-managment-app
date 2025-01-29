import Router from "express";
import { createEvent, deleteEvent, getAllEvents, getEvent } from "../controllers/event.controller.js";
import auth from "../middlewares/auth.js";
const eventRouter = Router();

eventRouter.post("/event", auth, createEvent);
eventRouter.get("/", auth ,getAllEvents);
eventRouter.delete("/:eventId", auth ,deleteEvent);
eventRouter.get("/:eventId", auth ,getEvent);

// Due to lack of time i cant complete it 
// eventRouter.put("/:eventId", updateEvent); 


export default eventRouter;