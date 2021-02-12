import javafx.event.EventHandler;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;

public class KeyboardInput implements EventHandler<KeyEvent> {

	@Override
	public void handle(KeyEvent event) {
		if(event.getCode().equals(KeyCode.W))
			Game.snek.getDirection().setUp();
		if(event.getCode().equals(KeyCode.S))
			Game.snek.getDirection().setDown();
		if(event.getCode().equals(KeyCode.A))
			Game.snek.direction.setLeft();
		if(event.getCode().equals(KeyCode.D))
			Game.snek.direction.setRight();
		
		if(event.getCode().equals(KeyCode.SPACE)) {
			Game.getInstance().debug();
		}

		
		
		event.consume();
	}

}
