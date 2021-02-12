
public class SnekBody extends Entity {

	public SnekBody(int x, int y) {
		super(x, y);
		
	}

	@Override
	public void update() {
		positionX = Game.getInstance().snek.prevPositionX;
		positionY = Game.getInstance().snek.prevPositionY;
	}
	
	
}
