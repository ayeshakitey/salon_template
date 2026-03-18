document.addEventListener('DOMContentLoaded', () => {
    
    // Hero Slider Animation
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        
        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }
        
        function startSlider() {
            slideInterval = setInterval(nextSlide, 7000); // 7 seconds for luxury feel
        }
        
        function resetSlider() {
            clearInterval(slideInterval);
            startSlider();
        }
        
        // Dot clicks
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetSlider();
            });
        });
        
        startSlider();
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Active link update
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Scroll to target taking header height into account
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Premium Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once revealed, we don't need to observe it anymore
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- Cart Functionality ---
    
    // Initialize or get cart from localStorage
    function getCart() {
        return JSON.parse(localStorage.getItem('KCOZM_cart')) || [];
    }
    
    // Save cart to localStorage
    function saveCart(cart) {
        localStorage.setItem('KCOZM_cart', JSON.stringify(cart));
    }
    
    // Update all cart badges on the page
    function updateCartBadges() {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(badge => {
            badge.textContent = totalItems;
            // Add a small pop animation class
            badge.classList.add('pop');
            setTimeout(() => badge.classList.remove('pop'), 300);
        });
    }

    // Add item to cart
    window.addToCart = function(product) {
        const cart = getCart();
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        saveCart(cart);
        updateCartBadges();
        
        // Show a small visual feedback toast instead of alert if possible, or simple alert
        alert(product.name + " added to cart!");
    };

    // Attach click events to all "Add to Cart" buttons on products page
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const product = {
                id: btn.getAttribute('data-id'),
                name: btn.getAttribute('data-name'),
                price: parseFloat(btn.getAttribute('data-price')),
                image: btn.getAttribute('data-image')
            };
            window.addToCart(product);
        });
    });

    // Initial badge update across all pages
    updateCartBadges();
});

