const deliveryFee = 5;

const svg = (title, fill, accent, strands = 7, type = 'pie') => {
  const strings = Array.from({ length: strands }).map((_, i) => {
    const x = 325 + i * (92 / Math.max(1, strands - 1));
    const curve = i % 2 === 0 ? 18 : -14;
    return `<path d="M${x} 208 C${x + curve} 270 ${x - curve} 323 ${x + 8} 385" stroke="#f7e7b8" stroke-width="${i % 3 === 0 ? 7 : 5}" stroke-linecap="round" opacity=".92"/>`;
  }).join('');

  if (type === 'cake') {
    return `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 520">
        <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff8ed"/><stop offset="1" stop-color="#ead7bf"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="16" stdDeviation="18" flood-opacity=".22"/></filter></defs>
        <rect width="720" height="520" fill="url(#bg)"/>
        <ellipse cx="360" cy="398" rx="230" ry="46" fill="#c8ac87" opacity=".22"/>
        <g filter="url(#s)">
          <path d="M205 214 C285 170 447 166 525 226 L445 384 C381 426 253 403 185 342 Z" fill="#f8f1e6"/>
          <path d="M205 214 C284 247 442 252 525 226 L445 384 C376 409 250 395 185 342 Z" fill="#eee0ce"/>
          <path d="M206 305 C279 338 384 344 473 328 L445 384 C376 409 250 395 185 342 Z" fill="#2b211e"/>
          <circle cx="285" cy="232" r="18" fill="#1d1715"/><circle cx="335" cy="255" r="13" fill="#1d1715"/><circle cx="398" cy="226" r="16" fill="#1d1715"/><circle cx="454" cy="268" r="14" fill="#1d1715"/>
          <path d="M330 150 c22-26 76-24 96 4 c-35 13-65 11-96-4z" fill="#241b18"/>
        </g>
        <text x="44" y="68" font-family="Georgia" font-size="34" fill="#3b2a20" font-weight="700">${title}</text>
      </svg>`)} `;
  }

  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 520">
      <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff7eb"/><stop offset="1" stop-color="#ead5b8"/></linearGradient><filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-opacity=".2"/></filter></defs>
      <rect width="720" height="520" fill="url(#bg)"/>
      <path d="M128 360 C202 418 408 435 557 363 C590 346 599 311 574 282 C521 221 264 195 147 258 C96 285 89 329 128 360Z" fill="#c09362" opacity=".24"/>
      <g filter="url(#shadow)">
        <path d="M132 296 C180 224 328 195 497 233 C562 248 598 286 585 325 C564 388 395 420 230 387 C151 371 101 340 132 296Z" fill="#c98d51"/>
        <path d="M148 291 C198 237 337 217 487 248 C543 260 573 291 561 318 C543 365 395 390 242 363 C171 350 123 323 148 291Z" fill="${fill}"/>
        <path d="M145 291 C197 246 337 228 484 257 C538 268 565 294 553 318 C540 349 454 371 348 370 C248 368 145 345 134 315 C131 307 134 298 145 291Z" fill="${accent}" opacity=".62"/>
        <path d="M134 296 C178 225 327 194 497 232 C554 245 590 275 588 309 C586 336 560 359 521 374 C560 334 529 300 480 285 C342 243 201 261 145 315 C126 335 139 358 179 376 C118 356 94 331 134 296Z" fill="#d79b5a" opacity=".9"/>
        <path d="M280 250 C331 202 427 191 502 229 C461 282 382 296 280 250Z" fill="#e8c07c" opacity=".55"/>
        <g transform="translate(165 -4)">
          <path d="M192 196 C241 161 324 171 384 208 C350 256 263 268 192 196Z" fill="${fill}"/>
          <path d="M192 196 C241 161 324 171 384 208 C350 256 263 268 192 196Z" fill="#fff1c5" opacity=".22"/>
          ${strings}
        </g>
        <path d="M246 352 C313 375 433 370 510 338" stroke="#fff2d8" stroke-width="8" opacity=".34" stroke-linecap="round"/>
      </g>
      <text x="44" y="68" font-family="Georgia" font-size="34" fill="#3b2a20" font-weight="700">${title}</text>
    </svg>`)} `;
};

const products = [
  { id: 'durian', name: 'Durian Cheese Pie', price: 11.90, tag: 'Best Seller', desc: 'Creamy durian filling with a soft cheese pull and thin handmade crust.', img: svg('Durian Cheese Pie', '#f0cd7a', '#efd992', 10) },
  { id: 'matcha', name: 'Matcha Cheese Pie', price: 13.90, tag: 'Premium', desc: 'Earthy matcha filling tucked inside the same thin crust with rich cream cheese.', img: svg('Matcha Cheese Pie', '#6f8f5d', '#b7c790', 6) },
  { id: 'seasalt', name: 'Sea Salt Cheese Pie', price: 9.90, tag: 'Classic', desc: 'Clean, creamy and lightly savoury with a more subtle cheese pull.', img: svg('Sea Salt Cheese Pie', '#f3e7ce', '#fff5df', 4) },
  { id: 'oreo', name: 'Oreo Cheesecake', price: 7.90, tag: 'Per Slice', desc: 'No-bake Oreo cheesecake slice with Oreo crumbs and a thick cookie base.', img: svg('Oreo Cheesecake', '#f4efe6', '#e9ddcf', 0, 'cake') },
  { id: 'fruittea', name: 'Signature Fruit Tea', price: 5.90, tag: 'Refreshing', desc: 'A bright, refreshing tea pairing for the cheese pies and cheesecake.', img: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 520"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff8ed"/><stop offset="1" stop-color="#ead7bf"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="16" stdDeviation="14" flood-opacity=".2"/></filter></defs><rect width="720" height="520" fill="url(#bg)"/><ellipse cx="360" cy="418" rx="175" ry="35" fill="#bf9a75" opacity=".22"/><g filter="url(#s)"><path d="M275 110 h170 l-24 305 c-2 29-25 48-61 48s-59-19-61-48z" fill="#f7d981"/><path d="M296 196 h128 l-17 210 c-2 21-20 35-47 35s-45-14-47-35z" fill="#f0a95c" opacity=".85"/><circle cx="334" cy="258" r="26" fill="#e7625f"/><circle cx="386" cy="301" r="25" fill="#f5ce59"/><circle cx="350" cy="352" r="22" fill="#89aa64"/><path d="M314 88 C386 74 424 70 470 50" stroke="#6f7b58" stroke-width="12" fill="none" stroke-linecap="round"/></g><text x="44" y="68" font-family="Georgia" font-size="34" fill="#3b2a20" font-weight="700">Signature Fruit Tea</text></svg>`)}` }
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
  document.getElementById('heroImage').src = products[0].img;
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
