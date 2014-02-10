var ply,
    flash = new Image("flash.png"),
    blade = new Image("blade.png"),
    blood = new Image("blood.png"),
    blades = [],
    PI = Math.PI,
    rand = Math.random,
    round = Math.round,
    sqrt = Math.sqrt,
    pow = Math.pow;


function draw(){
    window.requestAnimationFrame(draw);
    ctx.clearRect(0, 0, can.width, can.height);

    ply.render();

    if(!roll(30) && ply.live){
        blades.push(new Blade({
            x:roll(can.width), y:-25
        },{
            x:roll(4)-2, y:roll(4)+1
        }));
    }
    var b;
    for(var i=0;i<blades.length;++i){
        b = blades[i];
        b.render();
        if(dist(b.pos, ply.pos) <= 35) ply.live = false;
        if(b.pos.y > can.height) blades.splice(i--, 1);
    }

    ctx.drawImage(flash, 0, can.height-40);
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(20, can.height-20);
    ctx.lineTo(20, can.height-40);
    ctx.arc(20, can.height-20, 20, -PI/2, ((PI*2)*(ply.cldw/ply.clmx))-PI/2, false);
    ctx.lineTo(20, can.height-20);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
}

function restart(){
    ply = new Player();
}

function Player(){
    this.pos = {
        x: can.width/2<<0,
        y: can.height/2<<0
    };
    this.vit = 2;
    this.live = true;
    this.dir = 2;
    this.anim = 0;
    this.mv = false;
    this.cldw = 0;
    this.clmx = 300;
    this.img = new Image("perso.png");

    this.render = function(){
        if(this.cldw > 0) --this.cldw;
        if(this.mv && this.live) this.move(this.vit);
        if(this.live) ctx.drawImage(ply.img, this.getAnim()*32, this.dir*32, 32, 32, this.pos.x-16, this.pos.y-16, 32, 32);
        else ctx.drawImage(blood, this.pos.x-32, this.pos.y-32);
    };
    this.getAnim = function(){
        return 1;
    };
    this.move = function(v){
        this.anim++;
        switch(this.dir){
            case 0:
                this.pos.y-=v;
                break;
            case 1:
                this.pos.x+=v;
                break;
            case 2:
                this.pos.y+=v;
                break;
            case 3:
                this.pos.x-=v;
                break;
        }
        if(this.pos.x < 0) this.pos.x = 0;
        else if(this.pos.x > can.width-32) this.pos.x = can.width-32;
        else if(this.pos.y < 0) this.pos.y = 0;
        else if(this.pos.y > can.height-32) this.pos.y = can.height-32;
    };
    this.flash = function(){
        if(this.cldw <= 0 && this.live){
            this.anim = 0;
            this.cldw = this.clmx;
            this.move(60);
        }
    };
}
function Blade(pos, vit){
    this.pos = pos;
    this.vit = vit;
    this.rot = 0;

    this.render = function(){
        this.move();
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rot);
        ctx.drawImage(blade, -25, -25);
        ctx.restore();
    };
    this.move = function(){
        this.pos.x += this.vit.x;
        this.pos.y += this.vit.y;
        this.rot+=(this.vit.y/10);
    };
}

function Image(src){
    var i = document.createElement("img");
    i.src = src;
    return i;
}
function dist(from, to){
    return sqrt(sq(to.x-from.x)+sq(to.y-from.y));
}
function sq(x){
    return pow(x, 2);
}

function roll(max){
    return rand()*(max+1)<<0;
}

window.onkeydown = function(ev){
    key(ev.keyCode, 1);
};
window.onkeyup = function(ev){
    key(ev.keyCode, 0);
};
function key(code, down){
    switch(code){
        case 32:
            if(ply.live){
                if(down) ply.flash();
            }
            else restart();
            break;
        case 38:
            if(down){
                ply.mv = true;
                ply.dir = 0;
            }
            else if(ply.dir == 0){
                ply.mv = false;
                ply.anim = 0;
            }
            break;
        case 39:
            if(down){
                ply.mv = true;
                ply.dir = 1;
            }
            else if(ply.dir == 1){
                ply.mv = false;
                ply.anim = 0;
            }
            break;
        case 40:
            if(down){
                ply.mv = true;
                ply.dir = 2;
            }
            else if(ply.dir == 2){
                ply.mv = false;
                ply.anim = 0;
            }
            break;
        case 37:
            if(down){
                ply.mv = true;
                ply.dir = 3;
            }
            else if(ply.dir == 3){
                ply.mv = false;
                ply.anim = 0;
            }
            break;
    }
}