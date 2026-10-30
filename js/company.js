document.addEventListener('DOMContentLoaded', () => {
  // 1. 선택자 정의
  const nav = document.querySelector('#main .nav');
  const sentinel = document.querySelector('#nav-sentinel'); // HTML에 심어둘 센서
  const navLinks = document.querySelectorAll('#main .nav a');
  const sections = document.querySelectorAll('section[id]');
  const goTopBtn = document.querySelector('.go_top');

  // 플래그 변수: 내비게이션 클릭 시 스크롤 이동 중에는 Scroll Spy가 간섭하지 않도록 잠금
  let isScrollingByClick = false;

  // ==========================================
  // 2. 네비게이션 스티키 배경/패딩 변화 (센서 방식)
  // ==========================================
  if (sentinel && nav) {
    const sentinelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          nav.classList.add('is-sticky');
        } else {
          nav.classList.remove('is-sticky');
        }
      });
    });
    sentinelObserver.observe(sentinel);
  }

  // ==========================================
  // 3. Scroll Spy (스크롤 시 네비게이션 active 자동 변경)
  // ==========================================
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    // 클릭으로 이동 중일 때는 스크롤 옵저버가 active를 강제로 뺏어가지 않도록 함
    if (isScrollingByClick) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // ==========================================
  // 4. Gotop 버튼 클릭 이벤트
  // ==========================================
  if (goTopBtn) {
    goTopBtn.addEventListener('click', (e) => {
      e.preventDefault();

      isScrollingByClick = true; // 잠금

      if (typeof lenis !== 'undefined') {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      navLinks.forEach(link => link.classList.remove('active'));
      if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
      }

      // 스크롤 이동이 끝날쯤 잠금 해제 (약 1.2초 후)
      setTimeout(() => {
        isScrollingByClick = false;
      }, 1200);
    });
  }

  // ==========================================
  // 5. 연혁 열기/닫기 토글 기능 (요청하신 기능 추가완료!)
  // ==========================================
  const historySection = document.querySelector('#main #history');
  if (historySection) {
    const openBtn = historySection.querySelector('.open');
    const closeBtn = historySection.querySelector('.close');

    if (openBtn && closeBtn) {
      // open 버튼 클릭 시: #history에 is-active 추가 (CSS에 의해 inner 나타남 & open 버튼 사라짐)
      openBtn.addEventListener('click', () => {
        historySection.classList.add('is-active');
      });

      // close 버튼 클릭 시: #history에서 is-active 제거 (inner 사라짐 & open 버튼 다시 나타남)
      closeBtn.addEventListener('click', () => {
        historySection.classList.remove('is-active');
      });
    }
  }

  // ==========================================
  // 6. 내비게이션 링크 & '#' 링크 클릭 시 Lenis 스크롤 적용
  // ==========================================
  $(document).on('click', 'a[href^="#"]', function (e) {
    e.preventDefault();
    const target = $(this).attr("href");

    if (target !== "#" && $(target).length > 0) {
      isScrollingByClick = true; // 클릭으로 이동 시작 (옵저버 일시정지)

      // 클릭한 대상에 즉시 active 부여
      navLinks.forEach(item => item.classList.remove('active'));
      // 현재 클릭한 a 태그에 active 추가 (this 활용)
      if ($(this).closest('.nav').length > 0) {
        $(this).addClass('active');
      }

      // Lenis를 이용한 부드러운 스크롤 이동
      if (typeof lenis !== 'undefined') {
        lenis.scrollTo(target, {
          offset: -70, // 헤더 높이만큼 여백
          duration: 1.2
        });
      }

      // 스크롤 이동이 완료될 즈음(1.2초 뒤) 잠금 해제
      setTimeout(() => {
        isScrollingByClick = false;
      }, 1200);
    }

    // 모바일 메뉴(mgnb_wrap) 닫기 처리
    if ($(this).closest(".mgnb_wrap").length > 0) {
      $(".mgnb_wrap").fadeOut();
      $(".btn_close").hide();
      $(".btn_ham").show();
    }
  });
});

// ==========================================
// 7. Swiper 초기화
// ==========================================
const business_list = new Swiper(".business_list", {
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  loop: true,

  observer: true,
  observeParents: true,
  updateOnWindowResize: true,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

// ==========================================
// 8. Lenis 스크롤 초기화 및 애니메이션 루프
// ==========================================
const lenis = new Lenis({
  duration: 2,
  lerp: 0.1,
  wheelMultiplier: 0.8,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);