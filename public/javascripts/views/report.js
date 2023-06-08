document.addEventListener("DOMContentLoaded", (event) => {
  console.log("report!");

  // Image Upload
  const ImagefileInput = document.getElementById("image-file-input");

  const handleFileInput = (event) => {
    const filesCount = event.target.files.length;
    const text = event.target.previousElementSibling;

    if (filesCount === 1) {
      console.log(event.target.value);
      const fileName = event.target.value.split("\\").pop();
      text.textContent = fileName;
    } else {
      text.textContent = `${filesCount} files selected`;
    }
  };
  ImagefileInput.addEventListener("change", handleFileInput);

  // Form Submit
  const reportForm = document.getElementById("report-form");

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  reportForm.addEventListener("submit", handleSubmit);
});
