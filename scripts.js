$(document).ready(function () {
  let currentDate;
  let timer;
  let currentHour;
  const workHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]; // military time to help with AM PM

  // event listener for a form .saveBtn clicked
  $("form").on("submit", function (e) {
    e.preventDefault();
    console.log("event:", e);
    const description = $(this).children(".description").val(); // value typed into the textarea associated (sibling) of saveBtn
    const parentId = $(this).attr("id"); // parentId to use for local storage
    console.log(parentId, description);
    // save to local storage
    localStorage.setItem(parentId, description);
  });

  function createFormTimeBlock(hour) {
    const amPm = hour < 12 ? "AM" : "PM";
    const formBlock = $("#formBlocks");

    const form = $("<form>")
      .attr("id", `time${hour}`)
      .addClass(
        "row time-block bg-secondary text-white rounded border-right border-bottom"
      );

    // hour container elements
    const timeContainer = $("<div>").addClass("col-sm-2 hour");

    const pTime = $("<p>").addClass("float-left").text(`${hour}${amPm}`);
    const buttonContainer = $("<div>").addClass(
      "d-block d-sm-none float-right saveBtn"
    );

    const saveButtonMobile = createSaveButton();
    const saveButton = createSaveButton();

    buttonContainer.append(saveButtonMobile);
    timeContainer.append(pTime);
    timeContainer.append(buttonContainer);
    form.append(timeContainer);

    // textarea container
    const textarea = $("<textarea>").addClass("col-sm-8 col-lg-9 description");
    textarea.prop("required", true);
    form.append(textarea);

    // save container
    const saveContainer = $("<div>").addClass(
      "col-sm-2 col-lg-1 saveBtn d-none d-sm-block"
    );
    saveContainer.append(saveButton);
    form.append(saveContainer);

    formBlock.append(form);
  }

  for (let i = 0; i < workHours.length; i++) {
    createFormTimeBlock(workHours[i]);
  }

  // TODO: why this worked and instead of using the same button in more than one place
  function createSaveButton() {
    const saveButton = $("<button>")
      .attr("type", "submit")
      .addClass("btn text-white");
    const icon = $("<i>").addClass("fas fa-save");

    saveButton.append(icon);
    saveButton.append(" Save");
    return saveButton;
  }

  function timeUpdater() {
    timer = setInterval(function () {
      currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
      if (currentHour !== moment().hour()) {
        currentHour = moment().hour();
        // call function to apply classes for past present future

        console.log(currentHour);
        console.log("lets call a change function");
      }
      $("#currentDay").text(currentDate);
    }, 1000);
  }

  timeUpdater();
});
