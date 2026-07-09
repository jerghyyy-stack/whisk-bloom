const deliveryFee = 5;
let activeProductId = null;
let modalQty = 1;

const imagePath = file => `./images/${file}`;

const products = [
  { id: 'matcha-cream', category: 'Cream Top Series', name: 'Matcha Cream', price: 8.90, tag: 'Signature', desc: 'Earthy matcha layered with fresh milk and finished with AVENN house cream.', image: imagePath('matcha-cream.png') },
  { id: 'strawberry-cream', category: 'Cream Top Series', name: 'Strawberry Cream', price: 8.50, tag: 'Soft & Fruity', desc: 'Strawberry milk layered with silky house cream for a light dessert-drink feel.', image: imagePath('strawberry-cream.png') },
  { id: 'black-sesame-cream', category: 'Cream Top Series', name: 'Black Sesame Cream', price: 8.90, tag: 'Nutty', desc: 'Roasted black sesame milk with a smooth cream top and deep toasted finish.', image: imagePath('black-sesame-cream.png') },

  { id: 'creme-brulee-original', category: 'Crème Brûlée Series', name: 'Original Crème Brûlée Milk', price: 8.90, tag: 'Caramel Custard', desc: 'Creamy milk with caramel custard notes, house cream and brûlée crumble.', image: imagePath('creme-brulee-original.png') },
  { id: 'creme-brulee-matcha', category: 'Crème Brûlée Series', name: 'Crème Brûlée Matcha', price: 9.50, tag: 'Premium', desc: 'Matcha milk finished with caramel cream and a brûlée-inspired crunch.', image: imagePath('creme-brulee-matcha.png') },
  { id: 'creme-brulee-chocolate', category: 'Crème Brûlée Series', name: 'Crème Brûlée Chocolate', price: 9.20, tag: 'Indulgent', desc: 'Chocolate milk with caramel cream, cocoa notes and crunchy brûlée topping.', image: imagePath('creme-brulee-chocolate.png') },

  { id: 'oreo-cream-milk', category: 'Cookie Series', name: 'Oreo Cream Milk', price: 8.90, tag: 'Best Seller', desc: 'Cookies-and-cream milk topped with house cream and generous Oreo crumble.', image: imagePath('oreo-cream-milk.png') },
  { id: 'biscoff-cream-milk', category: 'Cookie Series', name: 'Biscoff Cream Milk', price: 9.20, tag: 'Cookie Butter', desc: 'Caramel biscuit milk with smooth cream and spiced cookie crumble.', image: imagePath('biscoff-cream-milk.png') },
  { id: 'chocolate-cookie-cream', category: 'Cookie Series', name: 'Chocolate Cookie Cream', price: 8.90, tag: 'Chocolate', desc: 'Chocolate cookie milk with cream top and crunchy cookie bits.', image: imagePath('chocolate-cookie-cream.png') },

  { id: 'andes-mint-cream-milk', category: 'Mint Collection', name: 'Andes Mint Cream Milk', price: 9.80, tag: 'New', desc: 'Fresh milk with melted chocolate mint, house cream, crushed mint chocolate pieces, cocoa dust and a touch of chocolate sauce.', image: imagePath('andes-mint-cream-milk.png') },
  { id: 'mint-chocolate-cookie-cream', category: 'Mint Collection', name: 'Mint Chocolate Cookie Cream', price: 9.80, tag: 'Cookie Mint', desc: 'A grown-up cookies-and-cream drink with Oreo crumble, chocolate mint pieces, thick cream and chocolate drizzle.', image: imagePath('mint-chocolate-cookie-cream.png') },
  { id: 'midnight-mint', category: 'Mint Collection', name: 'Midnight Mint', price: 9.80, tag: 'Featured', desc: 'Rich chocolate mint milk layered with silky house cream, dark chocolate drizzle and chocolate mint shards.', image: imagePath('midnight-mint.png') },

  { id: 'peach-cream-soda', category: 'Dessert Cream Soda', name: 'Peach Cream Soda', price: 8.50, tag: 'Refreshing', desc: 'White peach soda topped with light cream for a fizzy dessert-style drink.', image: imagePath('peach-cream-soda.png') },
  { id: 'yuzu-cream-soda', category: 'Dessert Cream Soda', name: 'Yuzu Cream Soda', price: 8.50, tag: 'Citrus', desc: 'Japanese yuzu soda softened with a smooth cream cap.', image: imagePath('yuzu-cream-soda.png') },
  { id: 'strawberry-cream-soda', category: 'Dessert Cream Soda', name: 'Strawberry Cream Soda', price: 8.50, tag: 'Bright', desc: 'Strawberry sparkling soda with cream for a pretty, delivery-friendly treat.', image: imagePath('strawberry-cream-soda.png') },
  { id: 'mango-cream-soda', category: 'Dessert Cream Soda', name: 'Mango Cream Soda', price: 8.50, tag: 'Tropical', desc: 'Mango sparkling soda with creamy foam, mango cubes and a sunny tropical finish.', image: imagePath('mango-cream-soda.png') },

  { id: 'white-peach-oolong', category: 'Premium Fruit Tea', name: 'White Peach Oolong', price: 7.50, tag: 'Tea', desc: 'Oolong tea with white peach notes and a clean floral finish.', image: imagePath('white-peach-oolong.png') },
  { id: 'lychee-jasmine', category: 'Premium Fruit Tea', name: 'Lychee Jasmine', price: 7.50, tag: 'Floral', desc: 'Light jasmine tea with lychee sweetness and a clean finish.', image: imagePath('lychee-jasmine.png') },
  { id: 'mango-passion', category: 'Premium Fruit Tea', name: 'Mango Passion', price: 7.80, tag: 'Tropical', desc: 'Mango fruit tea lifted with passionfruit brightness and juicy tropical notes.', image: imagePath('mango-passion.png') },
  { id: 'yuzu-jasmine', category: 'Premium Fruit Tea', name: 'Yuzu Jasmine', price: 7.50, tag: 'Citrus', desc: 'Jasmine tea with bright yuzu citrus, made for customers who prefer non-dairy drinks.', image: imagePath('yuzu-jasmine.png') },

  { id: 'galaxy-lychee', category: 'Seasonal Magic Potion', name: 'Galaxy Lychee', price: 7.90, tag: 'Limited', desc: 'Lychee sparkling drink with edible shimmer. Swirl before drinking for the effect.', image: imagePath('galaxy-lychee.png') },
  { id: 'pink-stardust', category: 'Seasonal Magic Potion', name: 'Pink Stardust', price: 7.90, tag: 'Sparkle', desc: 'Pink sparkling drink with lychee, peach notes and edible shimmer for seasonal launches.', image: imagePath('pink-stardust.png') },

  { id: 'oreo-cheesecake-slice', category: 'Desserts', name: 'Oreo Cheesecake Slice', price: 7.90, tag: 'Dessert', desc: 'Creamy Oreo cheesecake with cookie crumble and a rich chocolate cookie base.', image: imagePath('oreo-cheesecake.png') },
  { id: 'strawberry-matcha-cheesecake-slice', category: 'Desserts', name: 'Strawberry Matcha Cheesecake Slice', price: 7.90, tag: 'Slice', desc: 'Creamy matcha cheesecake on a buttery biscuit base, topped with fresh strawberries.', image: imagePath('strawberry-matcha-cheesecake.png') },
  { id: 'strawberry-matcha-cheesecake-whole', category: 'Desserts', name: 'Strawberry Matcha Cheesecake Whole Cake', price: 68.00, tag: 'Whole Cake', desc: 'Whole strawberry matcha cheesecake, perfect for gifting, gatherings and celebrations.', image: imagePath('strawberry-matcha-cheesecake.png') }
];

let cart = JSON.parse(localStorage.getItem('avenn-cart') || '{}');

const money = n => `$${n.toFixed(2)}`;
const count = () => Object.values(cart).reduce((a,b)=>a+b,0);
const subtotal = () => products.reduce((sum,p)=>sum + (cart[p.id] || 0) * p.price, 0);
const getProduct = id => products.find(p => p.id === id);
const groups = ['Cream Top Series', 'Crème Brûlée Series', 'Cookie Series', 'Mint Collection', 'Dessert Cream Soda', 'Premium Fruit Tea', 'Seasonal Magic Potion', 'Desserts'];

function imageTag(product){
  return `<img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.closest('.product-photo, .modal-image-wrap').classList.add('missing-image'); this.style.display='none';" />`;
}

function renderProducts(){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = groups.map(group => `
    <div class="menu-category">
      <div class="category-title"><h3>${group}</h3><span>${products.filter(p => p.category === group).length} items</span></div>
      <div class="category-grid">
        ${products.filter(p => p.category === group).map(p => `
          <article class="product-card" data-product="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}">
            <div class="product-photo">${imageTag(p)}<span class="missing-label">Upload ${p.image.replace('./images/', '')}</span></div>
            <div class="product-body">
              <span class="tag">${p.tag}</span>
              <h3>${p.name}</h3>
              <p>${p.desc}</p>
              <div class="price-row"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}">Add</button></div>
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
  localStorage.setItem('avenn-cart', JSON.stringify(cart));
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
      <div class="modal-image-wrap" id="modalProductVisual"></div>
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
  document.getElementById('modalProductVisual').innerHTML = `${imageTag(product)}<span class="missing-label">Upload ${product.image.replace('./images/', '')}</span>`;
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
  const msg = `Hi AVENN, I would like to place an order.%0A%0AItems:%0A${items}%0A%0ASubtotal: ${money(subtotal())}%0ADelivery: $5.00%0ATotal: ${money(subtotal()+deliveryFee)}%0A%0AName: ${data.get('name')}%0APhone: ${data.get('phone')}%0AAddress: ${data.get('address')}%0ADate: ${data.get('date')}%0ATime: ${data.get('time')}%0ARemarks: ${data.get('remarks') || '-'}%0A%0APayment: PayNow only, pending verification`;
  window.open(`https://wa.me/6588928698?text=${msg}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
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
