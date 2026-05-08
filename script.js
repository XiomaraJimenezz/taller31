/* Archivo JavaScript inicial */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const H = canvas.height;
function transformY(y){
    return H - y;
}