// ///<reference path="../module/module.js"/>

// app.service("cartService",function(){

//     this.addToCart=function(cart,product){

//        if(cart.length===0){
//             cart.push({
//                 ...product,
//                 quantity:1
//             });
//        }else{
//             var exist=cart.findIndex(function(value){
//                 return value._id===product._id;
//             })
//             console.log(exist);
//             if(exist>=0){
//                 // console.log(cart[exist])
//                 cart[exist].quantity+=1;
//             }else{
//                 cart.push({
//                     ...product,
//                     quantity:1
//                 });
//             }
//        }
//        console.log(cart)

//         return cart;
//     }

//     this.removeFromCart=function(cart,product){
//         var exist=cart.findIndex(function(value){
//             return value._id===product._id;
//         })
//         console.log(exist);
//         if(exist>=0){
//             cart[exist].quantity--;
//             if(cart[exist].quantity==0){
//                 var updatedCart=cart.filter(function(value){
//                     return value._id!=product._id;
//                 })
//                 return updatedCart;
//             }
//         }else{
//             cart.push(product);
//         }
//         return cart;
//     }

//     this.removeItem=function(cart,product){
//         var updatedCart=cart.filter(function(value){
//             return value._id!=product._id;
//         })

//         return updatedCart;
//     }

//     this.totalPrice=function(cart){
//         var amount=0;

//         cart.forEach(function(value){
//             amount=amount+(value.price*value.quantity);
//         });

//         return amount;
//     }
// })
