function randomColor(){
    var letters = '0123456789ABCDEF'.split('')
    var color = '#'
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)]
    }
    return color
}

function getDistance(x1, y1, x2, y2) {
    let dx = x2 - x1
    let dy = y2 - y1
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

function drawCircle(c, Circle) {
    c.beginPath()
    c.arc(Circle.x, Circle.y, Circle.rad, Circle.s_angle, Circle.e_angle, false)
    c.fillStyle = Circle.color
    c.fill()
    c.lineWidth = 4
    c.strokeStyle = "black"
    c.stroke();
}

function drawArrow(c, Arrow) {
    c.beginPath()
    c.lineWidth = 1
    c.moveTo(Arrow.x, Arrow.y)
    c.lineTo(Arrow.x - Arrow.len, Arrow.y)
    c.lineTo(Arrow.x - Arrow.len, Arrow.y - 10)
    c.lineTo(Arrow.x - (Arrow.len + 20), Arrow.y + 5)
    c.lineTo(Arrow.x - Arrow.len, Arrow.y + 15)
    c.lineTo(Arrow.x - Arrow.len, Arrow.y + 5)
    c.lineTo(Arrow.x, Arrow.y + 5)
    c.lineTo(Arrow.x, Arrow.y)
    c.fillStyle = 'black'
    c.fill()
    c.stroke()
}

function animate(event, c, Circle, Arrow1, stop, reset) {
    
    if(!stop){
        requestAnimationFrame(function(){
            animate(event, c, Circle, Arrow1, stop, reset)
        })
    }

    let hit_btn = event.target
    hit_btn.disabled = true
    reset.disabled = true

    let distance = getDistance(Circle.x, Circle.y, Arrow1.x, Arrow1.y)
    console.log(distance)

    if(distance > 242)
    {
        Arrow1.x = Arrow1.x - 2
        c.clearRect(0, 0, innerWidth, innerHeight)
        drawCircle(c, Circle)
        drawArrow(c, Arrow1)
    }
    if(distance <= 242)
    {
        stop = true
        reset.disabled = false
        Circle.color = randomColor()
        drawCircle(c, Circle)
    }

}

function resetCanvas(c, Circle, Arrow, hit){
    hit.disabled = false
    c.clearRect(0, 0, innerWidth, innerHeight)
    Circle.color = randomColor()
    drawCircle(c, Circle)
    drawArrow(c, Arrow)
}

window.onload = function () {
    const canvas = document.getElementById("myCanvas")

    canvas.width = window.innerWidth - 140
    canvas.height = window.innerHeight - 200

    var c = canvas.getContext("2d");
    var stop = false

    var color = randomColor()

    var Circle = {
        x: 200,
        y: canvas.height / 2,
        rad: 150,
        s_angle: 0,
        e_angle: 2 * Math.PI,
        color: color
    }

    var Arrow = {
        x: canvas.width - 100,
        y: canvas.height / 2,
        len: 70
    }

    drawCircle(c, Circle)
    drawArrow(c, Arrow)

    const hit = document.getElementById("hit")
    const reset = document.getElementById("reset")

    hit.addEventListener("click", () => {
        stop = false
        var Arrow1 = {...Arrow}
        animate(event, c, Circle, Arrow1, stop, reset)
    })
    
    reset.addEventListener("click", () => {
        resetCanvas(c, Circle, Arrow, hit)
    })
}