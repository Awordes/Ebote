import { getAccountCheckAuth, getProfile, getProfileGetActiveLobbyState, postProfileUpdateActiveLobbyByLobbyId } from "../API";
import { ScreenLoader } from "../UI/ScreenLoader";
import { RouteLobby } from "./Routes/LobbyRouter";

export async function InitRoute() {
    await ScreenLoader.Init();

    const currentRoute = window.location.hash;

    const checkAuth = await getAccountCheckAuth();

    if (!checkAuth.response.ok) {
        await ScreenLoader.ShowModal('Необходима<br>авторизация');
        await ShowLoginForm();
        return;
    }

    if (currentRoute.startsWith('#/lobby/')) {
        let lobbyId = currentRoute.substring(8, currentRoute.length);

        let response = await postProfileUpdateActiveLobbyByLobbyId({
            path: {
                lobbyId: lobbyId
            }
        });

        if (response.response.ok) {
            ScreenLoader.ShowModal('Обновлено активное<br>лобби.');
            ScreenLoader.mainScreen.lobbyForm.id = lobbyId;
            await Route('lobby');
        } else {
            ScreenLoader.ShowModal('Ошибка при<br>открытии лобби.');
            await Route('menu');
        }
    } else {
        await Route('menu');
    }

    let profile = await getProfile();
    if (profile.data.activeLobby) {
        await ScreenLoader.gameScreen.InitState();
    }
}

export async function Route(route: 'login' | 'menu' | 'lobby' | 'game') {
    const checkAuth = await getAccountCheckAuth();

    if (!checkAuth.response.ok) {
        await ScreenLoader.ShowModal('Необходима<br>авторизация');
        await ShowLoginForm();
        return;
    }

    ScreenLoader.mainScreen.HideContent();
    await StopGame();

    switch (route)
    {
        case "login":
            await ShowLoginForm();
            break;
        case "menu":
            await ShowMenuForm();
            break;
        case "lobby":
            await RouteLobby();
            break;
        case "game":
            await StartGame();
            break;
    }

    let profile = await getProfile();
    if (profile.data.activeLobby) {
        await ScreenLoader.gameScreen.InitState();
    }
}

async function ShowMenuForm() {
    let profile = await getProfile();

    if (!profile.response.ok) {
        await ScreenLoader.ShowModal('Ошибка при<br>получении профиля');
        return;
    }

    if (profile.data.activeLobby?.id) {
        ScreenLoader.mainScreen.menuForm.openLobbyButton.visible = true;
        ScreenLoader.mainScreen.lobbyForm.id = profile.data.activeLobby.id;
    } else {
        ScreenLoader.mainScreen.menuForm.openLobbyButton.visible = false;
    }

    ScreenLoader.mainScreen.menuForm.visible = true;
    window.location.hash = '/menu';
}

async function ShowLoginForm() {
    ScreenLoader.mainScreen.loginForm.visible = true;
    window.location.hash = '/login';
}

async function StartGame() {
    ScreenLoader.mainScreen.visible = false;
    await ScreenLoader.gameScreen.StartGameListener();
}

async function StopGame() {
    ScreenLoader.mainScreen.visible = true;
    await ScreenLoader.gameScreen.StopGameListener();
}