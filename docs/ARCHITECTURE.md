# pargame.github.io Architecture Specification

개인 엔지니어링 지식 허브이자 기술 블로그의 시스템 아키텍처 및 콘텐츠 구조 명세서입니다.

---

## 1. 기술 스택 및 원칙 (Tech Stack)

| 구분 | 기술 / 도구 | 선정 이유 |
| :--- | :--- | :--- |
| **코어 프레임워크** | **Astro 5.x** | 본문 0KB JS 정적 렌더링, 초경량 로딩 속도, Islands 아키텍처 |
| **인터랙티브 UI** | **React 19** | Wasm(Pyodide), Canvas 시뮬레이터 전용 격리 실행 (`client:visible`) |
| **문서/포스팅** | **MDX** | 마크다운 본문 내 인터랙티브 JSX 컴포넌트 직접 임베딩 |
| **코드 하이라이트** | **Shiki** | 빌드 타임 사전 렌더링 (`tokyo-night` / `github-light` 듀얼 테마) |
| **배포/호스팅** | **GitHub Pages (Actions)** | 공식 워크플로우를 통한 루트 도메인(`pargame.github.io`) 직접 배포 |

---

## 2. 디렉터리 구조 및 책임 (Directory Structure)

```
pargame.github.io/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions 공식 배포 워크플로우
├── src/
│   ├── data/
│   │   └── tracks.json     # 학습 트랙/토픽 메타데이터 (SSOT)
│   ├── layouts/
│   │   └── BaseLayout.astro # 전역 헤더, 푸터, 테마 토글 레이아웃
│   ├── pages/
│   │   ├── index.astro     # 메인 홈 (히어로 & 트랙 그리드)
│   │   ├── learn/          # 학습 허브 라우트
│   │   └── posts/          # 일반 엔지니어링 포스트 라우트 (.mdx)
│   └── styles/
│       └── global.css      # Midnight Terminal 전역 CSS 변수 및 스타일
├── docs/
│   └── ARCHITECTURE.md     # 시스템 아키텍처 명세서 (본 문서)
└── STYLE_SPEC.md           # 디자인 시스템 및 UI 토큰 명세서 (디자인 SSOT)
```

---

## 3. 콘텐츠 분류 체계 (Track-Topic-Post Taxonomy)

지식 아카이브는 **Track(대분류) → Topic(중분류) → Post(포스트)** 3단 계층을 엄격히 준수합니다.

### 4대 기본 트랙
1. **Foundations (기반 공학)**: Modern C++, Core CS (운영체제, 컴퓨터구조, 알고리즘)
2. **Systems (시스템 엔지니어링)**: Concurrency (동시성/Lock-free), Network (소켓/epoll), Database & SQL
3. **Game Engine (게임 엔진)**: Unreal Engine (UObject, 블루프린트 연동, 라이프사이클)
4. **Labs (연구실/프로젝트)**: nung_lang (자체 언어), whynode (지식 트리)

### 확장 절차 (Extension Guide)
* **새 토픽 추가**: `src/content/learn/[track]/[new-topic]/` 폴더 생성 및 마크다운 추가. `src/data/tracks.json`의 해당 트랙 `topics` 배열에 id/name 추가.
* **새 트랙 추가**: `src/data/tracks.json`에 새 트랙 객체(`id`, `name`, `accent`) 1개 추가. 라우트 및 카드 UI 자동 반영.

---

## 4. 교차 지식 연결 규약 (Cross-Reference)

주제 간 강한 연관성(예: C++ 메모리 모델 ↔ 동시성 Lock-free ↔ 언리얼 TaskGraph)은 다음 3가지 관계 타입을 통해 본문 및 메타데이터에 명시합니다:
* `prerequisites`: 해당 글을 이해하기 위한 필수 선수 지식
* `deepens`: 해당 개념의 심화 주제
* `appliedIn`: 타 도메인(게임 엔진, 네트워크 등)에서의 실제 응용 사례
