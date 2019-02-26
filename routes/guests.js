const db = require("../db/guests");
const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");

// Method Override MIddleware
router.use(methodOverride("_method"));

//Get all guest
router.get("/", (req, res) =>
  res.render("view", {
    helpers: {
      activeHome: "",
      activeView: "active"
    },
    guests: db
  })
);

//Post a guest to the list

//Render Edit page
router.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.forEach(guest => {
    if (guest.id === id) {
      res.render("edit", {
        guest
      });
      //TODO: Take care of the other case
    }
  });
});

//Update a guest
router.put("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const found = db.some(guest => guest.id === id);
  if (found) {
    const upGuest = req.body;
    db.forEach(guest => {
      if (guest.id === id) {
        guest.name = upGuest.name ? upGuest.name : guest.name;
        guest.email = upGuest.email ? upGuest.email : guest.email;
        guest.comment = upGuest.comment ? upGuest.comment : guest.comment;
      }
    });
    return res.redirect("/guests");
  } else {
    //TODO: load 404 page
  }
});

//Delete a guest from the list
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const found = db.some(guest => guest.id === id);
  if (found) {
    db.forEach((guest, index) => {
      if (guest.id === id) {
        db.splice(index, 1);
      }
    });
    return res.redirect("/guests");
  } else {
    //TODO: load 404 page
  }
});

module.exports = router;
