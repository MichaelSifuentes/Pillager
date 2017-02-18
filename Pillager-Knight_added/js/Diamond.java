import java.util.Arrays;
public class Diamond implements Comparable<Sifuentes_Diamond>{
	
	//make private global variables
	private String stockNumber;
	private String clarity;
	private char color;
	private String cut;
	
	//make constructor, pass variables as paramters, initizale variables
	public Diamond(String stockNumber, double carot, String clarity,
				char color, String cut) {
		super();
		this.stockNumber = stockNumber;
		this.carot = carot;
		this.clarity = clarity;
		this.color = color;
		this.cut = cut;
	}
	
	//make get methods that return variables
	public String getStockNumber(){
		return stockNumber;
	}
	
	public double getCarot(){
		return carot;
	}
	
	public String getClarity(){
		return clarity;
	}
	
	public char getColor(){
		return color;
	}
	
	public String getCut(){
		return cut;
	}
	
	//Prints out diamond information
	public String toString() {
		return "StockNumber: " + this.getStockNumber() +
				"\tCarot: " + this.getCarot() +
				"\tClarity: " + this.getClarity() +
				"\tColor: " + this.getColor() +
				"\tCut: " + this.getCut();
	}
	
	//compares diamonds
	public int compareTo(Sifuentes_Diamond diamond){
		if( this.getCarot()>dimaond.getCarot() )
			return -1;
	}
	
}