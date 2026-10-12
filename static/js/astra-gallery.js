// GPT-6 Astra failure gallery: one tab per task, with copyable prompts and images.
(function() {
  var DIR = "static/images/astra/";
  var H = window.VLMBGallery;

  function reasoning(item) {
    if (item.quote) return '<p class="astra-quote">&ldquo;' + H.esc(item.quote) + '&rdquo;</p>';
    if (item.tokens === 0) return '<p class="astra-quote is-empty">Answered immediately, without reasoning.</p>';
    return '<p class="astra-quote is-empty">No reasoning summary returned.</p>';
  }

  function render(task, grid) {
    grid.innerHTML = task.items.map(function(item, i) {
      var src = encodeURI(DIR + item.image);
      var zoom = item.zoom ? '<img class="astra-zoom" loading="lazy" src="' + H.esc(encodeURI(DIR + item.zoom)) + '" alt="Close-up of the logo">' : "";
      return (
        '<div class="box astra-card">' +
          '<div class="astra-media"><img loading="lazy" src="' + H.esc(src) + '" alt="' + H.esc(task.name) + ' example that GPT-6 Astra got wrong">' + zoom + '</div>' +
          '<p class="astra-q">' + H.esc(item.question) + '</p>' +
          '<p class="astra-ans"><span class="tag is-truth">Correct answer ' + H.esc(item.truth) + '</span>' +
            '<span class="tag is-bias"><img class="model-icon" src="./static/icons/models/openai.png" alt="">Astra says ' + H.esc(item.answer) + '</span>' +
            '<span class="astra-tokens">' + item.tokens + ' reasoning tokens</span></p>' +
          reasoning(item) +
          '<div class="tryit-actions">' +
            '<button class="button is-small is-rounded" type="button" data-copy="prompt" data-i="' + i + '">' +
              '<span class="icon is-small"><i class="fas fa-copy"></i></span><span>Copy prompt</span></button>' +
            '<button class="button is-small is-rounded" type="button" data-copy="image" data-i="' + i + '">' +
              '<span class="icon is-small"><i class="fas fa-image"></i></span><span>Copy image</span></button>' +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", function() {
    var root = document.getElementById("astra-gallery");
    var data = window.ASTRA_FAILURES;
    if (!root || !data || !H) return;
    var tabs = root.querySelector(".tabs ul");
    var grid = root.querySelector(".astra-grid");
    var current = data[0];

    tabs.innerHTML = data.map(function(t, i) {
      return '<li data-task="' + t.key + '"' + (i === 0 ? ' class="is-active"' : "") + '>' +
        '<a href="#"><span class="icon is-small"><i class="' + t.icon + '"></i></span><span>' + H.esc(t.name) + '</span></a></li>';
    }).join("");

    tabs.addEventListener("click", function(e) {
      var li = e.target.closest("li[data-task]");
      if (!li) return;
      e.preventDefault();
      tabs.querySelectorAll("li").forEach(function(el) { el.classList.toggle("is-active", el === li); });
      current = data.filter(function(t) { return t.key === li.dataset.task; })[0];
      render(current, grid);
    });

    grid.addEventListener("click", function(e) {
      var button = e.target.closest("button[data-copy]");
      if (!button) return;
      var item = current.items[+button.dataset.i];
      if (button.dataset.copy === "prompt") {
        navigator.clipboard.writeText(item.question).then(function() {
          H.flash(button, '<span class="icon is-small"><i class="fas fa-check"></i></span><span>Copied</span>');
        });
      } else {
        H.copyImage(encodeURI(DIR + item.image), button);
      }
    });

    render(current, grid);
  });
})();
