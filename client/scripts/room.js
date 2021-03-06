import {
  getRoomMessages,
  getRoomUsers,
  removeUserFromRoom,
  sendMessage,
} from "../api.js";
import Bot from "./bot.js";

//State object handling button-text and bot behaviour
let state = { isBotsAllowedToTalk: false };

const botContainer = [];
const { id: roomId, name: roomName } = getItemFromLocalStorage("swagbot_room");
const { username, userId } = getItemFromLocalStorage("swagbot_user");

const addBotForm = document.getElementById("addBotForm");
const botTalkBtn = document.getElementById("botTalkBtn");
const messageForm = document.getElementById("sendMessage");
const textBox = document.getElementById("msg_input");
const leaveRoomBtn = document.getElementById("leaveRoomBtn");
const removeBotsBtn = document.getElementById("removeBotsBtn");
const fetchMsgBtn = document.getElementById("fetchBtn")

document.getElementById("roomTitle").innerHTML = roomName
  ? `Room #${roomName}`
  : "Room";

addBotForm.addEventListener("submit", handleAddBots);
botTalkBtn.addEventListener("click", handleBotTalking);
messageForm.addEventListener("submit", handleSendMessage);
leaveRoomBtn.addEventListener("click", handleLeaveRoom);
removeBotsBtn.addEventListener("click", handleRemoveBots);
fetchMsgBtn.addEventListener("click", updateWindow)

//Retrieves and renders messages on page load
await updateWindow();

function handleBotTalking() {
  if (botContainer.length === 0) {
    alert("You have not added any bots yet");
    return;
  }
  state.isBotsAllowedToTalk = !state.isBotsAllowedToTalk;

  state.isBotsAllowedToTalk
    ? (botTalkBtn.innerHTML = "Stop the bots!!")
    : (botTalkBtn.innerHTML = "Let them talk!!");
  letTheBotsTalk();
}

async function handleLeaveRoom() {
  try {
    await removeUserFromRoom(userId, roomId);
    alert("Du blir nå logget ut");
    window.location = "/pick-room";
  } catch (error) {
    console.error(error);
  }
}

async function handleSendMessage() {
  const messageText = textBox.value;
  textBox.value = "";
  try {
    const { messages } = await sendMessage(roomId, userId, messageText);
    updateMessageView(messages);
  } catch (err) {
    console.error(err);
  }
}

async function handleAddBots() {
  const botQty = parseInt(document.getElementById("bot_qty").value);
  addBots(botQty, roomId);
  await updateWindow();
}

async function handleRemoveBots() {
  try {
    botContainer.forEach((bot) => {
      removeUserFromRoom(bot.id, bot.roomId);
    });
    alert("Bots removed");
    updateWindow();
  } catch (error) {
    console.error(error);
  }
}

async function updateWindow() {
  try {
    const { users } = await getRoomUsers(roomId, userId);
    const { messages } = await getRoomMessages(roomId, userId);
    updateMessageView(messages);
    document.getElementById("user-list").innerHTML = getUserList(users);
  } catch (err) {
    console.error(err);
  }
}

async function getLastMessage() {
  const { messages } = await getRoomMessages(roomId, userId);

  return messages[messages.length - 1];
}

//Maps all messages to an <p> element and updates the html
function updateMessageView(messages) {
  if (typeof messages === "undefined") return "";
  let formattedMessages = "";
  messages.map(
    (m) =>
      (formattedMessages += `<p><strong>${m.username}</strong>: ${m.message.text} <p>`)
  );
  document.getElementById("messageContainer").innerHTML = formattedMessages;
  updateScroll();
}

//add bots for each swtich case, and makes a room for them to be in
async function addBots(quantity, roomId) {
  if (quantity >= 1) {
    const bot1 = new Bot(getRandomBotName(), roomId);
    botContainer.push(bot1);
  }
  if (quantity >= 2) {
    const bot2 = new Bot(getRandomBotName(), roomId);
    botContainer.push(bot2);
  }
  if (quantity >= 3) {
    const bot3 = new Bot(getRandomBotName(), roomId);
    botContainer.push(bot3);
  }
  if (quantity >= 4) {
    const bot4 = new Bot(getRandomBotName(), roomId);
    botContainer.push(bot4);
  }

  botContainer.map(async (bot) => bot.init());
  alert(`${quantity} bots added`);
  await updateWindow();
}

async function letTheBotsTalk() {
  while (state.isBotsAllowedToTalk) {
    try {
      let lastMessage = await getLastMessage();
      for (const bot of botContainer) {
        //Adds some random delay to each response, preventing the bots go haywire
        await sleep(getRandomResponseTime());

        const { messages } = await bot.respond(roomId, lastMessage);
        updateMessageView(messages);
      }
    } catch (error) {
      state.isBotsAllowedToTalk = false;
      console.error(error);
    }
  }
}

//Make the window-scroll
function updateScroll() {
  let messageView = document.getElementById("messageContainer");
  messageView.scrollTop = messageView.scrollHeight;
}

function getUserList(users) {
  let userList = "";
  users.map((user, idx) => (userList += `<li >${user.username}</li>`));
  return userList;
}

function getItemFromLocalStorage(id, isArray = false) {
  let data = localStorage.getItem(id);
  return data ? JSON.parse(data) : isArray ? [] : {};
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomBotName() {
  const BOT_TYPES = ["Wisdombot", "Chairbot", "Basicbot"];
  return BOT_TYPES[Math.floor(Math.random() * BOT_TYPES.length)];
}

function getRandomResponseTime() {
  return 2 + Math.random() * 6000;
}
