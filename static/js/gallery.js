// "Try it yourself" gallery: counterfactual images with copyable prompts.
(function() {
  var COUNT = "Answer with a number in curly brackets, e.g., {9}.";
  var YESNO = "Answer in curly brackets, e.g., {Yes} or {No}.";
  var DIR = "static/images/examples/";

  var TASKS = [
    { key: "animals", name: "Animals", icon: "fas fa-paw", items: [
      { image: "task1_animals/2_legs/chicken_0_3_1152.png", question: "How many legs does this animal have? " + COUNT, truth: "3", bias: "2" },
      { image: "task1_animals/2_legs/stork_2_1_1152.png", question: "How many legs does this animal have? " + COUNT, truth: "3", bias: "2" },
      { image: "task1_animals/4_legs/zebra_5_3_1152.png", question: "How many legs does this animal have? " + COUNT, truth: "5", bias: "4" },
      { image: "task1_animals/4_legs/african elephant_2_0_1152.png", question: "How many legs does this animal have? " + COUNT, truth: "5", bias: "4" }
    ]},
    { key: "logos", name: "Logos", icon: "fas fa-tag", items: [
      { image: "task2_logos/car_logos/audi-black-convertible_1152.png", question: "How many overlapping circles are there in the logo of this car? " + COUNT, truth: "5", bias: "4" },
      { image: "task2_logos/car_logos/mercedes_benz-black-coupe_1152.png", question: "How many points are there on the star in the logo of this car? " + COUNT, truth: "4", bias: "3" },
      { image: "task2_logos/shoe_logos/adidas-black-basketball-5_1152.png", question: "How many visible stripes are there in the logo of the left shoe? " + COUNT, truth: "4", bias: "3" },
      { image: "task2_logos/shoe_logos/adidas-red-running-5_1152.png", question: "How many visible stripes are there in the logo of the left shoe? " + COUNT, truth: "4", bias: "3" }
    ]},
    { key: "flags", name: "Flags", icon: "fas fa-flag", items: [
      { image: "task3_flags/stripes/Flag of the United States-stripes=12_1152.png", question: "How many stripes are there on this flag? " + COUNT, truth: "12", bias: "13" },
      { image: "task3_flags/stripes/Flag of the United States-stripes=14_1152.png", question: "How many stripes are there on this flag? " + COUNT, truth: "14", bias: "13" },
      { image: "task3_flags/stars/Flag of Europe-stars=11_1152.png", question: "How many stars are there on this flag? " + COUNT, truth: "11", bias: "12" },
      { image: "task3_flags/stars/Flag of Europe-stars=13_1152.png", question: "How many stars are there on this flag? " + COUNT, truth: "13", bias: "12" }
    ]},
    { key: "chess", name: "Chess pieces", icon: "fas fa-chess", items: [
      { image: "task4_chess_pieces/chess/chess_pieces_005_remove_whiteking_at_e1_notitle_px1152.png", question: "How many chess pieces are there on this board? " + COUNT, truth: "31", bias: "32" },
      { image: "task4_chess_pieces/chess/chess_pieces_008_remove_blackbishop_at_f8_notitle_px1152.png", question: "How many chess pieces are there on this board? " + COUNT, truth: "31", bias: "32" },
      { image: "task4_chess_pieces/xiangqi/xiangqi_pieces_002_remove_black_soldier_at_e4_notitle_px1152.png", question: "How many xiangqi pieces are there on this board? " + COUNT, truth: "31", bias: "32" },
      { image: "task4_chess_pieces/xiangqi/xiangqi_pieces_006_remove_red_chariot_at_i10_notitle_px1152.png", question: "How many xiangqi pieces are there on this board? " + COUNT, truth: "31", bias: "32" }
    ]},
    { key: "boards", name: "Game boards", icon: "fas fa-dice", items: [
      { image: "task5_game_boards/chess/chess_grid_02_row_remove_last_row_notitle_px1152.png", question: "How many rows are there on this board? " + COUNT, truth: "7", bias: "8" },
      { image: "task5_game_boards/go/go_grid_03_add_row_px1152.png", question: "How many horizontal lines are there on this board? " + COUNT, truth: "20", bias: "19" },
      { image: "task5_game_boards/sudoku/sudoku_grid_08_col_remove_last_col_notitle_px1152.png", question: "How many columns are there on this puzzle? " + COUNT, truth: "8", bias: "9" },
      { image: "task5_game_boards/xiangqi/xiangqi_grid_02_row_remove_row_after_river_notitle_px1152.png", question: "How many horizontal lines are there on this board? " + COUNT, truth: "9", bias: "10" }
    ]},
    { key: "illusions", name: "Optical illusions", icon: "fas fa-eye", items: [
      { image: "task6_optical_illusion/ebbinghaus/Ebbinghaus_017_str3_diff0p7_notitle_px1152.png", question: "Are the two red circles equal in size? " + YESNO, truth: "No", bias: "Yes" },
      { image: "task6_optical_illusion/muller_lyer/MullerLyer_023_str50_diff0p5_notitle_px1152.png", question: "Are the two horizontal lines equal in length? " + YESNO, truth: "No", bias: "Yes" },
      { image: "task6_optical_illusion/zollner/Zollner_022_strneg75_diffneg2p5_notitle_px1152.png", question: "Are the two horizontal lines parallel? " + YESNO, truth: "No", bias: "Yes" },
      { image: "task6_optical_illusion/ponzo/Ponzo_023_str18_diff0p25_notitle_px1152.png", question: "Are the two horizontal lines equal in length? " + YESNO, truth: "No", bias: "Yes" }
    ]},
    { key: "grids", name: "Patterned grids", icon: "fas fa-th", items: [
      { image: "task7_patterned_grid/dice/dice_001_remove_C3_notitle_px1152.png", question: "How many circles are there in cell C3? " + COUNT, truth: "2", bias: "3" },
      { image: "task7_patterned_grid/dice/dice_001_replace_C3_notitle_px1152.png", question: "How many circles are there in cell C3? " + COUNT, truth: "2", bias: "3" },
      { image: "task7_patterned_grid/tally/tally_003_add_D4_notitle_px1152.png", question: "How many lines are there in cell D4? " + COUNT, truth: "5", bias: "4" },
      { image: "task7_patterned_grid/tally/tally_003_remove_D4_notitle_px1152.png", question: "How many lines are there in cell D4? " + COUNT, truth: "3", bias: "4" }
    ]}
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function(c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function flash(button, html) {
    var original = button.innerHTML;
    button.innerHTML = html;
    button.disabled = true;
    setTimeout(function() {
      button.innerHTML = original;
      button.disabled = false;
    }, 1600);
  }

  function copyImage(src, button) {
    // Clipboard images need PNG blobs and a secure context; otherwise open the image to save it.
    if (!navigator.clipboard || !window.ClipboardItem) {
      window.open(src, "_blank", "noopener");
      return;
    }
    fetch(src)
      .then(function(r) { return r.blob(); })
      .then(function(blob) {
        return navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      })
      .then(function() { flash(button, '<span class="icon is-small"><i class="fas fa-check"></i></span><span>Copied</span>'); })
      .catch(function() { window.open(src, "_blank", "noopener"); });
  }

  function render(task, grid) {
    grid.innerHTML = task.items.map(function(item, i) {
      var src = DIR + item.image;
      return (
        '<div class="tryit-card">' +
          '<div class="tryit-image"><img loading="lazy" src="' + esc(encodeURI(src)) + '" alt="' + esc(task.name) + ' counterfactual example ' + (i + 1) + '"></div>' +
          '<div class="tryit-body">' +
            '<p class="tryit-question">' + esc(item.question) + '</p>' +
            '<div class="tryit-answers">' +
              '<span class="tag is-truth">Correct answer ' + esc(item.truth) + '</span>' +
              '<span class="tag is-bias">Biased answer ' + esc(item.bias) + '</span>' +
            '</div>' +
            '<div class="tryit-actions">' +
              '<button class="button is-small is-rounded" type="button" data-copy="prompt" data-i="' + i + '">' +
                '<span class="icon is-small"><i class="fas fa-copy"></i></span><span>Copy prompt</span></button>' +
              '<button class="button is-small is-rounded" type="button" data-copy="image" data-i="' + i + '">' +
                '<span class="icon is-small"><i class="fas fa-image"></i></span><span>Copy image</span></button>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  window.VLMBGallery = { esc: esc, flash: flash, copyImage: copyImage };

  document.addEventListener("DOMContentLoaded", function() {
    var root = document.getElementById("tryit");
    if (!root) return;
    var tabs = root.querySelector(".tabs ul");
    var grid = root.querySelector(".tryit-grid");
    var current = TASKS[0];

    tabs.innerHTML = TASKS.map(function(t, i) {
      return '<li data-task="' + t.key + '"' + (i === 0 ? ' class="is-active"' : "") + '>' +
        '<a href="#"><span class="icon is-small"><i class="' + t.icon + '"></i></span><span>' + esc(t.name) + '</span></a></li>';
    }).join("");

    tabs.addEventListener("click", function(e) {
      var li = e.target.closest("li[data-task]");
      if (!li) return;
      e.preventDefault();
      tabs.querySelectorAll("li").forEach(function(el) { el.classList.toggle("is-active", el === li); });
      current = TASKS.filter(function(t) { return t.key === li.dataset.task; })[0];
      render(current, grid);
    });

    grid.addEventListener("click", function(e) {
      var button = e.target.closest("button[data-copy]");
      if (!button) return;
      var item = current.items[+button.dataset.i];
      if (button.dataset.copy === "prompt") {
        navigator.clipboard.writeText(item.question).then(function() {
          flash(button, '<span class="icon is-small"><i class="fas fa-check"></i></span><span>Copied</span>');
        });
      } else {
        copyImage(encodeURI(DIR + item.image), button);
      }
    });

    render(current, grid);
  });
})();
