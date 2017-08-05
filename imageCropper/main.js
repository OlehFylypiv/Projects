function getInputValueLocal() {
    
    console.log('Local img must be in put_here_img folder');
	
	var file = document.getElementById('sourseLocal').files[0];

	var canvas = document.getElementById('canvas');

	canvas.style.background = 'url(put_here_img/' + file.name + ') no-repeat';

	return  file.name;
}


function getInputValueRemote() {
	
    var file = document.getElementById('sourceRemote').value;
	
    var canvas = document.getElementById('canvas');

    var validURL = file.match(/^(http|https):/g);
	
    if (validURL == null) {
		alert('Enter a valid URL');
	}
	
	canvas.style.background = 'url(' + file + ') no-repeat';

	return file;  
}


function checkInput() {
	
    var checkLocal = document.getElementById('local-radio').checked;
	var checkRemote = document.getElementById('remote-radio').checked;
	
    if (checkLocal === false) {
		document.getElementById('div-local-img').style.display = 'none';	
	}

	if (checkLocal === true) {
		
        document.getElementById('div-local-img').style.display = 'block';
		document.getElementById('div-remote-img').style.display = 'none';	
		
        return 'local';
	}

	if (checkRemote === true) {
		document.getElementById('div-remote-img').style.display = 'block';
		
        return 'remote';  
	}

 	if (checkRemote === false) {
		document.getElementById('div-remote-img').style.display = 'none';
	}
}


function draw() {
	
	var canvas = document.getElementById('canvas2');
	var ctx = canvas.getContext('2d');

    var img = new Image ();
    
    if (checkInput() === 'local') {
    	
        img.src = 'put_here_img/' + getInputValueLocal();
    }
    else if (checkInput() === 'remote') {
    	
        img.src = getInputValueRemote();
    }
    
 	var obj = drawSquare();
    
    img.onload = function () {
    	ctx.drawImage(img, obj.X, obj.Y, obj.sWidth, obj.sHeight, 0, 0, obj.sWidth, obj.sHeight);
	}
}


var canvas, ctx, startX, endX, startY, endY;
var mouseIsDown = 0;


function init() {
    
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mousemove', mouseXY, false);
    canvas.addEventListener('mouseup', mouseUp, false);

    document.getElementById('crop-mode-img').style.background = 'url(on.png)';
}


function mouseUp(eve) {
    
    if (mouseIsDown !== 0) {
        
        mouseIsDown = 0;
       
        var pos = getMousePos(canvas, eve);
       
        endX = pos.x;
        endY = pos.y;
        
        drawSquare(); //update on mouse-up
    }
}


function mouseDown(eve) {
    
    mouseIsDown = 1;
    
    var pos = getMousePos(canvas, eve);
    
    startX = endX = pos.x;
    startY = endY = pos.y;
    
    drawSquare(); //update
}


function mouseXY(eve) {

    if (mouseIsDown !== 0) {
        
        var pos = getMousePos(canvas, eve);
        
        endX = pos.x;
        endY = pos.y;

        drawSquare();
    }
}

function drawSquare() {
    
    //creating a square
    var w = endX - startX;
    var h = endY - startY;
    
    var offsetX = (w < 0) ? w : 0;
    var offsetY = (h < 0) ? h : 0;
    
    var width = Math.abs(w);
    var height = Math.abs(h);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
               
    ctx.beginPath();
    ctx.rect(startX + offsetX, startY + offsetY, width, height);
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#d317ba';
    ctx.setLineDash([4, 2]);
    
    ctx.stroke();
    
    return {
    	
        X : startX,
    	Y :  startY,
    	
        sWidth : width,
    	sHeight : height
    };
}


function getMousePos(canvas, evt) {
   
    var rect = canvas.getBoundingClientRect();
    
    return {
        
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


function replace() {
	
    checkBrowser();
    
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    newImage.src = document.getElementById('canvas2').toDataURL('image/png');
  	
    ctx.drawImage(newImage, 0, 0);
}


function save() {
    
    checkBrowser();
    
    var canvas = document.getElementById('canvas2');
    var a = document.getElementById('save_as');
  
    var dt = canvas.toDataURL('image/png');
    dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

    a.href = dt;
}

function checkBrowser() {
    
    var browser = navigator.userAgent;
        
    if (browser.search(/Chrome/) > -1) {
        alert("Save As and Replace don't work in Chrome");
    }
}