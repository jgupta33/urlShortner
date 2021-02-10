const validator = require("validator");
const UrlModel = require("../models/urlModel");


const Base = async (req, res) => {
  res.send("Welcome to URL Shortening App.");
};

const Redirect = async (req, res) => {
  const {hash}  = req.params;
  console.log("Requested Hash is :: " ,hash);

  if (!hash) return res.status(400).json({ message: "No hash is provided for Redirection" });

  try {
    const doc = await UrlModel.findOne({ hash });
    if (!doc) return res.status(400).json({ message: "URL is Invalid or not exists" });
    console.log(" Redirection Url :: " ,doc.url);

    return res.status(302).redirect(doc.url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error occured While checking URL from DB" });
  }
};


const AddUrl = async (req, res) => {
  const { url } = req.body;
  console.log("URL entered by user for hashing is :: " ,url);

  if (!url) return res.status(400).json({ msg: "Please provide the URL" });

  if (!validator.isURL(url, {require_protocol: true,}))
    return res.status(400).json({ msg: "User had Entered Invalid URL" });

  try
   {
    let doc = await UrlModel.findOne({ url });
    if (!doc) 
    {
      let newURL = new UrlModel({ url });
      await newURL.save();
      const InsertedURLResponse={  url :url, urlHash: newURL.hash, shortUrl: process.env.BASE_URL + newURL.hash }
      console.log("URL is Inserted, URL response :: " , InsertedURLResponse);
      return res.status(201).json(InsertedURLResponse);
    }

    const existingURLResponse={  url :url, urlHash: doc.hash, shortUrl: process.env.BASE_URL + doc.hash }
    console.log("URL Already exists, URL response :: :: " , existingURLResponse);
    return res.status(200).json(existingURLResponse);
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Some error occured while fetching URL from database." });
  }
};

module.exports = {Redirect,AddUrl,Base};