// Registrar el plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Animación de Entrada (Intro)
    const tlIntro = gsap.timeline();
    
    tlIntro.from(".intro-scene .title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    })
    .from(".intro-scene .subtitle", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1")
    .from(".scroll-indicator", {
        opacity: 0,
        duration: 1
    }, "-=0.5");

    // Efecto Parallax en el fondo de la Intro al hacer scroll
    gsap.to(".intro-scene .parallax-bg", {
        scale: 1.2,
        y: 100,
        ease: "none",
        scrollTrigger: {
            trigger: ".intro-scene",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 2. Animaciones Generales de Escenas
    // Para cada sección, los elementos aparecen suavemente al entrar en pantalla (Cinematic fade)
    const scenes = gsap.utils.toArray('.scene:not(.intro-scene)');

    scenes.forEach(scene => {
        const textBlock = scene.querySelector('.text-block');
        const visualBlock = scene.querySelector('.visual-block');
        const cards = scene.querySelectorAll('.info-card');
        const table = scene.querySelector('.table-container');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scene,
                start: "top 70%", // Comienza cuando el tope de la escena llega al 70% del viewport
                end: "bottom 80%",
                toggleActions: "play none none reverse" // play, pause, resume, reverse, etc.
            }
        });

        // Si hay bloque de texto, lo animamos
        if (textBlock) {
            tl.from(textBlock.children, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }

        // Si hay bloque visual (imagen), lo animamos
        if (visualBlock) {
            tl.from(visualBlock, {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.6");
        }

        // Si hay tarjetas (CFB/OFB)
        if (cards.length > 0) {
            tl.from(cards, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }

        // Si hay tabla
        if (table) {
            tl.from(table, {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }
    });

    // 3. Efectos Parallax en Fondos de Escenas
    const parallaxBgs = gsap.utils.toArray('.layer-2, .layer-3');
    parallaxBgs.forEach(bg => {
        gsap.to(bg, {
            y: "20%", // Se mueve un 20% más lento que el scroll
            ease: "none",
            scrollTrigger: {
                trigger: bg.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 4. Pinned Sections (Ejemplo: anclar la tabla comparativa para que se lea con calma)
    /* 
    Podemos hacer que ciertas secciones se queden "fijas" mientras el usuario hace scroll 
    y ocurren animaciones dentro de ellas. Aquí hacemos un ligero anclaje en CTR.
    */
    ScrollTrigger.create({
        trigger: "#ctr",
        start: "top top",
        end: "+=30%", // Se ancla por una distancia del 30% del viewport
        pin: false, // Cambiar a true si queremos que se detenga por completo el scroll
        // pinSpacing: true,
    });

    // 5. Animación continua para los brillos de ambiente
    gsap.to(".ambient-glow", {
        opacity: 0.5,
        scale: 1.1,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    // Pequeño efecto flotante para las tarjetas visuales
    gsap.to(".floating-card", {
        y: -10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });
});
