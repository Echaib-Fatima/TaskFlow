// =========================
// TASKFLOW - DASHBOARD
// =========================


// =========================
// CHECK LOGIN
// =========================

const loggedInUser = JSON.parse(
    localStorage.getItem("currentUser")
);

if (!loggedInUser) {
    window.location.href = "login.html";
}


// =========================
// USER INFORMATION
// =========================

const userName = document.getElementById("userName");
const profileName = document.getElementById("profileName");
const userAvatar = document.getElementById("userAvatar");


// Display user's name
if (userName) {
    userName.textContent = loggedInUser.name;
}

if (profileName) {
    profileName.textContent = loggedInUser.name;
}


// Create avatar from first letter
if (userAvatar) {

    const firstLetter =
        loggedInUser.name.charAt(0).toUpperCase();

    userAvatar.textContent = firstLetter;
}


// =========================
// ADD TASK BUTTON
// =========================

const addTaskBtn =
    document.getElementById("addTaskBtn");

const taskFormContainer =
    document.getElementById("taskFormContainer");


if (addTaskBtn && taskFormContainer) {

    addTaskBtn.addEventListener(
        "click",
        function () {

            taskFormContainer.classList.toggle("hidden");

        }
    );
}


// =========================
// LOGOUT
// =========================

const logoutBtn =
    document.querySelector(".logout");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            localStorage.removeItem("currentUser");

            window.location.href = "index.html";

        }
    );
}
// =========================
// SETTINGS NAVIGATION
// =========================

const settingsLink =
    document.getElementById("settingsLink");

if (settingsLink) {

    settingsLink.addEventListener("click", function () {

        window.location.href = "./settings.html";

    });

}
// =========================
// DARK MODE
// =========================

const savedDarkMode = localStorage.getItem("darkMode");

if (savedDarkMode === "true") {
    document.body.classList.add("dark-mode");
}