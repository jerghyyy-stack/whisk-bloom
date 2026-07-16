const heroProducts = [
  { name: 'Hojicha Cream', main: './products/hojicha-cream.png', sideA: './products/matcha-cream.png', sideB: './products/strawberry-cream.png' },
  { name: 'Strawberry Matcha Cheesecake', main: './products/strawberry-matcha-cheesecake.png', sideA: './products/oreo-cheesecake.png', sideB: './products/oreo-cream-milk.png' },
  { name: 'Midnight Mint', main: './products/midnight-mint.png', sideA: './products/andes-mint-cream-milk.png', sideB: './products/mint-chocolate-cookie-cream.png' },
  { name: 'Peach Cream Soda', main: './products/peach-cream-soda.png', sideA: './products/yuzu-cream-soda.png', sideB: './products/mango-cream-soda.png' },
  { name: 'Galaxy Lychee', main: './products/galaxy-lychee.png', sideA: './products/pink-stardust.png', sideB: './products/lychee-jasmine.png' }
];

function setupHeroRotation(){
  const main = document.getElementById('heroMainImage');
  const sideA = document.getElementById('heroSideImageA');
  const sideB = document.getElementById('heroSideImageB');
  const label = document.getElementById('heroProductName');
  const dots = document.getElementById('heroDots');
  const gallery = document.querySelector('.hero-gallery');
  if(!main || !sideA || !sideB || !label || !dots || !gallery) return;

  let index = 0;
  let timer;
  let paused = false;

  dots.innerHTML = heroProducts.map((_, i) => `<button class="hero-dot${i === 0 ? ' active' : ''}" aria-label="Show featured product ${i + 1}" data-hero-index="${i}"></button>`).join('');

  const preload = src => { const image = new Image(); image.src = src; };
  heroProducts.forEach(item => [item.main, item.sideA, item.sideB].forEach(preload));

  function update(nextIndex){
    index = (nextIndex + heroProducts.length) % heroProducts.length;
    const item = heroProducts[index];
    [main, sideA, sideB].forEach(img => img.classList.add('hero-fading'));

    window.setTimeout(() => {
      main.src = item.main;
      main.alt = `AVENN ${item.name}`;
      sideA.src = item.sideA;
      sideB.src = item.sideB;
      label.textContent = item.name;
      document.querySelectorAll('.hero-dot').forEach((dot, i) => dot.classList.toggle('active', i === index));
      [main, sideA, sideB].forEach(img => img.classList.remove('hero-fading'));
    }, 260);
  }

  function restart(){
    window.clearInterval(timer);
    if(!paused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      timer = window.setInterval(() => update(index + 1), 4600);
    }
  }

  dots.addEventListener('click', event => {
    const button = event.target.closest('[data-hero-index]');
    if(!button) return;
    update(Number(button.dataset.heroIndex));
    restart();
  });

  gallery.addEventListener('mouseenter', () => { paused = true; window.clearInterval(timer); });
  gallery.addEventListener('mouseleave', () => { paused = false; restart(); });
  gallery.addEventListener('focusin', () => { paused = true; window.clearInterval(timer); });
  gallery.addEventListener('focusout', () => { paused = false; restart(); });

  [main, sideA, sideB].forEach(img => {
    img.addEventListener('error', () => {
      if(img === main) update(index + 1);
    });
  });

  update(0);
  restart();
}

document.addEventListener('DOMContentLoaded', setupHeroRotation);
