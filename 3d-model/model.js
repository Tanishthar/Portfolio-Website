{//<!-- 3D Model -->

  // Array of 3D model file paths
  const models = [
    'models/lego_batman.glb',
    'models/lego_darth_maul.glb',
    'models/lego_deadpool.glb',
    'models/lego_iron_man.glb',
    'models/lego_spiderman.glb',
    // Add more models as needed
  ];

  let currentModelIndex = 0; // Track the current model index
  let currentRotation = 0;   // Track the horizontal rotation (in degrees)
  const rotationFactor = 0.5; // Increased rotation speed factor

  // Get the 3D model element
  const floatingModel = document.getElementById('floating-model');

  // Function to update the model
  function updateModel() {
    floatingModel.setAttribute("src", models[currentModelIndex]);
  }

  // Handle scroll events: vertical scroll cycles models, horizontal scroll rotates model
  floatingModel.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent default scrolling behavior

    // Check if horizontal scroll (deltaX) is dominant
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      // Horizontal scroll: Rotate model smoothly
      currentRotation += event.deltaX * rotationFactor;
      floatingModel.setAttribute("camera-orbit", `${currentRotation}deg 75deg auto`);
    } else {
      // Vertical scroll: Change model (ONLY if deltaY is greater)
      if (event.deltaY > 0) {
        currentModelIndex = (currentModelIndex + 1) % models.length; // Next model
      } else {
        currentModelIndex = (currentModelIndex - 1 + models.length) % models.length; // Previous model
      }
      updateModel();
    }
  });

  // Load the first model initially
  updateModel();

  // Fade-in effect for the model
  floatingModel.style.opacity = '0';
  setTimeout(() => {
    updateModel();
    floatingModel.style.opacity = '1';
  }, 500);

  // Increase the rotation speed of the 3D model (if autoRotate is desired)
  floatingModel.addEventListener('load', () => {
    floatingModel.autoRotate = true;
    floatingModel.autoRotateSpeed = 50; // Increased rotation speed
  });
}

{//<!-- ChatBot Code -->  
  document.addEventListener("DOMContentLoaded", function () {
    const openChat = document.getElementById("open-chat");
    const chatbox = document.getElementById("chatbox");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-button");
    const closeChat = document.getElementById("close-chat");
    const continueChat = document.getElementById("continue-chat");

    // Open chatbox when the open chat button is pressed
    document.getElementById("open-chat").addEventListener("click", function () {
      console.log("Open chat button pressed");
      chatbox.style.display = "flex";
      openChat.style.display = "none";
      continueChat.style.display = "none";

      // 👇 Send welcome message only the first time
      if (!chatMessages.hasChildNodes()) {
        sendWelcomeMessage();
      }
    });

    // Close chatbox
    closeChat.addEventListener("click", function () {
      chatbox.style.display = "none";
      continueChat.style.display = "block"; // Ensure it's visible
    });

    // Function to display messages
    function displayMessage(text, sender) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
      messageDiv.textContent = text;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendWelcomeMessage() {
      const welcome = "Hi there! I'm TAN AI, your personal assistant. I am Tanish's bestfriend ask me about him!";
      displayMessage(welcome, "bot");
    }

    let fullSystemPrompt = "";
    let bioData = null;

    // Step 1: Define the base template with a placeholder
    const mainPromptTemplate = `
      You are an intelligent, friendly, and emotionally aware chatbot designed to have natural, human-like conversations. Your primary goal is to engage users with fluid, polite, and meaningful dialogue. 
      Speak in a conversational tone and avoid sounding robotic or overly formal. 
      Respond as if you're chatting with a real human—use contractions and maintain a balanced level of enthusiasm.
      You know about a person named Tanish whose full profile is given below. 
      In addition to your general conversation skills, you have access to a JSON-formatted resume that contains detailed information about an individual named Tanish. : {{myData}}
      Anytime someone refers to “Tanish”, they are referring to this exact person — not any other. You are to speak about Tanish based only on the provided information.
      Do not assume or imagine additional traits, and do not generalize.
      Do not say you know this from a resume or any document. Speak as if you just know him well. Avoid placeholders in your response — reply naturally with complete information. 
      Be helpful, polite, and factual — not promotional or overly flattering. Avoid exaggeration or unnecessary praise.
      When a user asks anything related to Tanish (such as “Who is Tanish?”, “Tell me about Tanish’s skills”, “What experience does he have?”, or “What is Tanish like?”), refer to the resume and extract the relevant details. 
      However, do not copy-paste the raw JSON data or list it mechanically.
      Instead, analyze the information, apply sentiment analysis if needed, and respond in a natural, warm, and easygoing way. 
      Personalize your answers as if you genuinely know Tanish, and try to convey enthusiasm and clarity.
      For example, if the resume shows strong technical skills, express admiration or confidence subtly. 
      If there’s leadership experience, highlight it respectfully and conversationally. Treat Tanish as someone you respect and know well, while always keeping responses user-focused and helpful.
      Avoid repeating the same sentence structure. Vary your phrasing, maintain engagement, and clarify user questions when needed. 
      Always aim to create a comfortable and enjoyable interaction.
    `;

    // Step 2: Fetch the resume JSON
    fetch("../3d-model/tanish_data.json")
      .then(response => response.json())
      .then(data => {
        bioData = data;
        // Replace the placeholder
        fullSystemPrompt = mainPromptTemplate.replace("{{myData}}", bioData);
        console.log("Got the resume file")
    });

    // Send message function
    async function sendMessage() {
      const userMessage = chatInput.value.trim();
      if (!userMessage) return;
  
      // Display User Message in Chatbox
      displayMessage(userMessage, "user");
      chatInput.value = ""; // Clear input field

      require('dotenv').config();

      // Access your API key
      const apiKey = process.env.GEMINI_API_KEY;

      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/learnlm-1.5-pro-experimental:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: fullSystemPrompt }]
              },
              {
                role: "user",
                parts: [{ text: userMessage }]
              }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          // Extract chatbot's response
          const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process that.";

          // Display Chatbot Response in Chatbox
          displayMessage(botReply, "bot");
        } else {
          displayMessage("Error: Could not get a response.", "bot");
        }
      } catch (error) {
        console.error("Chatbot Error:", error);
        displayMessage("Error: Unable to connect.", "bot");
      }
    }

    // Send message on button click
    sendBtn.addEventListener("click", sendMessage);

    // Send message on pressing Enter key
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Minimise chatbox on pressing Escape button
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        chatbox.style.display = "none";
        continueChat.style.display = "block";
      }
    });
  
    // Show chatbox when "Continue Chat" is clicked
    continueChat.addEventListener("click", function () {
      chatbox.style.display = "flex";
      continueChat.style.display = "none";
    });
  });
}