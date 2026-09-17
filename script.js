/* =========================================
   A LITTLE WORLD FOR YOU ❤️
   COMPLETE JAVASCRIPT
========================================= */

function get(id) {
    return document.getElementById(id);
}


/* =========================================
   HEART SYSTEM
========================================= */

const heartContainer = get("heart-container");

function createHeart(amount = 1, mode = "normal") {

    if (!heartContainer) return;

    const symbols = ["♥", "♥", "❤", "♡", "💗"];

    for (let i = 0; i < amount; i++) {

        const heart = document.createElement("span");

        heart.className = "floating-heart";

        if (mode === "strong") {
            heart.classList.add("strong");
        }

        if (mode === "rain") {
            heart.classList.add("rain");
        }

        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left = Math.random() * 100 + "%";

        heart.style.fontSize =
            (mode === "rain"
                ? 18 + Math.random() * 30
                : 12 + Math.random() * 22) + "px";

        heart.style.animationDuration =
            (mode === "rain"
                ? 2.5 + Math.random() * 3
                : 4 + Math.random() * 5) + "s";

        heart.style.animationDelay =
            Math.random() * 0.5 + "s";

        heart.style.setProperty(
            "--drift",
            Math.random() * 180 - 90 + "px"
        );

        heart.style.setProperty(
            "--rotation",
            Math.random() * 700 - 350 + "deg"
        );

        if (mode === "rain") {
            heart.style.top =
                -50 - Math.random() * 250 + "px";

            heart.style.bottom = "auto";
        }

        heartContainer.appendChild(heart);

        setTimeout(function () {

            if (heart.parentNode) {
                heart.remove();
            }

        }, mode === "rain" ? 6500 : 11000);
    }
}


setInterval(function () {
    createHeart(1);
}, 4500);


function heartRain(amount = 100) {
    createHeart(amount, "rain");
}


function flashScreen() {

    const flash = get("cinematicFlash");

    if (!flash) return;

    flash.classList.remove("active");

    void flash.offsetWidth;

    flash.classList.add("active");
}


/* =========================================
   OPENING HEART
========================================= */

const openHeart = get("openHeart");
const openingHeart = get("openingHeart");

if (openHeart && openingHeart) {

    openHeart.addEventListener("click", function () {

        openHeart.disabled = true;

        openingHeart.classList.add("active");

        flashScreen();

        createHeart(15, "strong");

        const music = get("bgMusic");

        if (music) {

            music.volume = 0.45;

            music.play().then(function () {

                const musicButton = get("musicBtn");

                if (musicButton) {
                    musicButton.textContent = "♫";
                }

            }).catch(function () {});
        }


        setTimeout(function () {

            const letter =
                document.querySelector(".letter-section");

            if (letter) {

                letter.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }, 1450);

    });
}


/* =========================================
   MEMORY BUTTONS
========================================= */

const memoryButtons =
    document.querySelectorAll(".memory-btn");

memoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const card =
            this.closest(".timeline-card");

        if (!card) return;

        card.classList.toggle("open");

        if (card.classList.contains("open")) {

            this.textContent = "Close memory";

            createHeart(6, "strong");

        } else {

            this.textContent = "Open memory";

        }

    });

});


/* =========================================
   TURNING POINT
========================================= */

const turningSection =
    document.querySelector(".turning-section");

if (turningSection && "IntersectionObserver" in window) {

    const turningObserver =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        }, {
            threshold: 0.2
        });

    turningObserver.observe(turningSection);
}


/* =========================================
   TRAITS
========================================= */

const traits =
    document.querySelectorAll(".trait");

if ("IntersectionObserver" in window) {

    const traitObserver =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        }, {
            threshold: 0.15
        });

    traits.forEach(function (trait) {

        traitObserver.observe(trait);

    });
}


/* =========================================
   MYSTERY CARDS
========================================= */

const mysteryCards =
    document.querySelectorAll(".mystery-card");

mysteryCards.forEach(function (card) {

    card.addEventListener("click", function () {

        this.classList.toggle("open");

        if (this.classList.contains("open")) {

            createHeart(4, "strong");

        }

    });

});


/* =========================================
   SECRET SHAYARI
========================================= */

const secretShayari =
    get("secretShayari");

const hiddenShayari =
    get("hiddenShayari");

if (secretShayari && hiddenShayari) {

    secretShayari.addEventListener("click", function () {

        hiddenShayari.classList.toggle("show");

        createHeart(7, "strong");

    });

}


/* =========================================
   REASONS SECTION
   SLOW + REPEAT
========================================= */

const reasonsSection =
    document.querySelector(".reasons-section");

const reasonNumber =
    get("reasonNumber");

const reasonText =
    get("reasonText");

const reasonEnd =
    get("reasonEnd");


const reasonLines = [

    "Your smile. ❤️",
    "Your voice. 🌸",
    "Your chashma. 🤓❤️",
    "Your hair. ✨",
    "Your cute little expressions. 🥺",
    "The way you talk. 💗",
    "Your nature. 🌷",
    "Your little habits. ❤️",
    "The way you make ordinary moments special.",
    "Simply... YOU. ❤️"

];


let reasonRunning = false;


function startReasons() {

    if (reasonRunning) return;

    reasonRunning = true;

    let number = 0;

    let lineIndex = 0;

    if (reasonEnd) {
        reasonEnd.classList.remove("show");
    }


    function showNextReason() {

        number++;

        if (reasonNumber) {
            reasonNumber.textContent = number;
        }


        if (reasonText) {

            reasonText.style.opacity = "0";

            setTimeout(function () {

                reasonText.textContent =
                    reasonLines[lineIndex];

                reasonText.style.opacity = "1";

                lineIndex++;

                if (lineIndex >= reasonLines.length) {
                    lineIndex = 0;
                }

            }, 250);
        }


        createHeart(2);


        if (number < 100) {

            /* SLOW SPEED */

            setTimeout(showNextReason, 230);

        } else {

            /* LAST NUMBER */

            if (reasonText) {

                reasonText.textContent =
                    "Okay... I could keep going forever. ❤️";

            }

            if (reasonEnd) {

                reasonEnd.classList.add("show");

            }


            /* WAIT BEFORE RESTART */

            setTimeout(function () {

                number = 0;

                lineIndex = 0;

                if (reasonEnd) {
                    reasonEnd.classList.remove("show");
                }

                if (reasonNumber) {
                    reasonNumber.textContent = "0";
                }

                if (reasonText) {
                    reasonText.textContent =
                        "And here we go again... ❤️";
                }

                createHeart(8, "strong");


                /* START AGAIN AFTER WAIT */

                setTimeout(function () {

                    reasonRunning = false;

                    startReasons();

                }, 2200);

            }, 4500);
        }

    }


    showNextReason();
}


if (reasonsSection && "IntersectionObserver" in window) {

    const reasonsObserver =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    startReasons();

                }

            });

        }, {
            threshold: 0.3
        });

    reasonsObserver.observe(reasonsSection);

} else if (reasonsSection) {

    startReasons();

}


/* =========================================
   I LOVE YOU IMAGE SYSTEM
========================================= */

function createLoveImages() {

    const loveReveal =
        get("loveReveal");

    if (!loveReveal) return;


    /* Prevent duplicate images */

    const oldImages =
        loveReveal.querySelector(".love-image-stack");

    if (oldImages) {
        oldImages.remove();
    }


    const stack =
        document.createElement("div");

    stack.className =
        "love-image-stack";


    /* 5 PHOTOS */

    const photos = [
        "images/photo2.jpg",
        "images/photo3.jpg",
        "images/photo4.jpg",
        "images/photo5.jpg",
        "images/photo6.jpg"
    ];


    photos.forEach(function (src, index) {

        const img =
            document.createElement("img");

        img.src = src;

        img.className =
            "love-memory-image";


        img.style.setProperty(
            "--image-index",
            index
        );


        img.style.animationDelay =
            index * 0.55 + "s";


        stack.appendChild(img);

    });


    loveReveal.appendChild(stack);


    /* Start rotating */

    setTimeout(function () {

        stack.classList.add("active");

    }, 100);

}


/* =========================================
   I LOVE YOU CLIMAX
========================================= */

const loveButton =
    get("loveBtn");

const loveText =
    get("loveText");

const loveQuestion =
    get("loveQuestion");

const loveReveal =
    get("loveReveal");


if (
    loveButton &&
    loveText &&
    loveQuestion &&
    loveReveal
) {

    loveButton.addEventListener("click", function () {

        loveButton.disabled = true;


        loveButton.style.opacity = "0";

        loveText.style.opacity = "0";

        loveQuestion.style.opacity = "0";


        setTimeout(function () {

            loveButton.style.display = "none";

            loveText.style.display = "none";

            loveQuestion.style.display = "none";


            loveReveal.classList.add("show");


            flashScreen();


            /* CREATE 5 ROTATING IMAGES */

            createLoveImages();


            /* HEART EXPLOSION */

            createHeart(50, "strong");


            /* HEART RAIN */

            setTimeout(function () {

                heartRain(70);

            }, 300);


            setTimeout(function () {

                heartRain(90);

            }, 800);


            setTimeout(function () {

                heartRain(110);

            }, 1300);


            setTimeout(function () {

                heartRain(80);

            }, 1900);


            setTimeout(function () {

                createHeart(50, "strong");

            }, 2500);


        }, 650);

    });

}


/* =========================================
   SECRET HEART
========================================= */

const secretHeart =
    get("secretHeart");

const secretMessage =
    get("secretMessage");


if (secretHeart && secretMessage) {

    secretHeart.addEventListener("click", function () {

        secretMessage.classList.toggle("show");

        createHeart(10, "strong");

    });

}


/* =========================================
   PROPOSAL
========================================= */

const yesButton =
    get("yesBtn");

const noButton =
    get("noBtn");

const noMessage =
    get("noMessage");


let noClicks = 0;


const noLines = [

    "Are you sure? 🥺",

    "Ek baar aur soch lo... 👀❤️",

    "Last chance... 😭❤️",

    "Puchki, seriously? 🥺"

];


if (noButton) {

    noButton.addEventListener("click", function () {

        noClicks++;


        /* FIRST 3 NO CLICKS */

        if (noClicks < 4) {

            if (noMessage) {

                noMessage.textContent =
                    noLines[noClicks - 1];

            }


            const x =
                Math.random() * 80 - 40;

            const y =
                Math.random() * 30 - 15;


            noButton.style.transform =
                "translate(" +
                x +
                "px, " +
                y +
                "px)";


            createHeart(3);

            return;
        }


        /* =================================
           FINAL NO CLICK
        ================================= */

        noButton.style.transform = "none";

        noButton.textContent =
            "No option used ❤️";

        noButton.disabled = true;

        noButton.style.opacity = "0.45";

        noButton.style.cursor =
            "not-allowed";


        if (noMessage) {

            noMessage.textContent =
                "Okay... now there is only one choice left. ❤️";

        }


        createHeart(12, "strong");

    });

}


/* =========================================
   YES FINAL CLIMAX
========================================= */

if (yesButton) {

    yesButton.addEventListener("click", function () {

        const proposal =
            document.querySelector(".proposal-section");

        const finalSection =
            get("finalSection");


        if (!finalSection) return;


        yesButton.disabled = true;


        if (proposal) {

            proposal.style.display = "none";

        }


        finalSection.classList.add("show");

        document.body.classList.add(
            "finale-mode"
        );


        flashScreen();


        setTimeout(function () {

            finalSection.scrollIntoView({
                behavior: "smooth"
            });

        }, 100);


        /* HUGE HEART */

        createHeart(60, "strong");


        /* MASSIVE HEART RAIN */

        heartRain(100);


        setTimeout(function () {

            heartRain(120);

        }, 400);


        setTimeout(function () {

            heartRain(140);

        }, 800);


        setTimeout(function () {

            heartRain(160);

        }, 1200);


        setTimeout(function () {

            heartRain(130);

        }, 1700);


        setTimeout(function () {

            heartRain(100);

        }, 2300);


        setTimeout(function () {

            createHeart(60, "strong");

        }, 2800);

    });

}


/* =========================================
   MUSIC BUTTON
========================================= */

const musicBtn =
    get("musicBtn");

const bgMusic =
    get("bgMusic");


if (musicBtn && bgMusic) {

    musicBtn.addEventListener("click", function () {

        if (bgMusic.paused) {

            bgMusic.play().then(function () {

                musicBtn.textContent = "♫";

            }).catch(function () {});

        } else {

            bgMusic.pause();

            musicBtn.textContent = "🔇";

        }

    });

}


/* =========================================
   EXTRA SCROLL HEARTS
========================================= */

let lastScroll =
    window.scrollY;


window.addEventListener("scroll", function () {

    const currentScroll =
        window.scrollY;


    if (
        Math.abs(currentScroll - lastScroll) > 350
    ) {

        createHeart(2);

        lastScroll = currentScroll;

    }

});


/* =========================================
   INITIAL HEARTS
========================================= */

setTimeout(function () {

    createHeart(8);

}, 800);