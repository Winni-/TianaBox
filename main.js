tianaBox = function() { 
    'use strict'
    //Tiana fancybox        
    var html =  "<div class='tianabox'>"+
                    "<div class='tbox-wrap'>"+ 
                        "<button class='close'>"+closeSVG+"</button>"+                           
                        "<div class='viewport-wrap'>"+
                            "<button class='prev'>"+prevSVG+"</button>"+
                            "<ul class='viewport'>"+
                                //"<li><img src='' alt=''></li>"+
                            "</ul>"+
                            "<button class='next'>"+nextSVG+"</button>"+
                        "</div>"+
                        "<div class='gallery'>"+   
                            "<div class='title'></div>"+
                            "<div class='share'>"+share+"</div>"+                             
                            "<button class='prev'>"+prevSVG+"</button>"+
                            "<div class='previews'>"+
                                "<ul class='list'>"+
                                    //"<li><a href=''></a></li>"+
                                "</ul>"+
                            "</div>"+
                            "<button class='next'>"+nextSVG+"</button>"+  
                        "</div>"+                            
                    "</div>"+
                "</div>";        
    
    $(".tbox, .fancybox").not(".slick-cloned").parent().each(function(index, parent) {
        
        var slides = [];
        var previews = [];
        var imgs = [];
        var prevs = [];//imgs of previews
        var tbox = $(html).appendTo("body");
        var start = $(parent).find(".tbox, .fancybox");
        var $title = tbox.find(".title");
        tbox.attr("id","tbox"+index); 
        $title.html($(parent).parents(".report-wrap").find("header").html());

        start.each(function(ind,element) {
            if (!$(element).is(".slick-cloned")) {
                imgs.push($(element).attr("href"));
                prevs.push($(element).find("img").attr("src"));                    
            };
            $(element).data({
                "slide": imgs.length,
                "tbox": "tbox"+index
            });                
        });      
        for (var img in imgs) {
            slides.push("<li><img src='"+imgs[img]+"' alt=''></li>");
            previews.push("<li><a href='"+img+"'><img src='"+prevs[img]+"' alt=''></a></li>");
        };  
        tbox.find(".viewport-wrap .viewport").append(slides);
        tbox.find(".gallery .list").append(previews);

        var mainSlider = tbox.find(".viewport").slick({//Инициализировать большой слайдер
            slide: "li",
            prevArrow: tbox.find(".viewport-wrap .prev"),
            nextArrow: tbox.find(".viewport-wrap .next")
        }); 
        tbox.find(".previews .list").slick({//Инициализировать слайдер превью
            slide: "li",
            slidesToShow: 6,
            prevArrow: tbox.find(".gallery .prev"),
            nextArrow: tbox.find(".gallery .next")
        });
        tbox.find(".gallery .list li").on("click", "a", function() {      
            event.preventDefault();    
            mainSlider.slickGoTo(+$(this).attr("href"));
        });
        tbox.hide();  
        tbox.find(".close").on("click",function() {
            tbox.hide();
        });
    });

    $(document).on("click", "a.fancybox, a.tbox",function() {
        event.preventDefault();
        var id = $(this).data("tbox");
        id = "#"+id;
        $(id).show()
        .find(".viewport").slickGoTo(+$(this).attr("index"));
        $(id).find(".previews .list").slickGoTo(+$(this).attr("index"));
    });
};