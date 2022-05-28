

document.addEventListener("DOMContentLoaded", function () {
    const dbUrl = "http://localhost:4000/todos"


    function getAllTodos() {

        fetch(dbUrl)
            .then(res => res.json())
            .then(data => {
                let htmlCode = "";
                data.forEach((item) => {
                    htmlCode += `
<div class='flex mb-4 items-center'>
   <p  class='w-full ${item.id} text-grey-darkest'>${item.text}</p>
   <button id=${item.id} onclick='edit(this.id)' class='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600'>Edit</button>
   <button id=${item.id} onclick='remove(this.id)'class='delete flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500'>Delete</button>
</div>`;

                    listBox.innerHTML = htmlCode;


                })

            }).catch(err => {
                console.error(err)
            })


    }
    getAllTodos()










    document.getElementById("add-task-btn").addEventListener("click", (e) => {
        e.preventDefault()
        const text = document.getElementById("text").value
        fetch("http://localhost:4000/todos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "text": text })
            })

    })




})



const saveInd = document.getElementById("saveIndex")
const addTask = document.getElementById("add-task-btn")
const saveTask = document.getElementById("save-todo-btn")


function edit(id) {
    console.log(id)
    const item = document.getElementsByClassName(id)
    console.log(item[0].innerText)
    saveInd.value = id
    console.log(saveInd)
    text.value = item[0].innerHTML
    console.log(text.value)
    addTask.style.display = "none"
    saveTask.style.display = "block"

    saveTask.addEventListener("click", (id) => {
        id = saveInd.value

        console.log(id)

        console.log(text.value)
        basic = `http://localhost:4000/todos?id=${id}`
        fetch(basic,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: text.value
                }),

            })
        addTask.style.display = "block"
        saveTask.style.display = "none"
    })

}

//item[0].innerHTML = text.value



function remove(id) {
    console.log(id)
    basic = `http://localhost:4000/todos?id=${id}`

    fetch(basic,
        {
            method: "DELETE",

        })


}




/*

}*/





