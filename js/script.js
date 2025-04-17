// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initHeaderScroll();
    initCarousel();
    animateCounter();
    initInteractiveDemo();
    initSmoothScrolling();
    initFormHandling();
    initScrollAnimations();
});

// TreasureBot AI API Client
async function treasureBotAIClient(wasteImageOrType) {
    // Placeholder for the actual API call that will be implemented later
    // When API is ready, replace with actual endpoint
    const apiEndpoint = 'https://api.treasurebot.ai/v1/identify';
    
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate API response with predefined data
            const fakeResponses = {
                'plastic': {
                    type: 'plastic',
                    subtype: 'PET',
                    confidence: 0.94,
                    recyclable: true,
                    instructions: 'Rinse before recycling. Remove cap.',
                    greenPoints: 10
                },
                'paper': {
                    type: 'paper',
                    subtype: 'Cardboard',
                    confidence: 0.97,
                    recyclable: true,
                    instructions: 'Flatten boxes before recycling.',
                    greenPoints: 5
                },
                'organic': {
                    type: 'organic',
                    subtype: 'Food Waste',
                    confidence: 0.92,
                    recyclable: true,
                    instructions: 'Compostable. Keep separate from other waste.',
                    greenPoints: 8
                },
                'metal': {
                    type: 'metal',
                    subtype: 'Aluminum',
                    confidence: 0.96,
                    recyclable: true,
                    instructions: 'Rinse before recycling.',
                    greenPoints: 12
                },
                'glass': {
                    type: 'glass',
                    subtype: 'Clear Glass',
                    confidence: 0.95,
                    recyclable: true,
                    instructions: 'Rinse before recycling. Remove lids.',
                    greenPoints: 15
                },
                'electronic': {
                    type: 'electronic',
                    subtype: 'E-Waste',
                    confidence: 0.93,
                    recyclable: true,
                    instructions: 'Take to designated e-waste collection point.',
                    greenPoints: 20
                }
            };
            
            // Get the response based on waste type or default to plastic
            const response = fakeResponses[wasteImageOrType] || fakeResponses['plastic'];
            
            // Resolve with the simulated response
            resolve(response);
        }, 800);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener("click", function() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Features Carousel
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    
    // Set initial position
    updateCarouselPosition();
    
    // Navigation event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto advance every 5 seconds
    let autoAdvance = setInterval(nextSlide, 5000);
    
    // Pause auto-advance when hovering over carousel
    carousel.addEventListener('mouseenter', () => clearInterval(autoAdvance));
    carousel.addEventListener('mouseleave', () => autoAdvance = setInterval(nextSlide, 5000));
    
    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarouselPosition();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarouselPosition();
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide(); // Swipe left
        } else if (touchEndX > touchStartX + 50) {
            prevSlide(); // Swipe right
        }
    }
    
    function updateCarouselPosition() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// Animate Waste Counter
function animateCounter() {
    const counter = document.getElementById('waste-counter');
    if (!counter) return;
    
    // Set target number and animation parameters
    const target = 57500;
    const duration = 2500;
    const steps = 100;
    const increment = target / steps;
    
    animateCounterValue(counter, target, duration, steps, increment);
    
    // Restart counter when scrolled back into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounterValue(counter, target, duration, steps, increment);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(counter);
}

// Helper function to animate counter value
function animateCounterValue(element, target, duration, steps, increment) {
    let current = 0;
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current).toLocaleString();
    }, duration / steps);
}

// Interactive Demo
function initInteractiveDemo() {
    const wasteItems = document.querySelectorAll('.waste-item');
    const dropArea = document.querySelector('.bin-drop-area');
    const binResults = document.querySelectorAll('.bin-result');
    
    if (!wasteItems.length || !dropArea || !binResults.length) return;
    
    let draggedItem = null;
    let touchedItem = null;
    
    // Add event listeners for each waste item
    wasteItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        
        // Touch device support
        item.addEventListener('touchstart', touchStart, false);
        item.addEventListener('touchmove', touchMove, false);
        item.addEventListener('touchend', touchEnd, false);
    });
    
    // Add event listeners for drop area
    dropArea.addEventListener('dragover', dragOver);
    dropArea.addEventListener('dragleave', dragLeave);
    dropArea.addEventListener('drop', drop);
    
    // Event handler functions
    function dragStart(e) {
        draggedItem = this;
        setTimeout(() => this.style.opacity = '0.4', 0);
    }
    
    function touchStart(e) {
        e.preventDefault();
        touchedItem = this;
        this.style.opacity = '0.4';
        this.classList.add('dragging');
        
        // Get initial touch position
        const touch = e.targetTouches[0];
        const offsetX = touch.clientX - this.getBoundingClientRect().left;
        const offsetY = touch.clientY - this.getBoundingClientRect().top;
        
        this.dataset.offsetX = offsetX;
        this.dataset.offsetY = offsetY;
        
        // Create a clone that follows the finger
        const clone = this.cloneNode(true);
        clone.id = 'dragging-clone';
        clone.style.position = 'fixed';
        clone.style.zIndex = '1000';
        clone.style.opacity = '0.8';
        clone.style.pointerEvents = 'none';
        document.body.appendChild(clone);
        
        positionClone(touch);
    }
    
    function touchMove(e) {
        e.preventDefault();
        if (!touchedItem) return;
        
        const touch = e.targetTouches[0];
        positionClone(touch);
        
        // Check if we're over the drop area
        const clone = document.getElementById('dragging-clone');
        const dropAreaRect = dropArea.getBoundingClientRect();
        
        if (isOverElement(clone.getBoundingClientRect(), dropAreaRect)) {
            dropArea.classList.add('highlight');
        } else {
            dropArea.classList.remove('highlight');
        }
    }
    
    function touchEnd(e) {
        e.preventDefault();
        if (!touchedItem) return;
        
        const clone = document.getElementById('dragging-clone');
        const dropAreaRect = dropArea.getBoundingClientRect();
        
        if (clone && isOverElement(clone.getBoundingClientRect(), dropAreaRect)) {
            handleDrop(touchedItem);
        }
        
        // Clean up
        if (clone) document.body.removeChild(clone);
        touchedItem.style.opacity = '1';
        touchedItem.classList.remove('dragging');
        dropArea.classList.remove('highlight');
        touchedItem = null;
    }
    
    function positionClone(touch) {
        const clone = document.getElementById('dragging-clone');
        if (!clone || !touchedItem) return;
        
        const offsetX = parseInt(touchedItem.dataset.offsetX);
        const offsetY = parseInt(touchedItem.dataset.offsetY);
        
        clone.style.left = (touch.clientX - offsetX) + 'px';
        clone.style.top = (touch.clientY - offsetY) + 'px';
    }
    
    function isOverElement(rect1, rect2) {
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }
    
    function dragOver(e) {
        e.preventDefault();
        this.classList.add('highlight');
    }
    
    function dragLeave() {
        this.classList.remove('highlight');
    }
    
    function drop(e) {
        e.preventDefault();
        this.classList.remove('highlight');
        
        if (!draggedItem) return;
        handleDrop(draggedItem);
        draggedItem.style.opacity = '1';
        draggedItem = null;
    }
    
    function handleDrop(item) {
        // Get waste type
        const wasteType = item.getAttribute('data-type');
        
        // Call the TreasureBot AI API client
        treasureBotAIClient(wasteType)
            .then(response => {
                // Clone the waste item and add to appropriate bin
                const clonedItem = item.cloneNode(true);
                clonedItem.style.opacity = '1';
                clonedItem.style.transform = 'none';
                
                // Find the matching bin
                const targetBin = document.querySelector(`.bin-result[data-type="${wasteType}"] .bin-items`);
                if (targetBin) {
                    targetBin.appendChild(clonedItem);
                    animateSorting(wasteType);
                }
                
                // Award points animation
                showPointsAwarded(response.greenPoints);
                
                // Display AI analysis results if a result display area exists
                const resultDisplay = document.querySelector('.ai-analysis-results');
                if (resultDisplay) {
                    resultDisplay.innerHTML = `
                        <h4>TreasureBot AI Analysis</h4>
                        <p><strong>Material:</strong> ${response.type} (${response.subtype})</p>
                        <p><strong>Confidence:</strong> ${Math.round(response.confidence * 100)}%</p>
                        <p><strong>Instructions:</strong> ${response.instructions}</p>
                        <p><strong>Green Points:</strong> ${response.greenPoints}</p>
                    `;
                    resultDisplay.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('TreasureBot AI error:', error);
                
                // Fallback behavior if API call fails
                const clonedItem = item.cloneNode(true);
                clonedItem.style.opacity = '1';
                clonedItem.style.transform = 'none';
                
                const targetBin = document.querySelector(`.bin-result[data-type="${wasteType}"] .bin-items`);
                if (targetBin) {
                    targetBin.appendChild(clonedItem);
                    animateSorting(wasteType);
                }
                
                showPointsAwarded(10); // Default points
            });
    }
    
    function animateSorting(wasteType) {
        // Create a temporary element for animation
        const animEl = document.createElement('div');
        animEl.className = 'sorting-animation';
        animEl.style.position = 'absolute';
        animEl.style.width = '30px';
        animEl.style.height = '30px';
        animEl.style.backgroundColor = getWasteTypeColor(wasteType);
        animEl.style.borderRadius = '50%';
        animEl.style.zIndex = '100';
        
        // Start from the bin
        const binRect = document.querySelector('.treasurebot-bin').getBoundingClientRect();
        const targetRect = document.querySelector(`.bin-result[data-type="${wasteType}"]`).getBoundingClientRect();
        
        animEl.style.top = `${binRect.bottom}px`;
        animEl.style.left = `${binRect.left + binRect.width/2}px`;
        
        document.body.appendChild(animEl);
        
        // Animate to target bin
        setTimeout(() => {
            animEl.style.transition = 'all 0.6s ease-in-out';
            animEl.style.top = `${targetRect.top + targetRect.height/2}px`;
            animEl.style.left = `${targetRect.left + targetRect.width/2}px`;
        }, 100);
        
        // Remove after animation completes
        setTimeout(() => {
            document.body.removeChild(animEl);
        }, 700);
    }
    
    function getWasteTypeColor(type) {
        switch(type) {
            case 'plastic': return '#3498db'; // blue
            case 'paper': return '#f1c40f'; // yellow
            case 'organic': return '#2ecc71'; // green
            case 'metal': return '#e74c3c'; // red
            default: return '#95a5a6'; // grey
        }
    }
    
    function showPointsAwarded(points = 10) {
        // Create points indicator
        const pointsEl = document.createElement('div');
        pointsEl.className = 'points-awarded';
        pointsEl.textContent = `+${points} Green Points`;
        pointsEl.style.position = 'absolute';
        pointsEl.style.color = '#2E8B57';
        pointsEl.style.fontWeight = 'bold';
        pointsEl.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        pointsEl.style.padding = '10px 15px';
        pointsEl.style.borderRadius = '50px';
        pointsEl.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        pointsEl.style.zIndex = '200';
        
        const binRect = document.querySelector('.treasurebot-bin').getBoundingClientRect();
        pointsEl.style.top = `${binRect.top - 30}px`;
        pointsEl.style.left = `${binRect.left + binRect.width/2 - 70}px`;
        
        document.body.appendChild(pointsEl);
        
        // Animate upward fade
        setTimeout(() => {
            pointsEl.style.transition = 'all 1.2s ease-out';
            pointsEl.style.top = `${binRect.top - 80}px`;
            pointsEl.style.opacity = '0';
        }, 100);
        
        // Remove after animation
        setTimeout(() => {
            document.body.removeChild(pointsEl);
        }, 1300);
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetTop - headerHeight - 20, // Account for fixed header and padding
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Submission Handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Add loading state to submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Collect form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // In a real app, send this data to a server
            console.log('Contact form submitted:', formValues);
            
            // Show success message
            showFormSuccessMessage(this, 'Thank you for your message! We\'ll be in touch shortly.');
            
            // Reset the form
            this.reset();
        }, 1500);
    }
    
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        
        // Add loading state to submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Collect email
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real app, send this to a server
            console.log('Newsletter signup:', email);
            
            // Show success message
            showFormSuccessMessage(this, 'Thanks for subscribing to our newsletter!');
            
            // Reset the form
            this.reset();
        }, 1200);
    }
    
    function showFormSuccessMessage(formElement, message) {
        // First remove any existing messages
        const existingMsg = formElement.querySelector('.form-success-message');
        if (existingMsg) {
            formElement.removeChild(existingMsg);
        }
        
        // Create success message element
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success-message';
        successMsg.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        successMsg.style.color = '#2E8B57';
        successMsg.style.padding = '15px';
        successMsg.style.marginTop = '20px';
        successMsg.style.backgroundColor = 'rgba(46, 139, 87, 0.1)';
        successMsg.style.borderRadius = '8px';
        successMsg.style.textAlign = 'center';
        successMsg.style.display = 'flex';
        successMsg.style.alignItems = 'center';
        successMsg.style.justifyContent = 'center';
        successMsg.style.transition = 'opacity 0.5s ease';
        
        // Style the icon
        const icon = successMsg.querySelector('i');
        icon.style.marginRight = '10px';
        icon.style.fontSize = '1.2rem';
        
        // Add to the DOM after the form
        formElement.appendChild(successMsg);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successMsg.style.opacity = '0';
            setTimeout(() => {
                if (formElement.contains(successMsg)) {
                    formElement.removeChild(successMsg);
                }
            }, 500);
        }, 5000);
    }
}

// Animate elements when they come into view
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return; // Fallback for older browsers
    
    // Elements to animate when scrolled into view
    const animatedElements = document.querySelectorAll('.feature, .step, .eco-feature, .benefit, .stat, .image-container');
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
    
    // Observe each element
    animatedElements.forEach((element, index) => {
        // Add slight delay to stagger animations
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Add fade-in animation to testimonials
    const fadeElements = document.querySelectorAll('.testimonial, .app-screenshots img, .redemption-example');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}