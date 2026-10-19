
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


// SUPABASE ORTAK SAYAÇ AYARLARI
const SUPABASE_URL = "https://ndnplemxzbgtkwmxwtfs.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_x5WT3VitBdTbciUxLAagfw_9L2Cs2q7";

const countDisplay = document.getElementById("clickCount");
const countButton = document.getElementById("countButton");
const counterStatus = document.getElementById("counterStatus");

let supabaseClient = null;
let counterReady = false;

async function setupSharedCounter() {
    if (!window.supabase) {
        countDisplay.textContent = "—";
        counterStatus.textContent = "Supabase bağlantısı kurulamadı.";
        countButton.disabled = true;
        console.error("Supabase kütüphanesi yüklenmemiş.");
        return;
    }

    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );

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
    counterStatus.textContent = "Aşk Sayacımız🐼🐰❤️.";
    counterReady = true;

    supabaseClient
        .channel("love-counter-updates")
        .on(
            "postgres_changes",
            {
                event: "UPDATE",
                schema: "public",
                table: "love_counter",
                filter: "id=eq.1"
            },
            payload => {
                countDisplay.textContent = payload.new.count;
            }
        )
        .subscribe();
}

countButton.addEventListener("click", async () => {
    if (!counterReady || !supabaseClient) return;

    countButton.disabled = true;
    counterStatus.textContent = "Kaydediliyor…";

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


// GİZLİ KALP
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

    secretPopup.addEventListener("click", event => {
        if (event.target === secretPopup) {
            hideSecretPopup();
        }
    });
});


// ORTAK SAYACI BAŞLAT
setupSharedCounter();


 // BANA BAS: ROMANTİK MESAJ GÖSTER
const loveButton = document.getElementById("loveButton");
const overlay = document.getElementById("overlay");
const messageText = document.getElementById("messageText");

const loveMessages = [
    "İyi ki hayatıma girdin aşkparemm.",
    "Seninle geçen her an benim ömrümü uzatıyor.",
    "Dünyada en sevdiğim tat senin Dudaklarınn.",
    "Seni çok ama çoook ama çooooook seviyorumm.",
    "Gülüşünü görmek günümün en güzel anı.",
    "Sen benim en güzel tesadüfümsün.",
    "Sen benim Minnak Melekimsin.",
    "İyi ki biz olmuşuz.",
    "Kalbimin en güzel yeri hep senin.",
    "Sana sarılabildiğim her gün her saniye her daika güzel."
];

loveButton.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    messageText.textContent = loveMessages[randomIndex];
    overlay.classList.add("show");

    setTimeout(() => {
        overlay.classList.remove("show");
    }, 3500);
});

