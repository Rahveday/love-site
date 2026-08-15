const messages = document.getElementById("messages");
const hearts = document.getElementById("hearts");

const heartList = [
    "❤️","❤️","❤️","❤️","❤️",
    "💖","💖","💖",
    "💕","💕",
    "💗",
    "💘",
    "💝",
    "🌹","🌹","🌹",
    "🍒","🍒",
    "🍫","🍫",
    "🍦",
    "🍓",
    "🎀",
    "🧸",
    "🌸","🌸",
    "✨"
];

const loveMessages = [
    "İyi ki varsın ❤️",
    "Sana her baktığımda gülümsüyorum 🌸",
    "Sen benim en güzel tesadüfümsün 💖",
    "Bir ömür seninle olmak istiyorum 🌹",
    "Gülüşün bütün günümü güzelleştiriyor ☀️",
    "Sana her gün yeniden aşık oluyorum ❤️",
    "Sen benim minik melekimsin 🌟",
    "Dünyadaki en güzel şey seninle konuşmak 💕",
    "Kalbim hep seni seçiyor 💘",
    "İyi ki benim sevgilimsin 🥰"
];

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = heartList[Math.floor(Math.random() * heartList.length)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (15 + Math.random() * 30) + "px";

    heart.style.animationDuration = (4 + Math.random() * 5) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9000);
}

setInterval(createHeart, 250);

const overlay = document.getElementById("overlay");
const messageText = document.getElementById("messageText");
const loveButton = document.getElementById("loveButton");

loveButton.onclick = function(){

    overlay.style.display = "flex";
    overlay.classList.remove("hide");

    const randomMessage =
        loveMessages[Math.floor(Math.random() * loveMessages.length)];

    messageText.innerHTML = "";

    let i = 0;

    const typing = setInterval(function(){

        messageText.innerHTML += randomMessage.charAt(i);

        i++;

        if(i >= randomMessage.length){

            clearInterval(typing);

        }

    }, 80);

    setTimeout(function(){

        overlay.classList.add("hide");

    }, 4000);

    setTimeout(function(){

        overlay.style.display = "none";

    }, 5000);

}