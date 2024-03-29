$(document).ready(function () {
    'use strict';

    /*user agent*/
    if (navigator.userAgent.search("Chrome") >= 0) {
        $("body").addClass("chrome-browser");
    } else if (navigator.userAgent.search("Firefox") >= 0) {
        var firefoxBrowser = true;
        $("body").addClass("firefox-browser");
    } else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        var safariBrowser = true;
        $("body").addClass("safari-browser");
    } else if (navigator.userAgent.search("Opera") >= 0) {
        $("body").addClass("opera-browser");
    }
    /*user agent*/


    /*overflow: hidden fix for ios*/
    function popupFunction() {
        if (device.ios()) {
            var scrollTop = $(window).scrollTop();
            var windowH = $(window).innerHeight();
            $("body").addClass("pop-up-open");
            $("body").css({"top": "-" + scrollTop + "px"});
        }
    }

    function popupCloseFunction() {
        if (device.ios()) {
            var scTop = $("body").css("top");
            var suffix = scTop.match(/\d+/);
            $("body").removeClass("pop-up-open");
            $("body").removeAttr("style");
            $("html, body").scrollTop(parseInt(suffix));
        }
    }/*overflow: hidden fix for ios*/


    /*sticky share block on single page*/
    if ($(".share-block").length) {

        $("body").addClass("with-share-block");

        var linksCount = $(".share-block .soc-link").length;

        if (linksCount > 3) {
            $(".share-block .show-more-socials").show();
            $(".share-block .soc-link").eq(1).nextAll().not(".show-more-socials").wrapAll("<div class='socials-hidden'>");
        } else {
            $(".share-block").addClass("few");
        }


        $(".share-block .show-more-socials").on("click", function () {
            $(".share-block .socials-hidden").slideToggle();
        });

        $(".share-block .soc-link .fab").on({
            mouseenter: function () {
                $(this).parents(".soc-link").addClass("hover");
            },
            mouseleave: function () {
                $(this).parents(".soc-link").removeClass("hover");
            }
        });

        $(".js-mobile-share-show").on("click", function () {
            $(".share-block-main").slideToggle();
            $(".share-block").toggleClass("opened");
        });
    }

    $(document).mouseup(function (e) {
        var div = $(".share-block");
        if ($(".share-block").hasClass("opened") && !div.is(e.target)
            && div.has(e.target).length === 0) {
            $(".share-block-main").slideUp();
        }
    });
    /*sticky share block on single page*/


    /*Anchor link*/
    $(".js-anchor").on("click", function (e) {
        e.preventDefault();
        var thisHref = $(this).attr("data-href");
        var plansOffset = $(thisHref).offset().top;
        $("html, body").animate({
            scrollTop: plansOffset
        }, 500);
    });
    /*Anchor link*/


    /*fix css transition onload*/
    setTimeout(function () {
        $("body").removeClass("transition-none");
    }, 200);
    /*fix css transition onload*/


    /*input placeholder function*/
    $("input.input[placeholder], textarea.input[placeholder]").each(function () {
        var thisInput = $(this);

        if (thisInput.val() !== "") {
            thisInput.parent().addClass("active");
            thisInput.prev("label").addClass("active");
        }
    });

    $('input.input[placeholder], textarea.input[placeholder]').placeholderLabel();
    /*input placeholder function*/


    /*search section*/
    var pagecontainer = $('.page'),
        openCtrl = $('.search-button'),
        closeCtrl = $('#search-close'),
        searchcontainer = $('.search-section'),
        inputSearch = $('.search-section .search-input');

    function init() {
        initEvents();
    }

    function initEvents() {
        openCtrl.on('click', openSearch);
        closeCtrl.on('click', closeSearch);
        $('html').on('keyup', function (ev) {
            if (ev.keyCode === 27) {
                closeSearch();
            }
        });
    }

    function openSearch() {
        var currentScrollPosition = $(window).scrollTop();
        $("body").attr("data-scroll", currentScrollPosition);
        $("html, body").scrollTop(0);
        var windowHeight = $(window).innerHeight();
        $(".content-container-wrap").height(windowHeight);
        pagecontainer.addClass('page--move');
        searchcontainer.addClass('search--open');
        inputSearch.focus();
        $("html, body").addClass("locked");
        $("body").addClass("margin-fix");
        popupFunction();
    }

    function closeSearch() {
        pagecontainer.removeClass('page--move');
        searchcontainer.removeClass('search--open');
        inputSearch.blur();
        inputSearch.value = '';
        $("html, body").removeClass("locked");
        $(".content-container-wrap").removeAttr("style");
        $("body").removeClass("margin-fix");
        popupCloseFunction();
        $("html, body").scrollTop(+$("body").attr("data-scroll"));
    }

    init();
    /*search section*/


    /*mobile menu functions*/
    var menu = $("#js-panel"),
        overlay = $("#overlay");

    function openMenu() {
        menu.addClass("opened");
        overlay.fadeIn();
        $("html, body").addClass("locked");
        popupFunction();
    }

    function closeMenu() {
        menu.removeClass("opened");
        overlay.fadeOut();
        $("html, body").removeClass("locked");
        popupCloseFunction();
    }

    $("#js-menu-open").on("click", function () {
        openMenu();
    });

    $("#js-menu-close, #overlay").on("click", function () {
        closeMenu();
    });
    /*mobile menu functions*/


    /*dropdown menu*/
    $("#js-menu li").each(function () {
        var thisLi = $(this),
            thisChildrenUl = thisLi.children("ul");

        if (thisChildrenUl.length) {
            thisLi.addClass("dropdown-li");
        }
    });

    var firstLevelMenu = $("#js-menu > ul > li > ul"),
        secondLevelMenu = $("#js-menu > ul > li > ul > li > ul");

    if (firstLevelMenu.length) {
        firstLevelMenu.addClass("first-level-menu");
    }

    if (secondLevelMenu.length) {
        secondLevelMenu.addClass("second-level-menu");
    }

    $("li.dropdown-li > a").on("click", function (e) {
        e.preventDefault();

        if (window.innerWidth <= 1000) {
            var thisA = $(this),
                thisLi = thisA.parent("li"),
                thisMenu = thisA.next("ul");

            thisA.toggleClass("opened");
            thisMenu.slideToggle();
        }
    });

    $(document).mouseup(function (e) {
        if (device.tablet() && !firstLevelMenu.is(e.target) && !secondLevelMenu.is(e.target)) {
            $("li.dropdown-li a").removeClass("opened");
            $("li.dropdown-li ul").slideUp();
        }
    });

    $("#js-menu > ul > li.dropdown-li, .first-level-menu > li.dropdown-li").on({
        mouseenter: function () {

            if (window.innerWidth > 1000) {
                var thisLi = $(this),
                    thisA = thisLi.children("a"),
                    thisMenu = thisLi.children("ul");

                thisMenu.stop(true, true).fadeIn(120);
                thisA.addClass("hover");
            }
        },
        mouseleave: function () {

            if (window.innerWidth > 1000) {
                var thisLi = $(this),
                    thisA = thisLi.children("a"),
                    thisMenu = thisLi.children("ul");

                thisMenu.stop(true, true).fadeOut(120);
                thisA.removeClass("hover");
            }
        }
    });

    $(".second-level-menu li.dropdown-li > a").on("click", function (e) {
        e.preventDefault();

        if (window.innerWidth > 1000) {
            var thisA = $(this),
                thisLi = thisA.parent("li"),
                thisMenu = thisLi.children("ul");

            thisA.toggleClass("hover");
            thisA.toggleClass("opened");
            thisMenu.slideToggle();
        }
    });
    /*dropdown menu*/

    /*accordion opening function*/
    $(".accordion-item .accordion-item-title").on("click", function () {
        var thisItem = $(this).parent(),
            thisContent = $(this).next();

        thisItem.toggleClass("opened");
        thisContent.slideToggle();
    });
    /*accordion opening function*/


    /*Play btn*/
    $(".js-video-play-btn").on("click", function () {
        var thisBtn = $(this),
            thisVideo = thisBtn.next("video");

        thisBtn.hide();
        thisVideo.get(0).play();
        thisVideo.prop("controls", true);
    });
    /*Play btn*/


    /*include content styles for html widget*/
    if ($(".widget_custom_html").length) {
        $(".widget_custom_html").addClass("wp-content");
    }
    /*include content styles for html widget*/


    /*processing SVG images*/
    var siteProtocol = document.location.protocol;

    if ($("img.img-svg").length && siteProtocol === 'http:' || siteProtocol === 'https:') {
        $('img.img-svg').each(function () {
            var $img = $(this);
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');
            $.get(imgURL, function (data) {
                var $svg = $(data).find('svg');
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }
                $svg = $svg.removeAttr('xmlns:a');
                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }
                $img.replaceWith($svg);
            }, 'xml');
        });
    }
    /*processing SVG images*/


    /*modal window opening*/
    $('.getModal').on('click', function (e) {
        e.preventDefault();
        var thisLink = $(this);
        var target_modal = $(this).attr("data-href");

        $(target_modal).arcticmodal({
            openEffect: {speed: 150},
            beforeOpen: function (data, el) {
                $("body").addClass("locked");
                $("body").addClass("margin-fix");
            },
            afterOpen: function (data, el) {
                popupFunction();

            },
            afterClose: function (data, el) {
                popupCloseFunction();
                $("body").removeAttr("style");
                $("body").removeClass("locked");
                $("body").removeClass("margin-fix");
            }
        });
    });

    $('.modal_close').on('click', function () {
        $.arcticmodal('close');
    });
    /*modal window opening*/


    /*comments link in wticky block*/
    /*transform comments number*/
    if ($("#comments-section").length && $(".share-block").length) {
        $(".share-block-item.link-to-comments").show().css("display", "flex");

        var counterSpan = $(".link-to-comments .comments-count span");
        var counterComments = parseFloat(counterSpan.text());

        if ((counterComments >= 1000) && (counterComments < 1000000)) {
            var thisAttrK = (counterComments / 1000).toFixed(0) + "K";
            counterSpan.text(thisAttrK);
        }

        if ((counterComments >= 1000000) && (counterComments < 1000000000000)) {
            var thisAttrM = (counterComments / 1000000).toFixed(0) + "M";
            counterSpan.text(thisAttrM);
        }

        if (counterComments >= 1000000000000) {
            var thisAttrT = (counterComments / 1000000000000).toFixed(0) + "T";
            counterSpan.text(thisAttrT);
        }
    }
    /*comments link in wticky block*/
    /*transform comments number*/

    /*transform tables*/
    if ($(".wp-content table").length) {
        $(".wp-content table").each(function (key, item) {
            var thisTable = $(this),
                thisTdCount = thisTable.find("tr:last-child").children("td").length;

            var newIdName = 'table-n-' + key;

            thisTable.attr("id", newIdName);
            thisTable.addClass("count-" + thisTdCount);

            if (thisTdCount > 2) {
                thisTable.addClass("large-table");
            }

            if ($("#" + newIdName + " th").length) {
                $("#" + newIdName + " th").parent().addClass("thead");
                $("#" + newIdName).addClass("with-thead");
            }

        });

        $(".wp-content table th").each(function () {
            var thisText = $(this).text(),
                thisIndex = $(this).index(),
                thisTableId = $(this).parents("table").attr("id");

            $("#" + thisTableId + " td:nth-child(" + (thisIndex + 1) + ")").attr("data-title", thisText);
        });
    }
    /*transform tables*/
});


$(document).ready(function () {
    var anchor = document.getElementsByClassName("index-anchor");
    if (anchor.length === 1) {
        if (!Detector.webgl) Detector.addGetWebGLMessage();
        content = anchor[0];
        var canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var context = canvas.getContext('2d');
        var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#1e4877");
        gradient.addColorStop(0.5, "#4584b4");
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        var camera, scene, renderer, sky, mesh, geometry, material, i, h, color, colors = [], sprite, size, x, y, z;
        var mouseX = 0, mouseY = 0;
        var start_time = new Date().getTime();
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        init();
        animate();
    }

    function init() {
        camera = new THREE.Camera(30, window.innerWidth / window.innerHeight, 1, 3000);
        camera.position.z = 6000;
        scene = new THREE.Scene();
        geometry = new THREE.Geometry();
        var texture = THREE.ImageUtils.loadTexture("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURQAAANje4Nbc3tfd3+rt7ufq7OTo6ufq7Ons7ujs7ff4+fn6+tfc3/7+/vj5+fb4+Pb3+Pr6+/////////////v7/P////////////n6+v////////7+/vLz9P39/f///////////////////9bc3vb4+PDy8/7///3+/u7w8f////////////7+//39/f7+//////T19tbb3tbc3vb4+P///+bp697j5f////n5+vDy8/P09e/x8u7x8vHy8////////+/x8ebq6////+Xo6u3v8PT29tbc3vf4+f///+rt7vL09e/x8vv8/Ozu7+3w8djd4P///+Lm6Pj5+f////////39/f39/dzh4////9HY2v39/dXb3v7//9fd3/n5+tjd4P///9fd3/X29////9fc3+vt7s7V2NXb3vP09f////n5+vP09ejs7ebp69Xb3ens7uLm6Nbc3tjd4OLm6Nfc39bc3tTa3ens7fDy8+ns7dnf4fb3+Njd4PP09d7i5fz8/P39/dne4eHl5+Xp6v39/t7j5dzg49je4OXo6tfd3/////7+/vr6+8/W2efq6/7+/t7j5d3h487V2Ozu79bc3tbc39vg4vf4+Pb3+Pv7/P///+fq7Ozv8Pb3+ODk5uPn6f////7+/t7i5PT19u7w8c7V2PX29/r6++bp6+fq7Ort7tfd3+/x8vX299bb3uHl5+nr7fP19dTa3fb3+O/x8vv7++Dk5v39/ePn6f///9Pa3Nne4dXb3vP19fP09dTa3ebq693i5M/V2P///9bc3tfc3+fq7Njd4Pv8/Nfd39/j5dTa3eLm6OXo6f7+/uns7dLY2/P09dbb3tLY293i5OTo6fT19s/V2MzT1+3v8PP09dvg4uHl5+Hl5tHX2uHl59bb3trf4t7j5dbc39bb3uvu7/Dy8+fp6+fq7Pn6+uTo6ufq7Ort7vb3+Njd4OPn6fb3+O7w8fb3+Nzh4+vu7+/x8uDk5uTo6u7x8vz9/fz9/fv8/Pf4+fn6+vX29+2SCnQAAAD9dFJOUwADDQsDBgcBAgQNEBDf+gsIE7DSz/TIwMUW1czj1ue5uL6qshMn5djvzJy1vOprd5P2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");
        texture.magFilter = THREE.LinearMipMapLinearFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        var fog = new THREE.Fog(0x4584b4, -100, 3000);
        material = new THREE.MeshShaderMaterial({
            uniforms: {
                "map": {type: "t", value: 2, texture: texture},
                "fogColor": {type: "c", value: fog.color},
                "fogNear": {type: "f", value: fog.near},
                "fogFar": {type: "f", value: fog.far},
            },
            vertexShader: document.getElementById('vs').textContent,
            fragmentShader: document.getElementById('fs').textContent,
            depthTest: false
        });
        var plane = new THREE.Mesh(new THREE.Plane(64, 64));
        for (i = 0; i < 8000; i++) {
            plane.position.x = Math.random() * 1000 - 500;
            plane.position.y = -Math.random() * Math.random() * 200 - 15;
            plane.position.z = i;
            plane.rotation.z = Math.random() * Math.PI;
            plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
            GeometryUtils.merge(geometry, plane);
        }
        mesh = new THREE.Mesh(geometry, material);
        scene.addObject(mesh);
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = -8000;
        scene.addObject(mesh);
        renderer = new THREE.WebGLRenderer({antialias: false});
        renderer.setSize(window.innerWidth, window.innerHeight);
        content.appendChild(renderer.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);
    }

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * 0.25;
        mouseY = (event.clientY - windowHalfY) * 0.15;
    }

    function onWindowResize(event) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        position = ((new Date().getTime() - start_time) * 0.03) % 8000;
        camera.position.x += (mouseX - camera.target.position.x) * 0.01;
        camera.position.y += (-mouseY - camera.target.position.y) * 0.01;
        camera.position.z = -position + 8000;
        camera.target.position.x = camera.position.x;
        camera.target.position.y = camera.position.y;
        camera.target.position.z = camera.position.z - 1000;
        renderer.render(scene, camera);
    }

    /*sidebar catalog*/
    function genCatalogs() {
        let toc = [];
        $('#bearcool-images').find('h1,h2,h3,h4,h5,h6').each((index, item) => {
            item = $(item);
            item.attr('id', `anchor-${index}`);
            item.attr('index', index);
            toc.push({
                ...item, level: Number(item.prop("tagName").substring(1, 2)),
                content: item.text(), index: `${index}`
            });
        });

        let childrenList = (current, arr) => {
            let children = [];
            for (let i = 0, len = arr.length; i < len; i++) {
                let item = arr[i];
                if (item.level <= current.level) {
                    break;
                }
                $(`#anchor-${item.index}`).attr('parent', 'anchor-' + current.index);
                children.push(item);
            }

            if (children.length > 0) {
                arr.splice(0, children.length);
            }
            return children;
        };

        let toTree = (result, arr, level) => {
            let first = arr.shift();
            if (first) {
                result.push(first);
            }
            while (arr.length > 0) {
                let children = childrenList(first, arr);
                if (children.length === 0) {
                    first = arr.shift();
                    if (first) {
                        result.push(first);
                    }
                    continue;
                }
                first.children = [];
                toTree(first.children, children, level + 1);
            }
        };
        let tree = [];
        toTree(tree, toc, 1);
        return tree;
    };
    genCatalogs().forEach(item => {
        let catalog = $('<div class="catalog"></div>');
        catalog.append(`<div class="item"><div class="circle"></div><a class="title" id=cata-${item.index} onclick="javascript:document.getElementById('anchor-${item.index}').scrollIntoView({block:'start'})">${item.content}</a></div>`);
        let child = $('<div></div>');
        if (item.children)
            item.children.forEach(sub => {
                child.append(`<div class="item sub-catalog"><div class="circle h3"></div><a class="title" id='cata-${sub.index}' onclick="javascript:document.getElementById('anchor-${sub.index}').scrollIntoView({block:'start'})">${sub.content}</a></div>`);
            });
        catalog.append(child);
        $('.catalog-container').append(catalog);
    });
    const titleScrollObserver = (obs) => {
        obs.forEach(observe => {
            const ratio = observe.intersectionRatio;
            let item = $(`#cata-${$(observe.target).attr('index')}`);
            if (ratio === 0) {
                item.removeClass('show');
            } else if (ratio > 0) {
                item.addClass('show');
                item.get(0).scrollIntoView({block: "nearest"})
            }
        });
    };
    const observer = new IntersectionObserver(titleScrollObserver);
    let tocList = document.getElementById('bearcool-images').querySelectorAll("h1,h2,h3,h4,h5,h6");
    Array.from(tocList).map(item => observer.observe(item));
    /*sidebar catalog*/
});
/*!
 * current-device v0.10.2 - https://github.com/matthewhudson/current-device
 * MIT Licensed
 */
!function (n, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.device = e() : n.device = e()
}(window, function () {
    return function (n) {
        var e = {};

        function o(t) {
            if (e[t]) return e[t].exports;
            var r = e[t] = {i: t, l: !1, exports: {}};
            return n[t].call(r.exports, r, r.exports, o), r.l = !0, r.exports
        }

        return o.m = n, o.c = e, o.d = function (n, e, t) {
            o.o(n, e) || Object.defineProperty(n, e, {enumerable: !0, get: t})
        }, o.r = function (n) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(n, "__esModule", {value: !0})
        }, o.t = function (n, e) {
            if (1 & e && (n = o(n)), 8 & e) return n;
            if (4 & e && "object" == typeof n && n && n.__esModule) return n;
            var t = Object.create(null);
            if (o.r(t), Object.defineProperty(t, "default", {
                enumerable: !0,
                value: n
            }), 2 & e && "string" != typeof n) for (var r in n) o.d(t, r, function (e) {
                return n[e]
            }.bind(null, r));
            return t
        }, o.n = function (n) {
            var e = n && n.__esModule ? function () {
                return n.default
            } : function () {
                return n
            };
            return o.d(e, "a", e), e
        }, o.o = function (n, e) {
            return Object.prototype.hasOwnProperty.call(n, e)
        }, o.p = "", o(o.s = 0)
    }([function (n, e, o) {
        n.exports = o(1)
    }, function (n, e, o) {
        "use strict";
        o.r(e);
        var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
            return typeof n
        } : function (n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        }, r = window.device, i = {}, a = [];
        window.device = i;
        var c = window.document.documentElement, d = window.navigator.userAgent.toLowerCase(),
            u = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "pov_tv", "hbbtv", "ce-html"];

        function l(n, e) {
            return -1 !== n.indexOf(e)
        }

        function s(n) {
            return l(d, n)
        }

        function f(n) {
            return c.className.match(new RegExp(n, "i"))
        }

        function b(n) {
            var e = null;
            f(n) || (e = c.className.replace(/^\s+|\s+$/g, ""), c.className = e + " " + n)
        }

        function p(n) {
            f(n) && (c.className = c.className.replace(" " + n, ""))
        }

        function w() {
            i.landscape() ? (p("portrait"), b("landscape"), y("landscape")) : (p("landscape"), b("portrait"), y("portrait")), v()
        }

        function y(n) {
            for (var e = 0; e < a.length; e++) a[e](n)
        }

        i.macos = function () {
            return s("mac")
        }, i.ios = function () {
            return i.iphone() || i.ipod() || i.ipad()
        }, i.iphone = function () {
            return !i.windows() && s("iphone")
        }, i.ipod = function () {
            return s("ipod")
        }, i.ipad = function () {
            var n = "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1;
            return s("ipad") || n
        }, i.android = function () {
            return !i.windows() && s("android")
        }, i.androidPhone = function () {
            return i.android() && s("mobile")
        }, i.androidTablet = function () {
            return i.android() && !s("mobile")
        }, i.blackberry = function () {
            return s("blackberry") || s("bb10")
        }, i.blackberryPhone = function () {
            return i.blackberry() && !s("tablet")
        }, i.blackberryTablet = function () {
            return i.blackberry() && s("tablet")
        }, i.windows = function () {
            return s("windows")
        }, i.windowsPhone = function () {
            return i.windows() && s("phone")
        }, i.windowsTablet = function () {
            return i.windows() && s("touch") && !i.windowsPhone()
        }, i.fxos = function () {
            return (s("(mobile") || s("(tablet")) && s(" rv:")
        }, i.fxosPhone = function () {
            return i.fxos() && s("mobile")
        }, i.fxosTablet = function () {
            return i.fxos() && s("tablet")
        }, i.meego = function () {
            return s("meego")
        }, i.cordova = function () {
            return window.cordova && "file:" === location.protocol
        }, i.nodeWebkit = function () {
            return "object" === t(window.process)
        }, i.mobile = function () {
            return i.androidPhone() || i.iphone() || i.ipod() || i.windowsPhone() || i.blackberryPhone() || i.fxosPhone() || i.meego()
        }, i.tablet = function () {
            return i.ipad() || i.androidTablet() || i.blackberryTablet() || i.windowsTablet() || i.fxosTablet()
        }, i.desktop = function () {
            return !i.tablet() && !i.mobile()
        }, i.television = function () {
            for (var n = 0; n < u.length;) {
                if (s(u[n])) return !0;
                n++
            }
            return !1
        }, i.portrait = function () {
            return screen.orientation && Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? l(screen.orientation.type, "portrait") : i.ios() && Object.prototype.hasOwnProperty.call(window, "orientation") ? 90 !== Math.abs(window.orientation) : window.innerHeight / window.innerWidth > 1
        }, i.landscape = function () {
            return screen.orientation && Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? l(screen.orientation.type, "landscape") : i.ios() && Object.prototype.hasOwnProperty.call(window, "orientation") ? 90 === Math.abs(window.orientation) : window.innerHeight / window.innerWidth < 1
        }, i.noConflict = function () {
            return window.device = r, this
        }, i.ios() ? i.ipad() ? b("ios ipad tablet") : i.iphone() ? b("ios iphone mobile") : i.ipod() && b("ios ipod mobile") : i.macos() ? b("macos desktop") : i.android() ? i.androidTablet() ? b("android tablet") : b("android mobile") : i.blackberry() ? i.blackberryTablet() ? b("blackberry tablet") : b("blackberry mobile") : i.windows() ? i.windowsTablet() ? b("windows tablet") : i.windowsPhone() ? b("windows mobile") : b("windows desktop") : i.fxos() ? i.fxosTablet() ? b("fxos tablet") : b("fxos mobile") : i.meego() ? b("meego mobile") : i.nodeWebkit() ? b("node-webkit") : i.television() ? b("television") : i.desktop() && b("desktop"), i.cordova() && b("cordova"), i.onChangeOrientation = function (n) {
            "function" == typeof n && a.push(n)
        };
        var m = "resize";

        function h(n) {
            for (var e = 0; e < n.length; e++) if (i[n[e]]()) return n[e];
            return "unknown"
        }

        function v() {
            i.orientation = h(["portrait", "landscape"])
        }

        Object.prototype.hasOwnProperty.call(window, "onorientationchange") && (m = "orientationchange"), window.addEventListener ? window.addEventListener(m, w, !1) : window.attachEvent ? window.attachEvent(m, w) : window[m] = w, w(), i.type = h(["mobile", "tablet", "desktop"]), i.os = h(["ios", "iphone", "ipad", "ipod", "android", "blackberry", "macos", "windows", "fxos", "meego", "television"]), v(), e.default = i
    }]).default
});


var QRCode;
!function () {
    function t(t) {
        this.mode = r.MODE_8BIT_BYTE, this.data = t, this.parsedData = [];
        for (var e = 0, o = this.data.length; e < o; e++) {
            var i = [], n = this.data.charCodeAt(e);
            n > 65536 ? (i[0] = 240 | (1835008 & n) >>> 18, i[1] = 128 | (258048 & n) >>> 12, i[2] = 128 | (4032 & n) >>> 6, i[3] = 128 | 63 & n) : n > 2048 ? (i[0] = 224 | (61440 & n) >>> 12, i[1] = 128 | (4032 & n) >>> 6, i[2] = 128 | 63 & n) : n > 128 ? (i[0] = 192 | (1984 & n) >>> 6, i[1] = 128 | 63 & n) : i[0] = n, this.parsedData.push(i)
        }
        this.parsedData = Array.prototype.concat.apply([], this.parsedData), this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239))
    }

    function e(t, e) {
        this.typeNumber = t, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
    }

    t.prototype = {
        getLength: function (t) {
            return this.parsedData.length
        }, write: function (t) {
            for (var e = 0, r = this.parsedData.length; e < r; e++) t.put(this.parsedData[e], 8)
        }
    }, e.prototype = {
        addData: function (e) {
            var r = new t(e);
            this.dataList.push(r), this.dataCache = null
        }, isDark: function (t, e) {
            if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e) throw new Error(t + "," + e);
            return this.modules[t][e]
        }, getModuleCount: function () {
            return this.moduleCount
        }, make: function () {
            this.makeImpl(!1, this.getBestMaskPattern())
        }, makeImpl: function (t, r) {
            this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
            for (var o = 0; o < this.moduleCount; o++) {
                this.modules[o] = new Array(this.moduleCount);
                for (var i = 0; i < this.moduleCount; i++) this.modules[o][i] = null
            }
            this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(t, r), this.typeNumber >= 7 && this.setupTypeNumber(t), null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, r)
        }, setupPositionProbePattern: function (t, e) {
            for (var r = -1; r <= 7; r++) if (!(t + r <= -1 || this.moduleCount <= t + r)) for (var o = -1; o <= 7; o++) e + o <= -1 || this.moduleCount <= e + o || (this.modules[t + r][e + o] = 0 <= r && r <= 6 && (0 == o || 6 == o) || 0 <= o && o <= 6 && (0 == r || 6 == r) || 2 <= r && r <= 4 && 2 <= o && o <= 4)
        }, getBestMaskPattern: function () {
            for (var t = 0, e = 0, r = 0; r < 8; r++) {
                this.makeImpl(!0, r);
                var o = g.getLostPoint(this);
                (0 == r || t > o) && (t = o, e = r)
            }
            return e
        }, createMovieClip: function (t, e, r) {
            var o = t.createEmptyMovieClip(e, r);
            this.make();
            for (var i = 0; i < this.modules.length; i++) for (var n = 1 * i, a = 0; a < this.modules[i].length; a++) {
                var s = 1 * a;
                this.modules[i][a] && (o.beginFill(0, 100), o.moveTo(s, n), o.lineTo(s + 1, n), o.lineTo(s + 1, n + 1), o.lineTo(s, n + 1), o.endFill())
            }
            return o
        }, setupTimingPattern: function () {
            for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
            for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0)
        }, setupPositionAdjustPattern: function () {
            for (var t = g.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) for (var r = 0; r < t.length; r++) {
                var o = t[e], i = t[r];
                if (null == this.modules[o][i]) for (var n = -2; n <= 2; n++) for (var a = -2; a <= 2; a++) this.modules[o + n][i + a] = -2 == n || 2 == n || -2 == a || 2 == a || 0 == n && 0 == a
            }
        }, setupTypeNumber: function (t) {
            for (var e = g.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {
                var o = !t && 1 == (e >> r & 1);
                this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = o
            }
            for (r = 0; r < 18; r++) {
                o = !t && 1 == (e >> r & 1);
                this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = o
            }
        }, setupTypeInfo: function (t, e) {
            for (var r = this.errorCorrectLevel << 3 | e, o = g.getBCHTypeInfo(r), i = 0; i < 15; i++) {
                var n = !t && 1 == (o >> i & 1);
                i < 6 ? this.modules[i][8] = n : i < 8 ? this.modules[i + 1][8] = n : this.modules[this.moduleCount - 15 + i][8] = n
            }
            for (i = 0; i < 15; i++) {
                n = !t && 1 == (o >> i & 1);
                i < 8 ? this.modules[8][this.moduleCount - i - 1] = n : i < 9 ? this.modules[8][15 - i - 1 + 1] = n : this.modules[8][15 - i - 1] = n
            }
            this.modules[this.moduleCount - 8][8] = !t
        }, mapData: function (t, e) {
            for (var r = -1, o = this.moduleCount - 1, i = 7, n = 0, a = this.moduleCount - 1; a > 0; a -= 2) for (6 == a && a--; ;) {
                for (var s = 0; s < 2; s++) if (null == this.modules[o][a - s]) {
                    var h = !1;
                    n < t.length && (h = 1 == (t[n] >>> i & 1)), g.getMask(e, o, a - s) && (h = !h), this.modules[o][a - s] = h, -1 == --i && (n++, i = 7)
                }
                if ((o += r) < 0 || this.moduleCount <= o) {
                    o -= r, r = -r;
                    break
                }
            }
        }
    }, e.PAD0 = 236, e.PAD1 = 17, e.createData = function (t, r, o) {
        for (var i = m.getRSBlocks(t, r), n = new _, a = 0; a < o.length; a++) {
            var s = o[a];
            n.put(s.mode, 4), n.put(s.getLength(), g.getLengthInBits(s.mode, t)), s.write(n)
        }
        var h = 0;
        for (a = 0; a < i.length; a++) h += i[a].dataCount;
        if (n.getLengthInBits() > 8 * h) throw new Error("code length overflow. (" + n.getLengthInBits() + ">" + 8 * h + ")");
        for (n.getLengthInBits() + 4 <= 8 * h && n.put(0, 4); n.getLengthInBits() % 8 != 0;) n.putBit(!1);
        for (; !(n.getLengthInBits() >= 8 * h || (n.put(e.PAD0, 8), n.getLengthInBits() >= 8 * h));) n.put(e.PAD1, 8);
        return e.createBytes(n, i)
    }, e.createBytes = function (t, e) {
        for (var r = 0, o = 0, i = 0, n = new Array(e.length), a = new Array(e.length), s = 0; s < e.length; s++) {
            var h = e[s].dataCount, l = e[s].totalCount - h;
            o = Math.max(o, h), i = Math.max(i, l), n[s] = new Array(h);
            for (var u = 0; u < n[s].length; u++) n[s][u] = 255 & t.buffer[u + r];
            r += h;
            var f = g.getErrorCorrectPolynomial(l), d = new p(n[s], f.getLength() - 1).mod(f);
            a[s] = new Array(f.getLength() - 1);
            for (u = 0; u < a[s].length; u++) {
                var c = u + d.getLength() - a[s].length;
                a[s][u] = c >= 0 ? d.get(c) : 0
            }
        }
        var m = 0;
        for (u = 0; u < e.length; u++) m += e[u].totalCount;
        var _ = new Array(m), v = 0;
        for (u = 0; u < o; u++) for (s = 0; s < e.length; s++) u < n[s].length && (_[v++] = n[s][u]);
        for (u = 0; u < i; u++) for (s = 0; s < e.length; s++) u < a[s].length && (_[v++] = a[s][u]);
        return _
    };
    for (var r = {MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8}, o = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2
    }, i = 0, n = 1, a = 2, s = 3, h = 4, l = 5, u = 6, f = 7, g = {
        PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
        G15: 1335,
        G18: 7973,
        G15_MASK: 21522,
        getBCHTypeInfo: function (t) {
            for (var e = t << 10; g.getBCHDigit(e) - g.getBCHDigit(g.G15) >= 0;) e ^= g.G15 << g.getBCHDigit(e) - g.getBCHDigit(g.G15);
            return (t << 10 | e) ^ g.G15_MASK
        },
        getBCHTypeNumber: function (t) {
            for (var e = t << 12; g.getBCHDigit(e) - g.getBCHDigit(g.G18) >= 0;) e ^= g.G18 << g.getBCHDigit(e) - g.getBCHDigit(g.G18);
            return t << 12 | e
        },
        getBCHDigit: function (t) {
            for (var e = 0; 0 != t;) e++, t >>>= 1;
            return e
        },
        getPatternPosition: function (t) {
            return g.PATTERN_POSITION_TABLE[t - 1]
        },
        getMask: function (t, e, r) {
            switch (t) {
                case i:
                    return (e + r) % 2 == 0;
                case n:
                    return e % 2 == 0;
                case a:
                    return r % 3 == 0;
                case s:
                    return (e + r) % 3 == 0;
                case h:
                    return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;
                case l:
                    return e * r % 2 + e * r % 3 == 0;
                case u:
                    return (e * r % 2 + e * r % 3) % 2 == 0;
                case f:
                    return (e * r % 3 + (e + r) % 2) % 2 == 0;
                default:
                    throw new Error("bad maskPattern:" + t)
            }
        },
        getErrorCorrectPolynomial: function (t) {
            for (var e = new p([1], 0), r = 0; r < t; r++) e = e.multiply(new p([1, d.gexp(r)], 0));
            return e
        },
        getLengthInBits: function (t, e) {
            if (1 <= e && e < 10) switch (t) {
                case r.MODE_NUMBER:
                    return 10;
                case r.MODE_ALPHA_NUM:
                    return 9;
                case r.MODE_8BIT_BYTE:
                case r.MODE_KANJI:
                    return 8;
                default:
                    throw new Error("mode:" + t)
            } else if (e < 27) switch (t) {
                case r.MODE_NUMBER:
                    return 12;
                case r.MODE_ALPHA_NUM:
                    return 11;
                case r.MODE_8BIT_BYTE:
                    return 16;
                case r.MODE_KANJI:
                    return 10;
                default:
                    throw new Error("mode:" + t)
            } else {
                if (!(e < 41)) throw new Error("type:" + e);
                switch (t) {
                    case r.MODE_NUMBER:
                        return 14;
                    case r.MODE_ALPHA_NUM:
                        return 13;
                    case r.MODE_8BIT_BYTE:
                        return 16;
                    case r.MODE_KANJI:
                        return 12;
                    default:
                        throw new Error("mode:" + t)
                }
            }
        },
        getLostPoint: function (t) {
            for (var e = t.getModuleCount(), r = 0, o = 0; o < e; o++) for (var i = 0; i < e; i++) {
                for (var n = 0, a = t.isDark(o, i), s = -1; s <= 1; s++) if (!(o + s < 0 || e <= o + s)) for (var h = -1; h <= 1; h++) i + h < 0 || e <= i + h || 0 == s && 0 == h || a == t.isDark(o + s, i + h) && n++;
                n > 5 && (r += 3 + n - 5)
            }
            for (o = 0; o < e - 1; o++) for (i = 0; i < e - 1; i++) {
                var l = 0;
                t.isDark(o, i) && l++, t.isDark(o + 1, i) && l++, t.isDark(o, i + 1) && l++, t.isDark(o + 1, i + 1) && l++, 0 != l && 4 != l || (r += 3)
            }
            for (o = 0; o < e; o++) for (i = 0; i < e - 6; i++) t.isDark(o, i) && !t.isDark(o, i + 1) && t.isDark(o, i + 2) && t.isDark(o, i + 3) && t.isDark(o, i + 4) && !t.isDark(o, i + 5) && t.isDark(o, i + 6) && (r += 40);
            for (i = 0; i < e; i++) for (o = 0; o < e - 6; o++) t.isDark(o, i) && !t.isDark(o + 1, i) && t.isDark(o + 2, i) && t.isDark(o + 3, i) && t.isDark(o + 4, i) && !t.isDark(o + 5, i) && t.isDark(o + 6, i) && (r += 40);
            var u = 0;
            for (i = 0; i < e; i++) for (o = 0; o < e; o++) t.isDark(o, i) && u++;
            return r += 10 * (Math.abs(100 * u / e / e - 50) / 5)
        }
    }, d = {
        glog: function (t) {
            if (t < 1) throw new Error("glog(" + t + ")");
            return d.LOG_TABLE[t]
        }, gexp: function (t) {
            for (; t < 0;) t += 255;
            for (; t >= 256;) t -= 255;
            return d.EXP_TABLE[t]
        }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256)
    }, c = 0; c < 8; c++) d.EXP_TABLE[c] = 1 << c;
    for (c = 8; c < 256; c++) d.EXP_TABLE[c] = d.EXP_TABLE[c - 4] ^ d.EXP_TABLE[c - 5] ^ d.EXP_TABLE[c - 6] ^ d.EXP_TABLE[c - 8];
    for (c = 0; c < 255; c++) d.LOG_TABLE[d.EXP_TABLE[c]] = c;

    function p(t, e) {
        if (void 0 == t.length) throw new Error(t.length + "/" + e);
        for (var r = 0; r < t.length && 0 == t[r];) r++;
        this.num = new Array(t.length - r + e);
        for (var o = 0; o < t.length - r; o++) this.num[o] = t[o + r]
    }

    function m(t, e) {
        this.totalCount = t, this.dataCount = e
    }

    function _() {
        this.buffer = [], this.length = 0
    }

    p.prototype = {
        get: function (t) {
            return this.num[t]
        }, getLength: function () {
            return this.num.length
        }, multiply: function (t) {
            for (var e = new Array(this.getLength() + t.getLength() - 1), r = 0; r < this.getLength(); r++) for (var o = 0; o < t.getLength(); o++) e[r + o] ^= d.gexp(d.glog(this.get(r)) + d.glog(t.get(o)));
            return new p(e, 0)
        }, mod: function (t) {
            if (this.getLength() - t.getLength() < 0) return this;
            for (var e = d.glog(this.get(0)) - d.glog(t.get(0)), r = new Array(this.getLength()), o = 0; o < this.getLength(); o++) r[o] = this.get(o);
            for (o = 0; o < t.getLength(); o++) r[o] ^= d.gexp(d.glog(t.get(o)) + e);
            return new p(r, 0).mod(t)
        }
    }, m.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], m.getRSBlocks = function (t, e) {
        var r = m.getRsBlockTable(t, e);
        if (void 0 == r) throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);
        for (var o = r.length / 3, i = [], n = 0; n < o; n++) for (var a = r[3 * n + 0], s = r[3 * n + 1], h = r[3 * n + 2], l = 0; l < a; l++) i.push(new m(s, h));
        return i
    }, m.getRsBlockTable = function (t, e) {
        switch (e) {
            case o.L:
                return m.RS_BLOCK_TABLE[4 * (t - 1) + 0];
            case o.M:
                return m.RS_BLOCK_TABLE[4 * (t - 1) + 1];
            case o.Q:
                return m.RS_BLOCK_TABLE[4 * (t - 1) + 2];
            case o.H:
                return m.RS_BLOCK_TABLE[4 * (t - 1) + 3];
            default:
                return
        }
    }, _.prototype = {
        get: function (t) {
            var e = Math.floor(t / 8);
            return 1 == (this.buffer[e] >>> 7 - t % 8 & 1)
        }, put: function (t, e) {
            for (var r = 0; r < e; r++) this.putBit(1 == (t >>> e - r - 1 & 1))
        }, getLengthInBits: function () {
            return this.length
        }, putBit: function (t) {
            var e = Math.floor(this.length / 8);
            this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), this.length++
        }
    };
    var v = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];

    function C() {
        var t = !1, e = navigator.userAgent;
        if (/android/i.test(e)) {
            t = !0;
            var r = e.toString().match(/android ([0-9]\.[0-9])/i);
            r && r[1] && (t = parseFloat(r[1]))
        }
        return t
    }

    var w = function () {
            var t = function (t, e) {
                this._el = t, this._htOption = e
            };
            return t.prototype.draw = function (t) {
                var e = this._htOption, r = this._el, o = t.getModuleCount();
                Math.floor(e.width / o), Math.floor(e.height / o);

                function i(t, e) {
                    var r = document.createElementNS("http://www.w3.org/2000/svg", t);
                    for (var o in e) e.hasOwnProperty(o) && r.setAttribute(o, e[o]);
                    return r
                }

                this.clear();
                var n = i("svg", {
                    viewBox: "0 0 " + String(o) + " " + String(o),
                    width: "100%",
                    height: "100%",
                    fill: e.colorLight
                });
                n.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), r.appendChild(n), n.appendChild(i("rect", {
                    fill: e.colorLight,
                    width: "100%",
                    height: "100%"
                })), n.appendChild(i("rect", {fill: e.colorDark, width: "1", height: "1", id: "template"}));
                for (var a = 0; a < o; a++) for (var s = 0; s < o; s++) if (t.isDark(a, s)) {
                    var h = i("use", {x: String(s), y: String(a)});
                    h.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template"), n.appendChild(h)
                }
            }, t.prototype.clear = function () {
                for (; this._el.hasChildNodes();) this._el.removeChild(this._el.lastChild)
            }, t
        }(),
        D = "svg" === document.documentElement.tagName.toLowerCase() ? w : "undefined" == typeof CanvasRenderingContext2D ? function () {
            var t = function (t, e) {
                this._el = t, this._htOption = e
            };
            return t.prototype.draw = function (t) {
                for (var e = this._htOption, r = this._el, o = t.getModuleCount(), i = Math.floor(e.width / o), n = Math.floor(e.height / o), a = ['<table style="border:0;border-collapse:collapse;">'], s = 0; s < o; s++) {
                    a.push("<tr>");
                    for (var h = 0; h < o; h++) a.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + i + "px;height:" + n + "px;background-color:" + (t.isDark(s, h) ? e.colorDark : e.colorLight) + ';"></td>');
                    a.push("</tr>")
                }
                a.push("</table>"), r.innerHTML = a.join("");
                var l = r.childNodes[0], u = (e.width - l.offsetWidth) / 2, f = (e.height - l.offsetHeight) / 2;
                u > 0 && f > 0 && (l.style.margin = f + "px " + u + "px")
            }, t.prototype.clear = function () {
                this._el.innerHTML = ""
            }, t
        }() : function () {
            function t() {
                this._elImage.src = this._elCanvas.toDataURL("image/png"), this._elImage.style.display = "block", this._elCanvas.style.display = "none"
            }

            if (this._android && this._android <= 2.1) {
                var e = 1 / window.devicePixelRatio, r = CanvasRenderingContext2D.prototype.drawImage;
                CanvasRenderingContext2D.prototype.drawImage = function (t, o, i, n, a, s, h, l, u) {
                    if ("nodeName" in t && /img/i.test(t.nodeName)) for (var f = arguments.length - 1; f >= 1; f--) arguments[f] = arguments[f] * e; else void 0 === l && (arguments[1] *= e, arguments[2] *= e, arguments[3] *= e, arguments[4] *= e);
                    r.apply(this, arguments)
                }
            }
            var o = function (t, e) {
                this._bIsPainted = !1, this._android = C(), this._htOption = e, this._elCanvas = document.createElement("canvas"), this._elCanvas.width = e.width, this._elCanvas.height = e.height, t.appendChild(this._elCanvas), this._el = t, this._oContext = this._elCanvas.getContext("2d"), this._bIsPainted = !1, this._elImage = document.createElement("img"), this._elImage.id = "qrcodes", this._elImage.style.display = "none", this._el.appendChild(this._elImage), this._bSupportDataURI = null
            };
            return o.prototype.draw = function (t) {
                var e = this._elImage, r = this._oContext, o = this._htOption, i = t.getModuleCount(), n = o.width / i,
                    a = o.height / i, s = Math.round(n), h = Math.round(a);
                e.style.display = "none", this.clear();
                for (var l = 0; l < i; l++) for (var u = 0; u < i; u++) {
                    var f = t.isDark(l, u), g = u * n, d = l * a;
                    r.strokeStyle = f ? o.colorDark : o.colorLight, r.lineWidth = 1, r.fillStyle = f ? o.colorDark : o.colorLight, r.fillRect(g, d, n, a), r.strokeRect(Math.floor(g) + .5, Math.floor(d) + .5, s, h), r.strokeRect(Math.ceil(g) - .5, Math.ceil(d) - .5, s, h)
                }
                this._bIsPainted = !0
            }, o.prototype.makeImage = function () {
                this._bIsPainted && function (t, e) {
                    var r = this;
                    if (r._fFail = e, r._fSuccess = t, null === r._bSupportDataURI) {
                        var o = document.createElement("img"), i = function () {
                            r._bSupportDataURI = !1, r._fFail && r._fFail.call(r)
                        };
                        return o.onabort = i, o.onerror = i, o.onload = function () {
                            r._bSupportDataURI = !0, r._fSuccess && r._fSuccess.call(r)
                        }, void (o.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
                    }
                    !0 === r._bSupportDataURI && r._fSuccess ? r._fSuccess.call(r) : !1 === r._bSupportDataURI && r._fFail && r._fFail.call(r)
                }.call(this, t)
            }, o.prototype.isPainted = function () {
                return this._bIsPainted
            }, o.prototype.clear = function () {
                this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height), this._bIsPainted = !1
            }, o.prototype.round = function (t) {
                return t ? Math.floor(1e3 * t) / 1e3 : t
            }, o
        }();

    function A(t, e) {
        for (var r = 1, i = function (t) {
            var e = encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
            return e.length + (e.length != t ? 3 : 0)
        }(t), n = 0, a = v.length; n <= a; n++) {
            var s = 0;
            switch (e) {
                case o.L:
                    s = v[n][0];
                    break;
                case o.M:
                    s = v[n][1];
                    break;
                case o.Q:
                    s = v[n][2];
                    break;
                case o.H:
                    s = v[n][3]
            }
            if (i <= s) break;
            r++
        }
        if (r > v.length) throw new Error("Too long data");
        return r
    }

    (QRCode = function (t, e) {
        if (this._htOption = {
            width: 256,
            height: 256,
            typeNumber: 4,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: o.H
        }, "string" == typeof e && (e = {text: e}), e) for (var r in e) this._htOption[r] = e[r];
        "string" == typeof t && (t = document.getElementById(t)), this._htOption.useSVG && (D = w), this._android = C(), this._el = t, this._oQRCode = null, this._oDrawing = new D(this._el, this._htOption), this._htOption.text && this.makeCode(this._htOption.text)
    }).prototype.makeCode = function (t) {
        this._oQRCode = new e(A(t, this._htOption.correctLevel), this._htOption.correctLevel), this._oQRCode.addData(t), this._oQRCode.make(), this._el.title = t, this._oDrawing.draw(this._oQRCode), this.makeImage()
    }, QRCode.prototype.makeImage = function () {
        "function" == typeof this._oDrawing.makeImage && (!this._android || this._android >= 3) && this._oDrawing.makeImage()
    }, QRCode.prototype.clear = function () {
        this._oDrawing.clear()
    }, QRCode.CorrectLevel = o
}(), "undefined" != typeof module && (module.exports = QRCode);


(function ($) {
    $.fn.placeholderLabel = function (options) {

        var settings = $.extend({
            placeholderColor: "#898989",
            labelColor: "#4AA2CC",
            labelSize: this.css('font-size'),
            useBorderColor: true,
            inInput: true,
            timeMove: 200
        }, options);

        var BindOnData = function (label, input, pt) {
            var lh = label.height();
            var mtm = Number(pt.replace('px', '')) + (lh / 2);
            if (!settings.inInput) {
                mtm += lh / 2;
                label.css('background-color', '');
            }
            label.animate({}, settings.timeMove);
            input.keyup();
        };
        $(this).each(function (i, e) {
            var self = $(e);
            if (self.attr('bind-placeholder-label') != undefined) {
                var pt = self.css('padding-top');
                BindOnData(self.prev(), self, pt);
            }
            var currentBorderColor = self.css('border-color');
            var currentPlaceholderSize = self.css('font-size');
            if (self.attr('placeholder')) {

                var label = $('<label></label>');
                label.css('position', 'absolute');

                var text = self.attr('placeholder');
                self.removeAttr('placeholder');
                label.text(text);
                var ep = self.position().left;
                var pt = self.css('padding-top');
                var pl = self.css('padding-left');
                var mt = self.css('margin-top');
                var ml = self.css('margin-left');

                var self = self;
                label.click(function () {
                    self.focus();
                });
                self.focus(function () {
                    label.addClass('active');
                    label.parent().addClass('active');
                    $(".input").addClass('active');
                    if (!self.val().length) {
                        var lh = label.height();
                        var mtm = Number(pt.replace('px', '')) + (lh / 2);
                        if (!settings.inInput) {
                            mtm += lh / 2;
                            label.css('background-color', '');
                        }

                    }
                });
                self.blur(function () {


                    if (!self.val().length) {
                        var lh = label.height();
                        var mtm = Number(pt.replace('px', '')) + (lh / 2);
                        if (!settings.inInput) {
                            mtm += lh / 2;
                            label.css('background-color', '');

                        }

                        label.removeClass('active');
                        label.parent().removeClass('active');
                        $(".input").removeClass('active');

                    }
                });
                if (self.attr('alt')) {
                    var textLabel = self.attr('alt');
                    var textLabelOld = label.text();
                    self.removeAttr('alt');
                    self.keyup(function () {
                        if (self.val().length) {
                            label.text(textLabel);
                        } else {
                            label.text(textLabelOld);
                        }
                    });
                }
                self.before(label);
                if (self.val().length) {
                    BindOnData(label, self, pt);
                }
                return self.attr('bind-placeholder-label', 'true');
            } else {
                return null;
            }
        });
    };
}(jQuery));


/*
 arcticModal — jQuery plugin
 Version: 0.3
 Author: Sergey Predvoditelev (sergey.predvoditelev@gmail.com)
 Company: Arctic Laboratory (http://arcticlab.ru/)
 Docs & Examples: http://arcticlab.ru/arcticmodal/
 */
(function (d) {
    var g = {
        type: "html",
        content: "",
        url: "",
        ajax: {},
        ajax_request: null,
        closeOnEsc: !0,
        closeOnOverlayClick: !0,
        clone: !1,
        overlay: {block: void 0, tpl: '<div class="arcticmodal-overlay"></div>', css: {}},
        container: {
            block: void 0,
            tpl: '<div class="arcticmodal-container"><table class="arcticmodal-container_i"><tr><td class="arcticmodal-container_i2"></td></tr></table></div>'
        },
        wrap: void 0,
        body: void 0,
        errors: {
            tpl: '<div class="arcticmodal-error arcticmodal-close"></div>', autoclose_delay: 2E3,
            ajax_unsuccessful_load: "Error"
        },
        openEffect: {type: "fade", speed: 350},
        closeEffect: {type: "fade", speed: 150},
        beforeOpen: d.noop,
        afterOpen: d.noop,
        beforeClose: d.noop,
        afterClose: d.noop,
        afterLoading: d.noop,
        afterLoadingOnShow: d.noop,
        errorLoading: d.noop
    }, j = 0, e = d([]), m = {
        isEventOut: function (a, b) {
            var c = !0;
            d(a).each(function () {
                d(b.target).get(0) == d(this).get(0) && (c = !1);
                0 == d(b.target).closest("HTML", d(this).get(0)).length && (c = !1)
            });
            return c
        }
    }, f = {
        getParentEl: function (a) {
            var b = d(a);
            return b.data("arcticmodal") ? b : (b =
                d(a).closest(".arcticmodal-container").data("arcticmodalParentEl")) ? b : !1
        }, transition: function (a, b, c, e) {
            e = void 0 == e ? d.noop : e;
            switch (c.type) {
                case "fade":
                    "show" == b ? a.fadeIn(c.speed, e) : a.fadeOut(c.speed, e);
                    break;
                case "none":
                    "show" == b ? a.show() : a.hide(), e()
            }
        }, prepare_body: function (a, b) {
            d(".arcticmodal-close", a.body).unbind("click.arcticmodal").bind("click.arcticmodal", function () {
                b.arcticmodal("close");
                return !1
            })
        }, init_el: function (a, b) {
            var c = a.data("arcticmodal");
            if (!c) {
                c = b;
                j++;
                c.modalID = j;
                c.overlay.block =
                    d(c.overlay.tpl);
                c.overlay.block.css(c.overlay.css);
                c.container.block = d(c.container.tpl);
                c.body = d(".arcticmodal-container_i2", c.container.block);
                b.clone ? c.body.html(a.clone(!0)) : (a.before('<div id="arcticmodalReserve' + c.modalID + '" style="display: none" />'), c.body.html(a));
                f.prepare_body(c, a);
                c.closeOnOverlayClick && c.overlay.block.add(c.container.block).click(function (b) {
                    m.isEventOut(d(">*", c.body), b) && a.arcticmodal("close")
                });
                c.container.block.data("arcticmodalParentEl", a);
                a.data("arcticmodal", c);
                e = d.merge(e, a);
                d.proxy(h.show, a)();
                if ("html" == c.type) return a;
                if (void 0 != c.ajax.beforeSend) {
                    var k = c.ajax.beforeSend;
                    delete c.ajax.beforeSend
                }
                if (void 0 != c.ajax.success) {
                    var g = c.ajax.success;
                    delete c.ajax.success
                }
                if (void 0 != c.ajax.error) {
                    var l = c.ajax.error;
                    delete c.ajax.error
                }
                var n = d.extend(!0, {
                    url: c.url, beforeSend: function () {
                        void 0 == k ? c.body.html('<div class="arcticmodal-loading" />') : k(c, a)
                    }, success: function (b) {
                        a.trigger("afterLoading");
                        c.afterLoading(c, a, b);
                        void 0 == g ? c.body.html(b) : g(c, a, b);
                        f.prepare_body(c,
                            a);
                        a.trigger("afterLoadingOnShow");
                        c.afterLoadingOnShow(c, a, b)
                    }, error: function () {
                        a.trigger("errorLoading");
                        c.errorLoading(c, a);
                        void 0 == l ? (c.body.html(c.errors.tpl), d(".arcticmodal-error", c.body).html(c.errors.ajax_unsuccessful_load), d(".arcticmodal-close", c.body).click(function () {
                            a.arcticmodal("close");
                            return !1
                        }), c.errors.autoclose_delay && setTimeout(function () {
                            a.arcticmodal("close")
                        }, c.errors.autoclose_delay)) : l(c, a)
                    }
                }, c.ajax);
                c.ajax_request = d.ajax(n);
                a.data("arcticmodal", c)
            }
        }, init: function (a) {
            a =
                d.extend(!0, {}, g, a);
            if (d.isFunction(this)) if (void 0 == a) d.error("jquery.arcticmodal: Uncorrect parameters"); else if ("" == a.type) d.error('jquery.arcticmodal: Don\'t set parameter "type"'); else switch (a.type) {
                case "html":
                    if ("" == a.content) {
                        d.error('jquery.arcticmodal: Don\'t set parameter "content"');
                        break
                    }
                    var b = a.content;
                    a.content = "";
                    return f.init_el(d(b), a);
                case "ajax":
                    if ("" == a.url) {
                        d.error('jquery.arcticmodal: Don\'t set parameter "url"');
                        break
                    }
                    return f.init_el(d("<div />"), a)
            } else return this.each(function () {
                f.init_el(d(this),
                    d.extend(!0, {}, a))
            })
        }
    }, h = {
        show: function () {
            var a = f.getParentEl(this);
            if (!1 === a) d.error("jquery.arcticmodal: Uncorrect call"); else {
                var b = a.data("arcticmodal");
                b.overlay.block.hide();
                b.container.block.hide();
                d("BODY").append(b.overlay.block);
                d("BODY").append(b.container.block);
                b.beforeOpen(b, a);
                a.trigger("beforeOpen");
                if ("hidden" != b.wrap.css("overflow")) {
                    b.wrap.data("arcticmodalOverflow", b.wrap.css("overflow"));
                    var c = b.wrap.outerWidth(!0);
                    b.wrap.css("overflow", "hidden");/*html$('html').css('overflow','hidden');html*/
                    var g = b.wrap.outerWidth(!0);
                    g !=
                    c && b.wrap.css("marginRight", g - c + "px"), $("#menu").css("right", g - c + "px")
                }
                e.not(a).each(function () {
                    d(this).data("arcticmodal").overlay.block.hide()
                });
                f.transition(b.overlay.block, "show", 1 < e.length ? {type: "none"} : b.openEffect);
                f.transition(b.container.block, "show", 1 < e.length ? {type: "none"} : b.openEffect, function () {
                    b.afterOpen(b, a);
                    a.trigger("afterOpen")
                });
                return a
            }
        }, close: function () {
            if (d.isFunction(this)) e.each(function () {
                d(this).arcticmodal("close")
            }); else return this.each(function () {
                var a = f.getParentEl(this);
                if (!1 === a) d.error("jquery.arcticmodal: Uncorrect call");
                else {
                    var b = a.data("arcticmodal");
                    !1 !== b.beforeClose(b, a) && (a.trigger("beforeClose"), e.not(a).last().each(function () {
                        d(this).data("arcticmodal").overlay.block.show()
                    }), f.transition(b.overlay.block, "hide", 1 < e.length ? {type: "none"} : b.closeEffect), f.transition(b.container.block, "hide", 1 < e.length ? {type: "none"} : b.closeEffect, function () {
                        b.afterClose(b, a);
                        a.trigger("afterClose");
                        b.clone || d("#arcticmodalReserve" + b.modalID).replaceWith(b.body.find(">*"));
                        b.overlay.block.remove();
                        b.container.block.remove();/*html$('html').css('overflow','auto');html*/
                        a.data("arcticmodal",
                            null);
                        d(".arcticmodal-container").length || (b.wrap.data("arcticmodalOverflow") && b.wrap.css("overflow", b.wrap.data("arcticmodalOverflow")), $(".container").removeClass("blur"), b.wrap.css("marginRight", 0), $("body").removeAttr("style"))
                    }), "ajax" == b.type && b.ajax_request.abort(), e = e.not(a))
                }
            })
        }, setDefault: function (a) {
            d.extend(!0, g, a)
        }
    };
    d(function () {
        g.wrap = d(document.all && !document.querySelector ? "html" : "body")
    });
    d(document).bind("keyup.arcticmodal", function (a) {
        var b = e.last();
        b.length && b.data("arcticmodal").closeOnEsc && 27 === a.keyCode && b.arcticmodal("close")
    });
    d.arcticmodal =
        d.fn.arcticmodal = function (a) {
            if (h[a]) return h[a].apply(this, Array.prototype.slice.call(arguments, 1));
            if ("object" === typeof a || !a) return f.init.apply(this, arguments);
            d.error("jquery.arcticmodal: Method " + a + " does not exist")
        }
})(jQuery);