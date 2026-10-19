const messages = document.getElementById("messages");
const hearts = document.getElementById("hearts");
const overlay = document.getElementById("overlay");
const messageText = document.getElementById("messageText");
const loveButton = document.getElementById("loveButton");

const heartList = [
    "❤️", "❤️", "❤️", "❤️", "❤️", "💖", "💖", "💖", "💕", "💕",
    "💗", "💘", "💝", "🌹", "🌹", "🌹", "🍒", "🍒", "🍫", "🍫",
    "🍦", "🍓", "🎀", "🧸", "🌸", "🌸", "✨"
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
    "İyi ki benim sevgilimsin"
];

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = heartList[Math.floor(Math.random() * heartList.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 30) + "px";
    heart.style.animationDuration = (4 + Math.random() * 5) + "s";
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
}
setInterval(createHeart, 250);

let typingTimer;
let hideTimer;
loveButton.addEventListener("click", () => {
    overlay.style.display = "flex";
    overlay.classList.remove("hide");
    messageText.textContent = "";

    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    let i = 0;
    clearInterval(typingTimer);
    clearTimeout(hideTimer);

    typingTimer = setInterval(() => {
        messageText.textContent += randomMessage.charAt(i);
        i++;
        if (i >= randomMessage.length) clearInterval(typingTimer);
    }, 80);

    hideTimer = setTimeout(() => {
        overlay.classList.add("hide");
        setTimeout(() => { overlay.style.display = "none"; }, 1000);
    }, 4000);
});

// İlişki başlangıç tarihi: 19 Haziran 2026
const relationshipStart = new Date(2026, 5, 19, 0, 0, 0);

function updateRelationshipClock() {
    const now = new Date();
    const elapsed = Math.max(0, now.getTime() - relationshipStart.getTime());
    const days = Math.floor(elapsed / 86400000);
    const hours = Math.floor((elapsed % 86400000) / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);

    document.getElementById("daysCount").textContent = `${days} Gün`;
    document.getElementById("timeElapsed").textContent =
        `${hours} saat ${minutes} dakika ${seconds} saniye`;
}
document.getElementById("sinceText").textContent = "19 Haziran 2026'dan beri";
updateRelationshipClock();
setInterval(updateRelationshipClock, 1000);

// ORTAK SAYAÇ AYARI:
// Bu iki alanı Supabase projenin Project URL ve anon/public key bilgileriyle doldur.
const SUPABASE_URL = "https://ndnplemxzbgtkwmxwtfs.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_x5WT3VitBdTbciUxLAagfw_9L2Cs2q7";

const countDisplay = document.getElementById("clickCount");
const countButton = document.getElementById("countButton");
const counterStatus = document.getElementById("counterStatus");

let supabaseClient = null;
let counterReady = false;

async function setupSharedCounter() {
    if (
    !window.supabase ||
    SUPABASE_URL.includes("https://ndnplemxzbgtkwmxwtfs.supabase.co") ||
    SUPABASE_ANON_KEY.includes("sb_publishable_x5WT3VitBdTbciUxLAagfw_9L2Cs2q7")
) {
        countDisplay.textContent = "—";
        counterStatus.textContent = "Ortak sayacı etkinleştirmek için Supabase kurulumu gerekiyor.";
        countButton.disabled = true;
        return;
    }

    supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY

    const { data, error } = await supabaseClient
        .from("love_counter")
        .select("id, count")
        .eq("id", 1)
        .single();

    if (error) {
        countDisplay.textContent = "—";
        counterStatus.textContent = "Sayaç yüklenemedi. Supabase tablo ve izinlerini kontrol et.";
        console.error("Sayaç yükleme hatası:", error);
        countButton.disabled = true;
        return;
    }

    countDisplay.textContent = data.count;
    counterStatus.textContent = "İkinizin de tıklamaları ortak sayılır.";
    counterReady = true;

    // Başka cihazdaki değişiklikleri anlık yansıt.
    supabaseClient
        .channel("love-counter-updates")
        .on("postgres_changes", {
            event: "UPDATE",
            schema: "public",
            table: "love_counter",
            filter: "id=eq.1"
        }, payload => {
            countDisplay.textContent = payload.new.count;
        })
        .subscribe();
}

countButton.addEventListener("click", async () => {
    if (!counterReady || !supabaseClient) return;

    countButton.disabled = true;
    counterStatus.textContent = "Kaydediliyor…";

    // Atomik artırma fonksiyonu aynı anda gelen tıklamalarda sayı kaybını önler.
    const { data, error } = await supabaseClient.rpc("increment_love_counter");

    if (error) {
        counterStatus.textContent = "Kaydedilemedi. Bağlantıyı kontrol edip tekrar dene.";
        console.error("Sayaç artırma hatası:", error);
    } else {
        countDisplay.textContent = data;
        counterStatus.textContent = "Kalbin kaydedildi.";
    }

    countButton.disabled = false;
});

document.addEventListener("DOMContentLoaded", () => {
    const secretHeart = document.getElementById("secretHeart");
    const secretPopup = document.getElementById("secretPopup");
    const closeSecret = document.getElementById("closeSecret");

    if (!secretHeart || !secretPopup || !closeSecret) {
        console.error("Gizli kalp elemanları bulunamadı.");
        return;
    }

    let secretTaps = 0;

    secretHeart.addEventListener("click", () => {
        secretTaps++;
        console.log("Gizli kalp dokunuşu:", secretTaps);

        if (secretTaps >= 6) {
            secretTaps = 0;
            secretPopup.classList.add("show");
            secretPopup.setAttribute("aria-hidden", "false");
        }
    });

    function hideSecretPopup() {
        secretPopup.classList.remove("show");
        secretPopup.setAttribute("aria-hidden", "true");
    }

    closeSecret.addEventListener("click", hideSecretPopup);

    secretPopup.addEventListener("click", (event) => {
        if (event.target === secretPopup) {
            hideSecretPopup();
        }
    });
});
