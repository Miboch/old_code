import java.util.ArrayList;

import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Paint;
import javafx.stage.Stage;
import javafx.util.Duration;

public class Game extends Application {

	boolean running;

	static final int WIDTH = 400;
	static final int HEIGHT = 400;
	static final int SEGMENT_SIZE = 20;
	static final double GAME_SPEED = 0.16;
	static KeyboardInput input;
	ArrayList<Entity> entities;
	static int score = 0;
	public static Game instance;
	
	
	// scene stuff
	static Stage stage;
	static Group root;
	static Canvas canvas;
	static Scene scene;

	// colours
	static Paint backgroundColour = Paint.valueOf("794c13");
	static Paint snekColour = Paint.valueOf("B3C95A");

	// special Entities
	static Snek snek;
	
	public Game() {
		input = new KeyboardInput();
		snek = new Snek(10,12);
		
		snek.setColour(snekColour);
	}

	public void initialize() {
		launch();
	}
	
	public void updateScore() {
		this.score += snek.snekBody.size();
		stage.setTitle("SNEK GAME - " + score);
	}
	
	public static Game getInstance() {
		if(instance == null)
			instance = new Game();
		return instance;
	}
	

	public void start(Stage arg0) throws Exception {
		stage = new Stage();
		stage.setTitle("SNEK GAME - " + score);
		root = new Group();
		canvas = new Canvas(WIDTH, HEIGHT);
		root.getChildren().add(canvas);
		scene = new Scene(root);

		stage.setScene(scene);
		stage.show();
		entities = new ArrayList<Entity>();
		entities.add(new Bug(1,2));
		//entities.add(new Bug(5,2));
		canvas.requestFocus();
		canvas.setOnKeyPressed(input);
		
		Timeline loop = new Timeline();
		loop.setCycleCount(Timeline.INDEFINITE);
		KeyFrame k = new KeyFrame(Duration.seconds(GAME_SPEED), new EventHandler<ActionEvent>() {

			public void handle(ActionEvent arg0) {
				update();
				render();
			}	
		});
		
        loop.getKeyFrames().add(k);
        loop.play();
		
	}

	public void render() {
		GraphicsContext gc = canvas.getGraphicsContext2D();
		gc.clearRect(0, 0, WIDTH, HEIGHT);
		renderTiles(gc);
		renderEntities(gc);
		renderSnekBody(gc);
		renderSnek(gc);
	}

	public void renderTiles(GraphicsContext gc) {
		gc.setFill(Paint.valueOf("794c13"));

		// rows
		for (int i = 0; i < HEIGHT / SEGMENT_SIZE; i++) {
			// columns
			for (int j = 0; j < WIDTH / SEGMENT_SIZE; j++) {
				gc.fillRect(j * SEGMENT_SIZE, i * SEGMENT_SIZE, SEGMENT_SIZE, SEGMENT_SIZE);
				gc.strokeRect(j * SEGMENT_SIZE, i * SEGMENT_SIZE, SEGMENT_SIZE, SEGMENT_SIZE);
			}
		}
	}

	private void renderEntities(GraphicsContext gc) {			
		for (Entity e : entities) {
			e.renderEffects(gc);
		}

	}
	
	private void renderSnek(GraphicsContext gc) {
		gc.setFill(snek.getColour());
		gc.fillRect(snek.getPositionX(), snek.getPositionY(), SEGMENT_SIZE, SEGMENT_SIZE);
		snek.renderEffects(gc);
	}
	
	
	private void renderSnekBody(GraphicsContext gc) {
		gc.setFill(snekColour);
		for(SnekBody sb : snek.snekBody) {
			gc.fillRect(sb.getPositionX(), sb.getPositionY(), SEGMENT_SIZE, SEGMENT_SIZE);
		}
		
	}

	public void update() {
		snek.update();
		updateEntities();
		
		
	}

	private void updateEntities() {
		for(Entity e : entities) {
			e.update();
		}
	}
	
	public void debug() {
		System.out.println(entities.size());
		for(int i = 0; i < entities.size(); i++) {
			entities.get(i).debug();
		}
	}
	

}
