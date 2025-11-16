const addTodoBtn = document.getElementById("addTodoBtn");
const inputTag = document.getElementById("todoInput");
const todoListUl = document.getElementById("todoList");
const remaning = document.getElementById("remaning-count")
const clearCompletedBtn = document.getElementById("clearCompletedBtn")


let todoText;
let todos = [];
let todosString = localStorage.getItem("todos")
if (todosString) {
    todos = JSON.parse(todosString);
}
const populateTodos = () => {
    let string = "";
    
    for (const todo of todos) {

        string += ` <li id="${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}"> 

                    <input type="checkbox" class="todo-checkbox"${todo.isCompleted ? "checked" : ""}>

                    <span class="todo-text">${todo.title}</span>

                    <button class="delete-btn">x</button> 

                    </li>`
        
    }
    todoListUl.innerHTML = string


    const todoCheckboxes = document.querySelectorAll(".todo-checkbox")

    todoCheckboxes.forEach((element) => {
        element.addEventListener("click", (e) => {
            if (e.target.checked) {
                element.parentNode.classList.add("completed")

                todos = todos.map(todo => {

                    if ( todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: true }
                    }
                    else {

                        return todo
                    }
                })
                remaning.innerHTML = todos.filter((item)=>{return item.isCompleted!=true}).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
            else {
                element.parentNode.classList.remove("completed")
                todos = todos.map(todo => {

                    if (todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: false }
                    }
                    else {

                        return todo
                    }
                })
                remaning.innerHTML = todos.filter((item)=>{return item.isCompleted!=true}).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
        })
    })

    clearCompletedBtn.addEventListener("click", ()=>{
        todos=todos.filter((todo)=> todo.isCompleted == false)
        
        localStorage.setItem("todos", JSON.stringify(todos)) 
        populateTodos()  
    })

    let deleteBtns = document.querySelectorAll(".delete-btn")

    deleteBtns.forEach((element) => {
        element.addEventListener("click", (e) => {
            const confirmation = confirm("Do you want to delete this")
            if(confirmation){

            
            todos = todos.filter((todo) => {
                return ( todo.id) !== (e.target.parentNode.id)
            })
            remaning.innerHTML = todos.filter((item)=>{return item.isCompleted!=true}).length;
            localStorage.setItem("todos", JSON.stringify(todos))
            populateTodos()
         }
        })
    })
    
}

addTodoBtn.addEventListener("click", () => {
    
    todoText = inputTag.value;
    if(todoText.trim().length<3){
        alert("Add some more characters!")
        return
    }
    
    inputTag.value = ""
    let todo = {
        id:"todo-"+ Date.now(),
        title: todoText,
        isCompleted: false
    }
    todos.push(todo)
    remaning.innerHTML = todos.filter((item)=>{return item.isCompleted!=true}).length;
    localStorage.setItem("todos", JSON.stringify(todos))
    populateTodos()
});

populateTodos()
remaning.innerHTML = todos.filter((item)=>{return item.isCompleted!=true}).length;
