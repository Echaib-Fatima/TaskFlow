// =========================
// TASKFLOW - SETTINGS
// =========================


// =========================
// ELEMENTS
// =========================

const darkModeToggle = document.getElementById("darkModeToggle");
const notificationsToggle = document.getElementById("notificationsToggle");
const clearTasksBtn = document.getElementById("clearTasksBtn");


// =========================
// LOAD SETTINGS
// =========================

const savedDarkMode = localStorage.getItem("darkMode");
const savedNotifications = localStorage.getItem("notifications");


// Dark Mode
if (savedDarkMode === "true") {
    darkModeToggle.checked = true;
    document.body.classList.add("dark-mode");
}


// Notifications
if (savedNotifications === "false") {
    notificationsToggle.checked = false;
} else {
    notificationsToggle.checked = true;
}


// =========================
// DARK MODE
// =========================

if (darkModeToggle) {

    darkModeToggle.addEventListener("change", function () {

        if (this.checked) {

            document.body.classList.add("dark-mode");

            localStorage.setItem("darkMode", "true");

        } else {

            document.body.classList.remove("dark-mode");

            localStorage.setItem("darkMode", "false");

        }

    });

}


// =========================
// NOTIFICATIONS
// =========================

if (notificationsToggle) {

    notificationsToggle.addEventListener("change", function () {

        if (this.checked) {

            localStorage.setItem("notifications", "true");

        } else {

            localStorage.setItem("notifications", "false");

        }

    });

}


// =========================
// CLEAR ALL TASKS
// =========================

if (clearTasksBtn) {

    clearTasksBtn.addEventListener("click", function () {

        const confirmation = confirm(
            "Are you sure you want to delete all your tasks?"
        );

        if (!confirmation) {
            return;
        }

        localStorage.removeItem("tasks");

        alert("All tasks have been cleared.");

    });

}