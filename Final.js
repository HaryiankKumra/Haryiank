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

// Enhanced Contact Section with 3D Effects

// Add floating shapes to the contact section
document.addEventListener("DOMContentLoaded", () => {
  // Create floating shapes container
  const floatingShapes = document.createElement('div');
  floatingShapes.className = 'floating-shapes';
  
  // Create shapes
  for (let i = 0; i < 4; i++) {
    const shape = document.createElement('div');
    shape.className = 'shape';
    floatingShapes.appendChild(shape);
  }
  
  // Add to contact section
  const contactSection = document.getElementById('contact');
  contactSection.insertBefore(floatingShapes, contactSection.firstChild);
  
  // 3D Tilt effect for contact cards
  const contactCol1 = document.querySelector('#contact .col-1');
  const contactCol2 = document.querySelector('#contact .col-2');
  const textCenter = document.querySelector('#contact .text-center');
  
  // Mouse move tilt effect
  contactSection.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 10;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 10;
    
    if (contactCol1) {
      contactCol1.style.transform = `translateZ(20px) rotateY(${-xPos/2}deg) rotateX(${yPos/2}deg)`;
    }
    
    if (contactCol2) {
      contactCol2.style.transform = `translateZ(20px) rotateY(${xPos/2}deg) rotateX(${-yPos/2}deg)`;
    }
    
    if (textCenter) {
      textCenter.style.transform = `rotateX(${yPos/3}deg)`;
    }
  });
  
  // Reset on mouse leave
  contactSection.addEventListener('mouseleave', () => {
    if (contactCol1) {
      contactCol1.style.transform = `translateZ(20px) rotateY(-2deg)`;
    }
    
    if (contactCol2) {
      contactCol2.style.transform = `translateZ(20px) rotateY(2deg)`;
    }
    
    if (textCenter) {
      textCenter.style.transform = 'rotateX(0deg)';
    }
  });
  
  // Enhanced scrolling animation
  const animateOnScroll = () => {
    const elements = [
      contactCol1, 
      contactCol2, 
      textCenter,
      ...document.querySelectorAll('.address-line')
    ];
    
    elements.forEach(el => {
      if (!el) return;
      
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        el.classList.add('visible');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Initial check
});

// Updated Contact Form with 3D animations
const contactForm = document.querySelector(".form-container");
contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Show animated loader
  const sendBtn = document.querySelector('.send-btn');
  const originalBtnText = sendBtn.textContent;
  sendBtn.innerHTML = '<div class="loader-spinner"></div> Sending...';
  sendBtn.disabled = true;
  
  // Add button animation
  sendBtn.classList.add('sending');

  const fullName = document.querySelector('.form-field[placeholder="Full Name"]').value;
  const email = document.querySelector('.form-field[placeholder="Email"]').value;
  const message = document.querySelector('.form-field[placeholder="Type your message..."]').value;

  const formData = { name: fullName, email, message };

  // Create 3D ripple effect on button
  const createRipple = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = '0';
    circle.style.top = '0';
    circle.classList.add('ripple');
    
    const ripple = button.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
  };
  
  createRipple({ currentTarget: sendBtn });

  try {
    // Simulate loading for demo purposes - remove this setTimeout in production
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Success message with 3D effect
      const successMessage = document.createElement('div');
      successMessage.classList.add('success-message');
      successMessage.innerHTML = '<span>✓</span> Message sent successfully!';
      
      // Add success message with animation
      contactForm.appendChild(successMessage);
      
      // Reset form with animation
      const formFields = contactForm.querySelectorAll('.form-field');
      formFields.forEach((field, index) => {
        setTimeout(() => {
          field.classList.add('reset-field');
          setTimeout(() => {
            field.value = '';
            field.classList.remove('reset-field');
          }, 300);
        }, index * 100);
      });
      
      // Remove success message after 5 seconds with fade out
      setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(10px)';
        setTimeout(() => {
          successMessage.remove();
        }, 500);
      }, 5000);
    } else {
      const error = await response.json();
      
      // Error message with 3D effect
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error-message');
      errorMessage.innerHTML = `<span>✗</span> ${error.message || 'Something went wrong.'}`;
      
      // Add error message after form
      contactForm.appendChild(errorMessage);
      
      // Remove error message after 5 seconds
      setTimeout(() => {
        errorMessage.style.opacity = '0';
        errorMessage.style.transform = 'translateY(10px)';
        setTimeout(() => {
          errorMessage.remove();
        }, 500);
      }, 5000);
    }
  } catch (error) {
    console.error("Error submitting the form:", error);
    
    // Error message for network issues
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.innerHTML = '<span>✗</span> Network error. Please try again later.';
    
    // Add error message after form
    contactForm.appendChild(errorMessage);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
      errorMessage.style.opacity = '0';
      errorMessage.style.transform = 'translateY(10px)';
      setTimeout(() => {
        errorMessage.remove();
      }, 500);
    }, 5000);
  } finally {
    // Restore button with animation
    setTimeout(() => {
      sendBtn.classList.remove('sending');
      sendBtn.innerHTML = originalBtnText;
      sendBtn.disabled = false;
    }, 800);
  }
});

// Add these class definitions to your CSS
const cssToAdd = `
.sending {
  transform: scale(0.95);
}

.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.6s linear;
  background-color: rgba(255, 255, 255, 0.3);
}

@keyframes ripple {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}

.reset-field {
  transform: translateY(-8px);
  opacity: 0;
  transition: all 0.3s ease;
}

.visible {
  opacity: 1 !important;
  transform: translateX(0) !important;
}
`;

// Add the CSS
const style = document.createElement('style');
style.textContent = cssToAdd;
document.head.appendChild(style);
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
