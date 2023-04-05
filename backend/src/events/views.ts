import { Router, RequestHandler } from "express";
import eventController from "./controllers";
import { auth } from "../middleware/auth";

const eventRouter = Router();

// No provision for auth in test environment for now
if (process.env.NODE_ENV !== "test") {
  eventRouter.use(auth as RequestHandler);
}

eventRouter.post("/create/:userID", eventController.createEvent);
eventRouter.put("/:eventID", eventController.updateEvent);
eventRouter.delete("/delete/:eventID", eventController.deleteEvent);
eventRouter.get("/", eventController.getEvents);
eventRouter.get("/upcoming", eventController.getUpcomingEvents);
eventRouter.get("/current", eventController.getCurrentEvents);
eventRouter.get("/past", eventController.getPastEvents);
eventRouter.get("/:eventid", eventController.getEvent);
eventRouter.get("/:eventid/attendees", eventController.getAttendees);
eventRouter.post("/:eventid/:attendeeid", eventController.addAttendee);
eventRouter.delete("/:eventid/attendees/:attendeeid", eventController.deleteAttendee);
eventRouter.patch("/:eventid/status/:status", eventController.updateEventStatus);
eventRouter.patch("/:eventid/owner/:ownerid", eventController.updateEventOwner); 
eventRouter.patch("/:eventid/attendees/:attendeeid/confirm", eventController.confirmUser); 

export default eventRouter;