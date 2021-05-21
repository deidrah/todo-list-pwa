// First change the items declaration to use await

const items = await getItems();


// Then wrap the ENTIRE FILE in an anonymous async function


// Line 1
(async function() { 
  
// Last line in doc
})();

// Then replace getItems and saveItems with these

async function getItems() {
  const request = await fetch('https://todo-api-ff.azurewebsites.net/api/todo', {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      "userid": "myuserid"
    }
  });

  const itemsJson = (await request.text()) || "[]";
  return JSON.parse(itemsJson);
}

async function saveItems() {
  const data = JSON.stringify(items);      
  const request = await fetch('https://todo-api-ff.azurewebsites.net/api/todo', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        "userid": "myuserid"
      },
      body: data
  });
}
