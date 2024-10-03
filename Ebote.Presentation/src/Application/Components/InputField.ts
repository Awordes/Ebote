import { ButtonOptions, FancyButton, } from "@pixi/ui";
import { Sprite, Text, Texture, Ticker } from "pixi.js";

export class InputField extends FancyButton {
    protected isPlaceholderVisible: boolean;
    protected placeholder: string;

    public fieldValue: string;

    protected innerText: Text;
    protected tick = 0;
    protected isInputFocus = false;
    protected isEditing = false;
    protected textCursor: Sprite;

    protected addKeyHandler = this.AddKey.bind(this);

    protected tickerHandler = (ticker: Ticker) => {
        this.tick += ticker.deltaTime * 0.05;

        if (this.tick < 1 && this.textCursor.alpha == 1)
            this.textCursor.alpha = 0;

        else if (this.tick > 1 && this.textCursor.alpha == 0)
            this.textCursor.alpha = 1;

        if (this.tick > 2)
            this.tick = 0;
    }

    constructor(placeholder?: string, options?: ButtonOptions) {
        var innerText: Text;
        var defaultText: string;
        
        if (!placeholder)
            placeholder = ' ';

        if (options.text instanceof Text) {
            innerText = options.text;
            defaultText = innerText.text;
            options.text.text = placeholder;
        } else if (typeof options.text === 'string') {
            innerText = new Text();
            innerText.text = options.text;
            defaultText = innerText.text;
            options.text = placeholder;
        }

        super(options);

        this.innerText = innerText;
        this.placeholder = placeholder;
        this.fieldValue = defaultText;
        this.innerText.text = placeholder;
        this.isPlaceholderVisible = true;

        window.addEventListener('click', () => { this.Click(); });

        this.onclick = (() => { this.isInputFocus = true; });

        this.CreateCursor();
    }

    protected CreateCursor() {
        this.textCursor = new Sprite(Texture.WHITE);
        this.innerView.addChild(this.textCursor);

        this.textCursor.tint = 0x000000;
        this.textCursor.alpha = 0;
        this.textCursor.position.set(0, 0);
        this.textCursor.anchor.set(0, 1);

        this.ResizeCursor();
    }

    protected ResizeCursor() {
        this.textCursor.width = 0.5;
        this.textCursor.height = this.innerText.height * 0.8;
        this.textCursor.position.set(
            this.innerText.x + this.innerText.width / 2,
            this.innerText.y + this.innerText.height / 2
        );
    }

    protected async Click(): Promise<void> {
        if (this.isInputFocus) {
            this.StartEditing();
            this.isInputFocus = false;
        }
        else if (this.isEditing) {            
            this.StopEditing();
        }
    }

    protected async StartEditing(): Promise<void> {
        this.isPlaceholderVisible = false;
        this.isEditing = true;
        this.innerText.text = this.fieldValue;        
        Ticker.shared.add(this.tickerHandler);
        this.textCursor.alpha = 1;
        this.updateAnchor();
        this.ResizeCursor();
        window.addEventListener('keyup', this.addKeyHandler);
    }

    protected StopEditing() {
        this.isEditing = false;
        this.textCursor.alpha = 0;
        Ticker.shared.remove(this.tickerHandler);
        this.tick = 0;
        this.fieldValue = this.innerText.text;
        this.isPlaceholderVisible = true;
        this.innerText.text = this.placeholder;
        this.updateAnchor();
        window.removeEventListener('keyup', this.addKeyHandler);
    }

    protected AddKey(e: KeyboardEvent) {        
        if (e.key === 'Backspace') {
            this.innerText.text = this.innerText.text.substring(0, this.innerText.text.length - 1);
        }
        else if (e.key === 'Escape' || e.key === 'Enter') {
            this.StopEditing();
        }
        else if (e.key.length === 1) {
            this.innerText.text += e.key;
        }

        this.updateAnchor();
        this.ResizeCursor();
    }
}