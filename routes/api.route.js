const router = require("express").Router();
const { google } = require("googleapis");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:3000",
);

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.post("/create-tokens", async (req, res, next) => {
  try {
    const { code } = req.body;
    const { tokens } = await oAuth2Client.getToken(code);
    res.send(tokens);
  } catch (err) {
    next(err);
  }
});

router.post("/create-event", async (req, res, next) => {
  try {
    const { summary, description, location, startDateTime, endDateTime } =
      req.body;
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const calendar = google.calendar("v3");
    const response = await calendar.events.insert({
      auth: oAuth2Client,
      calendarId: "primary",
      requestBody: {
        summary: summary,
        description: description,
        location: location,
        colorId: "6",
        start: {
          dateTime: new Date(startDateTime),
        },
        end: {
          dateTime: new Date(endDateTime),
        },
      },
    });
    const { tokens } = await oAuth2Client.getToken(code);
    res.send(tokens);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
