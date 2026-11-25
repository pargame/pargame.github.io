# pargame.github.io

개인 기술 블로그 및 개발 아카이브입니다.
GitHub Pages와 GitHub Actions를 통해 자동 빌드 및 배포됩니다.

## 프로젝트 페이지 스타일 구조

- 기본 스타일은 `src/styles/projects/*.css` 공용 파일에만 둡니다. 페이지는 필요한 공용 파일을 `import`하고, 강조색 같은 페이지별 값은 루트 요소의 CSS 변수(`--theme-dark-*`, `--theme-light-*` 등)로 넘깁니다.
- 페이지의 `<style>`에는 그 페이지에만 있는 장식(특수화)만 둡니다. 공용 선택자를 다시 정의하거나 같은 규칙을 다른 페이지에 복사하면 `npm run build`가 실패합니다(`npm run check:styles`로 따로 실행 가능).

## 라이선스

사이트 소스 코드는 [MIT License](LICENSE)를 따릅니다. 글과 이미지 등 콘텐츠는 MIT 라이선스에 포함되지 않으며, 저작권자의 허락 없이 사용할 수 없습니다([LICENSE-CONTENT](LICENSE-CONTENT)).
