<?php
// Récupérer les données JSON envoyées par le formulaire
$formData = json_decode(file_get_contents('php://input'), true);

// Valider les données (à adapter selon vos besoins)
if (empty($formData['nom']) || empty($formData['email'])) {
    http_response_code(400); // Bad Request
    echo "Erreur : Nom et email sont obligatoires.";
    exit;
}

// Nettoyer les données (exemple basique, à améliorer)
$nom = htmlspecialchars(trim($formData['nom']));
$email = filter_var($formData['email'], FILTER_SANITIZE_EMAIL);

// Formater les données pour le fichier texte
$data = "Nom : " . $nom . "\n";
$data .= "Email : " . $email . "\n";
$data .= "Appareils : " . implode(", ", array_keys(array_filter($formData['appareils']))) . "\n";
$data .= "Niveau : " . $formData['niveauConnaissance'] . "\n";
$data .= "Disponibilités : " . implode(", ", array_keys(array_filter($formData['joursDisponibles']))) . " - " . $formData['plageHoraire'] . "\n";
$data .= "Remarques : " . htmlspecialchars(trim($formData['remarques'])) . "\n";
$data .= "--------------------\n";

// Enregistrer les données dans le fichier texte
$file = fopen('inscriptions.txt', 'a'); // Ouvre le fichier en mode "ajout"
fwrite($file, $data);
fclose($file);

// Répondre au client (succès)
http_response_code(200); // OK
echo "Inscription enregistrée avec succès !";
?>
