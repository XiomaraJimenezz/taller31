/* Archivo JavaScript inicial */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const H = canvas.height;
function transformY(y){
    return H - y;
}
function drawLine(x1,y1,x2,y2,color){
    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = Math.max(
        Math.abs(dx),
        Math.abs(dy)
    );
    let xIncrement = dx / steps;
    let yIncrement = dy / steps;
    let x = x1;
    let y = y1;
    ctx.fillStyle = color;
    for(let i=0; i<=steps; i++){
        ctx.fillRect(
            Math.round(x),
            Math.round(transformY(y)),
            2,
            2
        );
        x += xIncrement;
        y += yIncrement;
    }
}
let win = {
    xmin: 100,
    ymin: 100,
    xmax: 400,
    ymax: 300
};
function drawViewport(){
    drawLine(
        win.xmin,
        win.ymin,
        win.xmax,
        win.ymin,
        "blue"
    );
    drawLine(
        win.xmax,
        win.ymin,
        win.xmax,
        win.ymax,
        "blue"
    );
    drawLine(
        win.xmax,
        win.ymax,
        win.xmin,
        win.ymax,
        "blue"
    );
    drawLine(
        win.xmin,
        win.ymax,
        win.xmin,
        win.ymin,
        "blue"
    );
}