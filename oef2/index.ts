import express from "express";

const app = express();

app.set("port", 3000);
app.use(express.static("public"));

app.get("/joke/json", async(req, res) => {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
    });

    const data = await response.json();
    res.type("application/json")
    res.send(data.joke)
})

app.get("/joke/html", async(req, res) => {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
    });

    const data = await response.json();
    res.type("text/html")
    res.send(`<h1>${data.joke}</h1>`)
})

app.listen(app.get("port"), () => {
    console.log(`https://localhost:${app.get("port")} is running`)
})