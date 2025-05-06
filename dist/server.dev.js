"use strict";

var express = require("express");

var helmet = require("helmet");

var rateLimit = require("express-rate-limit");

var cors = require("cors");

var path = require("path");

var xss = require("xss-clean");

var hpp = require("hpp");

var fs = require("fs");

var app = express(); // Security Middleware

app.use(helmet()); // Set security headers
// Rate limiting

var limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs

});
app.use(limiter); // Body parser

app.use(express.json({
  limit: "100kb"
})); // Body limit is 10kb

app.use(express.urlencoded({
  extended: true,
  limit: "100kb"
})); // Data sanitization against XSS

app.use(xss()); // Prevent parameter pollution

app.use(hpp()); // CORS

app.use(cors({
  origin: "*",
  credentials: true
})); // Set security headers

app.use(function (req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Content-Security-Policy", "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:;");
  next();
}); // Simple visit tracking data store

var visitDataFile = path.join(__dirname, "visitData.json");
var visitData = {
  totalVisits: 0,
  visits: []
}; // Load visit data from file if exists

if (fs.existsSync(visitDataFile)) {
  var data = fs.readFileSync(visitDataFile, "utf-8");
  visitData = JSON.parse(data);
} // Middleware to track visits


app.use(function (req, res, next) {
  visitData.totalVisits++;
  var userAgent = req.headers["user-agent"] || "unknown";
  var viewportWidth = req.headers["viewport-width"] || "unknown";
  var viewportHeight = req.headers["viewport-height"] || "unknown";
  visitData.visits.push({
    timestamp: new Date().toISOString(),
    ip: req.ip,
    userAgent: userAgent,
    viewport: {
      width: viewportWidth,
      height: viewportHeight
    }
  }); // Save visit data to file asynchronously

  fs.writeFile(visitDataFile, JSON.stringify(visitData, null, 2), function (err) {
    if (err) console.error("Error saving visit data:", err);
  });
  next();
}); // Serve static files

app.use(express["static"](path.join(__dirname))); // API endpoint to get visit stats

app.get("/api/visit-stats", function (req, res) {
  res.json({
    totalVisits: visitData.totalVisits,
    recentVisits: visitData.visits.slice(-10) // last 10 visits

  });
}); // Routes

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
}); // Error handling middleware

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}); // 404 handler

app.use(function (req, res) {
  res.status(404).send("Page not found");
});
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});