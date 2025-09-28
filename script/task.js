define(["jquery", "el", "moment"], function ($, el, moment) {
  let newInputsTask = JSON.parse(localStorage.getItem("newTasks")) || [];

  const addTaskObject = (nama, deskripsi, waktu) => ({
    nama,
    deskripsi,
    waktu,
    subtasks: [],
  });

  const inputAfter = () => {
    el.isiInputNew.empty();
    newInputsTask.forEach((task, index) => {
      el.isiInputNew.append(`
        <div>
        <div class="this-task relative flex justify-between p-2 border-b border-gray-200 relative" data-index="${index}">
        <div class="flex gap-4 items-center">
        <button class="checkInput">
        <img src="assets/img/Rectangle 21.png" alt="input">
        </button> 
        <div>
        <p class="nama w-[130px] text-[14px] font-[500] ">${task.nama}</p>
        <p class="w-50 text-[10px]">${task.deskripsi}</p>
        </div> 
        <div class="editTaskMenu hidden absolute right-10 md:right-40  bg-white border p-2 rounded-md shadow-md">
        <button class="renameTask flex items-center gap-2">
        <img src="assets/img/Edit.png" alt="edit" class="w-5 h-5" />
        <span>Rename task</span>
        </button>
        <button class="deleteTask flex items-center gap-2">
        <img src="assets/img/Delete.png" alt="delete" class="w-5 h-5" />
        <span>Delete task</span>
        </button>
        </div>
        <p class="flex justify-center items-center text-[#FF5F26] w-20 text-[10px] h-[28px] bg-[#FFEBD3] rounded-[50px]">${task.waktu}</p>
        <button class="threeDots">
        <img src="assets/img/more-vertical.png" alt="three-dots" />
        </button>
        </div>
        <div> 
        <button class="subtaskBtn">
        <img src="assets/img/Arrow - Down 2.png" alt="ArrowDown">
        </button>
        </div>
        
        </div>
        <div class="subtaskIsi">
        </div>
        </div>
      `);
    });
  };

  const bindEvents = () => {
    // tambah task
    el.addTaskBtn.on("click", (e) => {
      e.preventDefault();
      el.content3.toggleClass("hidden block");
    });

    el.btnSave.on("click", (e) => {
      e.preventDefault();

      const input1 = el.addTaskName.val();
      const input2 = el.deskripsiTugas.val();
      const inputTanggal = el.tanggalTask.val();
      el.btnSave.html('<img src="assets/img/Group 39.png">');

      window.setTimeout(() => {
        el.btnSave.html('<img src="assets/img/Rectangle 21.png"/>');
      }, 1000);

      let waktu;
      if (inputTanggal) {
        const tglTask = moment(inputTanggal, "DD-MM-YYYY", true);
        const tglSekarang = moment().startOf("day");

        if (!tglTask.isValid()) {
          el.btnSave.html('<img src="assets/img/Rectangle 21.png">');
          alert("Format tanggal harus DD-MM-YYYY: 11-12-1111");
          return;
        }

        if (tglTask.isSame(tglSekarang, "day")) {
          waktu = "Hari ini";
        } else {
          waktu = tglTask.format("DD MMM YYYY");
        }
      } else {
        waktu = moment().format("DD MMM YYYY");
      }

      newInputsTask.push(addTaskObject(input1, input2, waktu));
      localStorage.setItem("newTasks", JSON.stringify(newInputsTask));

      el.addTaskName.val("");
      el.deskripsiTugas.val("");
      el.tanggalTask.val("");
      inputAfter();
    });

    // toggle menu edit
    el.isiInputNew.on("click", ".threeDots", function (e) {
      e.preventDefault();
      $(this).siblings(".editTaskMenu").toggleClass("hidden");
    });
    //
    el.isiInputNew.on("click", ".subtaskbtn", (e) => {
      e.preventDefault();
      $(this).siblings(".subtaskIsi").toggleClass("hidden");
    });

    // rename task
    el.isiInputNew.on("click", ".renameTask", function (e) {
      e.preventDefault();
      const taskItem = $(this).closest(".this-task");
      const index = taskItem.data("index");

      const newName = prompt("Masukkan nama baru:", newInputsTask[index].nama);
      if (newName) {
        newInputsTask[index].nama = newName;
        localStorage.setItem("newTasks", JSON.stringify(newInputsTask));
        inputAfter();
      }
    });

    // delete task
    el.isiInputNew.on("click", ".deleteTask", function (e) {
      e.preventDefault();
      const taskItem = $(this).closest(".this-task");
      const index = taskItem.data("index");

      if (confirm("Yakin hapus task ini?")) {
        newInputsTask.splice(index, 1);
        localStorage.setItem("newTasks", JSON.stringify(newInputsTask));
        inputAfter();
      }
    });
  };

  return { bindEvents, inputAfter };
});
