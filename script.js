/*!
 * jQuery CLI
 * Simulating a command line interface with jQuery
 *
 * @version : 1.0.0
 * @author : Paulo Nunes (http://syndicatefx.com)
 * @demo : https://codepen.io/syndicatefx/pen/jPxXpz
 * @license: MIT
 */

/*!*
 * jQuery Text Typer plugin
 * https://github.com/gr8pathik/jquery-texttyper
 */
(function (e) {
  "use strict";
  e.fn.textTyper = function (t) {
    var n = {
        typingClass: "typing",
        beforeAnimation: function () {},
        afterAnimation: function () {},
        speed: 10,
        nextLineDelay: 400,
        startsFrom: 0,
        repeatAnimation: false,
        repeatDelay: 4e3,
        repeatTimes: 1,
        cursorHtml: '<span class="cursor">|</span>',
      },
      r = e.extend({}, n, t);
    this.each(function () {
      var t = e(this),
        n = 1,
        i = "typingCursor";
      var s = t,
        o = s.length,
        u = [];
      while (o--) {
        u[o] = e.trim(e(s[o]).html());
        e(s[o]).html("");
      }
      t.init = function (e) {
        var n = r.beforeAnimation;
        if (n) n();
        t.animate(0);
      };
      t.animate = function (o) {
        var a = s[o],
          f = r.typingClass,
          l = r.startsFrom;
        e(a).addClass(f);
        var c = setInterval(function () {
          var f = r.cursorHtml;
          f = e("<div>").append(e(f).addClass(i)).html();
          e(a).html(u[o].substr(0, l) + f);
          l++;
          if (u[o].length < l) {
            clearInterval(c);
            o++;
            if (s[o]) {
              setTimeout(function () {
                e(a).html(u[o - 1]);
                t.animate(o);
              }, r.nextLineDelay);
            } else {
              e(a)
                .find("." + i)
                .remove();
              if (
                r.repeatAnimation &&
                (r.repeatTimes == 0 || n < r.repeatTimes)
              ) {
                setTimeout(function () {
                  t.animate(0);
                  n++;
                }, r.repeatDelay);
              } else {
                var h = r.afterAnimation;
                if (h) h();
              }
            }
          }
        }, r.speed);
      };
      t.init();
    });
    return this;
  };
})(jQuery);

var destination = "home";
var skipped = false;

$(document).ready(function () {
  var sectionArray = [];
  $("section").each(function (i, e) {
    sectionArray.push($(e).attr("id"));
  });
  for (var i = 0; i < sectionArray.length; i++) {
    $("#" + sectionArray[i])
      .clone()
      .attr("id", "copy" + sectionArray[i])
      .insertBefore("copy");
  }
  console.log(sectionArray);

  document.addEventListener("keydown", function (event) {
    if (event.key == " ") {
      $("#" + destination).remove();
      $("#copy" + destination)
        .clone()
        .attr("id", destination)
        .appendTo("main");
      $("#" + destination).addClass("open");
      $(".command").fadeIn();
      $('input[type="text"]').focus();
      $('input[type="text"]').val("");
      skipped = true;
    }
  });

  $(".command").hide();
  $('input[type="text"]').focus();
  $("#copyhome").removeClass("open");
  $("#home").addClass("open");
  $("#home").textTyper({
    speed: 5,
    afterAnimation: function () {
      if (skipped == false) {
        $(".command").fadeIn();
        $('input[type="text"]').focus();
        $('input[type="text"]').val("");
      }
      skipped = false;
    },
  });

  // Command Input------------------------------

  $('input[type="text"]').keyup(function (e) {
    if (e.which == 13) {
      // ENTER key pressed

      $(".command").hide();
      destination = $('input[type="text"]').val().trim();

      if ($.inArray(destination, sectionArray) == -1) {
        destination = "error";
      }

      if (destination == "resume") {
        window.open("https://rmuresan.com/Resume.pdf", "_blank");
      }

      // Display section with id == destination and hide all others
      $('section[id="' + destination + '"]')
        .addClass("open")
        .siblings()
        .removeClass("open");

      $(".open").textTyper({
        speed: 5,
        afterAnimation: function () {
          $(".command").fadeIn();
          $('input[type="text"]').focus();
          $('input[type="text"]').val("");
        },
      });
    }
  });
});
