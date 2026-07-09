const deliveryFee = 5;
let activeProductId = null;
let modalQty = 1;

const products = [
  { id: 'matcha-cream', category: 'Cream Top Series', name: 'Matcha Cream', price: 8.90, tag: 'Signature', desc: 'Earthy matcha layered with fresh milk and finished with AVENN house cream.', img: './12_matcha_latte.jpg' },
  { id: 'black-sesame-cream', category: 'Cream Top Series', name: 'Black Sesame Cream', price: 8.90, tag: 'Nutty', desc: 'Roasted black sesame milk with a smooth cream top and deep toasted finish.', img: './13_strawberry_matcha_latte.jpg' },
  { id: 'strawberry-cream', category: 'Cream Top Series', name: 'Strawberry Cream', price: 8.50, tag: 'Soft & Fruity', desc: 'Strawberry milk layered with silky house cream for a light dessert-drink feel.', img: './09_strawberry_jasmine_tea.jpg' },

  { id: 'brulee-milk', category: 'Crème Brûlée Series', name: 'Crème Brûlée Milk', price: 8.90, tag: 'Caramel Custard', desc: 'Creamy milk with caramel custard notes, house cream and brûlée crumble.', img: './03_basque_cheesecake.jpg' },
  { id: 'brulee-matcha', category: 'Crème Brûlée Series', name: 'Crème Brûlée Matcha', price: 9.50, tag: 'Premium', desc: 'Matcha milk finished with caramel cream and a brûlée-inspired crunch.', img: './02_matcha_cheesecake.jpg' },
  { id: 'brulee-chocolate', category: 'Crème Brûlée Series', name: 'Crème Brûlée Chocolate', price: 9.20, tag: 'Indulgent', desc: 'Chocolate milk with caramel cream, cocoa notes and crunchy brûlée topping.', img: './05_tiramisu_dessert_cup.jpg' },

  { id: 'oreo-cream-milk', category: 'Cookie Series', name: 'Oreo Cream Milk', price: 8.90, tag: 'Best Seller', desc: 'Cookies-and-cream milk topped with house cream and generous Oreo crumble.', img: './04_oreo_dessert_cup.jpg' },
  { id: 'biscoff-cream-milk', category: 'Cookie Series', name: 'Biscoff Cream Milk', price: 9.20, tag: 'Cookie Butter', desc: 'Caramel biscuit milk with smooth cream and spiced cookie crumble.', img: './06_mango_dessert_cup.jpg' },
  { id: 'chocolate-cookie-cream', category: 'Cookie Series', name: 'Chocolate Cookie Cream', price: 8.90, tag: 'Chocolate', desc: 'Chocolate cookie milk with cream top and crunchy cookie bits.', img: './07_strawberry_dessert_cup.jpg' },

  { id: 'andes-mint-cream-milk', category: 'Mint Collection', name: 'Andes Mint Cream Milk', price: 9.80, tag: 'New', desc: 'Fresh milk with melted chocolate mint, house cream, crushed mint chocolate pieces, cocoa dust and a touch of chocolate sauce.', img: './05_tiramisu_dessert_cup.jpg' },
  { id: 'mint-chocolate-cookie-cream', category: 'Mint Collection', name: 'Mint Chocolate Cookie Cream', price: 9.80, tag: 'Cookie Mint', desc: 'A grown-up cookies-and-cream drink with Oreo crumble, chocolate mint pieces, thick cream and chocolate drizzle.', img: './04_oreo_dessert_cup.jpg' },
  { id: 'midnight-mint', category: 'Mint Collection', name: 'Midnight Mint', price: 9.80, tag: 'Featured', desc: 'Rich chocolate mint milk layered with silky house cream, dark chocolate drizzle and chocolate mint shards.', img: './12_matcha_latte.jpg' },

  { id: 'peach-cream-soda', category: 'Dessert Cream Soda', name: 'Peach Cream Soda', price: 8.50, tag: 'Refreshing', desc: 'White peach soda topped with light cream for a fizzy dessert-style drink.', img: './10_peach_jasmine_tea.jpg' },
  { id: 'yuzu-cream-soda', category: 'Dessert Cream Soda', name: 'Yuzu Cream Soda', price: 8.50, tag: 'Citrus', desc: 'Japanese yuzu soda softened with a smooth cream cap.', img: './11_yuzu_jasmine_tea.jpg' },
  { id: 'strawberry-cream-soda', category: 'Dessert Cream Soda', name: 'Strawberry Cream Soda', price: 8.50, tag: 'Bright', desc: 'Strawberry sparkling soda with cream for a pretty, delivery-friendly treat.', img: './09_strawberry_jasmine_tea.jpg' },

  { id: 'white-peach-oolong', category: 'Premium Fruit Tea', name: 'White Peach Oolong', price: 7.50, tag: 'Tea', desc: 'Oolong tea with white peach notes. Add cream if you want it richer.', img: './10_peach_jasmine_tea.jpg' },
  { id: 'lychee-jasmine', category: 'Premium Fruit Tea', name: 'Lychee Jasmine', price: 7.50, tag: 'Floral', desc: 'Light jasmine tea with lychee sweetness and a clean finish.', img: './08_signature_jasmine_fruit_tea.jpg' },
  { id: 'yuzu-jasmine', category: 'Premium Fruit Tea', name: 'Yuzu Jasmine', price: 7.50, tag: 'Citrus', desc: 'Jasmine tea with bright yuzu citrus, made for customers who prefer non-dairy drinks.', img: './11_yuzu_jasmine_tea.jpg' },

  { id: 'galaxy-lychee', category: 'Seasonal Magic Potion', name: 'Galaxy Lychee', price: 7.90, tag: 'Limited', desc: 'Lychee sparkling drink with edible shimmer. Swirl before drinking for the effect.', img: './08_signature_jasmine_fruit_tea.jpg' },
  { id: 'pink-stardust', category: 'Seasonal Magic Potion', name: 'Pink Stardust Lemonade', price: 7.90, tag: 'Sparkle', desc: 'Strawberry lemonade with edible shimmer for limited seasonal launches.', img: './09_strawberry_jasmine_tea.jpg' },

  { id: 'oreo-cheesecake', category: 'Desserts', name: 'Oreo Cheesecake', price: 7.90, tag: 'Dessert', desc: 'Creamy Oreo cheesecake slice with cookie crumble and a rich biscuit base.', img: './01_oreo_cheesecake.jpg' }
];

let cart = JSON.parse(localStorage.getItem('avenn-cart') || '{}');

const money = n => `$${n.toFixed(2)}`;
const count = () => Object.values(cart).reduce((a,b)=>a+b,0);
const subtotal = () => products.reduce((sum,p)=>sum + (cart[p.id] || 0) * p.price, 0);
const getProduct = id => products.find(p => p.id === id);

function renderProducts(){
  const grid = document.getElementById('productGrid');
  const groups = ['Cream Top Series', 'Crème Brûlée Series', 'Cookie Series', 'Mint Collection', 'Dessert Cream Soda', 'Premium Fruit Tea', 'Seasonal Magic Potion', 'Desserts'];
  grid.innerHTML = groups.map(group => `
    <div class="menu-category">
      <div class="category-title"><h3>${group}</h3><span>${products.filter(p => p.category === group).length} items</span></div>
      <div class="category-grid">
        ${products.filter(p => p.category === group).map(p => `
          <article class="product-card" data-product="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}">
            <div class="product-photo"><img src="${p.img}" alt="${p.name}" loading="lazy" /></div>
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
  const msg = `Hi AVENN, I would like to place an order.%0A%0AItems:%0A${items}%0A%0ASubtotal: ${money(subtotal())}%0ADelivery: $5.00%0ATotal: ${money(subtotal()+deliveryFee)}%0A%0AName: ${data.get('name')}%0APhone: ${data.get('phone')}%0AAddress: ${data.get('address')}%0ADate: ${data.get('date')}%0ATime: ${data.get('time')}%0ARemarks: ${data.get('remarks') || '-'}%0A%0APayment: PayNow only, pending verification`;
  window.open(`https://wa.me/6588928698?text=${msg}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('heroImage');
  hero.src = './14_hero_oreo_cheesecake.jpg';
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
