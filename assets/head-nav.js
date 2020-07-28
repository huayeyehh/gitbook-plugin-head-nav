require(['gitbook', 'jQuery'], function (gitbook, $) {
    var TOGGLE_CLASSNAME = 'expanded',
        CHAPTER = '.chapter',
        ARTICLES = '.articles',
        TRIGGER_TEMPLATE = '<i class="trigger-angle fa fa-angle-right"></i>',
        LS_NAMESPACE = 'expChapters';
    var init = function () {
        // adding the trigger element to each ARTICLES parent and binding the event
        $(ARTICLES)
            .parent(CHAPTER)
            .children('a,span')
            .append(TRIGGER_TEMPLATE)
            .on('click', function (e) {
                if (!$(e.target).is('a')) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggle($(e.target).closest(CHAPTER));
                }
            });

        $(ARTICLES).parent(CHAPTER).addClass("invisible");
        collapse(lsItem());
        //expand current selected chapter with it's parents
        var activeChapter = $(CHAPTER + '.active');
        expand(activeChapter);
        expand(activeChapter.parents(CHAPTER));
        activeChapter.removeClass("invisible");
        $("." + TOGGLE_CLASSNAME).parent(ARTICLES).parent(CHAPTER).removeClass("invisible");

        //hide all dividers except the first and last one
        var dividers = $(".divider")
        for (let i = 1; i < dividers.length - 1; i++) dividers[i].classList.add("invisible");
    }
    var toggle = function ($chapter) {
        if ($chapter.hasClass('expanded')) {
            collapse($chapter);
        } else {
            expand($chapter);
        }
    }
    var collapse = function ($chapter) {
        if ($chapter.length && $chapter.hasClass(TOGGLE_CLASSNAME)) {
            $chapter.removeClass(TOGGLE_CLASSNAME);
            $chapter.children("a")[0].children[0].classList.remove("fa-angle-down");
            $chapter.children("a")[0].children[0].classList.add("fa-angle-right");
            lsItem($chapter);
        }
    }
    var expand = function ($chapter) {
        if ($chapter.length && !$chapter.hasClass(TOGGLE_CLASSNAME)) {
            $chapter.addClass(TOGGLE_CLASSNAME);
            if ($chapter.children("a")[0].children[0] != undefined) {
                $chapter.children("a")[0].children[0].classList.remove("fa-angle-right");
                $chapter.children("a")[0].children[0].classList.add("fa-angle-down");
            }
            lsItem($chapter);
        }
        $chapter.removeClass("invisible");
        if ($chapter.find(CHAPTER).length > 0) $chapter.find(CHAPTER).removeClass("invisible");
    }
    var lsItem = function () {
        var map = JSON.parse(localStorage.getItem(LS_NAMESPACE)) || {}
        if (arguments.length) {
            var $chapters = arguments[0];
            $chapters.each(function (index, element) {
                var level = $(this).data('level');
                var value = $(this).hasClass(TOGGLE_CLASSNAME);
                map[level] = value;
            })
            localStorage.setItem(LS_NAMESPACE, JSON.stringify(map));
        } else {
            return $(CHAPTER).map(function (index, element) {
                if (map[$(this).data('level')]) {
                    return this;
                }
            })
        }
    }
    gitbook.events.bind('page.change', function () {
        init()
    });
});
