const http = require("http")
const fs = require("fs")
const port = 4000

const app = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, DELETE, OPTIONS, POST, PUT");
    const items = req.url.split("/")
    console.log(items)

    if (items[1] == "todos") {
        if (req.method === "GET" && items.length === 2) {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            fs.readFile("file.json", "utf8", (err, data) => {
                console.log(data)
                if (err) {
                    console.error(err)
                    let todos = data.toString()
                    console.log(todos)
                }
            })
        } res.end()
    } else {
        res.statusCode = 404
        res.end()
    }
})
app.listen(port, () => {
    console.log(`körs på ${port}`)
})