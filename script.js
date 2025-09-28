// MATRIX RAIN EFFECT
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
const charArray = chars.split('');

const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

// RESIZE CANVAS
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// CUSTOM CURSOR
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', (e) => {
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top = e.clientY + 'px';
});

// MOBILE MENU
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const spans = mobileMenu.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navLinks.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navLinks.classList.remove('active');
        }
    });
});

// TYPING EFFECT
const typingElement = document.querySelector('.typing-text');
const commands = [
    'npx create-react-app portfolio',
    'npm install typescript @types/react',
    'git clone https://github.com/dev/project.git',
    'python -m pip install tensorflow pandas',
    'docker build -t myapp:latest .',
    'aws s3 cp dist/ s3://my-bucket --recursive',
    'npm run dev --host 0.0.0.0',
    'git push origin feature/new-component',
    'node server.js --port=3000',
    'sass src/styles.scss dist/styles.css',
    'code . --goto package.json:15',
];

let commandIndex = 0;
let charIndex = 0;
let currentCommand = '';
let isDeleting = false;

function typeWriter() {
    const current = commands[commandIndex];
    
    if (isDeleting) {
        currentCommand = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        currentCommand = current.substring(0, charIndex + 1);
        charIndex++;
    }
    
    typingElement.textContent = currentCommand;
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typing effect
setTimeout(typeWriter, 1000);

// SKILL BARS ANIMATION
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItem = entry.target;
            const skillLevel = skillItem.getAttribute('data-skill');
            const progressBar = skillItem.querySelector('.skill-progress');
            
            setTimeout(() => {
                progressBar.style.width = skillLevel + '%';
            }, 500);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});

// GLITCH EFFECT
function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.style.animation = 'glitch 0.3s';
                setTimeout(() => {
                    element.style.animation = '';
                }, 300);
            }
        }, 2000);
    });
}

addGlitchEffect();

// HEADER SCROLL EFFECT
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 255, 65, 0.3)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
        header.style.boxShadow = 'none';
    }
    
    // Hide/show header on scroll
    if (window.scrollY > lastScrollY && window.scrollY > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = window.scrollY;
});

// CONTACT MODAL
const contactModal = document.getElementById('contact-modal');
const openModalBtn = document.getElementById('open-contact-modal');
const closeModalBtn = document.getElementById('close-contact-modal');

if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
        contactModal.classList.add('active');
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        contactModal.classList.remove('active');
    });
}

// Close modal if overlay is clicked
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.remove('active');
    }
});

// CONTACT FORM
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const terminalBody = document.getElementById('modal-terminal-body');
    const submitButton = contactForm.querySelector('.execute-btn');
    
    // Show loading message
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'terminal-message loading';
    loadingDiv.innerHTML = `
        <div class="status-line">
            <div class="status-icon loading"></div>
            <span class="cmd-prompt">C:\\Contact></span>
            <span>Ejecutando send_message.bat...</span>
        </div>
        <div class="status-line">
            <span style="color: var(--cyber-blue);">[●]</span>
            <span>Validando campos de entrada</span>
        </div>
        <div class="status-line">
            <span style="color: var(--cyber-blue);">[●]</span>
            <span>Estableciendo conexión SSL</span>
        </div>
        <div class="status-line">
            <span style="color: var(--cyber-blue);">[●]</span>
            <span>Procesando mensaje...</span>
        </div>
    `;
    terminalBody.appendChild(loadingDiv);
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.style.opacity = '0.6';

    // Hide form and direct links during submission
    contactForm.style.display = 'none';
    document.querySelector('.modal-contact-links').style.display = 'none';
    
    try {
        // Send form data to Formspree
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        // Remove loading message
        loadingDiv.remove();
        
        const outputDiv = document.createElement('div');
        outputDiv.className = 'output';
        
        if (response.ok) {
            // Success message with terminal styling
            outputDiv.innerHTML = `
                <div class="terminal-message success">
                    <div class="message-header">
                        <span class="status-icon">●</span>
                        <span class="status-text">OPERACIÓN EXITOSA</span>
                    </div>
                    <div class="message-content">
                        <div class="cmd-line">
                            <span class="cmd-prompt">C:\\Contact></span>
                            <span class="cmd-text">validate_connection</span>
                        </div>
                        <div class="cmd-output">
                            [✓] Validación completada<br>
                            [✓] Conexión establecida<br>
                            [✓] Mensaje enviado exitosamente
                        </div>
                        
                        <div class="cmd-line">
                            <span class="cmd-prompt">C:\\Contact></span>
                            <span class="cmd-text">status</span>
                        </div>
                        <div class="cmd-output">
                            Estado: <span class="highlight">DELIVERY_CONFIRMED</span><br>
                            Tiempo de respuesta: <span class="warning">~24 horas</span>
                        </div>
                        
                        <div class="cmd-line">
                            <span class="cmd-prompt">C:\\Contact></span>
                            <span class="cmd-text">echo "¡Gracias por contactarme!"</span>
                        </div>
                        <div class="cmd-output success-text">¡Gracias por contactarme!</div>
                    </div>
                </div>
            `;
            
            // Reset form after success
            contactForm.reset();
        } else {
            // Error message with terminal styling
            outputDiv.innerHTML = `
                <div class="terminal-message error">
                    <div class="message-header">
                        <span class="status-icon">●</span>
                        <span class="status-text">ERROR DE SISTEMA</span>
                    </div>
                    <div class="message-content">
                        <div class="cmd-line">
                            <span class="cmd-prompt">C:\\Contact></span>
                            <span class="cmd-text">send_message</span>
                        </div>
                        <div class="cmd-output">
                            [✗] Error en el envío<br>
                            Estado: <span class="error-text">DELIVERY_FAILED</span>
                        </div>
                        
                        <div class="cmd-line">
                            <span class="cmd-prompt">C:\\Contact></span>
                            <span class="cmd-text">echo "Por favor, intenta nuevamente"</span>
                        </div>
                        <div class="cmd-output error-text">Por favor, intenta nuevamente</div>
                    </div>
                </div>
            `;
        }
        
        terminalBody.appendChild(outputDiv);
        
        // Remove output after 8 seconds
        setTimeout(() => {
            outputDiv.remove();
            // Show form and links again
            contactForm.style.display = 'block';
            document.querySelector('.modal-contact-links').style.display = 'block';
            // Close modal on success
            if(response.ok) contactModal.classList.remove('active');

        }, 8000);
        
    } catch (error) {
        // Network error
        loadingDiv.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'output';
        errorDiv.innerHTML = `
            <div class="terminal-message error">
                <div class="message-header">
                    <span class="status-icon">●</span>
                    <span class="status-text">ERROR DE CONEXIÓN</span>
                </div>
                <div class="message-content">
                    <div class="cmd-line">
                        <span class="cmd-prompt">C:\\Contact></span>
                        <span class="cmd-text">ping server</span>
                    </div>
                    <div class="cmd-output">
                        [✗] Error de conexión<br>
                        Estado: <span class="error-text">NETWORK_ERROR</span>
                    </div>
                    
                    <div class="cmd-line">
                        <span class="cmd-prompt">C:\\Contact></span>
                        <span class="cmd-text">echo "Verifica tu conexión a internet"</span>
                    </div>
                    <div class="cmd-output error-text">Verifica tu conexión a internet</div>
                </div>
            </div>
        `;
        terminalBody.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
            // Show form and links again
            contactForm.style.display = 'block';
            document.querySelector('.modal-contact-links').style.display = 'block';
        }, 8000);
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }
});

// INTERSECTION OBSERVER FOR ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(section);
});

// PARTICLE EFFECTS ON HOVER
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#00ff41';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.boxShadow = '0 0 10px #00ff41';
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 50 + 20;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let px = x, py = y;
    let opacity = 1;
    
    function animate() {
        px += vx * 0.02;
        py += vy * 0.02;
        opacity -= 0.02;
        
        particle.style.left = px + 'px';
        particle.style.top = py + 'px';
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}

// Add particle effects to buttons
document.querySelectorAll('.btn-cyber, .execute-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createParticle(
                    e.clientX + (Math.random() - 0.5) * 20,
                    e.clientY + (Math.random() - 0.5) * 20
                );
            }, i * 20);
        }
    });
});

// SOUND EFFECTS (Optional - uncomment if you want sound)
/*
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playBeep(frequency = 800, duration = 200) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

// Add sound to buttons
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('click', () => playBeep());
});
*/

console.log(`
╔══════════════════════════════════════════════════════════════╗
║                     SYSTEM INITIALIZED                      ║
║                                                              ║
║  ███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗      ║
║  ██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║      ║
║  ███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║      ║
║  ╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║      ║
║  ███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║      ║
║  ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝      ║
║                                                              ║
║              PORTFOLIO MATRIX v2.0.1 LOADED                 ║
║                   STATUS: FULLY OPERATIONAL                 ║
╚══════════════════════════════════════════════════════════════╝
`);