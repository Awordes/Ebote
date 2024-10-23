import { getAccountCheckAuth, getProfile, postProfileUpdateActiveLobbyByLobbyId } from "../api";
import { WizardHub } from "../SignalR/WizardHub";
import { ScreenLoader } from "../UI/ScreenLoader";

export async function Route(route: 'login' | 'menu' | 'lobby'): Promise<void> {
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
        } else {
            ScreenLoader.ShowModal('Ошибка при<br>открытии лобби.');
        }
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
            await ShowLobbyForm();
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

async function ShowLobbyForm(): Promise<void> {
    ScreenLoader.mainScreen.HideContent();
    ScreenLoader.mainScreen.lobbyForm.visible = true;
    await ScreenLoader.mainScreen.wizardHub.connection.start();
    await ScreenLoader.mainScreen.wizardHub.connection.send(WizardHub.getWizardActiveLobbyAsync);
    window.location.hash = '/lobby/' + ScreenLoader.mainScreen.lobbyForm.id;
}