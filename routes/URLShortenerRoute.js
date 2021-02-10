const express = require("express");
const router = express.Router();
const { Redirect, AddUrl, Base } = require("../controller/URLShortenerController");

router.get("/", Base);  // Base URL
router.get("/:hash", Redirect);  // GET Endpoint to fetch the hash link
router.post("/links", AddUrl); // POST Endpoint to add the URL and shortned

module.exports = router;