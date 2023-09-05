document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is already authenticated
    const isAuthenticated = checkAuthentication();

    if (isAuthenticated) {
        // Load the appropriate role-specific view
        loadRoleSpecificView();
    } else {
        // Load the login page
        loadView('views/login.html');

        // Send a POST request to the backend for login
        loginRequest(username, password)
        .then(response => {
            if (response.status === 200) {
                // Login successful, redirect or load the appropriate view
                loadRoleSpecificView();
            } else {
                // Handle login error (e.g., display an error message)
                console.error('Login failed');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
        });
    }
});
// Function to send a POST request for login
function loginRequest(username, password) {
    const loginData = {
        username: username,
        password: password
    };

    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });
}

// Function to check if the user is authenticated
function checkAuthentication() {
    // Implement logic to check if the user is authenticated
    // Return true if authenticated, false otherwise
    // You may use cookies, tokens, or sessions for authentication
}

// Function to load the appropriate role-specific view
function loadRoleSpecificView() {
    const userRole = getUserRole(); // Implement a function to determine the user's role
    
    switch (userRole) {
        case 'admin':
            loadView('views/admin.html');
            break;
        case 'teacher':
            loadView('views/teacher.html');
            break;
        case 'pupil':
            loadView('views/pupil.html');
            break;
        default:
            // Handle unknown or unauthorized roles
            break;
    }
}

// Function to load a view into the container
function loadView(viewPath) {
    const container = document.getElementById('view-container');
    
    fetch(viewPath)
        .then(response => response.text())
        .then(viewContent => {
            container.innerHTML = viewContent;
        })
        .catch(error => {
            console.error('Error loading view:', error);
        });
}
