define(["jquery", "el", "moment"], function ($, el, moment) {
  let newInputsTask = JSON.parse(localStorage.getItem("newTasks")) || [];

  const addTaskObject = (nama, deskripsi, waktu) => ({
    nama,
    deskripsi,
    waktu,
    selesai: false,
    subtasks: [],
    createdAt: moment().valueOf(),
  });

  const saveToStorage = () => {
    try {
      localStorage.setItem("newTasks", JSON.stringify(newInputsTask));
    } catch (e) {
      alert("Gagal menyimpan data. Storage penuh atau diblokir.");
      console.error(e);
    }
  };

  const renderSubtask = ({ nama, selesai }, subIndex) => {
    const subtaskItem = $(`
      <div class="subtaskItem flex items-center gap-3 justify-between bg-gray-50 p-3 rounded-lg border border-gray-200" data-subindex="${subIndex}">
        <div class="flex items-center gap-3 flex-1">
          <button class="subtaskCheckbox hover:opacity-70 transition">
            <img src="assets/img/${
              selesai ? "Group 39.png" : "Rectangle 21.png"
            }" alt="checkbox" class="w-5 h-5">
          </button>
          <span class="subtask-text text-sm ${
            selesai ? "line-through text-gray-400" : "text-gray-700"
          }"></span>
        </div>
        <button class="deleteSubtask hover:opacity-70 transition">
          <img src="assets/img/Delete.png" alt="delete" class="w-5 h-5 opacity-60 hover:opacity-100">
        </button>
      </div>
    `);

    subtaskItem.find(".subtask-text").text(nama);
    return subtaskItem;
  };

  const renderTask = (
    { nama, deskripsi, waktu, selesai, subtasks = [] },
    taskIndex
  ) => {
    const taskContainer = $(`
      <div class="px-8">
        <div class="this-task flex justify-between items-center p-2 border-b border-gray-200" data-index="${taskIndex}">
          <div class="flex gap-4 items-center">
            <button class="checkInput">
              <img src="assets/img/${
                selesai ? "Group 39.png" : "Rectangle 21.png"
              }" alt="input">
            </button> 
            <div>
              <p class="nama w-[130px] text-[14px] font-[500] ${
                selesai ? "line-through text-gray-400" : ""
              }"></p>
              <p class="w-50 text-[10px]"></p>
            </div> 
            <div class="editTaskMenu hidden absolute top-0 right-40 md:right-40 bg-white border p-2 rounded-md shadow-md z-10">
              <button class="renameTask flex items-center gap-2">
                <img src="assets/img/Edit.png" alt="edit" class="w-5 h-5" />
                <span>Rename task</span>
              </button>
              <button class="deleteTask flex items-center gap-2">
                <img src="assets/img/Delete.png" alt="delete" class="w-5 h-5" />
                <span>Delete task</span>
              </button>
            </div>
            <p class="flex justify-center items-center text-[#FF5F26] w-20 text-[10px] h-[28px] bg-[#FFEBD3] rounded-[50px]"></p>
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

        <div class="subtaskIsi hidden ml-12 mb-2 mt-2">
          <input type="text" placeholder="Tambah subtask..." class="subtaskInput border rounded-md p-2 w-full mb-2"/>
          <div class="subtaskList space-y-2"></div>
        </div>
      </div>
    `);

    taskContainer.find(".nama").text(nama);
    taskContainer.find(".w-50").text(deskripsi);
    taskContainer.find(".text-\\[\\#FF5F26\\]").text(waktu);

    const subtaskList = taskContainer.find(".subtaskList");
    if (subtasks.length > 0) {
      subtasks.forEach((subtask, subIndex) => {
        subtaskList.append(renderSubtask(subtask, subIndex));
      });
    }

    return taskContainer;
  };

  const renderCompletedTask = ({ nama, deskripsi, waktu }) => {
    const resultItem = $(`
      <div class="flex gap-4 items-center">
        <button>
          <img src="assets/img/Group 39.png" />
        </button>
        <div class="flex-col gap-2">
          <p class="line-through text-gray-400"></p>
          <p class="line-through text-gray-400 text-[15px]"></p>
        </div>
        <p class="line-through text-gray-400"></p>
      </div>
    `);

    resultItem.find("p").eq(0).text(nama);
    resultItem.find("p").eq(1).text(deskripsi);
    resultItem.find("p").eq(2).text(waktu);

    return resultItem;
  };

  const updateCompletedCount = () => {
    const completedCount = newInputsTask.filter(
      ({ selesai }) => selesai
    ).length;
    const totalCount = newInputsTask.length;

    el.btnResults
      .find("p")
      .text(`Terselesaikan (${completedCount}/${totalCount})`);
  };

  const inputAfter = () => {
    el.isiInputNew.empty();
    $("#results").empty();

    newInputsTask.forEach((task, taskIndex) => {
      el.isiInputNew.append(renderTask(task, taskIndex));

      if (task.selesai) {
        $("#results").append(renderCompletedTask(task));
      }
    });

    updateCompletedCount();
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    const nama = el.addTaskName.val().trim();
    const deskripsi = el.deskripsiTugas.val().trim();
    const inputTanggal = el.tanggalTask.val();

    if (!nama) {
      alert("Nama task tidak boleh kosong!");
      return;
    }

    el.btnSave.html('<img src="assets/img/Group 39.png">');
    setTimeout(() => {
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

      waktu = tglTask.isSame(tglSekarang, "day")
        ? "Hari ini"
        : tglTask.format("DD MMM YYYY");
    } else {
      waktu = moment().format("DD MMM YYYY");
    }

    newInputsTask.push(addTaskObject(nama, deskripsi, waktu));
    saveToStorage();

    el.addTaskName.val("");
    el.deskripsiTugas.val("");
    el.tanggalTask.val("");
    inputAfter();
  };

  const handleToggleAddTaskForm = (e) => {
    e.preventDefault();
    el.content3.toggleClass("hidden block");
  };

  const handleToggleTaskMenu = function (e) {
    e.preventDefault();
    $(".editTaskMenu")
      .not($(this).siblings(".editTaskMenu"))
      .addClass("hidden");
    $(this).siblings(".editTaskMenu").toggleClass("hidden");
  };

  const handleToggleSubtaskContainer = function (e) {
    e.preventDefault();
    $(this).closest(".px-8").find(".subtaskIsi").toggleClass("hidden");
  };

  const handleRenameTask = function (e) {
    e.preventDefault();
    const taskItem = $(this).closest(".this-task");
    const index = taskItem.data("index");
    const { nama: currentNama } = newInputsTask[index];

    const newName = prompt("Masukkan nama baru:", currentNama);
    if (newName?.trim()) {
      newInputsTask[index].nama = newName.trim();
      saveToStorage();
      inputAfter();
    }
  };

  const handleDeleteTask = function (e) {
    e.preventDefault();
    const index = $(this).closest(".this-task").data("index");

    if (confirm("Yakin hapus task ini?")) {
      newInputsTask.splice(index, 1);
      saveToStorage();
      inputAfter();
    }
  };

  const handleToggleTaskComplete = function (e) {
    e.preventDefault();
    const index = $(this).closest(".this-task").data("index");

    newInputsTask[index].selesai = !newInputsTask[index].selesai;
    saveToStorage();
    inputAfter();
  };

  const handleAddSubtask = function (e) {
    const { keyCode, which } = e;
    if (keyCode !== 13 && which !== 13) return;

    e.preventDefault();
    e.stopPropagation();

    const $input = $(this);
    const taskIndex = $input.closest(".px-8").find(".this-task").data("index");
    const val = $input.val().trim();

    if (!val) {
      alert("Subtask tidak boleh kosong!");
      return;
    }

    if (!newInputsTask[taskIndex].subtasks) {
      newInputsTask[taskIndex].subtasks = [];
    }

    const newSubtask = { nama: val, selesai: false };
    newInputsTask[taskIndex].subtasks.push(newSubtask);

    saveToStorage();

    $input.val("");

    inputAfter();

    const taskContainer = el.isiInputNew
      .find(`.this-task[data-index="${taskIndex}"]`)
      .closest(".px-8");
    taskContainer.find(".subtaskIsi").removeClass("hidden");
    taskContainer.find(".subtaskInput").focus();
  };

  const handleToggleSubtaskComplete = function (e) {
    e.preventDefault();

    const $container = $(this).closest(".px-8");
    const taskIndex = $container.find(".this-task").data("index");
    const subIndex = $(this).closest(".subtaskItem").data("subindex");

    if (taskIndex === undefined || subIndex === undefined) {
      console.error("Invalid index:", { taskIndex, subIndex });
      return;
    }

    const { subtasks } = newInputsTask[taskIndex];
    if (!subtasks || !subtasks[subIndex]) {
      console.error("Subtask not found");
      return;
    }

    subtasks[subIndex].selesai = !subtasks[subIndex].selesai;
    saveToStorage();
    inputAfter();
  };

  const handleDeleteSubtask = function (e) {
    e.preventDefault();

    if (!confirm("Hapus subtask ini?")) return;

    const $container = $(this).closest(".px-8");
    const taskIndex = $container.find(".this-task").data("index");
    const subIndex = $(this).closest(".subtaskItem").data("subindex");

    if (taskIndex === undefined || subIndex === undefined) {
      console.error("Invalid index:", { taskIndex, subIndex });
      return;
    }

    if (!newInputsTask[taskIndex] || !newInputsTask[taskIndex].subtasks) {
      console.error("Task or subtasks not found");
      return;
    }

    newInputsTask[taskIndex].subtasks.splice(subIndex, 1);
    saveToStorage();
    inputAfter();
  };

  const bindEvents = () => {
    el.addTaskBtn.on("click", handleToggleAddTaskForm);
    el.btnSave.on("click", handleAddTask);
    el.isiInputNew.on("click", ".threeDots", handleToggleTaskMenu);
    el.isiInputNew.on("click", ".subtaskBtn", handleToggleSubtaskContainer);
    el.isiInputNew.on("click", ".renameTask", handleRenameTask);
    el.isiInputNew.on("click", ".deleteTask", handleDeleteTask);
    el.isiInputNew.on("click", ".checkInput", handleToggleTaskComplete);

    el.isiInputNew.on("keydown", ".subtaskInput", handleAddSubtask);
    el.isiInputNew.on("click", ".subtaskCheckbox", handleToggleSubtaskComplete);
    el.isiInputNew.on("click", ".deleteSubtask", handleDeleteSubtask);

    $(document).on("click", ({ target }) => {
      if (!$(target).closest(".threeDots, .editTaskMenu").length) {
        $(".editTaskMenu").addClass("hidden");
      }
    });
  };

  return {
    bindEvents,
    inputAfter,
    getTasks: () => newInputsTask,
    sortTasks: (sortFn) => {
      if (typeof sortFn === "function") {
        newInputsTask.sort(sortFn);
        saveToStorage();
      }
    },
  };
});
