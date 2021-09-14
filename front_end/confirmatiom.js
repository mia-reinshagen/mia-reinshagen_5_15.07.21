if (localStorage.getItem("recapnewCommand") != null) {
    let confirmation = JSON.parse(localStorage.getItem("recapnewCommand"));
    console.log(confirmation);
    recap.textContent = confirmation.orderId;
    recap_nom.textContent = confirmation.name;
    recap_total.textContent = confirmation.total;
}
            