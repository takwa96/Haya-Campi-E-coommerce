function insertAdmins() {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var admin1 = {
    id: 1,
    firstName: "Takwa",
    lastName: "Ait Hamou",
    email: "admint@admin.tn",
    pwd: "12345",
    role: "admin",
    avatar: "C:/Users/Takwa/Desktop/projet-camping/images/takwa.jpg"
  };
  var admin2 = {
    id: 2,
    firstName: "Houcem",
    lastName: "Sdiri",
    email: "adminh@admin.tn",
    pwd: "12345",
    role: "admin",
    avatar: "C:/Users/Takwa/Desktop/projet-camping/images/houcem.jpg"
  };


  users.push(admin1);
  users.push(admin2);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("adminAdded", "true");
}

function validateEmail(email) {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}

function signup() {
  var firstName = document.getElementById("firstName").value;
  var verifFirstName = verifLength(firstName, 5);
  if (verifFirstName) {
    document.getElementById("firstNameError").innerHTML = "";
  } else {
    document.getElementById("firstNameError").innerHTML =
      "First Name must have at least 5 characters";
    document.getElementById("firstNameError").style.color = "red";
  }
  var lastName = document.getElementById("lastName").value;
  var verifLastName = verifLength(lastName, 3);
  if (verifLastName) {
    document.getElementById("lastNameError").innerHTML = "";
  } else {
    document.getElementById("lastNameError").innerHTML =
      "Last Name must have at least 3 characters";
    document.getElementById("lastNameError").style.color = "red";
  }
  var email = document.getElementById("email").value;
  var verifEmail = validateEmail(email);
  if (verifEmail) {
    document.getElementById("emailError").innerHTML = "";
  } else {
    document.getElementById("emailError").innerHTML = "Invalid Email";
    document.getElementById("emailError").style.color = "red";
  }
  var pwd = document.getElementById("pwd").value;
  var verifPwd = verifLength(pwd, 8);
  if (verifPwd) {
    document.getElementById("pwdError").innerHTML = "";
  } else {
    document.getElementById("pwdError").innerHTML =
      "Password must have at least 8 characters";
    document.getElementById("pwdError").style.color = "red";
  }
  var confirmPwd = document.getElementById("confirmPwd").value;
  if (confirmPwd === pwd) {
    document.getElementById("confirmPwdError").innerHTML = "";
  } else {
    document.getElementById("confirmPwdError").innerHTML = "Password not match";
    document.getElementById("confirmPwdError").style.color = "red";
  }
  var tel = document.getElementById("tel").value;
  if (tel.length === 8) {
    document.getElementById("telError").innerHTML = "";
  } else {
    document.getElementById("telError").innerHTML =
      "Tel number must have 8 characters";
    document.getElementById("telError").style.color = "red";
  }
  var avatar = document.getElementById("avatar").value;
  var newAvatar = replaceCh(avatar);
  if (newAvatar.length === 0) {
    newAvatar = "C:/Users/Takwa/Desktop/haya-campi/images/avatar.jpg";
  }
  if (
    verifFirstName &&
    verifLastName &&
    verifEmail &&
    verifPwd &&
    pwd === confirmPwd &&
    tel.length === 8
  ) {
    var idUser = JSON.parse(localStorage.getItem("idUser") || "10");

    var user = {
      id: idUser,
      firstName: firstName,
      lastName: lastName,
      email: email,
      pwd: pwd,
      confirmPwd: confirmPwd,
      tel: tel,
      role: "user",
      avatar: newAvatar
    };
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("idUser", idUser + 1);
    location.replace("home.html");
  }
}

function verifLength(ch, nb) {
  return ch.length > nb;
}

function login() {
  var email = document.getElementById("emailLogin").value;
  var pwd = document.getElementById("pwdLogin").value;
  var users = JSON.parse(localStorage.getItem("users"));
  var findedUser;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].pwd === pwd) {
      findedUser = users[i];
    }
  }
  if (findedUser.role === "admin") {
    localStorage.setItem("connectedUser", JSON.stringify(findedUser));
    location.replace("admin.html");
  } else {
    localStorage.setItem("connectedUser", JSON.stringify(findedUser));
    location.replace("home.html");
  }
}

function contact() {
  var name = document.getElementById("name").value;
  var verifName = (name.length > 0);
  if (verifName) {
    document.getElementById("nameError").innerHTML = "";

  } else {
    document.getElementById("nameError").innerHTML =
      "Please enter your name";
    document.getElementById("nameError").style.color = "red";
  }

  var email = document.getElementById("emailContact").value;
  var verifEmail = validateEmail(email);
  if (verifEmail) {
    document.getElementById("emailContactError").innerHTML = "";
  } else {
    document.getElementById("emailContactError").innerHTML = "Invalid Email";
    document.getElementById("emailContactError").style.color = "red";
  }

  var subject = document.getElementById("subject").value;
  var verifSubject = (subject.length > 0);

  if (verifSubject) {
    document.getElementById("subjectError").innerHTML = "";
  } else {
    document.getElementById("subjectError").innerHTML =
      "Please enter your subject";
    document.getElementById("subjectError").style.color = "red";
  }

  var message = document.getElementById("message").value;
  var verifMessage = (message.length > 0);

  if (verifMessage) {
    document.getElementById("messageError").innerHTML = "";
  } else {
    document.getElementById("messageError").innerHTML =
      "Please enter a message";
    document.getElementById("messageError").style.color = "red";
  }

  if (
    verifName &&
    verifEmail &&
    verifSubject &&
    verifMessage
  ) {
    var idMessage = JSON.parse(localStorage.getItem("idMessage") || "1");

    var user = {
      id: idMessage,
      name: name,
      email: email,
      subject: subject,
      message: message
    };
    var messages = JSON.parse(localStorage.getItem("messages") || "[]");
    messages.push(user);
    localStorage.setItem("messages", JSON.stringify(messages));
    localStorage.setItem("idMessage", idMessage + 1);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your message has been sent!',
      showConfirmButton: false,
      timer: 1500,


    })


    document.getElementById("name").value = "";
    document.getElementById("emailContact").value = "";

    document.getElementById("subject").value = "";

    document.getElementById("message").value = "";
  }

}

function searchProduct(x) {
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  var prExist = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].productName === x) {
      prExist = true;
    }
  }
  return prExist;
}

function searchEvent(x) {
  var events = JSON.parse(localStorage.getItem("events") || "[]");
  var eventExist = false;
  for (let i = 0; i < events.length; i++) {
    if (events[i].eventName === x) {
      eventExist = true;
    }
  }
  return eventExist;
}


function ValidateAddProduct() {
  // Get value from input
  var productName = document.getElementById("productName").value;
  // verif if productname > 5
  var verifProductName = verifLength(productName, 5);
  // verif if product exists
  var verifIfPrExist = searchProduct(productName);
  if (verifIfPrExist) {
    document.getElementById("productNameExistError").innerHTML =
      "Product already exists";
    document.getElementById("productNameExistError").style.color = "red";
  } else {
    document.getElementById("productNameError").innerHTML = "";
  }
  if (verifProductName) {
    document.getElementById("productNameError").innerHTML = "";
  } else {
    document.getElementById("productNameError").innerHTML =
      "Product Name must have at least 6 characters";
    document.getElementById("productNameError").style.color = "red";
  }
  var price = document.getElementById("price").value;
  var verifPrice = price > 0;
  if (verifPrice) {
    document.getElementById("priceError").innerHTML = "";
  } else {
    document.getElementById("priceError").innerHTML =
      "Price must be greater then 0";
    document.getElementById("priceError").style.color = "red";
  }
  var stock = document.getElementById("stock").value;
  var verifStock = stock > 10;
  if (verifStock) {
    document.getElementById("stockError").innerHTML = "";
  } else {
    document.getElementById("stockError").innerHTML = "Invalid stock (>10)";
    document.getElementById("stockError").style.color = "red";
  }
  var category = document.getElementById("category").value;
  var verifCategory = category.length !== 0;
  if (verifCategory) {
    document.getElementById("categoryError").innerHTML = "";
  } else {
    document.getElementById("categoryError").innerHTML = "Invalid category";
    document.getElementById("categoryError").style.color = "red";
  }
  var productDescription = document.getElementById("productDescription").value;
  var verifProductDescription = productDescription.length !== 0;
  if (verifProductDescription) {
    document.getElementById("productDescriptionError").innerHTML = "";
  } else {
    document.getElementById("productDescriptionError").innerHTML = "Please write the product description";
    document.getElementById("productDescriptionError").style.color = "red";
  }
  var productImage = document.getElementById("avatar").value;
  var image = replaceCh(productImage);
  var verifProductImage = image.length !== 0;
  if (verifProductImage) {
    document.getElementById("productImageError").innerHTML = "";
  } else {
    document.getElementById("productImageError").innerHTML = "Please choose the product image";
    document.getElementById("productImageError").style.color = "red";
  }

  if (
    verifProductName &&
    verifPrice &&
    verifStock &&
    verifCategory &&
    !verifIfPrExist &&
    verifProductDescription &&
    verifProductImage

  ) {
    var idProduct = JSON.parse(localStorage.getItem("idProduct") || "1");

    var product = {
      id: idProduct,
      productName: productName,
      price: price,
      stock: stock,
      category: category,
      description: productDescription,
      image: image
    };
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("idProduct", idProduct + 1);
    location.reload();
  }
}

function displayProducts() {

  var products = JSON.parse(localStorage.getItem("products"));

  var productTable = `
    
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                    
                                </tr>
                            </thead>
                            <tbody>`;

  for (let i = 0; i < products.length; i++) {

    var productTable =
      productTable +
      ` <tr>
                                                <td class="thumbnail-img">
                                                       
                                                    <img class="img-fluid" src=${products[i].image} alt="" />

                                                  </td>
                                                    <td class="name-pr">

                                                        <a href="#">${products[i].productName}</a>
                        
                                                    </td>
                                                    <td class="price-pr">
                                                        <p>${products[i].price}</p>
                                                    </td>
                                                    <td>${products[i].stock}</td>
                                                    <td>${products[i].category}</td>
                                                    <td>
                                                    <button class="btn hvr-hover" onclick="editProduct(${products[i].id})">Edit</button>
                                                  
                                                    <button class="btn hvr-hover" onclick="deletObject(${i},'products')">Delete</button>    
                                                    </td>
                                                </tr>
                              `;
  }

  var productTable = productTable + `
                                 </tbody>
                                        </table>
                                    `;
  document.getElementById("prTable").innerHTML = productTable;
}


function displayUsers() {

  var users = JSON.parse(localStorage.getItem("users"));

  var usersTable = `
    
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Profile Image</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Tel</th>
                                    <th>Actions</th>
                                    
                                </tr>
                            </thead>
                            <tbody>`;

  for (let i = 0; i < users.length; i++) {

    var usersTable =
      usersTable +
      ` <tr>
                                                <td class="thumbnail-img">
                                                       
                                                    <img class="img-fluid" src="${users[i].avatar}" alt="" />

                                                  </td>
                                                    <td class="name-pr">

                                                        <a href="#">${users[i].firstName}</a>
                        
                                                    </td>
                                                    <td class="name-pr">
                                                        <p>${users[i].lastName}</p>
                                                    </td>
                                                    <td>${users[i].email}</td>
                                                    <td>${users[i].tel}</td>
                                                    <td>
                                                    <button class="btn hvr-hover" onclick="editUser(${users[i].id})">Edit</button>
                                                  
                                                    <button class="btn hvr-hover" onclick="deletObject(${i},'users')">Delete</button>    
                                                    </td>
                                                </tr>
                              `;
  }

  var usersTable = usersTable + `
                                 </tbody>
                                        </table>
                                    `;
  document.getElementById("usTable").innerHTML = usersTable;
}

function replaceCh(ch) {


  var newCh = ch.replace(/\\/g, "/");
  var res = newCh.replace("fakepath", "Users/Takwa/Desktop/haya-campi/images");
  return res;

}

function displayShopProducts() {
  var products = JSON.parse(localStorage.getItem("products"));
  var productTable = ``;
  for (let i = 0; i < products.length; i++) {
    var productTable =
      productTable +
      `<div class="col-lg-4 col-md-6 col-sm-12">

      <div class="products-single fix">
      <div class="box-img-hover">
      <img class="img-fluid" src=${products[i].image} alt="" style="width: 373px; height: 280px;">
          
      </div>
      <div class="why-text">
          <h4>${products[i].productName}</h4>
          <h5>${products[i].price} DT</h5>
      </div>
      <div>
          <button type="button" class="btn hvr-hover" style="background-color:#8aad1f; color: white; border-radius: 0px; width: 100%; border: 0px;" onclick="goToReservation(${products[i].id})">Order</button>
      </div>
  </div>
  </div>
       `;
  }
  document.getElementById("shop").innerHTML = productTable;
}


function goToReservation(id) {
  localStorage.setItem("idPrToReserve", id);
  location.replace("shop-detail.html");
}

function searchById(x, T) {
  var objects = JSON.parse(localStorage.getItem(T) || "[]");
  var obj;
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id === x) {
      obj = objects[i];
    }
  }
  return obj;
}

function displayProductToReserve() {
  var idPr = localStorage.getItem("idPrToReserve");
  var searchedPr = searchById(Number(idPr), "products");
  var myPath = searchedPr.image;

  document.getElementById("prImage").innerHTML = " <img class='img-fluid' src='" + myPath + "'  alt='image' style='width: 373px; height: 280px;'>";
  document.getElementById("prToReserveName").innerHTML = searchedPr.productName;
  document.getElementById("prToReservePrice").innerHTML =
    searchedPr.price + " DT";
  document.getElementById("prToReserveStock").innerHTML =
    searchedPr.stock + " Pieces";
  document.getElementById("prToReserveDescription").innerHTML =
    searchedPr.description;

}

function validateReservation() {
  var qty = document.getElementById("prToReserveQty").value;
  var idPr = localStorage.getItem("idPrToReserve");
  var searchedPr = searchById(Number(idPr), "products");
  if (Number(qty) <= Number(searchedPr.stock) && Number(qty) > 0) {
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");

    var order = {
      id: idOrder,
      qty: qty,
      idPr: idPr,
      idUser: connectedUser.id,
    };
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("idOrder", idOrder + 1);

    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === Number(idPr)) {
        products[i].stock = Number(products[i].stock) - Number(qty);
      }
    }
    localStorage.setItem("products", JSON.stringify(products));
    location.replace("cart.html");
  } else {
    document.getElementById("qtyError").innerHTML = "Invalid Quantity";
    document.getElementById("qtyError").style.color = "red";
  }
}


function editUser(id) {
  var us = searchById(id, 'users');
  var editFormUs = ` 

 <div class="container">
                    <div class="title-left">
                        <h3>Edit User</h3>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="pwd" class="mb-0">Password</label>
                            <input type="password" class="form-control" id="editPwd" placeholder="Password">
                            <span id="editPwdError"></span>

                        </div>

                        <div class="form-group col-md-12">
                            <label for="tel" class="mb-0">Tel</label>
                            <input type="Tel" class="form-control" id="editTel" placeholder="Tel">
                            <span id="editTelError"></span>
                        </div>
                       
                        
                        <div class="form-group col-md-12">
                            <button type="submit" class="btn hvr-hover" onclick="validateEditUser(${us.id})">Edit User</button>
                        </div>
                    </div>
                </div>
                       `;
  document.getElementById('editFormUser').innerHTML = editFormUs;
}

function validateEditUser(id) {

  var newTel = document.getElementById('editTel').value;
  var verifNewTel = (newTel.length === 8);
  if (verifNewTel) {
    document.getElementById('editTelError').innerHTML = '';

  }
  else {
    document.getElementById('editTelError').innerHTML =
      'Invalid tel number';
    document.getElementById('editTelError').style.color = 'red';
  }

  var newPwd = document.getElementById('editPwd').value;
  var verifNewPwd = verifLength(newPwd, 7);
  if (verifNewPwd) {
    document.getElementById('editPwdError').innerHTML = '';
  }
  else {
    document.getElementById('editPwdError').innerHTML =
      'Password must have at least 8 characters';
    document.getElementById('editPwdError').style.color = 'red';
  }


  if (verifNewTel && verifNewPwd) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        users[i].tel = newTel;
        users[i].pwd = newPwd;
        users[i].confirmPwd = newPwd;
      }
    }
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
  }
}

function deletObject(x, T) {
  var Objects = JSON.parse(localStorage.getItem(T) || '[]');
  Objects.splice(x, 1);
  localStorage.setItem(T, JSON.stringify(Objects));
  location.reload();
}



function validateEditProduct(id) {
  var newPrice = document.getElementById('newPrice').value;
  var verifPrice = (newPrice > 0);
  if (verifPrice) {
    document.getElementById('editProductPriceError').innerHTML = '';
  }
  else {
    document.getElementById('editProductPriceError').innerHTML =
      'Invalid price';
    document.getElementById('editProductPriceError').style.color = 'red';
  }

  var newStock = document.getElementById('newStock').value;
  var verifStock = (newStock > 10);
  if (verifStock) {
    document.getElementById('editProductStockError').innerHTML = '';
  }
  else {
    document.getElementById('editProductStockError').innerHTML =
      'Invalid stock';
    document.getElementById('editProductStockError').style.color = 'red';
  }

  if (verifPrice && verifStock) {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products[i].price = newPrice;
        products[i].stock = newStock;

      }
    }
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
  }
}


function validateAddEvent() {

  var eventName = document.getElementById("eventName").value;
  var verifEventName = verifLength(eventName, 5);
  var verifIfEventExist = searchEvent(eventName);

  if (!verifIfEventExist) {
    document.getElementById("eventNameExistError").innerHTML =
      "Event already exists";
    document.getElementById("eventNameExistError").style.color = "red";
  } else {
    document.getElementById("eventNameExistError").innerHTML = "";
  }

  if (verifEventName) {
    document.getElementById("eventNameError").innerHTML = "";
  } else {
    document.getElementById("eventNameError").innerHTML =
      "Event Name must have at least 6 characters";
    document.getElementById("eventNameError").style.color = "red";
  }

  var eventPlace = document.getElementById("eventPlace").value;
  var verifEventPlace = verifLength(eventPlace, 5);

  if (verifEventPlace) {
    document.getElementById("eventPlaceError").innerHTML = "";
  } else {
    document.getElementById("eventPlaceError").innerHTML =
      "Event Place must have at least 6 characters";
    document.getElementById("eventPlaceError").style.color = "red";
  }

  var eventPrice = document.getElementById("eventPrice").value;
  var verifPrice = eventPrice > 0;

  if (verifPrice) {
    document.getElementById("eventPriceError").innerHTML = "";
  } else {
    document.getElementById("eventPriceError").innerHTML =
      "Price Event must be greater then 0";
    document.getElementById("eventPriceError").style.color = "red";
  }

  var participants = document.getElementById("participants").value;
  var verifParticipants = participants > 10;

  if (verifParticipants) {
    document.getElementById("eventParticipantsError").innerHTML = "";
  } else {
    document.getElementById("eventParticipantsError").innerHTML = "Participants must be greater then 10";
    document.getElementById("eventParticipantsError").style.color = "red";
  }

  var d1 = document.getElementById("arrivalDate");
  var date1 = d1.value.toString();
  var arrivalDate = convertDate(date1).toString();

  var d2 = document.getElementById("departureDate");
  var date2 = d2.value.toString();
  var departureDate = convertDate(date2);


  var image = document.getElementById("eventImage").value;
  var eventImage = replaceCh(image);
  var verifEventImage = eventImage.length !== 0;

  if (verifEventImage) {
    document.getElementById("eventImageError").innerHTML = "";
  } else {
    document.getElementById("eventImageError").innerHTML = "Please choose the event image";
    document.getElementById("eventImageError").style.color = "red";
  }

  console.log('departure', departureDate);
  console.log('arrival', arrivalDate);

  console.log('verifIfEventExist', verifIfEventExist);
  console.log('verifEventName', verifEventName);
  console.log('verifEventPlace', verifEventPlace);
  console.log('verifPrice', verifPrice);
  console.log('verifParticipants', verifParticipants);
  console.log('verifEventImage', verifEventImage);
  if (
    !verifIfEventExist &&
    verifEventName &&
    verifEventPlace &&
    verifPrice &&
    verifParticipants &&
    verifEventImage

  ) {
    var idEvent = JSON.parse(localStorage.getItem("idEvent") || "1");

    var event = {
      id: idEvent,
      eventName: eventName,
      eventPlace: eventPlace,
      eventPrice: eventPrice,
      participants: participants,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      image: eventImage
    };

    console.log('here');
    var events = JSON.parse(localStorage.getItem("events") || "[]");
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
    localStorage.setItem("idEvent", idEvent + 1);
    location.reload();



  }



}


function editProduct(id) {
  var pr = searchById(id, 'products');
  var editFormPr = ` 
  <div class="container">
    <div class="row">
    
      <div class="col-sm-6 col-lg-12 mb-3">
          <div class="title-left">
              <h3>Edit Product</h3>
          </div>
          <div class="form-row">
              <div class="col-md-12 form-group">
                  <input type="text" class="form-control" id="newPrice" name="name" placeholder="Price" >
              </div>
              <span id="editProductPriceError"></span>
              <div class="col-md-12 form-group">
                  <input type="text" class="form-control" id="newStock" name="name" placeholder="Stock" >
              </div>
              <span id="editProductStockError"></span>
            
          </div> 
              <div class="form-group col-md-12">
                  <button type="submit" class="btn hvr-hover" onclick="validateEditProduct(${pr.id})">Edit Product</button>
              </div>
          </div>
      </div>
  </div>

</div>`;
  document.getElementById('editFormProduct').innerHTML = editFormPr;

}


function addUser() {
  var firstName = document.getElementById("firstName").value;
  var verifFirstName = verifLength(firstName, 5);
  if (verifFirstName) {
    document.getElementById("firstNameError").innerHTML = "";
  } else {
    document.getElementById("firstNameError").innerHTML =
      "First Name must have at least 5 characters";
    document.getElementById("firstNameError").style.color = "red";
  }
  var lastName = document.getElementById("lastName").value;
  var verifLastName = verifLength(lastName, 3);
  if (verifLastName) {
    document.getElementById("lastNameError").innerHTML = "";
  } else {
    document.getElementById("lastNameError").innerHTML =
      "Last Name must have at least 3 characters";
    document.getElementById("lastNameError").style.color = "red";
  }
  var email = document.getElementById("email").value;
  var verifEmail = validateEmail(email);
  if (verifEmail) {
    document.getElementById("emailError").innerHTML = "";
  } else {
    document.getElementById("emailError").innerHTML = "Invalid Email";
    document.getElementById("emailError").style.color = "red";
  }
  var pwd = document.getElementById("pwd").value;
  var verifPwd = verifLength(pwd, 8);
  if (verifPwd) {
    document.getElementById("pwdError").innerHTML = "";
  } else {
    document.getElementById("pwdError").innerHTML =
      "Password must have at least 8 characters";
    document.getElementById("pwdError").style.color = "red";
  }
  var confirmPwd = document.getElementById("confirmPwd").value;
  if (confirmPwd === pwd) {
    document.getElementById("confirmPwdError").innerHTML = "";
  } else {
    document.getElementById("confirmPwdError").innerHTML = "Password not match";
    document.getElementById("confirmPwdError").style.color = "red";
  }
  var tel = document.getElementById("tel").value;
  if (tel.length === 8) {
    document.getElementById("telError").innerHTML = "";
  } else {
    document.getElementById("telError").innerHTML =
      "Tel number must have 8 characters";
    document.getElementById("telError").style.color = "red";
  }

  var profileImage = document.getElementById("profileImage").value;
  var image = replaceCh(profileImage);
  var verifProfileImage = image.length !== 0;
  if (verifProfileImage) {
    document.getElementById("profileImageError").innerHTML = "";
  } else {
    document.getElementById("profileImageError").innerHTML = "Please choose the profile image";
    document.getElementById("profileImageError").style.color = "red";
  }


  var role = document.getElementById("role").value;


  if (
    verifFirstName &&
    verifLastName &&
    verifEmail &&
    verifPwd &&
    pwd === confirmPwd &&
    tel.length === 8 &&
    verifProfileImage) {
    var idUser = JSON.parse(localStorage.getItem("idUser") || "10");

    var user = {
      id: idUser,
      firstName: firstName,
      lastName: lastName,
      email: email,
      pwd: pwd,
      confirmPwd: confirmPwd,
      tel: tel,
      role: role,
      avatar: image
    };
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("idUser", idUser + 1);
    location.reload();
  }
}


function validateProductReservation() {
  var qty = document.getElementById('prToReserveQty').value;
  var idPr = localStorage.getItem("idPrToReserve");
  var searchedPr = searchById(Number(idPr), "products");

  if ((Number(qty) <= Number(searchedPr.stock)) && (Number(qty) > 0)) {

    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");

    var order = {
      id: idOrder,
      qty: qty,
      idPr: idPr,
      idUser: connectedUser.id
    }
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("idOrder", idOrder + 1);

    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === Number(idPr)) {
        products[i].stock = Number(products[i].stock) - Number(qty);
      }
    }
    localStorage.setItem("products", JSON.stringify(products));
    location.replace('cart.html')

  } else {
    document.getElementById('qtyNotAvailable').innerHTML = 'Invalid Quantity';
    document.getElementById('qtyNotAvailable').style.color = 'red';
  }
}

function convertDate(d) {

  var res = d.charAt(8) + d.charAt(9) + "/" + d.charAt(5) + d.charAt(6) + "/" + d.charAt(0) + d.charAt(1) + d.charAt(2) + d.charAt(3);
  return res;
}

function searchObjectPosition(id, T) {
  var objects = JSON.parse(localStorage.getItem(T) || "[]");
  var index;
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id === id) {
      index = i;
    }
  }
  return index;
}

function deleteOrder(position, id) {
  var order = searchById(Number(id), "orders");
  var qty = order.qty;
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === Number(order.idPr)) {
      products[i].stock = products[i].stock + Number(qty);
    }
  }
  localStorage.setItem("products", JSON.stringify(products));
  deleteObject(position, "orders");
}

function deleteObject(x, T) {
  var objects = JSON.parse(localStorage.getItem(T) || "[]");
  objects.splice(x, 1);
  localStorage.setItem(T, JSON.stringify(objects));
  location.reload();
}

function editOrder(id) {
  var order = searchById(id, "orders");
  var editFormOrder = `
   
							<div class="col-md-12 form-group">
								<input type="number" class="form-control" id="editQty" name="name" value=${order.qty} placeholder="Quantity" >
              </div>
              <span id='qtyEditError'></span>
							<div class="col-md-12 form-group">
								<button class="btn hvr-hover" onclick="validateEditOrder(${order.id})">Edit Order</button>
                            </div>`;
  document.getElementById("editFormOrderHTML").innerHTML = editFormOrder;
}

function validateEditOrder(id) {
  var newQty = document.getElementById("editQty").value;
  var order = searchById(id, "orders");
  var product = searchById(Number(order.idPr), "products");
  var diff = Number(newQty) - order.qty;
  if ((product.stock < diff) || (newQty <= 0)) {
    document.getElementById("qtyEditError").innerHTML = "Invalid stock";
    document.getElementById("qtyEditError").style.color = "red";
  } else {
    // update order
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id === id) {
        orders[i].qty = Number(newQty);
      }
    }
    localStorage.setItem("orders", JSON.stringify(orders));
    // update product stock
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === Number(order.idPr)) {
        products[i].stock = products[i].stock - Number(diff);
      }
    }
    localStorage.setItem("products", JSON.stringify(products));

    location.reload();
  }
}

function displayEvents() {

  var events = JSON.parse(localStorage.getItem("events"));

  var eventTable = `
    
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Event Name</th>
                                    <th>Event Place</th>
                                    <th>Price</th>
                                    <th>Participants</th>
                                    <th>Arrival Date</th>
                                    <th>Departure Date</th>
                                    <th>Actions</th>
                                    
                                </tr>
                            </thead>
                            <tbody>`;

  for (let i = 0; i < events.length; i++) {

    var eventTable =
      eventTable +
      ` <tr>
                                                <td class="thumbnail-img">
                                                       
                                                    <img class="img-fluid" src=${events[i].image} alt="" />

                                                  </td>
                                                    <td class="name-pr">

                                                        <a href="#">${events[i].eventName}</a>
                        
                                                    </td>
                                                    <td class="name-pr">

                                                        <a href="#">${events[i].eventPlace}</a>
                        
                                                    </td>
                                                    <td class="price-pr">
                                                        <p>${events[i].eventPrice} DT</p>
                                                    </td>
                                                    <td>${events[i].participants} persons</td>
                                                    <td>${events[i].arrivalDate}</td>
                                                    <td>${events[i].departureDate}</td>

                                                    <td>
                                                    <button class="btn hvr-hover" onclick="editEvent(${events[i].id})">Edit</button>
                                                  
                                                    <button class="btn hvr-hover" onclick="deletObject(${i},'events')">Delete</button>    
                                                    </td>
                                                </tr>
                              `;
  }

  var eventTable = eventTable + `
                                 </tbody>
                                        </table>
                                    `;
  document.getElementById("eventTable").innerHTML = eventTable;
}


function editEvent(id) {
  var event = searchById(id, 'events');
  var editFormEvent = ` 
  <div class="container">
    <div class="row">
    
      <div class="col-sm-6 col-lg-12 mb-3">
          <div class="title-left">
              <h3>Edit Event</h3>
          </div>
          <div class="form-row">
              <div class="col-md-12 form-group">
                  <input type="text" class="form-control" id="newPrice" name="name" placeholder="Price" >
              </div>
              <span id="editEventPriceError"></span>
              <div class="col-md-12 form-group">
                  <input type="number" class="form-control" id="newParticipants" name="name" placeholder="Participants" >
              </div>
              <span id="editEventParticipantsError"></span>
            
          </div> 
              <div class="form-group col-md-12">
                  <button type="submit" class="btn hvr-hover" onclick="validateEditEvent(${event.id})">Edit Event</button>
              </div>
          </div>
      </div>
  </div>

</div>`;
  document.getElementById('editFormEvent').innerHTML = editFormEvent;

}

function validateEditEvent(id) {
  var newPrice = document.getElementById('newPrice').value;
  var verifPrice = (newPrice > 0);
  if (verifPrice) {
    document.getElementById('editEventPriceError').innerHTML = '';
  }
  else {
    document.getElementById('editEventPriceError').innerHTML =
      'Invalid price';
    document.getElementById('editEventPriceError').style.color = 'red';
  }

  var newParticipants = document.getElementById('newParticipants').value;
  var verifParticipants = (newParticipants > 10);
  if (verifParticipants) {
    document.getElementById('editEventParticipantsError').innerHTML = '';
  }
  else {
    document.getElementById('editEventParticipantsError').innerHTML =
      'Invalid Participants number';
    document.getElementById('editEventParticipantsError').style.color = 'red';
  }

  if (verifPrice && verifParticipants) {
    var events = JSON.parse(localStorage.getItem('events') || '[]');
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === id) {
        events[i].eventPrice = newPrice;
        events[i].participants = newParticipants;

      }
    }
    localStorage.setItem('events', JSON.stringify(events));
    location.reload();
  }
}


function displayEventsPage() {
  var events = JSON.parse(localStorage.getItem("events"));
  var eventsTable = ``;
  for (let i = 0; i < events.length; i++) {
    var eventsTable =
      eventsTable +
      `<div class="col-lg-4 col-md-6 col-sm-12">

      <div class="products-single fix">
      <div class="box-img-hover">
      <img class="img-fluid" src=${events[i].image} alt="" style="width: 373px; height: 280px;">
          
      </div>
      <div class="why-text">
          <h4>${events[i].eventName}</h4>
          <h4>${events[i].eventPlace}</h4>
          <h5>${events[i].eventPrice} DT</h5>
      </div>
      <div>
          <button type="button" class="btn hvr-hover" style="background-color:#8aad1f; color: white; border-radius: 0px; width: 100%; border: 0px;" onclick="goToEventDetailsPage(${events[i].id})">Participate</button>
      </div>
  </div>
  </div>
       `;
  }
  document.getElementById("eventPage").innerHTML = eventsTable;
}

function goToEventDetailsPage(id) {
  localStorage.setItem("idEventToReserve", id);
  location.replace("event-detail.html");
}

function displayEventToReserve() {
  var idEvent = localStorage.getItem("idEventToReserve");
  var searchedEvent = searchById(Number(idEvent), "events");
  console.log('event', searchedEvent);
  var myPath = searchedEvent.image;

  document.getElementById("eventImage").innerHTML = " <img class='img-fluid' src='" + myPath + "'  alt='image' style='width: 373px; height: 280px;'>";
  document.getElementById("eventToReserveName").innerHTML = searchedEvent.eventName;
  document.getElementById("eventToReservePlace").innerHTML = searchedEvent.eventPlace;
  document.getElementById("eventToReservePrice").innerHTML =
    searchedEvent.eventPrice + " DT";
  document.getElementById("eventToReserveParticipants").innerHTML =
    searchedEvent.participants + " Persons";
  document.getElementById("eventToReserveArrivalDate").innerHTML = "Arrival Date: " +
    searchedEvent.arrivalDate;
  document.getElementById("eventToReserveDepartureDate").innerHTML = "Departure Date: " +
    searchedEvent.departureDate;

}


function validateEventReservation() {

  var participantsNbr = document.getElementById('eventToReserveParticipantsNumber').value;
  var idEventToReserve = localStorage.getItem("idEventToReserve");
  var searchedEvent = searchById(Number(idEventToReserve), "events");

  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  

 
    if ((Number(participantsNbr) <= Number(searchedEvent.participants)) && (Number(participantsNbr) > 0)) {

      var idReservation = JSON.parse(localStorage.getItem("idReservation") || "1");

      var reservation = {
        id: idReservation,
        participants: participantsNbr,
        idEvent: idEventToReserve,
        idUser: connectedUser.id
      }
      var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
      reservations.push(reservation);
      localStorage.setItem("reservations", JSON.stringify(reservations));
      localStorage.setItem("idReservation", idReservation + 1);

      var events = JSON.parse(localStorage.getItem("events") || "[]");
      for (let i = 0; i < events.length; i++) {
        if (events[i].id === Number(idEventToReserve)) {
          events[i].participants = Number(events[i].participants) - Number(participantsNbr);
        }
      }
      localStorage.setItem("events", JSON.stringify(events));
      location.replace('cart.html')

    } else {

      document.getElementById('participantsNumberNotAvailable').innerHTML = 'Participants number not available';
      document.getElementById('participantsNumberNotAvailable').style.color = 'red';
    }
  
    

  
}


function displayProductsOrders() {


  var orders = JSON.parse(localStorage.getItem("orders") || "[]");


  var orderTable = `<table class="table">
    <thead>
        <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>User id</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            
        </tr>
    </thead>
    <tbody>`;

  var sum = 0;
  for (let i = 0; i < orders.length; i++) {
    var pr = searchById(Number(orders[i].idPr), "products");
    var totalPrPrice = Number(pr.price) * Number(orders[i].qty);
    var us = searchById(Number(orders[i].idUser), "users");
    sum = sum + totalPrPrice;
    orderTable =
      orderTable +
      `<tr>
          <td class="thumbnail-img">
               
            <img class="img-fluid" src=${pr.image} alt="" style="width:80px;height:80px" />
  
          </td>
          <td class="name-pr">
  
          <a href="#">${pr.productName}</a>
  
          </td>
          <td class="name-pr">
  
          <a href="#">${us.id}</a>
  
          </td>
         
      
      <td>
          <h5> ${pr.price} DT</h5>
      </td>
      <td>
      ${orders[i].qty}
      </td>
      <td>
          <h5>${totalPrPrice}</h5>
      </td>
  
      
      
  </tr>`;
  }

  orderTable =
    orderTable +
    `
    <tr class="bottom_button">
    <td>
    </td>
    <td>
    </td>
  
    <td>
    </td>
  
    <td>
    </td>
  
    </td>
  </tr>
  <tr>
    <td>
  
    </td>
    <td>
  
    </td>
    <td>
       
    </td>
    <td>
    <h2>Subtotal</h2>
    </td>
    <td>
   
  
    </td>
    <td>
    <h2> ${sum}DT</h2>
    </td>
  </tr>
  
  </tbody>
  </table>`;

  document.getElementById("orders1").innerHTML = orderTable;

}

function displayEventsOrders() {


  var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");


  var orderTable = `<table class="table">
    <thead>
        <tr>
            <th>Image</th>
            <th>Event Name</th>
            <th>User id</th>
            <th>Price</th>
            <th>Participants</th>
            <th>Total</th>
            
        </tr>
    </thead>
    <tbody>`;

  var sum = 0;
  for (let i = 0; i < reservations.length; i++) {
    var event = searchById(Number(reservations[i].idEvent), "events");
    var totalEventPrice = Number((event).eventPrice) * Number(reservations[i].participants);
    var us = searchById(Number(reservations[i].idUser), "users");
    sum = sum + totalEventPrice;
    orderTable =
      orderTable +
      `<tr>
          <td class="thumbnail-img">
               
            <img class="img-fluid" src=${event.image} alt="" style="width:80px;height:80px" />
  
          </td>
          <td class="name-pr">
  
          <a href="#">${event.eventName}</a>
  
          </td>
          <td class="name-pr">
  
          <a href="#">${us.id}</a>
  
          </td>
         
      
      <td>
          <h5> ${event.eventPrice} DT</h5>
      </td>
      <td>
      ${reservations[i].participants}
      </td>
      <td>
          <h5>${totalEventPrice}</h5>
      </td>
  
      
      
  </tr>`;
  }

  orderTable =
    orderTable +
    `
    <tr class="bottom_button">
    <td>
    </td>
    <td>
    </td>
  
    <td>
    </td>
  
    <td>
    </td>
  
    </td>
  </tr>
  <tr>
    <td>
  
    </td>
    <td>
  
    </td>
    <td>
       
    </td>
    <td>
    <h2>Subtotal</h2>
    </td>
    <td>
   
  
    </td>
    <td>
    <h2> ${sum}DT</h2>
    </td>
  </tr>
  
  </tbody>
  </table>`;

  document.getElementById("orders2").innerHTML = orderTable;

}

function basket1() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  var myOrders = [];
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].idUser === connectedUser.id) {
      myOrders.push(orders[i]);
    }
  }


  var orderTable = `<table class="table">
  <thead>
      <tr>
          <th>Image</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Actions</th>
          
      </tr>
  </thead>
  <tbody>`;

  var sum = 0;
  for (let i = 0; i < myOrders.length; i++) {
    var pr = searchById(Number(myOrders[i].idPr), "products");
    var totalPrPrice = Number(pr.price) * Number(myOrders[i].qty);
    sum = sum + totalPrPrice;
    orderTable =
      orderTable +
      `<tr>
        <td class="thumbnail-img">
             
          <img class="img-fluid" src=${pr.image} alt="" />

        </td>
        <td class="name-pr">

        <a href="#">${pr.productName}</a>

        </td>
       
    </td>
    <td>
        <h5> ${pr.price} DT</h5>
    </td>
    <td>
    ${myOrders[i].qty}
    </td>
    <td>
        <h5>${totalPrPrice}</h5>
    </td>

    <td>
        <button class="btn hvr-hover"onclick="editOrder(${myOrders[i].id})">Edit</button>
        <button class="btn hvr-hover" onclick="deleteOrder(${searchObjectPosition(myOrders[i].id, "orders")}, ${myOrders[i].id})">Delete</button>
    </td>
    
</tr>`;
  }

  orderTable =
    orderTable +
    `
  <tr class="bottom_button">
  <td>
  </td>
  <td>
  <td>

  </td>
  <td>

  </td>
  <td>

  </td>
</tr>
<tr>
  <td>

  </td>
  <td>

  </td>
  <td>
     
  </td>
  <td>
  <h2>Subtotal</h2>
  </td>
  <td>
  <h2> ${sum}DT</h2>

  </td>
</tr>

</tbody>
</table>`;

  document.getElementById("orderTableHTML").innerHTML = orderTable;
}

function basket2() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  var myOrders = [];
  for (let i = 0; i < reservations.length; i++) {
    if (reservations[i].idUser === connectedUser.id) {
      myOrders.push(reservations[i]);
    }
  }


  var orderTable = `<table class="table">
  <thead>
      <tr>
          <th>Image</th>
          <th>Event Name</th>
          <th>Price</th>
          <th>Participants</th>
          <th>Total</th>
          <th>Actions</th>
      </tr>
  </thead>
  <tbody>`;
  var sum = 0;
  for (let i = 0; i < myOrders.length; i++) {
    var event = searchById(Number(myOrders[i].idEvent), "events");
    var totalEventPrice = Number(event.eventPrice) * Number(myOrders[i].participants);
    sum = sum + totalEventPrice;
    orderTable =
      orderTable +
      `<tr>
    
        
        <td class="thumbnail-img">
             
        <img class="img-fluid" src=${event.image} alt="" />

      </td>
      <td class="name-pr">
        
        <a href="#">${event.eventName}</a>
      </td>
      
    <td>
        <h5> ${event.eventPrice} DT</h5>
    </td>
    <td>
    ${myOrders[i].participants}
    </td>
    <td>
        <h5>${totalEventPrice}</h5>
    </td>

    <td>
        
        <button class="btn hvr-hover" 
        onclick="editReservation(${myOrders[i].id})">Edit</button>
        <button class="btn hvr-hover" onclick="deleteReservation(${searchObjectPosition(myOrders[i].id, "reservations")},${myOrders[i].id})">Delete</button>
    </td>
    
</tr>`;
  }

  orderTable =
    orderTable +
    `
<tr class="bottom_button">
<td>
</td>
<td>
<td>

</td>
<td>

</td>
<td>

</td>
</tr>
<tr>
<td>

</td>
<td>

</td>
<td>
   
</td>
<td>
<h2>Subtotal</h2>
</td>
<td>
<h2> ${sum}DT</h2>

</td>
</tr>

</tbody>
</table>`;

  document.getElementById("orderTable").innerHTML = orderTable;
}

function deleteReservation(position, id) {
  var reservation = searchById(Number(id), "reservations");
  var participants = reservation.participants;
  var events = JSON.parse(localStorage.getItem("events") || "[]");
  for (let i = 0; i < events.length; i++) {
    if (events[i].id === Number(reservation.idEvent)) {
      events[i].participants = events[i].participants + Number(participants);
    }
  }
  localStorage.setItem("events", JSON.stringify(events));
  deleteObject(position, "reservations");
}

function editReservation(id) {
  var reservation = searchById(id, "reservations");
  var editFormReservation = `
   
							<div class="col-md-12 form-group">
								<input type="number" class="form-control" id="editParticipants" name="name" value=${reservation.participants} placeholder="Participants" >
              </div>
              <span id='participantsEditError'></span>
							<div class="col-md-12 form-group">
								<button class="btn hvr-hover" onclick="validateEditReservation(${reservation.id})">Edit Order</button>
                            </div>`;
  document.getElementById("editFormReservation").innerHTML = editFormReservation;
}

function validateEditReservation(id) {
  var newParticipants = document.getElementById("editParticipants").value;
  var reservation = searchById(id, "reservations");
  var event = searchById(Number(reservation.idEvent), "events");
  var diff = Number(newParticipants) - reservation.participants;
  if ((event.participants < diff) || (newParticipants <= 0)) {
    document.getElementById("participantsEditError").innerHTML = "Invalid participants number";
    document.getElementById("participantsEditError").style.color = "red";
  } else {
    // update reservation
    var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    for (let i = 0; i < reservations.length; i++) {
      if (reservations[i].id === id) {
        reservations[i].participants = Number(newParticipants);
      }
    }
    localStorage.setItem("reservations", JSON.stringify(reservations));
    // update event participants
    var events = JSON.parse(localStorage.getItem("events") || "[]");
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === Number(reservation.idEvent)) {
        events[i].participants = events[i].participants - Number(diff);
      }
    }
    localStorage.setItem("events", JSON.stringify(events));

    location.reload();
  }
}

function setHeader() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  if (connectedUser) {

    if (connectedUser.role === 'admin') {
      var header = `
     
      <ul class="nav navbar-nav ml-auto" data-in="fadeInDown" data-out="fadeOutUp">
      <li class="nav-item active"><a class="nav-link" href="home.html">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
      <li class="nav-item"><a class="nav-link" href="events.html">Events</a></li>
      <li class="nav-item"><a class="nav-link" href="admin.html">Dashboard</a></li>
      <li class="nav-item dropdown">
      <img style="border-radius:50px; height:60px; width:60px;" src=${connectedUser.avatar} href="#" class="nav-link dropdown-toggle arrow" data-toggle="dropdown"/>
      <ul class="dropdown-menu">
      <li><a href=""> Hello ${connectedUser.firstName} ${connectedUser.lastName}!</a>
      <li><a href="my-account.html">My account</a></li>
      <li><a href="" onclick="logout();">Log Out</a></li>
      </ul>
      </li>
      `;
      document.getElementById("headerId").innerHTML = header;

    } else {

      var header = `
      <ul class="nav navbar-nav ml-auto" data-in="fadeInDown" data-out="fadeOutUp">
                    <li class="nav-item active"><a class="nav-link" href="home.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
                    <li class="nav-item"><a class="nav-link" href="events.html">Events</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact-us.html">Contact Us</a></li>
               
                    <li class="nav-item dropdown">
                    <img style="border-radius:50px; height:60px; width:60px;" src=${connectedUser.avatar} href="#" class="nav-link dropdown-toggle arrow" data-toggle="dropdown"/>
                    <ul class="dropdown-menu">
                    <li><a href=""> Hello ${connectedUser.firstName} ${connectedUser.lastName}!</a>
                    <li><a href="my-account.html">My account</a></li>
                    <li><a href="wishlist.html">My wishlist</a></li>
                    <li><a href="" onclick="logout();">Log Out</a></li>
                    </ul>
                    </li>
      </ul>`;

      var cartSearch = `
      <ul>
                    <li class="search"><a href="#"><i class="fa fa-search"></i></a></li>
                    <li class="side-menu">
                        <a href="cart.html">
                            <i class="fa fa-shopping-bag"></i>
                            <span class="badge" id="ordersNbrHTML"></span>
                            <p onclick="location.href='cart.html'">My Cart</p>
                        </a>
                    </li>
                </ul>`;
      document.getElementById('cartSearchHTML').innerHTML = cartSearch;
      document.getElementById("headerId").innerHTML = header;

    }

  } else {
    var header = `
    <ul class="nav navbar-nav ml-auto" data-in="fadeInDown" data-out="fadeOutUp">
    <li class="nav-item active"><a class="nav-link" href="home.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
    <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
    <li class="nav-item"><a class="nav-link" href="events.html">Events</a></li>
    <li class="nav-item"><a class="nav-link" href="contact-us.html">Contact Us</a></li>
	  <li class="nav-item"><button style="border-radius:20px;color:white;width:100px"class="btn hvr-hover nav-link" onclick="location.href='login.html'">Login</button></li>
    </ul>`;
    document.getElementById("headerId").innerHTML = header;

  }


}

function logout() {
  localStorage.removeItem("connectedUser");
  location.replace("home.html");
}

function orderNbr() {
  var orders = JSON.parse(localStorage.getItem("orders") || "[]");

  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var orderNbr = 0;
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].idUser === connectedUser.id) {

      orderNbr += 1;
    }
  }

  var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  for (let j = 0; j < reservations.length; j++) {
    if (reservations[j].idUser === connectedUser.id) {

      orderNbr += 1;
    }
  }



  document.getElementById("ordersNbrHTML").innerHTML = "( " + orderNbr + " )";
}


function displayUserInformations() {

  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var formTable = `
  <div class="row new-account-login">
  <div class="col-lg-3">
  </div>
  <div class="col-lg-6">
      <div class="row" style="margin-left:40%;margin-right:40%;margin-bottom:50px">
      <img src="${connectedUser.avatar}" id="profileImage" alt="profileImage" style="border-radius: 50px;height:100px;width:100px;">
      </div>
      <div class="row">
          <div class="form-group col-md-6">
              <label for="firstName" class="mb-0">First Name</label>
              <input type="text" class="form-control" id="firstName" value="${connectedUser.firstName}" style="color:black;" disabled="true" placeholder="First Name" >
              <span id="firstNameError"></span>

          </div>
          <div class="form-group col-md-6">
              <label for="lastName" class="mb-0">Last Name</label>
              <input type="text" class="form-control" id="lastName" value="${connectedUser.lastName}" style="color:black;" disabled="true" placeholder="Last Name">
              <span id="lastNameError"></span>

          </div>
          <div class="form-group col-md-6">
              <label for="email" class="mb-0">Email Address</label>
              <input type="email" class="form-control" id="email" value="${connectedUser.email}" style="color:black;" disabled="true" placeholder="Enter Email">
              <span id="emailError"></span>

          </div>
          <div class="form-group col-md-6">
              <label for="pwd" class="mb-0">Password</label>
              <input type="password" class="form-control" id="pwd" value="${connectedUser.pwd}" style="color:black;" disabled="true" placeholder="Password">
              <span id="pwdError"></span>

          </div>

          <div class="form-group col-md-6">
              <label for="confirmPwd" class="mb-0">Confirm Password</label>
              <input type="password" class="form-control" id="confirmPwd" value="${connectedUser.confirmPwd}" style="color:black;" disabled="true" placeholder="Confirm Password">
              <span id="confirmPwdError"></span>

          </div>
          <div class="form-group col-md-6">
              <label for="tel" class="mb-0">Tel</label>
              <input type="Tel" class="form-control" id="tel" value="${connectedUser.tel}" style="color:black;" disabled="true" placeholder="Tel">
              <span id="telError"></span>
          </div>
         
          <div class="form-group col-md-6">
              <label class="btn hvr">
                  <i class="fa fa-image"></i> Choose your profile picture<input disabled="true" type="file"
                      style="display: none;" name="image" id="avatar">
              </label>
          </div> 
        </div>
        
        <div class="row" style="margin-left:40%;margin-right:40%;margin-bottom:50px">
            <button type="submit" id="btn-edit" style="color:white;width:100px;visibility:visible;"class="btn hvr-hover" onclick="editUserInformations()">Edit</button>
            <button type="submit"  id="btn-validate"style="color:white;width:100px;visibility:hidden;"class="btn hvr-hover" onclick="validateEditUserInformations()">Validate</button>
            </div>

       

  </div>
  <div class="col-lg-3">
  </div>
</div>
  `;
  document.getElementById('formTable').innerHTML = formTable;
}

function editUserInformations() {
  document.getElementById('firstName').disabled = false;
  document.getElementById('lastName').disabled = false;
  document.getElementById('email').disabled = false;
  document.getElementById('pwd').disabled = false;
  document.getElementById('confirmPwd').disabled = false;
  document.getElementById('tel').disabled = false;
  document.getElementById('avatar').disabled = false;
  document.getElementById('btn-edit').style.visibility = "hidden";
  document.getElementById('btn-validate').style.visibility = "visible";






}

function validateEditUserInformations() {

  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var firstName = document.getElementById("firstName").value;
  var verifFirstName = verifLength(firstName, 5);
  if (verifFirstName) {
    document.getElementById("firstNameError").innerHTML = "";
  } else {
    document.getElementById("firstNameError").innerHTML =
      "First Name must have at least 5 characters";
    document.getElementById("firstNameError").style.color = "red";
  }
  var lastName = document.getElementById("lastName").value;
  var verifLastName = verifLength(lastName, 3);
  if (verifLastName) {
    document.getElementById("lastNameError").innerHTML = "";
  } else {
    document.getElementById("lastNameError").innerHTML =
      "Last Name must have at least 3 characters";
    document.getElementById("lastNameError").style.color = "red";
  }
  var email = document.getElementById("email").value;
  var verifEmail = validateEmail(email);
  if (verifEmail) {
    document.getElementById("emailError").innerHTML = "";
  } else {
    document.getElementById("emailError").innerHTML = "Invalid Email";
    document.getElementById("emailError").style.color = "red";
  }
  var pwd = document.getElementById("pwd").value;
  var verifPwd = verifLength(pwd, 8);
  if (verifPwd) {
    document.getElementById("pwdError").innerHTML = "";
  } else {
    document.getElementById("pwdError").innerHTML =
      "Password must have at least 8 characters";
    document.getElementById("pwdError").style.color = "red";
  }
  var confirmPwd = document.getElementById("confirmPwd").value;
  if (confirmPwd === pwd) {
    document.getElementById("confirmPwdError").innerHTML = "";
  } else {
    document.getElementById("confirmPwdError").innerHTML = "Password not match";
    document.getElementById("confirmPwdError").style.color = "red";
  }
  var tel = document.getElementById("tel").value;
  if (tel.length === 8) {
    document.getElementById("telError").innerHTML = "";
  } else {
    document.getElementById("telError").innerHTML =
      "Tel number must have 8 characters";
    document.getElementById("telError").style.color = "red";
  }
  var avatar = document.getElementById("avatar").value;
  var profileImage = connectedUser.avatar;
  var newAvatar = replaceCh(avatar);
  if (newAvatar.length === 0) {
    newAvatar = "C:/Users/Takwa/Desktop/haya-campi/images/avatar.jpg";
  }
  else {
    profileImage = newAvatar;
  }
  if (
    verifFirstName &&
    verifLastName &&
    verifEmail &&
    verifPwd &&
    pwd === confirmPwd &&
    tel.length === 8
  ) {

    connectedUser.firstName = firstName;
    connectedUser.lastName = lastName;
    connectedUser.email = email;
    connectedUser.pwd = pwd;
    connectedUser.confirmPwd = confirmPwd;
    connectedUser.tel = tel;
    connectedUser.avatar = profileImage;
    connectedUser.role = connectedUser.role;

    localStorage.setItem("connectedUser", JSON.stringify(connectedUser));

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === connectedUser.id) {
        users[i].firstName = firstName;
        users[i].lastName = lastName;
        users[i].email = email;
        users[i].pwd = pwd;
        users[i].confirmPwd = confirmPwd;
        users[i].tel = tel;
        users[i].avatar = profileImage;
        users[i].role = connectedUser.role;
      }
    }
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
  }

}

function addPrToWishlist() {

  var idPr = localStorage.getItem("idPrToReserve");
  var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
  var idPrToWishlist = JSON.parse(localStorage.getItem("idPrToWishlist") || "1");
  var productsWishlist = JSON.parse(localStorage.getItem("productsWishlist") || "[]");

  var verif = searchPrInProductsWishlist(idPr);
  console.log('verif', verif);
  if (!verif) {
    var prToWishlist = {
      id: idPrToWishlist,
      idPr: idPr,
      idUser: connectedUser.id
    };

    productsWishlist.push(prToWishlist);
    localStorage.setItem("productsWishlist", JSON.stringify(productsWishlist));
    localStorage.setItem("idPrToWishlist", idPrToWishlist + 1);
    location.replace("wishlist.html");
  }
  else {
    document.getElementById('prWishlist').innerHTML = "Product already added to Wishlist!";
    document.getElementById('prWishlist').style.color = "red";
  }



}


function searchPrInProductsWishlist(id) {
  var productsWishlist = JSON.parse(localStorage.getItem("productsWishlist") || "[]");
  var objectExist = false;
  for (let i = 0; i < productsWishlist.length; i++) {

    if (productsWishlist[i].idPr === id) {
      objectExist = true;

    }
  }
  return objectExist;
}


function addEventToWishlist() {

  var idEvent = localStorage.getItem("idEventToReserve");
  var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
  var idEventToWishlist = JSON.parse(localStorage.getItem("idEventToWishlist") || "1");
  var eventsWishlist = JSON.parse(localStorage.getItem("eventsWishlist") || "[]");

  var verif = searchEventInProductsWishlist(idEvent);
  console.log('verif', verif);
  if (!verif) {
    var eventToWishlist = {
      id: idEventToWishlist,
      idEvent: idEvent,
      idUser: connectedUser.id
    };

    eventsWishlist.push(eventToWishlist);
    localStorage.setItem("eventsWishlist", JSON.stringify(eventsWishlist));
    localStorage.setItem("idEventToWishlist", idEventToWishlist + 1);
    location.replace("wishlist.html");
  }
  else {
    document.getElementById('eventWishlist').innerHTML = "Event already added to Wishlist!";
    document.getElementById('eventWishlist').style.color = "red";
  }



}

function searchEventInProductsWishlist(id) {
  var eventsWishlist = JSON.parse(localStorage.getItem("eventsWishlist") || "[]");
  var objectExist = false;
  for (let i = 0; i < eventsWishlist.length; i++) {

    if (eventsWishlist[i].idEvent === id) {
      objectExist = true;

    }
  }
  return objectExist;
}

function wishlist1() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var productsWishlist = JSON.parse(localStorage.getItem("productsWishlist") || "[]");
  var myWishlist = [];
  for (let i = 0; i < productsWishlist.length; i++) {
    if (productsWishlist[i].idUser === connectedUser.id) {
      myWishlist.push(productsWishlist[i]);
    }
  }


  var wishlistTable = `<table class="table">
  <thead>
      <tr>
          <th>Image</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Actions</th>
          
      </tr>
  </thead>
  <tbody>`;


  for (let i = 0; i < myWishlist.length; i++) {
    var pr = searchById(Number(myWishlist[i].idPr), "products");
    wishlistTable =
      wishlistTable +
      `<tr>
        <td class="thumbnail-img">
             
          <img class="img-fluid" src=${pr.image} alt="" />

        </td>
        <td class="name-pr">

        <a href="#">${pr.productName}</a>

        </td>
       
    </td>
    <td>
        <h5> ${pr.price} DT</h5>
    </td>
    

    <td>
        <button class="btn hvr-hover"onclick="goToReservation(${myWishlist[i].idPr})">Add To Cart</button>
        <button class="btn hvr-hover" onclick="deleteObject(${searchObjectPosition(myWishlist[i].id, "productsWishlist")},'productsWishlist')">Delete</button>
    </td>
    
</tr>`;
  }

  wishlistTable =
    wishlistTable +
    `
</tbody>
</table>`;

  document.getElementById("wishlistTable").innerHTML = wishlistTable;
}


function wishlist2() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var eventsWishlist = JSON.parse(localStorage.getItem("eventsWishlist") || "[]");
  var myWishlist = [];
  for (let i = 0; i < eventsWishlist.length; i++) {
    if (eventsWishlist[i].idUser === connectedUser.id) {
      myWishlist.push(eventsWishlist[i]);
    }
  }


  var wishlistTable = `<table class="table">
  <thead>
      <tr>
          <th>Image</th>
          <th>Event Name</th>
          <th>Price</th>
          <th>Actions</th>
          
      </tr>
  </thead>
  <tbody>`;


  for (let i = 0; i < myWishlist.length; i++) {
    var event = searchById(Number(myWishlist[i].idEvent), "events");
    wishlistTable =
      wishlistTable +
      `<tr>
        <td class="thumbnail-img">
             
          <img class="img-fluid" src=${event.image} alt="" />

        </td>
        <td class="name-pr">

        <a href="#">${event.eventName}</a>

        </td>
       
    </td>
    <td>
        <h5> ${event.eventPrice} DT</h5>
    </td>
    

    <td>
        <button class="btn hvr-hover"onclick="goToEventDetailsPage(${myWishlist[i].idEvent})">Add To Cart</button>
        <button class="btn hvr-hover" onclick="deleteObject(${searchObjectPosition(myWishlist[i].id, "eventsWishlist")},'eventsWishlist')">Delete</button>
    </td>
    
</tr>`;
  }

  wishlistTable =
    wishlistTable +
    `
</tbody>
</table>`;

  document.getElementById("wishlistTable2").innerHTML = wishlistTable;
}


function searchReservation(idEvent, idUser) {
  var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  var objectExist = false;
  for (let i = 0; i < reservations.length; i++) {

    if ((reservations[i].idEvent === idEvent) && (reservations[i].idUser === idUser)) {
      objectExist = true;

    }
  }
  return objectExist;
}


function searchPr(e) {
  var key = e.keyCode;
  if (key == 13) {
    var minPrice = document.getElementById("minPrice").value;
    var maxPrice = document.getElementById("maxPrice").value;

    localStorage.setItem("minPrice", minPrice);
    localStorage.setItem("maxPrice", maxPrice);

    location.replace("result.html");
  }
}

function displayProductsByCategory() {
  var products = JSON.parse(localStorage.getItem("products"));
  var minPrice = localStorage.getItem("minPrice");
  var maxPrice = localStorage.getItem("maxPrice");

  var searchProducts = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].price <= maxPrice && products[i].price >= minPrice) {
      searchProducts.push(products[i]);
    }
  }
  var productTable = ``;
  for (let i = 0; i < searchProducts.length; i++) {

    var productTable =
      productTable +
      `<div class="col-lg-4 col-md-6 col-sm-12">

      <div class="products-single fix">
      <div class="box-img-hover">
      <img class="img-fluid" src=${searchProducts[i].image} alt="" style="width: 373px; height: 280px;">
          
      </div>
      <div class="why-text">
          <h4>${searchProducts[i].productName}</h4>
          <h5>${searchProducts[i].price} DT</h5>
      </div>
      <div>
          <button type="button" class="btn hvr-hover" style="background-color:#8aad1f; color: white; border-radius: 0px; width: 100%; border: 0px;" onclick="goToReservation(${searchProducts[i].id})">Order</button>
      </div>
  </div>
  </div>
       `;
    document.getElementById("result").innerHTML = productTable;
  }
}