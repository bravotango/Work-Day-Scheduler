$(document).ready(function () {
  let currentDate;
  let currentHour;
  const workHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]; // military time day starts at 0

  // create time block for each hour in workHours
  for (let i = 0; i < workHours.length; i++) {
    createFormTimeBlock(workHours[i]);
  }

  $("#dayOfTheWeek").text(`Your ${moment().format("dddd")} Schedule`);

  // event listener for time block form submit
  $("form").on("submit", function (e) {
    e.preventDefault();
    const description = $(this).children(".description").val(); // value typed into the textarea
    const key = $(this).attr("id"); // key to use for local storage
    // save to local storage
    localStorage.setItem(key, description);
    // remove primary class from mobile button when textarea content changes
    removeBtnFocusClass(this);
  });

  $("textarea").on("keydown", function () {
    addBtnFocusClass(this);
  });

  timeUpdater();
  getLocalStorageData();

  function removeBtnFocusClass(el) {
    // remove primary class from mobile button when textarea content changes
    $(el)
      .children()
      .children()
      .eq(1)
      .children()
      .removeClass("bg-primary")
      .trigger("blur");
    // remove primary class from desktop button when textarea content changes
    $(el)
      .children()
      .eq(2)
      .children()
      .eq(0)
      .removeClass("bg-primary")
      .trigger("blur");
  }

  function addBtnFocusClass(el) {
    // add primary class to desktop button when textarea content changes
    $(el).siblings().eq(1).children().addClass("bg-primary");
    // add primary class to mobile button when textarea content changes
    $(el)
      .siblings()
      .eq(0)
      .children()
      .eq(1)
      .children()
      .addClass("bg-primary")
      .children()
      .addClass("py-0");
  }

  function createFormTimeBlock(hour) {
    const formBlock = $("#formBlocks");
    const form = $("<form>")
      .attr("id", `time${hour}`)
      .addClass(
        "row time-block text-white rounded border-right border-bottom bg-dark align-items-center"
      );

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
    let amPm = hour < 12 ? "AM" : "PM";
    // convert from military time to standard time for display
    if (hour === 0) {
      hour = 12;
    }
    // convert from military time to standard time for display
    const displayHour = hour <= 12 ? hour : hour - 12;
    const timeContainer = $("<div>").addClass("col-sm-2 col-lg-1 hour");
    const pTime = $("<p>")
      .addClass("float-left m-0")
      .text(`${displayHour}${amPm}`);
    const buttonContainer = $("<div>").addClass(
      "d-block d-sm-none float-right saveBtn"
    );

    const saveButtonMobile = createSaveButton().addClass("py-0");

    buttonContainer.append(saveButtonMobile);
    timeContainer.append(pTime);
    timeContainer.append(buttonContainer);
    return timeContainer;
  }

  function createTextareaContainer() {
    const textarea = $("<textarea>").addClass(
      "col-sm-8 col-lg-10 description mx-1 mx-sm-0"
    );
    textarea.prop("required", true);
    return textarea;
  }

  function createSaveContainer() {
    const saveContainer = $("<div>").addClass(
      "col-sm-2 col-lg-1 saveBtn d-none d-sm-block text-center"
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

  function clearContextualClasses(targetForm) {
    targetForm.removeClass("bg-dark");
    targetForm.removeClass("bg-secondary");
    targetForm.removeClass("bg-info");
    targetForm.removeClass("bg-success");

    return targetForm;
  }

  function applyClasses() {
    for (let i = 0; i < workHours.length; i++) {
      let targetForm = $(`form#time${workHours[i]}`);
      targetForm = clearContextualClasses(targetForm);

      if (currentHour === workHours[i]) {
        targetForm.addClass("bg-info");
      } else if (currentHour < workHours[i]) {
        targetForm.addClass("bg-success");
      } else if (currentHour > workHours[i]) {
        targetForm.addClass("bg-secondary");
      }
    }
  }
});
