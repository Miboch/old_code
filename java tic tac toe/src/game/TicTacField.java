package game;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.JPanel;

public class TicTacField extends JPanel {
	int width, height, cellSize;

	BufferedImage xGraphic;
	BufferedImage oGraphic;
	BoardState state;

	public TicTacField(int width, int height, int cellSize) {
		this.width = width;
		this.height = height;
		this.cellSize = cellSize;
		state = new BoardState();
		loadImages();
		repaint();
	}

	private void loadImages() {
		try {
			xGraphic = ImageIO.read(new File("tictac_x.png"));
			oGraphic = ImageIO.read(new File("tictac_o.png"));
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public void paintComponent(Graphics g) {
		drawBackground(g);
		drawShapes(g);
	}

	public void drawBackground(Graphics g) {
		g.setColor(Color.DARK_GRAY);
		g.fillRect(0, 0, width, height);
		g.setColor(Color.BLACK);
		for (int i = 0; i < 3; i++) {
			for (int j = 0; j < 3; j++) {
				g.drawRect(j * cellSize, i * cellSize, cellSize, cellSize);
			}
		}
	}

	public void drawShapes(Graphics g) {
		for (int i = 0; i < BoardState.board.length; i++) {
			for (int j = 0; j < BoardState.board[i].length; j++) {
				if (state.getStateOfField(j, i) == 1)
					g.drawImage(xGraphic, j * cellSize, i * cellSize, null);
				if (state.getStateOfField(j, i) == 2)
					g.drawImage(oGraphic, j * cellSize, i * cellSize, null);
				
			}
		}

	}

}
