function clickItem() {
	$("div.square").click(function() {
		var isActive = $(this).hasClass("active")
		var slideShow = $("div.fotorama-container");
		$("div.square").removeClass("active");
		if (isActive) { //this doesn't work yet!
			//console.log("if")
			closeItems();
		} else {
			//console.log("else")
			$(this).addClass("active");
			var queryId = $(this).attr("query-id");
			construct(queryId);
			if (queryId == 1){
				$(this).removeClass("active");
				openVideos();
			} else if (queryId == 2) {
				loadContent(queryId)
				animateSlides("37.5%",0,0,0,queryId)
				slideShow.css({
					"left" : "25%"
				})
				moveLabel(0, 0)
			} else if (queryId == 3 || queryId == 4) {
				animateSlides(0,"37.5%",0,"-25%",queryId)
				loadContent(queryId)
				slideShow.css({
					"left" : "25%"
				})
				if (queryId == 3){
					moveLabel("50%", 0)
				} else {
					moveLabel(0, 0)
				}
			} else if (queryId == 5 || queryId == 6) {
				animateSlides(0,"37.5%",0,"-50%",queryId)
				loadContent(queryId)
				slideShow.css({
					"left" : "0"
				})
				if (queryId == 5){
					moveLabel("50%", "75%")
				} else {
					moveLabel(0, "75%")
				}
			} else if (queryId == 7) {
				animateSlides(0,0,"37.5%","-75%",queryId)
				loadContent(queryId)
				slideShow.css({
					"left" : "0"
				})
				moveLabel("50%", "75%")
			} else if (queryId == 8) {
				$(this).removeClass("active");
				openCloser();
			}
		}
	})
}

function construct(target) {
	for (var i = 0; i < projects.length; i++) {
		if (projects[i].id == target) {
			$("h1.pullout").html(projects[i].title);
			$("p#user").html(projects[i].users)
			$("p#role").html(projects[i].role)
		}
	};
}

function moveLabel (top, left) {
	$("div.project-info").css({
		"top" : top,
		"left" : left,
	})
}

function loadContent(story) {
	//$("div.content-container").empty();
	var contentArray = []
	for (var i = 0; i < projects.length; i++) {
		if (projects[i].id == story) {
			for (var j = 0; j < projects[i].slides.length; j++) {
				contentArray.push({html: '<img class="content" src="media/' + projects[i].slides[j] + '.jpg">'})
			}
		}
	};

	fotorama.load(contentArray);

}

function animateSlides(a,b,c,d,e) {
	$("div#one").animate({
		"width":a
	})
	$("div#two").animate({
		"width":b
	})
	$("div#three").animate({
		"width":c
	})
	$("div.wrapper").animate({
		"margin-left" : d
	})

	for (var i = 1; i < $("div.square").length+1; i++) {
		if (e == i && i <= ($("div.square").length/2)) {
			if (i % 2 == 0) {
				$( "[query-id="+ (i-1) +"]" ).animate({
					"margin-left": "-99%",
				})
			} else {
				$( "[query-id="+ (i+1) +"]" ).animate({
					"margin-left": "-99%",
				})
			}
		} else if (e == i && i > ($("div.square").length/2)) {
			if (i % 2 == 0) {
				$( "[query-id="+ (i-1) +"]" ).animate({
					"margin-left": "99%",
				})
			} else {
				$( "[query-id="+ (i+1) +"]" ).animate({
					"margin-left": "99%",
				})
			}
		}
	};
}

function closeItems() {
		$("div#one").animate({
			"width":"0"
		})
		$("div#two").animate({
			"width":"0"
		})
		$("div#three").animate({
			"width":"0"
		})
		$("div.wrapper").animate({
			"margin-left" : "0"
		})
		$("div.square").animate({
			"margin-left" : "0"
		})
		$("div.square").removeClass("active");

		fotorama.show({
			index: 0,
		});
}

$("div.content-container").click(function() {
	closeItems();
});

//video stuff

function closeVideos() {
	$("div.video-container").animate({
		"top" : "-100%",
		"z-index" : "0",
	})
}

function closeCloser() {
	$("div.closer-container").animate({
		"top" : "100%",
		"z-index" : "0",
	})
}

function openVideos() {
	$("div.video-container").css({
		"z-index" : "1",
	})
	$("div.video-container").animate({
		"top" : "0",
	})
}

function openCloser() {
	$("div.closer-container").css({
		"z-index" : "1",
	})
	$("div.closer-container").animate({
		"top" : "0",
	})
}

//vertical align content

function verticalAlign() {
	var windowHeight = $(window).height();
	var contentHeight = $("div.content-wrapper").height();
	var buffer = (windowHeight-contentHeight)/2;

	$("div.buffer").height(buffer);
}

function verticalAlignVideos() {
	var windowHeight = $(window).height();
	var videoHeight = $("div.video").height();
	var videoBuffer = (windowHeight-videoHeight)/2;
	console.log(videoBuffer)

	$("div.videoBuffer").height(videoBuffer);
}

//video player
var videos = ["intro", "users", "experience", "story", "inform"];
var active = 0;

var vid;

function forwardVideo () {
	if (active == videos.length-1) {
		console.log("loop")
		active = 0;
	} else {
		console.log("next")
		active ++;
	}
	loadVideo();
}

function backVideo () {
	if (active == 0) {
		console.log("loop")
		active = videos.length-1;
	} else {
		console.log("back")
		active --;
	}
	loadVideo();
}

function loadVideo(){
	var loadedHTML = '<video class="main" autoplay><source src="videos/' + videos[active] + '.mp4" type="video/mp4"></video>'
	$("div.video").html(loadedHTML)
}

var playing = false;

function playPause() {
	var vid = $("video.main").get(0);
	if (!playing){
		vid.play();
		playing = true;
	} else {
		vid.pause();
		playing = false;
	}
}

//check key presses
document.onkeydown = checkKey;

function checkKey(e) {
	//vid = $("video#myVideo").get(0)

    e = e || window.event;

    if (e.keyCode == '37') {
       // left arrow
       backVideo();
       playing = true;
    } else if (e.keyCode == '39') {
       // right arrow
       forwardVideo();
       playing = true;
    } else if (e.keyCode == '38') {
    	//up arrow
    	closeVideos();
    } else if (e.keyCode == '40') {
    	//down arrow
    	closeCloser();
    } else if (e.keyCode == "32") {
    	//space bar
    	playPause();
    }

}

//make fotorama object
var fotorama;

$(function () {
    // 1. Initialize fotorama manually.
    var $fotoramaDiv = $('.fotorama').fotorama();

    // 2. Get the API object.
    fotorama = $fotoramaDiv.data('fotorama');

    // 3. Inspect it in console.
    //console.log(fotorama);
    
});

clickItem();
//closeVideos();
verticalAlign();
//verticalAlignVideos();
$("div#close-closer").click(function(){
	closeCloser();
});
$("div#video-closer").click(function(){
	closeVideos();
});

$(window).load(function(){
	verticalAlignVideos()
})