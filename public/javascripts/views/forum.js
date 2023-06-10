document.addEventListener("DOMContentLoaded", (event) => {
  const insightTab = document.getElementById("insightTab");
  const consortiumTab = document.getElementById("consortiumTab");
  const colloquiumTab = document.getElementById("colloquiumTab");

  const position = window.location.href.split("/").pop();

  insightTab.classList.remove("active");
  consortiumTab.classList.remove("active");
  colloquiumTab.classList.remove("active");

  if (position === "insight") {
    insightTab.classList.add("active");
  } else if (position == "consortium") {
    consortiumTab.classList.add("active");
  } else {
    colloquiumTab.classList.add("active");
  }
});
