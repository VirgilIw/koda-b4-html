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

  // State untuk tracking mode sorting
  let currentSortMode = "none"; // "none", "date", "time"
  let sortAscending = true;

  // Function untuk update UI dropdown
  const updateDropdownUI = (mode) => {
    // Reset semua icon ke unchecked
    $("#isiBtnTanggal img").attr("src", "assets/img/Rectangle 21.png");

    // Set icon yang dipilih ke checked
    if (mode === "date") {
      $("#isiBtnTanggal button:contains('By Tanggal')")
        .siblings("img")
        .attr("src", "assets/img/circle.png");
    } else if (mode === "time") {
      $("#isiBtnTanggal button:contains('By Time')")
        .siblings("img")
        .attr("src", "assets/img/circle.png");
    } else if (mode === "newest") {
      $("#isiBtnTanggal button:contains('Terbaru')")
        .siblings("img")
        .attr("src", "assets/img/circle.png");
    }
  };

  // Function untuk perform sorting
  const performSort = (mode, ascending = true) => {
    if (mode === "date") {
      // Sort by date
      task.sortTasks((a, b) => {
        const parseDate = (t) =>
          t === "Hari ini" ? moment().startOf("day") : moment(t, "DD MMM YYYY");

        const dateA = parseDate(a.waktu);
        const dateB = parseDate(b.waktu);

        return ascending ? dateA - dateB : dateB - dateA;
      });
    } else if (mode === "time") {
      // Sort by created timestamp (oldest first)
      task.sortTasks((a, b) => {
        const timeA = a.createdAt || 0;
        const timeB = b.createdAt || 0;

        return timeA - timeB; // Always oldest first for "By Time"
      });
    } else if (mode === "newest") {
      // Sort by created timestamp (newest first)
      task.sortTasks((a, b) => {
        const timeA = a.createdAt || 0;
        const timeB = b.createdAt || 0;

        return timeB - timeA; // Always newest first for "Terbaru"
      });
    }

    task.inputAfter();
  };

  el.navMenu.on("click", function () {
    const img = $(this).find("img");
    const isHamburger = img.attr("src").includes("hamburger.svg");
    if (isHamburger) {
      img.attr("src", "assets/img/close-hamburger.png");
      el.navList.removeClass("hidden").addClass("flex flex-col md:flex-row");
    } else {
      img.attr("src", "assets/img/hamburger.svg");
      el.navList.addClass("hidden").removeClass("flex flex-col md:flex-row");
    }
  });

  el.byTanggal.on("click", (e) => {
    e.stopPropagation();
    el.isiBtnTanggal.toggleClass("hidden");

    const up = "assets/img/Arrow - Up 2.png";
    const down = "assets/img/Arrow - Down 2 oren .png";
    const isHidden = el.isiBtnTanggal.hasClass("hidden");
    el.panahTanggal.attr("src", isHidden ? down : up);
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
    el.panahTanggal.attr("src", "assets/img/Arrow - Down 2 oren .png");

    el.byTanggal.removeClass("text-gray-300 border-gray-400");
    el.byTanggal.addClass("text-[#FF5F26] border-[#FF5F26]");
  });

  $("#isiBtnTanggal button:contains('By Time')").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    currentSortMode = "time";

    el.byTanggal.find("p").text("By Time (Terlama)");

    updateDropdownUI("time");
    performSort("time");

    el.isiBtnTanggal.addClass("hidden");
    el.panahTanggal.attr("src", "assets/img/Arrow - Down 2 oren .png");

    el.byTanggal.removeClass("text-gray-300 border-gray-400");
    el.byTanggal.addClass("text-[#FF5F26] border-[#FF5F26]");
  });

  $("#isiBtnTanggal button:contains('Terbaru')").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    currentSortMode = "newest";

    el.byTanggal.find("p").text("Terbaru");

    updateDropdownUI("newest");
    performSort("newest");

    el.isiBtnTanggal.addClass("hidden");
    el.panahTanggal.attr("src", "assets/img/Arrow - Down 2 oren .png");

    el.byTanggal.removeClass("text-gray-300 border-gray-400");
    el.byTanggal.addClass("text-[#FF5F26] border-[#FF5F26]");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest("#byTanggal, #isiBtnTanggal").length) {
      el.isiBtnTanggal.addClass("hidden");
      el.panahTanggal.attr("src", "assets/img/Arrow - Down 2 oren .png");
    }
  });

  el.btnResults.on("click", () => {
    const up = "assets/img/Arrow - Up 2.png";
    const right = "assets/img/Arrow - Right 2.png";
    el.arrowFooter.attr("src", el.arrowFooter.attr("src") === up ? right : up);
    el.results.toggleClass("hidden");
  });
});
