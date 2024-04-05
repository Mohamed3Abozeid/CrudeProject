let addBtn = document.getElementById("add-btn");
let updateBtn = document.getElementById("update-btn");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");
let searchInput = document.getElementById("searchInput");
let row = document.getElementById("row");
let nameEror = document.getElementById("nameEror");
let emailEror = document.getElementById("emailEror");
let phoneEror = document.getElementById("phoneEror");
let indexItem = 0;

let Employers = [];
if (localStorage.getItem("employ") != null) {
  Employers = JSON.parse(localStorage.getItem("employ"));
}

addBtn.addEventListener("click", function () {
  addEmploy();
  localStorage.setItem("employ", JSON.stringify(Employers));
  display();
});

function addEmploy() {
  console.log(phonelValid());

  console.log(nameValid());
  console.log(emailValid());
  if (nameValid() && emailValid() && phonelValid()) {
    var employ = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };
    Employers.push(employ);
    clearInputs();
  }
}

function clearInputs() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
}

function display() {
  var cartona = "";

  for (var i = 0; i < Employers.length; i++) {
    cartona += `  <tr >
    <td>${i + 1}</td>
    <td>${Employers[i].name}</td>
    <td>${Employers[i].email}</td>
    <td>${Employers[i].phone}</</td>
    <td><button class="btn btn-outline-warning" onclick="updateItem(${i})">Update</button></td>
   <td> <button class="btn btn-outline-danger" onclick="deletItem(${i})">Delet</button></td>
    </tr>`;
  }

  row.innerHTML = cartona;
}
display();

function deletItem(index) {
  Employers.splice(index, 1);
  localStorage.setItem("employ", JSON.stringify(Employers));
  display();
}

function updateItem(index) {
  nameInput.value = Employers[index].name;
  emailInput.value = Employers[index].email;
  phoneInput.value = Employers[index].phone;
  console.log(Employers[index]);
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function seachItem() {
  var cartona = "";
  for (var i = 0; i < Employers.length; i++) {
    if (
      Employers[i].name.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      cartona += `  <tr >
      <td>${i + 1}</td>
      <td>${Employers[i].name}</td>
      <td>${Employers[i].email}</td>
      <td>${Employers[i].phone}</</td>
      <td><button class="btn btn-outline-warning" onclick="updateItem(${i})">Update</button></td>
     <td> <button class="btn btn-outline-danger" onclick="deletItem(${i})">Delet</button></td>
      </tr>`;

      row.innerHTML = cartona;
    }
  }
}

function updateItem(index) {
  indexItem = index;
  nameInput.value = Employers[index].name;
  emailInput.value = Employers[index].email;
  phoneInput.value = Employers[index].phone;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}
updateBtn.addEventListener("click", function () {
  if (nameValid() && emailValid() && phonelValid()) {
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    Employers[indexItem].name = nameInput.value;
    Employers[indexItem].email = emailInput.value;
    Employers[indexItem].phone = phoneInput.value;
    localStorage.setItem("employ", JSON.stringify(Employers));
    display();
  }
});

function nameValid() {
  var nameRegex = /^[A-Z][a-z]{3,10}$/;
  if (nameRegex.test(nameInput.value)) {
    nameInput.classList.remove("is-invalid");
    nameInput.classList.add("is-valid");
    nameEror.classList.add("d-none");
    nameEror.classList.remove("d-block");
    return true;
  } else {
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    nameEror.classList.add("d-block");
    nameEror.classList.remove("d-none");
    return false;
  }
}
function emailValid() {
  var emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(emailInput.value)) {
    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
    emailEror.classList.add("d-none");
    emailEror.classList.remove("d-block");
    return true;
  } else {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
    emailEror.classList.add("d-block");
    emailEror.classList.remove("d-none");
    return false;
  }
}
function phonelValid() {
  var phoneRegex = /^01[0-25][0-9]{8}$/;
  if (phoneRegex.test(phoneInput.value)) {
    phoneInput.classList.remove("is-invalid");
    phoneInput.classList.add("is-valid");
    phoneEror.classList.add("d-none");
    phoneEror.classList.remove("d-block");
    return true;
  } else {
    phoneInput.classList.add("is-invalid");
    phoneInput.classList.remove("is-valid");
    phoneEror.classList.add("d-block");
    phoneEror.classList.remove("d-none");
    return false;
  }
}
