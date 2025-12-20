// --- CẤU HÌNH ---
const config = {
    snowCount: 100, // Số lượng tuyết (nhiều hơn)
    musicAutoPlay: false, // Trình duyệt chặn auto play, cần click
    date: new Date(2023, 11, 25) // Ngày yêu
};

// --- 1. HIỆU ỨNG TUYẾT RƠI (Toàn màn hình) ---
function createSnow() {
    const container = document.getElementById('snow-container');
    container.innerHTML = ''; // Xóa tuyết cũ nếu có
    
    for (let i = 0; i < config.snowCount; i++) {
        const el = document.createElement('div');
        el.innerHTML = Math.random() > 0.5 ? '❄' : '•'; // Xen kẽ bông tuyết và chấm tròn
        el.classList.add('snowflake');
        
        // Random vị trí và tốc độ
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = Math.random() * 15 + 5 + 'px'; // Kích thước từ 5px đến 20px
        el.style.animationDuration = Math.random() * 5 + 3 + 's'; // Tốc độ rơi 3s - 8s
        el.style.opacity = Math.random() * 0.7 + 0.3;
        el.style.animationDelay = Math.random() * 5 + 's'; // Rơi lệch nhau cho tự nhiên
        
        container.appendChild(el);
    }
}

// --- 2. LOGIC CHUYỂN CẢNH ---

// Khi trang vừa load xong
window.onload = function() {
    createSnow();
    startIntro(); // Bắt đầu cảnh 1
};

function startIntro() {
    const santa = document.getElementById('santa');
    const gift = document.getElementById('gift-box');
    
    // 1. Cho Santa bay
    santa.classList.add('fly-across');
    
    // 2. Khi Santa bay đến giữa màn hình (khoảng 2.5s) thì thả quà
    setTimeout(() => {
        gift.classList.remove('hidden');
        gift.classList.add('drop-animation');
    }, 2500);
}

function openGift() {
    const gift = document.getElementById('gift-box');
    const introScene = document.getElementById('scene-intro');
    const loadingScene = document.getElementById('scene-loading');
    
    // 1. Hiệu ứng nổ quà
    gift.classList.add('open-gift-anim');
    
    // 2. Chuyển sang màn hình Loading sau 0.5s
    setTimeout(() => {
        introScene.classList.add('hidden');
        loadingScene.classList.remove('hidden');
        runLoading();
    }, 500);
    
    // Thử bật nhạc (nếu trình duyệt cho phép)
    try {
        const audio = document.getElementById('bg-music');
        audio.play().catch(() => console.log("Cần tương tác để bật nhạc"));
        document.querySelector('.music-control').classList.add('music-playing');
    } catch(e) {}
}

function runLoading() {
    const bar = document.querySelector('.progress-fill');
    const loadingScene = document.getElementById('scene-loading');
    const mainScene = document.getElementById('scene-main');
    let width = 0;
    
    // Giả lập loading trong 3 giây
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            // Loading xong -> Hiện Main
            setTimeout(() => {
                loadingScene.classList.add('hidden');
                mainScene.classList.remove('hidden');
                mainScene.classList.add('fade-in');
                startTypewriter(); // Bắt đầu gõ chữ
            }, 500);
        } else {
            width++;
            bar.style.width = width + '%';
        }
    }, 30); // Tốc độ loading
}

// --- 3. CÁC CHỨC NĂNG CỦA MAIN SCENE ---

// Gõ chữ
const text = "Merry Christmas, Công chúa của anh! 🎄🎅";
let i = 0;
function startTypewriter() {
    if (i < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(i);
        i++;
        setTimeout(startTypewriter, 100);
    }
}

// Đếm ngày
setInterval(() => {
    const now = new Date();
    const diff = now - config.date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('clock').innerText = days + " ngày bên nhau";
}, 1000);

// Nút Âm nhạc
function toggleMusic() {
    const audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play();
        document.querySelector('.music-control').classList.add('music-playing');
    } else {
        audio.pause();
        document.querySelector('.music-control').classList.remove('music-playing');
    }
}

// Scroll mượt
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Modal Thư
function openLetter() { document.getElementById('letter-modal').style.display = 'flex'; }
function closeLetter() { document.getElementById('letter-modal').style.display = 'none'; }