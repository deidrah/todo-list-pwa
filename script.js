if (location.protocol == 'http:') {
  location.protocol = 'https:';
}

const taskInput = document.getElementById("new");
const addButton = document.getElementById("add");
const tasks = document.getElementById("tasks");

taskInput.addEventListener('keyup', processKeyPress);
addButton.addEventListener('click', addNewItem);

const items = getItems();

// Render any previously saved items
items.forEach(item => { 
  tasks.appendChild(createElementForTask(item));  
});

function processKeyPress(e) {
  addButton.disabled = e.target.value.trim() === "";
  if (e.key === "Enter") {
      addNewItem();
  }
}

function getItems() {
  const noItemsFound = "[]";  // stringified empty array (because local storage always returns a string)
  const itemsJson = localStorage.getItem("items") || noItemsFound;
  return JSON.parse(itemsJson);
}

function saveItems() {
  const data = JSON.stringify(items);
  localStorage.setItem("items", data);
}

function createElementForTask(item) {
  const template = document.getElementById("taskTemplate");
  const newListItem = template.content.cloneNode(true);
  
  const checkbox = newListItem.querySelector(".item-check");
  const text = newListItem.querySelector(".item-text");
  const deleteButton = newListItem.querySelector(".delete");
  
  text.innerText = item.value;

  checkbox.checked = item.complete;
  checkbox.onchange = (e) => {
      item.complete = true;
      saveItems();
  };

  deleteButton.onclick = (e) => {
    e.target.closest('li').remove();
    items.splice(items.indexOf(item), 1);
    saveItems();
  };
  
  return newListItem;
}

function addNewItem() {
    const task = {
        value: taskInput.value,
        complete: false
    };

    items.push(task);
    saveItems();

    let newItem = createElementForTask(task);
    tasks.appendChild(newItem);
    taskInput.value = "";
    taskInput.focus();
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
