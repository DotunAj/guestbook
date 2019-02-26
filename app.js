const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const db = require("./db/guests");

const app = express();

// Handlebar Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static assets
app.use(express.static(path.join(__dirname, "public")));

// Render Index page
app.get("/", (req, res) =>
  res.render("index", {
    helpers: {
      activeHome: "active",
      activeView: ""
    }
  })
);

//Guest routes
app.use("/guests", require("./routes/guests"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started on port", PORT));
