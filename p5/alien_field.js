class AlienField {
    constructor(x, y, color, visible) {
        this.x=x;
        this.y=y;
        this.color=color;
        this.visible=visible;
        this.fieldsize=4;
    }

    update(x,y) {
        this.x=x;
        this.y=y;
    }

    show() {
        if(this.visible) {
            fill(this.color);
            rect(this.x, this.y, this.fieldsize, this.fieldsize);
            fill(255);
        }
    }
}
