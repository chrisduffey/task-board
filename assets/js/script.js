// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

function handleSubmit(event) {
  event.preventDefault()
  const titleEl = $(`#taskTitle`).val().trim()
  const dateEl = $(`#taskDate`).val().trim()
  const describeEl = $(`#taskDescription`).val().trim()
  if (!titleEl || !dateEl || !describeEl) {
    const errorEl = $("#error")
    errorEl.text("Please fill all fields")
    setTimeout(() => {
      errorEl.text("")
    }, 3000);
    return;
  }
  const task = {
    id: generateTaskId(), title: titleEl, description: describeEl, dueDate: dateEl, status: "to-do"
  }
  taskList.push(task)
  localStorage.setItem("tasks", JSON.stringify(taskList))
  $(`#taskTitle`).val("")
  $(`#taskDate`).val("")
  $(`#taskDescription`).val("")
  renderTaskList()
}






// Todo: create a function to generate a unique task id
function generateTaskId() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);

}
console.log(generateTaskId())

// Todo: create a function to create a task card
function createTaskCard(task) {
  const card = $("<div>").addClass("card task-card").attr("data-id", task.id)
  const header = $("<div>").addClass("card-header h4").text(task.title)
  const body = $("<div>").addClass("card-body")
  const description = $("<p>").addClass("card-text").text(task.description)
  const dueDate = $("<p>").addClass("card-text").text(task.dueDate)
  const deletebtn = $("<button>").addClass("btn btn-danger delete").attr("data-id", task.id).text("delete")
  deletebtn.on("click", handleDeleteTask)
  
  if (task.status !== "done") {
    const today = dayjs()
    const taskDueDate = dayjs(task.dueDate, "DD/MM/YYYY")
    if (today.isSame(taskDueDate, "day")) {
      card.addClass("bg-warning text-white")
    }
    else if (today.isAfter(taskDueDate)) {
      card.addClass("bg-danger text-white")
    }
  }
  body.append(description, dueDate, deletebtn)
  card.append(header, body)
  return card

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $("#todo-cards").empty()
  $("#in-progress-cards").empty()
  $("#done-cards").empty()
  taskList.forEach(task => {
    if (task.status === "to-do") {
      $("#todo-cards").append(createTaskCard(task))
    }
    else if (task.status === "in-progress") {
      $("#in-progress-cards").append(createTaskCard(task))
    }
    else {
      $("#done-cards").append(createTaskCard(task))
    }
  });
  $('.task-card').draggable({
    opacity: 0.7,
    zIndex: 100,

    // function to clone the card being dragged so that the original card remains in place
    helper: function (e) {
      // check of the target of the drag event is the card itself or a child element if it is the card itself, clone it, otherwise find the parent card and clone that
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        maxWidth: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    let dataId = $(this).attr("#data-id")
    console.log($(this).attr("#data-id"))
  taskList = taskList.filter(function(task) {
    return task.id !== dataId;
  }) 
  localStorage.setItem(`tasks`, JSON.stringify(taskList));
  renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  console.log(ui)
  // get the task id and new status from the event
  const taskId = ui.draggable[0].dataset.id;
  console.log(taskId)
  const newStatus = event.target.id;
  console.log(newStatus)
  for (let task of taskList) {
    // update the task status of the dragged card
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  // save and render
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker


// date picker for form
$(document).ready(function () {
  $('#datepicker').datepicker();
  renderTaskList()
  $('.lane').droppable({
    accept: '.task-card',
    drop: handleDrop,
  });
  $("#taskForm").on("submit", handleSubmit)
  $("#btn btn-danger delete").on("click", handleSubmit)
  
});