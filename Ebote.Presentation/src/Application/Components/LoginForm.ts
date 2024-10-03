import { Container } from "pixi.js";
import { InputComponent } from "./Input";
import { TextService } from "../Localization/TextService";

export class LoginForm {
    public static async Init(): Promise<Container> {
        var loginForm = new Container();

        var login = await InputComponent.Init(TextService.GetStringValue('login'));
        loginForm.addChild(login);

        var password = await InputComponent.Init(TextService.GetStringValue('password'));
        loginForm.addChild(password);
        password.position.set(login.x, login.y + login.height + 5);

        return loginForm;
    }
}