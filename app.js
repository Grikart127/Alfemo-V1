// ================= ÖZEL PARÇA LİSTELERİ =================
const listeler = {
    koltuk: ["H1012803", "H1012804", "H1012805", "H1012968", "H1012969", "H1012970"], 
    berjer: ["H1012803", "H1012804", "H1012805", "H1012964", "H1012965", "H1012968", "H1012969", "H1012970"], 
    kirlent: ["H1011031", "H1011221", "H1011226"], 
    bel: ["H1012964", "H1012965"], 
    ayak: ["Ahsap", "Metal"]
};

let indexler = {
    koltuk: 3,  
    berjer: 5,  
    kirlent: 0, 
    bel: 0,     
    ayak: 0     
};

let mekanizmaState = 0; 
let measurementsTimer;
let tooltipTimer;
let hintsTimer; 

// ================= GÖRSELLERİ GÜNCELLE =================
function updateUI() {
    const koltukKodu = listeler.koltuk[indexler.koltuk];
    const berjerKodu = listeler.berjer[indexler.berjer];
    const kirlentKodu = listeler.kirlent[indexler.kirlent];
    const belKodu = listeler.bel[indexler.bel];
    const ayakTuru = listeler.ayak[indexler.ayak];

    document.getElementById('layer-ayak').src = `KLT_Ayak_${ayakTuru}.png`;
    document.getElementById('layer-berjer').src = `KLT_Berjer_${berjerKodu}.png`;
    document.getElementById('layer-kirlent').src = `KLT_Kirlent_${kirlentKodu}.png`;
    document.getElementById('layer-bel').src = `KLT_Bel_${belKodu}.png`;

    const koltukImg = document.getElementById('layer-koltuk');
    
    if (mekanizmaState === 0) {
        koltukImg.src = `KLT_Koltuk_${koltukKodu}.png`;
    } 
    else if (mekanizmaState === 1) {
        koltukImg.src = `KLT_Koltuk_A1.png`; 
    } 
    else if (mekanizmaState === 2) {
        koltukImg.src = `KLT_Koltuk_A2.png`; 
    }
}

// ================= TIKLAYINCA DÖNGÜ (CYCLE) YAP =================
function cycleItem(tur) {
    if (tur === 'koltuk' && mekanizmaState !== 0) {
        mekanizmaState = 0;
        document.getElementById('btn-mekanizma').innerText = "MEKANİZMA: KAPALI";
        document.getElementById('layer-kirlent').style.opacity = "1"; 
        document.getElementById('layer-bel').style.opacity = "1";
    }

    indexler[tur] = (indexler[tur] + 1) % listeler[tur].length;
    updateUI();
}

// ================= AKILLI SEÇİM İŞARETÇİLERİ MANTIĞI =================
function resetHintsTimer() {
    document.getElementById('app-container').classList.remove('show-hints');
    clearTimeout(hintsTimer);
    hintsTimer = setTimeout(() => {
        document.getElementById('app-container').classList.add('show-hints');
    }, 3000);
}

// ================= AKILLI TOOLTIP =================
const tooltip = document.getElementById('cursor-tooltip');

function showTooltip(e, metin) {
    if (window.innerWidth <= 768) return; 

    tooltip.innerText = metin;
    tooltip.style.opacity = "1";
    moveTooltip(e); 
    
    clearTimeout(tooltipTimer);
    tooltipTimer = setTimeout(() => {
        tooltip.style.opacity = "0"; 
    }, 1000); 
}

function moveTooltip(e) {
    if (window.innerWidth <= 768) return;
    tooltip.style.left = e.pageX + 'px';
    tooltip.style.top = (e.pageY - 15) + 'px';
}

function hideTooltip() {
    tooltip.style.opacity = "0";
    clearTimeout(tooltipTimer);
}

// ================= MEKANİZMA KONTROLÜ =================
function toggleMekanizma() {
    mekanizmaState = (mekanizmaState + 1) % 3; 
    const mekanizmaBtn = document.getElementById('btn-mekanizma');
    const kirlentImg = document.getElementById('layer-kirlent');
    const belImg = document.getElementById('layer-bel');

    if (mekanizmaState === 0) {
        mekanizmaBtn.innerText = "MEKANİZMA: KAPALI";
        kirlentImg.style.opacity = "1"; 
        belImg.style.opacity = "1";
    } 
    else if (mekanizmaState === 1) {
        mekanizmaBtn.innerText = "MEKANİZMA: A1 (YARI AÇIK)";
        kirlentImg.style.opacity = "0"; 
        belImg.style.opacity = "0";
    } 
    else {
        mekanizmaBtn.innerText = "MEKANİZMA: A2 (TAM AÇIK)";
        kirlentImg.style.opacity = "0"; 
        belImg.style.opacity = "0";
    }
    updateUI(); 
}

// ================= ÖLÇÜLER EKRANI MANTIĞI =================
function showMeasurements() {
    const overlay = document.getElementById('measurements-overlay');
    overlay.classList.remove('hidden');
    
    clearTimeout(measurementsTimer);
    measurementsTimer = setTimeout(() => {
        overlay.classList.add('hidden');
    }, 5000); 
}

// ================= VİDEO (MEKANDA İNCELE) MANTIĞI =================
const videoOverlay = document.getElementById('video-overlay');
const sceneVideo = document.getElementById('scene-video');

function playSceneVideo() {
    videoOverlay.classList.remove('hidden');
    sceneVideo.currentTime = 0; 
    sceneVideo.play();
}

function closeVideo() {
    videoOverlay.classList.add('hidden');
    sceneVideo.pause();
}

// Video kendi kendine bittiğinde kapat
sceneVideo.addEventListener('ended', () => {
    closeVideo();
});

// ================= DANIŞMANA İLET (WHATSAPP) =================
function shareWhatsApp() {
    const telefon = "905327648076"; 
    
    const koltukKodu = listeler.koltuk[indexler.koltuk];
    const berjerKodu = listeler.berjer[indexler.berjer];
    const kirlentKodu = listeler.kirlent[indexler.kirlent];
    const belKodu = listeler.bel[indexler.bel];
    const ayakTuru = listeler.ayak[indexler.ayak];
    
    let mekanizmaYazisi = "Kapalı";
    if (mekanizmaState === 1) mekanizmaYazisi = "A1 (Yarı Açık)";
    if (mekanizmaState === 2) mekanizmaYazisi = "A2 (Tam Açık)";

    const mesaj = `Merhaba, BERA Koleksiyonu konfigüratöründe hazırladığım tasarımın detayları aşağıdadır:\n\n🛋 Koleksiyon: BERA\n🛋 Koltuk Kumaşı: ${koltukKodu}\n🪑 Berjer Kumaşı: ${berjerKodu}\n🧶 Kırlent Kumaşı: ${kirlentKodu}\n🧵 Bel Kırlenti: ${belKodu}\n🪵 Ayak Materyali: ${ayakTuru}\n⚙️ Mekanizma Durumu: ${mekanizmaYazisi}\n\nBu yapılandırma detaylarına göre ürünün fiyatı ve sipariş süreçleri hakkında bilgi almak istiyorum.`;
    
    const whatsappUrl = `https://wa.me/${telefon}?text=${encodeURIComponent(mesaj)}`;
    window.open(whatsappUrl, '_blank');
}

// ================= TAM EKRAN MANTIĞI =================
const fullscreenBtn = document.getElementById('fullscreen-btn');

function toggleFullScreen() {
    const elem = document.documentElement; 
    
    if (!elem.requestFullscreen && !elem.webkitRequestFullscreen && !elem.msRequestFullscreen) {
        alert("iOS cihazlarda (iPhone) tarayıcı üzerinden tam ekran desteklenmemektedir. Lütfen telefonu yan çevirin veya sayfayı 'Ana Ekrana Ekle' yaparak kullanın.");
        return;
    }

    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) { elem.requestFullscreen(); } 
        else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen(); } 
        else if (elem.msRequestFullscreen) { elem.msRequestFullscreen(); } 
    } else {
        if (document.exitFullscreen) { document.exitFullscreen(); } 
        else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
        else if (document.msExitFullscreen) { document.msExitFullscreen(); }
    }
}

document.addEventListener('fullscreenchange', updateFsIcon);
document.addEventListener('webkitfullscreenchange', updateFsIcon);
document.addEventListener('msfullscreenchange', updateFsIcon);

function updateFsIcon() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        fullscreenBtn.innerHTML = '✕';
    } else {
        fullscreenBtn.innerHTML = '⛶';
    }
}

// DOKUNMA TAKİP EDİCİLERİ
document.addEventListener('click', resetHintsTimer);
document.addEventListener('touchstart', resetHintsTimer);

// UYGULAMAYI BAŞLAT
updateUI();
resetHintsTimer();