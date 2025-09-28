const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();


// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // serves form.html directly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/form.html"));
});

// Handle form submission
app.post("/submit", (req, res) => {
  const { name, roll, device, date, time } = req.body;

  // Read confirm.html template
  let template = fs.readFileSync(path.join(__dirname, "public/confirm.html"), "utf-8");

  // Replace placeholders with actual data
  template = template.replace("{{name}}", name)
                     .replace("{{roll}}", roll)
                     .replace("{{device}}", device)
                     .replace("{{date}}", date)
                     .replace("{{time}}", time);

  res.send(template);
});

const port = 3000; // or any free port
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
