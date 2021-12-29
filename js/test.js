$(function () {
  document.createElement("picture");
  class Menu {
    constructor(obj) {
      this.name = obj.name;
      this.search = $(".search");
      this.nav = $(".navigation");
      this.body = $("body");
    }
    // --- menu初始化 新增側欄選單
    prepend() {
      // --- 綁定外層的this
      let that = this;
      that.body.prepend(
        '<aside class="sidebar"><div class="m_area"><button type="button" class="sidebarClose">關閉</button></div><div class="menu_overlay"></div></aside>'
      );
      $("header .container").prepend(
        '<button type="button" class="sidebarCtrl">側欄選單</button><button type="button" class="searchCtrl">查詢</button>'
      );
      that.name.find("li").has("ul").addClass("hasChild");
      $(".sidebarCtrl").append("<span></span><span></span><span></span>");
    }
    // --- menu初始化 複製手機版側欄選單
    clone() {
      // --- 綁定外層的this
      let that = this;
      // 先複製過去
      that.nav.clone().prependTo($(".m_area"));
      that.name.clone().prependTo($(".m_area"));
      that.search
        .clone()
        .prependTo(that.body)
        .removeClass("search")
        .addClass("m_search");
    }
    initial() {
      this.prepend();
      this.clone();
    }
  }
  //   console.log("2");

  class MobileMenu {
    constructor(obj) {
      this.window = $(window);
      this.body = $("body");
      this.ww = $(window).outerWidth();
      this.wwSmall = 768;
      this.menu_status = false;
      this.sidebar = $(".sidebar");
      this.search = $(".search");
      this.name = obj.name;
      // this.megamenu = $(".megamenu");
      this.nav = $(".navigation");
      this.sidebarClose = $(".sidebarClose");
      this.sidebarCtrl = $(".sidebarCtrl");
      this.overlay = $(".menu_overlay");
      this.mArea = $(".m_area");
      ///////////////////////////////////////
      this.menu = null;
      this.menu_liHasChild = "" || null;
      this.menu_liHasChild_level1 = "" || null;
      this.menu_liHasChild_level2 = "" || null;
      this.menu_liHasChild_level3 = "" || null;
    }

    //判斷ＭＥＮＵ的型態
    judgeMenu() {
      // console.log(this.name.hasClass("megamenu"));
      if (this.name.hasClass("menu")) {
        this.menu = ".menu";
      }
      if (this.name.hasClass("megamenu")) {
        this.menu = ".megamenu";
      }
      console.log(this.menu);
      /*-----------------------------------*/
      /////////////// 手機版設定 /////////////
      /*-----------------------------------*/
      this.menu_liHasChild = this.name.find("li.hasChild");
      this.menu_liHasChild_level1 = $(`aside ${this.menu} ul `).children(
        "li.hasChild"
      );
      this.menu_liHasChild_level2 = $(`aside ${this.menu} ul ul`).children(
        "li.hasChild"
      );
      this.menu_liHasChild_level3 = $(`aside ${this.menu} ul ul ul`).children(
        "li.hasChild"
      );
    }
    // --- 切換 PC/Mobile 選單
    switchMenu() {
      // --- 綁定外層的this
      let that = this;
      if ($(window).outerWidth() < that.wwSmall) {
        this.mobileSet();
      } else {
        this.pcSet();
      }
    }

    mobileSet() {
      let that = this;
      /*-----------------------------------*/
      /////////////// 手機版設定 /////////////
      /*-----------------------------------*/
      that.menu_status = false;
      that.sidebar.hide();
      that.overlay.hide();
      that.mArea.css({
        "margin-left": that.mArea.width() * -1 + "px",
      });
      that.menu_liHasChild_level1.on({
        mouseenter: function () {
          $(this)
            .children("ul")
            .stop(true, true)
            .slideDown("600", "easeOutQuint");
        },
        mouseleave: function () {
          $(this).parent().siblings("ul").hide();
          $(this)
            .children("ul")
            .stop(true, true)
            .slideUp("600", "easeOutQuint");
        },
      });
      // --- 副選單點出
      that.menu_liHasChild.off().on("mouseenter,mouseleave");
      that.menu_liHasChild.on("touchstart", function () {
        $(this).off("mouseenter,mouseleave");
      });
      // --- 第一層選單
      that.menu_liHasChild_level1.off().on("click", function (e) {
        $(this)
          .siblings("li")
          .find("ul")
          .stop(true, true)
          .slideUp("600", "easeOutQuint");
        $(this)
          .children("ul")
          .stop(true, true)
          .slideDown("600", "easeOutQuint");
      });
      // --- 第二層選單
      that.menu_liHasChild_level2.off().on("click", function (e) {
        $(this)
          .siblings("li")
          .children("ul")
          .stop(true, true)
          .slideUp("600", "easeOutQuint");
        $(this)
          .children("ul")
          .stop(true, true)
          .slideDown("600", "easeOutQuint");
      });
      // --- 第三層選單
      that.menu_liHasChild_level3.off().on("click", function (e) {
        e.preventDefault();
      });
      // --- 手機版第第一層點了不會進入內頁，拿掉第一層的連結無作用
      $(`.sidebar ${that.menu} .hasChild`)
        .children("a")
        .off()
        .on("click", function (e) {
          e.preventDefault();
        });
      //
      that.body.off("touchmove");
      $(".m_search").hide();
      $(".language").find("ul").hide();
    }
    pcSet() {
      let that = this;
      /*-----------------------------------*/
      /////////////// PC版設定 /////////////
      /*-----------------------------------*/
      that.hideSidebar();
      that.body.removeClass("noscroll");
      $(".m_search").hide();
      that.search_mode = false;
      $(".language").find("ul").hide();
      // 副選單滑出
      that.menu_liHasChild.on({
        mouseenter: function () {
          $(this).children("ul").stop(true, false).fadeIn();
        },
        mouseleave: function () {
          $(this).parent().siblings("ul").hide();
          $(this).children("ul").stop(true, false).fadeOut();
        },
      });
      that.menu_liHasChild.off("click");
      // megamenu
      // 副選單滑出
      $(".megamenu").children("ul").children("li").children("ul").hide();
      // 傳統menu
      console.log(that.menu_liHasChild);
      that.menu_liHasChild.on({
        mouseenter: function () {
          $(this).children("ul").stop(true, false).fadeIn();
        },
        mouseleave: function () {
          $(this).parent().siblings("ul").hide();
          $(this).children("ul").stop(true, false).fadeOut();
        },
      });
      // // megamenu
      // if (that._megamenu.lenght > 0) {
      //   th.megamenu_liHasChild.on({
      //     mouseenter: function () {
      //       $(this).children("ul").stop(true, false).fadeIn();
      //     },
      //     mouseleave: function () {
      //       $(this).parent().siblings("ul").hide();
      //       $(this).children("ul").stop(true, false).fadeOut();
      //     },
      //   });
      // }
    }
    // --- 當改變視窗尺寸時  重新切換 PC/Mobile 選單
    resize() {
      // --- 綁定外層的this
      let that = this;
      // --- 行動版/電腦版切換
      var resizeTimer;
      that.window.on("resize", function (event) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          $(".m_search").hide();
          that.switchMenu();
        }, 50);
      });
    }
    // --- 展開側邊選單函式
    showSidebar() {
      // --- 綁定外層的this
      let that = this;
      that.sidebar.show();
      that.mArea.show().addClass("open");
      that.mArea.animate(
        {
          "margin-left": 0,
        },
        400,
        "easeOutQuint"
      );
      that.body.addClass("noscroll");
      that.overlay.fadeIn();
      $(".m_search").hide();
      that.search_mode = false;
    }
    // --- 點擊選單按鈕 執行 展開側邊選單函式
    sidebarCtrlFn() {
      // --- 綁定外層的this
      let that = this;
      $(".sidebarCtrl")
        .off()
        .click(function (e) {
          that.showSidebar();
          e.preventDefault();
        });
    }
    // --- 隱藏側邊選單函式
    hideSidebar() {
      // --- 綁定外層的this
      let that = this;
      $(".m_area").animate(
        {
          "margin-left": that.mArea.width() * -1 + "px",
        },
        500,
        "easeOutQuint",
        function () {
          $(".sidebar").fadeOut(200);
          $(".m_area").removeClass("open");
          $(".m_area").hide();
        }
      );
      that.body.removeClass("noscroll");
      that.overlay.fadeOut();
      that.menu_liHasChild.children("ul").hide();
    }
    // --- 黑色遮罩點擊 關閉側邊選單
    overlayFn() {
      // --- 綁定外層的this
      let that = this;
      that.overlay
        .add(that.sidebarClose)
        .off()
        .click(function () {
          that.hideSidebar();
        });
      that.overlay.off("mouseenter");
    }
    initial() {
      this.judgeMenu();
      this.switchMenu();
      this.resize();
      this.sidebarCtrlFn();
      this.overlayFn();
    }
  }
  let mobileMenu1 = new MobileMenu({
    name: $(".megamenu"),
  });
  mobileMenu1.initial();
});
