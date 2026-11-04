TaskFlow -- Task Management Web Application
TaskFlow is a simple and responsive task management web application that
helps users organize their daily work, manage priorities, and track
their productivity.
Features
- User registration and login with email and password.
- Task management: add, edit, delete, and mark tasks as completed.
- Task priorities: choose Low, Medium, or High priority.
- Due dates: optionally assign a deadline to each task.
- Task filters: view all tasks, pending tasks, or completed tasks.
- Dashboard statistics: view total, completed, and pending tasks.
- Progress tracking: see the percentage of completed tasks.
- User profile: view and edit personal information.
- Settings: enable or disable dark mode and task notifications.
- Multilingual interface: English, French, and Arabic language
  options.
Technologies Used
- HTML5 -- page structure.
- CSS3 -- layout, styling, and responsive design.
- JavaScript -- application logic and interactivity.
- Browser Local Storage -- stores users, tasks, and preferences
  locally.
Note: TaskFlow is a front-end project. It does not currently use a
backend server or a database. Data is stored in the browser's Local
Storage, so it is specific to the browser and device being used.

Project Structure
Task/
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── profile.html
├── settings.html
│
├── css/
│   ├── style.css
│   ├── auth.css
│   ├── dashboard.css
│   ├── profile.css
│   └── settings.css
│
└── js/
    ├── auth.js
    ├── dashboard.js
    ├── tasks.js
    ├── profile.js
    ├── settings.js
    └── i18n.js
Getting Started
1. Download or clone the project
git clone https://github.com/your-username/TaskFlow.git
Or download the ZIP file and extract it.
2. Open the project
Open the Task folder in Visual Studio Code.
3. Run the application
Open index.html in your browser.

For a better development experience, you can use the Live Server
extension in Visual Studio Code:
1. Install the Live Server extension.
2. Open index.html.
3. Right-click inside the file.
4. Select Open with Live Server.
How to Use
1. Open the home page.
2. Select Sign Up and create an account.
3. Log in with your email and password.
4. From the dashboard, click Add Task.
5. Enter a task title, choose its priority, and optionally set a due
   date.
6. Complete, edit, delete, or filter your tasks.
7. Visit Profile to view or update your account information.
8. Visit Settings to customize the application.
Data Storage
TaskFlow uses the browser's Local Storage:

  Data                      Local Storage key
  Registered users          taskflowUsers
  Current logged-in user    currentUser
  Tasks for each user       taskflowTasks_<userId>
  Dark mode preference      darkMode
  Notification preference   notifications
  Selected language         language

Clearing browser data or using another browser/device may remove or make
this locally stored data unavailable.
Important Security Note
This project is intended for learning and demonstration purposes.
Authentication is implemented on the client side, and passwords are
stored in Local Storage. It is not suitable for real users or
production use. A production application should use a secure backend,
a database, password hashing, and server-side authentication.
Future Improvements
- Connect the application to a backend and database.
- Implement secure authentication and password hashing.
- Add real task reminder notifications.
- Improve task search and sorting.
- Add charts and more detailed productivity reports.
- Complete and test translations across every page.
Author
Your Name
License
This project is available for educational purposes. Add a license file
if you plan to distribute or reuse it under specific terms
