// Navbar scroll effect
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("shadow-lg", "py-2");
        navbar.classList.remove("py-4");
    } else {
        navbar.classList.remove("shadow-lg", "py-2");
        navbar.classList.add("py-4");
    }
});

// Active nav link
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");
        const navLink = document.querySelector(
            `.nav-links a[href="#${sectionId}"]`,
        );
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
                .querySelectorAll(".nav-links a")
                .forEach((link) => link.classList.remove("active"));
            if (navLink) navLink.classList.add("active");
        }
    });
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.1 },
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("hidden");
    navLinks.classList.toggle("flex");
    navLinks.classList.toggle("flex-col");
    navLinks.classList.toggle("absolute");
    navLinks.classList.toggle("top-full");
    navLinks.classList.toggle("left-0");
    navLinks.classList.toggle("w-full");
    navLinks.classList.toggle("bg-[#7b0d26]");
    navLinks.classList.toggle("p-8");
    navLinks.classList.toggle("z-[1000]");
}

// Theme Toggle (Dark Mode)
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById("theme-icon");
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        localStorage.setItem("theme", "dark");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");
    }
}

// Initialize theme from storage
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    document
        .getElementById("theme-icon")
        .classList.replace("fa-moon", "fa-sun");
}

// Form Validation and SMS Simulation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        // Simple JS Validation
        if (
            !nameInput.value.trim() ||
            !emailInput.value.trim() ||
            !messageInput.value.trim()
        ) {
            alert("Please fill in all fields.");
            return;
        }

        if (
            !emailInput.value.includes("@") ||
            !emailInput.value.includes(".")
        ) {
            alert("Please enter a valid email address.");
            return;
        }

        // Disable button while simulating
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Processing...';

        // Simulate SMS Sending
        const notification = document.getElementById("smsNotification");
        notification.classList.remove("translate-y-20", "opacity-0");
        notification.classList.add("translate-y-0", "opacity-100");

        setTimeout(() => {
            notification.classList.remove("translate-y-0", "opacity-100");
            notification.classList.add("translate-y-20", "opacity-0");

            alert("SMS Sent Successfully to Devika Bhurke!");

            // Now submit to PHP backend
            if (window.location.protocol === "file:") {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            } else {
                contactForm.submit();
            }
        }, 2500);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            // Close mobile menu if open
            if (
                !document
                    .querySelector(".nav-links")
                    .classList.contains("hidden")
            ) {
                toggleMenu();
            }
        }
    });
});

// Projects Data and Rendering
const projectsData = [
    {
        index: "01",
        badge: "PARKING APP",
        title: "ParkIt",
        description:
            "Park It is a smart parking application designed to help users find and book parking spaces easily in real time. The app provides features like live parking availability, location-based search, slot booking, and secure payment integration. It focuses on reducing traffic congestion and saving users’ time while parking. The UI was designed to be simple, modern, and user-friendly for a smooth experience.",
        image: "project-01.jpeg",
    },
    {
        index: "02",
        badge: "ETHNOGRAPHIC STUDY",
        title: "Desai Bandhu Ambewale",
        description:
            "I redesigned the website for Desai Bandhu Ambewale with a modern and user-friendly approach while keeping the brand’s traditional identity connected to Ratnagiri mango culture. The redesign focuses on clean UI, better navigation, improved product presentation.",
        image: "project-02.jpeg",
    },
    {
        index: "03",
        badge: "Career Clarity System",
        title: "PathWise",
        description:
            "PathWise is a career guidance application designed to help students explore suitable career paths based on their interests, skills, and goals. The app provides career recommendations, skill development guidance, and personalized roadmaps for future growth. It features a clean and interactive UI to make career planning simple and engaging for students.",
        image: "project-03.jpeg",
    },
];

function renderProjects() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    grid.innerHTML = projectsData
        .map(
            (project) => `
        <div class="project-card w-full md:w-[calc(50%-1rem)] bg-[#f1f1f1] rounded-[24px] overflow-hidden transition-all duration-300 border border-[#f1f1f1] shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] fade-in group">
            <div class="h-[240px] relative overflow-hidden">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4 bg-[#a63b54] text-white text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    ${project.badge}
                </div>
            </div>
            <div class="p-8 relative">
                <div class="project-index absolute top-4 left-8 text-6xl font-bold text-[#f1f1f1] opacity-40 -z-0 select-none">${project.index}</div>
                <h3 class="text-2xl font-bold text-[#2c030d] mb-3 relative z-10">${project.title}</h3>
                <p class="text-[#5e2736] text-[0.95rem] leading-relaxed relative z-10 min-h-[70px]">${project.description}</p>
            </div>
        </div>
    `,
        )
        .join("");

    // Observe new fade-in elements
    grid.querySelectorAll(".fade-in").forEach((el) => {
        if (typeof observer !== "undefined") {
            observer.observe(el);
        }
    });
}

document.addEventListener("DOMContentLoaded", renderProjects);
