
const { google } = require("googleapis");
const { getOAuthClient } = require("../config/googleCalendar");
const Task = require("../models/taskModel");

exports.createEvent = async (req, res) => {
  try {
    const { title, description, start, end, priority, attendees } = req.body;

    // 1. Get OAuth client for current user
    const oAuth2Client = await getOAuthClient(req.user.id);
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    // 2. Create Google Calendar event
    const gEvent = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: title,
        description: description,
        start: { dateTime: new Date(start).toISOString() },
        end: { dateTime: new Date(end).toISOString() },
        colorId: '11',
        attendees: attendees.map(email => ({ email })),
      }, 
    });

    // 3. Save in MongoDB Task schema
    const newTask = new Task({
      title,
      description,
      status: "To Do",
      priority,
      assignedBy: req.user.id, // admin ID
      startDate: start,
      endDate: end,
      attendees: attendees,
      googleEventId: gEvent.data.id
    });
    await newTask.save();

    return res.status(201).json({
      message: "Event created",
      googleEventId: gEvent.data.id,
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    // 1. Get OAuth client
    const oAuth2Client = await getOAuthClient(req.user.id);
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    // 2. Fetch upcoming events
    const response = await calendar.events.list({
      calendarId: "primary",
      // timeMin: new Date().toISOString(),
      maxResults: 2500,     // max allowed by Google
      singleEvents: true,
      orderBy: "startTime", // still keeps them sorted
    });

    console.log("response", response.data.items);

    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const oAuth2Client = await getOAuthClient(req.user.id);
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client })
    const { id } = req.body;

    const response = await calendar.events.delete({
      calendarId: "primary",
      eventId: id,
    })
    // console.log('Event deleted successfully.', response);
    // The response body is empty upon successful deletion.
    res.json(response);
  } catch (err) {
    console.error('The API returned an error:', err);
    throw err;
  }
}