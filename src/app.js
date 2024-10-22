document.addEventListener("alpine:init", () => {
            const showItemDetails = (item) => {
                    const modal = document.getElementById("items-detail-modal");
                    if (!modal) {
                        console.error("Modal element not found");
                        return;
                    }

                    let modalContent = modal.querySelector(".modal-content");
                    if (!modalContent) {
                        console.warn("Modal content element not found, creating one");
                        modalContent = document.createElement("div");
                        modalContent.className = "modal-content";
                        modal.querySelector(".modal-container").appendChild(modalContent);
                    }

                    modalContent.innerHTML = `
<img src="img/menu/${item.img}" alt=""/>
<img src="img/menu2/${item.img}" alt=""/>
<img src="img/menu3/${item.img}" alt=""/>
<div class="product-content">
<h3>${item.name}</h3>
<p>${item.description}</p>
<div class="product-stars">
  ${Array(5).fill().map((_, i) => `
    <svg width="24" height="24" fill="${i < 5 ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <use href="img/feather-sprite.svg#star" />
    </svg>
  `).join("")}
</div>
<div class="menu-card-price">${rupiah(item.price)}</div>
<a href="#" class="add-to-cart-button">
  <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <use href="img/feather-sprite.svg#shopping-cart" />
  </svg>
  <span>Add to cart</span>
</a>
</div>
`;

modal.style.display = "flex";

// Add event listener for Add to Cart button
const addToCartButton = modalContent.querySelector('.add-to-cart-button');
addToCartButton.addEventListener('click', (e) => {
e.preventDefault();
Alpine.store('cart').add(item);
});
};


Alpine.data("menu", () => ({
items: [
{ id: 1, name: "Midnight", img: "1.jpg", price: 45000, description: "a" },
{ id: 2, name: "Cocoa", img: "2.jpg", price: 19000, description: "Minuman cokelat lembut yang menghangatkan hati dan pikiran." },
{ id: 3, name: "Americano", img: "3.jpg", price: 20000, description: "Espresso klasik yang diencerkan dengan air panas, memberikan cita rasa kopi yang kuat namun ringan." },
{ id: 4, name: "Cap", img: "4.jpg", price: 18000, description: "Perpaduan sempurna antara espresso, susu steamed, dan foam susu yang lembut." },
{ id: 5, name: "Caramel", img: "5.jpg", price: 25000, description: "Latte manis dengan sentuhan karamel yang memanjakan lidah." },
{ id: 6, name: "Mocha", img: "6.jpg", price: 40000, description: "Kombinasi harmonis antara espresso, cokelat, dan susu untuk pencinta kopi dan cokelat." },
],
showItemDetails
}));

Alpine.data("menu2", () => ({
items: [
{ id: 7, name: "Aqua", img: "7.jpg", price: 15000, description: "Teh hijau segar dengan antioksidan tinggi untuk menyegarkan hari Anda." },
{ id: 8, name: "Coca Cola", img: "8.jpg", price: 17000, description: "Teh hitam dengan sentuhan lemon yang menyegarkan dan menyehatkan." },
{ id: 9, name: "Fanta", img: "9.jpg", price: 20000, description: "Teh susu creamy yang lembut dan menenangkan." },
{ id: 10, name: "Teh Pucuk", img: "10.jpg", price: 25000, description: "Teh susu dengan tambahan boba yang kenyal dan menyenangkan." },
{ id: 11, name: "Pocari Sweat", img: "11.jpg", price: 28000, description: "Minuman berbasis matcha yang creamy dengan cita rasa unik." },
{ id: 12, name: "Thai Tea", img: "12.jpg", price: 22000, description: "Teh Thailand yang khas dengan rasa manis dan creamy." },
],
showItemDetails
}));

Alpine.data("menu3", () => ({
  items: [
      { id: 13, name: "Bayam", img: "13.jpg", price: 10000, description: "Sayuran hijau segar kaya akan zat besi dan nutrisi penting." },
      { id: 14, name: "Wortel", img: "14.jpg", price: 12000, description: "Wortel segar kaya vitamin A untuk kesehatan mata dan kulit." },
      { id: 15, name: "Brokoli", img: "15.jpg", price: 15000, description: "Sayuran hijau kaya serat dan antioksidan untuk kesehatan optimal." },
      { id: 16, name: "Kale", img: "16.jpg", price: 18000, description: "Superfood kaya nutrisi dengan manfaat kesehatan yang luar biasa." },
      { id: 17, name: "Kangkung", img: "17.jpg", price: 8000, description: "Sayuran hijau lokal yang lezat dan kaya akan zat besi." },
      { id: 18, name: "Sawi", img: "18.jpg", price: 9000, description: "Sayuran hijau segar dengan rasa ringan dan kaya vitamin." },
  ],
  showItemDetails
}));
Alpine.store("cart", {
items: [],
total: 0,
quantity: 0,
add(newItem) {
const cartItem = this.items.find((item) => item.id === newItem.id);

if (!cartItem) {
this.items.push({...newItem, quantity: 1, total: newItem.price });
this.quantity++;
this.total += newItem.price;
} else {
this.items = this.items.map((item) => {
  if (item.id !== newItem.id) {
      return item;
  } else {
      item.quantity++;
      item.total = item.price * item.quantity;
      this.quantity++;
      this.total += item.price;
      return item;
  }
});
}
},
remove(id) {
const cartItem = this.items.find((item) => item.id === id);

if (cartItem.quantity > 1) {
this.items = this.items.map((item) => {
  if (item.id !== id) {
      return item;
  } else {
      item.quantity--;
      item.total = item.price * item.quantity;
      this.quantity--;
      this.total -= item.price;
      return item;
  }
});
} else if (cartItem.quantity === 1) {
this.items = this.items.filter((item) => item.id !== id);
this.quantity--;
this.total -= cartItem.price;
}
},
});
});

document.addEventListener('DOMContentLoaded', () => {
const itemsDetailButtons = document.querySelectorAll('.items-detail-button');
itemsDetailButtons.forEach(button => {
button.addEventListener('click', (e) => {
e.preventDefault();
const item = JSON.parse(button.getAttribute('data-item'));
showItemDetails(item);
});
});
});

// Form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function() {
let allFieldsFilled = true;
for (let i = 0; i < form.elements.length; i++) {
if (
  form.elements[i].type !== "hidden" &&
  form.elements[i].value.length === 0
) {
  allFieldsFilled = false;
  break;
}
}

if (allFieldsFilled) {
checkoutButton.disabled = false;
checkoutButton.classList.remove("disabled");
} else {
checkoutButton.disabled = true;
checkoutButton.classList.add("disabled");
}
});

// Kirim data ketika tombol checkout di klik
checkoutButton.addEventListener("click", function(e) {
e.preventDefault();
const formData = new FormData(form);
const data = new URLSearchParams(formData);
const objData = Object.fromEntries(data);

const message = formatMessage(objData);

// Buka WhatsApp dengan pesan
window.open(
"https://api.whatsapp.com/send?phone=62895385890629&text=" +
encodeURIComponent(message),
"_blank"
);
});

// Format pesan WA
const formatMessage = (obj) => {
return `Data Customer 
Nama: ${obj.name}
Email: ${obj.email}
Alamat: ${obj.alamat}
No Hp: ${obj.phone}
Data Pesanan:
${JSON.parse(obj.items)
.map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})`)
.join("")}
TOTAL: ${rupiah(obj.total)}
Terima Kasih`;
};

// Konversi ke rupiah
const rupiah = (number) => {
return new Intl.NumberFormat("id-ID", {
style: "currency",
currency: "IDR",
minimumFractionDigits: 0,
}).format(number);
};

// Tambahkan event listener untuk tombol Kirim Pesan di form kontak
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah form dari submit default

  var nama = document.getElementById("nama").value;  // Ambil nama dari input
  var email = document.getElementById("email").value;
  var pesan = document.getElementById("pesan").value;

  var subject = "Pesan Kontak dari " + nama;
  var body = `Nama: ${nama}%0AEmail: ${email}%0APesan: ${pesan}%0A%0ATerima Kasih`;

  var mailtoUrl = `mailto:eatharasya@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.open(mailtoUrl, "_blank");
});