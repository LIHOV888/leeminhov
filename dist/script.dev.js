"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Disable right-click context menu
  document.addEventListener("contextmenu", function (event) {
    return event.preventDefault();
  }); // Disable common devtools keyboard shortcuts

  document.addEventListener("keydown", function (event) {
    if (event.key === "F12" || event.ctrlKey && event.shiftKey && ["I", "J", "C"].includes(event.key.toUpperCase()) || event.ctrlKey && event.key.toUpperCase() === "U") {
      event.preventDefault(); //   alert("Developer tools are disabled on this site."); //plh
    }
  }); // Detect devtools open

  var devtoolsOpen = false;
  var threshold = 160;
  setInterval(function () {
    var widthThreshold = window.outerWidth - window.innerWidth > threshold;
    var heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true; // alert('Developer tools detected. Access is restricted.'); //plh
        // Optionally redirect or block content here
      }
    } else {
      devtoolsOpen = false;
    }
  }, 1000); // Send a simple GET request without custom headers

  fetch(window.location.href); // Fetch and display total visits

  fetch("/api/visit-stats").then(function (res) {
    return res.json();
  }).then(function (data) {
    var footer = document.querySelector("footer .container");

    if (footer) {
      var visitDiv = document.createElement("div");
      visitDiv.classList.add("text-gray-400", "mt-4", "text-center");
      visitDiv.textContent = "Total Visits: ".concat(data.totalVisits);
      footer.appendChild(visitDiv);
    }
  })["catch"](function (err) {
    return console.error("Error fetching visit stats:", err);
  });
  var observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);
  var sections = document.querySelectorAll("section");
  sections.forEach(function (section) {
    return observer.observe(section);
  });
  var nav = document.querySelector("nav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
  var filterButtons = document.querySelectorAll("[data-filter]");
  var projectCards = document.querySelectorAll(".project-card"); // Function to filter projects

  var filterProjects = function filterProjects(filter) {
    projectCards.forEach(function (card) {
      var category = card.getAttribute("data-category"); // Hide all cards first

      card.style.display = "none";
      card.classList.add("opacity-0", "translate-y-4", "hidden"); // Then show only the ones that match the filter

      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
        card.style.display = "block"; // Use setTimeout to ensure display:block has taken effect

        setTimeout(function () {
          card.classList.remove("opacity-0", "translate-y-4");
          card.classList.add("opacity-100", "translate-y-0");
        }, 50);
      }
    });
  }; // Set initial state - show all projects


  window.addEventListener('load', function () {
    filterProjects("all");
  }); // Add click handlers to filter buttons

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Update button styles
      filterButtons.forEach(function (btn) {
        btn.classList.remove("bg-[#00ff9d]", "text-black");
        btn.classList.add("bg-gray-800", "hover:bg-gray-700");
      });
      button.classList.remove("bg-gray-800", "hover:bg-gray-700");
      button.classList.add("bg-[#00ff9d]", "text-black"); // Filter projects

      var filter = button.getAttribute("data-filter");
      filterProjects(filter);
    });
  });
  var skillCards = document.querySelectorAll(".skill-cards > div");
  skillCards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 10px 30px rgba(0, 255, 157, 0.1)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });
  });
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }); // Animated typing effect for the text

  var animatedText = document.getElementById("animated-text");
  var phrases = ["LIHOV", "Full Stack Developer"];
  var currentPhraseIndex = 0;
  var currentText = "";
  var isDeleting = false;
  var charIndex = 0;
  var typingSpeed = 100;
  var pauseTime = 1500;

  function type() {
    var currentPhrase = phrases[currentPhraseIndex];

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