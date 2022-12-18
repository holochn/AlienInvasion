class Alien {
    constructor(x, y, figure, color) {
        this.x=x;
        this.y=y;
        this.cols=11;
        this.rows=8;
        this.fields = [];
        this.fieldsize = 4;
        this.direction=1;
        this.color=color;

        for(let i=0; i < this.cols; i++) {
            for(let j=0; j < this.rows; j++ ) {
                var f = new AlienField(this.x + i*this.fieldsize, 
                    this.y + j*this.fieldsize, 
                    this.color, 
                    figure[j*this.cols+i]);
                this.fields.push( f );
            }
        }
    }

    show() {
        for(let i = 0; i < this.fields.length; i++) {
              this.fields[i].show();
        }
    }

    accelerate(acc) {
        if(this.direction>0) {
            this.direction = acc;
        } else {
            this.direction = acc * -1;
        }
    }

    update() {
        this.x += this.direction;
        if(this.x + this.getWidth() >= width || this.x <= 0) {
            this.y += this.getHeight();
            this.direction *= -1;
        }
        for(let i=0; i < this.cols; i++) {
            for(let j=0; j < this.rows; j++ ) {
                this.fields[j + i*this.rows].update( this.x + i*this.fieldsize, this.y + j*this.fieldsize);
            }
        }
    }

    existing(){
        var existing = false;
        for(let i=0; i < this.fields.length; i++) {
            existing |= this.fields[i].visible;
        }
        return existing;
    }

    explode(bullet) {
        for(let i=this.fields.length-1; i>=0; i--) {
            if(this.fields[i].visible == true) {
                if(this.fields[i].y <= bullet.getY() && 
                    (this.fields[i].x >= bullet.getX()-4 && 
                    this.fields[i].x <= bullet.getX() + 4)  ) {
                       this.fields[i].visible = false;
                }
            }
        }
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getWidth() {
        return this.cols*this.fieldsize;
    }

    getHeight() {
        return this.rows*this.fieldsize;
    }
}