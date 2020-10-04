// Creating canvas
let mycanvas = document.querySelector('canvas');
//setting canvas height and width.
mycanvas.width = window.innerWidth;
mycanvas.height = window.innerHeight;


var c = mycanvas.getContext("2d");
var myReq;


setTimeout(()=>{
    cancelAnimationFrame(myReq);
    //window.removeEventListener()
}, 50000)


//oops 

var circleCount = 500;
var circleArray = [];
var colorArray = [
    'red',
    'blue',
    'orange',
    'green'
]

var mouseObj = {
    x : undefined,
    y : undefined
};

var minRadius = 5;
var maxRadius = 40;

window.addEventListener('mousemove', function(event){
    mouseObj.x = event.x;
    mouseObj.y = event.y;
});

window.addEventListener('resize', function(){
    onInit();
})

window.addEventListener('load', function(){
    onInit();
})

function Circle(x,y, dx, dy, radius, color){

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.miniRadius =  radius;
    this.color = color;

    this.draw = function(){
        //c.clearRect(0,0, window.innerWidth, window.innerHeight);
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
        c.strokeStyle = color;
        c.stroke();
        c.fillStyle = color;
        c.fill();
    }

    this.update = function(){
        if(this.x + this.radius > window.innerWidth || this.x + this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if(this.y + this.radius > window.innerHeight || this.y + this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        //intractive
        if(mouseObj.x - this.x < 50 && mouseObj.x - this.x > -50
            && mouseObj.y - this.y < 50 && mouseObj.y - this.y > -50){
                if(this.radius < maxRadius){
                    this.radius += 1;
                }
        }
        else if(this.radius > this.miniRadius) {
            this.radius -= 1;
        }

        this.draw();
    }

    this.genRandomColor = function(){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}


function onInit(){
    circleArray = [];
    for(let i = 0; i < circleCount; i++){
        let radius = Math.random() * 10 + 1;
        let x = Math.random() * (window.innerWidth - radius * 2) + radius;
        let y = Math.random() * (window.innerHeight - radius * 2) + radius;
        let dx = Math.random() - 0.5;
        let dy = Math.random() - 0.5;
        let color = colorArray[Math.floor(Math.random() * colorArray.length)]
        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }
}





function animate(){
    myReq = requestAnimationFrame(animate);
    c.clearRect(0,0, window.innerWidth, window.innerHeight);
     for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
     }
}

animate();

function genRandomColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}




