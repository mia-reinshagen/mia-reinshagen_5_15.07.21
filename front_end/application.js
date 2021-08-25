function showProductNumber() {

    let cartData = JSON.parse(localStorage.getItem('cart'));
    let somme = 0;

    if (cartData) { // si element dans panier alors somme
        cartData.forEach(teddy => {
            somme = somme + parseInt(teddy.quantity);
        })
    }

    document.querySelector(".nombre_produit").textContent = somme;
}
showProductNumber();

function getIdByUrl() {
    let urlId = new URLSearchParams(document.location.search).get("id");
    return urlId
}

async function getProducts() { // syncroniser avec le local
    try {
        let response = await fetch("http://localhost:3000/api/teddies"); // on attend une reponse
        if (response.ok) {
            let products = await response.json();
            showProducts(products); // afficher les produits
        } else {
            console.error(response.status); // au cas ou pas ligne 4 -> afficher l'erreur
        }
    } catch (error) {
        console.log(error); // au cas ou on retrouve pas les teddy
    }
}

async function getOneProduct(teddyid) { // sans "s" un seul teddy par son id
    console.log(teddyid);
    try {
        let response = await fetch("http://localhost:3000/api/teddies/" + teddyid); // on attend une reponse
        if (response.ok) {
            let product = await response.json();
            showOneProduct(product); // afficher le produits
        } else {
            console.error(response.status); // au cas ou pas ligne 4 -> afficher l'erreur
        }
    } catch (error) {
        console.log(error); // au cas ou on retrouve pas les teddy
    }
}



//Affichage des produits 
function showProducts(products) { // afficher les produits dynamiquement

    let productsHtml = "";
    products.forEach(product => { // pour chaque produit
        productsHtml += `
        <div class="card" style="width:80%;max-width:400px;box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;">
                    <img src="${product.imageUrl}" alt="Norway" style="width:100%">
                    <div class="cardcontainer">
                      <h3 class="card-title">${product.name}</h3>
                      <div class="rating"><!--
                      --><a href="#5" title="Donner 5 étoiles" style="color: blueviolet">☆</a><!--
                      --><a href="#4" title="Donner 4 étoiles"style="color: blueviolet">☆</a><!--
                      --><a href="#3" title="Donner 3 étoiles"style="color: blueviolet">☆</a><!--
                      --><a href="#2" title="Donner 2 étoiles">☆</a><!--
                      --><a href="#1" title="Donner 1 étoile">☆</a>
                   </div>
                      <p class="card-text">Prix: ${product.price / 100}$</p>
                      <br>
                      <br>
                      <a href="produit.html?id=${product._id}" class="btn btn-primary">Voir le Teddy</a>
                    </div>
                  </div>
        `
    });
    document.getElementById("products").innerHTML = productsHtml;

}

//Affichage d'un produit

let product = {};
function showOneProduct(teddy) { // afficher les produits dynamiquement
    product = { ...teddy } // une copie de teddy
    let teddycolors = "";
    teddy.colors.forEach(c => { // c c'est la couleur / nb de couleur -> nb d'affichage 
        teddycolors += // si tu voix tan prend tan
            `
        <option value="${c}">${c}</option> 
        `
    })
    let productHtml = "";
    productHtml =
        `
        <div class="card"
        style="width:80%;max-width:400px;box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);!important;">
        <img src="${teddy.imageUrl}" alt="Norway" style="width:100%">
        <div class="cardcontainer">
            <h3 class="card-title">${teddy.name}</h3>
            <div class="rating">
                <!--
              --><a href="#5" title="Donner 5 étoiles" style="color: blueviolet">☆</a>
                <!--
              --><a href="#4" title="Donner 4 étoiles" style="color: blueviolet">☆</a>
                <!--
              --><a href="#3" title="Donner 3 étoiles" style="color: blueviolet">☆</a>
                <!--
              --><a href="#2" title="Donner 2 étoiles">☆</a>
                <!--
              --><a href="#1" title="Donner 1 étoile">☆</a>
            </div>
            <br>
            <p> ${teddy.description} </p>
            <br>
            <p>Couleurs:</p>
            <select id="teddycolor">
            ${teddycolors}
            </select>
            </div>
            <div class="nombre">
                <p class="card-text">Prix: ${teddy.price / 100}$</p>
                <label for="teddy">Nombres:</label>
                <input value=1 type="number" id="teddy_quantity" name="teddy" min="0" max="10">
                <br>
                <br>
                <button href="panier.html" class="add" onclick="addProductTocart()">Ajouter au panier</button>
                </div>
    </div>
    `
    document.getElementById("product").innerHTML = productHtml;
}

const addProductTocart = () => { // tout ce qui se deroule quand on click ajouter au panier
    const mynewteddy = {
        _id: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        color: teddycolor.value, // c'est une balise qui change, choix de l'utiilisateur alors .value
        price: product.price,
        quantity: teddy_quantity.value,

    };

    let isProductInCart = false;

    let cartData = JSON.parse(localStorage.getItem('cart')); // pas rajouter le meme produit 2fois
    if (cartData == null) {
        cartData = [];
        cartData.push(mynewteddy);
    } else {
        cartData.forEach((teddy) => {
            if (teddy._id == mynewteddy._id) {
                teddy.quantity = parseInt(teddy.quantity) + parseInt(mynewteddy.quantity); // parseInt() convertit la chaîne en entier. parseFloat() convertit la chaîne en nombre réel

                isProductInCart = true;
            }
        });
        if (!isProductInCart) { // si le produit nest pas dans le panier, ajouter le newteddy
            cartData.push(mynewteddy);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartData));
    console.log(cartData);

    window.location.reload();
};

async function sendOrder(commande) {
    try {
        let response = await fetch("http://localhost:3000/api/teddies/order",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            }, // enyvoer un type de donné json
            body:commande,
        }); // on attend une reponse
        let data = await response.json();
        return data; 

    } catch (error) {
        console.log(error); // au cas ou on retrouve pas les teddy
    }
}
