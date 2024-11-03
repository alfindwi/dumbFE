// interface Cart {
//     id: number
//     userId: number
//     products: CartItem[]
// }


// interface CartItem {
//     id: number
//     cartId: number
//     productId: number
//     quantity: number
// }


// const handlePayment = () => {

//     const cart: Cart = {
//         id: 1,
//         userId: 1,
//         products: [
//             {
//                 id: 1,
//                 cartId: 1,
//                 productId: 1,
//                 quantity: 1
//             }
//         ]
//     }

//     const  res = await axios.post('/api/payment', cart)
//     if (res.data.transaction.token) {
//         window.snap.pay(res.data.transaction.token, {
//             onSuccess: function (result) {
//                 console.log(result);
//             },
//             onPending: function (result) {
//                 console.log(result);
//             },
//             onError: function (result) {
//                 console.log(result);
//             },
//             onClose: function () {
//                 console.log('customer closed the popup without finishing the payment');
//             }
//         })
//     }
// }