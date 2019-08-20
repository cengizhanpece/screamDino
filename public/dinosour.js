class Dinosour {
    constructor(img, x, y, ctx) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.started = false;
        this.width = 57;
        this.height = 60;
        this.frame = 1;
        this.jumping = false;
        this.jumpcount = 0;
        this.handler;
    }

    draw() {
        if(!this.started) this.ctx.drawImage(this.img, 0, 0, 57, 60, 0, 0, 57, 60);
        else {
            if (this.frame >= 6) this.frame = 1;
            else this.frame = this.frame + 1;
            let pos = this.frame * this.width;
            this.ctx.drawImage(this.img, pos, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }

    jump(){
        if(this.jumping) return;
        this.jumping = true;

        this.handler = setInterval(()=>{
            if(this.jumpcount < 10 ) this.y -= 10;
            else this.y += 10;
            this.jumpcount++;

            
            if (this.jumpcount == 20) {
                this.stopjump();
            }
        },25)

        
        
    }
    stopjump(){
        clearInterval(this.handler);
        this.jumpcount = 0;
        this.jumping = false;
    }
}