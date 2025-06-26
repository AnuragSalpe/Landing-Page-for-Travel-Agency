// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Search form handling
const searchForm = document.querySelector('.trip-search');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const destination = document.getElementById('destination').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const travelers = document.getElementById('travelers').value;
    
    if (!destination || !checkin || !checkout) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Simulate search functionality
    alert(`Searching for adventures in ${destination} for ${travelers} from ${checkin} to ${checkout}`);
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    // Simulate newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
    e.target.querySelector('input[type="email"]').value = '';
});

// Destination card explore buttons
document.querySelectorAll('.explore-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.target.closest('.destination-card');
        const destination = card.querySelector('h3').textContent;
        alert(`Exploring ${destination}! This would normally take you to the destination details page.`);
    });
});

// Adventure type cards interaction
document.querySelectorAll('.adventure-card').forEach(card => {
    card.addEventListener('click', () => {
        const adventureType = card.querySelector('h3').textContent;
        alert(`Exploring ${adventureType} adventures! This would show related tours and packages.`);
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.destination-card, .feature, .testimonial, .adventure-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Set minimum date for date inputs to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('checkin').setAttribute('min', today);
document.getElementById('checkout').setAttribute('min', today);

// Update checkout minimum date when checkin changes
document.getElementById('checkin').addEventListener('change', (e) => {
    const checkinDate = e.target.value;
    document.getElementById('checkout').setAttribute('min', checkinDate);
});

// Horizontal scroll for adventure types on mobile
const adventureScroll = document.querySelector('.adventure-scroll');
let isDown = false;
let startX;
let scrollLeft;

adventureScroll.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - adventureScroll.offsetLeft;
    scrollLeft = adventureScroll.scrollLeft;
});

adventureScroll.addEventListener('mouseleave', () => {
    isDown = false;
});

adventureScroll.addEventListener('mouseup', () => {
    isDown = false;
});

adventureScroll.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - adventureScroll.offsetLeft;
    const walk = (x - startX) * 2;
    adventureScroll.scrollLeft = scrollLeft - walk;
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

