const http = require("http")
const fs = require("fs")
const port = 4000
const { URL } = require("url")
const app = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, DELETE, OPTIONS, POST, PUT");
    const items = req.url.split("/")
    console.log(items)

    if (req.method === "GET" && items.length === 2) {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        fs.readFile("file.json", "utf8", (err, data) => {
            if (err) {
                console.error(err)
            }
            res.end(data.toString())
        })

    }
    if (req.method === "POST" && items.length === 2) {

        req.on("data", (chunk) => {
            const newData = chunk.toString()
            const parsednewData = JSON.parse(newData)


            fs.readFile("file.json", "utf8", (err, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                const parsedData = JSON.parse(data)
                parsedData.todos.push(parsednewData)
                const newTodos = JSON.stringify(parsedData)
                fs.writeFile("file.json", newTodos, (err) => {
                    if (err) console.log(err)
                })
            })


        }
        if (req.method === "POST") {

            req.on("data", (chunk) => {
                const newData = chunk.toString()
                const parsednewData = JSON.parse(newData)


                fs.readFile("file.json", "utf8", (err, data) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    const parsedData = JSON.parse(data)
                    parsedData.todos.push(parsednewData)
                    const newTodos = JSON.stringify(parsedData)
                    fs.writeFile("file.json", newTodos, (err) => {
                        if (err) console.log(err)
                    })
                })

            })
            res.end()

        }
    } else {
        res.statusCode = 404
        res.end()

    }
}
)

app.listen(port, () => {
    console.log(`körs på ${port}`)
})