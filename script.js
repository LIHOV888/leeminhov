document.addEventListener("DOMContentLoaded", () => {
  // Disable right-click context menu
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  // Disable common devtools keyboard shortcuts
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "F12" ||
      (event.ctrlKey &&
        event.shiftKey &&
        ["I", "J", "C"].includes(event.key.toUpperCase())) ||
      (event.ctrlKey && event.key.toUpperCase() === "U")
    ) {
      event.preventDefault();
      //   alert("Developer tools are disabled on this site."); //plh
    }
  });

  // Detect devtools open
  let devtoolsOpen = false;
  const threshold = 160;
  setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    if (widthThreshold || heightThreshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        // alert('Developer tools detected. Access is restricted.'); //plh
        // Optionally redirect or block content here
      }
    } else {
      devtoolsOpen = false;
    }
  }, 1000);

  // Send a simple GET request without custom headers
  fetch(window.location.href);

  // Fetch and display total visits
  fetch("/api/visit-stats")
    .then((res) => res.json())
    .then((data) => {
      const footer = document.querySelector("footer .container");
      if (footer) {
        const visitDiv = document.createElement("div");
        visitDiv.classList.add("text-gray-400", "mt-4", "text-center");
        visitDiv.textContent = `Total Visits: ${data.totalVisits}`;
        footer.appendChild(visitDiv);
      }
    })
    .catch((err) => console.error("Error fetching visit stats:", err));

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll("section");
  sections.forEach((section) => observer.observe(section));

  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll(".project-card");

  // Function to filter projects
  const filterProjects = (filter) => {
    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      // Hide all cards first
      card.style.display = "none";
      card.classList.add("opacity-0", "translate-y-4", "hidden");

      // Then show only the ones that match the filter
      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
        card.style.display = "block";
        // Use setTimeout to ensure display:block has taken effect
        setTimeout(() => {
          card.classList.remove("opacity-0", "translate-y-4");
          card.classList.add("opacity-100", "translate-y-0");
        }, 50);
      }
    });
  };

  // Set initial state - show all projects
  window.addEventListener("load", () => {
    filterProjects("all");
  });

  // Add click handlers to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update button styles
      filterButtons.forEach((btn) => {
        btn.classList.remove("bg-[#00ff9d]", "text-black");
        btn.classList.add("bg-gray-800", "hover:bg-gray-700");
      });
      button.classList.remove("bg-gray-800", "hover:bg-gray-700");
      button.classList.add("bg-[#00ff9d]", "text-black");

      // Filter projects
      const filter = button.getAttribute("data-filter");
      filterProjects(filter);
    });
  });

  const skillCards = document.querySelectorAll(".skill-cards > div");
  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 10px 30px rgba(0, 255, 157, 0.1)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Animated typing effect for the text
  const animatedText = document.getElementById("animated-text");
  const phrases = ["LIHOV", "PLH"];
  let currentPhraseIndex = 0;
  let currentText = "";
  let isDeleting = false;
  let charIndex = 0;
  let typingSpeed = 100;
  let pauseTime = 1500;

  function type() {
    const currentPhrase = phrases[currentPhraseIndex];
    if (isDeleting) {
      currentText = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentText = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }
    animatedText.textContent = currentText;

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, pauseTime);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
    }
  }

  type();
});
