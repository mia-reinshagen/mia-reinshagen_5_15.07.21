if (localStorage.getItem("recapnewCommand") != null) {
    localStorage.clear(); //supprime le localstorage sur tout les pages sauf confirmation (pas lié à application.js)
}

function showProductNumber() { // nb de produit dans le panier

    let cartData = JSON.parse(localStorage.getItem('cart'));
    let somme = 0;

    if (cartData) { // si element dans panier alors somme
        cartData.forEach(teddy => {
            somme = somme + parseInt(teddy.quantity); // parseInt = somme et pas une concatenation (convertir la quantité) au lieu de 10 + 20 -> 1020
        })
    }

    document.querySelector(".nombre_produit").textContent = somme;
}
showProductNumber();

function getIdByUrl() {
    let urlId = new URLSearchParams(document.location.search).get("id");
    return urlId
}