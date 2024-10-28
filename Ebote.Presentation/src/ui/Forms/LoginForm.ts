import { Container } from "pixi.js";
import { InputField } from "../Components/InputField";
import { FancyButton } from "@pixi/ui";
import { TextService } from "../../Localization/TextService";
import { CreateButton } from "../Components/Button";

export class LoginForm extends Container {
    public loginInput: InputField;
    public passwordInput: InputField;
    public loginButton: FancyButton;
    public signupButton: FancyButton;

    public static async Create(): Promise<LoginForm> {
        let loginForm = new LoginForm();

        loginForm.loginInput = await InputField.Create(TextService.GetStringValue('login'));

        loginForm.passwordInput = await InputField.Create(TextService.GetStringValue('password'));
        loginForm.passwordInput.position.set(0, loginForm.loginInput.height + 5);

        loginForm.loginButton = await CreateButton(TextService.GetStringValue('signin'));
        loginForm.loginButton.position.set(0, loginForm.passwordInput.y + loginForm.passwordInput.height + 5);

        loginForm.signupButton = await CreateButton(TextService.GetStringValue('signup'));
        loginForm.signupButton.position.set(0, loginForm.loginButton.y + loginForm.loginButton.height + 5);

        loginForm.addChild(loginForm.loginButton);
        loginForm.addChild(loginForm.signupButton);
        loginForm.addChild(loginForm.passwordInput);
        loginForm.addChild(loginForm.loginInput);

        return loginForm;
    }
}