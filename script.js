(function ($) {

    $.fn.ilmSpin = function (options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            src: undefined,
            width: "400px",
            height: "400px",
            speed: 1000,
            frames: 35,
            timer: null,
            mouse: null,
            enableHandler: false,
            transition: {
                time: '0.1s',
                type: 'ease-out'
            },
            step: 0.5,
            zoom: 2,
            zoomMax: 10,
            zoomMin: 1.5,
            rate: 80,
            callback: null
        }, options);
        var inc = '';
        var src = settings.src;

        var width = settings.width;
        var singlewidth = parseFloat(width.replace('px', ''));
        var fullwidth = (singlewidth * settings.frames) + 'px';
        var height = settings.height;


        var images = '<ul class="ilmList" style="width:' + fullwidth + '; height:' + height + ';"></ul>';
        this.html(images);
        var src1 = '';
        if (settings.reverse) {
            for (var i = settings.frames; i >= 1; i--) {
                inc = (i < 10 ? "0" : "") + i;
                src1 = src.replace("{frame}", inc);
                var list = '<li style="width:' + width + '; height:' + height + ';"><img src="' + src1 + '" /></li>';
                jQuery(".ilmList").append(list);
            }
        } else {
            for (var i = 1; i <= settings.frames; i++) {
                inc = (i < 10 ? "0" : "") + i;
                var src1 = src.replace("{frame}", inc);
                var list = '<li style="width:' + width + '; height:' + height + ';"><img src="' + src1 + '" /></li>';
                jQuery(".ilmList").append(list);
            }
        }



        var frame = 0;


        var isPaused = false;
        var icons = settings.icons;
        var iconsPositions = settings.iconsPosition;



        var iconSetPosition = function (icons, iconsPositions, frame) {
            frame++;
            
            jQuery(icons).each(function (index, value) {
                jQuery(iconsPositions).each(function (pindex, pvalue) {
                    if (value.id == pvalue.imageid && frame == pvalue.frame && pvalue.display == true) {
                        console.log(frame);
                        var eleExist = jQuery('div.icon' + value.id);
                        if (eleExist.length) {
                            eleExist.remove();
                        }
                        var top = pvalue.top + '%';
                        var left = pvalue.left + '%';
                        var html = pvalue.html
                        var ele = '<div class="ilmicon icon' + value.id + '" style="position:absolute;top:' + top + ';left:' + left + '" data-html="'+html+'"><img src="' + value.path + '" /></div>';

                        jQuery('div.container').before(ele);
                        return false;
                    } else {
                        var eleExist = jQuery('div.icon' + value.id);
                        if (eleExist.length) {
                            eleExist.remove();
                        }
                    }
                });
            });
            
            jQuery('.ilmicon').on('click',function(){
                
            });


        };

        if (icons.length > 0) {
            iconSetPosition(icons, iconsPositions, frame);
        }

        setInterval(function () {
            if (!isPaused) {
                jQuery('.ilmList li').eq(frame).show().siblings().hide();
                iconSetPosition(icons, iconsPositions, frame);
                frame++;
                if (frame >= (settings.frames)) {
                    frame = 0;
                }
                
            }
        }, settings.speed);

        var dbClicked = false;
        jQuery(document).bind('mousemove', function (event) {
            if (screen && dbClicked === false) {
                event.preventDefault();
                drag = event.pageX;
                if (direction > drag) {
                    frame++;
                } else {
                    frame--;
                }

                if (frame >= (settings.frames)) {
                    frame = 0;
                } else if (frame <= 0) {
                    frame = (settings.frames - 1);
                }
                direction = drag;
                jQuery('.ilmList li').eq(frame).show().siblings().hide();
                iconSetPosition(icons, iconsPositions, frame);
            }
        });



        jQuery('.' + settings.play).on('click', function (e) {
            e.preventDefault();
            isPaused = false;
        });
        jQuery('.' + settings.pause).on('click', function (e) {
            e.preventDefault();
            isPaused = true;
        });
        jQuery('.' + settings.previous).on('click', function (e) {
            e.preventDefault();
            isPaused = true;
            frame--;
            if (frame >= (settings.frames)) {
                frame = 0;
            } else if (frame <= 0) {
                frame = (settings.frames - 1);
            }
            jQuery('.ilmList li').eq(frame).show().siblings().hide();
            iconSetPosition(icons, iconsPositions, frame);
        });
        jQuery('.' + settings.next).on('click', function (e) {
            e.preventDefault();
            isPaused = true;
            frame++;
            if (frame >= (settings.frames)) {
                frame = 0;
            } else if (frame <= 0) {
                frame = (settings.frames - 1);
            }
            jQuery('.ilmList li').eq(frame).show().siblings().hide();
            iconSetPosition(icons, iconsPositions, frame);
        });
        var screen = 0;
        var direction = 0;
        this.on('mousedown', function (event) {
            isPaused = true;
            screen = event.pageX;
            direction = event.pageX;
        });

        var getMousePosition = function ($this, event) {
            var
                    mouseLeft = event.pageX - $this.offset().left,
                    mouseTop = event.pageY - $this.offset().top;

            return {
                x: Math.floor(mouseLeft / $this.width() * 100) + '%',
                y: Math.floor(mouseTop / $this.height() * 100) + '%'
            }
        }

        var mouse = settings.mouse;
        var timer = settings.timer;
        var enableHandler = settings.enableHandler;
        var li = '';
        this.on('dblclick', function (event) {
            li = jQuery(this).find('ul.ilmList li:visible img');
            mouse = getMousePosition(jQuery(this), event);
            if (dbClicked === false) {
                dbClicked = true;
                li.css({
                    'transform-origin': mouse.x + mouse.y,
                    'transform': 'scale(' + settings.zoom + ')'
                });
                timer = setInterval(function () {
                    enableHandler = true;
                }, settings.rate);
            } else {
                dbClicked = false;
                li.removeAttr('style');
                clearInterval(timer);
            }
        });

        this.on('mousemove', function (event) {
            if (enableHandler && dbClicked) {
                mouse = getMousePosition(jQuery(this), event);

                li.css({
                    'transition': 'transform-origin ' + settings.transition.time + ' ' + settings.transition.type,
                    'transform-origin': mouse.x + mouse.y
                });

                enableHandler = false;
            }
        });

        this.on('DOMMouseScroll mousewheel', function (event) {
            if (dbClicked) {
                if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta / 120 <= 0) {
                    if (settings.zoom > settings.zoomMin) {
                        settings.zoom -= settings.step;
                    }
                } else {
                    if (settings.zoom < settings.zoomMax) {
                        settings.zoom += settings.step;
                    }
                }

                li.css('transform', 'scale(' + settings.zoom + ')');

                return false;
            } else {
                return true;
            }
        });

        var drag = 0;


        jQuery(document).bind('mouseup', function (event) {
            event.preventDefault();
            screen = 0;
        });

        jQuery(document).bind('mousewheel', function (event) {
            isPaused = true;               
            if (dbClicked === false) {
                event.preventDefault();
                if (event.originalEvent.wheelDelta / 50 > 0) {
                    frame++;
                } else {
                    frame--;
                }

                if (frame >= (settings.frames)) {
                    frame = 0;
                } else if (frame <= 0) {
                    frame = (settings.frames - 1);
                }
                jQuery('.ilmList li').eq(frame).show().siblings().hide();
                iconSetPosition(icons, iconsPositions, frame);
            }
            

        });

        // Greenify the collection based on the settings variable.
        return this.css({
            width: settings.width,
            height: settings.height,
            overflow: 'hidden'
        });

    };

}(jQuery));