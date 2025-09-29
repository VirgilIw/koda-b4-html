require.config({
  paths: {
    jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min",
    moment:
      "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.0/moment.min",
  },
});

require(["jquery", "el", "task"], function ($, el, task) {
  task.bindEvents();
  task.inputAfter();

  let currentSortMode = "none";
  let sortAscending = true;

  const ICONS = {
    arrowUpGray: "assets/img/Arrow - Up 2.png",
    arrowDownOrange: "assets/img/Arrow - Down 2 oren .png",
    arrowRight: "assets/img/Arrow - Right 2.png",
    checked: "assets/img/circle.png",
    unchecked: "assets/img/Rectangle 21.png",
    hamburger: "assets/img/hamburger.svg",
    closeHamburger: "assets/img/close-hamburger.png",
  };

  const resetButtonStyle = () => {
    el.byTanggal.removeClass("text-[#FF5F26] border-[#FF5F26]");
    el.byTanggal.addClass("text-gray-300 border-gray-400");
  };

  const setActiveButtonStyle = () => {
    el.byTanggal.removeClass("text-gray-300 border-gray-400");
    el.byTanggal.addClass("text-[#FF5F26] border-[#FF5F26]");
  };

  const updateDropdownUI = (mode) => {
    $("#isiBtnTanggal img").attr("src", ICONS.unchecked);

    const modeMap = {
      date: "By Tanggal",
      time: "By Time",
      newest: "Terbaru",
    };

    if (modeMap[mode]) {
      $(`#isiBtnTanggal button:contains('${modeMap[mode]}')`)
        .siblings("img")
        .attr("src", ICONS.checked);
    }
  };

  const parseDate = (dateString) => {
    return dateString === "Hari ini"
      ? moment().startOf("day")
      : moment(dateString, "DD MMM YYYY");
  };

  const sortByDate = (ascending) => {
    task.sortTasks((a, b) => {
      const dateA = parseDate(a.waktu);
      const dateB = parseDate(b.waktu);
      return ascending ? dateA - dateB : dateB - dateA;
    });
  };

  const sortByTime = () => {
    task.sortTasks((a, b) => {
      const timeA = a.createdAt || 0;
      const timeB = b.createdAt || 0;
      return timeA - timeB;
    });
  };

  const sortByNewest = () => {
    task.sortTasks((a, b) => {
      const timeA = a.createdAt || 0;
      const timeB = b.createdAt || 0;
      return timeB - timeA;
    });
  };

  const performSort = (mode, ascending = true) => {
    const sortMethods = {
      date: () => sortByDate(ascending),
      time: sortByTime,
      newest: sortByNewest,
    };

    if (sortMethods[mode]) {
      sortMethods[mode]();
      task.inputAfter();
    }
  };

  el.navMenu.on("click", function () {
    const img = $(this).find("img");
    const isHamburger = img.attr("src").includes("hamburger.svg");

    if (isHamburger) {
      img.attr("src", ICONS.closeHamburger);
      el.navList.removeClass("hidden").addClass("flex flex-col md:flex-row");
    } else {
      img.attr("src", ICONS.hamburger);
      el.navList.addClass("hidden").removeClass("flex flex-col md:flex-row");
    }
  });

  el.byTanggal.on("click", (e) => {
    e.stopPropagation();

    const isHidden = el.isiBtnTanggal.hasClass("hidden");
    el.isiBtnTanggal.toggleClass("hidden");

    if (isHidden) {
      el.panahTanggal.attr("src", ICONS.arrowUpGray);
      resetButtonStyle();
    } else {
      el.panahTanggal.attr("src", ICONS.arrowDownOrange);
      if (currentSortMode !== "none") {
        setActiveButtonStyle();
      }
    }
  });

  $("#isiBtnTanggal button:contains('By Tanggal')").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (currentSortMode === "date") {
      sortAscending = !sortAscending;
    } else {
      currentSortMode = "date";
      sortAscending = true;
    }

    const label = sortAscending ? "By Tanggal ↑" : "By Tanggal ↓";
    el.byTanggal.find("p").text(label);

    updateDropdownUI("date");
    performSort("date", sortAscending);

    el.isiBtnTanggal.addClass("hidden");
    el.panahTanggal.attr("src", ICONS.arrowDownOrange);
    setActiveButtonStyle();
  });

  $("#isiBtnTanggal button:contains('By Time')").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    currentSortMode = "time";
    el.byTanggal.find("p").text("By Time (Terlama)");

    updateDropdownUI("time");
    performSort("time");

    el.isiBtnTanggal.addClass("hidden");
    el.panahTanggal.attr("src", ICONS.arrowDownOrange);
    setActiveButtonStyle();
  });

  $("#isiBtnTanggal button:contains('Terbaru')").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    currentSortMode = "newest";
    el.byTanggal.find("p").text("Terbaru");

    updateDropdownUI("newest");
    performSort("newest");

    el.isiBtnTanggal.addClass("hidden");
    el.panahTanggal.attr("src", ICONS.arrowDownOrange);
    setActiveButtonStyle();
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest("#byTanggal, #isiBtnTanggal").length) {
      el.isiBtnTanggal.addClass("hidden");
      el.panahTanggal.attr("src", ICONS.arrowDownOrange);

      // Restore button style based on sort mode
      if (currentSortMode !== "none") {
        setActiveButtonStyle();
      } else {
        resetButtonStyle();
      }
    }
  });

  el.btnResults.on("click", () => {
    const currentSrc = el.arrowFooter.attr("src");
    const newSrc =
      currentSrc === ICONS.arrowUpGray ? ICONS.arrowRight : ICONS.arrowUpGray;

    el.arrowFooter.attr("src", newSrc);
    el.results.toggleClass("hidden");
  });
});
