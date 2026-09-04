/* =========================================================
   NEXA AI
   JAVASCRIPT
========================================================= */


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

});


document.querySelectorAll(".mobile-menu a")
.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

    });

});


/* =========================================================
   SEARCH
========================================================= */

const heroSearch =
    document.getElementById("heroSearch");

const searchButton =
    document.getElementById("searchButton");

const toolCards =
    document.querySelectorAll(".tool-card");


function performSearch() {

    const query =
        heroSearch.value
        .trim()
        .toLowerCase();


    if (!query) {

        toolCards.forEach(card => {

            card.classList.remove("hidden");

        });

        return;

    }


    let found = false;


    toolCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const category =
            card.dataset.category.toLowerCase();

        const description =
            card.querySelector("p")
            .textContent
            .toLowerCase();


        if (
            name.includes(query) ||
            category.includes(query) ||
            description.includes(query)
        ) {

            card.classList.remove("hidden");

            found = true;

        } else {

            card.classList.add("hidden");

        }

    });


    document
        .getElementById("trending")
        .scrollIntoView({
            behavior: "smooth"
        });


    if (!found) {

        console.log(
            "No AI tools found for:",
            query
        );

    }

}


searchButton.addEventListener(
    "click",
    performSearch
);


heroSearch.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            performSearch();

        }

    }
);


/* =========================================================
   POPULAR SEARCH BUTTONS
========================================================= */

document.querySelectorAll(
    ".popular-searches button"
)
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            heroSearch.value =
                button.dataset.search;

            performSearch();

        }
    );

});


/* =========================================================
   CATEGORY FILTER
========================================================= */

const categoryButtons =
    document.querySelectorAll(
        ".category-card"
    );


categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const category =
                button.dataset.category;


            categoryButtons.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );


            button.classList.add("active");


            heroSearch.value = "";


            toolCards.forEach(card => {

                if (
                    category === "All" ||
                    card.dataset.category === category
                ) {

                    card.classList.remove(
                        "hidden"
                    );

                } else {

                    card.classList.add(
                        "hidden"
                    );

                }

            });


            document
                .getElementById("trending")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});


/* =========================================================
   TOOL MODAL
========================================================= */

const modal =
    document.getElementById("toolModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalClose =
    document.getElementById("modalClose");

const modalOverlay =
    document.querySelector(".modal-overlay");


const descriptions = {

    WriteAI:
        "WriteAI helps you create articles, emails, social media posts and marketing content using artificial intelligence.",

    PixelMind:
        "PixelMind transforms your ideas into beautiful AI-generated images and creative artwork.",

    CodeNova:
        "CodeNova is an AI coding companion designed to help you generate, understand and debug code.",

    MotionAI:
        "MotionAI turns text and creative ideas into engaging AI-generated video content.",

    StudyFlow:
        "StudyFlow helps students generate notes, quizzes and flashcards from their learning material.",

    MarketMind:
        "MarketMind helps businesses create marketing campaigns, social content and creative strategies."
};


document.querySelectorAll(
    ".tool-button"
)
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const tool =
                button.dataset.tool;


            modalTitle.textContent =
                tool;


            modalDescription.textContent =
                descriptions[tool] ||
                "Discover this powerful AI tool on NEXA AI.";


            modal.classList.add("open");


            document.body.style.overflow =
                "hidden";

        }
    );

});


function closeModal() {

    modal.classList.remove("open");

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


modalOverlay.addEventListener(
    "click",
    closeModal
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("open")
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   NEWSLETTER
========================================================= */

const newsletter =
    document.getElementById("newsletter");


newsletter.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const email =
            newsletter.querySelector(
                "input"
            ).value;


        if (email) {

            alert(
                `Welcome to NEXA AI! 🚀\n\n${email} has been added to the newsletter.`
            );


            newsletter.reset();

        }

    }
);


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }
);


backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".category-card, .tool-card, .feature, .dashboard-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.animate(
                        [
                            {
                                opacity: 0,
                                transform:
                                    "translateY(25px)"
                            },

                            {
                                opacity: 1,
                                transform:
                                    "translateY(0)"
                            }
                        ],
                        {
                            duration: 600,
                            easing:
                                "cubic-bezier(.2,.7,.2,1)",
                            fill: "forwards"
                        }
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(
    element =>
        observer.observe(element)
);


/* =========================================================
   PARTICLE BACKGROUND
========================================================= */

const canvas =
    document.getElementById(
        "particles"
    );

const ctx =
    canvas.getContext("2d");


let particles = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.size =
            Math.random() * 1.5 + .5;

        this.speedX =
            (Math.random() - .5) * .25;

        this.speedY =
            (Math.random() - .5) * .25;

        this.opacity =
            Math.random() * .5 + .1;

    }


    update() {

        this.x += this.speedX;

        this.y += this.speedY;


        if (
            this.x < 0 ||
            this.x > canvas.width
        ) {

            this.speedX *= -1;

        }


        if (
            this.y < 0 ||
            this.y > canvas.height
        ) {

            this.speedY *= -1;

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(139,92,246,${this.opacity})`;

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 600
            ? 45
            : 90;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}


createParticles();


window.addEventListener(
    "resize",
    createParticles
);


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


/* =========================================================
   CURSOR GLOW EFFECT
========================================================= */

let mouseX = 0;
let mouseY = 0;


document.addEventListener(
    "mousemove",
    event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    }
);


const cursorGlow =
    document.createElement("div");


cursorGlow.style.position =
    "fixed";

cursorGlow.style.width =
    "250px";

cursorGlow.style.height =
    "250px";

cursorGlow.style.borderRadius =
    "50%";

cursorGlow.style.pointerEvents =
    "none";

cursorGlow.style.zIndex =
    "-1";

cursorGlow.style.background =
    "radial-gradient(circle, rgba(139,92,246,.08), transparent 70%)";

cursorGlow.style.transform =
    "translate(-50%, -50%)";


document.body.appendChild(
    cursorGlow
);


function updateCursorGlow() {

    cursorGlow.style.left =
        mouseX + "px";

    cursorGlow.style.top =
        mouseY + "px";


    requestAnimationFrame(
        updateCursorGlow
    );

}


updateCursorGlow();


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c✦ NEXA AI",
    "font-size:25px;font-weight:bold;"
);

console.log(
    "Welcome to the future of AI discovery."
);
