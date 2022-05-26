

document.addEventListener("DOMContentLoaded", function () {
    const dbUrl = "http://localhost:4000/todos"


    function getAllTodos() {

        fetch(dbUrl)
            .then(res => res.json())
            .then(data => {
                let htmlCode = "";
                data.forEach((item) => {
                    htmlCode += `
<div class='flex mb-4 items-center id=${item.id}'>
   <p id=${item.id} class='w-full  text-grey-darkest'>${item.text}</p>
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

saveTask.addEventListener("click", (id) => {
    console.log(saveInd.value)
    basic = `http://localhost:4000/todos?id=${id}`
    fetch(basic)
    console.log("hi")
    addTask.style.display = "block"
    saveTask.style.display = "none"
})
function edit(id) {


    const todo = document.querySelector(`p#${id}`)
    console.log(todo.innerText)
    saveInd.value = todo
    console.log(todo)
    text.value = todo.innerHTML
    console.log(saveInd)

    addTask.style.display = "none"
    saveTask.style.display = "block"


}



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





