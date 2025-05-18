import { ILanguage } from "./ILanguage";
import { Russian } from "./Russian";

export class TextService {
    private static russian = new Russian();

    private static currentLanguage = this.russian;

    public static GetStringValue<TLanguage extends ILanguage>(name: keyof TLanguage) {
        return this.currentLanguage[name.toString()];
    }
}