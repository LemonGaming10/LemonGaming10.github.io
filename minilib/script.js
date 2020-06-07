var height = canvas.height;
var width = canvas.width;
function PVector(x, y) {
     this.x = x;
     this.y = y;
}
PVector.prototype.add = function(v) {
    this.x+= v.x;
    this.y+= v.y;
};
PVector.prototype.mult = function(v) {
     this.x = this.x*v;
     this.y= this.y*v;
};  
function random(min, max) {
     return Math.floor(Math.random() * (max - min) ) + min;
}
function dist(x1, y1, x2, y2) {
     return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}
