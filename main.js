//Selectors from html
let toDoForm = document.querySelector('.todo-form');
let toDoInput = document.querySelector('.todo-input');
let toDoContainer = document.querySelector('.todo-container'); //Vet inte om vi faktikst behöver denna men skapar en för varje klass
let toDoList = document.querySelector('.todo-list');

//globala värden
let userInput = toDoInput.value;



//Event listeners
toDoForm.addEventListener('submit', addToDo);

//Functions

function addToDo(event){
    event.preventDefault();

    //Skapar nya element från användarens input
    let toDoDiv = document.createElement('div');
    toDoDiv.classList.add('toDo');

    // //Skapar checkbox och dess label
    // let checkbox = document.createElement('input');
    // checkbox.type = 'checkbox';
    // checkbox.name = 'checkbox';
    // checkbox.id = 'checkbox';
    // checkbox.value = 'checkbox'; // Vet ej om vi behöver ha med value
   
    // let label = document.createElement('label');
    // label.htmlFor = 'id';

    // label.appendChild(document.createTextNode('Label for checkbox')); // För visibility

    // //Appending till vår nya div
    // toDoDiv.appendChild(checkbox);
    // toDoDiv.appendChild(label);

    //Skapar själva listan
    let newToDoItem = document.createElement('li');
    newToDoItem.innerText = 'hello world!';
    // newToDoItem.innerText = userInput; Ändra till sedan
    newToDoItem.classList.add('toDo-item');

    //Kopplar samman div och li.
    toDoDiv.appendChild(newToDoItem); 


    //Skapar ta bort knappen
    let removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');  //ändra till emoji i css
    toDoDiv.appendChild(removeButton);

    //Lägger in den nya diven i todoList som finns i html
    toDoList.appendChild(toDoDiv);
}
