const inputNew = $("#inputNew");
const content3 = $("#content3");

//
let clicked = 0;

const addNewTask = () => {
  inputNew.on("focus", (e) => {
    e.preventDefault();
    clicked++;
    if (clicked === 1) {
      content3.removeClass("hidden").addClass("block");
    } else if (clicked === 2) {
      content3.addClass("hidden");
    } else {
      content3.removeClass("hidden").addClass("block");
      clicked = 0;
    }
  });
};

let checked = false;

const button1 = function () {
  const createTask = $("#create-task");
  const btn1 = $("#btn1");

  createTask.on("click", (e) => {
    e.preventDefault();

    if (checked === false) {
      btn1.attr("src", "assets/img/circle.png");
      btn1.attr("alt", "btn-checked");
      checked = true;
    } else {
      btn1.attr("src", "assets/img/Rectangle 21.png");
      btn1.attr("alt", "circle-unchecked");
      checked = false;
    }
  });
};

button1();
addNewTask();

const updateWaktu = () => {
  const date = $("#tanggal");
  const now = moment().format("DD/MM/YYYY HH:mm:ss");
  date.val(now);
};

updateWaktu();

setInterval(updateWaktu, 1000);
