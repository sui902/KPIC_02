document.addEventListener('DOMContentLoaded', () => {
  // 1. Go Top 버튼 기능
  const goTopBtn = document.querySelector(".gotop");

  if (goTopBtn) {
    // 스크롤 위치가 400px 이상일 때만 버튼 표시
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        goTopBtn.style.display = "block";
      } else {
        goTopBtn.style.display = "none";
      }
    });

    // 버튼 클릭 시 페이지 맨 위로 부드럽게 스크롤 (Lenis 연동 포함)
    goTopBtn.addEventListener("click", function (e) {
      e.preventDefault(); // a 태그 기본 # 점프 현상 방지

      if (typeof lenis !== 'undefined') {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });
  }

  // ==========================================
  // 2. 모바일 메뉴 (mgnb) 관련 기능
  // ==========================================
  const mgnbWrap = document.querySelector('.mgnb_wrap');
  const dim = document.querySelector('.dim');
  const btnHam = document.querySelector('.btn_ham');
  const btnClose = document.querySelector('.close_mgnb');

  // 메뉴 열기 함수
  function openMgnb() {
    if (mgnbWrap) mgnbWrap.style.display = 'block';
    if (dim) dim.style.display = 'block';
    if (btnHam) btnHam.style.display = 'none';

    // Lenis 및 바디 스크롤 차단
    if (typeof lenis !== 'undefined') lenis.stop();
    document.body.style.overflow = 'hidden';
  }

  // 메뉴 닫기 함수
  function closeMgnb() {
    if (mgnbWrap) mgnbWrap.style.display = 'none';
    if (dim) dim.style.display = 'none';
    if (btnHam) btnHam.style.display = 'block';

    // Lenis 및 바디 스크롤 복구
    if (typeof lenis !== 'undefined') lenis.start();
    document.body.style.overflow = '';
  }

  // 이벤트 연결
  if (btnHam) btnHam.addEventListener('click', openMgnb);
  if (btnClose) btnClose.addEventListener('click', closeMgnb);
  if (dim) dim.addEventListener('click', closeMgnb);

  // 모바일 아코디언 메뉴 (h3 클릭 시 하위 mdepth2 토글)
  const mgnbItems = document.querySelectorAll('.mgnb > li > h3');
  mgnbItems.forEach(h3 => {
    h3.addEventListener('click', function () {
      const parentLi = this.parentElement;
      parentLi.classList.toggle('active');
    });
  });

  // 모바일 메뉴 내부의 링크를 클릭했을 때 메뉴 자동 닫기
  $(document).on('click', '.mgnb_wrap a', function () {
    closeMgnb();
  });
});