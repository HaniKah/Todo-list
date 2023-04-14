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

// --------- add Task function ----------
function addTask(e) {
  e.preventDefault();
  if (input.value === "") {
    alert("Please add your task");
    return;
  }

  //creating new <div>
  const div = document.createElement("div");
  div.classList.add("todo");
  ul.appendChild(div);

  //creating new <Li>
  const li = document.createElement("li");
  li.classList.add("todoli");
  li.innerText = input.value;
  div.appendChild(li);

  //creating check button
  const buttonCheck = document.createElement("button");
  buttonCheck.classList.add("buttonCheck"); //adding class to the ButtonCheck
  buttonCheck.innerHTML = "<i class='fa-regular fa-circle-check'></i>";
  div.appendChild(buttonCheck);

  //creating delete button
  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("buttonDelete"); //adding class to the Buttondelete
  buttonDelete.innerHTML = "<i class='fa-solid fa-trash'></i>";
  div.appendChild(buttonDelete);

  //push created task to the array and save it the local storage
  todoItemArr.push(input.value);
  localStorage.setItem("todo", JSON.stringify(todoItemArr));

  // empty the input after clicking add task button
  input.value = "";
}

// --------- check or trash function ----------
function checkedTask(e) {
  let checkedClass = e.target.classList[0];
  const parent = e.target.parentElement;
  //if check button clicked
  if (checkedClass === "buttonCheck") {
    //move it to the DONE section
    ulDone.appendChild(e.target.parentElement);
    const li = e.target.parentElement.childNodes[0];
    console.log(li.innerText);
    //toggle the classlist LI for css
    li.classList.toggle("completed");

    // delete buttons after check
    e.target.style.display = "none";
    // change the icon
    parent.childNodes[2].innerHTML = "<i class='fa-solid fa-rotate-left'></i>";
    const index = todoItemArr.indexOf(li.innerText);
    console.log(li.innerText);

    //Delete from local storage
    todoItemArr.splice(index, 1);
    console.log(todoItemArr);
    localStorage.setItem("todo", JSON.stringify(todoItemArr));
  }
  //Delete the parent element <Div>
  if (checkedClass === "buttonDelete") {
    const li = e.target.parentElement.childNodes[0];
    parent.remove();
    const index = todoItemArr.indexOf(li.innerText);
    todoItemArr.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(todoItemArr));
  }
}

//-------------- undo task function ---------------

function undoTask(e) {
  let checkedClass = e.target.classList[0];
  const parent = e.target.parentElement;
  if (checkedClass === "buttonDelete") {
    // append the parent element back to TODO
    ul.appendChild(parent);
    // change the icon
    parent.childNodes[1].style.display = "block";
    parent.childNodes[0].classList.toggle("completed");
    parent.childNodes[2].innerHTML = "<i class='fa-solid fa-trash'></i>";
  }
}
// ---------------Edit Task Function -------------
function editTask(e) {
  const taskToEdit = e.target.classList[0];
  console.log(e.target.classList[0]);
  if (taskToEdit === "todoli") {
    const edited = prompt("Please edit your ToDo");
    //if prompt not empty, then store it and change the innerText
    if (edited) {
      const index = todoItemArr.indexOf(e.target.innerText);
      e.target.innerText = edited;
      todoItemArr[index] = edited;
      console.log(todoItemArr);
      localStorage.setItem("todo", JSON.stringify(todoItemArr));
    }
  }
}

// ----------------LocalStorage-----------------

// check if we already have one , if yes , loop over the chickens and render them.;
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
    li.classList.add("todoli");
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
ul.addEventListener("click", editTask);
