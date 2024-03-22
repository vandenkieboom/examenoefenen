import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import * as wordsModule from "./words";
import { addListener } from "process";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);

let WORDS = ["water", "bread", "frenzy","tower", "creepy", "donkey", "fruit", "bloom", "music", "pause", "sport", "market", "floor", "walking","prize", "chant", "swoop", "quill", "plume", "crisp", "sweep", "grace"];

let randomWord = "water";

app.get("/words", (req, res) => {
  let wordsCapitalized = wordsModule.toUpperCase(WORDS);
  const q: string = typeof req.query.q === "string" ? req.query.q : ""
  const sortDirection = typeof req.query.sortDirection === "string" ? req.query.sortDirection : "asc"

  if (q) {
    wordsCapitalized = wordsCapitalized.filter(word => word.includes(q))
  }

  if (sortDirection === "asc") {
    wordsCapitalized.sort((a, b) => a.localeCompare(b))
  } else {
    wordsCapitalized.sort((a, b) => b.localeCompare(a))
  }

  res.render("words", { words: wordsCapitalized.slice(0, 40) })
});

app.get("/guess", (req, res) => {
  console.log(randomWord);
  res.render("guess", {
      guess: "",
      colors: [],
      error: "",
      success: ""
  });
});

app.post("/guess", (req, res) => {
  let guess : string = req.body.guess.toUpperCase();

  console.log(guess)
  if (WORDS.indexOf(guess.toLowerCase()) === -1) {
      res.render("guess", {
          guess: "",
          colors: [],
          error: "The word is not in the list of possible words.",
          success: ""
      });
      return;
  }
  
  if (guess.length === 5) {
      let colors : string[] = checkWord(guess, randomWord);
      let allMatch : boolean = true;
      for (let color of colors) {
          if (color !== "green") {
              allMatch = false;
              break;
          }
      }
      res.render("guess", {
          guess: guess,
          colors: colors,
          error: "",
          success: allMatch ? "Congratulations! You guessed the word." : ""
      });
  } else {
      res.render("guess", {
          guess: "",
          colors: [],
          error: "You must enter a 5-letter word.",
          success: ""
      });
  
  }
});

app.get("/restart", (req, res) => {
  createNewWord();
  res.redirect("/guess");
});

app.get("/", (req, res) => {
    res.render("index", {
    })
});

function createNewWord() {
  randomWord = wordsModule.getRandomWord(wordsModule.getFiveLetterWords(WORDS));
}

function checkWord(guess: string, target: string): string[] {  
    guess = guess.toUpperCase();
    target = target.toUpperCase();
    let result = ['X', 'X', 'X', 'X', 'X']; // Initially set all to 'X' for gray
    let targetCopy = target.split('');
  
    // First pass for correct positions (Green)
    for (let i = 0; i < 5; i++) {
      if (guess[i] === target[i]) {
        result[i] = 'G'; // Green for correct position
        targetCopy[i] = '_'; // Mark as used
      }
    }
  
    // Second pass for correct letters in the wrong position (Yellow)
    for (let i = 0; i < 5; i++) {
      if (result[i] !== 'G' && targetCopy.includes(guess[i])) {
        result[i] = 'Y'; // Yellow for correct letter in wrong position
        targetCopy[targetCopy.indexOf(guess[i])] = '_'; // Mark as used
      }
    }

    return result.map(value => value === 'X' ? 'gray' : value === 'G' ? 'green' : 'yellow');
}

app.listen(app.get("port"), async() => {
    const response = await fetch("https://raw.githubusercontent.com/similonap/word-guess-api/main/words.json");
    WORDS = await response.json();
    createNewWord();
    console.log("Server started on http://localhost:" + app.get('port'));
});


