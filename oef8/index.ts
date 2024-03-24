import express from "express";

const app = express();

app.set("view engine", "ejs");
app.set("port", 3000);
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/:operator", (req, res) => {
    const operator: string = typeof req.params.operator === "string" ? req.params.operator .toLowerCase(): "";
    const a: string = typeof req.query.a === "string" ? req.query.a : "";
    const b: string = typeof req.query.b === "string" ? req.query.b : "";
    
    let result: number = NaN;

    if (operator === "add") {
        if (a === "" || b === "") {
            res.render("index", { result: "", error: "Both query parameters (a,b) have to be specified." })
        } else {
            let result = parseFloat(a) + parseFloat(b)
            res.render("index", { result, error: "" })
        }
    } else if (operator === "min") {
            let result = parseFloat(a) - parseFloat(b)
            res.render("index", { result, error: "" })
    }
})

app.listen(app.get("port"), () => {
    console.log("https://localhost/" + app.get("port") + " is running!")
})