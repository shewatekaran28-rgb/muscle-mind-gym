document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. Scroll-shrink and glassmorphic Navbar
    // ==========================================
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    // ==========================================
    // 2. Mobile Nav Toggle
    // ==========================================
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.querySelector(".nav-links");
    
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            
            // Toggle hamburger icon between bars and close
            const icon = navToggle.querySelector("i");
            if (icon) {
                if (icon.classList.contains("fa-bars")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        // Close mobile nav when clicking on a link
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = navToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }

    // ==========================================
    // 3. Testimonial Slider / Carousel
    // ==========================================
    const slider = document.querySelector(".testimonial-slider");
    const cards = document.querySelectorAll(".testimonial-card");
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");
    const dotsContainer = document.querySelector(".slider-dots");

    if (slider && cards.length > 0) {
        let currentIndex = 0;
        const totalSlides = cards.length;
        let slideInterval;

        // Create dot indicators
        cards.forEach((_, idx) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (idx === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                goToSlide(idx);
                resetInterval();
            });
            if (dotsContainer) dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".slider-dots .dot");

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots active class
            if (dots.length > 0) {
                dots.forEach((dot, idx) => {
                    if (idx === currentIndex) {
                        dot.classList.add("active");
                    } else {
                        dot.classList.remove("active");
                    }
                });
            }
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                nextSlide();
                resetInterval();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                prevSlide();
                resetInterval();
            });
        }

        // Auto play slider
        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        startInterval();

        // Touch gestures for swipe support on mobile
        let startX = 0;
        let endX = 0;

        slider.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        slider.addEventListener("touchend", (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const threshold = 50;
            if (startX - endX > threshold) {
                // Swipe Left -> Next Slide
                nextSlide();
                resetInterval();
            } else if (endX - startX > threshold) {
                // Swipe Right -> Prev Slide
                prevSlide();
                resetInterval();
            }
        }
    }

    // ==========================================
    // 4. Gallery Category Tabs Filter
    // ==========================================
    const tabs = document.querySelectorAll(".gallery-tab");
    const grids = document.querySelectorAll(".gallery-grid");

    if (tabs.length > 0 && grids.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const category = tab.getAttribute("data-category");
                
                // Update active tab style
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");

                // Toggle visibility of grids with a smooth fade
                grids.forEach(grid => {
                    if (grid.getAttribute("data-category") === category) {
                        grid.classList.remove("hidden");
                        // Timeout for CSS transition to trigger opacity change
                        setTimeout(() => {
                            grid.classList.add("active");
                        }, 50);
                    } else {
                        grid.classList.remove("active");
                        grid.classList.add("hidden");
                    }
                });
            });
        });
    }

    // ==========================================
    // 5. Scroll Reveal Observer
    // ==========================================
    const reveals = document.querySelectorAll(".reveal");
    
    if (reveals.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    // Stop observing once revealed to retain performance
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });
    }

    // ==========================================
    // 6. Smooth scroll for internal links
    // ==========================================
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Close menu if it was open on mobile
                if (navLinks) {
                    navLinks.classList.remove("active");
                    const icon = navToggle ? navToggle.querySelector("i") : null;
                    if (icon) {
                        icon.classList.remove("fa-xmark");
                        icon.classList.add("fa-bars");
                    }
                }

                // Adjust for navbar height
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==========================================
    // 7. Auto-select pricing plan in form
    // ==========================================
    const pricingButtons = document.querySelectorAll(".price-card .price-btn");
    const planSelect = document.getElementById("plan");

    if (pricingButtons.length > 0 && planSelect) {
        pricingButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                // Get the plan name from the sibling h3 or header
                const card = btn.closest(".price-card");
                if (card) {
                    const header = card.querySelector("h3");
                    if (header) {
                        const planName = header.textContent.trim();
                        // Find matching option in select dropdown
                        for (let option of planSelect.options) {
                            if (option.value.toLowerCase() === planName.toLowerCase()) {
                                planSelect.value = option.value;
                                break;
                            }
                        }
                    }
                }
            });
        });
    }
});
