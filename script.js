const content3 = $("#content3");
const addTaskBtn = $("#add-task");
const editTask = $("#edit-task");
const byTanggal = $("#byTanggal");
const isiBtnTanggal = $("#isiBtnTanggal");
const panahTanggal = $("#panahTanggal");

// klik tambah tugas
addTaskBtn.on("click", (e) => {
  e.preventDefault();
  content3.toggleClass("hidden block");
});

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

// moment
const updateWaktu = () => {
  const date = $("#tanggal");
  const now = moment().format("DD/MM/YYYY HH:mm:ss");
  date.val(now);
};

updateWaktu();

setInterval(updateWaktu, 1000);
