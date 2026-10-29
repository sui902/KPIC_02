const goTopBtn = document.querySelector(".gotop");

// 스크롤 위치가 1200px 이상일 때만 버튼 표시
window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    goTopBtn.style.display = "block";
  } else {
    goTopBtn.style.display = "none";
  }
});

// 버튼 클릭 시 페이지 맨 위로 부드럽게 스크롤
goTopBtn.addEventListener("click", function (e) {
  e.preventDefault(); // a 태그 기본 # 점프 현상 방지
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});