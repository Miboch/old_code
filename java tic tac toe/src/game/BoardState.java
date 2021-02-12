package game;

import javax.swing.JOptionPane;

public class BoardState {

	/**
	 * 0 = free, 1 = X, 2 = O
	 */
	static int[][] board = new int[][] { { 0, 0, 0 }, { 0, 0, 0 }, { 0, 0, 0 } };
	static int turn = 0;
	static boolean gameOver;

	public int getStateOfField(int x, int y) {
		if (x > board.length - 1)
			return -1;
		if (y > board[x].length - 1)
			return -1;
		return board[y][x];
	}

	public void setNewState(int x, int y, int newState) {
		if (getStateOfField(x, y) != 0)
			return;
		board[y][x] = newState;
	}

	public void victoryCheck(int x, int y) {
		int clickState = getStateOfField(x, y);
		// columns
		for (int i = 0; i < board[y].length; i++) {
			if (board[y][i] != clickState)
				break;
			if (i == board[y].length - 1)
				showWinner();
		}
		// rows
		for (int i = 0; i < board.length; i++) {
			if (board[i][x] != clickState)
				break;
			if (i == board[i].length - 1)
				showWinner();
		}
		// diagonal
		for (int i = 0; i < board.length; i++) {
			if (board[i][i] != clickState)
				break;
			if (i == board.length - 1)
				showWinner();
		}

		// other diagonal
		if (x + y == 2) {
			for (int i = 0; i < 3; i++) {
				if (board[i][2 - i] != clickState)
					break;
				if (i == 2) {
					showWinner();
				}
			}
		}

		// draw
		if (turn == 9 && !gameOver) {
			showMessage("It's a Draw");
			gameOver = true;
		}

	}

	public void showWinner() {
		if (turn % 2 == 1)
			showMessage("X wins");
		else
			showMessage("O wins");
		gameOver = true;
	}

	public void showMessage(String message) {
		JOptionPane.showMessageDialog(null, message);
	}

	public void newGame() {
		board = new int[][] { { 0, 0, 0 }, { 0, 0, 0 }, { 0, 0, 0 } };
		turn = 0;
		gameOver = false;
	}

}
