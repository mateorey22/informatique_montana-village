const tabs = document.querySelectorAll('.tab');
const tabsContents = document.querySelectorAll('.tabs-content');
const form = document.getElementById('inscriptionForm');
const inscriptionMessage = document.getElementById('inscription-message');
const inscriptionError = document.getElementById('inscription-error');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.target;

        tabs.forEach(t => t.classList.remove('active'));
        tabsContents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});

// Affiche l'onglet accueil par défaut
document.querySelector('.tab[data-target="accueil"]').click();

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = {
        nom: document.getElementById('nom').value,
        email: document.getElementById('email').value,
        appareils: {
            ordinateurPortable: document.getElementById('ordinateurPortable').checked,
            ordinateurBureau: document.getElementById('ordinateurBureau').checked,
            tablette: document.getElementById('tablette').checked,
            smartphone: document.getElementById('smartphone').checked,
            montreConnectee: document.getElementById('montreConnectee').checked,
            televisionConnectee: document.getElementById('televisionConnectee').checked
        },
        niveauConnaissance: document.querySelector('input[name="niveau"]:checked')?.value || '',
        joursDisponibles: {
            lundi: document.getElementById('lundi').checked,
            mardi: document.getElementById('mardi').checked,
            mercredi: document.getElementById('mercredi').checked,
            jeudi: document.getElementById('jeudi').checked,
            vendredi: document.getElementById('vendredi').checked
        },
        plageHoraire: document.getElementById('plageHoraire').value,
        remarques};

    // Enregistrement des données dans un fichier texte (côté serveur)
    fetch('enregistrer_inscription.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'inscription.');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); // Affiche la réponse du serveur (succès ou erreur)
        inscriptionMessage.classList.remove('hidden'); // Affiche le message de confirmation
        inscriptionError.classList.add('hidden'); // Cache le message d'erreur
        form.reset(); // Réinitialise le formulaire

        // Masquer le message de confirmation après 5 secondes
        setTimeout(() => {
            inscriptionMessage.classList.add('hidden');
        }, 5000);
    })
    .catch(error => {
        console.error(error);
        inscriptionError.classList.remove('hidden'); // Affiche le message d'erreur
        inscriptionMessage.classList.add('hidden'); // Cache le message de confirmation
    });
});

// Animation au scroll pour le bouton d'inscription de la page d'accueil
const inscriptionButton = document.querySelector('[data-scroll-to="inscription"]');
if (inscriptionButton) {
    inscriptionButton.addEventListener('click', () => {
        document.querySelector('.tab[data-target="inscription"]').click(); // Change d'onglet
        document.getElementById('inscription').scrollIntoView({ behavior: 'smooth' }); // Scrolle vers la section
    });
}

// Création des bulles pour l'animation d'arrière-plan
const backgroundAnimation = document.getElementById('background-animation');

function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 60 + 20; // Taille entre 20px et 80px
    const animationDuration = Math.random() * 4 + 6; // Durée entre 6s et 10s
    const animationDelay = Math.random() * 5; // Délai entre 0s et 5s

    // Générer des valeurs aléatoires pour le mouvement et l'échelle
    const moveX = (Math.random() - 0.5) * 40;
    const moveY = (Math.random() - 0.5) * 40;
    const scale = 0.5 + Math.random() * 0.5; // Échelle entre 0.5 et 1

    bubble.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${animationDuration}s;
        animation-delay: ${animationDelay}s;
        --move-x: ${moveX}px;
        --move-y: ${moveY}px;
        --scale: ${scale};
    `;

    backgroundAnimation.appendChild(bubble);

    // Supprimer la bulle après son animation
    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });
}

// Créer des bulles périodiquement
for (let i = 0; i < 10; i++) {
    createBubble();
}

// Mettre à jour la position des bulles en fonction de la position de la souris
backgroundAnimation.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const mouseFromCenterX = x - viewportCenterX;
    const mouseFromCenterY = y - viewportCenterY;

    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        // Facteur de mouvement basé sur la distance au centre
        const moveFactorX = mouseFromCenterX * 0.01; // Ajustez la valeur pour modifier l'effet
        const moveFactorY = mouseFromCenterY * 0.01; // Ajustez la valeur pour modifier l'effet

        bubble.style.transform = `translate(${moveFactorX}px, ${moveFactorY}px)`;
    });
});

// Effet 3D avec Vanilla-tilt.js
VanillaTilt.init(document.querySelectorAll(".feature-card, .avantage-item"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    gyroscope: false,
    scale: 1.05
});
