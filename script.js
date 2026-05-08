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
const lines = [
    {
        p1:{x:150,y:150},
        p2:{x:350,y:250},
        desc:"Caso 1"
    },
    {
        p1:{x:20,y:50},
        p2:{x:80,y:70},
        desc:"Caso 2"
    },
    {
        p1:{x:50,y:180},
        p2:{x:250,y:250},
        desc:"Caso 3"
    },
    {
        p1:{x:250,y:220},
        p2:{x:470,y:320},
        desc:"Caso 4"
    },
    {
        p1:{x:50,y:50},
        p2:{x:450,y:350},
        desc:"Caso 5"
    }
];
let currentScene = 0;
function nextScene(){
    currentScene =
        (currentScene + 1)
        % lines.length;
    render();
}
function prevScene(){
    currentScene =
        (currentScene - 1 + lines.length)
        % lines.length;
    render();
}
function changeScene(index){
    currentScene = index;
    render();
}
const INSIDE = 0;
const TOP = 1;
const BOTTOM = 2;
const RIGHT = 4;
const LEFT = 8;
function computeCode(x,y){
    let code = INSIDE;
    if(y > win.ymax){
        code |= TOP;
    }
    if(y < win.ymin){
        code |= BOTTOM;
    }
    if(x > win.xmax){
        code |= RIGHT;
    }
    if(x < win.xmin){
        code |= LEFT;
    }
    return code;
}
function cohenSutherland(x1,y1,x2,y2){
    let code1 = computeCode(x1,y1);
    let code2 = computeCode(x2,y2);
    let accept = false;
    while(true){
        if(!(code1 | code2)){
            accept = true;
            break;
        }
        else if(code1 & code2){
            break;
        }
        else{
            let codeOut =
                code1 ? code1 : code2;
            let x;
            let y;
            if((codeOut & TOP) && (y2 !== y1)){
                x = x1 + (x2 - x1) *
                (win.ymax - y1) /
                (y2 - y1);
                y = win.ymax;
            }
            else if((codeOut & BOTTOM) && (y2 !== y1)){
                x = x1 + (x2 - x1) *
                (win.ymin - y1) /
                (y2 - y1);
                y = win.ymin;
            }
            else if((codeOut & RIGHT) && (x2 !== x1)){
                y = y1 + (y2 - y1) *
                (win.xmax - x1) /
                (x2 - x1);
                x = win.xmax;
            }
            else if((codeOut & LEFT) && (x2 !== x1)){
                y = y1 + (y2 - y1) *
                (win.xmin - x1) /
                (x2 - x1);
                x = win.xmin;
            }
            if(codeOut === code1){
                x1 = x;
                y1 = y;
                code1 = computeCode(x1,y1);
            }
            else{
                x2 = x;
                y2 = y;
                code2 = computeCode(x2,y2);
            }
        }
    }
    if(accept){
        return{
            x1,
            y1,
            x2,
            y2
        };
    }
    return null;
}
function render(){
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    drawViewport();
    const line = lines[currentScene];
    drawLine(
        line.p1.x,
        line.p1.y,
        line.p2.x,
        line.p2.y,
        "#999"
    );
    const clipped =
        cohenSutherland(
            line.p1.x,
            line.p1.y,
            line.p2.x,
            line.p2.y
        );
    if(clipped){
        drawLine(
            clipped.x1,
            clipped.y1,
            clipped.x2,
            clipped.y2,
            "red"
        );
    }
}
render();
function updateWindow(){
    win.xmin = Number(
        document.getElementById("winXmin").value
    );
    win.ymin = Number(
        document.getElementById("winYmin").value
    );
    win.xmax = Number(
        document.getElementById("winXmax").value
    );
    win.ymax = Number(
        document.getElementById("winYmax").value
    );
    render();
}