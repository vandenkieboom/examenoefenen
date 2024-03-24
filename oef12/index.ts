import express, { urlencoded } from "express";

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended:true}))

app.get("/", (req, res) => {
    res.render("index", { error: "", succes: "" });
})

app.post("/", (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const message = req.body.message;
    const checkbox = req.body.checkbox === "agree";

    if (!checkbox) {
        res.render("index", { error: "You must agree to the terms and conditions", succes: "" })
    } else {
        if (fname === "" || lname === "" || email === "" || message === "") {
            res.render("index", { error: "All fields required!", succes: "" })
        } else if (!email.includes("@")) {
            res.render("index", { error: "Not a valid email address!", succes: "" })
        } else {
            res.render("index", { error: "", succes: `Thank you for contacting us, ${fname}! We will get back to you on the following email: ${email}` })
        }
    }
})

app.listen(app.get("port"), () => {
    console.log(`https://localhost:${app.get("port")} is running.`)
})