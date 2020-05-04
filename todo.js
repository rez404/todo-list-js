const form = document.querySelector("#todo-form");
const addButton = document.querySelector(".btn.btn-danger");
const todoInput = document.querySelector("#todo");
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
const todoList = document.querySelector(".list-group");
const firstCard = document.querySelectorAll(".card-body")[0];
const secondCard = document.querySelectorAll(".card-body")[1];

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodo);
    secondCard.addEventListener("click",deleteTodo);
    clearButton.addEventListener("click",clearAllTodos);
    filter.addEventListener("keyup",filterTodos);
}

function filterTodos(e){
    const filterInput = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");


    listItems.forEach(function(listit){
        const licont = listit.textContent.toLowerCase();

        if(licont.indexOf(filterInput) === -1){
            listit.setAttribute("style","display:none !important");
        }else {
            listit.setAttribute("style","display:block ");
        }
    });

}


function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo Başarıyla silindi.");
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodos();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));

}

function clearAllTodos(e){
    if(confirm("Tüm taskları silmek istediğinize emin misiniz?")){
        showAlert("info","Tüm todolar siliniyor...")
        localStorage.removeItem("todos");
        //todoList.innerHTML = "";
        while(todoList.firstElementChild!=null){
            todoList.firstElementChild.remove();
        }
    }
    


    e.preventDefault();

}

function loadAllTodo(){
    todos = getTodos();
    todos.forEach(function(todo){
        addTodotoList(todo);
    });
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    if(newTodo === ""){
        showAlert("danger","Lütfen bir todo giriniz.");
    }else{
        addTodotoList(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todonuz başarıyla eklendi.");
    }
    

    e.preventDefault();
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function addTodoToStorage(newTodo){
    let todos = getTodos();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
    
}

function showAlert(type,message){
    /*
    <div class="alert alert-danger" role="alert">
  This is a danger alert—check it out!
    </div>*/
    const alertItem = document.createElement("div");
    alertItem.className = `alert alert-${type}`;
    alertItem.appendChild(document.createTextNode(message));
    firstCard.appendChild(alertItem);
    setTimeout(function(){
        alertItem.remove();
    },1000);
    

}


function addTodotoList(newTodo){

   /* <!-- <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>--> */
    
    // List item ekleme
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value = "";
}
