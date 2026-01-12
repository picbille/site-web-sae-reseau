// Initialisation des variables globales
let slideIndex = 1;           // On commence à la première slide
let autoTimeout;              // Pour le timer du défilement automatique
let isPaused = false;         // État de pause (quand la souris est sur le carousel)

// Lancement initial
showSlides(slideIndex);
startAutoScroll();

// Fonction principale pour afficher une slide
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // Gestion des boucles (si on dépasse le nombre de slides)
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // Cacher toutes les slides et retirer la classe active
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active-slide");
    }

    // Retirer la classe active des dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Afficher la slide courante et activer le dot correspondant
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add("active-slide");
    dots[slideIndex - 1].className += " active";

    // Réinitialiser le highlight des thumbnails pour la nouvelle slide
    resetThumbnails(slides[slideIndex - 1]);
}

// Fonction pour passer à la slide suivante/précédente (flèches)
function plusSlides(n) {
    clearTimeout(autoTimeout);       // Arrête le timer actuel
    showSlides(slideIndex += n);
    if (!isPaused) startAutoScroll(); // Relance auto si pas en pause
}

// Fonction pour aller directement à une slide (clic sur dot)
function currentSlide(n) {
    clearTimeout(autoTimeout);
    showSlides(slideIndex = n);
    if (!isPaused) startAutoScroll();
}

// Fonction pour changer l'image principale quand on clique sur une miniature
function changeImage(thumbElement) {
    // Récupère l'image principale du slide courant
    const mainImage = thumbElement.closest(".slide-image").querySelector(".main-img");

    // Effet fade out
    mainImage.style.opacity = "0";

    setTimeout(() => {
        // Change la source et l'alt
        mainImage.src = thumbElement.src;
        mainImage.alt = thumbElement.alt;

        // Fade in
        mainImage.style.opacity = "1";

        // Met à jour le highlight des thumbnails
        const allThumbs = thumbElement.parentNode.querySelectorAll("img");
        allThumbs.forEach(thumb => thumb.classList.remove("active"));
        thumbElement.classList.add("active");
    }, 400); // Temps du fade (synchronisé avec CSS transition)
}

// Réinitialise le highlight des thumbnails au changement de slide (première active)
function resetThumbnails(currentSlide) {
    const thumbs = currentSlide.querySelectorAll(".thumbnails img");
    if (thumbs.length > 0) {
        thumbs.forEach(t => t.classList.remove("active"));
        thumbs[0].classList.add("active");
    }
}

// Défilement automatique toutes les 3 secondes
function startAutoScroll() {
    autoTimeout = setTimeout(() => {
        plusSlides(1);
    }, 3000);
}

// Pause du défilement automatique quand la souris est sur le carousel
const carouselContainer = document.querySelector(".slideshow-container");

carouselContainer.addEventListener("mouseenter", () => {
    clearTimeout(autoTimeout);
    isPaused = true;
});

carouselContainer.addEventListener("mouseleave", () => {
    isPaused = false;
    startAutoScroll();
});