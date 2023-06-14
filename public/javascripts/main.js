document.addEventListener("DOMContentLoaded", (event) => {
  //취소 버튼
  const goBackBtn = document.getElementById("goBackBtn");

  const onClickGoBackBtn = (event) => {
    window.history.go(-1);
  };

  goBackBtn.addEventListener("click", onClickGoBackBtn);
});
