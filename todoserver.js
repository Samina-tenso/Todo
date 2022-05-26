const http = require("http")
const fs = require("fs")
const crypto = require("crypto")
const port = 4000
const { URL } = require("url")
const { resolve } = require("path")
const app = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, DELETE, OPTIONS, POST, PUT");



    const items = req.url.split("/")
    console.log(items)

    if (req.method === "GET" && !items[1].includes("id")) {

        res.writeHead(200, { "Content-Type": "application/json" });

        fs.readFile("file.json", "utf8", (err, data) => {
            if (err) {
                console.error(err)
            }
            res.write(data)
            res.end()
        })

        return






    } else if (req.method === "GET" && items[1].includes("id")) {
        let baseURL = "http://" + req.headers.host + "/"
        let parsedUrl = new URL(req.url, baseURL)
        let itemID = parsedUrl.searchParams.get("id");
        console.log(itemID)
        fs.readFile("file.json", "utf8", (err, data) => {
            if (err) {
                console.log(error)
            }
            let todoData = JSON.parse(data)
            console.log(todoData)


            let requestedPerson = todoData.find(function (person) {
                return person.id = itemID
            })
            console.log(requestedPerson)

            res.write(JSON.stringify(requestedPerson))
            res.end()


        })
        return

    } else if (req.method === "POST") {

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

    } else if (req.method === "DELETE") {
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
    } else if (req.method === "PATCH") {

        let baseURL = "http://" + req.headers.host + "/"
        let parsedUrl = new URL(req.url, baseURL)
        let itemID = parsedUrl.searchParams.get("id");
        console.log(itemID)

        req.on("data", (chunk) => {
            const newdata = JSON.parse(chunk)
            console.log(newdata)



            fs.readFile("file.json", "utf8", (err, data) => {
                if (err) {
                    console.error(err)
                }
                let fileData = JSON.parse(data)
                console.log(fileData)


                let todoIndex = fileData.findIndex(function (todoItem) {
                    return todoItem.id = itemID

                })
                console.log(todoIndex)



                let todoItem = fileData[todoIndex]
                console.log(todoItem)

                if (newdata.text) {
                    todoItem.text = newdata.text
                }
                fileData[todoIndex] = todoItem
                console.log(fileData)
                const JsonfileData = JSON.stringify(fileData)


                fs.writeFile("file.json", JsonfileData, (err) => {
                    if (err) console.log(err)


                })
                res.write(JsonfileData)
                res.end()

            })

        })
        return


    }
    if (req.method === "PUT") {


        let baseURL = "http://" + req.headers.host + "/"
        let parsedUrl = new URL(req.url, baseURL)
        let itemID = parsedUrl.searchParams.get("id");
        console.log(itemID)

        const randomID = crypto.randomUUID({ disableEntrophyCache: true })
        console.log(randomID)

        req.on("data", (chunk) => {
            let newdata = JSON.parse(chunk)
            console.log(newdata)

            fs.readFile("file.json", "utf8", (err, data) => {
                if (err) {
                    console.error(err)
                }
                const fileData = JSON.parse(data)
                console.log(fileData)


                let todoIndex = fileData.findIndex(function (todoItem) {
                    return todoItem.id = itemID

                })
                console.log(todoIndex)

                newdata = { ...newdata, "id": randomID }
                console.log(newdata)


                fileData[todoIndex] = newdata

                console.log(fileData)
                const JsonfileData = JSON.stringify(fileData)



                fs.writeFile("file.json", JsonfileData, (err) => {
                    if (err) { console.log(err) }
                })



            })
        })
        res.end()
    } else {
        res.statusCode = 404
        res.end()
    }

})


app.listen(port, () => {
    console.log(`körs på ${port}`)
})