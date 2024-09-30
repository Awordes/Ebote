import { ILanguage } from "./ILanguage";
import { English } from "./Languages/English";
import { Russian } from "./Languages/Russian";

export class TextService {
    private static russian = new Russian();
    private static english = new English();

    private static currentLanguage = this.russian;

    public static GetStringValue<TLanguage extends ILanguage>(name: keyof TLanguage) {
        return this.currentLanguage[name.toString()];
    }
}