
//part one the Constructor and api for fake store and display the products in cards 

// class store{
//  constructor(title,price,image){
// this.title=title;
// this.price=price;
// this.image=image;
//  }
// }
// // read the data from fake store api (get)
// fetch('https://fakestoreapi.com/products')
// .then(res=>res.json())
// .then(products=>{
// var productArr=products.slice(0,20);
// productArr.map((product)=>{
//     var storeProduct=new store(product.title,product.price,product.image);

// var main=document.getElementById("main-content");
// var card=document.createElement('div');
// card.classList.add('card');
// card.innerHTML=`
// <h2>${storeProduct.title}</h2>
// <img src="${storeProduct.image}">
// <p>price : ${storeProduct.price} JD</p>
// `;
// main.appendChild(card);
// });
// })


/************************************************************************************** */

//part two create JSON server to create a posts and display  it when user fill the form with information 
//and the each post have delete and update button 
var commentInput=document.getElementById("commentInput");
var Form=document.getElementById("formData");

Form.addEventListener('submit',function(e){
    e.preventDefault();
    if(commentInput.value===''){ 
        alert("Write your Comment");
    }else{
 
  
    var inputArr=[];
     inputArr.push(commentInput.value);
     commentInput.value='';
     // Send the comment to the server

    fetch('http://localhost:3000/posts',{
    method:'POST',
    headers:{ 'Content-Type': 'application/json',},
    body:JSON.stringify({comment:inputArr})
})
.then(res=>res.json())

.then(posts=>{
    
    var postCard=document.getElementById("postCard");
    
    inputArr.forEach((post)=>{
      var cardComment=document.createElement('h1');
      cardComment.classList.add('comment');
      cardComment.innerHTML=`${post}
      <div class="cardBtn">
      <button class="deleteBtn" data-id="${posts.id}">Delete</button>
      <button id="editBtn">Edit</button>
      </div>`;
      
      postCard.appendChild(cardComment);
        // Add a click event listener to each delete button
        var deleteButtons = cardComment.querySelectorAll('.deleteBtn');
        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', function () {
                var commentId = this.getAttribute('data-id');
                deleteComment(commentId);
            });
        });

    
    });

})

.catch(error => {
    console.error('Error sending comment to server:', error);
});}
});

window.addEventListener('load',function(){

fetch('http://localhost:3000/posts')
.then(res=>res.json())

.then(posts=>{
 
    var postCard=document.getElementById("postCard");
    
    posts.forEach(post=>{
      var cardComment=document.createElement('h1');
      cardComment.classList.add('comment');
      cardComment.innerHTML=`${post.comment}`;
      postCard.appendChild(cardComment);
    });

})

.catch(error => {
    console.error('Error sending comment to server:', error);
});
});

function deleteComment(commentId){
    fetch(`http://localhost:3000/posts/${commentId}`,{
        method:'DELETE',
        headers:{'Content-Type' : 'application/json'},
      
    })
    .then(res=>{
        if(res.ok){
            alert("Post Deleted Successfully");
        }else{
            alert(" Fail to delete Post");

        }
    })
    .catch(error=>{
        console.log('ERROR : '+error);
    })
    
}

