//Product Constructor
class Product {
  constructor(name, harga, tahun) {
    this.name = name;
    this.harga = harga;
    this.tahun = tahun;
  }
}

//UI Constructor
class UI {
  //Product template
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <h5><strong>${product.name}</strong></h5>
          <strong >Harga</strong>: Rp ${product.harga}
          <strong class="ml-4">Tahun</strong>: ${product.tahun} 
          <a href="#" class="btn btn-danger ml-5" name="delete">Hapus</a>
        </div>
      </div>
    `;
    productList.appendChild(element);
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.remove();
      return true;
    }
  }

  showMessage(message, cssClass) {
    const msg = document.createElement("div");
    msg.className = `alert alert-${cssClass} mt-2 text-center`;
    msg.appendChild(document.createTextNode(message));

    //Show in the DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#app");

    //Insert message in the UI
    container.insertBefore(msg, app);

    //Remove after 2 seconds
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 1000);
  }
}

//DOM Events
document.getElementById("product-form").addEventListener("submit", e => {
  const name = document.getElementById("product-name").value,
    harga = document.getElementById("product-harga").value,
    tahun = document.getElementById("product-tahun").value;

  //Create a new Object Product
  const product = new Product(name, harga, tahun);

  //Create a new UI
  const ui = new UI();

  //Save product
  ui.addProduct(product);
  ui.resetForm();
  ui.showMessage("Product Berhasil Diinput", "success");

  e.preventDefault();
});

//Delete product
document.getElementById("product-list").addEventListener("click", e => {
  const ui = new UI();
  ui.deleteProduct(e.target);
  if(ui.deleteProduct(e.target)) {
    ui.showMessage("Product Berhasil Dihapus", "danger");
  }
  e.preventDefault();
});
