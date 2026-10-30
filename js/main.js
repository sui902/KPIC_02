
AOS.init({
  duration: 1000,
  once: true,
});

// 1. Swiper 슬라이더 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 1. Swiper 슬라이더 초기화
  const newsSwiper = new Swiper('.news-swiper', {
    initialSlide: 1,
    slidesPerView: 3,         // 한 번에 노출될 카드 수 (3장)
    spaceBetween: 24,         // 카드 사이 여백 (px)
    loop: false,              // 필터링 기능을 명확히 하기 위해 false 권장
    observer: true,
    observeParents: true,
    navigation: {             // 좌우 이동 버튼 연동
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {            // 반응형 레이아웃 처리
      320: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 'auto',
        centeredSlides: true,
      },
      1100: {
        slidesPerView: 3,
        centeredSlides: false,
      }
    }
  });

  // 2. 탭 및 슬라이드 요소 선택
  const tabButtons = document.querySelectorAll('.tab_menu .tab-btn');
  const allSlides = document.querySelectorAll('.news-swiper .swiper-slide');

  // 3. 탭 클릭 이벤트 처리
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const category = this.dataset.category;

      // (1) 탭 active 클래스 토글
      tabButtons.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');

      // (2) 카테고리에 맞춰 슬라이드 표시/숨김 처리
      let visibleSlideCount = 0;

      allSlides.forEach((slide) => {
        const slideCategory = slide.dataset.category;

        if (category === 'all' || slideCategory === category) {
          slide.style.display = 'block'; // 조건에 맞으면 표시
          visibleSlideCount++;
        } else {
          slide.style.display = 'none'; // 조건에 안 맞으면 숨김
        }
      });

      // (3) Swiper DOM 재계산 반영
      newsSwiper.update();

      // (4) 반응형 상태에 따른 포커스 인덱스 계산
      let targetIndex = 0;

      // PC(1100px 이상, centeredSlides: false)에서는 1번째(인덱스 0)로,
      // 모바일/태블릿(centeredSlides: true 환경)에서는 2번째(인덱스 1)로 포커스
      const isCentered = window.innerWidth < 1100;

      if (visibleSlideCount > 1) {
        targetIndex = isCentered ? 1 : 0;
      }

      // (5) 계산된 인덱스로 즉시 이동 (애니메이션 속도 0ms)
      newsSwiper.slideTo(targetIndex, 0);
    });
  });
});

function updatePersonImage() {
  // .person 또는 .m_person 클래스를 가진 이미지를 선택합니다.
  const personImg = document.querySelector('img.person, img.m_person');
  if (!personImg) return;

  // 너비가 1680px 이하일 때 (모바일/태블릿 등)
  if (window.innerWidth <= 1680) {
    personImg.className = 'm_person';
    personImg.src = 'img/main/m_person.png'; // 모바일용 이미지 경로
    personImg.alt = '모바일 회사소개';                 // 모바일용 대체 텍스트
  } else {
    // 너비가 1680px 초과일 때 (대화면 PC)
    personImg.className = 'person';
    personImg.src = 'img/main/section_img01.png'; // 원본 이미지 경로
    personImg.alt = '회사소개';                     // 원본 대체 텍스트
  }
}

// 1. 페이지가 처음 로드될 때 실행
window.addEventListener('DOMContentLoaded', updatePersonImage);

// 2. 브라우저 창 크기가 조절될 때마다 실시간 감지하여 실행
window.addEventListener('resize', updatePersonImage);


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

const app_list = new Swiper(".app_list", {

  navigation: {
    nextEl: ".slide01-next",
    prevEl: ".slide01-prev",
  },
  pagination: {
    el: ".slide01-pagination",
    type: "bullets",
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false, // 사용자가 버튼을 클릭하거나 손으로 넘겨도 자동 재생이 멈추지 않고 유지됨
  },

  loop: true,

});

const banner_list = new Swiper(".banner_list", {

  pagination: {
    el: ".banner-pagination",
    type: "bullets",
  },

});

const site_list = new Swiper(".site_list", {
  loop: true,               // 무한 반복 필수
  speed: 5000,              // 흘러가는 속도 (숫자가 클수록 천천히 흐름)
  slidesPerView: 'auto',    // 슬라이드 너비에 맞춰 유연하게 배치
  spaceBetween: 0,         // 아이콘 간격

  autoplay: {
    delay: 0,               // 딜레이를 0으로 줘서 멈춤 없이 계속 이동
    disableOnInteraction: false, // 상호작용 후에도 자동재생 유지
  },
});

let mListSwiper = null;

function initMListSwiper() {
  const windowWidth = window.innerWidth;

  // 860px 이하일 때만 Swiper 실행
  if (windowWidth <= 860) {
    if (!mListSwiper) {
      mListSwiper = new Swiper('.swiper.m_list', {
        slidesPerView: 'auto', // CSS에 지정된 48px 크기에 맞춰 자동 정렬
        spaceBetween: 24,      // 아이콘 사이의 간격
        freeMode: true,        // 밀어낸 만큼 부드럽게 미끄러지는 스와이프 감지
        grabCursor: true,      // 마우스로 잡을 수 있는 손가락 모양 커서 활성화
      });
    }
  } else {
    // 860px 초과(PC 화면)로 커지면 Swiper 해제
    if (mListSwiper) {
      mListSwiper.destroy(true, true);
      mListSwiper = null;
    }
  }
}

// 페이지 로드 및 화면 크기 바뀔 때 실행
window.addEventListener('load', initMListSwiper);
window.addEventListener('resize', initMListSwiper);

window.addEventListener('load', () => {
  if (swiper) {
    swiper.update();
  }
});