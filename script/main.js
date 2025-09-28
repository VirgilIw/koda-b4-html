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
  el.byTanggal.on("click", () => {
    el.isiBtnTanggal.toggleClass("hidden");

    el.byTanggal.toggleClass("text-gray-300 border-gray-400");
    el.byTanggal.toggleClass("text-[#FF5F26] border-[#FF5F26]");

    const up = "assets/img/Arrow - Up 2.png";
    const down = "assets/img/Arrow - Down 2 oren .png";
    el.panahTanggal.attr("src", el.panahTanggal.attr("src") === up ? down : up);
  });

  el.btnResults.on("click", () => {
    const up = "assets/img/Arrow - Up 2.png";
    const right = "assets/img/Arrow - Right 2.png";
    el.arrowFooter.attr("src", el.arrowFooter.attr("src") === up ? right : up);
    el.results.toggleClass("hidden");
  });

  el.hasil.on("click", ".flex > div > button:first-child", function (e) {
    e.preventDefault();

    const img = $(this).find("img"); 
    const text = $(this).find("p"); 
    if (img.attr("src").includes("Group 40.png")) {
      img.attr("src", "assets/img/Rectangle 21.png");
      text.removeClass("line-through");
    } else {
      img.attr("src", "assets/img/Group 40.png");
      text.addClass("line-through");
    }

    // update jumlah selesai di footer
    const total = el.hasil.find("img").length;
    const selesai = el.hasil.find("img[src*='Group 40.png']").length;
    $(".foot-child p").text(`Terselesaikan ${selesai} (tugas)`);
  });
});
