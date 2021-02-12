package game;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JFrame;
import javax.swing.JOptionPane;

public class TicTacBoard extends JFrame {
	final int CELL_SIZE = 150;
	final int WIDTH = CELL_SIZE * 3 + 20;
	final int HEIGHT = CELL_SIZE * 3 + 145;
	final String TITLE = "Tic Tac Toe";
	BoardState state;

	public TicTacBoard() {
		this.setTitle(TITLE);
		this.setPreferredSize(new Dimension(WIDTH, HEIGHT));
		this.setVisible(true);
		this.setLocationRelativeTo(null);
		this.setDefaultCloseOperation(EXIT_ON_CLOSE);
		this.add(new TicTacField(WIDTH, HEIGHT, CELL_SIZE), BorderLayout.CENTER);
		this.add(new ControlPanel(WIDTH, 100, this), BorderLayout.SOUTH);
		setMouseActions();
		this.pack();
		state = new BoardState();
	}

	private void setMouseActions() {
		this.addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				if (BoardState.gameOver)
					JOptionPane.showMessageDialog(null, "The game is over");
				else {
					if (state.getStateOfField(getX(e), getY(e)) == 0)
						state.turn++;
					System.out.println("turn is: " + state.turn);
					if (state.turn % 2 == 0)
						state.setNewState(getX(e), getY(e), 2);
					else
						state.setNewState(getX(e), getY(e), 1);
					repaint();
					state.victoryCheck(getX(e), getY(e));
				}
			}

			private int getX(MouseEvent e) {
				return (e.getX() - 10) / CELL_SIZE;
			}

			private int getY(MouseEvent e) {
				return (e.getY() - 30) / CELL_SIZE;
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseExited(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mousePressed(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseReleased(MouseEvent e) {
				// TODO Auto-generated method stub

			}

		});
	}

}
