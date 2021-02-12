
public class EntityDirection {

	int directionX, directionY;
	
	// 0 = up, 1 = right, 2 = down, 3 = left 
	int curDir = 0;
	
	// initial direction towards the right.
	public EntityDirection() {

	}

	public void setLeft() {
		directionX = -1;
		directionY = 0;
		curDir = 3;
	}

	public void setRight() {
		directionX = 1;
		directionY = 0;
		curDir = 1;
	}

	public void setUp() {
		directionX = 0;
		directionY = -1;
		curDir = 0;
	}

	public void setDown() {
		directionX = 0;
		directionY = 1;
		curDir = 2;
	}
	
	public int getCurrentDirection() {
		return curDir;
	}

}
