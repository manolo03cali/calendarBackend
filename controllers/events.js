const { response } = require("express");
const Event = require("../models/Event");
const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");
  res.json({
    ok: true,
    events,
  });
};
const createEvent = async (req, res = response) => {
  //verificar que tenga el evento
  //console.log(req.body);
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventSave = await event.save();
    res.json({
      ok: true,
      msg: "Event save successfully ",
      event: eventSave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the system administrator",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found by Id",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You are not authorized to update this event",
      });
    }
    const newEvent = { ...req.body, user: uid };
    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });
    res.json({
      ok: true,
      msg: "Event update successfully ",
      event: updateEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the system administrator",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found by Id",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You are not authorized to delete this event",
      });
    }
    await Event.findByIdAndDelete(eventId);
    res.json({
      ok: true,
      msg: "Event delete successfully ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the system administrator",
    });
  }
};
module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
