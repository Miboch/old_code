import java.util.Random;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.Image;
import javafx.scene.paint.Paint;

public class Bug extends Entity {

	Image bugImage;
	Random rand;

	public Bug(int x, int y) {
		super(x, y);
		bugImage = new Image("file:bug1.png");
		rand = new Random();
		rand.setSeed(System.nanoTime());
	}

	@Override
	public void renderEffects(GraphicsContext gc) {
		gc.setFill(Paint.valueOf("ffcc00"));
		gc.drawImage(bugImage, positionX * Game.SEGMENT_SIZE, positionY * Game.SEGMENT_SIZE);
	}

	@Override
	public void update() {
		if (positionX == Game.getInstance().snek.positionX && positionY == Game.getInstance().snek.positionY) {
			setNewPosition();
			Game.getInstance().snek.addToBody();
			Game.getInstance().updateScore();
		}

	}

	public void setNewPosition() {
		this.positionX = rand.nextInt(Game.getInstance().WIDTH / Game.getInstance().SEGMENT_SIZE);
		this.positionY = rand.nextInt(Game.getInstance().HEIGHT / Game.getInstance().SEGMENT_SIZE);
		System.out.println("nom nom");
	}

	@Override
	public void debug() {
		
		this.setNewPosition();
	}
	
}
