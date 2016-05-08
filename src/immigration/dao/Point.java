package immigration.dao;

import javax.persistence.*;

@Embeddable
public class Point {
	double x;
	double y;
	
	public Point() {
		
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}
	
	
}
