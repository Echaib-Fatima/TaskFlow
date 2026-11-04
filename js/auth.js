// =========================
// TASKFLOW AUTHENTICATION
// =========================


// Get forms
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");


// =========================
// REGISTER
// =========================

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const terms = document.getElementById("terms").checked;


        // Check password
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }


        // Check terms
        if (!terms) {
            alert("Please accept the terms and conditions.");
            return;
        }


        // Get existing users
        const users = JSON.parse(
            localStorage.getItem("taskflowUsers")
        ) || [];


        // Check if email already exists
        const existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {
            alert("An account with this email already exists.");
            return;
        }


        // Create new user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password
        };


        // Add user
        users.push(newUser);


        // Save users
        localStorage.setItem(
            "taskflowUsers",
            JSON.stringify(users)
        );


        // Save current user
        localStorage.setItem(
            "currentUser",
            JSON.stringify(newUser)
        );


        // Go to dashboard
        window.location.href = "dashboard.html";
    });
}



// =========================
// LOGIN
// =========================

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get values
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;


        // Get users
        const users = JSON.parse(
            localStorage.getItem("taskflowUsers")
        ) || [];


        // Find user
        const user = users.find(
            user =>
                user.email === email &&
                user.password === password
        );


        // User not found
        if (!user) {
            alert("Incorrect email or password.");
            return;
        }


        // Save logged-in user
        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        // Go to dashboard
        window.location.href = "dashboard.html";
    });
}
// =========================
// SHOW / HIDE PASSWORD
// =========================

const passwordToggles =
    document.querySelectorAll(".toggle-password");

passwordToggles.forEach(button => {

    button.addEventListener("click", function () {

        const targetId =
            this.dataset.target;

        const passwordInput =
            document.getElementById(targetId);

        if (!passwordInput) return;

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            this.textContent = "🙈";

        } else {

            passwordInput.type = "password";

            this.textContent = "👁️";

        }

    });

});