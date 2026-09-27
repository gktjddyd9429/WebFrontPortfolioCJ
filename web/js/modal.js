/**
 * modal.js
 * 프로젝트 심층 기술 분석 모달 렌더링 & 제어
 */

// CJ Blossom 태그 시스템 호환
const VALUES_META = typeof CJ_FIT_TAGS !== 'undefined' ? CJ_FIT_TAGS : (typeof DAOU_FIT_TAGS !== 'undefined' ? DAOU_FIT_TAGS : {});

// ─────────────────────────────────────────────
// 모달 열기/닫기
// ─────────────────────────────────────────────
function openProjectModal(proj) {
  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('project-modal');
  if (!overlay || !modal) return;

  // 콘텐츠 렌더
  renderModalContent(proj, modal);

  // 표시
  overlay.classList.add('open');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // 첫 탭 버튼 활성화 및 스크롤 최상단 리셋
  modal.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  const firstTab = modal.querySelector('.modal-tab');
  if (firstTab) firstTab.classList.add('active');
  const modalBody = modal.querySelector('#modal-body');
  if (modalBody) modalBody.scrollTop = 0;

  // 이미지 비교 슬라이더 초기화
  setTimeout(() => initImageCompare(modal), 200);
}

function closeProjectModal() {
  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('project-modal');
  overlay?.classList.remove('open');
  modal?.classList.remove('open');
  document.body.style.overflow = '';
}

// ESC 키 및 오버레이 클릭으로 닫기
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modal-overlay')?.addEventListener('click', closeProjectModal);
  document.getElementById('modal-close-btn')?.addEventListener('click', closeProjectModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProjectModal();
  });
});

// ─────────────────────────────────────────────
// 모달 콘텐츠 렌더링
// ─────────────────────────────────────────────
function renderModalContent(proj, modal) {
  // 탭 설정: 트러블슈팅 탭은 데이터 있을 때만
  const hasTrouble = proj.troubleshooting && proj.troubleshooting.length > 0;
  const hasImpl = proj.implementations && proj.implementations.length > 0;

  // 헤더
  const header = modal.querySelector('#modal-header-content');
  if (header) {
    const fitList = proj.cjFit || proj.values || [];
    const valueBadges = fitList.map(v => {
      const meta = VALUES_META[v];
      return meta ? `<span class="badge badge-${meta.class}" style="background:${meta.bgColor};color:${meta.color};border:1px solid ${meta.color}40;font-weight:700;">${meta.label} · ${meta.kr}</span>` : '';
    }).join('');

    header.innerHTML = `
      <div class="modal-badges">${valueBadges}</div>
      <h2 class="modal-title">${proj.title}
        ${proj.titleKr ? `<span style="color:#8B95A1;font-weight:400;font-size:0.8em"> · ${proj.titleKr}</span>` : ''}
      </h2>
      <div class="modal-subtitle">
        <span><span class="icon">👤</span><strong style="color:#006ECD;">담당: ${proj.role}</strong></span>
        <span><span class="icon">👥</span>${proj.team}</span>
        <span><span class="icon">🔧</span>${proj.engine}</span>
        <span><span class="icon">📅</span>${proj.period}</span>
      </div>
    `;
  }

  // 탭 목록
  const tabsEl = modal.querySelector('#modal-tabs');
  if (tabsEl) {
    tabsEl.innerHTML = `
      <button class="modal-tab active" data-tab="overview">📋 개요</button>
      ${hasImpl ? '<button class="modal-tab" data-tab="impl">⚙️ 구현 상세</button>' : ''}
      ${hasTrouble ? '<button class="modal-tab" data-tab="trouble">🐛 트러블슈팅</button>' : ''}
    `;
    tabsEl.querySelectorAll('.modal-tab').forEach(tab => {
      tab.addEventListener('click', () => scrollToSection(modal, tab.dataset.tab));
    });
  }

  // 탭 패널들
  const body = modal.querySelector('#modal-body');
  if (body) {
    body.innerHTML = `
      ${renderOverviewPanel(proj)}
      ${hasImpl ? renderImplPanel(proj) : ''}
      ${hasTrouble ? renderTroublePanel(proj) : ''}
    `;
  }

  // 푸터 링크
  const footerLinks = modal.querySelector('#modal-footer-links');
  if (footerLinks) {
    const links = [];
    if (proj.links.github) links.push(`<a href="${proj.links.github}"  target="_blank" class="btn btn-ghost btn-sm">🐙 GitHub</a>`);
    if (proj.links.youtube) links.push(`<a href="${proj.links.youtube}" target="_blank" class="btn btn-secondary btn-sm">▶ YouTube</a>`);
    if (proj.links.notion) links.push(`<a href="${proj.links.notion}"  target="_blank" class="btn btn-ghost btn-sm">📄 Notion</a>`);
    footerLinks.innerHTML = links.join('');
  }
}

// ─────────────────────────────────────────────
// 개요 패널
// ─────────────────────────────────────────────
function renderOverviewPanel(proj) {
  const thumb = proj.media.thumbnail
    ? `<img src="${proj.media.thumbnail}" alt="${proj.title}" loading="lazy" onerror="this.style.display='none'">`
    : '';

  const rawVideoUrl = proj.media.videoUrl || '';
  const videoSrc = rawVideoUrl ? rawVideoUrl.replace('youtube.com', 'youtube-nocookie.com') : '';

  const videoSection = videoSrc
    ? `<div style="margin-bottom:var(--space-5)">
         <div style="position:relative;aspect-ratio:16/9;border-radius:var(--radius-md);overflow:hidden;background:var(--nexon-bg-surface)">
           <iframe src="${videoSrc}" frameborder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             referrerpolicy="strict-origin-when-cross-origin"
             allowfullscreen
             style="position:absolute;inset:0;width:100%;height:100%;border:none">
           </iframe>
         </div>
         ${proj.links.youtube ? `
           <div style="text-align:right;margin-top:0.35rem">
             <a href="${proj.links.youtube}" target="_blank" class="text-muted font-code" style="font-size:0.75rem;text-decoration:none">
               ※ 영상이 재생되지 않을 경우 <u>YouTube에서 직접 보기 ↗</u>
             </a>
           </div>
         ` : ''}
       </div>` : '';

  return `
    <div id="panel-overview" class="tab-panel">
      ${videoSection || (thumb ? `
        <div class="overview-hero">
          ${thumb}
          <div class="overview-hero-overlay"></div>
        </div>` : '')}

      <div class="overview-grid">
        <div class="overview-info-card">
          <div class="overview-info-label">장르</div>
          <div class="overview-info-val">${proj.genre}</div>
        </div>
        <div class="overview-info-card">
          <div class="overview-info-label">개발 기간</div>
          <div class="overview-info-val">${proj.duration}</div>
        </div>
        <div class="overview-info-card">
          <div class="overview-info-label">팀 구성</div>
          <div class="overview-info-val">${proj.team}</div>
        </div>
        <div class="overview-info-card">
          <div class="overview-info-label">담당 역할</div>
          <div class="overview-info-val">${proj.role}</div>
        </div>
      </div>

      <p class="overview-desc">${proj.summary}</p>

      ${proj.overview?.story ? `
        <div class="overview-story">
          <p>${proj.overview.story}</p>
        </div>` : ''}

      ${proj.achievement ? `
        <div class="ts-result-row" style="margin-bottom:var(--space-5)">
          <span>✅</span>
          <span>${proj.achievement}</span>
        </div>` : ''}

      <div class="overview-links">
        ${proj.links.github ? `<a href="${proj.links.github}"  target="_blank" class="btn btn-ghost">🐙 GitHub 소스코드</a>` : ''}
        ${proj.links.youtube ? `<a href="${proj.links.youtube}" target="_blank" class="btn btn-secondary">▶ 플레이 영상</a>` : ''}
        ${proj.links.notion ? `<a href="${proj.links.notion}"  target="_blank" class="btn btn-ghost">📄 Notion 문서</a>` : ''}
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────
// 구현 상세 패널
// ─────────────────────────────────────────────
function renderImplPanel(proj) {
  const items = proj.implementations.map((impl, i) => {
    const valueTag = (impl.valueTag && VALUES_META[impl.valueTag]) ? VALUES_META[impl.valueTag] : null;
    let contentHtml = '';

    if (impl.content) {
      let inList = false;
      impl.content.forEach((item, idx) => {
        if (typeof item === 'string') {
          if (!inList) {
            contentHtml += `<ul class="impl-desc-list">`;
            inList = true;
          }
          contentHtml += `<li>${item}</li>`;
        } else {
          if (inList) {
            contentHtml += `</ul>`;
            inList = false;
          }

          if (item.type === 'image') {
            const fitClass = item.fit ? `impl-image-${item.fit}` : '';
            contentHtml += `
              <div class="impl-image ${fitClass}">
                <img src="${item.src}" alt="${item.label}" loading="lazy" onerror="this.parentElement.style.display='none'">
              </div>
            `;
          } else if (item.type === 'compare') {
            contentHtml += renderCompareSlider(item);
          } else if (item.type === 'code') {
            contentHtml += `
              <div class="impl-code-image">
                <img src="${item.src}" alt="코드 스니펫" loading="lazy">
              </div>
            `;
            if (item.github) {
              contentHtml += `<a href="${item.github}" target="_blank" class="btn btn-ghost btn-sm" style="margin-top:0.5rem">🐙 소스 코드 보기</a>`;
            }
          }
        }
      });
      if (inList) contentHtml += `</ul>`;
    } else {
      // Legacy fallback
      let imagesHtml = '';
      if (impl.compareImages) {
        imagesHtml = renderCompareSlider(impl.compareImages);
      } else if (impl.images) {
        imagesHtml = renderImagesGrid(impl.images);
      }

      let descHtml = '';
      if (Array.isArray(impl.desc)) {
        const items = impl.desc.map(d => `<li>${d}</li>`).join('');
        descHtml = `<ul class="impl-desc-list">${items}</ul>`;
      } else {
        descHtml = `<p class="impl-text">${impl.desc}</p>`;
      }

      const codeHtml = impl.codeImage
        ? `<div class="impl-code-image"><img src="${impl.codeImage}" alt="코드 스니펫" loading="lazy"></div>`
        : '';

      const githubLink = impl.codeGithub
        ? `<a href="${impl.codeGithub}" target="_blank" class="btn btn-ghost btn-sm" style="margin-top:0.5rem">🐙 소스 코드 보기</a>`
        : '';

      contentHtml = imagesHtml + descHtml + codeHtml + githubLink;
    }

    return `
      <div class="impl-section">
        <h4 class="impl-section-title">
          <span class="num">${String(i + 1)}.</span>
          ${impl.title}
          ${valueTag ? `<span class="badge badge-${valueTag.class}" style="font-size:0.65rem">${valueTag.label}</span>` : ''}
        </h4>
        ${contentHtml}
      </div>
    `;
  }).join('');

  return `<div id="panel-impl" class="tab-panel">${items}</div>`;
}

function renderCompareSlider(compareImages) {
  return `
    <div class="img-compare" data-compare="true">
      <div class="img-compare-before">
        <img src="${compareImages.before.src}" alt="${compareImages.before.label}" loading="lazy"
             onerror="this.parentElement.style.display='none'">
      </div>
      <div class="img-compare-after">
        <img src="${compareImages.after.src}" alt="${compareImages.after.label}" loading="lazy"
             onerror="this.parentElement.style.display='none'">
      </div>
      <div class="img-compare-slider">
        <div class="img-compare-handle">⇔</div>
      </div>
      <div class="img-compare-label before-label">${compareImages.before.label}</div>
      <div class="img-compare-label after-label">${compareImages.after.label}</div>
    </div>
    <p class="text-muted font-code" style="font-size:0.7rem;text-align:center;margin-top:0.5rem">
      ← 드래그하여 비교 →
    </p>
  `;
}

function renderImagesGrid(images) {
  if (!images || images.length === 0) return '';
  if (images.length === 1) {
    return `
      <div class="impl-image" style="margin-bottom:var(--space-4)">
        <img src="${images[0].src}" alt="${images[0].label}" loading="lazy"
             onerror="this.parentElement.style.display='none'">
      </div>
    `;
  }
  return `
    <div class="impl-images-grid" style="margin-bottom:var(--space-4)">
      ${images.map(img => `
        <div class="impl-image">
          <img src="${img.src}" alt="${img.label}" loading="lazy"
               onerror="this.parentElement.style.display='none'">
          <p class="text-muted font-code" style="font-size:0.7rem;padding:0.5rem">${img.label}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// ─────────────────────────────────────────────
// 트러블슈팅 패널
// ─────────────────────────────────────────────
function renderTroublePanel(proj) {
  const items = proj.troubleshooting.map((ts, i) => {
    const valueTag = (ts.valueTag && VALUES_META[ts.valueTag]) ? VALUES_META[ts.valueTag] : null;
    return `
      <div class="troubleshoot-card" style="margin-bottom:var(--space-5)">
        <div class="ts-header">
          <span class="ts-icon">🐛</span>
          <h5>이슈 #${String(i + 1).padStart(2, '0')}
            ${valueTag ? `<span class="badge badge-${valueTag.class}" style="margin-left:0.5rem">${valueTag.label}</span>` : ''}
          </h5>
        </div>
        <div class="ts-body">
          <div class="ts-flow">
            <div class="ts-flow-step problem">
              <div class="ts-flow-step-icon problem">⚠</div>
              <div class="ts-flow-step-content">
                <div class="ts-flow-step-label">PROBLEM · 문제 정의</div>
                <div class="ts-flow-step-text">${ts.issue}</div>
              </div>
            </div>
            <div class="ts-flow-step analysis">
              <div class="ts-flow-step-icon analysis">🔍</div>
              <div class="ts-flow-step-content">
                <div class="ts-flow-step-label">ANALYSIS · 원인 분석</div>
                <div class="ts-flow-step-text">${ts.analysis}</div>
              </div>
            </div>
            <div class="ts-flow-step solution">
              <div class="ts-flow-step-icon solution">💡</div>
              <div class="ts-flow-step-content">
                <div class="ts-flow-step-label">SOLUTION · 해결 방안</div>
                <div class="ts-flow-step-text">${ts.solution}</div>
              </div>
            </div>
            <div class="ts-flow-step result">
              <div class="ts-flow-step-icon result">✅</div>
              <div class="ts-flow-step-content">
                <div class="ts-flow-step-label">RESULT · 최종 결과</div>
                <div class="ts-flow-step-text">${ts.result}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `<div id="panel-trouble" class="tab-panel">${items}</div>`;
}

// ─────────────────────────────────────────────
// 탭 버튼 클릭 시 스크롤 이동
// ─────────────────────────────────────────────
function scrollToSection(modal, tabId) {
  // 클릭한 탭 active 처리
  modal.querySelectorAll('.modal-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tabId);
  });

  const targetPanel = modal.querySelector(`#panel-${tabId}`);
  const modalBody = modal.querySelector('#modal-body');

  if (targetPanel && modalBody) {
    // modalBody 내에서 targetPanel의 위치로 스크롤
    modalBody.scrollTo({
      top: targetPanel.offsetTop - modalBody.offsetTop,
      behavior: 'smooth'
    });
  }
}

// ─────────────────────────────────────────────
// 이미지 비교 슬라이더 초기화
// ─────────────────────────────────────────────
function initImageCompare(container) {
  container.querySelectorAll('[data-compare="true"]').forEach(comp => {
    let dragging = false;
    const afterEl = comp.querySelector('.img-compare-after');
    const sliderEl = comp.querySelector('.img-compare-slider');

    function setPosition(x) {
      const rect = comp.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
      afterEl.style.clipPath = `inset(0 0 0 ${pct}%)`;
      sliderEl.style.left = `${pct}%`;
    }

    comp.addEventListener('mousedown', () => { dragging = true; });
    document.addEventListener('mouseup', () => { dragging = false; });
    document.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });

    comp.addEventListener('touchstart', e => { dragging = true; e.preventDefault(); }, { passive: false });
    document.addEventListener('touchend', () => { dragging = false; });
    document.addEventListener('touchmove', e => {
      if (dragging) setPosition(e.touches[0].clientX);
    }, { passive: true });

    // 초기 50%
    setPosition(comp.getBoundingClientRect().left + comp.getBoundingClientRect().width / 2);
  });
}
