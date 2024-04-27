export class RegexConstants {
    public static onlyLetters = "^[a-zA-Z-]*$";
    public static onlyLettersAndNumbers = "^[a-zA-Z0-9]*$";
    public static email = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    public static phone ="^\\d{3}-\\d{3}-\\d{4}$";
}