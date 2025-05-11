import { Container, DOMContainer, Graphics } from "pixi.js";

export class InputField extends Container {
    public _fieldValue: string;
    public get fieldValue() : string {
        return this.inputElement.value;
    }

    public inputElement: HTMLInputElement;
    protected domContainer: DOMContainer;

    public static async Create(placeholder?: string): Promise<InputField> {
        let inputField = new InputField();

        inputField.inputElement = document.createElement('input');
        inputField.inputElement.placeholder = placeholder;
        inputField.inputElement.classList.add('input-field');

        let loginHtmlContainer = new DOMContainer({ element: inputField.inputElement });

        let border = new Graphics();
        border.rect(
            0,
            0,
            50,
            13
        );
        border.stroke({ width: 1, color: 0x000000 });
        border.alpha = 0;

        inputField.addChild(loginHtmlContainer);
        inputField.addChild(border);

        return inputField;
    }
}
