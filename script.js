const tabs = document.querySelectorAll('.tab');
const tabsContents = document.querySelectorAll('.tabs-content');
const form = document.getElementById('inscriptionForm');
const inscriptionMessage = document.getElementById('inscription-message');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.getElementById(tab.dataset.target);

        tabs.forEach(t => t.classList.remove('active'));
        tabsContents.forEach(c => c.classList.add('hidden'));

        tab.classList.add('active');
        target.classList.remove('hidden');
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
        remarques: document.getElementById('remarques').value
    };

    // Enregistrement des données dans un fichier texte (côté serveur)
    fetch('enregistrer_inscription.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Affiche la réponse du serveur (succès ou erreur)
        inscriptionMessage.classList.remove('hidden'); // Affiche le message de confirmation
        form.reset(); // Réinitialise le formulaire

        // Masquer le message de confirmation après 5 secondes
        setTimeout(() => {
            inscriptionMessage.classList.add('hidden');
        }, 5000);
    })
    .catch(error => {
        console.error('Erreur lors de l\'enregistrement:', error);
        // Afficher un message d'erreur à l'utilisateur si nécessaire
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
