//Selectors from html
let toDoForm = document.querySelector(".todo-form");
let toDoInput = document.querySelector(".todo-input");
let toDoContainer = document.querySelector(".todo-container"); //Vet inte om vi faktikst behöver denna men skapar en för varje klass
let toDoList = document.querySelector(".todo-list");

let clearCompletedButton = document.querySelector(".clear-completed");
let filterOptions = document.querySelector(".filter-options");
let itemsLeft = document.querySelector(".items-left");

let userInput = "";

//Event listeners
// Lägg till item i listan
toDoForm.addEventListener("submit", addToDo);
// Ta bort item från listan
toDoList.addEventListener('click', deleteItem);
// Markera som färdigt när checkboxen klickas på 
toDoList.addEventListener('change', markAsCompleted);
// Markera alla tasks som färdiga/ofärdiga när den blåa knappen klickas
document.querySelector(".blue-button").addEventListener("click", toggleAll);
// Ta bort alla färdiga anteckningar
clearCompletedButton.addEventListener("click", clearCompleted);
//Filtrera val i choice-bar
filterOptions.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    let filter = event.target.textContent;
    filterTodos(filter);
  }
});


//Functions
// Funktion för att uppdatera hur många ofärdiga tasks som återstår
function updateItemsLeft() {
  let unfinishedTodos = document.querySelectorAll(".toDo:not(.completed)");
  itemsLeft.textContent = unfinishedTodos.length + " items left";
}

function addToDo(event) {
  event.preventDefault();

  userInput = toDoInput.value;

  // Skapar nya element från användarens input
  let toDoDiv = document.createElement("div");
  toDoDiv.classList.add("toDo");

  // Skapar checkbox och dess label
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'checkbox';
  checkbox.id = 'checkbox';
  checkbox.value = 'checkbox'; // Vet ej om vi behöver ha med value
  checkbox.classList.add("editCheckbox");

  let label = document.createElement('label');
  label.htmlFor = 'id';

  label.appendChild(document.createTextNode('')); // För visibility

  // Appending till vår nya div
  toDoDiv.appendChild(checkbox);
  toDoDiv.appendChild(label);

  // Skapar själva listan
  let newToDoItem = document.createElement("li");
  // newToDoItem.innerText = 'hello world!'; // detta dyker nu upp i debuggern åtminstone.
  newToDoItem.innerText = userInput;
  newToDoItem.classList.add("toDo-item");

  // Kopplar samman div och li
  toDoDiv.appendChild(newToDoItem);

  // Skapar ta bort knappen
  let removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.innerText = '❌';
  removeButton.classList.add("remove-button");
  toDoDiv.appendChild(removeButton);

  // Lägger in den nya diven i todoList som finns i html
  toDoList.appendChild(toDoDiv);

  toDoInput.value = '';

  // Anropar updateItemsLeft efter att en ny anteckning har lagts till
  updateItemsLeft();
}

function deleteItem(event) {
  let clickedItem = event.target;

  // Kontrollera om klicket var på kryssknappen
  if (clickedItem.classList.contains('remove-button')) {
    // hämtar parent element till den klickade deleteknappen och tar bort allt där i.
    clickedItem.parentElement.remove();
    // Anropar updateItemsLeft efter att en anteckning har tagits bort
    updateItemsLeft();
  }
}

// Togglar task som genomförd/icke genomförd
function markAsCompleted(event) {
  let checkbox = event.target;
  let todoItem = checkbox.parentElement;
  todoItem.classList.toggle('completed');
  // Anropar updateItemsLeft efter att en anteckning har markerats som färdig eller ofärdig
  updateItemsLeft();
}

// Funktion för att markera alla som färdiga/ofärdiga
function toggleAll() {
  let todos = document.querySelectorAll(".toDo");
  todos.forEach(todo => {
    let checkbox = todo.querySelector(".editCheckbox");
    checkbox.checked = event.target.checked;
    todo.classList.toggle('completed', event.target.checked);
  });

  // Anropar updateItemsLeft efter att alla anteckningar har markerats som färdiga eller ofärdiga
  updateItemsLeft();
}

// Funktion för att ta bort alla färdiga anteckningar
function clearCompleted() {
  let completedTodos = document.querySelectorAll(".completed");
  completedTodos.forEach(todo => {
    todo.remove();
  });

  // Anropa updateItemsLeft efter att alla färdiga anteckningar har tagits bort
  updateItemsLeft();
}

// Funktion för att filtrera 
function filterTodos(filter) {
  // Hämta alla todos (alla div-element med klassen "toDo")
  let todos = document.querySelectorAll(".toDo");

  // Loopa igenom varje todo
  todos.forEach(todo => {
    // Switchcase för alla filteralternativ
    switch (filter) {
      // Om filter är "All", visa alla todos genom att ändra display-stilen till "flex"
      case "All":
        todo.style.display = "flex";
        break;
      
      // Om filter är "Active", visa bara ofärdiga todos genom att kontrollera klassen "completed"
      // och ändra display-stilen baserat på om den har klassen "completed"
      case "Active":
        todo.classList.contains("completed") ? todo.style.display = "none" : todo.style.display = "flex";
        break;
      
      // Om filter är "Completed", visa bara färdiga todos genom att kontrollera klassen "completed"
      // och ändra display-stilen baserat på om den har klassen "completed"
      case "Completed":
        todo.classList.contains("completed") ? todo.style.display = "flex" : todo.style.display = "none";
        break;
    }
  });
}
