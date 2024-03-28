const socket = new WebSocket("ws://localhost:8080/conect");
const Client = Stomp.over(socket);

function openPopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("hidden");
}

function openChat() {
  const popup = document.getElementById("popup");
  const chatContainer = document.getElementById("chatContainer");
  const usernameInput = document.getElementById("usernameInput").value;

  if (usernameInput !== "") {
    popup.style.display = "none";
    chatContainer.classList.remove("hidden");
    sessionStorage.setItem("user", usernameInput);
  } else {
    alert("Digite um nome válido!");
  }
}

function sendMessage(e) {
  e.preventDefault();
  const messageInput = document.getElementById("messageInput").value;

  const message = {
    user: sessionStorage.getItem("user"),
    msg: messageInput,
  };

  Client.send("/app/enviarMensagem", {}, JSON.stringify(message));

  document.getElementById("messageInput").value = "";
}

function displayMessage(message, name) {
  const chatMessages = document.getElementById("chatMessages");
  const messageElement = document.createElement("div");

  messageElement.textContent = name + ": " + message;
  chatMessages.appendChild(messageElement);
}

function respondToUser(message) {
  let response;
  switch (message.toLowerCase()) {
    case "ola" || "oi":
      response = "Ola Em que posso ajudar!";
      break;
    case "how are you?":
      response = "I am just a bot, but thank you for asking!";
      break;
    case "what is your name?":
      response = "I am just a simple chatbot.";
      break;
    default:
      response = "I did not understand that.";
      break;
  }
  displayMessage(response, "Bot");
}

function connect() {
  Client.connect({}, function (frame) {
    console.log("Conectado: " + frame);

    Client.subscribe("/canal", function (message) {
      const chatMessage = JSON.parse(message.body);
      displayMessage(chatMessage.msg, chatMessage.user);

      const response = {
        user: "Bot",
        msg: `Olá, sou o Bot. posso te chamar de ` + chatMessage.user + "?",
      };

      Client.send("/canal/responderMensagem", {}, JSON.stringify(response));
      displayMessage(response.msg, response.user);
    });
  });
}

connect();
openPopup();
