/**
 * main.js
 * 메인 애플리케이션 - 내비게이션, 히어로 파티클/타이핑, 프로젝트 그리드, CJ 핵심 가치, 스크롤 인터랙션
 */

// ─────────────────────────────────────────────
// 초기화
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeroParticles();
  initHeroTyping();
  initTechIcons();
  initProjectsGrid();
  initCjValues();
  initAboutSection();
  initFilterTabs();
  initScrollProgress();
  initCardTilt();
  initRevealObserver();
});

// ─────────────────────────────────────────────
// 1. Navigation
// ─────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('site-nav');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-close');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav?.classList.add('nav-scrolled');
    } else {
      nav?.classList.remove('nav-scrolled');
    }
    updateActiveNav();
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  mobileClose?.addEventListener('click', closeMobileNav);
  mobileNav?.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMobileNav();
  });

  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        closeMobileNav();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let currentId = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

// ─────────────────────────────────────────────
// 2. 히어로 인터랙티브 파티클 (CJ Blossom 3색)
// ─────────────────────────────────────────────
function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let animId;
  let mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, vx: 0, vy: 0, radius: 110 };

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class InteractiveStar {
    constructor(w, h) {
      this.w = w;
      this.h = h;
      this.reset();
    }

    reset() {
      const isRightCluster = Math.random() < 0.75;
      if (isRightCluster) {
        this.originX = this.w * (0.50 + Math.random() * 0.45);
        this.originY = this.h * (0.15 + Math.random() * 0.70);
      } else {
        this.originX = Math.random() * this.w;
        this.originY = Math.random() * this.h;
      }

      this.x = this.originX;
      this.y = this.originY;
      this.vx = 0;
      this.vy = 0;

      this.baseRadius = Math.random() < 0.25 ? Math.random() * 0.6 + 1.1 : Math.random() * 0.5 + 0.6;
      this.radius = this.baseRadius;
      this.alpha = Math.random() * 0.45 + 0.25;
      this.twinkleSpeed = Math.random() * 0.015 + 0.006;
      this.twinkleOffset = Math.random() * Math.PI * 2;

      // CJ Blossom 3색 (Red, Yellow, Blue) 및 틴트
      const colors = ['#EF151E', '#FF9700', '#006ECD', '#FF8A8E', '#64B5F6'];
      this.color = colors[Math.floor(Math.random() * colors.length)];

      this.floatAngle = Math.random() * Math.PI * 2;
      this.floatSpeed = Math.random() * 0.006 + 0.003;
      this.floatRadius = Math.random() * 3 + 1.5;
    }

    update() {
      this.floatAngle += this.floatSpeed;
      const targetBaseX = this.originX + Math.cos(this.floatAngle) * this.floatRadius;
      const targetBaseY = this.originY + Math.sin(this.floatAngle) * this.floatRadius;

      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius && dist > 0) {
        const force = (1 - dist / mouse.radius);
        const angle = Math.atan2(dy, dx);
        const sideDir = dx >= 0 ? 1 : -1;
        const pushX = (Math.cos(angle) * 0.4 + sideDir * 0.6) * force * 3.5;
        const pushY = Math.sin(angle) * force * 1.5;

        this.vx += pushX;
        this.vy += pushY;
      }

      const spring = 0.022;
      const friction = 0.93;

      this.vx += (targetBaseX - this.x) * spring;
      this.vy += (targetBaseY - this.y) * spring;

      this.vx *= friction;
      this.vy *= friction;

      this.x += this.vx;
      this.y += this.vy;

      this.twinkleOffset += this.twinkleSpeed;
      this.currentAlpha = this.alpha * (0.75 + 0.25 * Math.sin(this.twinkleOffset));
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.min(0.85, Math.max(0.12, this.currentAlpha));
      ctx.shadowBlur = this.radius * 2;
      ctx.shadowColor = this.color;
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  function initStars() {
    const count = Math.min(65, Math.max(35, Math.floor(canvas.width / 22)));
    stars = Array.from({ length: count }, () => new InteractiveStar(canvas.width, canvas.height));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.update();
      s.draw();
    });

    mouse.vx *= 0.5;
    mouse.vy *= 0.5;
    animId = requestAnimationFrame(animate);
  }

  resize();
  initStars();
  animate();

  window.addEventListener('resize', () => {
    resize();
    initStars();
  }, { passive: true });

  const hero = canvas.closest('#hero');
  if (hero) {
    const handleMove = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const newX = clientX - rect.left;
      const newY = clientY - rect.top;
      if (mouse.prevX !== -9999) {
        mouse.vx = newX - mouse.prevX;
        mouse.vy = newY - mouse.prevY;
      }
      mouse.x = newX;
      mouse.y = newY;
      mouse.prevX = newX;
      mouse.prevY = newY;
    };

    hero.addEventListener('mousemove', e => {
      handleMove(e.clientX, e.clientY);
    });

    hero.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.prevX = -9999;
      mouse.prevY = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
    });

    hero.addEventListener('touchmove', e => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    hero.addEventListener('touchend', () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.prevX = -9999;
      mouse.prevY = -9999;
    });
  }
}

// ─────────────────────────────────────────────
// 3. 히어로 타이핑 애니메이션
// ─────────────────────────────────────────────
function initHeroTyping() {
  const el = document.getElementById('hero-typing');
  if (!el) return;
  const words = [
    'ONLYONE 정신을 실천하는 SW 개발자',
    'VR 90fps 달성 실시간 최적화 엔지니어',
    'Android + AI 파이프라인 풀스택 구축',
    '건강·즐거움·편리를 기술로 구현하는 개발자',
    'CJ ONLYONE Engineer · a Delightful Choice',
  ];
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 55 : 80);
  }
  type();
}

// ─────────────────────────────────────────────
// 4. IntersectionObserver 리빌 애니메이션
// ─────────────────────────────────────────────
function initRevealObserver() {
  const opts = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const fills = entry.target.querySelectorAll('.skill-bar-fill');
        fills.forEach(f => f.classList.add('animate'));
      }
    });
  }, opts);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ─────────────────────────────────────────────
// 5. 프로젝트 그리드 렌더링
// ─────────────────────────────────────────────
let currentFilter = 'all';

function initProjectsGrid() {
  renderProjects('all');
}

function renderProjects(filter) {
  currentFilter = filter;
  const grid = document.getElementById('projects-grid');
  if (!grid || typeof PROJECTS_DATA === 'undefined') return;

  const filtered = filter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((proj, idx) => buildProjectCard(proj, idx)).join('');

  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.projectId;
      const proj = PROJECTS_DATA.find(p => p.id === id);
      if (proj) openProjectModal(proj);
    });
  });

  initCardTilt();

  const opts = { threshold: 0.05 };
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, opts);
  grid.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function buildProjectCard(proj, idx) {
  const delay = `${(idx % 3) * 0.1}s`;
  const thumb = proj.media.thumbnail
    ? `<img src="${proj.media.thumbnail}" alt="${proj.title}" loading="lazy" onerror="this.parentElement.innerHTML=cardPlaceholder('${proj.title}')">`
    : `<div class="card-thumbnail-placeholder">${cardPlaceholder(proj.title)}</div>`;

  const fitList = proj.cjFit || proj.values || [];
  const valueBadges = fitList.map(v => {
    const meta = (typeof CJ_FIT_TAGS !== 'undefined') ? CJ_FIT_TAGS[v] : null;
    return meta ? `<span class="badge badge-${meta.class}" style="background:${meta.bgColor};color:${meta.color};border:1px solid ${meta.color}40;font-weight:700;">${meta.label}</span>` : '';
  }).join('');

  const tags = proj.tags.slice(0, 5).map(t =>
    `<span class="badge badge-ghost">${t}</span>`
  ).join('');

  const hasYoutube = proj.links.youtube;
  const hasGithub = proj.links.github;

  return `
    <div class="project-card ${proj.isFeatured ? 'featured' : ''} reveal tilt-card"
         style="animation-delay:${delay}"
         data-project-id="${proj.id}">
      <div class="card-thumbnail">
        ${thumb}
        <div class="card-thumbnail-overlay"></div>
        <div class="card-type-badge">
          <span class="badge ${proj.isFeatured ? 'badge-blue' : 'badge-ghost'}">
            ${proj.isFeatured ? '★ MAIN' : 'SUB'}
          </span>
        </div>
        ${proj.media.videoUrl ? '<div class="card-play-btn">▶</div>' : ''}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="badge badge-ghost font-code" style="font-size:0.68rem">${proj.engine}</span>
          <span class="text-muted font-code" style="font-size:0.72rem">${proj.periodShort}</span>
        </div>
        ${valueBadges ? `<div class="card-meta" style="margin-top:0.4rem;gap:4px;">${valueBadges}</div>` : ''}
        <h4 class="card-title">${proj.title}
          ${proj.titleKr ? `<span style="color:#8B95A1;font-size:0.85em;font-weight:400"> · ${proj.titleKr}</span>` : ''}
        </h4>
        <p class="card-desc">${proj.summary}</p>
        ${proj.achievement ? `
          <div class="card-achievement">
            <span>🏆</span>
            <span>${proj.achievement}</span>
          </div>` : ''}
        <div class="card-tags">${tags}</div>
        <div class="card-date font-code">
          <span class="card-date-icon">📅</span>
          <span class="card-date-label">만든 날짜:</span>
          <span class="card-date-val">${proj.createdDate || proj.period || proj.periodShort || ''}</span>
        </div>
        <div class="card-footer">
          <div class="card-links" onclick="event.stopPropagation()">
            ${hasGithub ? `<a href="${proj.links.github}" target="_blank" class="btn btn-ghost btn-sm">GitHub</a>` : ''}
            ${hasYoutube ? `<a href="${proj.links.youtube}" target="_blank" class="btn btn-secondary btn-sm">▶ Demo</a>` : ''}
          </div>
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openProjectModalById('${proj.id}')">
            Deep-Dive →
          </button>
        </div>
      </div>
    </div>
  `;
}

function cardPlaceholder(title) {
  return `
    <div class="card-thumbnail-placeholder">
      <div class="placeholder-icon">🎨</div>
      <span style="font-size:0.75rem">${title}</span>
    </div>
  `;
}

// 전역 함수로 노출
window.openProjectModalById = function (id) {
  if (typeof PROJECTS_DATA === 'undefined') return;
  const proj = PROJECTS_DATA.find(p => p.id === id);
  if (proj && typeof openProjectModal === 'function') {
    openProjectModal(proj);
  }
};

// ─────────────────────────────────────────────
// 6. 필터 탭
// ─────────────────────────────────────────────
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      renderProjects(filter);
    });
  });
}

// ─────────────────────────────────────────────
// 7. CJ 핵심가치 카드
// ─────────────────────────────────────────────
function initCjValues() {
  const container = document.getElementById('values-container');
  if (!container || typeof CJ_FIT_TAGS === 'undefined') return;
  const cb = { convenience: '#006ECD', joy: '#FF9700', health: '#EF151E', onlyone: '#7928CA' };
  const ic = { convenience: '🔵', joy: '🟡', health: '🔴', onlyone: '🌸' };

  const ev = {
    convenience: ['VR HMD 90fps 방어 (URP 렌더패스 분석 & 다운샘플링)', 'Android ↔ FastAPI 비동기 파이프라인 구축', '컴포넌트+옵저버 패턴 확장성 설계'],
    joy:         ['3인 팀 VR 게임 1년 완주 졸업전시 런칭', '기하학 수학 프리미티브만으로 Homer Simpson 3D 완성', 'Stencil Buffer+FBO 오프스크린 렌더링 구현'],
    health:      ['DTW 시계열 기반 구화동작 매칭 97.8% 정밀도 달성', '이오름(Eorum) Android AI 구화학습 앱 개발', '제15회 숭실 캡스톤디자인 총장상(동상) 수상'],
    onlyone:     ['C++ 순수 코드 OpenGL VAO/VBO/FBO 제로베이스 구현', 'C++/OpenCV DICOM 의료영상 다단계 분할 파이프라인', '원시 원리를 직접 해결하는 ONLYONE 엔지니어링'],
  };

  let html = '';
  Object.entries(CJ_FIT_TAGS).forEach(([k, m]) => {
    const tc = cb[k] || '#1A1A1A';
    const ico = ic[k] || '';
    const li = (ev[k] || []).map(t => `<li style="margin-bottom:6px;line-height:1.45;">${t}</li>`).join('');

    html += `
      <div class="value-card reveal" style="background:#fff;border:1px solid #E5E8EB;border-top:4px solid ${tc};border-radius:14px;padding:24px;box-shadow:0 4px 16px rgba(0,0,0,0.05);display:flex;flex-direction:column;">
        <div style="color:${m.color};background:${m.bgColor};border-radius:9999px;display:inline-block;padding:4px 12px;font-size:11px;font-weight:800;margin-bottom:10px;align-self:flex-start;">
          ${ico} ${m.label}
        </div>
        <div style="color:#1A1A1A;font-size:1.05rem;font-weight:800;margin-bottom:6px;">${m.kr}</div>
        <p style="color:#4E5968;font-size:0.85rem;margin-bottom:12px;line-height:1.5;">${m.desc}</p>
        <ul style="color:#4E5968;font-size:0.82rem;padding-left:16px;margin:0;">${li}</ul>
      </div>
    `;
  });
  container.innerHTML = html;
}

// ─────────────────────────────────────────────
// 8. About 섹션 인터랙션 초기화
// ─────────────────────────────────────────────
function initAboutSection() {
  // 타임라인 및 소개 인터랙션은 HTML onclick 및 클래스 바인딩으로 구동
}

// ─────────────────────────────────────────────
// 9. 스크롤 진행 바
// ─────────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ─────────────────────────────────────────────
// 10. 카드 3D 틸트 효과
// ─────────────────────────────────────────────
function initCardTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -5;
      const ry = ((e.clientX - cx) / (rect.width / 2)) * 5;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
