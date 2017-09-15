poscenter = 0;
totalwidth= $("body").innerWidth();
defaultCenterColor = "rgba(215, 215, 215)";
defaultCenterFontColor = "rgb(25,25,25)";
center = $('#center');
img1 = $('#img1');
img2 = $('#img2');
red = 'rgb(169, 31, 31)';
green = 'green';
function init(){//INITIALISATION
	//TITRE
	title = $('#title');
	Justify(title);
	title.css('display','inherit');

	//center
	center.css('transition','1s');
	center.draggable({ axis: "x" });
	center.mousemove(function(){

		poscenter=center.position().left+0.5*totalwidth;
		update();
	});

	center.mousemove(function(){
		update();
	});
	center.mousedown(function(){
		center.css('transition','background-color 0.5s');
	});

	center.mouseup(function(){
		checkPos();
	});

	//buttons-----------------------------------
	$('#redbtn').click(function(){
		center.css('transition','0.5s');
		center.css('left',totalwidth*-0.1);
		center.css('background-color',red);
		center.css('color','white');
		setTimeout(checkPos,500);
	});

	$('#midlbtn').click(function(){
		center.css('transition','0.5s');
		center.css('left',totalwidth*-0.1);
		center.css('background-color',red);
		setTimeout(checkPos,500);
	});

	$('#greenbtn').click(function(){
		center.css('transition','0.5s');
		center.css('left',totalwidth*0.1);
		center.css('background-color',green);
		center.css('color','white');
		setTimeout(checkPos,500);
	});

	//images------------------------------------
	$('#mapbtn').click(function(){
		img2.css('transform','skewX(80deg)');
		$('#wrapper2').css('transform','skewX(-80deg)');

		$('#mapbtn').css('background-color','rgb(93, 93, 93)');
		$('#airbtn').css('background-color','#8f8f8f');
		setTimeout(function () {
			img2.css('marginTop','50%');
		},500);
	});
	$('#airbtn').click(function(){
			img2.css('marginTop','0');
			$('#airbtn').css('background-color','rgb(93, 93, 93)');
			$('#mapbtn').css('background-color','#8f8f8f');
			setTimeout(function () {
				$('#wrapper2').css('transform','none');
				img2.css('transform','none');
			}, 500);
	});

}

function checkPos(){
	poscenter=$('#center').position().left+0.5*totalwidth;
	center.css('transition','1.5s');
	NeedReset = true;

	if(poscenter>0.55*totalwidth){
		center.css('left',2*totalwidth);
	}else if (poscenter<0.45*totalwidth) {
		center.css('left',-2*totalwidth);
	}else {
		center.css('left','0');
		NeedReset = false;
	}
	center.css('background-color',defaultCenterColor);
	if (NeedReset) {
		setTimeout(reset, 500);
	}
	update();
}

//reset----------------------------------------------------------------------------------------------------------------------------------
function reset(){
	center.css('transition','0s');
	center.css('left','0');
	center.css('opacity','0');
	$('#mapbtn').css('background-color','#8f8f8f');
	$('#airbtn').css('background-color','#8f8f8f');

	img2.css('transition','0');
	$('#wrapper2').css('transition','0');

	img2.css('marginTop','0');
	$('#wrapper2').css('transform','skewX(-55.98deg)');
	img2.css('transform','skewX(55.98deg)');

	img2.css('transition','1s');
	$('#wrapper2').css('transition','1s');

	//NEW DATAs

	color = getRandomColor()
	$('#title').css('background-color',color);  //random color changing for each new place
	//$('#title').css('color',invertColor(color));  //random color changing for each new place
	setTimeout(resetDisplay, 400);


}

function resetDisplay(){
	center.css('transition','1.5s');
	center.css('opacity','1');
}
//update---------------------------------------------------------------------------------------------------------------------------------
function update(){
	poscenter=$('#center').position().left+0.5*totalwidth;
	$('#position').html("x:"+poscenter+"|total width screen="+ $("body").innerWidth());
	if(poscenter>0.55*totalwidth){
		center.css('background-color','green');
		center.css('color','white');
	}else if (poscenter<0.45*totalwidth) {
		center.css('background-color',red);
		center.css('color','white');
	}else {
		center.css('background-color',defaultCenterColor);
		center.css('color',defaultCenterFontColor);
	}
	setTimeout(update, 500);
}

//OUTILS---------------------------------------------------------------------------------------------------------------------------------

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function SplitText(node)
{

    var text = node.nodeValue.replace(/^\s*|\s(?=\s)|\s*$/g, "");

    for(var i = 0; i < text.length; i++)
    {
        var letter = document.createElement("span");
        letter.style.display = "inline-block";
        letter.style.position = "absolute";
        letter.appendChild(document.createTextNode(text.charAt(i)));
        node.parentNode.insertBefore(letter, node);

        var positionRatio = i / (text.length - 1);
        var textWidth = letter.clientWidth;

        var indent = 100 * positionRatio;
        var offset = -textWidth * positionRatio;
        letter.style.left = indent + "%";
        letter.style.marginLeft = offset + "px";

        //console.log("Letter ", text[i], ", Index ", i, ", Width ", textWidth, ", Indent ", indent, ", Offset ", offset);
    }

    node.parentNode.removeChild(node);
}

function Justify()
{

    var TEXT_NODE = 3;
    var elem = document.getElementById("title");
    elem = elem.firstChild;

    while(elem)
    {
        var nextElem = elem.nextSibling;

        if(elem.nodeType == TEXT_NODE)
            SplitText(elem);

        elem = nextElem;
    }
}
