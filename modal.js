// Modal logic for project details
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.createElement("div");
  modal.id = "project-modal";
  modal.classList.add(
    "fixed",
    "inset-0",
    "bg-black",
    "bg-opacity-70",
    "flex",
    "items-center",
    "justify-center",
    "hidden",
    "z-50"
  );

  modal.innerHTML = `
        <div class="bg-gray-900 rounded-lg max-w-lg w-full p-6 relative">
            <button id="modal-close" class="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-500">&times;</button>
            <img id="modal-image" src="" alt="Project Image" class="w-full rounded-lg mb-4">
            <h3 id="modal-title" class="text-white text-xl font-bold mb-2"></h3>
            <p id="modal-description" class="text-gray-300 mb-4"></p>
            <div id="modal-members" class="flex items-center space-x-4 mb-4"></div>
            <div class="flex space-x-4">
                <a id="modal-source" href="#" target="_blank" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded text-center font-semibold">Open Source</a>
                <a id="modal-contact" href="https://t.me/MyWayIsNotEasy" target="_blank" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded text-center font-semibold">Contact</a>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  const modalClose = document.getElementById("modal-close");
  modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Sample project data - can be replaced or extended
  const projectsData = {
    project1: {
      title: "FREE",
      description: "",
      image: "img/p1.png",
      members: [
        {
          name: "LIHOV",
          avatar: "img/lihov.jpg",
          github: "https://t.me/MyWayIsNotEasy",
          linkedin: "https://www.linkedin.com/in/li-hov-223453361",
        },
      ],
      sourceLink: "#",
    },
    // Add more projects here
    project2: {
      title: "FREE",
      description: "",
      image: "img/p1.png",
      members: [
        {
          name: "LIHOV",
          avatar: "img/lihov.jpg",
          github: "https://t.me/MyWayIsNotEasy",
          linkedin: "https://www.linkedin.com/in/li-hov-223453361",
        },
      ],
      sourceLink: "#",
    },
    project3: {
      title: "FREE",
      description: "",
      image: "img/p1.png",
      members: [
        {
          name: "LIHOV",
          avatar: "img/lihov.jpg",
          github: "https://t.me/MyWayIsNotEasy",
          linkedin: "https://www.linkedin.com/in/li-hov-223453361",
        },
      ],
      sourceLink: "#",
    },
    project4: {
      title: "FREE",
      description: "",
      image: "img/p1.png",
      members: [
        {
          name: "LIHOV",
          avatar: "img/lihov.jpg",
          github: "https://t.me/MyWayIsNotEasy",
          linkedin: "https://www.linkedin.com/in/li-hov-223453361",
        },
      ],
      sourceLink: "#",
    },
    project5: {
      title: "FREE",
      description: "",
      image: "img/p1.png",
      members: [
        {
          name: "LIHOV",
          avatar: "img/lihov.jpg",
          github: "https://t.me/MyWayIsNotEasy",
          linkedin: "https://www.linkedin.com/in/li-hov-223453361",
        },
      ],
      sourceLink: "#",
    },
  };

  // Attach click event to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const modalImage = document.getElementById("modal-image");
      const modalTitle = document.getElementById("modal-title");
      const modalDescription = document.getElementById("modal-description");
      const modalMembers = document.getElementById("modal-members");
      const modalSource = document.getElementById("modal-source");

      // For demo, using static data; can be dynamic based on card data attributes
      const project = projectsData["project1"];

      modalImage.src = project.image;
      modalTitle.textContent = project.title;
      modalDescription.textContent = project.description;
      modalSource.href = project.sourceLink;

      // Clear previous members
      modalMembers.innerHTML = "";
      project.members.forEach((member) => {
        const memberDiv = document.createElement("div");
        memberDiv.classList.add("flex", "items-center", "space-x-2");

        const avatar = document.createElement("img");
        avatar.src = member.avatar;
        avatar.alt = member.name;
        avatar.classList.add("w-10", "h-10", "rounded-full");

        const name = document.createElement("span");
        name.textContent = member.name;
        name.classList.add("text-white", "font-semibold");

        const githubLink = document.createElement("a");
        githubLink.href = member.github;
        githubLink.target = "_blank";
        githubLink.innerHTML =
          '<i class="fab fa-github text-white hover:text-green-400"></i>';
        githubLink.classList.add("ml-2");

        const linkedinLink = document.createElement("a");
        linkedinLink.href = member.linkedin;
        linkedinLink.target = "_blank";
        linkedinLink.innerHTML =
          '<i class="fab fa-linkedin text-white hover:text-green-400"></i>';
        linkedinLink.classList.add("ml-2");

        memberDiv.appendChild(avatar);
        memberDiv.appendChild(name);
        memberDiv.appendChild(githubLink);
        memberDiv.appendChild(linkedinLink);

        modalMembers.appendChild(memberDiv);
      });

      modal.classList.remove("hidden");
    });
  });
});
