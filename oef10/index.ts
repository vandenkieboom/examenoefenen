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
    const name = req.body.name;
    const options = req.body.options;
    let randomIndex = Math.ceil(Math.random() * 5);

    let images: string = `/assets/images/${options}${randomIndex}.png`

    console.log(images);

    res.render("submit", { 
        message: `Hey ${name}, we have a ${options} for you:`, 
        images })
})

app.listen(app.get("port"), () => {
    console.log(`https://localhost:${app.get("port")} is running.`)
})