import { getAccountCheckAuth, getProfile, postProfileUpdateActiveLobbyByLobbyId } from "../API";
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
}

export async function Route(route: 'login' | 'menu' | 'lobby' | 'game'): Promise<void> {
    const checkAuth = await getAccountCheckAuth();

    if (!checkAuth.response.ok) {
        await ScreenLoader.ShowModal('Необходима<br>авторизация');
        await ShowLoginForm();
        return;
    }

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
            break;
    }
}

async function ShowMenuForm(): Promise<void> {
    ScreenLoader.mainScreen.HideContent();
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

async function ShowLoginForm(): Promise<void> {
    ScreenLoader.mainScreen.HideContent();
    ScreenLoader.mainScreen.loginForm.visible = true;
    window.location.hash = '/login';
}