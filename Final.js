// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".nav-list ul");
const menuItems = document.querySelectorAll(".nav-list ul li a");
const header = document.querySelector(".header.container");

hamburger.addEventListener("click", () => {
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
      video.play().catch((error) => {
        console.error("Error playing video:", error);
      });
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

function initLoader() {
    console.log('Initializing loader...');
    document.body.classList.add('loaded');
  }

const backendUrl = 'https://portfolio-backend-zeta-orcin.vercel.app';
 
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
    const response = await fetch(`${backendUrl}/api/chatbot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    return data.reply || "Sorry, I couldn't process your request.";
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "An error occurred while communicating with the bot.";
  }
};

const sendMessage = async (event) => {
  event.preventDefault();

  const message = userInput.value.trim();

  if (message) {
    const userMessage = document.createElement("div");
    userMessage.classList.add("message");
    userMessage.textContent = `You: ${message}`;
    messagesContainer.appendChild(userMessage);

    userInput.value = "";

    try {
      const botResponse = await getBotResponse(message);

      const botMessage = document.createElement("div");
      botMessage.classList.add("message");
      botMessage.textContent = `Bot: ${botResponse}`;
      messagesContainer.appendChild(botMessage);
    } catch (error) {
      const botError = document.createElement("div");
      botError.classList.add("message");
      botError.textContent = "Bot: Sorry, I couldn't understand that.";
      messagesContainer.appendChild(botError);
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
};

sendButton?.addEventListener("click", sendMessage);
userInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage(e);
});

// Contact Form Submission
const contactForm = document.querySelector(".form-container");
contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.querySelector('.form-field[placeholder="Full Name"]').value;
  const email = document.querySelector('.form-field[placeholder="Email"]').value;
  const message = document.querySelector('.form-field[placeholder="Type your message..."]').value;

  const formData = { name: fullName, email, message };

  try {
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Your message has been sent successfully!");
      contactForm.reset();
    } else {
      const error = await response.json();
      alert(`Error: ${error.message}`);
    }
  } catch (error) {
    console.error("Error submitting the form:", error);
    alert("An error occurred. Please try again later.");
  }

  // Additional fetch call (added as requested)
  fetch('https://portfolio-backend-zeta-orcin.vercel.app/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Add this if your backend expects credentials
    body: JSON.stringify({
      name: 'Your Name',
      email: 'your.email@example.com',
      message: 'Your message here',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  
});

// Loader Functionality
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  const totalImages = images.length;
  let loadedImages = 0;
  const loaderProgress = document.querySelector(".loader-progress");

  images.forEach((img) => {
    img.addEventListener("load", () => {
      loadedImages++;
      const loadProgress = (loadedImages / totalImages) * 100;

      if (loaderProgress) {
        loaderProgress.style.width = `${loadProgress}%`;
      }

      if (loadedImages === totalImages) {
        document.body.classList.add("loaded");
      }
    });

    if (img.complete) {
      img.dispatchEvent(new Event("load"));
    }
  });

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 5000); // Maximum wait time of 5 seconds
});

// Projects Slider Functionality
document.getElementById("next-btn")?.addEventListener("click", () => {
  const container = document.querySelector(".projects-slider-container");
  container.scrollBy({ left: 320, behavior: "smooth" });
});

document.getElementById("prev-btn")?.addEventListener("click", () => {
  const container = document.querySelector(".projects-slider-container");
  container.scrollBy({ left: -320, behavior: "smooth" });
});

// Slider Functionality
const buttons = {
  prev: document.querySelector(".btn--left"),
  next: document.querySelector(".btn--right"),
};
const cards = document.querySelectorAll(".card");
let currentIndex = 0;

function updateCards() {
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
}

buttons.next?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCards();
});

buttons.prev?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCards();
});

function initSlider() {
  updateCards();
}

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
});
