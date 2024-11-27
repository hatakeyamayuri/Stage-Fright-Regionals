function openNav() {
    document.getElementById("myNav").style.height = "100%";
    document.getElementById("nav_sns_menu").style.display = "block";
    document.getElementById("copyright1").style.display = "block";
}
function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("nav_sns_menu").style.display = "none";
    document.getElementById("copyright1").style.display = "none";
}


function openExitRight() {
    document.getElementById("myExitRight").style.display = "block";
}
function closeExitRight() {
    document.getElementById("myExitRight").style.display = "none";
}

function openConquer() {
    document.getElementById("myConquer").style.display = "block";
}
function closeConquer() {
    document.getElementById("myConquer").style.display = "none";
}

function openButterflies() {
    document.getElementById("myButterflies").style.display = "block";
}
function closeButterflies() {
    document.getElementById("myButterflies").style.display = "none";
}



const cards = document.querySelectorAll('.card');
const cart = document.getElementById('cart');
const totalElement = document.getElementById('total'); 
const selectedItems = {};
var click_list = [0, 0, 0];

function handleCardClick(event) {
    const card = event.currentTarget;
    const itemId = card.id;
    const itemName = card.querySelector('h4').textContent;
    const itemPrice = parseFloat(card.querySelector('.price').textContent); 

    if (selectedItems[itemId]) {
        selectedItems[itemId].count++;
    } else {
        selectedItems[itemId] = {
            name: itemName,
            price: itemPrice,
            count: 1,
        };
    }
        updateCart();
    }
//where is actually clicking. change to butn not whole

window.onload = restore;
console.log(click_list)

function restore_click() {
    //console.log(JSON.parse(localStorage.getItem(click_list)))
    click_list = JSON.parse(localStorage.getItem('click_list'));
    console.log(click_list)
    return click_list
}

function restore() {
    //var load = localStorage.cart;
    //document.getElementById("cart").innerHTML = load;
    //document.querySelector('ETVinyl').click();
    
    var firstTime = localStorage.getItem("first_time");
    if(!firstTime) {
        //is first time
        localStorage.setItem("first_time","1");
    } else {
        restore_click()
        click_list = restore_click()
        console.log(click_list)
    }

    console.log(click_list)
    for (let step = 0; step < click_list[0]; step++) {
        document.getElementById('ExitRightVinyl').click();
    }
    for (let step = 0; step < click_list[1]; step++) {
        document.getElementById('ConquerVinyl').click();
    }
    for (let step = 0; step < click_list[2]; step++) {
        document.getElementById('ButterfliesVinyl').click();
    }
    totalElement.textContent = `Subtotal: $${localStorage.total}.00`; 
}

window.onbeforeunload = save;
    
function save() {
    //localStorage.cart = cart.innerHTML; 

    if (document.getElementById('num_need_ExitRightVinyl') !== null){
        let span = document.getElementById('num_need_ExitRightVinyl');
        click_list.splice(0, 1, span.textContent); 
    } else {
        click_list.splice(0, 1, 0); 
    }

    if (document.getElementById('num_need_ConquerVinyl') !== null){
        let span = document.getElementById('num_need_ConquerVinyl');
        click_list.splice(1, 1, span.textContent); 
    } else {
        click_list.splice(1, 1, 0); 
    }

    if (document.getElementById('num_need_ButterfliesVinyl') !== null){
        let span = document.getElementById('num_need_ButterfliesVinyl');
        click_list.splice(2, 1, span.textContent); 
    } else {
        click_list.splice(0, 1, 0); 
    }

    let num_click = JSON.stringify(click_list);

    localStorage.setItem(
        "click_list", 
        num_click
    );
}

function updateCart() {
    cart.innerHTML = '';
    localStorage.cart = cart.innerHTML;

    localStorage.total = 0; 

    for (const itemId in selectedItems) {
        const item = selectedItems[itemId];
        const listItem = document.createElement('li');
        const quantityContainer = document.createElement('div'); 
        const quantityText = document.createElement('span'); 
        quantityText.setAttribute("id", "num_need_" + itemId); 
        const addButton = document.createElement('button');
        const subtractButton = document.createElement('button');

        addButton.textContent = '+';
        subtractButton.textContent = '-';

        quantityText.textContent = item.count; 

        addButton.addEventListener('click', () => {
            addItem(itemId);
        });

        subtractButton.addEventListener('click', () => {
            removeItem(itemId);
        });

        const hr = document.createElement('hr');

        quantityContainer.appendChild(subtractButton); 
        quantityContainer.appendChild(quantityText); 
        quantityContainer.appendChild(addButton); 
        quantityContainer.appendChild(hr); 

        listItem.textContent = `${item.name} - $${item.price * item.count}`;
        listItem.appendChild(quantityContainer); 
        cart.appendChild(listItem);

        localStorage.total = parseFloat(localStorage.total) + item.price * item.count; 
    }

    totalElement.textContent = `Subtotal: $${localStorage.total}.00`; 
}

function addItem(itemId) {
    if (selectedItems[itemId]) {
        selectedItems[itemId].count++;
    }
    updateCart();
}

function removeItem(itemId) {
    if (selectedItems[itemId]) {
        selectedItems[itemId].count--;
        if (selectedItems[itemId].count <= 0) {
            delete selectedItems[itemId];
        }
    }
    updateCart();
}

cards.forEach((card) => {
    card.addEventListener('click', handleCardClick);
});