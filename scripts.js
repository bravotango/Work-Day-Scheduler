$(document).ready(function () {
  let currentDate;
  let timer;
  let currentHour;
  const workHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]; // military time

  for (let i = 0; i < workHours.length; i++) {
    createFormTimeBlock(workHours[i]);
  }

  // event listener for a form .saveBtn clicked
  $("form").on("submit", function (e) {
    e.preventDefault();
    const description = $(this).children(".description").val(); // value typed into the textarea associated (sibling) of saveBtn
    const key = $(this).attr("id"); // key to use for local storage
    // save to local storage
    localStorage.setItem(key, description);
  });

  timeUpdater();
  getLocalStorageData();

  function createFormTimeBlock(hour) {
    const formBlock = $("#formBlocks");
    const form = $("<form>")
      .attr("id", `time${hour}`)
      .addClass("row time-block text-white rounded border-right border-bottom");

    // hour container elements
    const timeContainer = createTimeContainer(hour);
    form.append(timeContainer);

    // textarea container
    const textarea = createTextareaContainer();
    form.append(textarea);

    // save container
    const saveContainer = createSaveContainer();
    form.append(saveContainer);

    formBlock.append(form);
  }

  function createTimeContainer(hour) {
    let amPm = hour < 12 || hour === 24 ? "AM" : "PM";
    // convert from military time to standard time for display
    const displayHour = hour <= 12 ? hour : hour - 12;
    const timeContainer = $("<div>").addClass("col-sm-2 hour");
    const pTime = $("<p>").addClass("float-left").text(`${displayHour}${amPm}`);
    const buttonContainer = $("<div>").addClass(
      "d-block d-sm-none float-right saveBtn"
    );

    const saveButtonMobile = createSaveButton();

    buttonContainer.append(saveButtonMobile);
    timeContainer.append(pTime);
    timeContainer.append(buttonContainer);
    return timeContainer;
  }

  function createTextareaContainer() {
    const textarea = $("<textarea>").addClass("col-sm-8 col-lg-9 description");
    textarea.prop("required", true);
    return textarea;
  }

  function createSaveContainer() {
    const saveContainer = $("<div>").addClass(
      "col-sm-2 col-lg-1 saveBtn d-none d-sm-block"
    );
    const saveButton = createSaveButton();
    saveContainer.append(saveButton);
    return saveContainer;
  }

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
        console.log("update classes");
        applyClasses();
      }
      $("#currentDay").text(currentDate);
    }, 1000);
  }

  function getLocalStorageData() {
    for (i = 0; i < workHours.length; i++) {
      let key = "time" + workHours[i];
      let value = localStorage.getItem(key);

      let textarea = $(`form#${key}`).children().eq(1);
      textarea.val(value);
    }
  }

  function applyClasses() {
    for (let i = 0; i < workHours.length; i++) {
      const targetForm = $(`form#time${workHours[i]}`);
      if (currentHour == workHours[i]) {
        targetForm.addClass("bg-primary");
      } else if (currentHour < workHours[i]) {
        targetForm.addClass("bg-success");
      } else if (currentHour > workHours[i]) {
        targetForm.addClass("bg-secondary");
      }
    }
  }
});
