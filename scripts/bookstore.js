// get the current year
function getPeriode() {
	let now = new Date();
	let thisYear = now.getFullYear();
	let currentYear = document.getElementById("ye");
	currentYear.innerHTML = thisYear;
	return currentYear;
}

// get button event listeners and cart 
let btns = document.getElementsByClassName('addtocart');
let cart = document.getElementById('cartcontainer');

// function that add items to cart
function addToCart(elem) {
    let sibs = [];
    let getprice;
    let getproductName;
    let cart = [];
    let stringCart;
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 6) continue; 
        if (elem.className === "productprice") {
            getprice = elem.innerText;
        }
        if (elem.className === "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    //create product object
    let product = {
        productname : getproductName,
        productprice : getprice
    };
    //convert product data to JSON for storage
    var stringProduct = JSON.stringify(product);
    /*send product data to session storage */
    
    if (!sessionStorage.getItem('cart')) {
        //append product JSON object to cart array
        cart.push(stringProduct);
        //cart to JSON
        stringCart = JSON.stringify(cart);
        //create session storage cart item
        sessionStorage.setItem('cart', stringCart);
        updateCartTotal();
    }
    else {
        //get existing cart data from storage and convert back into array
       cart = JSON.parse(sessionStorage.getItem('cart'));
        //append new product JSON object
        cart.push(stringProduct);
        //cart back to JSON
        stringCart = JSON.stringify(cart);
        //overwrite cart data in sessionstorage 
        sessionStorage.setItem('cart', stringCart);
        updateCartTotal();
    }
}

/* Calculate Cart Total */
function updateCartTotal() {
    //init
    let total = 0;
    let productprice = 0;
    let items = 0;
    let productname = "";
    let carttable = "";
    if (sessionStorage.getItem('cart')) {
        //get cart data & parse to array
        let cart = JSON.parse(sessionStorage.getItem('cart'));
        //get no of items in cart 
        items = cart.length;
        //loop over cart array
        for (let i = 0; i < items; i++) {
            //convert each JSON product in array back into object
            let x = JSON.parse(cart[i]);
            //get property value of price
            productprice = parseFloat(x.productprice);
            productname = x.productname;
            //add price to total
            carttable += "<tr><td>" + productname + "</td><td>" + productprice.toFixed(2) + "</td></tr>";
            total += productprice;
        }
        
    }
    //update total on website HTML
    document.getElementById("total").innerHTML = total;
    //insert saved products to cart table
    document.getElementById("carttable").innerHTML = carttable;
    //update items in cart on website HTML
    document.getElementById("itemsquantity").innerHTML = items;
}

// remove product from cart
function emptyCart() {
    if (sessionStorage.getItem('cart')) {
        sessionStorage.removeItem('cart');
        updateCartTotal();
    }
}

//remove cart from the page
function checkout() {    
	if (document.getElementById("checkout")) {
		cart.style.display = "none";
	}
	return true;
}

// get all events to load on the page
function getAllEvents() {
    document.getElementById("emptycart").addEventListener("click", emptyCart);
    document.getElementById("checkout").addEventListener("click", checkout);

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function() {
		    addToCart(this);
            // display products in the cart
		    cart.style.display = "block";
	    });
    }
    updateCartTotal();
    getPeriode();
}

// Page load
window.addEventListener("load", getAllEvents);

let nav = document.getElementById("navbar");
let links = nav.getElementsByClassName("nav-item");
for (let i = 0; i < links.length; i++) {
	links[i].addEventListener("click", function() {
		let current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace("active", "");
        this.className += " active";
	});
}