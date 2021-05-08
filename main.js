// Variables
const cartBtn = document.querySelector('.cart-button');
const closeCartBtn = document.querySelector('.close-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');


if (document.readyState == 'loading') {
    document.addEventListener('DOMcontentLoaded', ready)
}else {
    ready()
}

function ready() {
    // open shopCart
    const cartBtn = document.querySelector('.cart-button');
    const closeCartBtn = document.querySelector('.close-cart');

    cartBtn.addEventListener('click', function(){
        cartOverlay.style.visibility = 'visible';
    })
    // Close shopCart

    closeCartBtn.addEventListener('click', function(){
        cartOverlay.style.visibility = 'hidden';
    })

    var removeCartItemButtons = document.getElementsByClassName('remove-item')
    for (var i = 0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var addToCartBtns = document.getElementsByClassName('shop-btn')
    for (var i = 0; i < addToCartBtns.length; i++){
        var button = addToCartBtns[i]
        button.addEventListener('click', addToCartClicked)
    }

}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-title')[0].innerText
    var price = shopItem.getElementsByTagName('h5')[0].innerText
    var imageSrc = shopItem.getElementsByTagName('img')[0].src
    addItemToCart(title, price, imageSrc)
    console.log(addItemToCart(title, price, imageSrc))  
    updateTotal()
}

function addItemToCart(title, price, imageSrc) {
    var newDiv = document.createElement('div')
    newDiv.classList.add('cart-item')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItemNames = cartItems.getElementsByClassName('shop-title')
    for (var i = 0; i < cartItemNames.length ; i++){
        if (cartItemNames[i].innerText == title) {
            alert('This Item is already added!')
            return
        }
    }
    var cartItemContents = `
    <img src="${imageSrc}" alt="product">
    <div>       
        <h4 class="item-title">${title}</h4>
        <h5>${price}</h5>
    </div>
    <button class="remove-item">remove</button>`
    newDiv.innerHTML = cartItemContents
    cartItems.append(newDiv)
    newDiv.getElementsByClassName('remove-item')[0].addEventListener('click', removeCartItem)
}   

function updateTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-content')[0]
    var cartItems = cartItemContainer.getElementsByClassName('cart-item')
    var total = 0
    for (var i = 0; i < cartItems.length; i++){
        var cartItem = cartItems[i]
        var priceElement = cartItem.getElementsByTagName('h5') 
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        total += price
    }
        
    document.getElementsByClassName('cart-total')[0].innerText = total
}