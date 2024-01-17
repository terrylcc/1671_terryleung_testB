import java.util.Scanner;

public class App {
  public static void main(String[] args) {
    String inputString = "";
    String outputString = "";

    // Read the input string
    System.out.print("Input: ");
    Scanner scanner = new Scanner(System.in);
    inputString = scanner.next();
    scanner.close();

    // Reverse the string
    for (int i = 0; i < inputString.length(); i++) {
      outputString = inputString.charAt(i) + outputString;
    }

    // Print the output string
    System.out.print("Output: ");
    System.out.println(outputString);
  }
}
