const taxRate = 0.18;
const shippingPrice = 15.0;

window.onload = () => {
    window.localStorage.setItem("taxRate", taxRate);
    localStorage.setItem("shippingPrice", shippingPrice);

    window.sessionStorage.setItem("taxRate", taxRate);
    sessionStorage.setItem("shippingPrice", shippingPrice);

    calculateCartTotal();
}

let quantityDivs = document.getElementsByClassName("quantity")
console.log(quantityDivs);
// bu şekilde tüm quantityDivs leri alarak HTML collection oluşturduk. Foreach döngüsünü uygulayabilmek için array veya nodelist e dönüştürmemiz gerekir. Aşağıdaki şekilde array e dönüştürüyoruz.


[...quantityDivs].forEach((quantityDiv) =>{
    //minus button
    let quantityP = quantityDiv.querySelector("#product-quantity");
    quantityDiv.firstElementChild.addEventListener("click", ()=>{

        
        quantityP.innerText = parseInt(quantityP.innerText) -1;
        if(quantityP.innerText == "0"){
            alert("Product will be removed!");
            quantityDiv.parentElement.parentElement.remove();
        }
        calculateProductTotal(quantityP);
        
    });
    //plus button
    quantityDiv.lastElementChild.addEventListener("click", ()=>{
        quantityP.innerText = parseInt(quantityP.innerText) +1;
        calculateProductTotal(quantityP);
    }); 
});

const calculateProductTotal = (quantityP) =>{
    let priceDiv = quantityP.parentElement.parentElement;
    const productPrice = parseFloat(priceDiv.querySelector("b").innerText);
    console.log(productPrice);
    console.log(quantityP.innerText);
    let productTotalPrice = productPrice * parseInt(quantityP.innerText);
    console.log(productTotalPrice);
    let productTotalDiv = priceDiv.querySelector(".product-total-div");
    productTotalDiv.innerText = productTotalPrice.toFixed(2);
    calculateCartTotal();

};

const calculateCartTotal = () => {
    //HTML Collection
    // let productTotalPrices = document.getElementsByClassName("product-total-div") foreach kullanabilmemiz için array e dönüştürmemiz gerekir. [...productTotalPrices] diyerek array e dönüştürebiliriz ve [..productTotalPrices].forEach diyerek kullanabiliyoruz.

    //NodeList . NodeList te array e dönüştürmeden foreach kullanabiliyoruz.
    let productTotalPrices = document.querySelectorAll(".product-total-div")
    let subtotal = 0;
    productTotalPrices.forEach((productPrice) =>{
        subtotal += parseFloat(productPrice.innerText);
        
    });
    console.log(subtotal);

    // let taxPrice = subtotal * taxRate;
    let taxPrice = subtotal * parseFloat(localStorage.getItem("taxRate"));
    let shipping = (subtotal > 0 ? shippingPrice : 0) //subtotal > 0 ise shipping değerimiz shippingPrice olacak değilse 0 olacak.
    let cartTotal = subtotal + taxPrice + shipping;

    let a = document.querySelector("#cart-subtotal p:nth-child(2)").innerText = subtotal.toFixed(2);
    // console.log(a);
    let b = document.querySelector("#cart-tax p:nth-child(2)").innerText = taxPrice.toFixed(2);
    // console.log(b);
    let c = document.querySelector("#cart-shipping p:nth-child(2)").innerText = shipping.toFixed(2);
    // console.log(c);
    let d = document.querySelector("#cart-total p:nth-child(2)").innerText = cartTotal.toFixed(2);
    // console.log(d);
};

document.querySelectorAll(".removeBtn").forEach((removeButton)=>{
    removeButton.addEventListener("click", ()=>{
        removeProduct(removeButton)
    });
});

const removeProduct = (removeButton) => {
    let imagePartDiv = removeButton.parentElement.parentElement;
    imagePartDiv.remove();
    calculateCartTotal();
};
