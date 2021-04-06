// const placeBtn = document.getElementById('order-place-btn')
// const updateBtn = document.getElementById('order-update-btn')
const dataContainer = document.getElementById('data-container')

const orderForm = document.getElementById('new-order-form')
const updateForm = document.getElementById('update-order-form')
const updateId = document.getElementById('update-id')

const deleteInput = document.getElementById('delete-order-input')
const deleteBtn = document.getElementById('order-delete-btn')

console.log('getting')
fetch(`/api/orders/`)
    .then(res => res.json())
    .then(res => {
        res.data.forEach(e => {
            displayOrder(e)
        });
    })



function displayOrder(e) {
    const newOrder = document.createElement('section')
    newOrder.className = 'order-container'
    newOrder.id = `order-${e.orderId}`
    newOrder.innerHTML = `
    <div>Order#: ${e.orderId}</div>
    <div>Coffee: ${e.coffeeType}</div>
    <div>Quantity: ${e.quantity}</div>
    <div>Subscription: ${e.subscription}</div>
    `
    dataContainer.append(newOrder)
}


deleteBtn.addEventListener('click', () => {
    fetch(`/api/orders/${deleteInput.value}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(res => {
            const removed = document.getElementById(`order-${deleteInput.value}`)
            removed.remove()
        })
})



orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = new FormData(orderForm);
    
    fetch('/api/orders', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            name: data.get('name'),
            address: data.get('address'),
            coffeeType: data.get('coffee'),
            quantity: data.get('quantity'),
            subscription: data.get('subscription'),
        }),
    })
        .then((res) => res.json())
        .then(res => {
            displayOrder(res.data)
        })
    });

    
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = new FormData(updateForm);

    fetch(`/api/orders/${updateId.value}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            coffeeType: data.get('u-coffee'),
            quantity: data.get('u-quantity'),
            subscription: data.get('u-subscription'),
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            const removed = document.getElementById(`order-${updateId.value}`)
            removed.remove()
            displayOrder(res)
        })
    });





// function getOrder(order) {
//     return fetch(`http://localhost:7890/api/orders/${order}`)
//         .then(res => res.json())
// }


// async function getOrder(order) {
//     console.log('getting')
//     const data = await fetch(`http://localhost:7890/api/orders/${order}`)
//                     .then(res => res.json())

//     console.log(data)
// }

// async function getOrder(order) {
//     console.log('getting')

//     let data = await fetch(`http://localhost:7890/api/orders/${order}`)
//     data = await data.json()

//     console.log(data)
    
// }