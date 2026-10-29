document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('#main .nav a'); // 내비게이션 링크들
  const sections = document.querySelectorAll('section[id]');  // id가 있는 모든 섹션들
  const goTopBtn = document.querySelector('.go_top');         // Gotop 버튼 (있을 경우에만 작동)

  // 1. 내비게이션 클릭 시 active 처리 및 해당 섹션으로 부드럽게 이동
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // a태그의 기본 앵커 점프(#) 현상이 마음에 안 든다면 e.preventDefault() 후 scrollTo 사용 가능
      // 현재는 클릭한 항목에 active를 먼저 부여합니다.
      navLinks.forEach(item => item.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  // 2. 스크롤할 때 현재 화면에 보이는 섹션에 맞춰 내비게이션 active 자동 변경 (Scroll Spy)
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px', // 화면 중앙 부근에 섹션이 걸칠 때 인식
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
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

  // 3. Gotop 버튼 클릭 시 맨 위로 가면서 첫 번째 내비게이션(설립배경 등)에 active 부여
  if (goTopBtn) {
    goTopBtn.addEventListener('click', (e) => {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      navLinks.forEach(link => link.classList.remove('active'));
      if (navLinks.length > 0) {
        navLinks[0].classList.add('active'); // 첫 번째 메뉴 활성화
      }
    });
  }
});

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
    disableOnInteraction: false, // 사용자가 버튼을 클릭하거나 손으로 넘겨도 자동 재생이 멈추지 않고 유지됨
  },
});

const lenis = new Lenis({
  duration: 2,   // 스크롤 한 번에 이동하는 시간 (초). 숫자가 커질수록 천천히 멈춤
  lerp: 0.1,       // 보간법 수치 (0~1). 낮을수록 더 부드럽고 묵직하게 따라옴 (0.05~0.1 추천)
  wheelMultiplier: 0.8, // 마우스 휠 속도 배수. 너무 빠르면 0.8, 느리면 1.2 식으로 조절
  orientation: 'vertical', // 스크롤 방향
  gestureOrientation: 'vertical',
  smoothWheel: true, // 휠 스크롤 부드럽게 사용 여부
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



// 페이지 내의 모든 '#' 링크에 Lenis 스크롤 적용
$(document).on('click', 'a[href^="#"]', function (e) {
  e.preventDefault();
  const target = $(this).attr("href");

  // 목적지가 있는지 확인 (#만 있는 경우 방지)
  if (target !== "#" && $(target).length > 0) {
    lenis.scrollTo(target, {
      offset: -70, // 헤더 높이만큼 여백 (필요시 조절)
      duration: 1.2
    });
  }

  // 만약 모바일 메뉴(mgnb_wrap) 안의 링크라면 메뉴를 닫아줌
  if ($(this).closest(".mgnb_wrap").length > 0) {
    $(".mgnb_wrap").fadeOut();
    $(".btn_close").hide();
    $(".btn_ham").show();
  }
});