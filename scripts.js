$(document).ready(function () {
  $(".saveBtn").on("click", function () {
    const description = $(this).siblings(".description").val();
    const parentId = $(this).parent().attr("id");
    console.log(description, parentId);
  });

  let currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  let timer;
  function timeUpdater() {
    timer = setInterval(function () {
      currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
      $("#currentDay").text(currentDate);
    }, 1000);
  }
  timeUpdater();
  console.log("currentDate", currentDate);
});
