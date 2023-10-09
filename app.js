class store{
 constructor(title,price,image){
this.title=title;
this.price=price;
this.image=image;
 }
}
// read the data from fake store api (get)
fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(products=>{
var productArr=products.slice(0,20);
productArr.map((product)=>{
    var storeProduct=new store(product.title,product.price,product.image);

var main=document.getElementById("main-content");
var card=document.createElement('div');
card.classList.add('card');
card.innerHTML=`
<h2>${storeProduct.title}</h2>
<img src="${storeProduct.image}">
<p>price : ${storeProduct.price} JD</p>
`;
main.appendChild(card);
});
})


