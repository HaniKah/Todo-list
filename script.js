// ====================
// Selectors
// ====================
const input = document.querySelector("#newTaskInput");
const newTaskButton = document.querySelector("#newTaskButton");
const ul = document.querySelector(".ulToDo");
const ulDone = document.querySelector(".ulDone");

// ====================
// Functions
// ====================

function addTask(e) {
  e.preventDefault();
  if (input.value === "") {
    alert("Please add your task");
    return;
  }

  //-------creating new div -------------
  const div = document.createElement("div");
  div.classList.add("todo");
  ul.appendChild(div);

  //-------creating new Li and buttons -------------
  const li = document.createElement("li");
  div.classList.add("todoli");
  li.innerText = input.value;
  div.appendChild(li);

  const buttonCheck = document.createElement("button");
  buttonCheck.classList.add("buttonCheck"); //adding class to the ButtonCheck
  buttonCheck.innerHTML = "<i class='fa-regular fa-circle-check'></i>";
  div.appendChild(buttonCheck);

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("buttonDelete"); //adding class to the Buttondelete
  buttonDelete.innerHTML = "<i class='fa-solid fa-trash'></i>";
  div.appendChild(buttonDelete);
  todoItemArr.push(input.value);
  console.log(todoItemArr);
  input.value = "";
  localStorage.setItem("todo", JSON.stringify(todoItemArr));
}

// --------- check trash function ----------
function checkedTask(e) {
  let checkedClass = e.target.classList[0];
  const parent = e.target.parentElement;
  console.log(e.target.classList[0]);
  if (checkedClass === "buttonCheck") {
    ulDone.appendChild(e.target.parentElement);
    const li = e.target.parentElement.childNodes[0];
    li.classList.toggle("completed");

    // delete buttons after check
    e.target.style.display = "none";
    // change the icon
    parent.childNodes[2].innerHTML = "<i class='fa-solid fa-rotate-left'></i>";

    todoItemArr.splice();
  }
  if (checkedClass === "buttonDelete") {
    parent.remove();
  }
}

//-------------- undo task function ---------------

function undoTask(e) {
  let checkedClass = e.target.classList[0];
  const parent = e.target.parentElement;
  if (checkedClass === "buttonDelete") {
    ul.appendChild(parent);
    // change the icon
    parent.childNodes[1].style.display = "flex";
    parent.childNodes[0].classList.toggle("completed");
    parent.childNodes[2].innerHTML = "<i class='fa-solid fa-trash'></i>";
  }
}

// ----------------LocalStorage-----------------

// localStorage.getItem(JSON.parse("todo"));
let todoItemArr = [];
if (localStorage.getItem("todo")) {
  todoItemArr = JSON.parse(localStorage.getItem("todo"));
  console.log(todoItemArr);
  todoItemArr.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("todo");
    ul.appendChild(div);

    //-------creating new Li and buttons -------------
    const li = document.createElement("li");
    div.classList.add("todoli");
    li.innerText = item;
    div.appendChild(li);

    const buttonCheck = document.createElement("button");
    buttonCheck.classList.add("buttonCheck"); //adding class to the ButtonCheck
    buttonCheck.innerHTML = "<i class='fa-regular fa-circle-check'></i>";
    div.appendChild(buttonCheck);

    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("buttonDelete"); //adding class to the Buttondelete
    buttonDelete.innerHTML = "<i class='fa-solid fa-trash'></i>";
    div.appendChild(buttonDelete);
  });
}

// ====================
// Eventlisteners
// ====================
newTaskButton.addEventListener("click", addTask);
ul.addEventListener("click", checkedTask);
ulDone.addEventListener("click", undoTask);
