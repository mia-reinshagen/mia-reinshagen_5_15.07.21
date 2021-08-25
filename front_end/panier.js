let cartData = JSON.parse(localStorage.getItem('cart'));
function showCart() {

    if (cartData) {
        cartData.forEach(teddy => {
            document.getElementById("products").innerHTML += `
            <div class="card" style="width:90%;max-width:400px;box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;">
            <div id="icon_supprime"><i class="fas fa-times" onclick="remove('${teddy._id}')"></i></div>
            <img src=${teddy.imageUrl} alt="Norway" width="390">
              <div class="cardcontainer">
              <h3 class="card-title">${teddy.name}</h3>
                <div class="rating"><!--
                --><a href="#5" title="Donner 5 étoiles"style="color: blueviolet">☆</a><!--
                --><a href="#4" title="Donner 4 étoiles"style="color: blueviolet">☆</a><!--
                --><a href="#3" title="Donner 3 étoiles">☆</a><!--
                --><a href="#2" title="Donner 2 étoiles">☆</a><!--
                --><a href="#1" title="Donner 1 étoile">☆</a>
             </div>
             <p class="card-text">Prix: ${teddy.price / 100}$</p>
             <div>Nombres de teddy:${teddy.quantity}</div>
             <div>Couleur:${teddy.color}</div>
            </div>
            `
                ;
        });
    }

}
// cartData = le panier // si la fonction ressoi un teddy._id qui correspond a un id, il va supprimer 

function remove(id) {
    console.log(id);
    if (cartData) {
        const remainProducts = cartData.filter(teddy => teddy._id !== id); // méthode filter, laisse passer des choses et retenir d'autre 
        localStorage.setItem('cart', JSON.stringify(remainProducts)); // remettre le panier à jour, le reste du panier
        window.location.reload();
    }
}

function tot() {
    let total = 0;
    if (cartData) {
        cartData.forEach((teddy) => {
            total += teddy.price * teddy.quantity // il doit calculer le prix du teddy fois la quantité aussi 
        });
    }

    document.getElementById('total').innerText = "$" + total / 100;
}

function orderTeddies() {
    const contact = { // on a créé un objet user qui contient nom....
        firstName: prenom.value,
        lastName: nom.value,
        email: email.value,
        address: adresse.value,
        city: ville.value,
    }

    let products = [];

    cartData.forEach(teddy => { // regarde le pannier et identifie les ID des teddy -> products = Id teddy
        products.push(teddy._id); // push chose dans tableau 
    })
    let newCommand = JSON.stringify({
        contact,
        products
    })
    sendOrder(newCommand).then((response) => {
        console.log(response);
        const recapnewCommand = {
            name: response.contact.firstName,
            orderId: response.orderId,
            total: total.textContent, // Id du total dans html
        };

        localStorage.setItem("recapnewCommand", JSON.stringify(recapnewCommand)); // enregister recapiltualif commande dans localstorage
        if (localStorage.getItem("recapnewCommand") != null)
            h1.textContent = `Merci pour votre commande ${(localStorage.getItem("recapnewCommand"))}`;

        window.location.href = "./confirmation.html";
    });
}

// array, recuperer id des teddy dans panier 
// validité du formulaire si vide, pas soumis pas envyoer donné 
// si qqun rentre pas truc valide fromulaire pas valide


// FORMULAIRE // 

let form = document.querySelector('#loginForm');

// Ecouter la modification de l'email
form.email.addEventListener('change', function () {
    validEmail(this);
});

form.firstName.addEventListener('change', function () {
    validfirstName(this);
});

form.lastName.addEventListener('change', function () {
    validlastName(this);
});

form.address.addEventListener('change', function () {
    validaddress(this);
});

form.city.addEventListener('change', function () {
    validcity(this);
});

// Ecouter la soumission du formulaire
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validEmail(form.email) && validfirstName(form.firstName) && validlastName(form.lastName) && validaddress(form.address) && validcity(form.city)) {
        orderTeddies();
    }
});

// EMAIL // 
const validEmail = function (inputEmail) {
    // Creation de la reg exp pour validation email // 
    let emailRegExp = new RegExp(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    );

    // recuperation balise small
    let small = inputEmail.nextElementSibling;

    // test l'expression reguliere

    if (emailRegExp.test(inputEmail.value)) {
        small.innerHTML = 'Adresse Valide';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true; // retourner des infromation au retour
    } else {
        small.innerHTML = 'Adresse Non Valide';
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};

// PRENOM // 
const validfirstName = function (inputfirstName) {

    let firstNameRegExp = new RegExp(
        /^[a-z ,.'-]+$/i,
    );

    let small = inputfirstName.nextElementSibling;

    if (firstNameRegExp.test(inputfirstName.value)) {
        small.innerHTML = 'Prénom Valide';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    } else {
        small.innerHTML = 'Prénom Non Valide';
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};

// NOM // 

const validlastName = function (inputlastName) {

    let lastNameRegExp = new RegExp(
        /^[a-z ,.'-]+$/i,
    );

    let small = inputlastName.nextElementSibling;

    if (lastNameRegExp.test(inputlastName.value)) {
        small.innerHTML = 'Nom Valide';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    } else {
        small.innerHTML = 'Nom Non Valide';
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};

// ADRESS // 

const validaddress = function (inputaddress) {

    let addressRegExp = new RegExp(
        /^[a-zA-Z0-9\s,'-]*$/
    );

    let small = inputaddress.nextElementSibling;

    if (addressRegExp.test(inputaddress.value)) {
        small.innerHTML = 'Adresse Valide';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    } else {
        small.innerHTML = 'Adresse Non Valide';
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};

// VILLE // 

const validcity = function (inputcity) {

    let cityRegExp = new RegExp(
        /^[a-z ,.'-]+$/i
    );

    let small = inputcity.nextElementSibling;

    if (cityRegExp.test(inputcity.value)) {
        small.innerHTML = 'Ville Valide';
        small.classList.remove('text-danger');
        small.classList.add('text-success');
        return true;
    } else {
        small.innerHTML = 'Ville Non Valide';
        small.classList.remove('text-success');
        small.classList.add('text-danger');
        return false;
    }
};


showCart()
tot()

