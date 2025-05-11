document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle the navigation menu's visibility
    function toggleMenu() {
        const menu = document.querySelector('.navigation-menu');
        menu.classList.toggle('visible');
    }

    // Add event listener to the hamburger icon
    // const hamburgerIcon = document.querySelector('.hamburger-icon');
    // if (hamburgerIcon) {
    //     hamburgerIcon.addEventListener('click', toggleMenu);
    // } else {
    //     console.warn('Hamburger icon not found in the DOM.');
    // }

    // Implement smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navigation-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Filter projects by category
    function filterProjects(category) {
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {
            if (category === 'all' || project.dataset.category === category) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
        console.log('Filter button clicked:', category);
    }

    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove "active" class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add "active" class to the clicked button
            button.classList.add('active');

            const category = button.dataset.category;
            filterProjects(category);
            console.log('Filter applied:', category);
        });
    });

    // Lightbox effect for project images
    function openLightbox(imageSrc) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imageSrc}" alt="Project Image">
                <button class="close-lightbox">Close</button>
            </div>
        `;
        document.body.appendChild(lightbox);

        console.log('Lightbox opened with image:', imageSrc);

        // Close lightbox on button click
        lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
    }

    // Add event listeners to project images
    const projectImages = document.querySelectorAll('.project img');
    projectImages.forEach(image => {
        image.addEventListener('click', () => {
            openLightbox(image.src);
        });
    });

    // Form validation for the "Contact" form
    const contactForm = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.color = 'red';
    }

    function clearError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = '';
    }

    contactForm.addEventListener('submit', (event) => {
        let isValid = true;

        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required.');
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Validate message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required.');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        console.log('Form validation status:', isValid);

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });

    // Real-time validation
    [nameInput, emailInput, messageInput].forEach((input) => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                clearError(input);
            }
        });
    });
});