const { body, validationResult } = require("express-validator")// app.js
const express = require("express");
const app = express();

const itemsRouter = require("./routes/itemsRouter");
const categoriesRouter = require("./routes/categoriesRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));



app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));