document.addEventListener("DOMContentLoaded", function () {
    const dbUrl = "http://localhost:4000/todos"



    function getAllTodos() {

        fetch(dbUrl)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let htmlCode = "";
                data.forEach((item, index) => {
                    htmlCode += `
<div class='flex mb-4 items-center'>
   <p class='w-full text-grey-darkest'>${item.text}</p>
   <button onclick='edit(${index})' class='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600'>Edit</button>
   <button onclick='deleteTodo(${index})' class='flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500'>Delete</button>
</div>`;

                    listBox.innerHTML = htmlCode;

                })

            }).catch(err => {
                console.error(err)
            })
    }
    getAllTodos()
});


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



