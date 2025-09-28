const content3 = $("#content3");
const addTaskBtn = $("#add-task");
const editTask = $("#edit-task");
//
const byTanggal = $("#byTanggal");
const isiBtnTanggal = $("#isiBtnTanggal");

// image tanggal
const panahTanggal = $("#panahTanggal");
const threeDots = $("#threeDots");
//
const subtaskMenu = $("#subtask");
const subtaskBtn = $("#subtaskBtn");
//
const btnResults = $("#btnResults");
const results = $("#results");
const arrowFooter = $("#arrow-footer");
//
//
const navMenu = $("#nav-hamburger");
const menus = $("#menus");
const navList = $("#nav-list");
const logo = $("#wazwez");
//
//
const notif = $("#notification");

//
const toggleMenu = function (button, menu) {
  button.on("click", (e) => {
    e.preventDefault();
    menu.toggleClass("hidden block");
  });
};

toggleMenu(addTaskBtn, content3);
toggleMenu(threeDots, editTask);
toggleMenu(subtaskBtn, subtaskMenu);

byTanggal.on("click", (e) => {
  e.preventDefault();
  byTanggal.toggleClass("text-gray-400");
  //
  if (panahTanggal.attr("src") === "assets/img/Arrow - Up 2.png") {
    panahTanggal.attr("src", "assets/img/Arrow - Down 2 oren .png");
  } else {
    panahTanggal.attr("src", "assets/img/Arrow - Up 2.png");
  }
  //
  byTanggal.toggleClass("border-gray-300");
  isiBtnTanggal.toggleClass("hidden block");
});

btnResults.on("click", (e) => {
  e.preventDefault();
  if (arrowFooter.attr("src") === "assets/img/Arrow - Up 2.png") {
    arrowFooter.attr("src", "assets/img/Arrow - Right 2.png");
  } else {
    arrowFooter.attr("src", "assets/img/Arrow - Up 2.png");
  }
  results.toggleClass("hidden block");
});

// moment
const updateWaktu = () => {
  const date = $("#tanggal");
  const now = moment().format("DD/MM/YYYY HH:mm:ss");
  date.val(now);
};

// hamburger menu

navMenu.on("click", () => {
  const img = navMenu.find("img");
  const srcNow = img.attr("src");

  if (srcNow.includes("hamburger.svg")) {
    img.attr("src", "assets/img/close-hamburger.png");
    menus.addClass("flex-col items-center mr-1 w-6 h-7 p-0");
    // logo.addClass("w-max");
  } else {
    img.attr("src", "assets/img/hamburger.svg");
    navMenu.removeClass("w-14 h-12");
  }

  navList.toggleClass("hidden flex mr-10 w-20");
});

updateWaktu();

setInterval(updateWaktu, 1000);
