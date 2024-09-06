var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var isDrawing = false;
var startX, startY;
var circles = []; 
canvas.addEventListener('mousedown', function(event) {
    isDrawing = true;
    startX = event.clientX - canvas.offsetLeft;
    startY = event.clientY - canvas.offsetTop;
});

canvas.addEventListener('mousemove', function(event) {
    if (isDrawing) {
        var x = event.clientX - canvas.offsetLeft;
        var y = event.clientY - canvas.offsetTop;

        var radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redrawCircles(); 

        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = getRandomColor();
        ctx.fill();
    }
});

canvas.addEventListener('mouseup', function(event) {
    if (isDrawing) {
        var x = event.clientX - canvas.offsetLeft;
        var y = event.clientY - canvas.offsetTop;

        var radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        circles.push({ x: startX, y: startY, radius: radius, color: ctx.fillStyle });
        isDrawing = false;
    }
});

canvas.addEventListener('dblclick', function(event) {
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;

  
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        var distance = Math.sqrt(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2));
        if (distance <= circle.radius) {
            circles.splice(i, 1); 
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            redrawCircles();
            break;
        }
    }
});

canvas.addEventListener('click', function(event) {
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;

    var hit = false;
    ctx.getImageData(x, y, 1, 1).data[3] !== 0 && (hit = true);
    document.getElementById('hitOrMiss').textContent = hit ? 'Hit' : 'Miss';
});

document.getElementById('resetButton').addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles = []; 
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function redrawCircles() {
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = circle.color;
        ctx.fill();
    }
}
