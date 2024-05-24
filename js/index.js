var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");

var sites = [];

if (localStorage.getItem("sites")) {
  sites = JSON.parse(localStorage.getItem("sites"));
  displayData();
}

function addSite() {
  if (validationData(bookmarkName) && validationData(bookmarkURL)) {
    var site = {
      name: bookmarkName.value,
      url: bookmarkURL.value,
    };

    sites.push(site);

    displayData();

    localStorage.setItem("sites", JSON.stringify(sites));
    clearData();
  }else{
    showAlert()
  }

}

function displayData() {
  var cartona = "";
  for (var i = 0; i < sites.length; i++) {
    cartona += `
  <tr>
              <td>${i + 1}</td>
              <td>${sites[i].name}</td>
              <td>
                <button onclick="openUrl(${i})" class="btn btn-visit" data-index="0">
                  <i class="fa-solid fa-eye pe-2"></i>Visit
                </button>
              </td>
              <td>
                <button onclick="deleteSite(${i})" class="btn btn-delete pe-2" data-index="0">
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </button>
              </td>
            </tr>
  `;
  }

  document.getElementById("tableContent").innerHTML = cartona;
}

function openUrl(i) {
  window.open(`${sites[i].url}`);
}

function deleteSite(i) {
  sites.splice(i, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  displayData();
}

function clearData() {
  bookmarkName.value = null;
  bookmarkURL.value = null;

  bookmarkName.classList.remove("is-valid");
  bookmarkURL.classList.remove("is-valid");
  bookmarkName.classList.remove("is-invalid");
  bookmarkURL.classList.remove("is-invalid");
}

function validationData(element) {
  var inputValue = element.value;

  var regex = {
    bookmarkName: /^[a-zA-Z0-9]{3,}$/,
    bookmarkURL: /^(https:|http:)\/\/(www.)?.{1,}\.(com|gov|edu)(\/)?(.{1,})?$/,
  };

  if (regex[element.id].test(inputValue)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}

document.addEventListener("keydown", function(e){
  if(e.key == "Enter"){
    addSite()
  }
})


function showAlert(){
  document.getElementById("alert-validation").classList.remove("d-none")
}

function hideAlert(){
  document.getElementById("alert-validation").classList.add("d-none")
}