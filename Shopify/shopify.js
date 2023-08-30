var productsResponse;

var productsCategoryFilterMap = {};

var currentCartId;

//purpose of login page

function submitLogin(){
    var email = document.getElementById("email").value;
    var password =document.getElementById("password").value;
    
    if(email == "" && password == ""){
           document.getElementById("error").innerHTML="Enter Email and Password";
           return;
    }
   if(email == null || email == ""){
    document.getElementById("error").innerHTML="Enter Email";
    return;
        
    }
    if(password == null || password == ""){
        document.getElementById("error").innerHTML="Enter Password";
        return;
    }
    
    $.ajax({
        url: "https://reqres.in/api/login",
        type: "POST",
        data: {
            "email": email,
            "password": password 
        },
        success: function(response)
        {
            console.log(response);
             if(null != response.token){
                window.location.href="./product.html";
             }
            
            
        }, error: function(response) {
            document.getElementById("error").innerHTML="Invalid credentials.";
        }
    });
}
//purpose of = product page image 
function product()
{

    $.ajax
    ({
        url: "https://fakestoreapi.com/products",
        type: "GET",
        success: function(response)
        {

            console.log('Printing PRODUCTS');
            console.log(response);
            productsResponse = response;
            var productsContainer = document.getElementById('pro-container');
            for (var i=0; i<response.length; i++) {

                if (productsCategoryFilterMap[(productsResponse[i].category)]) 
                {
                    productsCategoryFilterMap[(productsResponse[i].category)].push(productsResponse[i]);
                } 
                else 
                {
                    productsCategoryFilterMap[productsResponse[i].category] = [productsResponse[i]];
                }
               var proObject = `<div class="pro">
                                        <img src=${productsResponse[i].image} alt="" title="Limited-Offer">
                                        <div id="}description">
                                            <div style="font-weight: bold;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">${productsResponse[i].title}</div>
                                            <h5 style="font-weight: bold;font-family: sans-serif;">Rating ${productsResponse[i].rating.rate}</h5>
                                            <h4 style="font-weight: bold;">Price ${productsResponse[i].price}$</h4>
                                        </div>
                                        <a href="#" onclick="openCart(${productsResponse[i].id})"><i class="fa-solid fa-cart-shopping" style="color: brown;"></i></a>
                                    </div>`;

                productsContainer.innerHTML += proObject;
            }
            console.log('Printing PRODUCTS CATEGORY MAP');
            console.log(productsCategoryFilterMap);
            var categoryContainer = document.getElementById('sidebar');
            for (var key in productsCategoryFilterMap) {
                var categoryCheckbox = `<div>
                    <input type="checkbox" class="categoryCheckbox" value=${key} onclick="selectFilter()">
                    <label>${key}</label>
                </div><br>`;
                categoryContainer.innerHTML += categoryCheckbox;
            }
        }
    });

}
//purpose of including filter
function selectFilter(){
    var inputElements = document.getElementsByClassName('categoryCheckbox');
    var categories = new Array();
    var j=0;
    for(var i=0; inputElements[i]; ++i){
          if(inputElements[i].checked){
               categories[j]  =  inputElements[i].value;
               j++;
          }
    }
    
    var productsArray = [];
    categories.forEach(function(category) {
     for (var key in productsCategoryFilterMap) {
         if (key.indexOf(category) > -1) {
             productsCategoryFilterMap[key].forEach(function(product) {
                 productsArray.push(product);
             });
         }
     }
    });

    var productsContainer = document.getElementById('pro-container');
    productsContainer.innerHTML = '';
     for (var i=0; i<productsArray.length; i++) {
         var proObject = `<div class="pro">
                                 <img src=${productsArray[i].image} alt="" title="Limited-Offer">
                                 <div id="}description">
                                     <div style="font-weight: bold;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">${productsArray[i].title}</div>
                                     <h5 style="font-weight: bold;font-family: sans-serif;">Rating ${productsArray[i].rating.rate}</h5>
                                     <h4 style="font-weight: bold;">Price ${productsArray[i].price}$</h4>
                                 </div>
                                 <a href="#" onclick="openCart(${productsArray[i].id})"><i class="fa-solid fa-cart-shopping" style="color: brown;"></i></a>
                             </div>`;

         productsContainer.innerHTML += proObject;
     }

}
//purpose of cart page
function openCart(id) {
    window.location.href="./cart.html?id="+id;
}

function loadCart() {
    currentCartId = new URLSearchParams(window.location.search).get('id');
    var currentCartObj;
    $.ajax
    ({
        url: "https://fakestoreapi.com/products",
        type: "GET",
        success: function(response)
        {
            for (var i=0; i<response.length; i++) {
                if (response[i].id === parseInt(currentCartId)) {
                    currentCartObj = response[i];
                    break;
                }
            }
            var cartTableBody = document.getElementById('cart-table-body');
                var cartObject = `<tr>
                                    <td><img src=${currentCartObj.image} alt=""></td>
                                    <td title=${currentCartObj.title} style="text-overflow: ellipsis;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    cursor: pointer;">${currentCartObj.title}</td>
                                    <td>$${currentCartObj.price}</td>
                                    <td>1</td>
                                    <td>$${currentCartObj.price}</td>
                                </tr>`;

                cartTableBody.innerHTML = cartObject;
            
        }
    });
}









