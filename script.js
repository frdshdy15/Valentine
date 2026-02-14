/**
 * FOR AULIA PUTRI DIKARA
 * 14 February 2026
 * The "Trillion Dollar" Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SELECTORS & CORE VARIABLES
    const loader = document.getElementById('loader');
    const flash = document.getElementById('flash-overlay');
    const scenes = document.querySelectorAll('.scene');
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const bgMusic = document.getElementById('bgMusic');
    const clickSound = document.getElementById('clickSound');
    
    let currentStep = 0;

    // 2. PRELOADER LOGIC
    // Menunggu 2.5 detik biar kerasa loading premium
    setTimeout(() => {
        loader.classList.add('hidden');
        startSequence();
    }, 2500);

    // 3. THE SEQUENCE CONTROLLER (DORR -> HI AUL -> QUESTION)
    function startSequence() {
        // Step 1: DORR!
        // Langsung muncul setelah loader ilang
        playAudio(bgMusic); 
        
        // Kasih jeda dikit terus pindah ke Hi Aul
        setTimeout(() => {
            goToScene(1); // Ke Hi Aul
        }, 2000);
    }

    // Navigasi antar layar (Transisi smooth)
    function goToScene(index) {
        scenes.forEach(scene => {
            scene.classList.remove('active');
            scene.style.opacity = '0';
        });

        if (index === 1) {
            // Efek Flash Pas Masuk "Hi Aul" biar kaget (DORR!)
            flash.classList.add('flash-active');
            setTimeout(() => flash.classList.remove('flash-active'), 800);
        }

        setTimeout(() => {
            scenes[index].classList.add('active');
            scenes[index].style.opacity = '1';
        }, 100);
        
        currentStep = index;
    }

    // Interaction buat pindah dari "Hi Aul" ke Pertanyaan
    document.body.addEventListener('click', (e) => {
        if (currentStep === 1) {
            goToScene(2); // Pindah ke "Mau jalan ga?"
        }
    });

    // 4. THE "IMPOSSIBLE NO" BUTTON LOGIC (PENTING!)
    // Tombol bakal loncat pas di-hover (PC) atau di-touch (HP)
    const moveButton = () => {
        // Ambil ukuran layar HP biar gak loncat keluar screen
        const padding = 50;
        const maxX = window.innerWidth - btnNo.offsetWidth - padding;
        const maxY = window.innerHeight - btnNo.offsetHeight - padding;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        // Ubah posisi tombol secara absolut
        btnNo.classList.add('p-absolute');
        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
        
        // Tambahin feedback suara klik gagal
        clickSound.currentTime = 0;
        clickSound.play();
    };

    // Trigger buat HP (Touch) dan Mouse (Hover)
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Biar gak kepencet
        moveButton();
    });

    btnNo.addEventListener('mouseover', moveButton);

    // 5. THE "YES" BUTTON LOGIC
    btnYes.addEventListener('click', () => {
        goToScene(3); // Pindah ke "Jangan dianggep serius"
        createConfetti();
    });

    // 6. DECORATIVE: CONFETTI EFFECT
    function createConfetti() {
        const confettiContainer = document.getElementById('confetti');
        const colors = ['#ff4d6d', '#ffb3c1', '#fff', '#ff758f'];
        
        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.style.position = 'absolute';
            piece.style.width = '10px';
            piece.style.height = '10px';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.left = Math.random() * 100 + '%';
            piece.style.top = '-10px';
            piece.style.borderRadius = '50%';
            piece.style.animation = `drop ${Math.random() * 3 + 2}s linear forwards`;
            confettiContainer.appendChild(piece);
        }
    }

    // 7. AUDIO HANDLING
    function playAudio(audio) {
        // Browser butuh interaksi user buat play music
        audio.volume = 0.5;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log("Menunggu klik user buat play musik...");
            });
        }
    }

    // Additional Logic to fill the "Premium System"
    // Loop buat elemen background biar gerak-gerak estetik
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(b => {
        b.style.left = Math.random() * 100 + "vw";
        b.style.animationDelay = Math.random() * 5 + "s";
    });

});

// Custom Animation keyframes via JS
const style = document.createElement('style');
style.textContent = `
    @keyframes drop {
        to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    .p-absolute {
        position: fixed !important;
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 9999;
        width: 100px !important;
    }
`;
document.head.appendChild(style);

// Fix buat masalah 100vh di browser HP
const fixViewportHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', fixViewportHeight);
fixViewportHeight();
