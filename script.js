// ===== 加微信解锁弹窗 =====
(function () {
  const overlay = document.getElementById('unlockOverlay');
  if (!overlay) return;

  const STORAGE_KEY = 'ielts_site_unlocked';
  const unlockBtn = document.getElementById('unlockBtn');

  const unlock = () => {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
    overlay.classList.add('hidden');
    document.body.classList.add('unlocked');
  };

  // 已解锁过则直接进入
  let unlocked = false;
  try { unlocked = localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) {}
  if (unlocked) unlock();

  unlockBtn.addEventListener('click', unlock);

  // 悬浮按钮：随时弹出二维码
  const fab = document.getElementById('wechatFab');
  if (fab) {
    fab.addEventListener('click', () => {
      overlay.classList.remove('hidden');
    });
  }

  // 关闭按钮：直接关掉弹窗（不改变已解锁状态）
  const closeBtn = document.getElementById('unlockClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
    });
  }

  // 服务区按钮：点击唤起二维码弹窗
  document.querySelectorAll('.js-open-qr').forEach((btn) => {
    btn.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      overlay.scrollIntoView({ block: 'nearest' });
    });
  });
})();

// ===== 导航栏滚动状态 =====
const navbar = document.getElementById('navbar');
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== 移动端菜单 =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== 滚动显现动画 =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // 同级元素错开出现
      const siblings = entry.target.parentElement
        ? Array.from(entry.target.parentElement.children).filter(el => el.classList.contains('reveal'))
        : [];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx > 0 ? idx * 80 : 0) + 'ms';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== 数字增长动画 =====
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  if (isNaN(target)) return;
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.floor(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
};

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// ===== 深色模式 =====
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const KEY = 'ielts_theme';
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  const apply = t => {
    root.setAttribute('data-theme', t);
    if (btn) btn.setAttribute('aria-label', t === 'dark' ? '切换浅色模式' : '切换深色模式');
  };
  apply(saved === 'dark' ? 'dark' : 'light');
  if (btn) btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
  });
})();

// ===== 收藏 =====
(function () {
  const KEY = 'ielts_favs';
  const get = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const set = arr => { try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) {} };
  let favs = get();
  const countEl = document.getElementById('favCount');
  const filterBtn = document.getElementById('favFilter');
  let onlyFav = false;

  const paint = () => {
    document.querySelectorAll('[data-fav]').forEach(b => {
      const on = favs.includes(b.dataset.fav);
      b.classList.toggle('active', on);
      b.textContent = on ? '★' : '☆';
      b.setAttribute('aria-label', on ? '取消收藏' : '收藏');
    });
    if (countEl) countEl.textContent = favs.length;
    applyFilter();
  };
  document.querySelectorAll('[data-fav]').forEach(b => {
    b.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const id = b.dataset.fav;
      favs = favs.includes(id) ? favs.filter(x => x !== id) : favs.concat(id);
      set(favs); paint();
    });
  });
  const applyFilter = () => {
    document.querySelectorAll('.res-card').forEach(card => {
      const isFav = favs.includes(card.dataset.res);
      const hiddenByFav = onlyFav && !isFav;
      const hiddenBySearch = card.classList.contains('hidden-by-search');
      card.style.display = (hiddenByFav || hiddenBySearch) ? 'none' : '';
    });
  };
  if (filterBtn) filterBtn.addEventListener('click', () => {
    onlyFav = !onlyFav;
    filterBtn.classList.toggle('active', onlyFav);
    applyFilter();
  });
  window.__ieltsApplyFavFilter = applyFilter;
  paint();
})();

// ===== 站内搜索 =====
(function () {
  const input = document.getElementById('siteSearch');
  const box = document.getElementById('searchBox');
  const clear = document.getElementById('searchClear');
  const tip = document.getElementById('searchTip');
  if (!input) return;
  const cards = Array.from(document.querySelectorAll('.res-card'));
  const rows = Array.from(document.querySelectorAll('#compare tbody tr'));

  const run = () => {
    const q = input.value.trim().toLowerCase();
    box.classList.toggle('has-value', q.length > 0);
    let n = 0;
    cards.forEach(card => {
      const hay = ((card.dataset.keywords || '') + ' ' + card.innerText).toLowerCase();
      const hit = !q || hay.indexOf(q) > -1;
      card.classList.toggle('hidden-by-search', !hit);
      if (hit && q) n++;
    });
    rows.forEach(row => {
      const hit = !q || row.innerText.toLowerCase().indexOf(q) > -1;
      row.style.display = hit ? '' : 'none';
    });
    if (tip) {
      tip.hidden = !q;
      if (q) tip.textContent = n > 0 ? '找到 ' + n + ' 个匹配的资源' : '没有匹配的资源，试试其他关键词';
    }
    // 联动收藏筛选（避免被收藏筛选覆盖）
    if (window.__ieltsApplyFavFilter) window.__ieltsApplyFavFilter();
  };
  input.addEventListener('input', run);
  if (clear) clear.addEventListener('click', () => { input.value = ''; run(); input.focus(); });
  // 快捷键 /
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
      e.preventDefault(); input.focus();
    }
    if (e.key === 'Escape' && document.activeElement === input) { input.value = ''; run(); input.blur(); }
  });
})();

// ===== 每日一词 =====
(function () {
  const wordEl = document.getElementById('dailyWord');
  const meanEl = document.getElementById('dailyMean');
  const nextBtn = document.getElementById('dailyNext');
  if (!wordEl) return;
  const words = window.IELTS_WORDS || [
    { w: 'resemble', p: 'v.', m: '像，与……相似' },
    { w: 'fundamental', p: 'adj.', m: '基本的，基础的' },
    { w: 'ignore', p: 'v.', m: '忽视，不顾' },
    { w: 'approach', p: 'n.', m: '方法' },
    { w: 'artificial', p: 'adj.', m: '人造的，仿造的' }
  ];
  let idx = 0;
  const show = i => {
    const c = words[((i % words.length) + words.length) % words.length];
    wordEl.textContent = c.w;
    meanEl.textContent = (c.p ? c.p + ' ' : '') + c.m;
  };
  // 按日期取词，保证同一天同一批访客看到一致的词
  const day = Math.floor(Date.now() / 86400000);
  idx = day % words.length;
  show(idx);
  if (nextBtn) nextBtn.addEventListener('click', () => { idx++; show(idx); });
})();

// ===== PWA Service Worker 注册 =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
