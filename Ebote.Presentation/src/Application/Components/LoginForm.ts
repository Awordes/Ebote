import { Container } from "pixi.js";
import { CreateInput } from "./CreateInput";
import { TextService } from "../Localization/TextService";
import { CreateButton } from "./CreateButton";

export async function CreateLoginForm(): Promise<Container> {
    var loginForm = new Container();

    var login = await CreateInput(TextService.GetStringValue('login'));
    loginForm.addChild(login);

    var password = await CreateInput(TextService.GetStringValue('password'));
    loginForm.addChild(password);
    password.position.set(login.x, login.y + login.height + 5);

    var loginButton = await CreateButton(TextService.GetStringValue('signin'));
    loginForm.addChild(loginButton);
    loginButton.position.set(password.x, password.y + password.height + 5);

    var signupButton = await CreateButton(TextService.GetStringValue('signup'));
    loginForm.addChild(signupButton);
    signupButton.position.set(loginButton.x, loginButton.y + loginButton.height + 5);

    return loginForm;
}