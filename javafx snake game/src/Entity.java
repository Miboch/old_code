
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Paint;

public class Entity {

	int positionX, positionY;
	Paint entityColour;
	EntityDirection direction;

	
	
	public Entity(int x, int y) {
		this.positionX = x;
		this.positionY = y;
		direction = new EntityDirection();
	}

	public int getPositionX() {
		return positionX * Game.SEGMENT_SIZE;
	}

	public int getPositionY() {
		return positionY * Game.SEGMENT_SIZE;
	}

	public void setColour(Paint p) {
		this.entityColour = p;
	}

	public Paint getColour() {
		return entityColour;
	}
	
	
	public EntityDirection getDirection() {
		return this.direction;
	}
	
	public void renderEffects(GraphicsContext gc) {
		
	}
	
	public void update() {
		
	}
	
	public void debug() {
		System.out.println("ok");
	}
	

}
