// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".nav-list ul");
const menuItems = document.querySelectorAll(".nav-list ul li a");
const header = document.querySelector(".header.container");

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// Hero Video Playback Handling
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector("#hero video");

  const enableVideoPlayback = () => {
    if (video) {
      video.play().catch((error) => console.error("Error playing video:", error));
    }
    document.removeEventListener("click", enableVideoPlayback);
    document.removeEventListener("keydown", enableVideoPlayback);
  };

  document.addEventListener("click", enableVideoPlayback);
  document.addEventListener("keydown", enableVideoPlayback);
});

// Header Background Change on Scroll
document.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  header.style.backgroundColor = scrollPosition > 250 ? "#29323c" : "transparent";
});

// Loader Functionality
function initLoader() {
  const images = document.querySelectorAll("img");
  let loadedImages = 0;

  images.forEach((img) => {
    img.addEventListener("load", () => {
      loadedImages++;
      if (loadedImages === images.length) {
        document.body.classList.add("loaded");
      }
    });

    // Handle cached images
    if (img.complete) {
      img.dispatchEvent(new Event("load"));
    }
  });

  // Fallback timeout
  setTimeout(() => document.body.classList.add("loaded"), 5000);
}

document.addEventListener("DOMContentLoaded", initLoader);

// Chatbot Functionality
const chatbotIcon = document.getElementById("chatbot-icon");
const chatbotWindow = document.getElementById("chatbot-window");
const sendButton = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const messagesContainer = document.getElementById("messages");

chatbotIcon?.addEventListener("click", () => {
  chatbotWindow.style.display = chatbotWindow.style.display === "block" ? "none" : "block";
});

const getBotResponse = async (userMessage) => {
  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) throw new Error("Failed to fetch response");

    const data = await response.json();
    return data.reply || "No response available";
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "Sorry, I couldn't process your request.";
  }
};

const sendMessage = async () => {
  const message = userInput.value.trim();

  if (message) {
    const userMessage = document.createElement("div");
    userMessage.classList.add("message");
    userMessage.textContent = `You: ${message}`;
    messagesContainer.appendChild(userMessage);

    userInput.value = "";

    const botResponse = await getBotResponse(message);

    const botMessage = document.createElement("div");
    botMessage.classList.add("message");
    botMessage.textContent = `Bot: ${botResponse}`;
    messagesContainer.appendChild(botMessage);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
};

sendButton?.addEventListener("click", sendMessage);
userInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Contact Form Submission
const form = document.querySelector('.form-container');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.querySelector('.form-field[placeholder="Full Name"]').value,
    email: document.querySelector('.form-field[placeholder="Email"]').value,
    message: document.querySelector('.form-field[placeholder="Type your message..."]').value,
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error(await response.text());

    alert('Your message has been sent successfully!');
    form.reset();
  } catch (error) {
    console.error('Error submitting the form:', error);
    alert('An error occurred. Please try again.');
  }
});

// Projects Slider Functionality
const projectContainer = document.querySelector(".projects-slider-container");
document.getElementById("next-btn")?.addEventListener("click", () => {
  projectContainer.scrollBy({ left: 320, behavior: "smooth" });
});
document.getElementById("prev-btn")?.addEventListener("click", () => {
  projectContainer.scrollBy({ left: -320, behavior: "smooth" });
});

// Card Slider Functionality
const cards = document.querySelectorAll(".card");
const sliderButtons = {
  prev: document.querySelector(".btn--left"),
  next: document.querySelector(".btn--right"),
};

let currentIndex = 0;

const updateCards = () => {
  cards.forEach((card, index) => {
    card.classList.remove("current--card", "next--card", "previous--card");

    if (index === currentIndex) {
      card.classList.add("current--card");
    } else if (index === (currentIndex + 1) % cards.length) {
      card.classList.add("next--card");
    } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
      card.classList.add("previous--card");
    }
  });
};

sliderButtons.next?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCards();
});

sliderButtons.prev?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCards();
});

document.addEventListener("DOMContentLoaded", updateCards);
