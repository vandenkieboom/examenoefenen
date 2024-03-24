import express from "express";
import { Thisisme, Pokemon } from "./types";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));

const thisisme: Thisisme = {
    name: "Jordy",
    age: 27,
    profilePic: "/assets/images/me.png"
}

const getPokemon = async(name: string): Promise<Pokemon> => {
    const response: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon: Pokemon = await response.json();
    return pokemon;
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
    res.render("index");
})

app.get("/whoami", (req, res) => {
    res.render("index", { thisisme })
})

app.get("/pikachuhtml", async(req, res) => {
    const pokemon = await getPokemon("pikachu")
    res.render("pokemon", { 
        pokemonName: pokemon.name,
        pokemonId: pokemon.id,
        pokemonWeight: pokemon.weight,
        pokemonFront: pokemon.sprites.front_default,
        pokemonBack: pokemon.sprites.back_default
     })
})

app.get("/charmanderhtml", async(req, res) => {
    const pokemon = await getPokemon("charmander")
    res.render("pokemon", { 
        pokemonName: pokemon.name,
        pokemonId: pokemon.id,
        pokemonWeight: pokemon.weight,
        pokemonFront: pokemon.sprites.front_default,
        pokemonBack: pokemon.sprites.back_default
     })
})

app.get("/bulbasaurhtml", async(req, res) => {
    const pokemon = await getPokemon("bulbasaur")
    res.render("pokemon", { 
        pokemonName: pokemon.name,
        pokemonId: pokemon.id,
        pokemonWeight: pokemon.weight,
        pokemonFront: pokemon.sprites.front_default,
        pokemonBack: pokemon.sprites.back_default
     })
})

app.get("/randomcolor", (req, res) => {
    const randomColor = getRandomColor();
    res.render("random", { randomColor })
})


app.listen(app.get("port"), async() => {
    console.log(`https://localhost:${app.get("port")} is running`)
})