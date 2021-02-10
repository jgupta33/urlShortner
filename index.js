const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./routes/URLShortenerRoute.js");
const PORT = process.env.PORT || 3000;
require("dotenv").config(); 

//Middlewares
app.use(express.json());
app.use("", route);

// DB Connection with Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo Database Connected Successfully."))
  .catch((e) => console.error(e));

app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`));