function handleSubmit (event) {
  event.preventDefault()
  const titleEl = document.getElementById(`title`).value.trim()
  const dateEl = document.getElementById(`date`).value.trim()
  const describeEl = document.getElementById(`describe`).value.trim()
  if(!titleEl || !dateEl || !describeEl){
    const errorEl = document.getElementById("error")
    errorEl.textContent = "Please fill all fields"
    setTimeout(() => {
      errorEl.textContent = ""
    }, 3000);
    return;
  }
}


// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));



// Todo: create a function to generate a unique task id
function generateTaskId() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);

}
console.log(generateTaskId()) 

// Todo: create a function to create a task card
function createTaskCard(task) {
  return `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${titleEl}</h5>
          <p class="card-text">${describeEl}</p>
          <p class="card-text">${dateEl}</p>

        </div>
      </div>
    `;


}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

// date picker for form
$(document).ready(function(){
  $('#datepicker').datepicker();
});