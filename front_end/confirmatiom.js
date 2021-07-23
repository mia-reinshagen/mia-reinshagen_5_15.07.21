const local = JSON.parse(localStorage.getItem("user")); // enregister les donnés user 

if(local != null)
{ 
    formulaire.style.display = "none";
    h2.textContent = `Merci pour ta commande ${local.prenom,local.nom}`; // j'aimerai qu'il maffiche cette ligne
}
// vu qu'on utilise que des " " -> ca veut dire qu'on utilise uniquement des valeurs string 

bouton.onclick = () => { // au clic du bouton on va enregister une valeur 
    const user = { // on a créé un objet user qui contient nom.... 
        civilite : civilite.value,
        nom: nom.value,
        prenom: prenom.value,
        mail : mail.value,
        adresse : adresse.value,
        ville : ville.value,
        pays : pays.value,
    }
    localStorage.setItem("user",JSON.stringify(user)); // la valeur = contenu de notre input html 
    document.location.reload(); 
}

clearInterval.onclick = () => {
    localStorage.clear(); // quand on click sur le bouton clear, tout redevient comme avant 
    document.location.reload(); // permet de rafraichir la page automatiquement
}

// avec le localStorage, on peut enregistrer une données, 