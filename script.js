// form.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inscriptionForm');
    // ... (rest of the form code - see below) ...
});



// Function to display form errors
const displayErrors = (errors) => {
  const errorContainer = document.getElementById("formErrors");
  errorContainer.innerHTML = ""; // Clear previous errors


  if (!Array.isArray(errors) || errors.length === 0) {
    errorContainer.classList.add("hidden");
    return;
  }



  errorContainer.classList.remove("hidden");

  const errorList = document.createElement("ul");
  errors.forEach((error) => {
    const errorItem = document.createElement("li");
    errorItem.textContent = error;
    errorList.appendChild(errorItem);
  });
  errorContainer.appendChild(errorList);
};




const getFormData = () => {

    return {
        nom: document.getElementById('nom').value,
        email: document.getElementById('email').value,

        niveauConnaissance: document.querySelector('input[name="niveau"]:checked')?.value || '',


        remarques: document.getElementById('remarques').value

    };
}



const validateForm = (formData) => {
    const errors = [];



    if (!formData.nom) {
        errors.push("Le nom est requis.");
    }


    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push("L'email est invalide.");
    }



    if (!formData.niveauConnaissance) {
      errors.push("Veuillez sélectionner votre niveau de connaissance.");
    }



    return errors;


};




const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = getFormData();
    const errors = validateForm(formData);




    if (errors.length > 0) {

        displayErrors(errors);
        return;
    }


    try {
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });




        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur serveur.");
        }


        displayErrors([]);
        form.reset(); // Reset the form after successful submission

        // Show a success message to the user (you can customize this)
        alert("Votre inscription a été envoyée avec succès!");



    } catch (error) {

        displayErrors([error.message]);
    }
};





// Add event listener and insert form HTML after DOMContentLoaded event

document.addEventListener('DOMContentLoaded', () => {


    const formContainer = document.querySelector('#inscription > .container');


    const formHTML = `
        <form id="inscriptionForm" class="space-y-6">
            <div id="formErrors" class="hidden text-red-500 mb-4"></div>

             <div class="grid grid-cols-1 gap-4">

            </div>

            <button type="submit" class="button bg-blue-500 hover:bg-blue-600">
                Envoyer ma demande d'inscription
            </button>
        </form>
    `;
    formContainer.insertAdjacentHTML('beforeend', formHTML);
    document.getElementById('inscriptionForm').addEventListener('submit', handleSubmit);



});

