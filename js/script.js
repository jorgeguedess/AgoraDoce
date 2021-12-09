/* NAVBAR BUTTONS */

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    userProfile.classList.remove('active');
    cartShop.classList.remove('active');
    menuNav.classList.remove('openNav');


}

let userProfile = document.querySelector('.user-profile');

document.querySelector('#profile-btn').onclick = () =>{
    userProfile.classList.toggle('active');
    searchForm.classList.remove('active');
    cartShop.classList.remove('active');
    menuNav.classList.remove('openNav');


}

let cartShop = document.querySelector('.cart-shop');

document.querySelector('#cart-btn').onclick = () =>{
    cartShop.classList.toggle('active');
    searchForm.classList.remove('active');
    userProfile.classList.remove('active');
    menuNav.classList.remove('openNav');

}


let menuNav = document.querySelector('.menu-nav');

document.querySelector('.menu-mobile').onclick = () =>{
    menuNav.classList.toggle('openNav');
    cartShop.classList.remove('active');
    searchForm.classList.remove('active');
    userProfile.classList.remove('active');
}


/* SCROOL UP*/

function subirTela() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}


function decidirBotaoScroll() {
    if ( window.scrollY >= 1200) {
        // ocultar o botão
        document.querySelector('.scrollButton').style.display = 'block'
    } else {
        // mostrar o botão
        document.querySelector('.scrollButton').style.display = 'none'
    }
}

window.addEventListener('scroll', decidirBotaoScroll)


/* PRODUTOS */

let cart = [];
let modalQt = 1;
let modalKey = 0;

const d = (el) => document.querySelector(el);

const ds = (el) => document.querySelectorAll(el);

// Listagem dos produtos

let modalOpen = d('.modal');

produtoJson.map((item, index) => {
    let produtoItem = d('.cards .card-thumb').cloneNode(true);

    produtoItem.setAttribute('data-key', index);
    produtoItem.querySelector('.produto-img img').src = item.img;
    produtoItem.querySelector('.produto-img img').src = item.img;
    produtoItem.querySelector('.info-produto .produto-price ').innerHTML = `R$ ${item.price.toFixed(2)}`;
    produtoItem.querySelector('.info-produto .produto-name ').innerHTML = item.name;

    produtoItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.card-thumb').getAttribute('data-key');

        modalQt = 1;
        modalKey = key;

        d('.produto-img-open img').src = produtoJson[key].img;
        d('.produto-name-open').innerHTML = produtoJson[key].name;
        d('.produto-desc-open').innerHTML = produtoJson[key].description;
        d('.produto-price-open').innerHTML = `R$ ${produtoJson[key].price.toFixed(2)}`;
        

        d('.produto-qt').innerHTML = modalQt;

        d('.cart-modal').style.opacity = 0;
        d('.cart-modal').style.display = 'flex';
        setTimeout(()=>{
            d('.cart-modal').style.opacity = 1;
            modalOpen.classList.add('modalShow');
        }, 200);
    });

    d('.cards').append( produtoItem );

});


// Eventos do MODAL

function closeModal() {
    d('.cart-modal').style.opacity = 0;
    modalOpen.classList.remove('modalShow');
    setTimeout(()=>{
        d('.cart-modal').style.display = 'none';
    }, 500);
}

d('.produtoInfo-qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {
        modalQt--;
        d('.produto-qt').innerHTML = modalQt;
    }
});

d('.produtoInfo-qtmais').addEventListener('click', ()=>{
    modalQt++;
    d('.produto-qt').innerHTML = modalQt;
});

d('.produtoInfo-addButton').addEventListener('click', ()=>{
    closeModal();
    let identifier = produtoJson[modalKey].id+'@';
    let key = cart.findIndex((item)=>item.identifier == identifier);
    if(key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:produtoJson[modalKey].id,
            qt:modalQt
        });
    }
    d('.produto-msg').classList.add('msg');
    d('.cart-shop').classList.remove('cart-center');
    d('span.vazio').style.display = 'none';
    d('.produto-final').style.display = 'block';
    setTimeout(()=>{
        d('.produto-msg').classList.remove('msg');
        cartShop.classList.remove('active');
    }, 1500);
    updateCart();
    closeModal();
});

function updateCart() {

    d('.bg-itens span').innerHTML = cart.length;

    if(cart.length > 0) {
        cartShop.classList.add('active');
        d('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let produtoItem = produtoJson.find((item)=>item.id == cart[i].id);
            subtotalInicial = produtoItem.price * cart[i].qt;
            subtotal += produtoItem.price * cart[i].qt;

            let cartItem = d('.produto-final .cart-produto').cloneNode(true);

            cartItem.querySelector('.cart-produto img').src = produtoItem.img;
            cartItem.querySelector('.cart-produto .produto-name-cart').innerHTML = produtoItem.name;
            cartItem.querySelector('.cart-produto p.produto-price-cart').innerHTML = `R$ ${subtotalInicial.toFixed(2)}`;

            cartItem.querySelector('div.qt-cart').innerHTML = cart[i].qt;

            cartItem.querySelector('.qtmenos-cart').addEventListener('click', ()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                    d('.cart-shop').classList.remove('cart-center');
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.qtmais-cart').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            d('.cart').append(cartItem);

        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        d('.info-final .subtotal').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        d('.info-final .desconto').innerHTML = `R$ ${desconto.toFixed(2)}`;
        d('.info-final .total').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        d('.produto-final').style.display = 'none';
        d('.cart-shop').classList.add('cart-center');
        d('span.vazio').style.display = 'flex';
    }
}
