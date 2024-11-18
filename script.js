document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});




const loginSection = document.getElementById('login-section');
const appSection = document.getElementById('app-section');
const usernameInput = document.getElementById('username');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userDisplay = document.getElementById('user-display');
const themeToggleBtn = document.getElementById('theme-toggle');
const filterSelect = document.getElementById('filter-select');


document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    loadTheme();
    loadFilter();
});

loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        localStorage.setItem('username', username);
        loginSection.style.display = 'none';
        appSection.style.display = 'block';
        userDisplay.textContent = username;
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    checkLoginStatus();
});

function checkLoginStatus() {
    const username = localStorage.getItem('username');
    if (username) {
        userDisplay.textContent = username;
        loginSection.style.display = 'none';
        appSection.style.display = 'block';
    } else {
        loginSection.style.display = 'block';
        appSection.style.display = 'none';
    }
}


themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme + '-mode');
}


filterSelect.addEventListener('change', () => {
    localStorage.setItem('filter', filterSelect.value);
    updateResults();
});

function loadFilter() {
    const savedFilter = localStorage.getItem('filter') || 'all';
    filterSelect.value = savedFilter;
    updateResults();
}

function updateResults() {
 
    console.log(`Current filter: ${filterSelect.value}`);
}






















document.addEventListener('DOMContentLoaded', () => {
    // Sections
    const authSection = document.getElementById('auth-section');
    const profileSection = document.getElementById('profile-section');

    // Forms
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');

    // Profile Display Elements
    const userNameDisplay = document.getElementById('user-name');
    const userEmailDisplay = document.getElementById('user-email');
    const userPhoneDisplay = document.getElementById('user-phone');

    // Local Storage Keys
    const USERS_KEY = 'users';
    const CURRENT_USER_KEY = 'currentUser';

    // Check Authentication Status
    const checkAuthStatus = () => {
        const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
        if (currentUser) {
            showProfile(currentUser);
        } else {
            showAuthForms();
        }
    };

    // Show Profile Section
    const showProfile = (user) => {
        authSection.style.display = 'none';
        profileSection.style.display = 'block';
        userNameDisplay.textContent = user.name;
        userEmailDisplay.textContent = user.email;
        userPhoneDisplay.textContent = user.phone;
    };

    // Show Auth Forms
    const showAuthForms = () => {
        authSection.style.display = 'block';
        profileSection.style.display = 'none';
    };

    // Handle Sign Up
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        const phone = document.getElementById('signup-phone').value.trim();

        if (!validateSignupForm(name, email, password, phone)) return;

        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        if (users.some((user) => user.email === email)) {
            alert('Email is already registered!');
            return;
        }

        users.push({ name, email, password, phone });
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        alert('Account created successfully!');
        signupForm.reset();
    });

    // Handle Log In
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        const user = users.find((user) => user.email === email && user.password === password);

        if (!user) {
            alert('Invalid email or password!');
            return;
        }

        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        showProfile(user);
    });

    // Handle Log Out
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem(CURRENT_USER_KEY);
        showAuthForms();
    });

    // Validate Sign Up Form
    const validateSignupForm = (name, email, password, phone) => {
        if (!name || !email || !password || !phone) {
            alert('All fields are required!');
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Invalid email format!');
            return false;
        }

        if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            alert(
                'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character!'
            );
            return false;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert('Phone number must be 10 digits long!');
            return false;
        }

        return true;
    };

    // Initialize Page
    checkAuthStatus();
});