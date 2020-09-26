//● 즉시실행 함수 Immediately-invoked function expression
// 전역변수를 안쓰기위해서 씀
// 함수안에서 만든 변수...밖에서 쓸수없음

(() => {
  //●js 02-03 : `data-index=''` 넣기 to .step , .graphic-item

  const stepElems = document.querySelectorAll(".step");

  const graphicElems = document.querySelectorAll(".graphic-item");

  let currentItem = graphicElems[0];

  for (let i = 0; i < stepElems.length; i++) {
    // console.log(stepElems[i]);

    // stepElems[i].setAttribute('data-index',i);   <--같은뜻

    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  //● js 02-08: 말풍선 어느정도 높이 도달할때, 뒤의 이미지 바꾸기
  // getboundingclientrect :  https://iankim2511.tistory.com/13
  // getBoundingClientRect 엘리먼트 위치값 알아냄. y값. top값
  // (4) 윈도우높이의 10%~80% 사이에서 말풍선,이미지 호출 : step의 dataset의 index호출
  //(5) step의 dataset의 index 확인
  // (6) 스크롤에따라 이미지 호출하기  : 활성화된 이미지를 currentItem에 넣고, currentItem을 지우고, 다음 이미지를 호출함
  // (7) 중복코딩 function으로 만듬
  // (8)  currentItem 첫image로 시작

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;

    for (let i = 0; i < stepElems.length; i++) {
      step = stepElems[i];
      boundingRect = step.getBoundingClientRect();

      // console.log(boundingRect);
      // console.log(boundingRect.top);

      // (4)
      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        // (5)
        // console.log(step.dataset.index);

        // (6)
        if (currentItem) {
          inactivate();
        }

        currentItem = graphicElems[step.dataset.index];
        activate();
      }
    }
  });

  // (7)
  function activate() {
    currentItem.classList.add("visible");
  }
  function inactivate() {
    currentItem.classList.remove("visible");
  }

  // (8)
  activate();

  //● js 03-21 새로고침하면 최상단 첫화면

  window.addEventListener("load", () => {
    setTimeout(() => {
      scrollTo(0, 0);
    }, 100);
  });
})();
