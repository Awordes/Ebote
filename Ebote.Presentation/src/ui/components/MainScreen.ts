import { Assets, Container, Graphics } from "pixi.js";
import { AssetStore } from "../../Utils/AssetStore";
import { GetScaleToContainer, ScaleAndCenterToContainer } from "../../Utils/SizeHelper";
import { LoginForm } from "./LoginForm";
import { postAccountLogin, postAccountLogout, postAccountSignUp, postLobby } from "../../api";
import { ScreenLoader } from "../ScreenLoader";
import { MenuForm } from "./MenuForm";
import { Route } from "../../Utils/Router";

export class MainScreen extends Container {
    private gameName: Graphics;
    private scroll: Container;
    private content: Container;
    public loginForm: LoginForm;
    public menuForm: MenuForm;

    public static async Create(): Promise<MainScreen> {
        let mainScreen = new MainScreen();
        mainScreen.gameName = new Graphics(await Assets.load(AssetStore.gameName));

        mainScreen.scroll = new Container();
        mainScreen.scroll.addChild(new Graphics(await Assets.load(AssetStore.menuScroll)));
        await mainScreen.CreateContentBox();

        mainScreen.scroll.scale.set(GetScaleToContainer(mainScreen.scroll, mainScreen.gameName, 1.5, "X"));
        mainScreen.gameName.x = (mainScreen.scroll.width - mainScreen.gameName.width) / 2;
        mainScreen.scroll.position.set(
            0,
            mainScreen.gameName.height + 15
        );

        await mainScreen.CreateLoginForm();
        await mainScreen.CreateMenuForm();

        mainScreen.addChild(mainScreen.gameName);
        mainScreen.addChild(mainScreen.scroll);

        return mainScreen;
    }

    private async CreateContentBox(): Promise<void> {
        this.content = new Container();
        let border = new Graphics();
        let leftPadding = 28;
        let rightPadding = 5;
        let topPadding = 13;
        let bottomPadding = 15;

        border.rect(
            0,
            0,
            this.scroll.width - leftPadding - rightPadding,
            this.scroll.height - topPadding - bottomPadding
        );
        border.stroke({ width: 1, color: 0x000000 });
        border.alpha = 0;

        this.content.addChild(border);
        this.content.position.set(leftPadding, topPadding);
        this.scroll.addChild(this.content);
    }

    private async CreateLoginForm(): Promise<void> {
        this.loginForm = await LoginForm.Create();
        ScaleAndCenterToContainer(this.loginForm, this.content);
    
        this.loginForm.loginButton.on('pointerup', async () => {
            let response = await postAccountLogin({
                body: {
                    login: this.loginForm.loginInput.fieldValue,
                    passwordHash: this.loginForm.passwordInput.fieldValue
                }
            });

            if (!response.response.ok) {
                ScreenLoader.ShowModal('Не удалось<br>авторизоваться.');
                return;
            }
            
            await Route('menu');
        });

        this.loginForm.signupButton.on('pointerup', async () => {
            let response  = await postAccountSignUp({
                body: {
                    login: this.loginForm.loginInput.fieldValue,
                    passwordHash: this.loginForm.passwordInput.fieldValue
                }
            });
    
            if (response.response.ok) {
                ScreenLoader.ShowModal('Аккаунт успешно<br>зарегистрирован!<br>Войдите по<br>логину и паролю.');
            } else {
                ScreenLoader.ShowModal('Ошибка при регистрации.');
            }
        });

        this.content.addChild(this.loginForm);
    }

    public async CreateMenuForm(): Promise<void> {
        this.menuForm = await MenuForm.Create();
        ScaleAndCenterToContainer(this.menuForm, this.content, 0.7);

        this.menuForm.createLobbyButton.on('pointerup', async ()  => {
            let response = await postLobby();

            if (response.response.ok) {
                // this.lobbyForm.id = response.data.id
            }

            await Route('lobby');
        });

        this.menuForm.logoutButton.on('pointerup', async ()  => {
            await postAccountLogout();
            await Route('login');
        });

        this.menuForm.openLobbyButton.on('pointerup', async ()  => {
            await Route('lobby');
        });

        this.content.addChild(this.menuForm);
    }

    public async Show(form: 'login' | 'menu' | 'lobby'): Promise<void> {
        this.loginForm.visible = false;
        this.menuForm.visible = false;
        
        switch (form)
        {
            case "login":
                this.loginForm.visible = true;
                break;
            case "menu":
                this.menuForm.visible = true;
                break;
            case "lobby":
                break;
        }
    }
}
