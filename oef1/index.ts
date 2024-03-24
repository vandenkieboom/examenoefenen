import express from "express";
import { Thisisme, Pokemon } from "./types";

const app = express();

app.set("port", 3000);
app.use(express.static("public"));

const thisisme: Thisisme = {
    name: "Jordy",
    age: 27,
    profilePic: "/assets/images/me.png"
}

const getPokemon = async(): Promise<Pokemon> => {
    const response: Response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    const pikachu: Pokemon = await response.json();
    return pikachu;
}

const getRandomColor = (): string => {
    const colors: string[] = [
        "#3e42f4",
        "#f0a34e",
        "#8c6cf2",
        "#b1ef56",
        "#e6429d",
        "#5bd8e9",
        "#e56954",
        "#56cb62",
        "#d33fb2",
        "#64e59a"
      ];

      let randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
}

app.get("/", (req, res) => {
    res.type("text/html")
    res.send("<h1>Hello World</h1>")
})

app.get("/whoami", (req, res) => {
    res.type("text/html")
    res.send(`<h1><br>My name is ${thisisme.name} and i am ${thisisme.age} years old</h1><br>
    <img src="${thisisme.profilePic}" alt="me"></img>`)
})

app.get("/pikachujson", async(req, res) => {
    const pikachu = await getPokemon()
    console.log(pikachu)
    res.type("application/json")
    res.json({
        id: pikachu.id,
        name: pikachu.name,
        weight: pikachu.weight,
        frontImage: pikachu.sprites.front_default,
        backImage: pikachu.sprites.back_default
    });
})

app.get("/pikachuhtml", async(req, res) => {
    const pikachu = await getPokemon()

    const html = `
    <html>
        <head><title>${pikachu.name}</title></head>
        <body>
            <h1>${pikachu.name}</h1>
            <p>ID: ${pikachu.id}</p>
            <p>Weight: ${pikachu.weight}</p>
            <p>Front: <img src="${pikachu.sprites.front_default}"></p>
            <p>Back: <img src="${pikachu.sprites.back_default}"></p>
        </body>
    </html>`;


    res.type("text/html")
    res.send(html)
})

app.get("/randomcolor", (req, res) => {
    const randomColor = getRandomColor();
    res.type("text/html")
    res.send(`<body style="background-color: ${randomColor}; display: flex; justify-content: center; align-items: center;"</body>
    <h1 style="color: black">${randomColor}</h1>`)
})


app.listen(app.get("port"), async() => {
    console.log(`https://localhost:${app.get("port")} is running`)
})