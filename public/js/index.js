const placeOrderBtn = document.getElementById('order-place-btn')
const btn3 = document.getElementById('order-update-btn')

const input = document.getElementById('order-number')


const dataContainer = document.getElementById('data-container')






// async function getOrder(order) {
//     console.log('getting')

//     let data = await fetch(`http://localhost:7890/api/orders/${order}`)
//     data = await data.json()

//     console.log(data)
    
// }


console.log('getting')
fetch(`http://localhost:7891/api/orders/`)
    .then(res => res.json())
    .then(res => {
        res.data.forEach(e => {
            const newOrder = document.createElement('section')
            console.log(e)
            newOrder.innerHTML = `<div>${e.coffeeType}</div`
            
            dataContainer.append(newOrder)
            
        });
    })




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