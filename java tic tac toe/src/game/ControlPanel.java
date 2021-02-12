package game;

import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class ControlPanel extends JPanel implements ActionListener {
	
	int width, height;
	JButton nGameButton;
	BoardState state;
	JFrame parent;
	
	public ControlPanel(int width, int height, JFrame parent) {
		this.width = width;
		this.height = height;
		this.setPreferredSize(new Dimension(width,height));
		nGameButton = new JButton("New Game");
		this.add(nGameButton);
		state = new BoardState();
		this.parent = parent;
		nGameButton.addActionListener(this);
	}

	
	public void actionPerformed(ActionEvent arg0) {
		state.newGame();
		parent.repaint();
	}
	
	
}
