class Starship {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.cols=11;
        this.rows=8;
        this.direction=0;
        this.fieldsize = 4;
        this.fields = new Array(
            false, false, false, false, false, true , false, false, false, false, false, 
            false, false, false, false, true , true , true , false, false, false, false,
            false, false, false, false, true , true , true , false, false, false, false,
            false, false, true , true , true , true , true , true , true , false, false,   
            false, false, true , true , true , true , true , true , true , false, false,   
            true , true , true , true , true , true , true , true , true , true , true ,   
            true , true , true , true , true , true , true , true , true , true , true ,   
            true , true , true , true , true , true , true , true , true , true , true 
        );
    }

    show() {
        for(let i = 0; i < this.cols; i++) {
            for(let j = 0; j < this.rows; j++) {
                if(this.fields[j*this.cols+i]) {
                    rect((this.x-(this.cols*this.fieldsize/2) + (i*this.fieldsize)), (this.y-this.rows*this.fieldsize) + (j*this.fieldsize), this.fieldsize, this.fieldsize);
                }
            }
        }
    }

    update() {
        this.x += this.direction*this.fieldsize;
        if(this.x > width) {
            this.x=width;
        }
        if(this.x < 0) {
            this.x=0;
        }
    }

    move(direction) {
        this.direction = direction;
    }
}
