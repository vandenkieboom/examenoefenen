import express from "express";

const app = express();

app.set("view engine", "ejs");
app.set("port", 3000);
app.use(express.static("public"));

app.get("/", (req, res) => {
    const language = typeof req.query.language === "string" ? req.query.language.toLowerCase() : "en"; 

    if (language == "en") {
        res.render("index", { message: "Hello World!" })
    } else if (language == "fr") {
        res.render("index", { message: "Bonjour le monde!" })
    } else if (language == "es") {
        res.render("index", { message: "¡Hola Mundo!" })
    } else {
        res.render("index", { message: "Hello World!" })
    }
})

app.listen(app.get("port"), () => {
    console.log("https://localhost/" + app.get("port") + " is running!")
})