import express, { urlencoded } from "express";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended:true}))

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/", (req, res) => {
    const option = typeof req.body.option === "string" ? req.body.option : "https://google.com"
    res.redirect(`https://${option}.com`)
})

app.listen(app.get("port"), () => {
    console.log(`https://localhost:${app.get("port")} is running.`)
})