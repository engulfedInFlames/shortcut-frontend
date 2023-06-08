document.addEventListener("DOMContentLoaded", (event) => {
  const deleteBtns = document.querySelectorAll(".delete-btn");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      const url = btn.getAttribute("href");
      const isConfirmed = confirm("정말로 삭제하시겠습니까?");
      if (isConfirmed) {
        console.log(url);
        //   try {
        //     const response = await fetch(url, { method: "DELETE" });
        //     if (response.ok) {
        //       alert("삭제되었습니다.");
        //     } else {
        //       alert("삭제에 실패했습니다.");
        //     }
        //   } catch (e) {
        //     alert("삭제에 실패했습니다.");
        //   }
      }
    });
  });
});
