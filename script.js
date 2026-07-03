const deliveryFee = 5;

const products = [
  {
    id: 'durian',
    name: 'Durian Cheese Pie',
    price: 11.90,
    tag: 'Best Seller',
    desc: 'Creamy durian filling with a soft cheese pull and thin handmade crust.',
    img: './assets/durian.jpg'
  },
  {
    id: 'matcha',
    name: 'Matcha Cheese Pie',
    price: 13.90,
    tag: 'Premium Matcha',
    desc: 'Earthy matcha filling tucked inside the same thin crust with rich cream cheese.',
    img: './assets/matcha.jpg'
  },
  {
    id: 'seasalt',
    name: 'Sea Salt Cheese Pie',
    price: 9.90,
    tag: 'Classic',
    desc: 'Creamy white cheese filling with a light savoury sea-salt finish.',
    img: './assets/seasalt.jpg'
  },
  {
    id: 'oreo',
    name: 'Oreo Cheesecake',
    price: 7.90,
    tag: 'Per Slice',
    desc: 'No-bake Oreo cheesecake slice with Oreo crumbs and a thick cookie base.',
    img: './assets/oreo.jpg'
  },
  {
    id: 'fruittea',
    name: 'Signature Fruit Tea',
    price: 5.90,
    tag: 'Refreshing',
    desc: 'A bright, refreshing tea pairing for the cheese pies and cheesecake.',
    img: './assets/fruittea.jpg'
  }
];

let cart = JSON.parse(localStorage.getItem('wb-cart') || '{}');

const money = n => `$${n.toFixed(2)}`;
const count = () => Object.values(cart).reduce((a,b)=>a+b,0);
const subtotal = () => products.reduce((sum,p)=>sum + (cart[p.id] || 0) * p.price, 0);

function renderProducts(){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = products.map(p => `
    <article class="product-card">
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="product-body">
        <span class="tag">${p.tag}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price-row"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}">Add to Cart</button></div>
      </div>
    </article>
  `).join('');
  document.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', () => add(btn.dataset.add)));
}

function renderCart(){
  localStorage.setItem('wb-cart', JSON.stringify(cart));
  document.getElementById('cartCount').textContent = count();
  const lines = products.filter(p => cart[p.id]).map(p => `
    <div class="cart-line">
      <div><strong>${p.name}</strong><br><small>${money(p.price)} × ${cart[p.id]}</small></div>
      <div class="qty"><button data-dec="${p.id}">−</button><span>${cart[p.id]}</span><button data-inc="${p.id}">+</button></div>
    </div>`).join('') || 'Your cart is empty.';
  ['Desktop','Mobile'].forEach(suffix => {
    const el = document.getElementById(`cartItems${suffix}`);
    el.innerHTML = lines;
    el.classList.toggle('empty', count() === 0);
    document.getElementById(`subtotal${suffix}`).textContent = money(subtotal());
    document.getElementById(`total${suffix}`).textContent = money(count() ? subtotal() + deliveryFee : 0);
  });
  document.querySelectorAll('[data-inc]').forEach(btn => btn.addEventListener('click', () => add(btn.dataset.inc)));
  document.querySelectorAll('[data-dec]').forEach(btn => btn.addEventListener('click', () => remove(btn.dataset.dec)));
}

function add(id){ cart[id] = (cart[id] || 0) + 1; renderCart(); }
function remove(id){ if(!cart[id]) return; cart[id]--; if(cart[id] <= 0) delete cart[id]; renderCart(); }
function clearCart(){ cart = {}; renderCart(); }

function submitOrder(e){
  e.preventDefault();
  if(count() === 0){ alert('Please add at least one item to cart first.'); return; }
  const data = new FormData(e.currentTarget);
  const items = products.filter(p => cart[p.id]).map(p => `${cart[p.id]} x ${p.name} (${money(p.price)})`).join('%0A');
  const msg = `Hi Whisk & Bloom, I would like to place an order.%0A%0AItems:%0A${items}%0A%0ASubtotal: ${money(subtotal())}%0ADelivery: $5.00%0ATotal: ${money(subtotal()+deliveryFee)}%0A%0AName: ${data.get('name')}%0APhone: ${data.get('phone')}%0AAddress: ${data.get('address')}%0ADate: ${data.get('date')}%0ATime: ${data.get('time')}%0ARemarks: ${data.get('remarks') || '-'}%0A%0APayment: PayNow pending verification`;
  window.open(`https://wa.me/6588928698?text=${msg}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('heroImage');
  hero.src = './assets/hero.jpg';
  renderProducts();
  renderCart();
  document.getElementById('clearCartDesktop').addEventListener('click', clearCart);
  document.getElementById('orderForm').addEventListener('submit', submitOrder);
  const mobileCart = document.getElementById('mobileCart');
  document.getElementById('openCartMobile').addEventListener('click', () => mobileCart.classList.add('open'));
  document.getElementById('closeCartMobile').addEventListener('click', () => mobileCart.classList.remove('open'));
  document.getElementById('checkoutMobile').addEventListener('click', () => mobileCart.classList.remove('open'));
  mobileCart.addEventListener('click', e => { if(e.target === mobileCart) mobileCart.classList.remove('open'); });
});
