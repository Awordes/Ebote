import { Container } from "pixi.js";
import { TextService } from "../Localization/TextService";
import { CreateButton } from "./CreateButton";
import { FancyButton } from "@pixi/ui";
import { InputField } from "./InputField";

export class LoginForm extends Container {
    public loginInput: InputField;
    public passwordInput: InputField;
    public loginButton: FancyButton;
    public signupButton: FancyButton;

    public static async Create() {
        var loginForm = new LoginForm();
        
        loginForm.loginInput = await InputField.Create(TextService.GetStringValue('login'));
        loginForm.addChild(loginForm.loginInput);
    
        loginForm.passwordInput = await InputField.Create(TextService.GetStringValue('password'));
        loginForm.addChild(loginForm.passwordInput);
        loginForm.passwordInput.position.set(loginForm.loginInput.x, loginForm.loginInput.y + loginForm.loginInput.height + 5);
    
        loginForm.loginButton = await CreateButton(TextService.GetStringValue('signin'));
        loginForm.addChild(loginForm.loginButton);
        loginForm.loginButton.position.set(loginForm.passwordInput.x, loginForm.passwordInput.y + loginForm.passwordInput.height + 5);
    
        loginForm.signupButton = await CreateButton(TextService.GetStringValue('signup'));
        loginForm.addChild(loginForm.signupButton);
        loginForm.signupButton.position.set(loginForm.loginButton.x, loginForm.loginButton.y + loginForm.loginButton.height + 5);
    
        return loginForm;
    }
}