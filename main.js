//Selectors from html
let toDoForm = document.querySelector(".todo-form");
let toDoInput = document.querySelector(".todo-input");
let toDoList = document.querySelector(".todo-list");
let clearCompletedButton = document.querySelector(".clear-completed");
let filterOptions = document.querySelector(".filter-options");
let itemsLeft = document.querySelector(".items-left");
let content = document.querySelector(".content");


//Variabler
let blueButton;
let userInput = "";


//Lägg till todo:
toDoForm.addEventListener("submit", addToDo);

function addToDo(event) {
  event.preventDefault();

  userInput = toDoInput.value;

  let toDoDiv = document.createElement("div");
  toDoDiv.classList.add("toDo");

  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'checkbox';
  checkbox.id = userInput; //For + id borde vara samma tänker jag. Funkar inte som jag tänker mig dock.
  checkbox.value = 'checkbox';
  checkbox.classList.add("editCheckbox");

  let label = document.createElement('label');
  label.htmlFor = userInput;

  label.appendChild(document.createTextNode(''));

  toDoDiv.appendChild(checkbox);
  toDoDiv.appendChild(label);

  let newToDoItem = document.createElement("li");
  newToDoItem.innerText = userInput;
  newToDoItem.classList.add("toDo-item");

  toDoDiv.appendChild(newToDoItem);

  let removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.innerText = '❌';
  removeButton.classList.add("remove-button");
  toDoDiv.appendChild(removeButton);

  toDoList.appendChild(toDoDiv);

  toDoInput.value = '';

  updateItemsLeft();
  updateBlueButton();

  // Visa innehållet när en ny uppgift har lagts till
  content.style.display = "block"; // Är inte detta styling och bör ligga i css? 
}


//Ta bort todo
toDoList.addEventListener('click', deleteItem);

function deleteItem(event) {
  let clickedItem = event.target;

  if (clickedItem.classList.contains('remove-button')) {
    clickedItem.parentElement.remove();

    updateItemsLeft();
    updateBlueButton();
  }
}

//Markera som färdigt
toDoList.addEventListener('change', markAsCompleted);

function markAsCompleted(event) {
  let checkbox = event.target;
  let todoItem = checkbox.parentElement;
  todoItem.classList.toggle('completed');

  // Kontrollera om det finns avklarade uppgifter för att visa eller gömma "Clear completed" knappen
  let completedTodos = document.querySelectorAll(".completed");
  clearCompletedButton.style.display = completedTodos.length > 0 ? "block" : "none";

  // Kontrollera om det finns aktiva uppgifter för att visa eller gömma ul.todo-list samt clearCompleted-knappen
  updateClearCompletedButton();
  updateItemsLeft();
}

// Ta bort alla färdiga anteckningar
clearCompletedButton.addEventListener("click", clearCompleted);

function clearCompleted() {
  let completedTodos = document.querySelectorAll(".completed");
  completedTodos.forEach(todo => {
    todo.remove();
  });

  clearCompletedButton.style.display = 'none'; 

  updateItemsLeft();
  updateBlueButton();
}

//Uppdatera items left
document.addEventListener('click', function (e) {
  let checkboxes = e.target;
  if (checkboxes.tagName == 'INPUT' && checkboxes.type == 'checkbox') {
    updateItemsLeft();
    }
});

function updateItemsLeft() {
  let countChecked = document.querySelectorAll("input[type=checkbox]:not(:checked)").length;

  if (countChecked === 1) {
    itemsLeft.textContent = "1 item left";
  } 
  else {
    itemsLeft.textContent = countChecked + " items left";
  }
  itemsLeft.hidden = false;
}

//Filtrera val i choice-bar
filterOptions.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    let filter = event.target.textContent;
    filterTodos(filter);
  }
});

function filterTodos(filter) {
  let todos = document.querySelectorAll(".toDo"); // Skulle kunna flyttas till toppen med övriga querySelectorer

  let allBtn = document.querySelector(".all-button");
  let activeBtn = document.querySelector(".active-button");
  let completeBtn = document.querySelector(".completed-button");

  if (allBtn.classList.contains("active-filter")) {
    allBtn.classList.remove("active-filter");
  }
  if (activeBtn.classList.contains("active-filter")) {
    activeBtn.classList.remove("active-filter");
  }
  if (completeBtn.classList.contains("active-filter")) {
    completeBtn.classList.remove("active-filter");
  }

  todos.forEach(todo => {
    switch (filter) {

      case "All":
        allBtn.classList.add("active-filter");
        todo.style.display = "flex";
        break;

      case "Active":
        activeBtn.classList.add("active-filter");
        todo.classList.contains("completed") ? todo.style.display = "none" : todo.style.display = "flex";
        break;

      case "Completed":
        completeBtn.classList.add("active-filter");
        todo.classList.contains("completed") ? todo.style.display = "flex" : todo.style.display = "none";
        break;
    }
  });
}



// Blue button
document.addEventListener("DOMContentLoaded", function () {

  blueButton = document.createElement("button");
  blueButton.type = 'button';
  blueButton.classList.add("blue-button");
  blueButton.innerText = '🔽';

  toDoForm.prepend(blueButton);

  updateBlueButton();
});

function updateBlueButton() {
  let todos = document.querySelectorAll(".toDo"); // Skulle kunna flyttas till toppen med övriga querySelectorer

  blueButton.style.display = todos.length > 0 ? "block" : "none";

  // Lägg till eller ta bort event listener beroende på om det finns todos eller inte
  if (todos.length > 0) {
    blueButton.addEventListener("click", toggleAll);
  } else {
    blueButton.removeEventListener("click", toggleAll);
  }
}

// Funktion för att styra synligheten av ClearCompleted - knappen
function updateClearCompletedButton() {
  let todos = document.querySelectorAll(".toDo");
  let oneOrMoreCompleted = false;

  todos.forEach(todo => {
    if (todo.classList.contains('completed')) {
      oneOrMoreCompleted = true;
    }
  });

  clearCompletedButton.style.display = oneOrMoreCompleted ? "block" : "none";
}


// Funktion för att markera alla som färdiga/ofärdiga
function toggleAll() {
  let todos = document.querySelectorAll(".toDo");
  // Kika om alla element är completed eller ej, utgå ifrån det
  let complete = false;
  todos.forEach(todo => {
    if (!todo.classList.contains('completed')) {
      complete = true;
    }
  });

  todos.forEach(todo => {
    console.log(todo);
    let checkbox = todo.querySelector(".editCheckbox");
    if (complete && !todo.classList.contains('completed')) {
      todo.classList.add('completed');
      todo.querySelector(".editCheckbox").checked = true;
    }
    else if (!complete && todo.classList.contains('completed')) {
      todo.classList.remove('completed');
      todo.querySelector(".editCheckbox").checked = false;
    }
  });

  // Kontrollera om det finns aktiva uppgifter för att visa eller gömma ul.todo-list samt clearCompleted-knappen
  updateClearCompletedButton();
  updateItemsLeft();
}

