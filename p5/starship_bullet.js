class StarshipBullet {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.cols=2;
        this.rows=2;
        this.direction=0;
        this.fieldsize = 4;
        this.fields = new Array(
            true , true , true , true 
        );
    }

    show() {
        for(let i = 0; i < this.cols; i++) {
            for(let j = 0; j < this.rows; j++) {
                if(this.fields[j*this.cols+i]) {
                    fill(255,127,127)
                    rect((this.x-(this.cols*this.fieldsize/2) + (i*this.fieldsize)), (this.y-8*this.fieldsize) + (j*this.fieldsize), this.fieldsize, this.fieldsize);
                }
            }
        }
        fill(255);
    }

    update() {
        this.y -= this.fieldsize;
    }

    hit(alien) {
        // if( this.y <= alien.getY()+(alien.getHeight()) && 
        //                             (this.x >= alien.getX() && 
        //                             this.x <= alien.getX() + alien.getWidth())) {
        //     return true;
        // }

        for(let i=0; i<alien.fields.length; i++) {
            if( this.y <= alien.fields[i].y &&
                    (this.x >= alien.fields[i].x - this.fieldsize) &&
                    (this.x <= alien.fields[i].x + this.fieldsize) &&
                    alien.fields[i].visible ) {
                        return true;
            }
        }

        return false;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}
