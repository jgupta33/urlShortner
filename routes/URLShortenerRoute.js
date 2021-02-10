const express = require("express");
const router = express.Router();
const { Redirect, AddUrl } = require("../controller/URLShortenerController");

router.get("/:hash", Redirect);  // GET Endpoint to fetch the 
router.post("/links", AddUrl); // POST Endpoint to add the URL and shortned

module.exports = router;