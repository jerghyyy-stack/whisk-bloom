const deliveryFee = 5;

const products = [
  { id: 'oreo-cheesecake', category: 'Cheesecakes', name: 'Oreo Cheesecake', price: 7.90, tag: 'Best Seller', desc: 'Cookies and cream cheesecake slice with Oreo crumble and a rich cookie base.', img: './01_oreo_cheesecake.jpg' },
  { id: 'matcha-cheesecake', category: 'Cheesecakes', name: 'Matcha Cheesecake', price: 7.90, tag: 'Premium Matcha', desc: 'Smooth matcha cheesecake with a soft earthy finish and light biscuit base.', img: './02_matcha_cheesecake.jpg' },
  { id: 'basque-cheesecake', category: 'Cheesecakes', name: 'Basque Cheesecake', price: 7.90, tag: 'Classic', desc: 'Creamy burnt Basque cheesecake with a caramelised top.', img: './03_basque_cheesecake.jpg' },

  { id: 'oreo-dessert-cup', category: 'Dessert Cups', name: 'Oreo Dessert Cup', price: 6.50, tag: 'Popular', desc: 'Layered Oreo cream dessert cup with cookie crumble.', img: './04_oreo_dessert_cup.jpg' },
  { id: 'tiramisu-dessert-cup', category: 'Dessert Cups', name: 'Tiramisu Dessert Cup', price: 6.50, tag: 'Coffee Cream', desc: 'Creamy tiramisu-inspired dessert cup with cocoa and biscuit layers.', img: './05_tiramisu_dessert_cup.jpg' },
  { id: 'mango-dessert-cup', category: 'Dessert Cups', name: 'Mango Dessert Cup', price: 6.50, tag: 'Fruity', desc: 'Bright mango dessert cup with creamy layers and mango topping.', img: './06_mango_dessert_cup.jpg' },
  { id: 'strawberry-dessert-cup', category: 'Dessert Cups', name: 'Strawberry Dessert Cup', price: 6.50, tag: 'Fruity', desc: 'Strawberry dessert cup with soft cream and berry topping.', img: './07_strawberry_dessert_cup.jpg' },

  { id: 'signature-jasmine-fruit-tea', category: 'Drinks', name: 'Signature Jasmine Fruit Tea', price: 5.50, tag: 'Signature', desc: 'Refreshing jasmine fruit tea with a bright tropical finish.', img: './08_signature_jasmine_fruit_tea.jpg' },
  { id: 'strawberry-jasmine-tea', category: 'Drinks', name: 'Strawberry Jasmine Tea', price: 5.80, tag: 'Refreshing', desc: 'Strawberry jasmine tea with fruity sweetness and floral tea notes.', img: './09_strawberry_jasmine_tea.jpg' },
  { id: 'peach-jasmine-tea', category: 'Drinks', name: 'Peach Jasmine Tea', price: 5.80, tag: 'Refreshing', desc: 'Peach jasmine tea with a light, sweet and refreshing profile.', img: './10_peach_jasmine_tea.jpg' },
  { id: 'yuzu-jasmine-tea', category: 'Drinks', name: 'Yuzu Jasmine Tea', price: 5.80, tag: 'Citrus', desc: 'Yuzu jasmine tea with a clean citrus finish.', img: './11_yuzu_jasmine_tea.jpg' },
  { id: 'matcha-latte', category: 'Drinks', name: 'Matcha Latte', price: 5.80, tag: 'Latte', desc: 'Smooth matcha latte with a creamy finish.', img: './12_matcha_latte.jpg' },
  { id: 'strawberry-matcha-latte', category: 'Drinks', name: 'Strawberry Matcha Latte', price: 6.20, tag: 'Latte', desc: 'Layered strawberry matcha latte with a creamy fruit base.', img: './13_strawberry_matcha_latte.jpg' }
];

let cart = JSON.parse(localStorage.getItem('wb-cart') || '{}');

const money = n => `$${n.toFixed(2)}`;
const count = () => Object.values(cart).reduce((a,b)=>a+b,0);
const subtotal = () => products.reduce((sum,p)=>sum + (cart[p.id] || 0) * p.price, 0);

function renderProducts(){
  const grid = document.getElementById('productGrid');
  const groups = ['Cheesecakes', 'Dessert Cups', 'Drinks'];
  grid.innerHTML = groups.map(group => `
    <div class="menu-category">
      <h3>${group}</h3>
      <div class="category-grid">
        ${products.filter(p => p.category === group).map(p => `
          <article class="product-card">
            <img src="${p.img}" alt="${p.name}" loading="lazy" />
            <div class="product-body">
              <span class="tag">${p.tag}</span>
              <h3>${p.name}</h3>
              <p>${p.desc}</p>
              <div class="price-row"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}">Add to Cart</button></div>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
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
  const msg = `Hi Whisk & Bloom, I would like to place an order.%0A%0AItems:%0A${items}%0A%0ASubtotal: ${money(subtotal())}%0ADelivery: $5.00%0ATotal: ${money(subtotal()+deliveryFee)}%0A%0AName: ${data.get('name')}%0APhone: ${data.get('phone')}%0AAddress: ${data.get('address')}%0ADate: ${data.get('date')}%0ATime: ${data.get('time')}%0ARemarks: ${data.get('remarks') || '-'}%0A%0APayment: PayNow only, pending verification`;
  window.open(`https://wa.me/6588928698?text=${msg}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('heroImage');
  hero.src = './14_hero_oreo_cheesecake.jpg';
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