
// =========================
// TASKFLOW - PROFILE
// =========================


// =========================
// CHECK LOGIN
// =========================

let currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

if (!currentUser) {
    window.location.href = "login.html";
}


// =========================
// GET ELEMENTS
// =========================

const profileAvatar =
    document.getElementById("profileAvatar");

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const nameInput =
    document.getElementById("nameInput");

const emailInput =
    document.getElementById("emailInput");

const editProfileBtn =
    document.getElementById("editProfileBtn");

const profileTotalTasks =
    document.getElementById("profileTotalTasks");

const profileCompletedTasks =
    document.getElementById("profileCompletedTasks");

const profilePendingTasks =
    document.getElementById("profilePendingTasks");


// =========================
// LOAD PROFILE
// =========================

function loadProfile() {

    profileName.textContent =
        currentUser.name;

    profileEmail.textContent =
        currentUser.email;

    nameInput.value =
        currentUser.name;

    emailInput.value =
        currentUser.email;

    profileAvatar.textContent =
        currentUser.name
            .charAt(0)
            .toUpperCase();


    updateProfileStatistics();
}


// =========================
// PROFILE STATISTICS
// =========================

function updateProfileStatistics() {

    const storageKey =
        `taskflowTasks_${currentUser.id}`;

    const tasks = JSON.parse(
        localStorage.getItem(storageKey)
    ) || [];


    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    profileTotalTasks.textContent =
        total;

    profileCompletedTasks.textContent =
        completed;

    profilePendingTasks.textContent =
        pending;
}


// =========================
// EDIT PROFILE
// =========================

editProfileBtn.addEventListener(
    "click",
    function () {

        // Start editing
        if (editProfileBtn.textContent === "Edit Profile") {

            nameInput.removeAttribute("readonly");

            emailInput.removeAttribute("readonly");

            nameInput.focus();

            editProfileBtn.textContent =
                "Save Changes";

            return;
        }


        // Get new values
        const newName =
            nameInput.value.trim();

        const newEmail =
            emailInput.value.trim();


        // Validate name
        if (!newName) {

            alert("Please enter your name.");

            return;
        }


        // Validate email
        if (!newEmail) {

            alert("Please enter your email.");

            return;
        }


        // Get all users
        const users = JSON.parse(
            localStorage.getItem("taskflowUsers")
        ) || [];


        // Update user
        const userIndex =
            users.findIndex(
                user => user.id === currentUser.id
            );


        if (userIndex !== -1) {

            users[userIndex].name =
                newName;

            users[userIndex].email =
                newEmail;


            // Save users
            localStorage.setItem(
                "taskflowUsers",
                JSON.stringify(users)
            );


            // Update current user
            currentUser =
                users[userIndex];

            localStorage.setItem(
                "currentUser",
                JSON.stringify(currentUser)
            );


            // Reload profile
            loadProfile();


            // Disable editing
            nameInput.setAttribute(
                "readonly",
                true
            );

            emailInput.setAttribute(
                "readonly",
                true
            );

            editProfileBtn.textContent =
                "Edit Profile";


            alert("Profile updated successfully.");
        }
    }
);


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

            localStorage.removeItem(
                "currentUser"
            );

            window.location.href =
                "index.html";
        }
    );
}


// =========================
// INITIALIZE
// =========================

loadProfile();


// =========================
// DARK MODE
// =========================

const savedDarkMode =
    localStorage.getItem("darkMode");

if (savedDarkMode === "true") {

    document.body.classList.add("dark-mode");
}
