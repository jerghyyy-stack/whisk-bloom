const deliveryFee = 5;
let activeProductId = null;
let modalQty = 1;

const products = [
  { id: 'burnt-cheesecake-milk', category: 'Signature Cheesecake Milk Series', name: 'Burnt Cheesecake Milk', price: 8.90, tag: 'Best Seller', desc: 'Creamy cheesecake milk with caramelised cheesecake crumbles.', img: './01_burnt_cheesecake_milk.jpg' },
  { id: 'oreo-cheesecake-milk', category: 'Signature Cheesecake Milk Series', name: 'Oreo Cheesecake Milk', price: 8.90, tag: 'Signature', desc: 'Cheesecake milk blended with Oreo crumbs and cookie bits.', img: './02_oreo_cheesecake_milk.jpg' },
  { id: 'matcha-cheesecake-milk', category: 'Signature Cheesecake Milk Series', name: 'Matcha Cheesecake Milk', price: 8.90, tag: 'Matcha', desc: 'Smooth matcha cheesecake milk with biscuit crumble.', img: './03_matcha_cheesecake_milk.jpg' },
  { id: 'tiramisu-cheesecake-milk', category: 'Signature Cheesecake Milk Series', name: 'Tiramisu Cheesecake Milk', price: 9.20, tag: 'Coffee Cream', desc: 'Coffee-infused cheesecake milk with cocoa powder and ladyfinger crumbs.', img: './04_tiramisu_cheesecake_milk.jpg' },
  { id: 'strawberry-cheesecake-milk', category: 'Signature Cheesecake Milk Series', name: 'Strawberry Cheesecake Milk', price: 8.90, tag: 'New', desc: 'Sweet strawberry cheesecake milk with real strawberry puree and biscuit crumble.', img: './05_strawberry_cheesecake_milk.jpg' },

  { id: 'galaxy-lychee-sparkling', category: 'Magic Sparkling Series', name: 'Galaxy Lychee Sparkling', price: 7.90, tag: 'Shimmer', desc: 'Lychee, grape soda and edible shimmer. Swirl before drinking.', img: './06_galaxy_lychee_sparkling.jpg' },
  { id: 'aurora-yuzu-soda', category: 'Magic Sparkling Series', name: 'Aurora Yuzu Soda', price: 7.90, tag: 'Yuzu', desc: 'Yuzu, lemon soda and edible shimmer. Bright, citrusy and refreshing.', img: './07_aurora_yuzu_soda.jpg' },
  { id: 'pink-stardust-lemonade', category: 'Magic Sparkling Series', name: 'Pink Stardust Lemonade', price: 7.90, tag: 'Sparkling', desc: 'Strawberry, lemon soda and edible shimmer for a magical pink sparkle.', img: './08_pink_stardust_lemonade.jpg' },
  { id: 'ocean-breeze-soda', category: 'Magic Sparkling Series', name: 'Ocean Breeze Soda', price: 7.90, tag: 'Sparkling', desc: 'Pear, lemon soda and edible shimmer with an ocean-blue finish.', img: './09_ocean_breeze_soda.jpg' },

  { id: 'sea-salt-cream-fruit-tea', category: 'Refreshing Series', name: 'Sea Salt Cream Fruit Tea', price: 7.90, tag: 'Fruit Tea', desc: 'Peach jasmine tea topped with our signature sea salt cream.', img: './10_sea_salt_cream_fruit_tea.jpg' },
  { id: 'dessert-in-a-cup-oreo', category: 'Dessert Series', name: 'Dessert in a Cup (Oreo)', price: 9.20, tag: 'Dessert Drink', desc: 'Milk, chocolate, Oreo crumbs, whipped cream and chocolate drizzle.', img: './11_dessert_in_a_cup_oreo.jpg' }
];

let cart = JSON.parse(localStorage.getItem('wb-cart') || '{}');

const money = n => `$${n.toFixed(2)}`;
const count = () => Object.values(cart).reduce((a,b)=>a+b,0);
const subtotal = () => products.reduce((sum,p)=>sum + (cart[p.id] || 0) * p.price, 0);
const getProduct = id => products.find(p => p.id === id);

function renderProducts(){
  const grid = document.getElementById('productGrid');
  const groups = ['Signature Cheesecake Milk Series', 'Magic Sparkling Series', 'Refreshing Series', 'Dessert Series'];
  grid.innerHTML = groups.map(group => `
    <div class="menu-category">
      <h3>${group}</h3>
      <div class="category-grid ${group.includes('Cheesecake') ? 'featured-grid' : ''}">
        ${products.filter(p => p.category === group).map(p => `
          <article class="product-card" data-product="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}">
            <div class="product-photo"><img src="${p.img}" alt="${p.name}" loading="lazy" /></div>
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

  document.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', e => {
    e.stopPropagation();
    add(btn.dataset.add);
  }));

  document.querySelectorAll('[data-product]').forEach(card => {
    card.addEventListener('click', () => openProduct(card.dataset.product));
    card.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openProduct(card.dataset.product);
      }
    });
  });
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

function add(id, amount = 1){ cart[id] = (cart[id] || 0) + amount; renderCart(); }
function remove(id){ if(!cart[id]) return; cart[id]--; if(cart[id] <= 0) delete cart[id]; renderCart(); }
function clearCart(){ cart = {}; renderCart(); }

function createProductModal(){
  const modal = document.createElement('div');
  modal.className = 'product-modal';
  modal.id = 'productModal';
  modal.innerHTML = `
    <div class="product-modal-bg" data-close-modal></div>
    <div class="product-modal-card">
      <button class="modal-close" data-close-modal aria-label="Close product details">×</button>
      <div class="modal-image-wrap"><img id="modalProductImage" alt="" /></div>
      <div class="modal-copy">
        <span class="tag" id="modalProductTag"></span>
        <h2 id="modalProductName"></h2>
        <strong class="modal-price" id="modalProductPrice"></strong>
        <p id="modalProductDesc"></p>
        <div class="modal-qty-row">
          <span>Quantity</span>
          <div class="modal-qty"><button id="modalQtyMinus">−</button><strong id="modalQtyValue">1</strong><button id="modalQtyPlus">+</button></div>
        </div>
        <button class="btn primary full" id="modalAddCart">Add to Cart</button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeProduct));
  document.getElementById('modalQtyMinus').addEventListener('click', () => { modalQty = Math.max(1, modalQty - 1); updateModalQty(); });
  document.getElementById('modalQtyPlus').addEventListener('click', () => { modalQty += 1; updateModalQty(); });
  document.getElementById('modalAddCart').addEventListener('click', () => {
    if(activeProductId) add(activeProductId, modalQty);
    closeProduct();
  });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeProduct(); });
}

function updateModalQty(){
  const qty = document.getElementById('modalQtyValue');
  if(qty) qty.textContent = modalQty;
}

function openProduct(id){
  const product = getProduct(id);
  if(!product) return;
  activeProductId = id;
  modalQty = 1;
  document.getElementById('modalProductImage').src = product.img;
  document.getElementById('modalProductImage').alt = product.name;
  document.getElementById('modalProductTag').textContent = product.tag;
  document.getElementById('modalProductName').textContent = product.name;
  document.getElementById('modalProductPrice').textContent = money(product.price);
  document.getElementById('modalProductDesc').textContent = product.desc;
  updateModalQty();
  document.getElementById('productModal').classList.add('open');
  document.body.classList.add('modal-open');
}

function closeProduct(){
  const modal = document.getElementById('productModal');
  if(modal) modal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

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
  hero.src = './hero_dessert_drinks.jpg';
  createProductModal();
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