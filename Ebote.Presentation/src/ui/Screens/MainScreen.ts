import { Assets, Container, Graphics } from "pixi.js";
import { AssetStore } from "../../Utils/AssetStore";
import { GetScaleToContainer, ScaleAndCenterToContainer, ScaleToContainer } from "../../Utils/SizeHelper";
import { LoginForm } from "../Forms/LoginForm";
import { MagicType, postAccountLogin, postAccountLogout, postAccountSignUp, postLobby, postLobbyStart, postProfileAddWizard, SideType } from "../../API";
import { ScreenLoader } from "../ScreenLoader";
import { Route } from "../../Router/Router";
import { MenuForm } from "../Forms/MenuForm";
import { LobbyForm } from "../Forms/LobbyForm";

export class MainScreen extends Container {
    public gameName: Graphics;
    public scroll: Container;
    public content: Container;
    public loginForm: LoginForm;
    public menuForm: MenuForm;
    public lobbyForm: LobbyForm;

    public ShowLoginForm() {
        this.HideContent();
        this.loginForm.visible = true;
    }

    public ShowMenuForm(isLobbyCreated: boolean) {
        this.HideContent();
        this.menuForm.visible = true;
        this.menuForm.openLobbyButton.enabled = isLobbyCreated;
    }

    public ShowLobbyForm(isWizardAdded: boolean, isProfileCreator: boolean) {
        this.HideContent();
        this.lobbyForm.visible = true;
        this.lobbyForm.addWizardButton.enabled = !isWizardAdded;
        this.lobbyForm.startGameButton.enabled = isProfileCreator;
    }

    public HideContent() {
        this.lobbyForm.visible = false;
        this.loginForm.visible = false;
        this.menuForm.visible = false;
    }
}

export async function CreateMainScreen(): Promise<MainScreen> {
    let mainScreen = new MainScreen();
    mainScreen.gameName = new Graphics(await Assets.load(AssetStore.gameName));

    mainScreen.scroll = new Container();
    mainScreen.scroll.addChild(new Graphics(await Assets.load(AssetStore.menuScroll)));
    await CreateContentBox(mainScreen);

    mainScreen.scroll.scale.set(GetScaleToContainer(mainScreen.scroll, mainScreen.gameName, 1.5, "X"));
    mainScreen.gameName.x = (mainScreen.scroll.width - mainScreen.gameName.width) / 2;
    mainScreen.scroll.position.set(
        0,
        mainScreen.gameName.height + 15
    );

    let scrollShadow = new Graphics(await Assets.load(AssetStore.menuScrollShadow));
    scrollShadow.alpha = 0.3;
    ScaleToContainer(scrollShadow, mainScreen.scroll);
    scrollShadow.position.set(
        mainScreen.scroll.x + 20,
        mainScreen.scroll.y + 20
    );

    await CreateLoginForm(mainScreen);
    await CreateMenuForm(mainScreen);
    await CreateLobbyForm(mainScreen);

    mainScreen.addChild(mainScreen.gameName);
    mainScreen.addChild(scrollShadow);
    mainScreen.addChild(mainScreen.scroll);

    mainScreen.HideContent();

    return mainScreen;
}

async function CreateContentBox(mainScreen: MainScreen) {
    mainScreen.content = new Container();
    let leftPadding = 28;
    let rightPadding = 5;
    let topPadding = 13;
    let bottomPadding = 15;

    let border = new Graphics();
    border.rect(
        0,
        0,
        mainScreen.scroll.width - leftPadding - rightPadding,
        mainScreen.scroll.height - topPadding - bottomPadding
    );
    border.stroke({ width: 1, color: 0x000000 });
    border.alpha = 0;

    mainScreen.content.addChild(border);
    mainScreen.content.position.set(leftPadding, topPadding);
    mainScreen.scroll.addChild(mainScreen.content);
}

async function CreateLoginForm(mainScreen: MainScreen) {
    mainScreen.loginForm = await LoginForm.Create();
    ScaleAndCenterToContainer(mainScreen.loginForm, mainScreen.content);

    mainScreen.loginForm.loginButton.on('pointerup', async () => {
        let response = await postAccountLogin({
            body: {
                login: mainScreen.loginForm.loginInput.fieldValue,
                passwordHash: mainScreen.loginForm.passwordInput.fieldValue
            }
        });
    
        if (!response.response.ok) {
            ScreenLoader.ShowModal('Не удалось<br>авторизоваться.');
            return;
        }

        await Route('menu');
    });

    mainScreen.loginForm.signupButton.on('pointerup', async () => {
        let response  = await postAccountSignUp({
            body: {
                login: mainScreen.loginForm.loginInput.fieldValue,
                passwordHash: mainScreen.loginForm.passwordInput.fieldValue
            }
        });

        if (response.response.ok) {
            ScreenLoader.ShowModal('Аккаунт успешно<br>зарегистрирован!<br>Войдите по<br>логину и паролю.');
        } else {
            ScreenLoader.ShowModal('Ошибка при регистрации.');
        }
    });

    mainScreen.content.addChild(mainScreen.loginForm);
}

async function CreateMenuForm(mainScreen: MainScreen) {
    mainScreen.menuForm = await MenuForm.Create();
    ScaleAndCenterToContainer(mainScreen.menuForm, mainScreen.content, 0.7);

    mainScreen.menuForm.createLobbyButton.on('pointerup', async ()  => {
        let lobby = await postLobby();

        if (!(lobby).response.ok) {
            ScreenLoader.ShowModal('Не удалось<br>создать лобби.');
            return;
        }

        mainScreen.lobbyForm.id = lobby.data.id;

        await Route('lobby');
    });

    mainScreen.menuForm.logoutButton.on('pointerup', async ()  => {
        await postAccountLogout();
        await Route('login');
    });

    mainScreen.menuForm.openLobbyButton.on('pointerup', async ()  => {
        await Route('lobby');
    });

    mainScreen.content.addChild(mainScreen.menuForm);
}

async function CreateLobbyForm(mainScreen: MainScreen) {
    mainScreen.lobbyForm = await LobbyForm.Create();
    ScaleAndCenterToContainer(mainScreen.lobbyForm, mainScreen.content);

    mainScreen.lobbyForm.backButton.on('pointerup', async () => { Route('menu'); });

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
            await Route('lobby');
        } else {
            ScreenLoader.ShowModal('Не удалось<br>добавить мага.');
        }
    });

    mainScreen.lobbyForm.startGameButton.on('pointerup', async () => { 
        await postLobbyStart();
        await Route('lobby');
    });

    mainScreen.content.addChild(mainScreen.lobbyForm);
}