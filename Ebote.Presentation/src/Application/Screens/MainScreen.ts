import { Assets, Container, Graphics } from "pixi.js";
import { AssetStore } from "../Utils/AssetStore";
import { ScreenLoader } from "./ScreenLoader";
import { GetScaleToContainer, ScaleAndCenterToContainer } from "../Utils/SizeHelper";
import { MenuForm } from "../Components/MenuForm";
import { LobbyForm } from "../Components/LobbyForm";
import { LoginForm } from "../Components/LoginForm";
import { GameLobby, getAccountCheckAuth, getProfile, MagicType, postAccountLogin, postAccountLogout, postAccountSignUp, postLobby, postProfileAddWizard, SideType, WizardToAdd } from "../../client";
import { WizardHub } from "../SignalR/WizardHub";

export async function InitMainScreen () {
    let mainScreen = new MainScreen();

    mainScreen.wizardToAdd = [];

    mainScreen.gameName = new Graphics(await Assets.load(AssetStore.gameName));
    mainScreen.addChild(mainScreen.gameName);

    mainScreen.scroll = new Graphics(await Assets.load(AssetStore.scroll));
    mainScreen.addChild(mainScreen.scroll);

    mainScreen.scroll.scale.set(GetScaleToContainer(mainScreen.scroll, mainScreen.gameName, 1.5, "X"));
    mainScreen.gameName.x = (mainScreen.scroll.width - mainScreen.gameName.width) / 2;
    mainScreen.scroll.position.set(
        0,
        mainScreen.gameName.height + 15
    );

    await InitContentBox(mainScreen);
    await InitLoginForm(mainScreen);
    await InitMenuForm(mainScreen);
    await InitLobbyForm(mainScreen);

    mainScreen.content.addChild(mainScreen.loginForm);
    mainScreen.content.addChild(mainScreen.menuForm);
    mainScreen.content.addChild(mainScreen.lobbyForm);

    mainScreen.ShowScreen('menu');

    return mainScreen;
}

async function InitContentBox(mainScreen: MainScreen) {
    mainScreen.content = new Container();
    mainScreen.addChild(mainScreen.content);
    mainScreen.content.position.set(
        mainScreen.scroll.x + 72,
        mainScreen.scroll.y + 30
    );

    let border = new Graphics();
    mainScreen.content.addChild(border);
    border.rect(0, 0, mainScreen.scroll.width - 85, mainScreen.scroll.height - 65);
    border.stroke({width: 1, color:0x000000});
    border.alpha = 0;
}

async function InitLoginForm(mainScreen:MainScreen) {
    mainScreen.loginForm = await LoginForm.Create();
    ScaleAndCenterToContainer(mainScreen.loginForm, mainScreen.content);

    mainScreen.loginForm.loginButton.on('pointerup', async () => {
        await mainScreen.Login();
        await mainScreen.ShowScreen('menu');
    });

    mainScreen.loginForm.signupButton.on('pointerup', async () => {
        await mainScreen.SignUp();
    });
}

async function InitMenuForm(mainScreen: MainScreen) {
    mainScreen.menuForm = await MenuForm.Create();
    ScaleAndCenterToContainer(mainScreen.menuForm, mainScreen.content, 0.7);

    mainScreen.menuForm.createLobbyButton.on('pointerup', async ()  => {
        let response = await postLobby();

        if (response.response.ok) {
            mainScreen.lobbyForm.id = response.data.id
        }

        await mainScreen.ShowScreen('lobby');
    });

    mainScreen.menuForm.logoutButton.on('pointerup', async ()  => {
        await mainScreen.Logout();
        await mainScreen.ShowScreen('login');
    });

    mainScreen.menuForm.openLobbyButton.on('pointerup', async ()  => {
        await mainScreen.ShowScreen('lobby');
    });
}

async function InitLobbyForm(mainScreen:MainScreen) {
    mainScreen.lobbyForm = await LobbyForm.Create();

    ScaleAndCenterToContainer(mainScreen.lobbyForm, mainScreen.content);

    mainScreen.lobbyForm.backButton.on('pointerup', async () => { mainScreen.ShowScreen('menu'); });

    mainScreen.lobbyForm.addWizardButton.on('pointerup', async () => {
        if (mainScreen.lobbyForm.sideType.selected == 2) {
            ScreenLoader.ShowModal('Выберите сторону');
            return;
        }

        if (mainScreen.lobbyForm.wizardName.fieldValue?.length < 1) {
            ScreenLoader.ShowModal('Введите имя мага');
            return;
        }

        let response = await postProfileAddWizard({
            body: {
                name: mainScreen.lobbyForm.wizardName.fieldValue,
                magicType: mainScreen.lobbyForm.magicType.selected as MagicType,
                sideType: mainScreen.lobbyForm.sideType.selected as SideType
            }
        });

        if (response.response.ok) {
            mainScreen.lobbyForm.startGameButton.enabled = true;
        } else {
            ScreenLoader.ShowModal('Не удалось \r\nдобавить мага.');
        }
    });

    mainScreen.wizardHub = new WizardHub();
    mainScreen.wizardHub.connection.on(mainScreen.wizardHub.getWizardActiveLobbyAsync, (gameState: GameLobby) => {
        mainScreen.lobbyForm.updateWizardList(gameState.wizardsToAdd);
    });
}

class MainScreen extends Container {
    public gameName: Graphics;
    public scroll: Graphics;
    public content: Container;
    public menuForm: MenuForm;
    public lobbyForm: LobbyForm;
    public loginForm: LoginForm;
    public wizardToAdd: WizardToAdd[];
    public wizardHub: WizardHub;

    public async ShowScreen(screenName: 'menu' | 'login' | 'lobby') {
        this.menuForm.visible = false;
        this.loginForm.visible = false;
        await this.HideLobbyForm();

        if (!(await this.IsLogged())) {
            this.loginForm.visible = true;
            return;
        }

        switch (screenName) {
            case 'menu':
                await this.ShowMenuForm();
                break;

            case 'lobby':
                await this.ShowLobbyForm();
                break;

            case 'login':
                this.loginForm.visible = true;
                break;
        }
    }

    private async ShowMenuForm() {
        this.menuForm.visible = true;
        let response = await getProfile();

        if (response.response.ok && response.data.activeLobby) {
            this.lobbyForm.id = response.data.activeLobby.id;
            this.menuForm.openLobbyButton.visible = true;
        }
        else
            this.menuForm.openLobbyButton.visible = false;
    }

    private async ShowLobbyForm() {
        this.lobbyForm.visible = true;
        window.location.hash = '#lobby/' + this.lobbyForm.id;
        await this.wizardHub.connection.start();
        await this.wizardHub.connection.send(this.wizardHub.getWizardActiveLobbyAsync);
    }

    private async HideLobbyForm() {
        this.lobbyForm.visible = false;
        window.location.hash = '';
        await this.wizardHub.connection.stop();
    }

    private async IsLogged(): Promise<boolean> {
        let request = await getAccountCheckAuth();
        
        return request.response.ok;
    }

    public async Login() {
        let response = await postAccountLogin({
            body: {
                login: this.loginForm.loginInput.fieldValue,
                passwordHash: this.loginForm.passwordInput.fieldValue
            }
        });

        if (!response.response.ok) {
            ScreenLoader.ShowModal('Не удалось \r\nавторизоваться');
        }
    }

    public async SignUp() {
        let response  = await postAccountSignUp({
            body: {
                login: this.loginForm.loginInput.fieldValue,
                passwordHash: this.loginForm.passwordInput.fieldValue
            }
        });

        if (response.response.ok) {
            ScreenLoader.ShowModal('Аккаунт успешно зарегистрирован! \r\n Войдите по логину и паролю.');
        } else {
            ScreenLoader.ShowModal('Ошибка при регистрации');
        }
    }

    public async Logout() {
        await postAccountLogout();
    }
}