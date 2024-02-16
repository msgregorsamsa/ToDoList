//Selectors from html
let toDoForm = document.querySelector(".todo-form");
let toDoInput = document.querySelector(".todo-input");
let toDoContainer = document.querySelector(".todo-container"); //Vet inte om vi faktikst behöver denna men skapar en för varje klass
let toDoList = document.querySelector(".todo-list");

let userInput = "";

// ...

//Event listeners
// Lägg till item i listan
toDoForm.addEventListener("submit", addToDo);
// Ta bort item från listan
toDoList.addEventListener('click', deleteItem);
// Markera som färdigt när checkboxen klickas på 
toDoList.addEventListener('change', markAsCompleted);

// ...

//Functions
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
}

function deleteItem(event) {
  let clickedItem = event.target;

  // Kontrollera om klicket var på kryssknappen
  if (clickedItem.classList.contains('remove-button')) {
    // hämtar parent element till den klickade deleteknappen och tar bort allt där i.
    clickedItem.parentElement.remove();
  }
}

function markAsCompleted(event) {
  let checkbox = event.target;
  let todoItem = checkbox.parentElement;
  todoItem.classList.toggle('completed');
}
