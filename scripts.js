$(".saveBtn").on("click", function (e) {
  console.log(this);
  var description = $(this).siblings(".description").val();
  console.log(description);
});
