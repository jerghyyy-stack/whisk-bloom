const heroProducts = [
  { name: 'Oreo Cream Milk', image: './products/hero-oreo-cream-milk.png', accent: '#a98248' },
  { name: 'Andes Mint Cream Milk', image: './products/hero-andes-mint-cream-milk.png', accent: '#78917a' },
  { name: 'Matcha Cream', image: './products/hero-matcha-cream.png', accent: '#82955d' },
  { name: 'Strawberry Cream Soda', image: './products/hero-strawberry-cream-soda.png', accent: '#cf8f91' }
];

function setupHeroRotation(){
  const cup = document.getElementById('heroCup');
  const label = document.getElementById('heroProductName');
  const dots = document.getElementById('heroDots');
  const hero = document.getElementById('hero');
  const stage = document.querySelector('.hero-stage');
  if(!cup || !label || !dots || !hero || !stage) return;

  let index = 0;
  let timer;
  let changing = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  heroProducts.forEach(item => { const img = new Image(); img.src = item.image; });
  dots.innerHTML = heroProducts.map((item,i) => `<button class="hero-dot${i === 0 ? ' active' : ''}" type="button" data-hero-index="${i}" aria-label="Show ${item.name}"></button>`).join('');

  function setAccent(item){
    hero.style.setProperty('--hero-accent-live', item.accent);
    document.querySelectorAll('.hero-dot').forEach((dot,i) => dot.classList.toggle('active',i === index));
  }

  function show(nextIndex){
    if(changing) return;
    changing = true;
    index = (nextIndex + heroProducts.length) % heroProducts.length;
    const item = heroProducts[index];

    if(reducedMotion){
      cup.src = item.image;
      cup.alt = `AVENN ${item.name}`;
      label.textContent = item.name;
      setAccent(item);
      changing = false;
      return;
    }

    cup.classList.add('slide-out');
    window.setTimeout(() => {
      cup.classList.remove('slide-out');
      cup.classList.add('slide-in-start');
      cup.src = item.image;
      cup.alt = `AVENN ${item.name}`;
      label.textContent = item.name;
      setAccent(item);
      requestAnimationFrame(() => requestAnimationFrame(() => cup.classList.remove('slide-in-start')));
      window.setTimeout(() => { changing = false; }, 760);
    }, 430);
  }

  function restart(){
    window.clearInterval(timer);
    if(!reducedMotion) timer = window.setInterval(() => show(index + 1), 4300);
  }

  dots.addEventListener('click', event => {
    const button = event.target.closest('[data-hero-index]');
    if(!button) return;
    show(Number(button.dataset.heroIndex));
    restart();
  });

  stage.addEventListener('mouseenter', () => window.clearInterval(timer));
  stage.addEventListener('mouseleave', restart);
  stage.addEventListener('focusin', () => window.clearInterval(timer));
  stage.addEventListener('focusout', restart);
  cup.addEventListener('error', () => show(index + 1));

  setAccent(heroProducts[0]);
  restart();
}

document.addEventListener('DOMContentLoaded', setupHeroRotation);
