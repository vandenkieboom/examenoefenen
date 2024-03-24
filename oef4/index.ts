import express from "express";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));

const images: string[] = [];
for (let i = 0; i < 11; i++) {
    images[i] = `/assets/images/cat${i + 1}.jpeg`
}

app.get("/cats/images", (req, res) => {
    res.render("index", { images })
})

app.listen(app.get("port"), () => {
    console.log(`https://localhost:${app.get("port")} is running`)
})