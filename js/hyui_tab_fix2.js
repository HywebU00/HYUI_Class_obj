$(function () {
  // ================  MENU初始化
  // ///////////////// nojs 先移除
  // ================= 手機桌機版本切換及手機版menu設定
  // ================= 手機版本search設定
  // ================= menu 訊息區塊 sticky
  // ================= menu的無障礙tab設定
  // ///////////////// notice訊息區塊
  // ////////////////  Accordion設定
  // ================ fatfooter開關
  // //////////////// 多組Tab
  // ================ 置頂go to top
  // /////////////////// 設定img 在IE9+ SAFARI FIREFOX CHROME 可以object-fit
  // /////////////////// form表單 placeholder隱藏/
  // /////////////////// form表單 單個檔案上傳+多個檔案上傳
  // ================ 分享按鈕 share dropdwon
  // 字型大小 font-size
  // /////////////////// category active
  // =================  無障礙快捷鍵盤組合
  // ////////////////// 無障礙切換slick箭頭語系
  // ================ gotoCenter on focus跳到 content
  // ================= 語言模組 無障礙遊走設定
  // table 加上響應式 scroltable-wrapper
  // =================  table 加上 data-title
  // //////////////// lazy load

  document.createElement("picture");
  /*-----------------------------------*/
  /////////////// MENU初始化 ///////////
  /*-----------------------------------*/
  class Menu {
    constructor() {
      this.name = "" || null;
      this.search = $(".search");
      this.nav = $(".navigation");
      this.body = $("body");
    }

    // --- 判斷menu樣式
    getMenuName() {
      let getname = $(".header .container nav").hasClass("menu");
      let getMeganame = $(".header .container nav").hasClass("megamenu");
      if (getname) {
        this.name = $(".menu");
      }
      if (getMeganame) {
        this.name = $(".megamenu");
      }
    }

    // --- menu初始化 新增側欄選單
    prepend() {
      this.getMenuName();
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
  let menu = new Menu({});
  menu.initial();
  // var menu = {
  //   _body: $("body"),
  //   _menu: $(".menu"),
  //   _megamenu: $(".megamenu"),
  //   _search: $(".search"),
  //   _nav: $(".navigation"),
  //   // --- menu初始化 新增側欄選單
  //   prepend: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th._body.prepend(
  //       '<aside class="sidebar"><div class="m_area"><button type="button" class="sidebarClose">關閉</button></div><div class="menu_overlay"></div></aside>'
  //     );
  //     $("header .container").prepend(
  //       '<button type="button" class="sidebarCtrl">側欄選單</button><button type="button" class="searchCtrl">查詢</button>'
  //     );
  //     th._menu.find("li").has("ul").addClass("hasChild");
  //     th._megamenu.find("li").has("ul").addClass("hasChild");
  //     $(".sidebarCtrl").append("<span></span><span></span><span></span>");
  //   },
  //   // --- menu初始化 複製手機版側欄選單
  //   clone: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     // 先複製過去
  //     th._nav.clone().prependTo($(".m_area"));
  //     th._menu.clone().prependTo($(".m_area"));
  //     th._megamenu.clone().prependTo($(".m_area"));
  //     th._search
  //       .clone()
  //       .prependTo(th._body)
  //       .removeClass("search")
  //       .addClass("m_search");
  //   },
  // };
  // // --- menu初始化 新增側欄選單
  // menu.prepend();
  // // --- menu初始化 複製手機版側欄選單
  // menu.clone();
  /*-----------------------------------*/
  ///////// 手機版本search設定 ////////////
  /*-----------------------------------*/
  class Search {
    constructor(obj) {
      this.search_mode = false;
      this._window = $(window);
      this.name = $(".searchCtrl");
      this.control = obj.control;
      this.isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
    }
    // --- 點擊搜尋區初始化設定
    searchInit() {
      // --- 綁定外層的this
      let that = this;
      that.control.hide();
    }
    // --- 搜尋區內容開關函示
    searchToggle() {
      // --- 綁定外層的this
      let that = this;
      if (!that.search_mode) {
        that.control.stop(true, false).slideDown("400", "easeOutQuint");
        // $('.m_search').find('input[type="text"]').focus();
        that.search_mode = true;
        // prevent Android sofr Keyboard
        if (that.isAndroid) {
          that._window.off("resize");
        }
      } else {
        that.control.hide();
        that.search_mode = false;
      }
      // --- 停止冒泡事件
      that.stopPop();
    }
    // --- 點擊搜尋按鈕開關
    searchClick() {
      // --- 綁定外層的this
      let that = this;
      that.name.off().on("click", function (e) {
        that.searchToggle();
      });
    }
    // --- 點擊搜尋區以外的區塊
    clickOther() {
      // --- 綁定外層的this
      let that = this;
      // 如果點在外面
      $(document.body).click(function (e) {
        if (that.search_mode) {
          that.searchToggle();
          that.search_mode = false;
        }
      });
    }
    // --- 停止冒泡事件
    stopPop() {
      $(".m_search ,.searchCtrl").click(function (e) {
        e.stopPropagation();
      });
    }
    initial() {
      this.searchInit();
      this.searchToggle();
      this.searchClick();
      this.clickOther();
    }
  }
  let search1 = new Search({
    name: $(".searchCtrl"),
    control: $(".m_search"),
  });
  search1.initial();
  /*-----------------------------------*/
  //////////// nojs 先移除////////////////
  /*-----------------------------------*/
  $("html").removeClass("no-js");

  /*-----------------------------------*/
  //// 手機桌機版本切換及手機版menu設定 //////
  /*-----------------------------------*/
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
      this.menu_liHasChild = null;
      this.menu_liHasChild_level1 = null;
      this.menu_liHasChild_level2 = null;
      this.menu_liHasChild_level3 = null;
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
      // console.log(this.menu);
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
      // console.log(that.menu_liHasChild);
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
  let mobileMenu2 = new MobileMenu({
    name: $(".menu"),
  });
  mobileMenu2.initial();

  // var mobileMenu = {
  //   _window: $(window),
  //   _body: $("body"),
  //   ww: $(window).outerWidth(),
  //   wwSmall: 768,
  //   menu_status: false,
  //   _sidebar: $(".sidebar"),
  //   _search: $(".search"),
  //   _menu: $(".menu"),
  //   _megamenu: $(".megamenu"),
  //   _nav: $(".navigation"),
  //   _sidebarClose: $(".sidebarClose"),
  //   _sidebarCtrl: $(".sidebarCtrl"),
  //   _overlay: $(".menu_overlay"),
  //   _mArea: $(".m_area"),
  //   menu_liHasChild: $(".menu").find("li.hasChild"),
  //   megamenu_liHasChild: $(".megamenu").children("ul").children("li.hasChild"),
  //   menu_liHasChild_level1: $("aside .menu ul").children("li.hasChild"),
  //   menu_liHasChild_level2: $("aside .menu ul ul").children("li.hasChild"),
  //   menu_liHasChild_level3: $("aside .menu ul ul ul").children("li.hasChild"),
  //   megamenu_liHasChild_level1: $("aside .megamenu ul").children("li.hasChild"),
  //   megamenu_liHasChild_level2: $("aside .megamenu ul ul").children(
  //     "li.hasChild"
  //   ),
  //   megamenu_liHasChild_level3: $("aside .megamenu ul ul ul").children(
  //     "li.hasChild"
  //   ),
  //   // --- 切換 PC/Mobile 選單
  //   switchMenu: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     // --- 視窗尺寸小於 wwSmall 執行 手機版本設定
  //     if ($(window).outerWidth() < th.wwSmall) {
  //       /*-----------------------------------*/
  //       /////////////// 手機版設定 /////////////
  //       /*-----------------------------------*/
  //       th.menu_status = false;
  //       th._sidebar.hide();
  //       th._overlay.hide();
  //       th._mArea.css({
  //         "margin-left": th._mArea.width() * -1 + "px",
  //       });
  //       th.menu_liHasChild_level1.on({
  //         mouseenter: function () {
  //           $(this)
  //             .children("ul")
  //             .stop(true, true)
  //             .slideDown("600", "easeOutQuint");
  //         },
  //         mouseleave: function () {
  //           $(this).parent().siblings("ul").hide();
  //           $(this)
  //             .children("ul")
  //             .stop(true, true)
  //             .slideUp("600", "easeOutQuint");
  //         },
  //       });
  //       // --- 副選單點出
  //       th.menu_liHasChild.off().on("mouseenter,mouseleave");
  //       th.menu_liHasChild.on("touchstart", function () {
  //         $(this).off("mouseenter,mouseleave");
  //       });
  //       // --- 第一層選單
  //       th.menu_liHasChild_level1.off().on("click", function (e) {
  //         $(this)
  //           .siblings("li")
  //           .find("ul")
  //           .stop(true, true)
  //           .slideUp("600", "easeOutQuint");
  //         $(this)
  //           .children("ul")
  //           .stop(true, true)
  //           .slideDown("600", "easeOutQuint");
  //       });
  //       // --- 第二層選單
  //       th.menu_liHasChild_level2.off().on("click", function (e) {
  //         $(this)
  //           .siblings("li")
  //           .children("ul")
  //           .stop(true, true)
  //           .slideUp("600", "easeOutQuint");
  //         $(this)
  //           .children("ul")
  //           .stop(true, true)
  //           .slideDown("600", "easeOutQuint");
  //       });
  //       // --- 第三層選單
  //       th.menu_liHasChild_level3.off().on("click", function (e) {
  //         e.preventDefault();
  //       });
  //       // --- 手機版第第一層點了不會進入內頁，拿掉第一層的連結無作用
  //       $(".sidebar .menu .hasChild")
  //         .children("a")
  //         .off()
  //         .on("click", function (e) {
  //           e.preventDefault();
  //         });
  //       // megamenu
  //       th.megamenu_liHasChild_level1.on({
  //         mouseenter: function () {
  //           $(this)
  //             .children("ul")
  //             .stop(true, true)
  //             .slideDown("600", "easeOutQuint");
  //         },
  //         mouseleave: function () {
  //           $(this).parent().siblings("ul").hide();
  //           $(this)
  //             .children("ul")
  //             .stop(true, true)
  //             .slideUp("600", "easeOutQuint");
  //         },
  //       });
  //       // 副選單點出
  //       th.megamenu_liHasChild.off().on("mouseenter,mouseleave");
  //       th.megamenu_liHasChild.on("touchstart", function () {
  //         $(this).off("mouseenter,mouseleave");
  //       });
  //       // 第一層選單
  //       th.megamenu_liHasChild_level1.off().on("click", function (e) {
  //         $(this)
  //           .siblings("li")
  //           .find("ul")
  //           .stop(true, true)
  //           .slideUp("600", "easeOutQuint");
  //         $(this)
  //           .children("ul")
  //           .stop(true, true)
  //           .slideDown("600", "easeOutQuint");
  //       });
  //       // 第二層選單
  //       th.megamenu_liHasChild_level2.off().on("click", function (e) {
  //         $(this)
  //           .siblings("li")
  //           .children("ul")
  //           .stop(true, true)
  //           .slideUp("600", "easeOutQuint");
  //         $(this)
  //           .children("ul")
  //           .stop(true, true)
  //           .slideDown("600", "easeOutQuint");
  //       });
  //       // 第三層選單
  //       th.megamenu_liHasChild_level3.off().on("click", function (e) {
  //         e.preventDefault();
  //       });
  //       //手機版第第一層點了不會進入內頁，拿掉第一層的連結無作用
  //       $(".sidebar .megamenu .hasChild")
  //         .children("a")
  //         .off()
  //         .on("click", function (e) {
  //           e.preventDefault();
  //         });
  //       //
  //       th._body.off("touchmove");
  //       $(".m_search").hide();
  //       $(".language").find("ul").hide();
  //     } else {
  //       /*-----------------------------------*/
  //       /////////////// PC版設定 /////////////
  //       /*-----------------------------------*/
  //       th.hideSidebar();
  //       th._body.removeClass("noscroll");
  //       $(".m_search").hide();
  //       th.search_mode = false;
  //       $(".language").find("ul").hide();
  //       // 副選單滑出
  //       th.menu_liHasChild.on({
  //         mouseenter: function () {
  //           $(this).children("ul").stop(true, false).fadeIn();
  //         },
  //         mouseleave: function () {
  //           $(this).parent().siblings("ul").hide();
  //           $(this).children("ul").stop(true, false).fadeOut();
  //         },
  //       });
  //       th.menu_liHasChild.off("click");
  //       // megamenu
  //       // 副選單滑出
  //       th.megamenu_liHasChild.on({
  //         mouseenter: function () {
  //           $(this).children("ul").stop(true, false).fadeIn();
  //         },
  //         mouseleave: function () {
  //           $(this).parent().siblings("ul").hide();
  //           $(this).children("ul").stop(true, false).fadeOut();
  //         },
  //       });
  //       th.megamenu_liHasChild.off("click");
  //       $(".megamenu").children("ul").children("li").children("ul").hide();
  //       // 傳統menu
  //       if (th._menu.lenght > 0) {
  //         th.menu_liHasChild.on({
  //           mouseenter: function () {
  //             $(this).children("ul").stop(true, false).fadeIn();
  //           },
  //           mouseleave: function () {
  //             $(this).parent().siblings("ul").hide();
  //             $(this).children("ul").stop(true, false).fadeOut();
  //           },
  //         });
  //       }
  //       // megamenu
  //       if (th._megamenu.lenght > 0) {
  //         th.megamenu_liHasChild.on({
  //           mouseenter: function () {
  //             $(this).children("ul").stop(true, false).fadeIn();
  //           },
  //           mouseleave: function () {
  //             $(this).parent().siblings("ul").hide();
  //             $(this).children("ul").stop(true, false).fadeOut();
  //           },
  //         });
  //       }
  //       // 如果點在外面
  //       // $(document).on('touchend click', function(e) {
  //       //     var target = e.target;
  //       //     if (!$(target).is('.menu li a')) {
  //       //         $('.menu').find('li ul').hide();
  //       //     }
  //       // });
  //     }
  //   },
  //   // --- 當改變視窗尺寸時  重新切換 PC/Mobile 選單
  //   resize: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     // --- 行動版/電腦版切換
  //     var resizeTimer;
  //     th._window.on("resize", function (event) {
  //       clearTimeout(resizeTimer);
  //       resizeTimer = setTimeout(function () {
  //         $(".m_search").hide();
  //         th.switchMenu();
  //       }, 50);
  //     });
  //   },
  //   // --- 展開側邊選單函式
  //   showSidebar: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th._sidebar.show();
  //     th._mArea.show().addClass("open");
  //     th._mArea.animate(
  //       {
  //         "margin-left": 0,
  //       },
  //       400,
  //       "easeOutQuint"
  //     );
  //     th._body.addClass("noscroll");
  //     th._overlay.fadeIn();
  //     $(".m_search").hide();
  //     th.search_mode = false;
  //   },
  //   // --- 點擊選單按鈕 執行 展開側邊選單函式
  //   sidebarCtrl: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     $(".sidebarCtrl")
  //       .off()
  //       .click(function (e) {
  //         th.showSidebar();
  //         e.preventDefault();
  //       });
  //   },

  //   // --- 隱藏側邊選單函式
  //   hideSidebar: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     $(".m_area").animate(
  //       {
  //         "margin-left": th._mArea.width() * -1 + "px",
  //       },
  //       500,
  //       "easeOutQuint",
  //       function () {
  //         $(".sidebar").fadeOut(200);
  //         $(".m_area").removeClass("open");
  //         $(".m_area").hide();
  //       }
  //     );
  //     th._body.removeClass("noscroll");
  //     th._overlay.fadeOut();
  //     th.menu_liHasChild.children("ul").hide();
  //   },
  //   // --- 黑色遮罩點擊 關閉側邊選單
  //   overlay: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th._overlay
  //       .add(th._sidebarClose)
  //       .off()
  //       .click(function () {
  //         th.hideSidebar();
  //       });
  //     th._overlay.off("mouseenter");
  //   },
  // };
  // // --- 切換 PC/Mobile 選單
  // mobileMenu.switchMenu();
  // // --- 當改變視窗尺寸時  重新切換 PC/Mobile 選單
  // mobileMenu.resize();
  // // --- 點擊選單按鈕 執行 展開側邊選單函式
  // mobileMenu.sidebarCtrl();
  // // --- 黑色遮罩點擊 關閉側邊選單
  // mobileMenu.overlay();

  // var search = {
  //   search_mode: true,
  //   _window: $(window),
  //   _searchCtrl: $(".searchCtrl"),
  //   m_search: $(".m_search"),
  //   isAndroid: /android/i.test(navigator.userAgent.toLowerCase()),
  //   // --- 點擊搜尋區初始化設定
  //   searchInit: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th.m_search.hide();
  //   },
  //   // --- 搜尋區內容開關函示
  //   searchToggle: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     if (!th.search_mode) {
  //       th.m_search.stop(true, false).slideDown("400", "easeOutQuint");
  //       // $('.m_search').find('input[type="text"]').focus();
  //       th.search_mode = true;
  //       // prevent Android sofr Keyboard
  //       if (th.isAndroid) {
  //         th._window.off("resize");
  //       }
  //     } else {
  //       th.m_search.hide();
  //       th.search_mode = false;
  //     }
  //     // --- 停止冒泡事件
  //     th.stopPop();
  //   },
  //   // --- 點擊搜尋按鈕開關
  //   searchClick: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th._searchCtrl.off().on("click", function (e) {
  //       th.searchToggle();
  //     });
  //   },
  //   // --- 點擊搜尋區以外的區塊
  //   clickOther: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     // 如果點在外面
  //     $(document.body).click(function (e) {
  //       if (th.search_mode) {
  //         th.searchToggle();
  //         th.search_mode = false;
  //       }
  //     });
  //   },
  //   // --- 停止冒泡事件
  //   stopPop: function () {
  //     $(".m_search ,.searchCtrl").click(function (e) {
  //       e.stopPropagation();
  //     });
  //   },
  // };
  // // --- 點擊搜尋區初始化設定
  // search.searchInit();
  // // --- 點擊搜尋按鈕開關
  // search.searchClick();
  // // --- 點擊搜尋區以外的區塊
  // search.clickOther();

  /*-----------------------------------*/
  ///////  menu 訊息區塊 sticky  /////////
  /*-----------------------------------*/
  class Navbar {
    constructor(obj) {
      this.name = obj.name || null;
      this._window = $(window) || null;
      this.window = $(window).outerWidth() || null;
      this.wwSmall = 768;
    }
    menuH() {
      let that = this;
      this.menuH = Math.floor(that.name.outerHeight());
      this.offsetTop = Math.floor(
        that.name.offset() ? Math.floor(that.name.offset().top) : null
      );
    }
    // --- menu 的 sticky函式
    sticky(offsetTop) {
      // --- 綁定外層的this
      if (offsetTop != null) {
        let that = this;
        if (
          $(window).outerWidth() >= that.wwSmall &&
          that._window.scrollTop() > that.offsetTop
        ) {
          that.name.addClass("sticky");
          $(".main").css("padding-top", that.menuH);
        } else {
          that.name.removeClass("sticky");
          $(".main").removeAttr("style");
        }
      }
    }
    // --- 當 scroll 觸發
    scroll() {
      let that = this;
      let offsetTop = Math.floor(
        that.name.offset() ? Math.floor(that.name.offset().top) : null
      );
      // --- scroll 時執行 menu_stickyNavbar 並請傳入 menu 距離上方的高度的參數
      that._window.on("scroll", function (event) {
        that.sticky(offsetTop);
      });
      // // --- 綁定外層的this
      // let that = this;
      // let offsetTop;
      // // --- 如果 有 menu 的話 執行 menu_stickyNavbar
      // // console.log(this.name.hasClass("menu"));
      // if (that.name.hasClass("menu")) {
      //   // --- 算出 menu 距離上方的高度
      //   offsetTop = Math.floor($("header .menu").offset().top);
      //   // --- scroll 時執行 menu_stickyNavbar 並請傳入 menu 距離上方的高度的參數
      //   // that._window.on("scroll", function (event) {
      //   //   that.sticky(offsetTop);
      //   // });
      // }
      // // // --- 如果 有 megamenu 的話 執行 megamenu_stickyNavbar
      // if (that.name.hasClass("megamenu")) {
      //   // --- 算出 menu 距離上方的高度
      //   offsetTop = Math.floor($("header .megamenu").offset().top);
      //   // --- scroll 時執行 megamenu_stickyNavbar 並請傳入 megamenu 距離上方的高度的參數
      // }
      // that._window.on("scroll", function (event) {
      //   that.sticky(offsetTop);
      // });
    }
    // --- 當 resize 觸發 判斷 menu的種類
    resize() {
      // --- 綁定外層的this
      let that = this;
      let resizeNavTimer;
      // --- 如果 有 menu 的話 執行固定 menu_stickyNavbar
      that._window.on("resize", function (event) {
        // --- 算出 menu 距離上方的高度
        let offsetTop = Math.floor(
          that.name.offset() ? Math.floor(that.name.offset().top) : null
        );
        clearTimeout(resizeNavTimer);
        resizeNavTimer = setTimeout(function () {
          $(".main").removeAttr("style");
          that.sticky(offsetTop);
        }, 200);
      });
    }
    reload() {
      let that = this;
      this.offsetTop = Math.floor(
        that.name.offset() ? Math.floor(that.name.offset().top) : null
      );
      this._window.onload = this.sticky(this.offsetTop);
    }
    initial() {
      this.menuH();
      this.scroll();
      this.sticky();
      this.resize();
      this.reload();
    }
  }
  let menu2 = new Navbar({
    name: $("header .megamenu"),
  });
  menu2.initial();
  let menu1 = new Navbar({
    name: $("header .menu"),
  });
  menu1.initial();

  // var navbar = {
  //   _window: $(window),
  //   windowW: $(window).outerWidth(),
  //   _menu: $("header .menu"),
  //   _megamenu: $("header .megamenu"),
  //   menuH: Math.floor($(".menu").outerHeight()),
  //   megamenuH: Math.floor($("header .megamenu").outerHeight()),
  //   wwSmall: 768,
  //   // --- menu 的 sticky函式
  //   menu_stickyNavbar: function (offsetTop) {
  //     // --- 綁定外層的this
  //     let th = this;
  //     if (
  //       $(window).outerWidth() >= th.wwSmall &&
  //       th._window.scrollTop() > offsetTop
  //     ) {
  //       th._menu.addClass("sticky");
  //       $(".main").css("padding-top", th.menuH);
  //     } else {
  //       th._menu.removeClass("sticky");
  //       $(".main").removeAttr("style");
  //     }
  //   },
  //   // --- megamenu 的 sticky函式
  //   megamenu_stickyNavbar: function (offsetTop) {
  //     // --- 綁定外層的this
  //     let th = this;
  //     if (
  //       $(window).outerWidth() >= th.wwSmall &&
  //       th._window.scrollTop() > offsetTop
  //     ) {
  //       th._megamenu.addClass("sticky");
  //       $(".main").css("padding-top", th._megamenuH);
  //     } else {
  //       th._megamenu.removeClass("sticky");
  //       $(".main").removeAttr("style");
  //     }
  //   },
  //   // --- 當 scroll 觸發 判斷 menu的種類
  //   scroll: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     // --- 如果 有 menu 的話 執行 menu_stickyNavbar
  //     if (th._menu.length > 0) {
  //       // --- 算出 menu 距離上方的高度
  //       let offsetTop = Math.floor($("header .menu").offset().top);
  //       // --- scroll 時執行 menu_stickyNavbar 並請傳入 menu 距離上方的高度的參數
  //       th._window.on("scroll", function (event) {
  //         th.menu_stickyNavbar(offsetTop);
  //       });
  //     }
  //     // --- 如果 有 megamenu 的話 執行 megamenu_stickyNavbar
  //     if (th._megamenu.length > 0) {
  //       // --- 算出 menu 距離上方的高度
  //       let offsetTop = Math.floor($("header .megamenu").offset().top);
  //       // --- scroll 時執行 megamenu_stickyNavbar 並請傳入 megamenu 距離上方的高度的參數
  //       th._window.on("scroll", function (event) {
  //         th.megamenu_stickyNavbar(offsetTop);
  //       });
  //     }
  //   },
  //   // --- 當 resize 觸發 判斷 menu的種類
  //   resize: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     var resizeNavTimer;
  //     // --- 如果 有 menu 的話 執行固定 menu_stickyNavbar
  //     if (th._menu.length > 0) {
  //       // --- resize 時執行 menu_stickyNavbar 並請傳入 menu 距離上方的高度的參數
  //       th._window.on("resize", function (event) {
  //         // --- 算出 menu 距離上方的高度
  //         let offsetTop = Math.floor($("header .menu").offset().top);
  //         clearTimeout(resizeNavTimer);
  //         resizeNavTimer = setTimeout(function () {
  //           $(".main").removeAttr("style");
  //           th.menu_stickyNavbar(offsetTop);
  //         }, 200);
  //       });
  //     }
  //     // --- 如果 有 megamenu 的話 執行 megamenu_stickyNavbar
  //     if (th._megamenu.length > 0) {
  //       // --- resize 時執行 menu_stickyNavbar 並請傳入 megamenu 距離上方的高度的參數
  //       th._window.on("resize", function (event) {
  //         // --- 算出 megamenu 距離上方的高度
  //         let offsetTop = Math.floor($("header .megamenu").offset().top);
  //         clearTimeout(resizeNavTimer);
  //         resizeNavTimer = setTimeout(function () {
  //           $(".main").removeAttr("style");
  //           th.megamenu_stickyNavbar(offsetTop);
  //         }, 200);
  //       });
  //     }
  //   },
  // };
  // menu_stickyNavbar 及 megamenu_stickyNavbar 如果沒有同時用到則可擇一使用
  // navbar.menu_stickyNavbar();
  // navbar.megamenu_stickyNavbar();

  // // --- 當 scroll 觸發 判斷 menu的種類 為 menu 或是 megamenu
  // navbar.scroll();
  // // --- 當 resize 觸發 判斷 menu的種類 為 menu 或是 megamenu
  // navbar.resize();

  /*-----------------------------------*/
  //////////// menu的無障礙tab設定 /////////
  /*-----------------------------------*/

  class A11yKeyMenu {
    constructor(obj) {
      this.name = obj.name || null;
    }
    menu_KeyUp() {
      // --- 綁定外層的this
      let that = this;
      let control;
      if (that.name.hasClass("menu") === true) {
        control = that.name.find("li");
        control.keyup(function () {
          $(this).siblings().children("ul").hide();
        });
      } else if (that.name.hasClass("megamenu") === true) {
        control = that.name.children("ul").children("li");
        control.keyup(function () {
          $(this).siblings().children("ul").hide();
        });
      }
      // console.log(control);
    }
    menu_FocusOut() {
      // --- 綁定外層的this
      let that = this;
      that.name.find("li:last>a").focusout(function () {
        that.name.find("li ul").hide();
      });
    }
    menu_LiHasChildKeyup() {
      // --- 綁定外層的this
      let that = this;
      let control;
      // --- 如果傳進來的是 menu
      if (that.name.hasClass("menu") === true) {
        control = $(".menu").find("li.hasChild").children("a");
        control.keyup(function () {
          $(this).siblings("ul").fadeIn();
          $(this)
            .parent("li")
            .siblings()
            .focus(function () {
              $(this).hide();
            });
        });
      }
      // --- 如果傳進來的是 megamenu
      else if (that.name.hasClass("megamenu") === true) {
        control = $(".megamenu")
          .children("ul")
          .children("li.hasChild")
          .children("a");
        control.keyup(function () {
          $(this).siblings("ul").fadeIn();
          $(this).siblings("ul").find("ul").fadeIn();
          $(this)
            .parent("li")
            .siblings()
            .focus(function () {
              $(this).hide();
            });
        });
      }
    }
    initial() {
      this.menu_KeyUp();
      this.menu_FocusOut();
      this.menu_LiHasChildKeyup();
    }
  }

  let a11yKeykmenu1 = new A11yKeyMenu({
    name: $(".menu"),
  });
  a11yKeykmenu1.initial();

  let a11yKeykmenu2 = new A11yKeyMenu({
    name: $(".megamenu"),
  });
  a11yKeykmenu2.initial();

  // var a11yKeyMenu = {
  //   _menu: $(".menu"),
  //   _megamenu: $(".megamenu"),
  //   menu_liHasChild: $(".menu").find("li.hasChild"),
  //   megamenu_liHasChild: $(".megamenu").children("ul").children("li.hasChild"),
  //   // --- menu tab鍵無障礙設定
  //   menu_LiHasChildKeyup: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th.menu_liHasChild.children("a").keyup(function () {
  //       $(this).siblings("ul").fadeIn();
  //       $(this)
  //         .parent("li")
  //         .siblings()
  //         .focus(function () {
  //           $(this).hide();
  //         });
  //     });
  //   },
  //   menu_KeyUp: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th._menu.find("li").keyup(function () {
  //       $(this).siblings().children("ul").hide();
  //     });
  //   },
  //   menu_FocusOut: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th._menu.find("li:last>a").focusout(function () {
  //       th._menu.find("li ul").hide();
  //     });
  //   },
  //   // --- megamenu tab鍵無障礙設定
  //   megamenu_LiHasChildKeyup: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th.megamenu_liHasChild.children("a").keyup(function () {
  //       $(this).siblings("ul").fadeIn();
  //       $(this).siblings("ul").find("ul").fadeIn();
  //       $(this)
  //         .parent("li")
  //         .siblings()
  //         .focus(function () {
  //           $(this).hide();
  //         });
  //     });
  //   },
  //   megamenu_KeyUp: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th._megamenu
  //       .children("ul")
  //       .children("li")
  //       .keyup(function () {
  //         $(this).siblings().children("ul").hide();
  //       });
  //   },
  //   megamenu_FocusOut: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th._megamenu.find("li:last>a").focusout(function () {
  //       th._menu.find("li ul").hide();
  //     });
  //   },
  // };

  // --- menu tab鍵無障礙設定
  // a11yKeyMenu.menu_LiHasChildKeyup();
  // a11yKeyMenu.menu_KeyUp();
  // a11yKeyMenu.menu_FocusOut();

  // --- megamenu tab鍵無障礙設定
  // a11yKeyMenu.megamenu_LiHasChildKeyup();
  // a11yKeyMenu.megamenu_KeyUp();
  // a11yKeyMenu.megamenu_FocusOut();

  /*-----------------------------------*/
  //////////// notice訊息區塊 ////////////
  /*-----------------------------------*/
  $('[class*="notice"] a.close').click(function (e) {
    $(this).parent('[class*="notice"]').hide();
    e.preventDefault();
  });
  /*-----------------------------------*/
  //////////// Accordion設定 ////////////
  /*-----------------------------------*/
  $(".accordion").each(function () {
    $(this).find(".accordion-content").hide();
    var _accordionItem = $(this).children("ul").children("li").children("a");
    _accordionItem.each(function () {
      function accordion(e) {
        $(this).parent("li").siblings().children("a").removeClass("active");
        $(this).toggleClass("active");
        $(this)
          .parent("li")
          .siblings()
          .children(".accordion-content")
          .slideUp();
        $(this).next(".accordion-content").slideToggle();
        e.preventDefault();
      }
      $(this).click(accordion);
      $(this).keyup(accordion);
    });
  });
  /*-----------------------------------*/
  /////////////fatfooter開關/////////////
  /*-----------------------------------*/

  class FatFooter {
    constructor(obj) {
      this.name = obj.name || null; // --- 控制的對象
    }
    toggleOpen() {
      let that = this;
      that.name.click(function (e) {
        $(this)
          .parent(".container")
          .find("nav>ul>li>ul")
          .stop(true, true)
          .slideToggle(function () {
            if ($(this).is(":visible")) {
              that.name.html("收合/CLOSE");
              that.name.attr("name", "收合選單/CLOSE");
            } else {
              that.name.html("展開/OPEN");
              that.name.attr("name", "展開選單/OPEN");
            }
          });
        $(this).stop(true, true).toggleClass("close");
      });
    }
    initial() {
      this.toggleOpen();
    }
  }
  let fatFooterBtn = new FatFooter({ name: $(".btn-fatfooter") }); // --- 控制的對象
  fatFooterBtn.initial();
  // var fatFooter = {
  //   name: $(".btn-fatfooter"), // --- 控制的對象
  //   toggleOpen: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th.name.click(function (e) {
  //       $(this)
  //         .parent(".container")
  //         .find("nav>ul>li>ul")
  //         .stop(true, true)
  //         .slideToggle(function () {
  //           if ($(this).is(":visible")) {
  //             $(".btn-fatfooter").html("收合/CLOSE");
  //             $(".btn-fatfooter").attr("name", "收合選單/CLOSE");
  //           } else {
  //             $(".btn-fatfooter").html("展開/OPEN");
  //             $(".btn-fatfooter").attr("name", "展開選單/OPEN");
  //           }
  //         });
  //       $(this).stop(true, true).toggleClass("close");
  //     });
  //   },
  // };

  // --- fatfooter開關
  // fatFooter.toggleOpen();

  /*-----------------------------------*/
  ////////////////多組Tab////////////////
  /*-----------------------------------*/

  var _window = $(window);
  var _body = $("body");
  var ww = _window.outerWidth();
  var wwSmall = 768;
  var _sidebarClose = $(".sidebarClose");
  var tab_headerHeight = Math.floor($(".header").outerHeight(true));
  var resizeTimer1;

  _window.resize(function () {
    clearTimeout(resizeTimer1);
    resizeTimer1 = setTimeout(function () {
      ww = _window.outerWidth();
      tabSet();
    }, 50);
  });

  function tabSet() {
    $(".tabs").each(function () {
      var _tab = $(this),
        _tabItem = _tab.find(".tabItem"),
        // _tabItemA = _tabItem.children('a'), //改button後，這行沒有
        _tabContent = _tab.find(".tabContent"),
        tabwidth = _tab.width(),
        tabItemHeight = _tabItem.outerHeight(),
        tabContentHeight = _tab.find(".active").next().innerHeight(),
        tiGap = 0,
        tabItemLength = _tabItem.length,
        tabItemWidth;
      _tab.find(".active").next(".tabContent").show();
      if (ww >= wwSmall) {
        _tabContent.css("top", tabItemHeight);
        _tab.height(tabContentHeight + tabItemHeight);
        tabItemWidth = (tabwidth - (tabItemLength - 1) * tiGap) / tabItemLength;
        _tabItem.width(tabItemWidth).css("margin-left", tiGap);
        _tabItem.first().css("margin-left", 0);
        _tabItem
          .last()
          .css({
            position: "absolute",
            top: 0,
            right: 0,
          })
          .width(tabItemWidth);
      } else {
        _tab.css("height", "auto");
        _tabItem.width(tabwidth);
        _tabItem.css("margin-left", 0).last().css("position", "relative");
      }
      _tabItem.focus(tabs); //改button後，前面改_tabItem
      _tabItem.click(tabs); //改button後，前面改_tabItem
      function tabs(e) {
        var _tabItemNow = $(this), //改button後，原來$(this).parent(),改$(this)
          tvp = _tab.offset().top,
          tabIndex = _tabItemNow.index() / 2,
          scollDistance = tvp + tabItemHeight * tabIndex - tab_headerHeight;
        _tabItem.removeClass("active");
        _tabItemNow.addClass("active");
        if (ww <= wwSmall) {
          _tabItem.not(".active").next().slideUp();
          _tabItemNow.next().slideDown();
          $("html,body").stop(true, false).animate({
            scrollTop: scollDistance,
          });
        } else {
          _tabItem.not(".active").next().hide();
          _tabItemNow.next().show();
          tabContentHeight = _tabItemNow.next().innerHeight();
          _tab.height(tabContentHeight + tabItemHeight);
        }
        e.preventDefault();
      }
    });
  }
  $(".tabs>.tabItem:first-child>a").trigger("click");
  tabSet();
  /*-----------------------------------*/
  ////////////////多組Tab 改 12.7 ////////
  /*-----------------------------------*/

  class BtnTab {
    constructor(obj) {
      this.list = obj.list;
      this.name = obj.name;
    }
    tabClick() {
      let that = this;
      this.name.on("click", navTab);
      this.name.on("keyup", navTab);
      function navTab() {
        $(this).addClass("active");
        $(this).parent().siblings().children().removeClass("active");
        $(".nav-item button active").focus();
        let activeTabBtn = that.list.find(".active");
        activeTabBtn.attr("data-btn");
        let tabContent = $(this).parent().parent().next().children();
        tabContent.each(function (index, item) {
          if (
            activeTabBtn.attr("data-btn") === $(this).attr("data-tabContent")
          ) {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
          }
        });
      }
    }
    tabKeydown() {
      $(window).keydown(tabFocus);
      function tabFocus(e) {
        if (e.keyCode === 9) {
          $(".nav-link").focusout(function (e) {
            let navItem = $(this).parent();
            let activeItem = $(this)
              .parent()
              .parent()
              .next()
              .find(".tab-pane.active");
            activeItem.find("a").first().focus();
            activeItem
              .find("a")
              .last()
              .focusout(function (e) {
                navItem.next().find(".nav-link").focus();
              });
          });
        }
      }
    }

    initial() {
      this.tabClick();
      this.tabKeydown();
    }
  }
  let tab1 = new BtnTab({
    list: $(".nav-item"),
    name: $(".nav-item button"),
  });
  tab1.initial();
  let tab2 = new BtnTab({
    list: $(".nav-item2"),
    name: $(".nav-item2 button"),
  });
  tab2.initial();
  let tab3 = new BtnTab({
    list: $(".nav-item3"),
    name: $(".nav-item3 button"),
  });
  tab3.initial();

  // $(function () {
  //   let tabBtn = $(".nav-item");
  //   $(".nav-item button").click(navTab);
  //   //f切換tab內容
  //   function navTab() {
  //     $(this).addClass("active");
  //     $(this).parent().siblings().children().removeClass("active");
  //     $(".nav-item button active").focus();
  //     let activeTabBtn = tabBtn.find(".active");
  //     activeTabBtn.attr("data-btn");
  //     let tabContent = $(".tab-content div");
  //     tabContent.each(function (index, item) {
  //       if (activeTabBtn.attr("data-btn") === $(this).attr("data-tabContent")) {
  //         $(this).addClass("active");
  //         $(this).siblings().removeClass("active");
  //       }
  //     });
  //   }
  //   $(".nav-item button").keyup(navTab);
  //   $(window).keydown(tabFocus);
  //   function tabFocus(e) {
  //     if (e.keyCode === 9) {
  //       $(".nav-link").focusout(function (e) {
  //         $(".tab-pane.active").find("a").first().focus();
  //         let navItem = $(this).parent();
  //         $(".tab-pane.active")
  //           .find("a")
  //           .last()
  //           .focusout(function (e) {
  //             navItem.next().find(".nav-link").focus();
  //           });
  //       });
  //     }
  //   }
  // });

  /*-----------------------------------*/
  ///////////////置頂go to top////////////
  /*-----------------------------------*/
  // var scrollToTop = {
  //   name: $(".scrollToTop"), //控制的對象
  //   control: $("html, body"), //監聽的對象
  //   attr: "a.goCenter", //keydown後focus的目標
  //   speed: 400, //滑行速度
  //   body: $("body"),
  //   // --- 點擊置頂按鈕
  //   scrollClick: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     this.name.click(function (e) {
  //       th.control.stop().animate(
  //         {
  //           scrollTop: 0,
  //         },
  //         th.speed,
  //         "linear"
  //       );
  //       e.preventDefault();
  //     });
  //   },
  //   // --- 鍵盤點擊置頂按鈕
  //   scrollKeydown: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     this.name.keydown(function (e) {
  //       th.control.stop().animate(
  //         {
  //           scrollTop: 0,
  //         },
  //         th.speed,
  //         "linear"
  //       );
  //       th.body.find(th.attr).focus();
  //       e.preventDefault();
  //     });
  //   },
  //   // --- 按鈕出現的函示
  //   goTop: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     $(window).on("scroll", function () {
  //       if ($(this).scrollTop() > 200) {
  //         th.name.fadeIn();
  //       } else {
  //         th.name.fadeOut();
  //       }
  //     });
  //   },
  // };
  // // --- 點擊置頂按鈕
  // scrollToTop.scrollClick();
  // // --- 鍵盤點擊置頂按鈕
  // scrollToTop.scrollKeydown();
  // // --- 按鈕出現的函示
  // scrollToTop.goTop();

  class ScrollToTop {
    constructor(obj) {
      this.name = obj.name || null; //監聽的對象
      this.control = obj.control || null; //監聽的對象
      this.attr = obj.attr || null; //keydown後focus的目標
      this.speed = obj.speed || null; //滑行速度
      this.body = obj.body || null;
    }
    // --- 點擊置頂按鈕
    scrollClick() {
      let that = this;
      that.name.click(function (e) {
        that.control.stop().animate(
          {
            scrollTop: 0,
          },
          that.speed,
          "linear"
        );
        e.preventDefault();
      });
    }
    // --- 鍵盤點擊置頂按鈕
    scrollKeydown() {
      let that = this;
      that.name.keydown(function (e) {
        that.control.stop().animate(
          {
            scrollTop: 0,
          },
          that.speed,
          "linear"
        );
        that.body.find(that.attr).focus();
        e.preventDefault();
      });
    }
    // --- 按鈕出現的函式
    goTop() {
      let that = this;
      $(window).on("scroll", function () {
        if ($(this).scrollTop() > 200) {
          that.name.fadeIn();
        } else {
          that.name.fadeOut();
        }
      });
    }
    // --- 初始設定
    initial() {
      this.scrollClick();
      this.scrollKeydown();
      this.goTop();
    }
  }

  let gotopBtn = new ScrollToTop({
    name: $(".scrollToTop"), //監聽的對象
    control: $("html, body"), //監聽的對象
    attr: "a.goCenter", //keydown後focus的目標
    speed: 400, //滑行速度
    body: $("body"),
  });
  gotopBtn.initial();

  // /*--------------------------------------------------------*/
  /////設定img 在IE9+ SAFARI FIREFOX CHROME 可以object-fit/////
  /*--------------------------------------------------------*/
  var userAgent, ieReg, ie;
  userAgent = window.navigator.userAgent;
  ieReg = /msie|Trident.*rv[ :]*11\./gi;
  ie = ieReg.test(userAgent);
  if (ie) {
    $(".img-container").each(function () {
      var imgUrl = $(this).find("img").attr("data-src");
      var $container = $(this);
      $container.has(".none").addClass("ie-object-none");
      $container.has(".none").css("backgroundImage", "url(" + imgUrl + ")");
      $container.has(".cover").addClass("ie-object-cover");
      $container.has(".cover").css("backgroundImage", "url(" + imgUrl + ")");
      $container.has(".fill").addClass("ie-object-fill");
      $container.has(".fill").css("backgroundImage", "url(" + imgUrl + ")");
      $container.has(".contain").addClass("ie-object-contain");
      $container.has(".contain").css("backgroundImage", "url(" + imgUrl + ")");
    });
  }
  /*-----------------------------*/
  /////form表單 placeholder隱藏/////
  /*-----------------------------*/
  // $('input,textarea').focus(function() {
  //     $(this).removeAttr('placeholder');
  // });
  $('input[type="checkbox"]')
    .off()
    .click(function (e) {
      $(this).blur();
    });
  /*------------------------------------*/
  /////form表單 單個檔案上傳+多個檔案上傳/////
  /*------------------------------------*/
  $(document).on("change", ".check_file", function () {
    var names = [];
    var length = $(this).get(0).files.length;
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
      names.push($(this).get(0).files[i].name);
    }
    // $('input[name=file]').val(names);
    if (length > 2) {
      var fileName = names.join(", ");
      $(this)
        .closest(".upload_grp")
        .find(".upload_file")
        .attr("value", length + " files selected");
    } else {
      $(this).closest(".upload_grp").find(".upload_file").attr("value", names);
    }
  });
  /*------------------------------------*/
  //////////分享按鈕 share dropdwon////////
  /*------------------------------------*/

  class FunctionPanel {
    constructor(obj) {
      this.name = obj.name || null; // --- 綁定的對象
      this.control = obj.control || null; // --- 要控制的對象
    }
    shareBtn() {
      // --- 綁定外層的this
      let that = this;
      that.name.children("ul").hide();
      that.name.prepend('<a href="#" class="shareButton">share分享按鈕</a>');
    }
    shareBtnClick() {
      $(".shareButton")
        .off()
        .click(function (e) {
          $(this).siblings("ul").stop(true, true).slideToggle();
          e.preventDefault();
        });
    }
    shareBtnKeyup() {
      $(this).siblings("ul").stop(true, true).slideDown();
    }
    shareBtnFocusout() {
      // --- 綁定外層的this
      let that = this;
      that.name.find("li:last>a").focusout(function (event) {
        $(this).parent().parent("ul").hide();
      });
    }
    shareBtnTouchend() {
      // --- 綁定外層的this
      let that = this;
      $(document).on("touchend click", function (e) {
        let container = that.name;
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          $(".function_panel .share ul").hide();
        }
      });
    }
    initial() {
      this.shareBtn(); //先初始化載入
      this.shareBtnClick();
      this.shareBtnKeyup();
      this.shareBtnFocusout();
      this.shareBtnTouchend();
    }
  }

  let function_panel_btn = new FunctionPanel({
    name: $(".function_panel .share"), // --- 綁定的對象
    control: $(".shareButton"), // --- 要控制的對象}
  });
  function_panel_btn.initial();

  // var function_panel = {
  //   name: $(".function_panel .share"),
  //   control: $(".shareButton"),
  //   // --- 初始化功能選單按鈕
  //   shareBtn: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th.name.children("ul").hide();
  //     th.name.prepend('<a href="#" class="shareButton">share分享按鈕</a>');
  //   },
  //   // --- 點擊功能選單按鈕
  //   shareBtnClick: function () {
  //     $(".shareButton")
  //       .off()
  //       .click(function (e) {
  //         $(this).siblings("ul").stop(true, true).slideToggle();
  //         e.preventDefault();
  //       });
  //   },
  //   shareBtnKeyup: function () {
  //     $(this).siblings("ul").stop(true, true).slideDown();
  //   },
  //   shareBtnFocusout: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     th.name.find("li:last>a").focusout(function (event) {
  //       $(this).parent().parent("ul").hide();
  //     });
  //   },
  //   shareBtnTouchend: function () {
  //     // --- 綁定外層的this
  //     let th = this;
  //     $(document).on("touchend click", function (e) {
  //       var container = th.name;
  //       if (!container.is(e.target) && container.has(e.target).length === 0) {
  //         $(".function_panel .share ul").hide();
  //       }
  //     });
  //   },
  // };
  // --- 初始化功能選單按鈕
  // function_panel.shareBtn();

  // --- 點擊功能選單按鈕
  // function_panel.shareBtnClick();
  // function_panel.shareBtnKeyup();
  // function_panel.shareBtnFocusout();
  // function_panel.shareBtnTouchend();

  /*------------------------------------*/
  /////////////字型大小 font-size //////////
  /*------------------------------------*/

  var fontSize = {
    name: $(".font_size"), // ---按下去的對象
    control: $(".innerpage"), // ---偵測的對象
    // 字體大小設定 --- 小
    small: function () {
      let th = this;
      th.name.find(".small").click(function (e) {
        $(this).parent("li").siblings("li").find("a").removeClass("active");
        th.control.removeClass("large_size").addClass("small_size");
        $(this).blur().addClass("active");
        e.preventDefault();
        th.createCookie("FontSize", "small", 356);
      });
    },
    // 字體大小設定 --- 中
    medium: function () {
      let th = this;
      th.name.find(".medium").click(function (e) {
        $(this).parent("li").siblings("li").find("a").removeClass("active");
        th.control.removeClass("large_size small_size");
        $(this).blur().addClass("active");
        e.preventDefault();
        th.createCookie("FontSize", "medium", 356);
      });
    },
    // 字體大小設定 --- 大
    large: function () {
      let th = this;
      th.name.find(".large").click(function (e) {
        $(this).parent("li").siblings("li").find("a").removeClass("active");
        th.control.removeClass("small_size").addClass("large_size");
        $(this).blur().addClass("active");
        e.preventDefault();
        th.createCookie("FontSize", "large", 356);
      });
    },
    // 創造新的 字體大小設定
    createCookie: function (name, value, days) {
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        var expires = "; expires=" + date.toGMTString();
      } else expires = "";
      document.cookie = name + "=" + value + expires + "; path=/";
    },
    //讀取瀏覽器上 字體大小設定
    readCookie: function (name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    //初始化 字體大小設定
    initCookie: function () {
      let th = this;
      window.onload = function (e) {
        var cookie = th.readCookie("FontSize");
        if (cookie == "small") {
          th.name.find(".small").click();
          // $(".font_size")
          //   .find(".small")
          //   .parent("li")
          //   .siblings("li")
          //   .find("a")
          //   .removeClass("active");
          // $(".innerpage")
          //   .removeClass("large_size medium_size")
          //   .addClass("small_size");
          // $(".font_size").find(".small").addClass("active");
          e.preventDefault();
        } else {
          if (cookie == "large") {
            th.name.find(".large").click();
            // $(".font_size")
            //   .find(".large")
            //   .parent("li")
            //   .siblings("li")
            //   .find("a")
            //   .removeClass("active");
            // $(".innerpage")
            //   .removeClass("small_size medium_size")
            //   .addClass("large_size");
            // $(".font_size").find(".large").addClass("active");
            e.preventDefault();
          } else {
            //這裡是預設宣告
            th.name.find(".medium").click();
            // $(".font_size")
            //   .find(".medium")
            //   .parent("li")
            //   .siblings("li")
            //   .find("a")
            //   .removeClass("active");
            // $(".innerpage").removeClass("large_size small_size");
            // $(".font_size").find(".medium").addClass("active");
            e.preventDefault();
          }
        }
      };
    },
  };
  // 字體大小設定 --- 小
  fontSize.small();
  // 字體大小設定 --- 中
  fontSize.medium();
  // 字體大小設定 --- 大
  fontSize.large();
  //初始化 字體大小設定
  fontSize.initCookie();

  /*-----------------------------------*/
  /////////// category active  //////////
  /*-----------------------------------*/
  $(".category")
    .find("a")
    .off()
    .click(function (event) {
      $(this).parent("li").siblings().find("a").removeClass("active");
      $(this).addClass("active").blur();
    });
  /*-----------------------------------*/
  /////////// 無障礙快捷鍵盤組合  //////////
  /*-----------------------------------*/
  class A11yKey {
    constructor(obj) {
      this.name = obj.name; // ---綁定的觸發對象
      this.control = obj.control; // ---偵測的對象
      this.seed = obj.speed; // ---動畫速度
    }
    keydown() {
      let that = this;
      that.name.on("keydown", function (e) {
        switch (e.altKey && e.keyCode) {
          // alt+S 查詢
          case 83:
            that.control.animate(
              {
                scrollTop: 0,
              },
              that.seed,
              "easeOutExpo"
            );
            $(".search").find('input[type="text"]').focus();
            break;
          // alt+U header
          case 85:
            that.control.animate(
              {
                scrollTop: 0,
              },
              that.seed,
              "easeOutExpo"
            );
            $("header").find(".accesskey").focus();
            break;
          // alt+C 主要內容區
          case 67:
            that.control.animate(
              {
                scrollTop: $(".main").find(".accesskey").offset().top - 70,
              },
              that.seed,
              "easeOutExpo"
            );
            $(".main").find(".accesskey").focus();
            break;
          // alt+Z footer
          case 90:
            that.control.animate(
              {
                scrollTop: $("footer").find(".accesskey").offset().top,
              },
              that.seed,
              "easeOutExpo"
            );
            $("footer").find(".accesskey").focus();
            break;
        }
      });
    }
    initial() {
      this.keydown();
    }
  }
  let allkey = new A11yKey({
    name: $(document), // ---綁定的觸發對象
    control: $("html, body"), // ---偵測的對象
    seed: 200, // ---動畫速度
  });

  allkey.initial();

  // var a11yKey = {
  //   name: $(document), // ---綁定的觸發對象
  //   control: $("html, body"), // ---偵測的對象
  //   seed: 200, // ---動畫速度
  //   keydown: function () {
  //     let th = this;
  //     th.name.on("keydown", function (e) {
  //       switch (e.altKey && e.keyCode) {
  //         // alt+S 查詢
  //         case 83:
  //           th.control.animate(
  //             {
  //               scrollTop: 0,
  //             },
  //             th.seed,
  //             "easeOutExpo"
  //           );
  //           $(".search").find('input[type="text"]').focus();
  //           break;
  //         // alt+U header
  //         case 85:
  //           th.control.animate(
  //             {
  //               scrollTop: 0,
  //             },
  //             th.seed,
  //             "easeOutExpo"
  //           );
  //           $("header").find(".accesskey").focus();
  //           break;
  //         // alt+C 主要內容區
  //         case 67:
  //           th.control.animate(
  //             {
  //               scrollTop: $(".main").find(".accesskey").offset().top - 70,
  //             },
  //             th.seed,
  //             "easeOutExpo"
  //           );
  //           $(".main").find(".accesskey").focus();
  //           break;
  //         // alt+Z footer
  //         case 90:
  //           th.control.animate(
  //             {
  //               scrollTop: $("footer").find(".accesskey").offset().top,
  //             },
  //             th.seed,
  //             "easeOutExpo"
  //           );
  //           $("footer").find(".accesskey").focus();
  //           break;
  //       }
  //     });
  //   },
  // };

  // // 無障礙錨點設定
  // a11yKey.keydown();

  /*-----------------------------------*/
  //////// 無障礙切換slick箭頭語系  ////////
  /*-----------------------------------*/

  //無障礙切換slick箭頭語系
  if ($("html")[0].hasAttribute("lang")) {
    var weblang = $("html").attr("lang");
    if (weblang.substring(0, 2) == "zh") {
      $(".slick-prev").attr("title", "上一筆");
      $(".slick-next").attr("title", "下一筆");
    } else if (weblang.substring(0, 2) !== "zh") {
      $(".slick-prev").attr("title", "previous");
      $(".slick-next").attr("title", "next");
    }
  }
  // 無障礙錨點切換語系，更改accesskey的title名稱
  var weblang = $("html").attr("lang");
  if (weblang.substring(0, 2) == "zh") {
    $("header").find(".accesskey").attr("title", "上方功能區塊");
    $(".main").find(".accesskey").attr("title", "中央內容區塊");
    $("footer").find(".accesskey").attr("title", "下方功能區塊");
    $(".search").find(".accesskey").attr("title", "關鍵字搜尋：文章關鍵字搜尋");
  } else if (weblang.substring(0, 2) !== "zh") {
    $("header").find(".accesskey").attr("title", "header");
    $(".main").find(".accesskey").attr("title", "content");
    $("footer").find(".accesskey").attr("title", "footer");
    $(".search").find(".accesskey").attr("title", "search");
  }
  /*------------------------------------*/
  /////gotoCenter on focus跳到 content/////
  /*------------------------------------*/
  class GoCenter {
    constructor(obj) {
      this.name = obj.name || null;
      this.control = obj.control || null;
      this.speed = obj.speed || null;
    }
    goCenterKeydown() {
      let that = this;
      that.name.keydown(function (e) {
        if (e.which == 13) {
          $("#aC").focus();
          that.control.stop(true, true).animate(
            {
              scrollTop: $(".main").find(".accesskey").offset().top,
            },
            that.speed,
            "easeOutExpo"
          );
        }
      });
    }
    initial() {
      this.goCenterKeydown();
    }
  }
  let goCenterBtn = new GoCenter({
    name: $("a.goCenter"), // --- 控制的對象
    control: $("html, body"), //  ---偵測的對象
    speed: 800,
  }); // ---動畫速度
  goCenterBtn.initial();
  // var goCenter = {
  //   name: $("a.goCenter"), // --- 控制的對象
  //   control: $("html, body"), //  ---偵測的對象
  //   speed: 800, // ---動畫速度

  //   // --- gotoCenter on focus跳到 content
  //   goCenterKeydown: function () {
  //     let th = this;
  //     th.name.keydown(function (e) {
  //       if (e.which == 13) {
  //         $("#aC").focus();
  //         th.control.stop(true, true).animate(
  //           {
  //             scrollTop: $(".main").find(".accesskey").offset().top,
  //           },
  //           th.speed,
  //           "easeOutExpo"
  //         );
  //       }
  //     });
  //   },
  // };
  // --- gotoCenter on focus跳到 content
  //goCenter.goCenterKeydown();

  /*-----------------------------------*/
  //////// 語言模組 無障礙遊走設定  ////////
  /*-----------------------------------*/
  class Language {
    constructor(obj) {
      this.name = obj.name || null; // --- 控制的對象
      this.control = obj.control || null; // --- 監聽的對象
    }
    // --- 點擊 語言模組
    langClick() {
      let that = this;
      that.name.find("ul").hide();
      that.control.off().click(function (e) {
        $(this).next("ul").stop(true, true).slideToggle();
        e.preventDefault();
      });
    }
    // --- Keydown 語言模組
    langKeydown() {
      let that = this;
      that.control.keyup(function () {
        $(this).next("ul").stop(true, true).slideDown();
      });
    }
    // --- Focusout 語言模組
    langFocusout() {
      let that = this;
      that.name.find("ul li:last>a").focusout(function () {
        that.name.find("ul").hide();
      });
    }
    initial() {
      this.langClick();
      this.langKeydown();
      this.langFocusout();
    }
  }

  let languageSelect = new Language({
    name: $(".language"), // --- 控制的對象
    control: $(".language").children("a"), // --- 監聽的對象
  });
  languageSelect.initial();

  // var language = {
  //   name: $(".language"), // --- 控制的對象
  //   control: $(".language").children("a"), // --- 監聽的對象
  //   // --- 點擊 語言模組
  //   langClick: function () {
  //     let th = this;
  //     th.name.find("ul").hide();
  //     th.control.off().click(function (e) {
  //       $(this).next("ul").stop(true, true).slideToggle();
  //       e.preventDefault();
  //     });
  //   },
  //   // --- Keydown 語言模組
  //   langKeydown: function () {
  //     let th = this;
  //     th.control.keyup(function () {
  //       $(this).next("ul").stop(true, true).slideDown();
  //     });
  //   },
  //   // --- Focusout 語言模組
  //   langFocusout: function () {
  //     let th = this;
  //     th.name.find("ul li:last>a").focusout(function () {
  //       th.name.find("ul").hide();
  //     });
  //   },
  // };
  // // // --- 點擊 語言模組
  // language.langClick();
  // // --- Keydown 語言模組
  // language.langKeydown();
  // // --- Focusout 語言模組
  // language.langFocusout();

  // /*------------------------------------*/
  // //  table 加上響應式 scroltable-wrapper/
  // /*------------------------------------*/

  class Table {
    constructor(obj) {
      this.name = obj.name;
      this._window = $(window);
    }
    // --- 判斷沒有table_list
    haveTableList() {
      let that = this;
      that.name.each(function (index, el) {
        // --- 判斷沒有table_list
        if (
          $(this).parents(".table_list").length == 0 &&
          $(this).parents(".fix_th_table").length == 0 &&
          $(this).parent("form").length == 0
        ) {
          $(this).scroltable();
        }
      });
    }
    // --- 固定版頭
    table_Arrow() {
      if (
        $("table").parents(".table_list").length == 0 &&
        $("table").parents(".fix_th_table").length == 0 &&
        $(this).parent("form").length == 0
      ) {
        if ($(".scroltable-wrapper").length > 0) {
          var stickyArrowTop = Math.floor(
              $(".scroltable-wrapper").offset().top
            ),
            thisScroll = Math.floor($(this).scrollTop());
          if (thisScroll > stickyArrowTop - 230) {
            $(".scroltable-wrapper .tablearrow_left").css("display", "block");
            $(".scroltable-wrapper .tablearrow_left").css(
              {
                top: thisScroll - stickyArrowTop + 220,
              },
              100,
              "easeOutQuint"
            );
            $(".scroltable-wrapper .tablearrow_right").css("display", "block");
            $(".scroltable-wrapper .tablearrow_right").css(
              {
                top: thisScroll - stickyArrowTop + 220,
              },
              100,
              "easeOutQuint"
            );
          } else {
            $(".scroltable-wrapper .tablearrow_left").css({
              top: "10px",
              display: "none",
            });
            $(".scroltable-wrapper .tablearrow_right").css({
              top: "10px",
              display: "none",
            });
          }
        }
      }
    }
    scroll() {
      let that = this;
      that._window.scroll(function (event) {
        that.table_Arrow();
      });
    }
    scrollFn() {
      var scrollTimer;
      let that = this;
      that._window.scroll(function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
          that.table_Arrow();
        }, 50);
      });
    }
    // --- tablearrow arrow，為了設定箭頭
    navLeft() {
      $(".scroltable-nav-left").append(
        '<div class="tablearrow_left" style="display:none;"></div>'
      );
    }
    navRight() {
      $(".scroltable-nav-right").append(
        '<div class="tablearrow_right"  style="display:none;"></div>'
      );
    }
    initial() {
      this.haveTableList();
      this.table_Arrow();
      this.scroll();
      this.scrollFn();
      this.navLeft();
      this.navRight();
    }
  }
  let table = new Table({
    name: $("table"),
  });
  table.initial();
  // var table = {
  //   name: $("table"),
  //   _window: $(window),
  //   // --- 判斷沒有table_list
  //   haveTableList: function () {
  //     th = this;
  //     th.name.each(function (index, el) {
  //       // --- 判斷沒有table_list
  //       if (
  //         $(this).parents(".table_list").length == 0 &&
  //         $(this).parents(".fix_th_table").length == 0 &&
  //         $(this).parent("form").length == 0
  //       ) {
  //         $(this).scroltable();
  //       }
  //     });
  //   },
  //   // --- 固定版頭
  //   table_Arrow: function () {
  //     if (
  //       $("table").parents(".table_list").length == 0 &&
  //       $("table").parents(".fix_th_table").length == 0 &&
  //       $(this).parent("form").length == 0
  //     ) {
  //       if ($(".scroltable-wrapper").length > 0) {
  //         var stickyArrowTop = Math.floor(
  //             $(".scroltable-wrapper").offset().top
  //           ),
  //           thisScroll = Math.floor($(this).scrollTop());
  //         if (thisScroll > stickyArrowTop - 230) {
  //           $(".scroltable-wrapper .tablearrow_left").css("display", "block");
  //           $(".scroltable-wrapper .tablearrow_left").css(
  //             {
  //               top: thisScroll - stickyArrowTop + 220,
  //             },
  //             100,
  //             "easeOutQuint"
  //           );
  //           $(".scroltable-wrapper .tablearrow_right").css("display", "block");
  //           $(".scroltable-wrapper .tablearrow_right").css(
  //             {
  //               top: thisScroll - stickyArrowTop + 220,
  //             },
  //             100,
  //             "easeOutQuint"
  //           );
  //         } else {
  //           $(".scroltable-wrapper .tablearrow_left").css({
  //             top: "10px",
  //             display: "none",
  //           });
  //           $(".scroltable-wrapper .tablearrow_right").css({
  //             top: "10px",
  //             display: "none",
  //           });
  //         }
  //       }
  //     }
  //   },
  //   scroll: function () {
  //     let th = this;
  //     th._window.scroll(function (event) {
  //       th.table_Arrow();
  //     });
  //   },
  //   scrollFn: function () {
  //     var scrollTimer;
  //     let th = this;
  //     th._window.scroll(function () {
  //       clearTimeout(scrollTimer);
  //       scrollTimer = setTimeout(function () {
  //         th.table_Arrow();
  //       }, 50);
  //     });
  //   },
  //   // --- tablearrow arrow，為了設定箭頭
  //   navLeft: function () {
  //     $(".scroltable-nav-left").append(
  //       '<div class="tablearrow_left" style="display:none;"></div>'
  //     );
  //   },
  //   navRight: function () {
  //     $(".scroltable-nav-right").append(
  //       '<div class="tablearrow_right"  style="display:none;"></div>'
  //     );
  //   },
  // };
  // table.haveTableList();
  // table.table_Arrow();
  // table.scroll();
  // table.scrollFn();
  // table.navLeft();
  // table.navRight();

  // /*------------------------------------*/
  // //////////table 加上 data-title//////////
  // /*------------------------------------*/
  class RwdTable {
    constructor(obj) {
      this.name = obj.name;
    }
    rwdFn() {
      let that = this;
      that.name.find("table").each(function () {
        var $row = $(this).find("tr");
        rowCount = $row.length;
        for (var n = 1; n <= rowCount; n++) {
          $(this)
            .find("th")
            .each(function (index) {
              var thText = $(this).text();
              $row.eq(n).find("td").eq(index).attr("data-title", thText);
            });
        }
      });
    }
    initial() {
      this.rwdFn();
    }
  }

  let rwdtable = new RwdTable({
    name: $(".table_list"), // ---綁定的觸發對象
  });
  rwdtable.initial();
  // var rwdTable = {
  //   name: $(".table_list"), // ---綁定的觸發對象
  //   rwdFn: function () {
  //     let th = this;
  //     th.name.find("table").each(function () {
  //       var $row = $(this).find("tr");
  //       rowCount = $row.length;
  //       for (var n = 1; n <= rowCount; n++) {
  //         $(this)
  //           .find("th")
  //           .each(function (index) {
  //             var thText = $(this).text();
  //             $row.eq(n).find("td").eq(index).attr("data-title", thText);
  //           });
  //       }
  //     });
  //   },
  // };
  // rwdTable.rwdFn();
  /*-----------------------------------*/
  ////////////// lazy load //////////////
  /*-----------------------------------*/
  var lazyLoadInstance = new LazyLoad({
    elements_selector: "img.lazy",
    placeholder: "/images/basic/placeholder.gif",
    effect: "fadeIn",
    fadeTime: 600,
    threshold: 0,
  });
});
