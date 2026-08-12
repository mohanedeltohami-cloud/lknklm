/* ════════════════════════════════════════════════════════════════════
   ONELIK — script.js
   ─────────────────────────────────────────────────────────────────────
   ★ HOW TO ADD A PRODUCT ★
   Add one object to the PRODUCTS array below. That's it — the shop,
   product page and order page all update automatically.

   Required : name, price, image, description (Arabic)
   Optional : category, badge, oldPrice, benefits (Arabic array)
════════════════════════════════════════════════════════════════════ */

const PRODUCTS = [
  {
    name: "Aura Ambient Lamp",
    price: 899,
    oldPrice: 1099,
    image: "images/product-lamp.jpg",   // fallback preview below — replace with your photo
    category: "Home",
    badge: "New",
    description: "مصباح مكتب بتصميم عصري يمنح إضاءة دافئة قابلة للتعديل، مثالي لمساحات العمل الحديثة.",
    benefits: [
      "إضاءة دافئة قابلة للتعديل على ٣ مستويات",
      "جسم معدني متين بلمسة نهائية غير لامعة",
      "كابل USB-C بطول ١.٥ متر",
      "مناسب للقراءة والعمل لساعات طويلة"
    ]
  },
  {
    name: "Nero Ceramic Mug Duo",
    price: 449,
    image: "images/product-mugs.jpg",
    category: "Home",
    description: "طقم كوبين من السيراميك المطفي بتصميم بسيط وأنيق، يحافظ على حرارة مشروبك المفضل.",
    benefits: [
      "سيراميك عالي الجودة آمن لغسالة الأطباق",
      "سعة ٣٥٠ مل لكل كوب",
      "ملمس مطفي مقاوم لبصمات الأصابع"
    ]
  },
  {
    name: "Orbit Wireless Charger",
    price: 649,
    oldPrice: 799,
    image: "images/product-charger.jpg",
    category: "Tech",
    badge: "Best Seller",
    description: "شاحن لاسلكي سريع بقدرة ١٥ واط مع سطح مقاوم للانزلاق ومؤشر LED خافت لا يزعجك ليلاً.",
    benefits: [
      "شحن سريع حتى ١٥ واط",
      "متوافق مع جميع الأجهزة الداعمة للشحن اللاسلكي",
      "حماية من الحرارة الزيادة والشحن الزائد",
      "تصميم نحيف سهل الحمل"
    ]
  },
  {
    name: "Terra Journal Set",
    price: 349,
    image: "images/product-journal.jpg",
    category: "Lifestyle",
    description: "دفتر ملاحظات بغلاف صلب وورق كريمي فاخر ١٢٠ جم، مثالي للتدوين اليومي والتخطيط.",
    benefits: [
      "١٩٢ صفحة من ورق كريمي فاخر",
      "غلاف صلب بلمسة قماشية أنيقة",
      "شريط فاصل + جيب داخلي للأوراق"
    ]
  },
  {
    name: "Voss Glass Carafe",
    price: 549,
    image: "images/product-carafe.jpg",
    category: "Home",
    description: "إبريق زجاجي مقاوم للحرارة مع غطاء محكم، تصميم اسكندنافي يناسب أي مطبخ عصري.",
    benefits: [
      "زجاج بوروسيليكات مقاوم للحرارة",
      "سعة ١ لتر مع غطاء محكم",
      "آمن لغسالة الأطباق"
    ]
  },
  {
    name: "Halo Desk Organizer",
    price: 399,
    image: "images/product-organizer.jpg",
    category: "Lifestyle",
    description: "منظم مكتب خشبي بتقسيمات ذكية يحافظ على أدواتك مرتبة وأنيقة طوال اليوم.",
    benefits: [
      "خشب طبيعي بلمسة نهائية ناعمة",
      "٦ تقسيمات بأحجام مختلفة",
      "قاعدة مطاطية ثابتة لا تخدش المكتب"
    ]
  }
];

/* Temporary visual previews until you add real photos in /images.
   Delete any line to use your own file immediately.               */
const PREVIEW_SEEDS = {
  "images/product-lamp.jpg":      "https://picsum.photos/seed/onelik-lamp/800/1000",
  "images/product-mugs.jpg":      "https://picsum.photos/seed/onelik-mugs/800/1000",
  "images/product-charger.jpg":   "https://picsum.photos/seed/onelik-charger/800/1000",
  "images/product-journal.jpg":   "https://picsum.photos/seed/onelik-journal/800/1000",
  "images/product-carafe.jpg":    "https://picsum.photos/seed/onelik-carafe/800/1000",
  "images/product-organizer.jpg": "https://picsum.photos/seed/onelik-organizer/800/1000",
 
};

/* ── Config ────────────────────────────────────────────────────────── */
const WHATSAPP_NUMBER = "201062703091";           // ← your WhatsApp number
const DEFAULT_BENEFITS = [
  "خامات عالية الجودة مختارة بعناية",
  "تغليف آمن ومحمي أثناء الشحن",
  "الدفع عند الاستلام",
  "دعم سريع عبر واتساب"
];
const GOVERNORATES = [
  "Cairo","Alexandria","Giza","Qalyubia","Dakahlia","Sharqia","Gharbia","Monufia",
  "Beheira","Kafr El Sheikh","Damietta","Port Said","Ismailia","Suez","North Sinai",
  "South Sinai","Fayoum","Beni Suef","Minya","Asyut","Sohag","Qena","Luxor","Aswan",
  "Red Sea","New Valley","Matrouh"
];

/* ── Tiny helpers ──────────────────────────────────────────────────── */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = s => String(s).replace(/[&<>"']/g, m => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
const fmt = n => "EGP " + Number(n).toLocaleString("en-US");
const getProduct = id => PRODUCTS.find(p => String(p.id) === String(id));
PRODUCTS.forEach((p, i) => (p.id = i + 1));

/* Graceful image placeholder — shows a branded card when a file is missing */
function placeholderSVG(label) {
  const t = (label || "ONELIK IMAGE").toUpperCase().slice(0, 26);
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'>` +
    `<rect width='800' height='1000' fill='#eceef1'/>` +
    `<rect x='26' y='26' width='748' height='948' fill='none' stroke='#c9ced6' stroke-width='2' stroke-dasharray='9 9'/>` +
    `<text x='400' y='470' font-family='Arial' font-size='30' font-weight='bold' letter-spacing='10' fill='#8a93a3' text-anchor='middle'>ONELIK</text>` +
    `<text x='400' y='516' font-family='Arial' font-size='16' fill='#a9b1bf' text-anchor='middle'>${t}</text>` +
    `<text x='400' y='548' font-family='Arial' font-size='13' fill='#b9c0cc' text-anchor='middle'>replace with your image</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
function guardImages(scope = document) {
  $$("img[data-fallback]", scope).forEach(img => {
    if (img.dataset.fb) return;
    img.addEventListener("error", () => {
      img.dataset.fb = "1";
      img.classList.remove("kb");
      img.src = placeholderSVG(img.dataset.fbLabel || img.alt);
    }, { once: true });
  });
}

/* ── Toast ─────────────────────────────────────────────────────────── */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}

/* ── Intro experience ──────────────────────────────────────────────── */
function runIntro() {
  const intro = $("#intro");
  const done = () => document.body.classList.add("intro-done");
  document.body.classList.remove("intro-pending");
  if (!intro) return done();
  const seen = sessionStorage.getItem("oneliks-intro") === "1";
  if (reduceMotion || seen) { intro.remove(); return done(); }
  sessionStorage.setItem("oneliks-intro", "1");
  document.body.classList.add("intro-pending");
  const leave = () => {
    intro.classList.add("leave");
    setTimeout(() => { intro.remove(); done(); }, 760);
  };
  intro.addEventListener("click", leave, { once: true });
  setTimeout(leave, 1750);
}

/* ── Header + mobile menu ──────────────────────────────────────────── */
function initHeader() {
  const header = $("#header");
  if (header && !header.classList.contains("is-solid")) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  const burger = $("#burger"), mmenu = $("#mmenu");
  if (burger && mmenu) {
    const close = () => { document.body.classList.remove("menu-open", "lock"); burger.setAttribute("aria-expanded", "false"); mmenu.setAttribute("aria-hidden", "true"); };
    burger.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      document.body.classList.toggle("lock", open);
      burger.setAttribute("aria-expanded", open);
      mmenu.setAttribute("aria-hidden", !open);
    });
    $$("a", mmenu).forEach(a => a.addEventListener("click", close));
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }
}

/* ── Reveal / counters / scramble / ticker ─────────────────────────── */
function initReveals() {
  const els = $$("[data-rv], .sec-title, .lm-wrap");
  if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.14, rootMargin: "0px 0px -36px" });
  els.forEach(e => io.observe(e));
}
function initCounters() {
  const els = $$("[data-count]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach(el => el.textContent = el.dataset.decimal || el.dataset.count);
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target, target = parseFloat(el.dataset.count), dec = el.dataset.decimal;
      const t0 = performance.now(), dur = 1300;
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = dec ? (target * eased / 10).toFixed(1) : Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
}
function scramble(el) {
  if (!el || reduceMotion) return;
  const original = el.textContent, chars = "ONELIK#/·—01▮";
  let frame = 0;
  const iv = setInterval(() => {
    frame++;
    const fixed = Math.floor(frame / 2);
    el.textContent = original.split("").map((c, i) =>
      i < fixed || c === " " ? c : chars[Math.floor(Math.random() * chars.length)]
    ).join("");
    if (fixed >= original.length) { clearInterval(iv); el.textContent = original; }
  }, 30);
}
function initTicker() {
  const track = $("#tickerTrack");
  if (!track) return;
  track.innerHTML += track.innerHTML; // seamless loop
}

/* ── Cards ─────────────────────────────────────────────────────────── */
function cardHTML(p, idx) {
  const badge = p.badge ? `<span class="card-badge">${esc(p.badge)}</span>` : "";
  const old = p.oldPrice ? `<span class="price-old">${fmt(p.oldPrice)}</span>` : "";
  return `
  <article class="card" data-rv style="--d:${(idx % 3) * 0.08}s">
    <a class="card-media" href="product.html?id=${p.id}" aria-label="View ${esc(p.name)}">
      <img src="${esc(p.image)}" alt="${esc(p.name)}" data-fallback data-fb-label="${esc(p.name)}" loading="lazy" width="800" height="1000">
      <span class="card-index">${String(idx + 1).padStart(2, "0")}</span>
      ${badge}
      <span class="card-hoverbar">View Product
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </span>
    </a>
    <div class="card-body">
      <h3 class="card-name">${esc(p.name)}</h3>
      <p class="card-desc ar" dir="rtl">${esc(p.description)}</p>
      <div class="card-foot">
        <span class="price">${fmt(p.price)}${old}</span>
        <a class="card-link" href="product.html?id=${p.id}">View
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </div>
  </article>`;
}

/* ── Shop (index) ──────────────────────────────────────────────────── */
function initShop() {
  const grid = $("#shopGrid"), count = $("[data-shop-count]");
  if (!grid) return;
  if (count) count.textContent = `${String(PRODUCTS.length).padStart(2, "0")} pieces — updated regularly`;

  function render() {
    grid.innerHTML = PRODUCTS.map((p, i) => cardHTML(p, i)).join("");
    guardImages(grid);
    initReveals();
    // animate freshly injected cards
    requestAnimationFrame(() => $$(".card", grid).forEach(c => c.classList.add("in")));
  }
  render();
}

/* ── Product page ──────────────────────────────────────────────────── */
function initProductPage() {
  const id = new URLSearchParams(location.search).get("id");
  const p = getProduct(id);
  if (!p) { location.replace("index.html#shop"); return; }

  document.title = `${p.name} — ONELIK`;

  const img = $("#pdImage");
  img.src = p.image;
  img.alt = p.name;
  img.dataset.fbLabel = p.name;

  $("#pdCategory").textContent = p.category || "ONELIK Collection";
  $("#pdName").textContent = p.name;
  $("#pdPrice").textContent = fmt(p.price);
  const oldEl = $("#pdOld");
  if (p.oldPrice) { oldEl.hidden = false; oldEl.textContent = fmt(p.oldPrice); }
  const badge = $("#pdBadge");
  if (p.badge) { badge.hidden = false; badge.textContent = p.badge; }
  $("#pdDesc").textContent = p.description;

  const benefits = p.benefits || DEFAULT_BENEFITS;
  $("#pdBenefits").innerHTML = benefits.map(b => `<li class="ar" dir="rtl">${esc(b)}</li>`).join("");

  // Quantity
  let qty = 1;
  const qtyInput = $("#pdQty");
  const orderBtn = $("#pdOrderBtn");
  const syncOrder = () => { orderBtn.href = `order.html?id=${p.id}&qty=${qty}`; };
  syncOrder();
  $$(".stepper [data-step]").forEach(btn => {
    btn.addEventListener("click", () => {
      qty = Math.max(1, Math.min(99, qty + Number(btn.dataset.step)));
      qtyInput.value = qty;
      syncOrder();
    });
  });

  $("#pdAddCart").addEventListener("click", () => {
    addToCart(p.id, qty);
    toast(`Added to cart — ${p.name}`);
  });

  // Related
  const rel = $("#relatedGrid");
  if (rel) {
    const others = PRODUCTS.filter(x => x.id !== p.id).slice(0, 3);
    rel.innerHTML = others.map((x, i) => cardHTML(x, i)).join("");
    guardImages(rel);
  }
  guardImages(document);
}

/* ── Cart ──────────────────────────────────────────────────────────── */
const CART_KEY = "oneliks-cart";
const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = c => localStorage.setItem(CART_KEY, JSON.stringify(c));

function addToCart(id, qty = 1) {
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  line ? line.qty = Math.min(99, line.qty + qty) : cart.push({ id, qty });
  saveCart(cart);
  renderCartBadges(true);
  renderCartDrawer();
}
function setCartQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) cart = cart.filter(l => l.id !== id);
  else cart.forEach(l => { if (l.id === id) l.qty = Math.min(99, qty); });
  saveCart(cart);
  renderCartBadges();
  renderCartDrawer();
}
function renderCartBadges(popIt = false) {
  const total = getCart().reduce((s, l) => s + l.qty, 0);
  $$("[data-cart-count]").forEach(el => {
    el.textContent = total;
    el.hidden = total === 0;
    if (popIt && el.classList.contains("cart-count")) {
      el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
    }
  });
}
function renderCartDrawer() {
  const box = $("#cartItems");
  if (!box) return;
  const cart = getCart();
  const foot = $("#cartFoot");
  if (!cart.length) {
    box.innerHTML = `<p class="drawer-empty">Your cart is empty.<br>Find something worth keeping in <a href="#shop" style="text-decoration:underline;color:var(--navy)" data-cart-close>the collection</a>.</p>`;
    foot.style.display = "none";
    return;
  }
  foot.style.display = "";
  let subtotal = 0;
  box.innerHTML = cart.map(l => {
    const p = getProduct(l.id);
    if (!p) return "";
    subtotal += p.price * l.qty;
    return `
    <div class="cart-item">
      <img src="${esc(p.image)}" alt="${esc(p.name)}" data-fallback data-fb-label="${esc(p.name)}">
      <div>
        <p class="cart-item-name">${esc(p.name)}</p>
        <p class="cart-item-price">${fmt(p.price)} × ${l.qty}</p>
        <a class="cart-item-go" href="order.html?id=${p.id}&qty=${l.qty}">Order this
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      <div class="cart-item-right">
        <button type="button" class="cart-item-remove" data-remove="${p.id}" aria-label="Remove ${esc(p.name)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <div class="stepper stepper-sm">
          <button type="button" data-cid="${p.id}" data-step="-1" aria-label="Decrease">−</button>
          <input type="text" value="${l.qty}" readonly aria-label="Quantity">
          <button type="button" data-cid="${p.id}" data-step="1" aria-label="Increase">+</button>
        </div>
      </div>
    </div>`;
  }).join("");
  $("#cartSubtotal").textContent = fmt(subtotal);
  guardImages(box);
}
function initCartUI() {
  renderCartBadges();
  $$("[data-cart-open]").forEach(btn => btn.addEventListener("click", () => {
    const drawer = $("#cartDrawer");
    if (!drawer) { location.href = "index.html#shop"; return; }
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
  }));
  const drawer = $("#cartDrawer");
  if (!drawer) return;
  const close = () => { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); document.body.classList.remove("lock"); };
  drawer.addEventListener("click", e => { if (e.target.closest("[data-cart-close]")) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && drawer.classList.contains("open")) close(); });
  drawer.addEventListener("click", e => {
    const rm = e.target.closest("[data-remove]");
    if (rm) return setCartQty(Number(rm.dataset.remove), 0);
    const st = e.target.closest("[data-cid][data-step]");
    if (st) {
      const id = Number(st.dataset.cid);
      const line = getCart().find(l => l.id === id);
      if (line) setCartQty(id, line.qty + Number(st.dataset.step));
    }
  });
  const clear = $("#cartClear");
  if (clear) clear.addEventListener("click", () => { saveCart([]); renderCartBadges(); renderCartDrawer(); toast("Cart cleared"); });
  renderCartDrawer();
}

/* ── Order page ────────────────────────────────────────────────────── */
function initOrderPage() {
  const params = new URLSearchParams(location.search);
  const p = getProduct(params.get("id"));
  if (!p) { location.replace("index.html#shop"); return; }

  document.title = `Checkout — ${p.name} — ONELIK`;

  const img = $("#sumImage");
  img.src = p.image; img.alt = p.name; img.dataset.fbLabel = p.name;
  $("#sumName").textContent = p.name;
  $("#sumUnit").textContent = fmt(p.price);

  // Governorates
  const govSel = $("#fGov");
  GOVERNORATES.forEach(g => { const o = document.createElement("option"); o.value = o.textContent = g; govSel.appendChild(o); });

  // Quantity
  let qty = Math.max(1, Math.min(99, parseInt(params.get("qty"), 10) || 1));
  const qtyInput = $("#sumQty"), totalEl = $("#sumTotal");
  const updateTotals = () => {
    $("#sumSubtotal").textContent = fmt(p.price * qty);
    totalEl.textContent = fmt(p.price * qty);
    totalEl.classList.remove("bump"); void totalEl.offsetWidth; totalEl.classList.add("bump");
  };
  qtyInput.value = qty;
  updateTotals();
  $$(".stepper [data-step]").forEach(btn => btn.addEventListener("click", () => {
    qty = Math.max(1, Math.min(99, qty + Number(btn.dataset.step)));
    qtyInput.value = qty;
    updateTotals();
  }));

  // Validation + WhatsApp
  const fields = {
    name:    { el: $("#fName"),    test: v => v.trim().length >= 3,                msg: "Please enter your full name (at least 3 characters)." },
    phone:   { el: $("#fPhone"),   test: v => /^(\+?2)?01[0125][0-9]{8}$/.test(v.replace(/[\s-]/g, "")), msg: "Please enter a valid Egyptian mobile number (01XXXXXXXXX)." },
    gov:     { el: govSel,         test: v => v !== "",                            msg: "Please select your governorate." },
    address: { el: $("#fAddress"), test: v => v.trim().length >= 8,                msg: "Please enter a more detailed address." }
  };
  const setError = (f, on) => f.el.closest(".field").classList.toggle("error", on);
  Object.values(fields).forEach(f => f.el.addEventListener("input", () => setError(f, false)));

  $("#orderForm").addEventListener("submit", e => {
    e.preventDefault();
    let firstBad = null;
    Object.values(fields).forEach(f => {
      const ok = f.test(f.el.value);
      setError(f, !ok);
      f.el.closest(".field").querySelector(".fmsg").textContent = f.msg;
      if (!ok && !firstBad) firstBad = f.el;
    });
    if (firstBad) { firstBad.focus({ preventScroll: false }); firstBad.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }); return; }

    const total = p.price * qty;
    const msg =
`🛒 New Order

📦 Product: ${p.name}
💰 Unit Price: ${fmt(p.price)}
🔢 Quantity: ${qty}
💵 Total: ${fmt(total)}

👤 Name: ${fields.name.el.value.trim()}
📱 Phone: ${fields.phone.el.value.trim()}
📍 Governorate: ${fields.gov.el.value}
🏠 Address: ${fields.address.el.value.trim()}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    toast("Opening WhatsApp — review your order and press send.");
  });
}

/* ── Boot ──────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  // swap in temporary previews for images that don't exist yet
  $$("img").forEach(img => { if (PREVIEW_SEEDS[img.getAttribute("src")]) img.src = PREVIEW_SEEDS[img.getAttribute("src")]; });

  guardImages(document);
  runIntro();
  initHeader();
  initTicker();
  initReveals();
  initCounters();
  initCartUI();

  const page = document.body.dataset.page;
  if (page === "home") {
    initShop();
    const scr = $("[data-scramble]");
    if (scr) setTimeout(() => scramble(scr), reduceMotion ? 0 : 1900);
  } else if (page === "product") {
    initProductPage();
    initReveals();
  } else if (page === "order") {
    initOrderPage();
    initReveals();
  }
});