/**
 * tech-icons.js
 * 인터랙티브 기술 아이콘 클릭 → 상세 카드 및 연관 포트폴리오 프로젝트 전개 시스템
 */

// ─────────────────────────────────────────────
// 기술 스택 데이터 (개발자 정보 ↔ 포트폴리오 연계)
// ─────────────────────────────────────────────
const TECH_DATA = {
  cpp: {
    name: 'C++',
    category: 'System Language · Simulation & Graphics',
    level: '★★★★☆',
    levelNum: '82',
    desc: '로우레벨 그래픽스 파이프라인과 시뮬레이션 시스템 직접 구현. Unity 없이 순수 C++로 3D 카메라 엔진 및 렌더링 파이프라인 밑바닥부터 구축.',
    shortDesc: 'Modern C++로 3D 카메라 엔진과 로우레벨 그래픽스 파이프라인 제로베이스 구축.',
    bullets: [
      'Modern C++17 STL 컨테이너/알고리즘',
      '메모리 관리 · 포인터 / 스마트 포인터',
      '오일러/쿼터니언 카메라 1인칭 구현',
      '영상 로우데이터 처리 파이프라인',
      '자료구조 직접 구현 (Segment, Point Cloud)'
    ],
    relatedProjects: [
      { id: 'seek-card', name: 'Seek the card (순수 C++ 1인칭 3D)' },
      { id: 'dicom', name: 'DICOM Segmentation (C++ 영상분할)' },
      { id: 'homer-simpson', name: 'Homer Simpson 3D (C++ 기하학 조립)' }
    ]
  },
  c: {
    name: 'C',
    category: 'System Language · Core Programming',
    level: '★★★★☆',
    levelNum: '80',
    desc: '포인터 연산 및 메모리 직접 관리(malloc/free) 기반 로우레벨 시스템 프로그래밍. 컴퓨터 아키텍처와 하드웨어 동작 원리에 대한 깊은 이해를 바탕으로 효율적인 데이터 구조 및 알고리즘 구현.',
    shortDesc: '포인터, 메모리 동적 할당, 로우레벨 자료구조 구현 및 시스템 프로그래밍 기본기 보유.',
    bullets: [
      '포인터 및 동적 메모리 직접 관리 (malloc/free)',
      '구조체 및 비트 연산 기반 저수준 데이터 패킹',
      '단일/이중 연결 리스트, 스택, 큐 등 자료구조 직접 구현',
      '메모리 누수 방지 및 세그멘테이션 폴트 디버깅',
      '운영체제 시스템 콜 및 프로세스 메모리 구조 이해'
    ],
    relatedProjects: [
      { id: 'seek-card', name: 'Seek the card (메모리 버퍼 제어)' }
    ]
  },
  sql: {
    name: 'SQL',
    category: 'Database · RDBMS · Data Modeling',
    level: '★★★☆☆',
    levelNum: '75',
    desc: '관계형 데이터베이스(RDBMS) 테이블 스키마 설계, 정규화(1~3NF), 복잡한 다중 테이블 JOIN 쿼리 작성 및 트랜잭션(ACID) 제어. 데이터 무결성 보장 및 쿼리 성능 고려.',
    shortDesc: 'RDBMS 테이블 모델링, 다중 JOIN/서브쿼리 작성, 트랜잭션 무결성 제어.',
    bullets: [
      '관계형 데이터베이스 스키마 설계 및 테이블 정규화',
      'SELECT, INNER/OUTER JOIN, GROUP BY, 서브쿼리 활용',
      '트랜잭션(Commit/Rollback, ACID 원칙) 무결성 관리',
      '인덱스(Index) 동작 원리 및 쿼리 최적화 기초',
      '백엔드 비즈니스 로직 연동을 위한 CRUD 파이프라인 구축'
    ],
    relatedProjects: [
      { id: 'eorum', name: '이오름 (학습 데이터 및 사용자 통계 연동)' }
    ]
  },
  vue: {
    name: 'Vue.js',
    category: 'Frontend · Web Framework',
    level: '★★★☆☆',
    levelNum: '72',
    desc: 'Vue.js(Vue 3) 컴포넌트 아키텍처 기반 반응형 웹 프론트엔드 UI 개발. Composition API, 반응형 상태 관리, Axios 비동기 REST API 통신 및 SPA 라우팅 구현.',
    shortDesc: 'Vue 3 Composition API 기반 반응형 컴포넌트 설계 및 비동기 REST API 연동.',
    bullets: [
      'Vue 3 Composition API (ref, reactive, computed)',
      '컴포넌트 분리 및 Props / Emit 단방향·양방향 데이터 흐름',
      'Axios 기반 비동기 HTTP 통신 및 백엔드 REST API 연동',
      'Vue Router 활용 클라이언트 사이드 SPA 라우팅',
      '반응형 UI 상태 관리 및 라이프사이클 훅 최적화'
    ],
    relatedProjects: [
      { id: 'eorum', name: '이오름 (웹 모니터링 대시보드 인터랙션)' }
    ]
  },
  csharp: {
    name: 'C#',
    category: 'Simulation Logic · Unity Scripting',
    level: '★★★★★',
    levelNum: '88',
    desc: 'Unity 기반 시뮬레이션 클라이언트의 핵심 언어로, 컴포넌트 아키텍처와 이벤트 시스템 설계. 코루틴·async/await로 실시간 시뮬레이션 흐름 안정적 제어.',
    shortDesc: 'Unity 클라이언트 핵심 언어로 컴포넌트 아키텍처와 비동기 로직 최적화 기반 안정적인 시뮬레이션 흐름 제어.',
    bullets: [
      'Unity 컴포넌트 / MonoBehaviour 아키텍처',
      'Action·Event 옵저버 패턴 설계',
      'Coroutine · async/await 비동기 최적화',
      'LINQ · 제네릭 컬렉션 자료 처리',
      'XML 데이터 파이프라인 자동 빌드 연동'
    ],
    relatedProjects: [
      { id: 'mute-brush', name: 'The Mute Brush_ (C# 전체 클라이언트 총괄)' },
      { id: 'carrot-mansion', name: 'Carrot Mansion (무한루프 & Raycast 시스템)' }
    ]
  },
  unity: {
    name: 'Unity (URP)',
    category: 'Simulation Engine · VR Development',
    level: '★★★★★',
    levelNum: '90',
    desc: 'URP(Universal Render Pipeline) 기반 커스텀 렌더 패스 설계 및 Meta Quest VR HMD 인터랙션 시스템 구축. 1년간 VR 시뮬레이션 메인 클라이언트 총괄 개발 및 90fps 안정적 방어.',
    shortDesc: 'URP 기반 커스텀 렌더 패스 설계 및 1년간 VR 메인 클라이언트 개발 총괄 (90fps 방어).',
    bullets: [
      'URP Custom Render Pass 직접 설계',
      'Meta Quest VR HMD 인터랙션 완성',
      '물리 시스템 · LineRenderer 활용',
      'Shader Graph · Material 커스터마이징',
      '1년 장기 프로젝트 메인 클라이언트 총괄'
    ],
    relatedProjects: [
      { id: 'mute-brush', name: 'The Mute Brush_ (VR 90fps 달성 · 졸업전시)' },
      { id: 'carrot-mansion', name: 'Carrot Mansion (공포 인터랙션 시뮬레이션)' }
    ]
  },
  opengl: {
    name: 'OpenGL',
    category: 'Graphics API · Low-level Rendering',
    level: '★★★★☆',
    levelNum: '80',
    desc: '순수 OpenGL VAO·VBO 로우레벨 렌더링 파이프라인 직접 제어. 3D Virtual Human 캐릭터 생성 및 FBO 기반 오프스크린 Post-Processing 파이프라인 완성.',
    shortDesc: 'OpenGL로 VAO/VBO 제어 및 FBO 오프스크린 후처리, 3D 기하학 렌더링 구현.',
    bullets: [
      'VAO · VBO 로우레벨 버퍼 직접 제어',
      'FBO 오프스크린 렌더링 · 포스트프로세싱',
      '기하학 도형 행렬 변환으로 3D 캐릭터 구성',
      '3×3 커널 필터 (Sobel, Blur, Laplacian)',
      '1인칭 카메라 · 투영 행렬 직접 구현'
    ],
    relatedProjects: [
      { id: 'seek-card', name: 'Seek the card (OpenGL FBO 오프스크린 파이프라인)' },
      { id: 'homer-simpson', name: 'Homer Simpson 3D (기하학 변환 3D 캐릭터)' }
    ]
  },
  opencv: {
    name: 'OpenCV',
    category: 'Computer Vision · Image Processing',
    level: '★★★★☆',
    levelNum: '78',
    desc: 'C++ 기반 OpenCV로 의료 영상 처리 및 컴퓨터 비전 파이프라인 구축. DICOM 로우데이터를 직접 처리하여 Watershed 알고리즘과 Otsu 이진화 기반 CT 세그멘테이션 시스템 완성.',
    shortDesc: 'C++ 기반 OpenCV로 DICOM 의료 영상 데이터 처리 및 세그멘테이션 시스템 완성.',
    bullets: [
      'DICOM 로우데이터 의료 CT 영상 처리',
      'Watershed + Otsu 이진화 세그멘테이션',
      'CLAHE 콘트라스트 제한 적응형 균일화',
      'DTW 시계열 매칭 제스처 인식',
      '$P Point-Cloud 3D 궤적 판정 알고리즘'
    ],
    relatedProjects: [
      { id: 'dicom', name: 'DICOM Segmentation (CT 폐영역 다단계 분할)' },
      { id: 'eorum', name: '이오름 (DTW 입모양 랜드마크 분석)' }
    ]
  },
  python: {
    name: 'Python',
    category: 'Backend · AI · Data Pipeline',
    level: '★★★☆☆',
    levelNum: '65',
    desc: 'Python을 통한 AI 기술 및 데이터 처리에 대한 경험을 쌓은 언어. FastAPI 비동기 파이프라인 구축 및 SSAFY AI 실습 진행.',
    shortDesc: 'Python으로 AI 파이프라인 구축, FastAPI 비동기 통신, 데이터 처리 경험 축적.',
    bullets: [
      'FastAPI 백엔드 API 설계 및 구현',
      '음성·영상 분석 AI 파이프라인 연동',
      'OpenCV 활용 영상 처리 스크립팅',
      'SSAFY 삼성 청년 SW AI 아카데미 이수 (2026.07~)',
      'AI 프롬프트 설계 및 검증 경험'
    ],
    relatedProjects: [
      { id: 'eorum', name: '이오름 (FastAPI 비동기 AI 파이프라인)' }
    ]
  },
  java: {
    name: 'Java',
    category: 'Object-Oriented · Backend & Android',
    level: '★★★☆☆',
    levelNum: '70',
    desc: '객체지향 설계 원칙을 준수하여 변경에 유연하고 확장에 열려 있는 코드를 Java로 구현. SSAFY 알고리즘 집중 훈련 및 백엔드 역량 강화.',
    shortDesc: '객체지향 설계 원리를 준수하여 유지보수 가능하고 확장 가능한 로직 및 Android 연동 구현.',
    bullets: [
      'Android 앱 개발 Java/Kotlin 기반',
      '자료구조 · 알고리즘 직접 구현',
      '객체지향 설계 원칙(SOLID) 적용',
      '컬렉션 프레임워크 · 제네릭 활용',
      '운영체제 · 네트워크 프로그래밍 이론'
    ],
    relatedProjects: [
      { id: 'eorum', name: '이오름 (Android 클라이언트 앱)' }
    ]
  },
  cuda: {
    name: 'CUDA',
    category: 'GPU Computing · Parallel Processing',
    level: '★★★☆☆',
    levelNum: '60',
    desc: 'NVIDIA CUDA를 통한 GPU 병렬 컴퓨팅 원리 학습 및 영상처리 가속화 탐구. 대용량 의료 CT 데이터 처리 속도 개선을 위한 병렬화 방법론 연구.',
    shortDesc: 'NVIDIA CUDA를 활용한 GPU 병렬 컴퓨팅 원리 학습 및 의료 영상 가속화 탐구.',
    bullets: [
      'CUDA 스레드 계층 구조 이해',
      'GPU 메모리 모델 · 공유 메모리 활용',
      '의료 영상 처리 병렬화 탐구',
      '커널 함수 · 그리드/블록 최적화',
      'CPU-GPU 데이터 전송 최소화 설계'
    ],
    relatedProjects: [
      { id: 'dicom', name: 'DICOM Segmentation (영상처리 병렬화 연구)' }
    ]
  },
  android: {
    name: 'Android Studio',
    category: 'Mobile Development · Android',
    level: '★★★☆☆',
    levelNum: '68',
    desc: 'Android Studio 기반 모바일 앱 개발. 이오름(Eorum) 프로젝트에서 AI 음성 분석 기반 청각 장애인 구화 학습 앱을 완성하여 총장상 수상.',
    shortDesc: 'Android Studio 기반 청각 장애인을 위한 AI 구화 학습 서비스 모바일 앱 개발.',
    bullets: [
      'Android Activity · Fragment 생명주기 관리',
      'RecyclerView · Adapter 패턴 구현',
      'Retrofit · HTTP 네트워크 통신',
      'AI 음성 분석 API 연동 파이프라인',
      '제15회 숭실 캡스톤디자인 총장상 수상'
    ],
    relatedProjects: [
      { id: 'eorum', name: '이오름 (AI 구화학습 앱 · 캡스톤 총장상)' }
    ]
  }
};

// ─────────────────────────────────────────────
// 현재 선택된 기술
// ─────────────────────────────────────────────
let _activeTech = null;

// ─────────────────────────────────────────────
// 기술 아이콘 클릭 핸들러 초기화
// ─────────────────────────────────────────────
function initTechIcons() {
  const stage = document.getElementById('tech-icon-stage');
  if (!stage) return;

  const buttons = stage.querySelectorAll('.tech-icon-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tech = btn.dataset.tech;
      if (_activeTech === tech) {
        // 같은 거 다시 클릭 → 닫기
        closeTechCard();
      } else {
        openTechCard(tech, btn);
      }
    });
  });
}

// ─────────────────────────────────────────────
// 기술 카드 열기 (개발자 역량 ↔ 포트폴리오 연계 UI)
// ─────────────────────────────────────────────
function openTechCard(techKey, clickedBtn) {
  const data = TECH_DATA[techKey];
  if (!data) return;

  _activeTech = techKey;

  const allBtns = document.querySelectorAll('.tech-icon-btn');
  allBtns.forEach(btn => {
    if (btn === clickedBtn) {
      btn.classList.add('is-active');
      btn.classList.remove('is-dimmed');
    } else {
      btn.classList.add('is-dimmed');
      btn.classList.remove('is-active');
    }
  });

  const zone = document.getElementById('tech-selected-desc-zone');
  const textEl = document.getElementById('tech-selected-desc-text');
  if (zone && textEl) {
    textEl.innerHTML = `
      <div style="font-size:0.92rem;line-height:1.6;color:#1A1A1A;">
        <span style="display:inline-block;padding:2px 8px;background:#EDF5FC;color:#006ECD;border-radius:4px;font-weight:800;font-size:0.8rem;margin-right:6px;">${data.name}</span>
        ${data.shortDesc}
      </div>
    `;
    zone.classList.add('open');
  }
}

// ─────────────────────────────────────────────
// 기술 카드 닫기
// ─────────────────────────────────────────────
function closeTechCard() {
  _activeTech = null;

  const zone = document.getElementById('tech-selected-desc-zone');
  if (zone) {
    zone.classList.remove('open');
  }

  const allBtns = document.querySelectorAll('.tech-icon-btn');
  allBtns.forEach(btn => {
    btn.classList.remove('is-active', 'is-dimmed');
  });
}
