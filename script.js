document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SELECTORS
    const loader = document.getElementById('loader');
    const flash = document.getElementById('flash-overlay');
    const scenes = document.querySelectorAll('.scene');
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const bgMusic = document.getElementById('bgMusic');
    const clickSound = document.getElementById('clickSound');
    
    let currentStep = 0;

    // 2. FIX VIEWPORT HP
    const fixViewportHeight = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', fixViewportHeight);
    fixViewportHeight();

    // 3. PRELOADER
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            startSequence();
        }, 500);
    }, 2500);

    // 4. SEQUENCE CONTROLLER
    function startSequence() {
        goToScene(0); // Scene: DORR!
        playAudio(bgMusic); 
        
        // Jeda 2 detik dari DORR ke Hi Aul
        setTimeout(() => {
            goToScene(1);
        }, 2000);
    }

    function goToScene(index) {
        // Sembunyikan semua scene dulu
        scenes.forEach(s => {
            s.style.display = 'none';
            s.classList.remove('active');
        });

        // Efek Kilatan (Flash) pas masuk ke "Hi Aul"
        if (index === 1) {
            flash.style.display = 'block';
            flash.style.opacity = '1';
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => { flash.style.display = 'none'; }, 500);
            }, 600);
        }

        // Tampilkan scene yang dipilih
        scenes[index].style.display = 'flex';
        setTimeout(() => {
            scenes[index].classList.add('active');
        }, 50);
        
        currentStep = index;
    }

    // --- INI YANG TADI KURANG: CLICK ANYWHERE TO PROCEED ---
    // Pas di layar "Hi Aul", klik dimana aja buat lanjut ke "Mau jalan ga?"
    document.addEventListener('touchstart', (e) => {
        if (currentStep === 1) {
            goToScene(2);
        }
    }, { passive: false });

    document.addEventListener('click', (e) => {
        if (currentStep === 1) {
            goToScene(2);
        }
    });

    // 5. TOMBOL ENGGAK (KABUR-KABURAN)
    const moveButton = (e) => {
        if (e) e.preventDefault();
        
        const btnW = btnNo.offsetWidth;
        const btnH = btnNo.offsetHeight;
        const margin = 50;

        const maxX = window.innerWidth - btnW - margin;
        const maxY = window.innerHeight - btnH - margin;

        const x = Math.random() * (maxX - margin) + margin;
        const y = Math.random() * (maxY - margin) + margin;

        btnNo.style.position = 'fixed';
        btnNo.style.left = x + 'px';
        btnNo.style.top = y + 'px';
        btnNo.style.transform = 'none';
        btnNo.style.zIndex = '10000';
        
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    };

    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButton();
    });
    btnNo.addEventListener('mouseover', moveButton);

    // 6. TOMBOL YES
    btnYes.addEventListener('click', (e) => {
        e.stopPropagation(); // Biar gak trigger event click document
        goToScene(3);
        createConfetti();
    });

    // 7. DECORATIVE & AUDIO
    function createConfetti() {
        const confettiContainer = document.getElementById('confetti');
        const colors = ['#ff4d6d', '#ffb3c1', '#fff', '#ff758f'];
        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animation = `drop ${Math.random() * 3 + 2}s linear forwards`;
            confettiContainer.appendChild(piece);
        }
    }

    function playAudio(audio) {
        audio.volume = 0.5;
        audio.play().catch(() => {
            console.log("Menunggu interaksi user...");
        });
    }

    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(b => {
        b.style.left = Math.random() * 100 + "vw";
        b.style.animationDelay = Math.random() * 5 + "s";
    });
});
