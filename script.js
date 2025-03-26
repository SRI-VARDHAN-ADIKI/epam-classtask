
document.addEventListener('DOMContentLoaded', () => {

    const loginBox = document.getElementById('loginBox');
    const registerBox = document.getElementById('registerBox');
    const homePage = document.getElementById('homePage');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const logoutBtn = document.getElementById('logoutBtn');
    const welcomeUsername = document.getElementById('welcomeUsername');
    const lastLogin = document.getElementById('lastLogin');
    const accountCreated = document.getElementById('accountCreated');

    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginBox.style.display = 'none';
        registerBox.style.display = 'block';
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerBox.style.display = 'none';
        loginBox.style.display = 'block';
    });

  
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;


        if (!username || username.length < 3) {
            alert('Username must be at least 3 characters long');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email');
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }


        let users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.email === email)) {
            alert('Email already registered');
            return;
        }


        const user = {
            username,
            email,
            password,
            createdAt: new Date().toISOString(),
            lastLogin: null
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Registration successful! Please login.');
        registerForm.reset();
        registerBox.style.display = 'none';
        loginBox.style.display = 'block';
    });


    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert('Invalid email or password');
            return;
        }

  
        user.lastLogin = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));

        showHomePage(user);
    });


    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        homePage.style.display = 'none';
        loginBox.style.display = 'block';
    });


    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        showHomePage(currentUser);
    }

    function showHomePage(user) {
        loginBox.style.display = 'none';
        registerBox.style.display = 'none';
        homePage.style.display = 'block';
        welcomeUsername.textContent = user.username;
        lastLogin.textContent = user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'First login';
        accountCreated.textContent = new Date(user.createdAt).toLocaleString();
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});