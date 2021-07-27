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
                      <p class="card-text">${product.price / 100}$</p>
                      <br>
                      <a href="produit.html?id=${product._id}" class="btn btn-primary">Voir le Teddy</a>
                    </div>
                  </div>
        `
    });
    document.getElementById("products").innerHTML = productsHtml;

}

function showOneProduct(teddy) { // afficher les produits dynamiquement
    console.log(teddy);
    let productHtml = "";
    productHtml =
        `
        <div class="card"
        style="width:80%;max-width:400px;box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;">
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
            <p> ${teddy.description} </p>
            <select> 
            <option value="tan">tan</option>
            <option value="chocolat">chocolat</option>
            <option value="black">black</option>
            <option value="white">white</option>
            </select>
            </div>
                <p class="card-text">${teddy.price / 100}</p>
                <label for="teddy">Nombres de teddy:</label>
                <input type="number" id="teddy" name="teddy" min="0" max="10">
                <br>
                <br>
                <a href="panier.html" class="btn btn-primary">Ajouter au panier</a>
            </div>
            
        </div>
    </div>
        `;


    document.getElementById("product").innerHTML = productHtml;

}

