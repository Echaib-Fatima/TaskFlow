// =========================
// TASKFLOW - TASKS
// =========================


// Get current user
const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);


// If there is no logged-in user
if (!currentUser) {
    window.location.href = "login.html";
}


// Get elements
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");

const tasksContainer = document.getElementById("tasksContainer");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const progressPercentage =
    document.getElementById("progressPercentage");


// =========================
// USER TASKS
// =========================

// Each user gets their own tasks
const storageKey = `taskflowTasks_${currentUser.id}`;


// Get saved tasks
let tasks = JSON.parse(
    localStorage.getItem(storageKey)
) || [];


// Current filter
let currentFilter = "all";


// =========================
// SAVE TASKS
// =========================

function saveTasks() {

    localStorage.setItem(
        storageKey,
        JSON.stringify(tasks)
    );
}


// =========================
// DISPLAY TASKS
// =========================

function displayTasks() {

    tasksContainer.innerHTML = "";


    // Filter tasks
    let filteredTasks = tasks;


    if (currentFilter === "todo") {

        filteredTasks = tasks.filter(
            task => !task.completed
        );
    }


    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(
            task => task.completed
        );
    }


    // Empty state
    if (filteredTasks.length === 0) {

        tasksContainer.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ✓
                </div>

                <h3>No tasks found</h3>

                <p>
                    Add a task to start organizing your day.
                </p>

            </div>
        `;

        updateStatistics();

        return;
    }


    // Create task cards
    filteredTasks.forEach(task => {

        const taskCard =
            document.createElement("div");

        taskCard.classList.add("task-card");


        // Priority class
        const priorityClass =
            task.priority.toLowerCase();


        taskCard.innerHTML = `

            <div class="task-info">

                <h3 class="${task.completed ? "completed-task" : ""}">
                    ${task.title}
                </h3>

                <p>
                    Priority:
                    <span class="priority ${priorityClass}">
                        ${task.priority}
                    </span>

                    ${
                        task.date
                            ? ` • Due: ${task.date}`
                            : ""
                    }
                </p>

            </div>


            <div class="task-actions">

                <button
                 onclick="toggleTask(${task.id})"
                >
                 ${task.completed ? "Undo" : "Complete"}
                </button>

                <button
                 onclick="editTask(${task.id})"
                >
                Edit
                </button>

                <button
                 onclick="deleteTask(${task.id})"
                >
                Delete
                </button>

            </div>
            `;


        tasksContainer.appendChild(taskCard);

    });


    updateStatistics();
}



// =========================
// ADD TASK
// =========================

if (taskForm) {

    taskForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                taskTitle.value.trim();


            // Don't add empty task
            if (!title) {

                alert("Please enter a task title.");

                return;
            }


            // Create task
            const newTask = {

                id: Date.now(),

                title: title,

                priority: taskPriority.value,

                date: taskDate.value,

                completed: false

            };


            // Add task
            tasks.push(newTask);


            // Save
            saveTasks();


            // Refresh
            displayTasks();


            // Reset form
            taskForm.reset();


            // Hide form
            const formContainer =
                document.getElementById(
                    "taskFormContainer"
                );

            if (formContainer) {

                formContainer.classList.add("hidden");

            }

        }
    );
}



// =========================
// COMPLETE / UNDO
// =========================

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;

    });


    saveTasks();

    displayTasks();
}



// =========================
// DELETE TASK
// =========================

function deleteTask(id) {

    tasks = tasks.filter(
        task => task.id !== id
    );


    saveTasks();

    displayTasks();
}

// =========================
// EDIT TASK
// =========================

function editTask(id) {

    const task = tasks.find(
        task => task.id === id
    );

    if (!task) {
        return;
    }


    // Edit title
    const newTitle = prompt(
        "Edit task title:",
        task.title
    );


    // Cancel
    if (newTitle === null) {
        return;
    }


    const cleanTitle = newTitle.trim();


    // Empty title
    if (!cleanTitle) {

        alert("Task title cannot be empty.");

        return;
    }


    // Edit priority
    const newPriority = prompt(
        "Priority: low, medium or high",
        task.priority
    );


    if (newPriority === null) {
        return;
    }


    const priority =
        newPriority.trim().toLowerCase();


    if (
        priority !== "low" &&
        priority !== "medium" &&
        priority !== "high"
    ) {

        alert(
            "Priority must be low, medium or high."
        );

        return;
    }


    // Update task
    tasks = tasks.map(task => {

        if (task.id === id) {

            return {
                ...task,
                title: cleanTitle,
                priority: priority
            };

        }

        return task;

    });


    // Save changes
    saveTasks();


    // Refresh tasks
    displayTasks();
}

// =========================
// FILTER TASKS
// =========================

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            // Remove active
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });


            // Activate clicked button
            this.classList.add("active");


            // Get filter
            currentFilter =
                this.dataset.filter;


            // Display
            displayTasks();

        }
    );

});



// =========================
// STATISTICS
// =========================

function updateStatistics() {

    const total = tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    // Update numbers
    if (totalTasks) {
        totalTasks.textContent = total;
    }

    if (completedTasks) {
        completedTasks.textContent = completed;
    }

    if (pendingTasks) {
        pendingTasks.textContent = pending;
    }


    // Calculate progress
    let progress = 0;


    if (total > 0) {

        progress =
            Math.round(
                (completed / total) * 100
            );

    }


    if (progressPercentage) {

        progressPercentage.textContent =
            `${progress}%`;

    }
}



// =========================
// INITIAL DISPLAY
// =========================

displayTasks();