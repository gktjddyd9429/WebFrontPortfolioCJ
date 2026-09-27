// CJ_FIT_TAGS - CJ Blossom Value Tag System
const CJ_FIT_TAGS = {
  convenience: { label: 'CONVENIENCE', kr: '편리 / 시스템', color: '#006ECD', bgColor: '#EDF5FC', class: 'convenience', desc: '초격차 최적화와 안정적인 시스템 엔지니어링' },
  joy: { label: 'JOY', kr: '즐거움 / 미디어', color: '#B86F00', bgColor: '#FFF6EB', class: 'joy', desc: '몰입감 있는 인터랙티브 경험과 미디어 기술' },
  health: { label: 'HEALTH', kr: '건강 / AI라이프', color: '#EF151E', bgColor: '#FFEBEC', class: 'health', desc: '사용자의 일상을 풍요롭게 하는 AI 솔루션' },
  onlyone: { label: 'ONLYONE', kr: '최초 / 차별화', color: '#7928CA', bgColor: '#F7EDFF', class: 'onlyone', desc: '남다른 기술적 집념과 원천 구현 역량' }
};

/**
 * projects-data.js
 * 하성용 포트폴리오 프로젝트 데이터 (Agent.md 기반 실측 데이터)
 */

const PROJECTS_DATA = [
  // ============================================================
  // [MAIN] The Mute Brush_ (침묵의 붓)
  // ============================================================
  {
    id: 'mute-brush',
    isFeatured: true,
    type: 'main',
    category: 'unity',
    title: 'The Mute Brush_',
    titleKr: '침묵의 붓',
    genre: 'VR 시뮬레이션 / 내러티브 체험',
    engine: 'Unity + URP + VR (Meta Quest)',
    period: '2024.06.01 ~ 2025.05.24',
    periodShort: '2024.06 – 2025.05',
    duration: '약 1년',
    team: '3인 팀 (클라이언트 1[본인], 기획 1, 3D 모델링 1)',
    role: '메인 클라이언트 프로그래머 (C# 전체 VR 로직 설계)',
    tags: ['Unity', 'C#', 'URP', 'VR', 'HLSL', 'Meta Quest', 'VR Optimization'],
    createdDate: '2024.06.01 ~ 2025.05.24',
    cjFit: ['convenience', 'joy'],
    values: ['convenience', 'joy'],
    summary: '치매에 걸린 노화가의 시점에서, VR 세계에서 붓을 이용해 기억을 그려 나가는 시뮬레이션 프로젝트. 스토리가 진행될수록 그려진 기억이 흐려지고 왜곡되어 가는 과정을 체험합니다.',
    achievement: 'VR HMD 90fps 실시간 성능 방어 | 오픈소스 URP 렌더 패스 코드 분석·수정',
    media: {
      thumbnail: 'assets/images/projects/mute-brush/mb_hero_thumb.jpg',
      screenshots: [
        'assets/images/projects/mute-brush/mb_texture_before.jpg',
        'assets/images/projects/mute-brush/mb_texture_after.jpg',
        'assets/images/projects/mute-brush/mb_portal_view.jpg',
        'assets/images/projects/mute-brush/mb_glitch_effect.jpg',
      ],
      videoUrl: 'https://www.youtube-nocookie.com/embed/njvaomx2ybs',
    },
    links: {
      github: 'https://github.com/gktjddyd/The-Mute-Brush_',
      youtube: 'https://www.youtube.com/watch?v=njvaomx2ybs',
      notion: '',
    },
    overview: {
      story: '플레이어는 붓으로 과거의 단편들을 복원하며 기억과 감정을 되살리지만, 스토리가 진행될수록 치매 증상이 심해져 그려진 기억이 흐려지고 왜곡되어 가는 과정을 체험합니다. 끝을 모르는 기억의 상실 속에서, 그래도 붓을 들어 마지막 기억을 그려보는 이야기.',
    },
    implementations: [
      {
        id: 'drawing',
        title: 'VR 3D 드로잉, 팔레트, 지우개 구현',
        valueTag: 'originality',
        content: [
          'VR을 이용해서 그림을 그리는 것을 기획에 맞춰 구현하게 됨. VR 핸드 컨트롤러 중지로 붓을 잡고 검지버튼을 누르면 그림이 그려짐.',
          '단순히 2D 평면에 그려지는 것이 아니라, 3D 공간으로 입체적으로 그려짐.',
          'Unity의 Line Renderer Component를 사용해서 개발.',
          '사용자가 그린 모든 선들을 좌표 데이터를 2중 리스트 구조로 저장하게 됨. (사용자가 그린 중간 데이터를 빠르게 수정[삭제]하기 때문)',
          '문제점: 라인이 너무 단조로움. 그려지는 라인에 질감이 없어 선이 예쁘게 안 보인다는 피드백이 들어옴.',
          { type: 'compare', before: { src: 'assets/images/projects/mute-brush/mb_texture_before.jpg', label: 'BEFORE - 단조로운 Unlit 라인' }, after: { src: 'assets/images/projects/mute-brush/mb_texture_after.jpg', label: 'AFTER - Normal Map + Lit Shader 붓터치' } },
          '해결 방법: 붓 자국이 표현된 Texture와 입체감을 더하는 Normal Map으로 Material을 만들고 이를, LineRender에 적용할 수 있게 수정.',
          '라인이 한 쪽면에서 안보이면 안되니까 Double side로 보일 수 있게 개발.',
          'Normal Map이 잘 적용되게 해야 하니 Lit Shader로 구현. Tiling과 Offset UV 값을 잘 조정하여 라인 텍스쳐가 어긋나지 않도록 설정.',
          { type: 'code', src: 'assets/images/projects/mute-brush/mb_drawing_code.png', github: 'https://github.com/gktjddyd/The-Mute-Brush_/tree/main/3D_Pen_drawing' },
          { type: 'image', src: 'assets/images/projects/mute-brush/mb_palette_view.jpg', label: '3D 공간 팔레트 시스템' },
          '직관적인 3D 팔레트 시스템을 구현함. 사용자가 붓을 팔레트에 직접 접촉 시켜 색상을 선택하면, 붓 끝의 물감 색상이 해당 색으로 변경되어 플레이어가 현재 선택한 색을 쉽게 인지할 수 있음.',
          '붓 끝 Sphere Collider가 팔레트의 특정 색상 Collider에 닿으면, 충돌을 감지하여 붓의 색상이 즉시 변경. 왼손/오른손잡이 옵션 지원 (붓을 쥔 반대 손에 자동 팔레트 생성).',
          '지우개 버튼 복잡도 문제로 토글 지우개 삭제 → "치매가 심화되면 덧그릴수록 기존 기억이 지워진다"는 독창적인 시뮬레이션 인터랙션 내러티브로 전환.',
          { type: 'image', src: 'assets/images/projects/mute-brush/mb_eraser_deleted.jpg', label: '지우개 덧칠 페인팅 삭제 연출' },
          { type: 'image', src: 'assets/images/projects/mute-brush/mb_dementia_worse.jpg', label: '치매 심화 - 기억 왜곡/지워지는 연출' },
          '그려져 있는 선의 Bounding Box 와 붓 끝이 충돌하면, 선과 붓 끝 Sphere Collider가 충돌하는지 Segment Sphere Intersection를 활용해 검사하여 Vector3 위치 정보 리스트를 삭제하도록 함.',
        ]
      },
      {
        id: 'portal',
        title: 'VR 장면 전환을 위한 포탈 구현',
        valueTag: 'originality',
        content: [
          '문 너머로 이동할 목적지가 미리 보이는 포탈 시스템을 개발하여, 플레이어가 문을 통과해 자연스럽게 갈 수 있도록 제작.',
          '문제점: Render Texture를 사용했으나 VR의 Multi-pass 렌더링 환경에서 시선과 화면이 어긋나 극심한 멀미 유발.',
          '포탈 효과를 구현하기 위해 Stencil Buffer를 사용하여 포탈 영역의 픽셀만 렌더링 되도록 마스킹.',
          '문 안 Quad Material에 Stencil ID를 설정해 레이어 마스크를 생성하고, 유니티 레이어를 통해 문 너머의 공간이 마스킹 된 영역에만 보이도록 적용.',
          { type: 'image', src: 'assets/images/projects/mute-brush/mb_portal_view.jpg', label: 'Stencil Buffer 포탈 렌더링 결과' },
          '포탈 너머의 세계를 구현하기 위해 맵을 복제하여 포탈 뷰 전용 맵을 만들고, 이 맵에 Stencil Buffer Layer를 적용, 성능부하를 위해 포탈 뷰에서 보이지 않는 오브젝트들 삭제.',
          '포탈이랑 플레이어가 충돌하면 본 맵의 특정 위치로 즉각 이동. 이를 통해 플레이어가 VR 시점에서 위화감 없이 자연스럽게 포탈을 이동하는 연출이 가능해짐.',
          { type: 'code', src: 'assets/images/projects/mute-brush/mb_portal_code.png', github: 'https://github.com/gktjddyd/The-Mute-Brush_/tree/main/Portal_Stencil_Buffer' }
        ]
      },
      {
        id: 'dialogue',
        title: 'VR 다이얼로그 GUI, Interaction',
        valueTag: 'human',
        content: [
          '다이얼로그 시스템은 인스펙터창에서 String 배열에 입력한 Text를 출력.',
          '플레이어의 몰입감을 높이기 위해, 시선(Gaze)을 활용한 상호작용 방식 도입.',
          'Raycast를 활용하여 설명이 필요한 특정 오브젝트를 응시할 때만 다이얼로그가 나타나게 구현.',
          { type: 'image', src: 'assets/images/projects/mute-brush/mb_dialogue_gaze.jpg', label: 'Gaze 시선 감지 다이얼로그 UI' },
          '플레이어가 맵 안에서 중요한 텍스트를 놓치는 문제를 방지해야 한다고 생각함. 현재 진행중인 상황을 텍스트로 출력하여 안내하는 다이얼로그 시스템을 구현.',
          '꼭 필요한 정보가 담긴 문구는 플레이어가 해당구역 Box collider 안에 있고, 대상 오브젝트를 봐야 이벤트 작동되도록 구현.',
          { type: 'image', src: 'assets/images/projects/mute-brush/mb_dialogue_world.jpg', label: '3D 공간 월드 텍스트 연출' },
          '플레이어가 시선을 돌리더라도 대화창을 놓치지 않도록, 텍스트가 시야를 따라 자동으로 이동하도록 구현.',
          '텍스트 오브젝트 (현재 위치)와 플레이어가 바라보는 곳(목표 위치)으로 선형 보간(Vector3.Lerp) 하는데, 적절한 속도에 맞춰 선형 보간 되도록 함. LookAt으로 대화창이 항상 플레이어를 바라보도록 자동 회전 처리.',
          { type: 'code', src: 'assets/images/projects/mute-brush/mb_dialogue_code.png', github: 'https://github.com/gktjddyd/The-Mute-Brush_/tree/main/VR_TextDialogue_System' },
          { type: 'code', src: 'assets/images/projects/mute-brush/mb_follow_camera_code.png', github: 'https://github.com/gktjddyd/The-Mute-Brush_/tree/main/VR_TextDialogue_System' }
        ]
      },
      {
        id: 'gesture',
        title: '제스쳐 인식',
        valueTag: 'challenge',
        content: [
          '플레이어가 VR 핸드 컨트롤러를 사용해 제스쳐 인식을 할 수 있도록 구현.',
          'P Dollar Point-Cloud Recognizer를 통해 플레이어가 주어진 제스쳐를 하면 해당 동작이 인식 됨.',
          '동작이 인식 되었을 때, 어떤 동작을 인식했는지와 동작 일치율을 반환 해줌.',
          { type: 'image', src: 'assets/images/projects/mute-brush/mb_gesture_hint.jpg', label: '제스처 궤적 힌트 화살표 연출' },
          '제스쳐 인식을 통해 다음 이벤트로 넘어가거나, 그림(기억) 지키기 퀘스트를 완수할 수 있도록 구현.',
          '제스쳐를 학습한 데이터는 XML 파일로 저장됨. XML 파일이 저장되는 경로는 Resources에 저장해서 Build 했을 때도 동작이 잘 되도록 개발.',
          { type: 'image', src: 'assets/images/projects/mute-brush/mb_gesture_debug.png', label: '제스처 일치율 0.9057 콘솔 로그', fit: 'natural' },
          '방향 벡터의 길이가 0일 때 발생하는 연산 오류를 방지하기 위해 루트 연산이 없는 sqrMagnitude로 개선.',
          'Quaternion 회전 행렬 변환 함수로 오브젝트가 사용자를 바라보게 구현. 이로 인해 Gimbal lock 현상 없이 원하는 각도로 보정 되도록 개발.',
          { type: 'code', src: 'assets/images/projects/mute-brush/mb_gesture_code.png', github: 'https://github.com/gktjddyd/The-Mute-Brush_/tree/main/Gesture_Recognize' }
        ]
      },
      {
        id: 'glitch',
        title: 'Optimize Glitch Frame Drop',
        valueTag: 'passion',
        content: [
          '프로젝트의 분위기를 전환하기 위해, Post Processing을 통해 Glitch 효과를 추가하여 시각적인 왜곡을 연출.',
          '문제점: VR HMD 화면에서 심각한 프레임 지연이 발생하여 플레이가 어려움. 프레임 드랍으로 인해 사용자가 멀미를 느낄 정도의 렌더링 지연이 발생함.',
          { type: 'image', src: 'assets/images/projects/mute-brush/mb_glitch_effect.jpg', label: '글리치 시각 왜곡 연출 씬' },
          '해결 방법: 글리치(Glitch) 이펙트 적용 시, 성능 저하의 주요 원인이었던 매 프레임 처리 부하를 줄이기 위해 다운샘플링 및 프레임 스킵 기능을 추가.',
          '기존 오픈소스인 Kino Glitch URP 렌더 패스 코드를 수정하여 최적화.',
          '글리치 효과 적용 전후의 프레임 차이가 사용자가 인지하기 어려울 정도로 개선. VR 환경에서도 안정적인 프레임 유지가 가능해져, 멀미 현상이 크게 완화.',
          { type: 'code', src: 'assets/images/projects/mute-brush/mb_glitch_code.png', github: 'https://github.com/gktjddyd/The-Mute-Brush_/tree/main/Optimize_Glitch_Effect' }
        ]
      },
      {
        id: 'footstep',
        title: 'Foot Step Sound',
        valueTag: 'human',
        content: [
          '컨트롤러의 조이스틱 입력과 플레이어의 실제 이동 거리를 동시에 감지하여, 벽에 막힌 채 조이스틱만 누르는 경우에는 발소리가 나지 않도록 구현.',
          '타이머를 두어, 매 프레임 소리가 나는 것이 아니라 일정한 걸음 간격마다 한 번씩 발소리가 재생.',
          '플레이어의 발밑으로 Raycast를 발사하여 닿은 바닥의 태그(floor, water, stone)를 실시간으로 감지.',
          '감지된 태그에 따라 서로 다른 오디오 클립 배열을 배정하고, 그 안에서 소리를 랜덤하게 재생하여 단조로운 발소리가 반복되지 않고 자연스럽게 들리도록 구현.',
          { type: 'code', src: 'assets/images/projects/mute-brush/mb_footstep_code.png', github: 'https://github.com/gktjddyd/The-Mute-Brush_/tree/main/FootStep' }
        ]
      },
      {
        id: 'lightmaps',
        title: 'Baked lightmaps, Post-Processing',
        valueTag: 'originality',
        content: [
          'VR 환경에서 높은 프레임률을 안정적으로 유지하기 위해 라이트맵 베이킹 기술을 적용.',
          '실시간 연산 부하를 최소화하면서 3D 그래픽 품질을 극대화하기 위해 1024x1024 BC6H compressed 라이트맵 베이킹 및 Baked GI 적용.',
          '실시간 조명 연산의 부하를 최소화. Baked Global Illumination으로 인해 3D 오브젝트들의 퀄리티 향상.',
          { type: 'image', src: 'assets/images/projects/mute-brush/mb_baked_lightmaps.png', label: '라이트맵 베이킹 인스펙터' },
          '프로젝트의 전반적인 분위기와 시각적 퀄리티를 향상시키기 위해 포스트 프로세싱을 적극 활용.',
          '블러, 글리치, 색상 필터링 같은 시각적 효과를 구현하여 연출.'
        ]
      }
    ],
    troubleshooting: [
      {
        issue: 'VR Multi-pass 렌더링 환경에서 Render Texture 사용 시 시선 불일치로 극심한 멀미 유발',
        analysis: 'VR의 좌안/우안 각각 다른 뷰포트를 렌더링하는 Multi-pass 구조에서, Render Texture가 단일 뷰포트 기준으로 갱신되어 눈과 화면이 어긋나는 현상 확인',
        solution: 'Stencil Buffer 마스킹 기술로 전환. 문 안쪽 Quad에 Stencil ID 부여 후 해당 픽셀에만 포탈 맵을 렌더링. 비가시 오브젝트 컬링으로 부하 최소화',
        result: '위화감 없는 VR 공간 전환 달성. 멀미 완전 해결',
        valueTag: 'challenge',
      },
      {
        issue: 'Kino Glitch Post-Processing 적용 시 VR HMD에서 극심한 프레임 드랍 및 멀미 재발',
        analysis: '오픈소스 Kino Glitch의 URP Render Pass가 VR 환경의 고해상도 더블 렌더링에 맞게 최적화되지 않아 GPU 과부하 발생 확인',
        solution: 'URP Render Pass 코드를 직접 수정. downsampleFactor를 활용한 렌더 타깃 다운샘플링 및 프레임 스킵 기법 추가 구현',
        result: '글리치 연출 적용 시에도 72/90fps 안정 방어. VR 멀미 현상 완벽 제거',
        valueTag: 'passion',
      },
    ],
  },

  // ============================================================
  // [SUB 1] 이오름 (Eorum)
  // ============================================================
  {
    id: 'eorum',
    isFeatured: false,
    type: 'sub',
    category: 'other',
    title: '이오름 (Eorum)',
    titleKr: '이오름',
    genre: 'AI 기반 청각장애인 보조 앱',
    engine: 'Android Studio, FastAPI, OpenCV, Docker',
    period: '2024 (캡스톤디자인 프로젝트)',
    periodShort: '2024',
    duration: '약 4개월',
    team: '3인 팀 (프론트엔드 전담, DTW 알고리즘, AI 프롬프트 설계)',
    role: '안드로이드 프론트엔드 + DTW 알고리즘 구현',
    tags: ['Android', 'FastAPI', 'OpenCV', 'DTW', 'AI', 'Docker'],
    createdDate: '2024 (캡스톤디자인)',
    cjFit: ['health', 'convenience', 'onlyone'],
    values: ['health', 'convenience', 'onlyone'],
    summary: '청각 장애인의 원활한 소통을 돕는 AI 기반 입모양(구화) 분석 및 발음 교정 학습 애플리케이션. 숭실 캡스톤디자인 공학 경진대회 총장상(동상) 수상.',
    achievement: 'Android + FastAPI AI 파이프라인 완성 | 캡스톤 총장상(동상) | DTW 97.8% 정밀도',
    media: {
      thumbnail: 'assets/images/projects/eorum/eorum_mouth.jpg',
      screenshots: [
        'assets/images/projects/eorum/eorum_mouth.jpg',
        'assets/images/projects/eorum/eorum_score.jpg',
        'assets/images/projects/eorum/eorum_feedback.jpg',
      ],
      videoUrl: '',
    },
    links: {
      github: 'https://github.com/naboyeong/Eorum',
      youtube: '',
      notion: '',
    },
    overview: {
      story: '청각 장애인이 입모양(구화)으로 소통을 학습할 수 있도록 AI가 발음 유사도를 실시간으로 분석하고 피드백을 제공하는 앱.',
    },
    implementations: [
      {
        id: 'dtw',
        title: 'DTW(Dynamic Time Warping) 알고리즘 구화 분석',
        valueTag: 'human',
        content: [
          '녹음을 통한 발음 피드백 UI 개발.',
          '카메라로 촬영한 영상을 입모양 분석을 통해 유사도 점수 측정 기능 개발.',
          { type: 'image', src: 'assets/images/projects/eorum/eorum_mouth.jpg', label: '구화 학습 및 입모양 카메라 인식 UI' },
          '카메라 영상에서 입모양 랜드마크를 추출하고 발화 속도 차이에 강건한 DTW(Dynamic Time Warping) 시계열 매칭 알고리즘을 구현하여 정밀 유사도 채점(예: 91.8% 발음 일치율).',
          '추출된 입모양 시계열 데이터의 정확한 매칭과 유사도 측정을 위한 DTW(Dynamic Time Warping) 알고리즘 구현.',
          { type: 'image', src: 'assets/images/projects/eorum/eorum_score.jpg', label: 'DTW 시계열 분석 점수 측정 UI' },
          '음성 녹음 데이터를 기반으로 유의미한 발음 교정 결과를 도출해내는 AI 피드백 프롬프트 설계.',
          { type: 'image', src: 'assets/images/projects/eorum/eorum_feedback.jpg', label: 'AI 피드백 및 발음/혀 위치 가이드' },
          '안드로이드 클라이언트와 FastAPI 백엔드 간 대용량 멀티미디어 비동기 전송을 위한 REST API 파이프라인 구축 및 실시간 AI 발음 피드백 UI 제작.',
          '클라이언트와 백엔드 간의 대용량 영상/음성 데이터 통신 파이프라인 구축 및 연동.'
        ]
      }
    ],
    troubleshooting: [],
  },

  // ============================================================
  // [SUB 2] Carrot Mansion (캐럿 맨션)
  // ============================================================
  {
    id: 'carrot-mansion',
    isFeatured: false,
    type: 'sub',
    category: 'unity',
    title: 'Carrot Mansion',
    titleKr: '캐럿 맨션',
    genre: '1인칭 공포 인터랙션 시뮬레이션',
    engine: 'Unity, C#',
    period: '2024.08',
    periodShort: '2024.08',
    duration: '1개월',
    team: '1인 개발',
    role: '기획 + 클라이언트 개발 전담',
    tags: ['Unity', 'C#', 'Horror', 'Endless Hallway'],
    createdDate: '2024.08',
    cjFit: ['joy', 'convenience'],
    values: ['joy', 'convenience'],
    summary: '낯선 저택에서 깨어난 주인공이 집안의 물품들과 상호작용하며 순차적으로 해금되는 기이한 이상 현상을 극복하고 탈출하는 1인칭 공포 인터랙션 시뮬레이션.',
    achievement: '텔레포트 기반 무한 루프 시스템 설계 | Raycast 트리거 누락 트러블슈팅 해결',
    media: {
      thumbnail: 'assets/images/projects/carrot-mansion/cm_thumb.jpg',
      screenshots: [
        'assets/images/projects/carrot-mansion/cm_monsters.jpg',
        'assets/images/projects/carrot-mansion/cm_endless_hallway.jpg',
        'assets/images/projects/carrot-mansion/cm_loop_code.png',
      ],
      videoUrl: 'https://www.youtube-nocookie.com/embed/C_BWhqFXEhw',
    },
    links: {
      github: '',
      youtube: 'https://youtu.be/C_BWhqFXEhw',
      notion: '',
    },
    overview: {
      story: '낯선 저택에서 깨어난 주인공이 물품들과 상호작용하며 기이한 현상을 해결하고 탈출을 시도하는 1인칭 공포 인터랙션 시뮬레이션.',
    },
    implementations: [
      {
        id: 'endless',
        title: '텔레포트 기반 끝없는 복도 무한 루프',
        valueTag: 'challenge',
        content: [
          '플레이어가 해당 복도에 진입하게 되면 사실적인 텍스쳐가 입혀진 복도 공간을 마주함. 플레이어는 똑같은 복도 길을 계속 맴돌게 됨.',
          { type: 'image', src: 'assets/images/projects/carrot-mansion/cm_endless_hallway.jpg', label: '끝없는 복도 전경' },
          '조명이 닿지 않는 복도 끝 어두운 지점에 보이지 않는 트리거(Raycast)를 배치.',
          '플레이어가 이 트리거와 충돌하는 순간, 플레이어의 Position을 즉시 복도의 시작 지점으로 강제 순간이동 시킴.',
          '순간이동 시킬 때 Character Controller 컴포넌트를 잠시 Off시켜야 텔레포트 가능.',
          '순간이동과 함께 조명이 켜지는 사운드 이펙트를 재생하여, 마치 방금 지나온 길을 다시 걷고 있다는 착각을 줌.',
          '무한 복도를 통과하여 루프가 발생할 때마다 currentIndex 값을 1씩 증가시킴. 이 카운트 값을 조건으로 사용하여, 플레이어가 복도를 반복할수록 점차 다른 공포 이벤트를 마주하도록 설계.',
          { type: 'image', src: 'assets/images/projects/carrot-mansion/cm_monsters.jpg', label: '저택 이상 현상 씬' },
          '하나의 Raycast로 처리를 하니 간혹가다 충돌 처리가 무시될 때가 있음. Ray를 여러 번 쏘아 감지 확률을 높이거나, 혹은 BoxCollider 트리거 설정을 해결방안으로 제시.',
          { type: 'code', src: 'assets/images/projects/carrot-mansion/cm_loop_code.png', label: '텔레포트 & 루프 카운트 코드' }
        ]
      }
    ],
    troubleshooting: [
      {
        issue: 'currentIndex 루프 상태와 연동한 순차적 공포 이벤트 발동 시 단일 Raycast 프레임 누락 현상',
        analysis: '빠른 이동 속도에서 단일 Raycast가 트리거 영역을 건너뛰는 프레임 단위 누락 발생',
        solution: '감지 영역 보강: 다중 Raycast 배치 및 BoxCollider 트리거 병행 설계로 감지 안정성 확보',
        result: '루프 기반 공포 이벤트 순차 발동 100% 신뢰성 달성',
        valueTag: 'challenge',
      },
    ],
  },

  // ============================================================
  // [SUB 3] Seek the card (카드 탐색)
  // ============================================================
  {
    id: 'seek-card',
    isFeatured: false,
    type: 'sub',
    category: 'opengl',
    title: 'Seek the card',
    titleKr: '카드 탐색',
    genre: '3D 탐색 퍼즐 / 방 탈출',
    engine: 'C++, OpenGL, GLSL',
    period: '2024.05',
    periodShort: '2024.05',
    duration: '약 3주',
    team: '1인 개발',
    role: '렌더링 파이프라인 및 카메라 시스템 전담',
    tags: ['C++', 'OpenGL', 'GLSL', '1인칭 카메라', 'FBO', 'Kernel Filter'],
    createdDate: '2024.05',
    cjFit: ['onlyone', 'convenience'],
    values: ['onlyone', 'convenience'],
    summary: 'OpenGL을 기반으로 구축된 3D 스테이지에서 숨겨진 단서 카드를 찾아 비밀번호를 풀고 방을 탈출하는 3D 그래픽스 탐색 퍼즐 프로젝트.',
    achievement: '순수 C++/OpenGL FBO 포스트프로세싱 파이프라인 직접 구현',
    media: {
      thumbnail: 'assets/images/projects/seek-card/sc_thumb.jpg',
      screenshots: [
        'assets/images/projects/seek-card/sc_village.jpg',
        'assets/images/projects/seek-card/sc_camera_code.png',
        'assets/images/projects/seek-card/sc_postprocess_before.jpg',
        'assets/images/projects/seek-card/sc_postprocess_after.jpg',
      ],
      videoUrl: 'https://www.youtube-nocookie.com/embed/c1g3beWfdfM',
    },
    links: {
      github: 'https://github.com/gktjddyd/Seek-the-card/tree/main/CodeCollection',
      youtube: 'https://youtu.be/c1g3beWfdfM',
      notion: '',
    },
    overview: {
      story: '순수 C++과 OpenGL로 1인칭 카메라와 FBO 포스트프로세싱 파이프라인을 직접 구현한 그래픽스 심화 프로젝트.',
    },
    implementations: [
      {
        id: 'camera',
        title: '1인칭 카메라 시스템 구현',
        valueTag: 'challenge',
        content: [
          '카메라 무빙을 1인칭 시점으로 구현하고 싶어 오일러 각(Euler angles)을 활용해 이를 구현.',
          { type: 'image', src: 'assets/images/projects/seek-card/sc_village.jpg', label: '3D 스테이지 마을 전경' },
          '마우스 입력을 받아 Yaw(좌우 회전) 및 Pitch(상하 회전) 값을 계산하여 카메라의 CameraFront 벡터를 실시간으로 갱신.',
          '삼각함수 라디안 연산으로 CameraFront 벡터를 계산하며, Pitch 제한(-55° ~ 55°)을 두어 화면이 뒤집히는 현상을 방지.',
          '키보드 입력(W, A, S, D)과 이 cameraFront 벡터와 cameraUp 벡터의 외적을 이용해 3D 공간을 자유롭게 이동하는 1인칭 카메라 스타일의 카메라 로직을 구현.',
          { type: 'code', src: 'assets/images/projects/seek-card/sc_camera_code.png', label: '오일러 각 FPS 카메라 코드' }
        ]
      },
      {
        id: 'fbo',
        title: '포스트 프로세싱 구현',
        valueTag: 'challenge',
        content: [
          'C++과 OpenGL로 FBO(Frame Buffer Object)를 생성 3D 씬 전체를 텍스처에 렌더링하여 카메라 화면에 출력.',
          '3D 씬 전체를 FBO 텍스처로 오프스크린 렌더링한 후 스크린 Quad에 매핑.',
          { type: 'compare', before: { src: 'assets/images/projects/seek-card/sc_postprocess_before.jpg', label: 'BEFORE (원본)' }, after: { src: 'assets/images/projects/seek-card/sc_postprocess_after.jpg', label: 'AFTER (3x3 엣지 필터)' } },
          'GLSL 3×3 커널(Kernel)을 활용하여 샤프닝, 가우시안 블러, 엣지 검출 필터링 직접 프로그래밍.',
          '샤프닝, 블러, 엣지 필터링을 수행하는 Post processing 구현.'
        ]
      }
    ],
    troubleshooting: [],
  },

  // ============================================================
  // [SUB 4] 3D Virtual Human - Homer Simpson
  // ============================================================
  {
    id: 'homer-simpson',
    isFeatured: false,
    type: 'sub',
    category: 'opengl',
    title: 'Homer Simpson 3D',
    titleKr: '호머 심슨 3D 캐릭터',
    genre: '3D 그래픽스 수학 모델링',
    engine: 'C++, OpenGL, GLUT',
    period: '2024.04',
    periodShort: '2024.04',
    duration: '약 2주',
    team: '4인 팀 (하반신 파트, 텍스처, 카메라 전담)',
    role: '하반신 기하학 프리미티브 조립 + UV 텍스처 매핑 + 카메라 시스템',
    tags: ['C++', 'OpenGL', 'GLUT', 'UV 매핑'],
    createdDate: '2024.04',
    cjFit: ['joy', 'onlyone'],
    values: ['joy', 'onlyone'],
    summary: '상용 3D 모델(FBX 등)을 전혀 사용하지 않고 순수 C++과 OpenGL 수학 프리미티브만을 조립하여 구현한 호머 심슨 3D 캐릭터 프로젝트.',
    achievement: '3D 에셋 없이 기하학 수학 프리미티브만으로 완전한 3D 캐릭터 완성',
    media: {
      thumbnail: 'assets/images/projects/homer-simpson/homer_simpson_render.jpg',
      screenshots: [
        'assets/images/projects/homer-simpson/homer_simpson_render.jpg',
        'assets/images/projects/homer-simpson/homer_pants_render.jpg',
      ],
      videoUrl: '',
    },
    links: {
      github: 'https://github.com/Graphics-Project-Homor-Simpson/Graphics-Project/blob/main/new.cpp',
      youtube: '',
      notion: '',
    },
    overview: {
      story: '3D 에셋 파일 없이 구(Sphere), 원통(Cylinder), 캡슐(Capsule) 등 기하학 프리미티브의 행렬 변환만으로 조립한 3D 캐릭터.',
    },
    implementations: [
      {
        id: 'spherical',
        title: '구면 좌표계(Spherical Coordinates) 궤도 카메라',
        valueTag: 'challenge',
        content: [
          '카메라는 구면 좌표계를 활용해 구 궤도로 움직임. [카메라 줌 인, 줌 아웃이 가능]',
          '구 궤도를 회전하는 3인칭 궤도 카메라 및 Zoom In/Out 로직 구현.',
          { type: 'image', src: 'assets/images/projects/homer-simpson/homer_simpson_render.jpg', label: '호머 심슨 3D 모델링 전체 모습' }
        ]
      },
      {
        id: 'primitive',
        title: '기하학 프리미티브 계층 변환 & UV 텍스처 매핑',
        valueTag: 'challenge',
        content: [
          '상용 3D 모델(FBX 등)을 전혀 사용하지 않고 순수 C++과 OpenGL 수학 프리미티브만으로 조립.',
          '바지는 halfSphere(허리)와 Cylinder(다리)로 구성.',
          '신발은 Quad (깔창), Cube(굽), Half Circle(구두 발볼), capsule(구두 윗부분)로 나누어 이동, 회전, 스케일링 transform을 적용해 구현.',
          '원통/평면 UV 좌표계를 수동 계산하여 청바지 텍스처 매핑.',
          { type: 'image', src: 'assets/images/projects/homer-simpson/homer_pants_render.jpg', label: '하반신 기하학 프리미티브 조립 & 청바지 UV 텍스처 매핑' },
          '바지의 UV좌표 설정 후 청바지 텍스쳐를 가져와 매핑.',
          'HalfSphere(허리), Cylinder(다리), Quad(깔창), Cube(굽), HalfCircle(발볼), Capsule(발등)을 계층적 Matrix Transform(이동, 회전, 스케일링)으로 조립.'
        ]
      }
    ],
    troubleshooting: [],
  },

  // ============================================================
  // [SUB 5] DICOM Image Segmentation
  // ============================================================
  {
    id: 'dicom',
    isFeatured: false,
    type: 'sub',
    category: 'other',
    title: 'DICOM Segmentation',
    titleKr: 'CT DICOM 영상 분할',
    genre: '의료 영상 처리 / 컴퓨터 비전',
    engine: 'C++, OpenCV',
    period: '2024 (그래픽스 심화 과제)',
    periodShort: '2024',
    duration: '약 2주',
    team: '1인 개발',
    role: '전체 파이프라인 설계 및 구현',
    tags: ['C++', 'OpenCV', 'DICOM', 'Otsu', 'Watershed', 'Medical Image'],
    createdDate: '2024 (그래픽스 과제)',
    cjFit: ['health', 'onlyone'],
    values: ['health', 'onlyone'],
    summary: 'CT 촬영된 환자의 흉부 DICOM 파일을 OpenCV로 분석하여 폐 영역만 분할 및 시각화하는 파이프라인 구현.',
    achievement: 'C++ + OpenCV 로우레벨 의료 영상 분할 다단계 파이프라인 완성',
    media: {
      thumbnail: 'assets/images/projects/dicom/dicom_artifact_reduction.png',
      screenshots: [
        'assets/images/projects/dicom/dicom_pipeline.png',
        'assets/images/projects/dicom/dicom_mask_overlay.jpg',
        'assets/images/projects/dicom/dicom_artifact_reduction.png',
      ],
      videoUrl: '',
    },
    links: {
      github: 'https://github.com/gktjddyd/Dicom-Image-Segementation/blob/main/segmetation.cpp',
      youtube: '',
      notion: '',
    },
    overview: {
      story: 'DICOM CT 데이터를 저수준에서 직접 다루며, 전처리부터 관심 영역 마스킹까지 전체 파이프라인을 C++과 OpenCV만으로 구현.',
    },
    implementations: [
      {
        id: 'pipeline',
        title: '의료 영상 전처리 및 분할 파이프라인',
        valueTag: 'challenge',
        content: [
          'OpenCV를 활용한 의료용 CT DICOM 파일 로드 및 픽셀 데이터 전처리.',
          { type: 'image', src: 'assets/images/projects/dicom/dicom_pipeline.png', label: '영상 전처리 및 분할 알고리즘 플로우차트' },
          { type: 'image', src: 'assets/images/projects/dicom/dicom_mask_overlay.jpg', label: 'Watershed & Artifact Reduction 연산 과정' },
          '관심 영역을 정확하게 추출해 내기 위한 이미지 분할 알고리즘 적용.',
          '분할된 영역을 붉은색으로 오버레이(Overlay)하여 직관적으로 보여주는 마스킹 시각화 구현.',
          { type: 'image', src: 'assets/images/projects/dicom/dicom_artifact_reduction.png', label: '폐 CT 붉은색 관심 영역 마스킹 결과' },
          'C++ 환경에서 영상 처리 효율성을 고려한 로우레벨 컴퓨터 비전 파이프라인 경험.'
        ]
      }
    ],
    troubleshooting: [],
  },
];

// 카테고리 맵
const CATEGORIES = {
  all: '전체',
  unity: 'Unity / C#',
  opengl: 'OpenGL / C++',
  other: 'AI · Android · CV',
};

// daouFit 태그 시스템
const DAOU_FIT_TAGS = {
  system: { label: 'SYSTEM', kr: '시스템', color: '#2484C6', class: 'system', desc: '안정적 시스템 설계 및 최적화' },
  realtime: { label: 'REALTIME', kr: '실시간', color: '#43D4E9', class: 'realtime', desc: '실시간 처리 성능 민감도 경험' },
  ai: { label: 'AI', kr: 'AI 개발', color: '#5F24E4', class: 'ai', desc: 'AI 서비스 파이프라인 구축' },
  mobile: { label: 'MOBILE', kr: '모바일', color: '#F8D306', class: 'mobile', desc: 'Android/iOS 앱 개발 경험' },
};

// 기술 스킬 데이터
const SKILLS_DATA = [
  {
    group: 'Language (직무 핵심)',
    icon: '⚙️',
    iconClass: 'blue',
    skills: [
      { name: 'Java', level: 72, sub: 'OOP, Android, SSAFY 학습 중' },
      { name: 'C++ (Modern)', level: 82, sub: 'STL, 포인터, 렌더링 파이프라인' },
      { name: 'C', level: 80, sub: '포인터, 메모리 관리, 시스템 프로그래밍' },
      { name: 'SQL', level: 75, sub: 'RDBMS, JOIN/서브쿼리, 트랜잭션' },
      { name: 'Vue.js', level: 72, sub: 'Vue 3, Composition API, Axios 연동' },
      { name: 'C# (Unity)', level: 88, sub: 'async/await, Event, Coroutine' },
      { name: 'Python', level: 68, sub: 'FastAPI, OpenCV, AI 파이프라인' },
    ],
  },
  {
    group: 'Mobile & System',
    icon: '📱',
    iconClass: 'cyan',
    skills: [
      { name: 'Android Studio', level: 70, sub: 'Activity, REST, AI 연동' },
      { name: 'OpenGL / C++', level: 78, sub: 'VAO/VBO, FBO, 1인칭 파이프라인' },
      { name: 'Unity (URP)', level: 90, sub: 'VR, Physics, 커스텀 렌더 패스' },
    ],
  },
  {
    group: 'AI & Computer Vision',
    icon: '🤖',
    iconClass: 'purple',
    skills: [
      { name: 'OpenCV (C++)', level: 74, sub: 'DICOM, Watershed, CLAHE' },
      { name: 'DTW Algorithm', level: 70, sub: '시계열 매칭, 구화 분석' },
      { name: 'AI Tool 활용', level: 85, sub: 'SSAFY AI 교육, 프롬프트 설계' },
    ],
  },
  {
    group: 'CS Fundamentals',
    icon: '📚',
    iconClass: 'green',
    skills: [
      { name: '자료구조·알고리즘', level: 75, sub: 'SSAFY + 컴퓨터학부 이수' },
      { name: '운영체제·네트워크', level: 65, sub: '컴퓨터학부 복수전공 이수' },
      { name: 'Git 협업', level: 82, sub: '브랜치 전략, 팀 협업 1년' },
    ],
  },
];
