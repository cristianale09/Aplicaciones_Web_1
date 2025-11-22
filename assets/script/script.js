const listproducts = document.querySelector('#listproducts');
const contentProducts = document.querySelector('#contentProducts');
const emptyCart = document.querySelector('#emptyCart');

let productsArray = [];

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
});

function eventListeners(){
    listproducts.addEventListener('click', getDataElements);
    
    emptyCart.addEventListener('click', function() {
        productsArray = [];
        clearHtml();
        productsHtml();
        updateCartCount();
        updateTotal();
    });

    const loadProducts = JSON.parse( localStorage.getItem('cart') );
    if (loadProducts) {
        productsArray = loadProducts;
        productsHtml();
        updateCartCount();
        updateTotal();
    } else {
        productsArray = [];
    }
}

function updateTotal(){
    const total = document.querySelector('#total');
    let totalproduct = productsArray.reduce((total, prod) => total + prod.price * prod.quantity, 0);
    total.textContent = `$${totalproduct.toFixed(2)}`;
}

function updateCartCount(){
    const cartCount = document.querySelector('#cartCount');
    cartCount.textContent = productsArray.length;
}

function getDataElements(event){
    if (event.target.classList.contains('product__btn')) {
        const elementHtml = event.target.parentElement.parentElement.parentElement;
        SelectData (elementHtml);
    }
}

function SelectData (prod){
    const productObj = {
        img: prod.querySelector('img').src,
        title: prod.querySelector('h3').textContent,
        price: parseFloat(prod.querySelector('.products__price').textContent.replace('$',' ')),
        id: parseInt(prod.querySelector('button[type="button"]').dataset.id, 10),
        quantity: 1
    }
    
    const exists = productsArray.some(prod => prod.id === productObj.id);
    if (exists) {
        showAlert('El producto ya se encuentra en el carrito', 'error');
        return;
    }

    productsArray = [...productsArray, productObj];
    showAlert('El producto se ha agregado correctamente', 'success');
    productsHtml();
    updateCartCount();
    updateTotal();
}

function productsHtml(){
    clearHtml();
    productsArray.forEach( prod => {
        const {img, title, price, id, quantity} = prod;

        const tr = document.createElement('tr');

        const tdImg = document.createElement('td');
        const prodImg = document.createElement('img');
        prodImg.src = img;
        tdImg.appendChild(prodImg);

        const tdTitle = document.createElement('td');
        const prodTitle = document.createElement('p');
        prodTitle.textContent = title;
        tdTitle.appendChild(prodTitle);

        const tdPrice = document.createElement('td');
        const prodPrice = document.createElement('span');
        const newprice = price * quantity;
        prodPrice.textContent = `$${newprice.toFixed(2)}`;
        tdPrice.appendChild(prodPrice);
        
        const tdQuantity = document.createElement('td');
        const prodQuantity = document.createElement('input');
        prodQuantity.type = 'number';
        prodQuantity.min = 1;
        prodQuantity.value = quantity;
        prodQuantity.dataset.id = id;
        prodQuantity.oninput = updateQuantity;
        tdQuantity.appendChild(prodQuantity);

        /*Boton Eliminar*/
        const tdDelete = document.createElement('td');
        const prodDelete = document.createElement('button');
        prodDelete.type = 'button';
        prodDelete.textContent = 'X';
        prodDelete.onclick = () => destroyProduct(id);
        tdDelete.appendChild(prodDelete);
        
        tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDelete);

        contentProducts.appendChild(tr);
    });

    saveToLocalStorage();
}

function saveToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(productsArray));
}

function updateQuantity(event){
    const newQuantity = parseInt(event.target.value, 10);
    const id = parseInt(event.target.dataset.id, 10);
    const  product = productsArray.find( prod => prod.id === id);
    if (product && newQuantity > 0){
        product.quantity = newQuantity;
    }
    productsHtml();
    updateTotal();
    saveToLocalStorage();
}

function destroyProduct(id){
    productsArray = productsArray.filter( prod => prod.id !== id);
    clearHtml();
    productsHtml();
    showAlert('Producto eliminado del carrito', 'success');
    updateCartCount();
    updateTotal();
    saveToLocalStorage();
}

function showAlert(message, type){
    const nonRepeatedAlert = document.querySelector('.alert');
    if (nonRepeatedAlert){
        nonRepeatedAlert.remove();
    }

    const div = document.createElement('div');
    div.classList.add('alert', type);
    div.textContent = message;    

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}

function clearHtml(){
    while(contentProducts.firstChild){
        contentProducts.removeChild(contentProducts.firstChild);
    }
}