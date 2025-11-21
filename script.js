90-[]
 // Global Variables
let matrixCanvas, matrixCtx;
let matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
let matrixDrops = [];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMatrix();
    initializeNavigation();
    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeCounters();
    initializeContactForm();
    
    // Smooth scroll for anchor links
    initializeSmoothScroll();
});

// Matrix Background Animation
function initializeMatrix() {
    matrixCanvas = document.getElementById('matrix-canvas');
    matrixCtx = matrixCanvas.getContext('2d');
    
    function resizeMatrix() {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        
        const columns = matrixCanvas.width / 20;
        matrixDrops = [];
        
        for (let x = 0; x < columns; x++) {
            matrixDrops[x] = 1;
        }
    }
    
    function drawMatrix() {
        matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        matrixCtx.fillStyle = '#00ff41';
        matrixCtx.font = '15px Fira Code, monospace';
        
        for (let i = 0; i < matrixDrops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            matrixCtx.fillText(text, i * 20, matrixDrops[i] * 20);
            
            if (matrixDrops[i] * 20 > matrixCanvas.height && Math.random() > 0.975) {
                matrixDrops[i] = 0;
            }
            matrixDrops[i]++;
        }
    }
    
    resizeMatrix();
    setInterval(drawMatrix, 35);
    
    window.addEventListener('resize', resizeMatrix);
}

// Navigation Functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Typing Animation
function initializeTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const commands = [
        'whoami',
        'ls -la /home/ishant',
        'cat welcome.txt',
        'nmap -sV target.com',
        'python3 exploit.py',
        'echo "Welcome to HackWithIshant"'
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeCommand() {
        const currentCommand = commands[commandIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentCommand.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            typeSpeed = 500; // Pause before next command
        }
        
        setTimeout(typeCommand, typeSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeCommand, 1000);
}

// Smooth Scroll Implementation
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll-triggered Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// Skill Bar Animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 500);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Counter Animations
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Validate form
        if (validateForm(formObject)) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('focus', function() {
            clearFieldError(this);
        });
    });
}

function validateForm(formData) {
    let isValid = true;
    const form = document.getElementById('contact-form');
    
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(error => error.remove());
    form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    
    // Validate name
    if (!formData.name || formData.name.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!formData.subject || formData.subject.trim().length < 3) {
        showFieldError('subject', 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    // Validate message
    if (!formData.message || formData.message.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    clearFieldError(field);
    
    switch(field.name) {
        case 'name':
            if (value.length < 2) {
                showFieldError(field.name, 'Name must be at least 2 characters long');
                isValid = false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field.name, 'Please enter a valid email address');
                isValid = false;
            }
            break;
        case 'subject':
            if (value.length < 3) {
                showFieldError(field.name, 'Subject must be at least 3 characters long');
                isValid = false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError(field.name, 'Message must be at least 10 characters long');
                isValid = false;
            }
            break;
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--primary-color)';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.5rem';
    
    formGroup.appendChild(errorElement);
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    field.classList.remove('error');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? 'var(--primary-color)' : '#ff4444',
        color: 'white',
        borderRadius: '5px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-primary)',
        fontWeight: '500',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Glitch Effect for Text Elements
function addGlitchEffect(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let iterations = 0;
    const maxIterations = 10;
    
    const glitchInterval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
        
        iterations += 1;
        
        if (iterations > maxIterations) {
            clearInterval(glitchInterval);
            element.textContent = originalText;
        }
    }, 50);
}

// Add glitch effect to section titles on scroll
document.addEventListener('scroll', function() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementHeight = element.clientHeight;
        const viewportHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > elementTop - viewportHeight && scrollTop < elementTop + elementHeight) {
            if (!element.classList.contains('glitched')) {
                element.classList.add('glitched');
                addGlitchEffect(element);
            }
        }
    });
});

// Particle System for Interactive Elements
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            
            this.createParticle(this.mouse.x, this.mouse.y);
        });
        
        this.animate();
    }
    
    createParticle(x, y) {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
            decay: 0.02,
            size: Math.random() * 3 + 1,
            color: Math.random() > 0.5 ? '#ff0040' : '#00ffff'
        };
        
        this.particles.push(particle);
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Easter Eggs and Hidden Features
document.addEventListener('keydown', function(e) {
    // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    if (!window.konamiProgress) window.konamiProgress = 0;
    
    if (e.code === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        if (window.konamiProgress === konamiCode.length) {
            activateHackerMode();
            window.konamiProgress = 0;
        }
    } else {
        window.konamiProgress = 0;
    }
});

function activateHackerMode() {
    // Activate special visual effects
    document.body.style.filter = 'hue-rotate(180deg) contrast(1.2)';
    
    // Show special message
    showNotification('HACKER MODE ACTIVATED! 🔥', 'success');
    
    // Add matrix rain to all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.position = 'relative';
        section.style.overflow = 'hidden';
        
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.1';
        canvas.style.zIndex = '1';
        
        section.appendChild(canvas);
        new ParticleSystem(canvas);
    });
    
    // Reset after 10 seconds
    setTimeout(() => {
        document.body.style.filter = '';
        document.querySelectorAll('section canvas').forEach(canvas => {
            canvas.remove();
        });
        showNotification('Hacker mode deactivated', 'success');
    }, 10000);
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Preload images and resources
function preloadResources() {
    const imageSources = [
        // Add any image URLs here if needed
    ];
    
    imageSources.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadResources();

// Service Worker Registration (for offline capability)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Analytics and User Interaction Tracking
function trackUserInteraction(action, element) {
    // Track user interactions for analytics
    console.log(`User interaction: ${action} on ${element}`);
    
    // You can send this data to analytics services
    // Example: gtag('event', action, { 'element': element });
}

// Add interaction tracking to important elements
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-link, .project-link, .social-link').forEach(element => {
    element.addEventListener('click', function() {
        trackUserInteraction('click', this.className);
    });
});

// Terminal Commands Simulation
const terminalCommands = {
    help: 'Available commands: help, about, skills, contact, clear, hack',
    about: 'Ethical Hacker & Penetration Tester passionate about cybersecurity',
    skills: 'Python, Bash, Go, C/C++, JavaScript | Nmap, Burp Suite, Metasploit, Wireshark',
    contact: 'Email: hackwithishant@protonmail.com',
    clear: '',
    hack: 'Access granted. Welcome to the Ishant kumar portfolio. Type "help" for commands.',
};

// Add terminal functionality to the hero section
function initializeTerminalInteraction() {
    const terminalBody = document.querySelector('.terminal-body');
    
    terminalBody.addEventListener('click', function() {
        const input = prompt('Enter command (type "help" for available commands):');
        if (input) {
            const command = input.toLowerCase().trim();
            const response = terminalCommands[command] || `Command not found: ${command}`;
            
            // Create new terminal line
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            newLine.innerHTML = `
                <span class="prompt">root@hackwithishant:~$</span>
                <span class="command">${input}</span>
            `;
            
            const outputLine = document.createElement('div');
            outputLine.className = 'output-line';
            outputLine.style.color = command === 'hack' ? '#ff0040' : '#00ffff';
            outputLine.textContent = response;
            
            if (command === 'clear') {
                terminalBody.innerHTML = `
                    <div class="terminal-line">
                        <span class="prompt">root@hackwithishant:~$</span>
                        <span class="command" id="typing-text"></span>
                        <span class="cursor">|</span>
                    </div>
                    <div class="output-line">
                        <div class="welcome-message">
                            <h1 class="hero-title glitch-text" data-text="WELCOME TO HACKWITHISHANT">WELCOME TO HACKWITHISHANT</h1>
                            <p class="hero-subtitle">ETHICAL HACKER & PENETRATION TESTER</p>
                            <p class="hero-tagline">CODE. HACK. DEFEND.</p>
                        </div>
                    </div>
                `;
                initializeTypingAnimation();
            } else {
                terminalBody.appendChild(newLine);
                terminalBody.appendChild(outputLine);
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        }
    });
}

// Initialize terminal interaction
setTimeout(initializeTerminalInteraction, 2000);

console.log(`
██╗  ██╗ █████╗  ██████╗██╗  ██╗██╗    ██╗██╗████████╗██╗  ██╗██╗███████╗██╗  ██╗ █████╗ ███╗   ██╗████████╗
██║  ██║██╔══██╗██╔════╝██║ ██╔╝██║    ██║██║╚══██╔══╝██║  ██║██║██╔════╝██║  ██║██╔══██╗████╗  ██║╚══██╔══╝
███████║███████║██║     █████╔╝ ██║ █╗ ██║██║   ██║   ███████║██║███████╗███████║███████║██╔██╗ ██║   ██║   
██╔══██║██╔══██║██║     ██╔═██╗ ██║███╗██║██║   ██║   ██╔══██║██║╚════██║██╔══██║██╔══██║██║╚██╗██║   ██║   
██║  ██║██║  ██║╚██████╗██║  ██╗╚███╔███╔╝██║   ██║   ██║  ██║██║███████║██║  ██║██║  ██║██║ ╚████║   ██║   
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   

Welcome to my portfolio! Type 'help' in the terminal for hidden commands.
`);
