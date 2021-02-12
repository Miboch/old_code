//----------------------------------------------------------------------------------------------------------------------
//------ System Classes ------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

function TPosition(aX, aY) {
    this.x = aX;
    this.y = aY;
}
//------ End of class TPosition ----------------------------------------------------------------------------------------

function TBoundsRectangle(aPos, aSpriteInfo) {
    const width = aSpriteInfo.w;
    const height = aSpriteInfo.h;
    this.left = this.top = this.right = this.bottom = 0;

    this.update = function (aPos) {
        this.left = aPos.x;
        this.top = aPos.y;
        this.right = aPos.x + width;
        this.bottom = aPos.y + height;
    };

    this.hitPos = function (aPos) {
        return !((aPos.x < this.left) || (aPos.y < this.top) || (aPos.x > this.right) || (aPos.y > this.bottom));
    };

    this.hitBounds = function (aBounds) {
        return !((aBounds.right < this.left) || (aBounds.bottom < this.top) || (aBounds.left > this.right) || (aBounds.top > this.bottom));
    };

    this.update(aPos);
}
//------ End of class TBoundsRectangle ---------------------------------------------------------------------------------
