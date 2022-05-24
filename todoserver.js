const http = require("http")
const fs = require("fs")
const crypto = require("crypto")
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
    if (req.method === "GET" && items[1].includes("id")) {
        let baseURL = "http://" + req.headers.host + "/"
        let parsedUrl = new URL(req.url, baseURL)
        let itemID = parsedUrl.searchParams.get("id");
        console.log(itemID)
        fs.readFile("file.json", "utf8", (err, data) => {
            if (err) {
                return
            }
            let todoData = JSON.parse(data)
            console.log(todoData)


            let requestedPerson = todoData.find(function (person) {
                return person.id = itemID
            })
            console.log(requestedPerson)



            res.end(JSON.stringify(requestedPerson))



        })


    }
    if (req.method === "POST") {

        req.on("data", (chunk) => {
            const newData = chunk.toString()
            const parsednewData = JSON.parse(newData)
            console.log(parsednewData)
            /*
            const parsedArray = [parsednewData]
        
            console.log(parsedArray)*/
            const randomID = crypto.randomUUID({ disableEntrophyCache: true })
            console.log(randomID)
            /*
            parsedArray.push({ "id": randomID })
            console.log(parsedArray)*/

            fs.readFile("file.json", "utf8", (err, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                const parsedData = JSON.parse(data)
                parsedData.push({ ...parsednewData, "id": randomID })
                const newTodos = JSON.stringify(parsedData)
                fs.writeFile("file.json", newTodos, (err) => {
                    if (err) console.log(err)
                })
            })

        })
        res.end()

    }
    if (req.method === "DELETE") {
        let baseURL = "http://" + req.headers.host + "/"
        let parsedUrl = new URL(req.url, baseURL)
        let itemID = parsedUrl.searchParams.get("id");
        console.log(itemID)
        fs.readFile("file.json", "utf8", (err, data) => {
            if (err) {
                console.error(err)
            }
            let fileData = JSON.parse(data)
            console.log(fileData)


            let newdata = fileData.filter(function (itemz) {
                return itemz.id != itemID

            })
            console.log(newdata)

            const JsonNewData = JSON.stringify(newdata)
            fs.writeFile("file.json", JsonNewData, (err) => {
                if (err) console.log(err)
            })
        })
        res.end()
    }

    else {
        res.statusCode = 404
        res.end()

    }
}
)

app.listen(port, () => {
    console.log(`körs på ${port}`)
})