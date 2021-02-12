import java.util.ArrayList;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Paint;

public class Snek extends Entity {

	ArrayList<SnekBody> snekBody;
	public int prevPositionX = 0;
	public int prevPositionY = 0;
	Paint snekEyes = Paint.valueOf("CC1100");
	
	public Snek(int x, int y) {
		super(x, y);
		direction.setRight();
		snekBody = new ArrayList<SnekBody>();
		snekBody.add(new SnekBody(x-1,y-1));
		snekBody.add(new SnekBody(x-2,y-2));
	}


	@Override
	public void renderEffects(GraphicsContext gc) {
		gc.setFill(snekEyes);
		switch (direction.curDir) {
		case 0:
			gc.fillOval((positionX * Game.SEGMENT_SIZE) + 3, (positionY * Game.SEGMENT_SIZE) + 3, 5, 5);
			gc.fillOval((positionX * Game.SEGMENT_SIZE) + 12, (positionY * Game.SEGMENT_SIZE) + 3, 5, 5);
			break;
		case 2:
			gc.fillOval((positionX * Game.SEGMENT_SIZE) + 3, (positionY * Game.SEGMENT_SIZE) + 12, 5, 5);
			gc.fillOval((positionX * Game.SEGMENT_SIZE) + 12, (positionY * Game.SEGMENT_SIZE) + 12, 5, 5);
			break;
		case 3:
			gc.fillOval((positionX * Game.SEGMENT_SIZE) + 3, (positionY * Game.SEGMENT_SIZE) + 3, 5, 5);
			gc.fillOval((positionX * Game.SEGMENT_SIZE) + 3, (positionY * Game.SEGMENT_SIZE) + 12, 5, 5);
			break;
		case 1:
			gc.fillOval((positionX * Game.SEGMENT_SIZE) + 12, (positionY * Game.SEGMENT_SIZE) + 3, 5, 5);
			gc.fillOval((positionX * Game.SEGMENT_SIZE) + 12, (positionY * Game.SEGMENT_SIZE) + 12, 5, 5);
			break;
		default:
			break;

		}
	}
	
	@Override
	public void update() {
		prevPositionX = positionX;
		prevPositionY = positionY;
		this.positionX += this.direction.directionX;
		this.positionY += this.direction.directionY;
		
		if(this.positionX < 0)
			this.positionX = (Game.getInstance().WIDTH / Game.getInstance().SEGMENT_SIZE) - 1;
		if(this.positionX >= Game.getInstance().WIDTH / Game.getInstance().SEGMENT_SIZE)
			this.positionX = 0;
		if(this.positionY < 0)
			this.positionY = Game.getInstance().HEIGHT / Game.getInstance().SEGMENT_SIZE - 1;
		if(this.positionY >= Game.getInstance().HEIGHT / Game.getInstance().SEGMENT_SIZE)
			this.positionY = 0;
		
		SnekBody update = snekBody.remove(snekBody.size()-1);
		update.update();
		snekBody.add(0, update);
		
		
	}

	public void addToBody() {
		snekBody.add(new SnekBody(positionX,positionY));
		
	}
	

}
