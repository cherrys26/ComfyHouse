let checkout = document.getElementById('checkout-button');
document.getElementById('checkout-btn').onclick = function () {
    checkout.showModal();
};

setTimeout(function func() {
    location.replace('../home/home.html')
}, 10000);
// document.getElementById('close').onclick = function () {
//     checkout.close();
// };  