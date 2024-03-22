import express from "express";
import { createTweet, getProfileByHandle, getTweets, getTweetsByHandle } from "./data";
import {Profile, Tweet } from "./types";

const app = express();

app.set("view engine","ejs");

app.use(express.static("public"));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended:true}));

app.get("", async(req,res) => {
    let tweets = await getTweets();
    return res.render("index", { tweets });
});

app.post("/", async (req, res) => {
    const name: string = req.body.name
    const handle: string = req.body.handle
    const text: string = req.body.text

    const newTweet = {
        name: name,
        handle: handle,
        text: text,
        createdOn: new Date()
    }

    await createTweet(newTweet);
    res.redirect("/")
})

app.get("/:profile", async(req,res) => {
    const handle: string = typeof req.params.profile === "string" ? req.params.profile : ""
    const profile = await getProfileByHandle(handle)
    const tweets: Tweet[] = await getTweetsByHandle(handle)

    if (!profile) {
        res.status(404).render("notfound", { profile })
    } else {
        res.render("profile", { profile, tweets })
    }
    
});

app.listen(3000, async() => {
    console.log(`The application is listening on http://localhost:3000`);
})