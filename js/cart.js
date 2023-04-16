let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        price: 120000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.PNG',
        price: 120000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 220000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 123000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 320000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 120000
    },
    {
        id: 7,
        name: 'PRODUCT NAME 7',
        image: '7.PNG' ,
        price: 2000
    }
    
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    console.log(key, quantity);
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

//  function reloadCard(){ //
    // ...existing code...
    //whatsapp, email checkout//


    function checkout() {
        const name = prompt('Please enter your name:');
        const address = prompt('Please enter your address:');
        const number = prompt('Please enter your phone number:');

         // Generate a unique 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000);
        alert(`Please copy this unique code: ${code}`);
        
        const totalPrice = listCards.reduce((sum, item) => sum + item.price, 0);
        const items = listCards.filter(item => item != null);
        
        sendEmail(name, address, number, totalPrice, items, code);
      }
      
      
    

      function sendEmail(name, address, number, totalPrice, items, code, image) {
        // Construct email message
        const msg = `Subject: New order from ${name}\n\n` +
                    `Name: ${name}\n` +
                    `Address: ${address}\n` +
                    `Phone number: ${number}\n\n` +
                    `Items:\n` +
                    items.map(item => `${item.name} (${item.quantity}) - ${item.price}\n`).join('') +
                    `\nTotal price: ${totalPrice}\n` +
                    `Code: ${code}\n`;
      
        // Create attachment for image
        const attachment = {
          filename: 'image.png',
          content: image,
          encoding: 'base64'
        };
      
        // Send email using SMTP
        const smtpServer = 'smtp.gmail.com'; // Change this to your SMTP server
        const smtpPort = 587; // Change this to your SMTP port
        const smtpUsername = 'fsilas956@gmail.com';
        const smtpPassword = 'Episode3_01';
        const sender = 'fsilas956@gmail.com';
        const recipient = 'fsilas956@gmail.com';
      
        const smtp = require('smtplib');
        smtp.createConnection({host: smtpServer, port: smtpPort})
          .then(conn => {
            conn.authenticate(smtpUsername, smtpPassword)
              .then(() => {
                conn.send({
                  from: sender,
                  to: recipient,
                  subject: `New order from ${name}`,
                  text: msg,
                  attachments: [attachment]
                })
                  .then(() => console.log('Email sent successfully'))
                  .catch(err => console.error('Failed to send email:', err))
                  .finally(() => conn.quit());
              })
              .catch(err => console.error('SMTP authentication failed:', err));
          })
          .catch(err => console.error('Failed to connect to SMTP server:', err));
      }
      
   
    