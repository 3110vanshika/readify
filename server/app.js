const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const { db } = require("./database/db");
const fs = require('fs')
const path = require('path')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Read the SQL file
app.use("/sqlfile", (req, res) => {
  const sqlFilePath = path.join(__dirname, "queries", "createTables.sql");
  fs.readFile(sqlFilePath, "utf8", (err, sql) => {
    if (err) {
      console.error("Failed to read SQL file:", err);
      return res.status(500).send("Error reading SQL file.");
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error executing SQL:", err);
        return res.status(500).send("Error executing SQL commands.");
      }
      console.log("SQL file executed successfully.");
      res.send("SQL file executed successfully.");
    });
  });
});

// Routes
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)

//port
const port = process.env.port;
db.connect()
  .then(() => {
    app.listen(
      port,
      console.log(
        `Successfully connected to database and server is running pn port ${port}`
      )
    );
  })
  .catch((error) => {
    console.log(`Error ${error}`);
  });
