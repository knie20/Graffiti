export class ThemesList {
    public theme1: string = "OG";
    public theme2: string = "Retro";
    public theme3: string = "Dark";
    public theme4: string = "Light";
    public theme5: string = "Big Yikes";

    toString(): String {
        return "theme1: " + this.theme1 + "\n" +
            "theme2: " + this.theme2 + "\n" +
            "theme3: " + this.theme3 + "\n" +
            "theme4: " + this.theme4 + "\n" +
            "theme5: " + this.theme5;
    }
}