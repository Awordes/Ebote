import { getAccountCheckAuth, getProfile, getProfileGetActiveLobbyState, postProfileUpdateActiveLobbyByLobbyId } from "../API";
import { ScreenLoader } from "../UI/ScreenLoader";

export async function InitRoute() {
    await ScreenLoader.Init();

    const currentRoute = window.location.hash;
    
    if (currentRoute.startsWith('#/lobby/')) {
        let lobbyId = currentRoute.substring(8, currentRoute.length);
        await Route('lobby', lobbyId);
    } else {
        await Route('menu');
    }
}

export async function Route(route: 'login' | 'menu' | 'lobby', lobbyId?: string) {
    const checkAuth = await getAccountCheckAuth();

    if (!checkAuth.response.ok) {
        await ScreenLoader.ShowModal('Необходима<br>авторизация');
        route = 'login';
    }

    await StopGame();

    switch (route)
    {
        case 'login':
            await ShowLoginForm();
            break;
        case 'menu':
            await ShowMenuForm();
            break;
        case 'lobby':
            await ShowLobbyForm(lobbyId);
            break;
    }
}

async function ShowLoginForm() {
    ScreenLoader.mainScreen.ShowLoginForm();
    window.location.hash = '/login';
}

async function ShowMenuForm() {
    let profile = await getProfile();

    if (!profile.response.ok) {
        await ScreenLoader.ShowModal('Ошибка при<br>получении профиля');
        return;
    }

    ScreenLoader.mainScreen.ShowMenuForm(!!profile.data.activeLobby);
    window.location.hash = '/menu';
}

async function ShowLobbyForm(lobbyId?: string) {
    if (lobbyId) {
        let respone = await postProfileUpdateActiveLobbyByLobbyId({path: { lobbyId: lobbyId }});
        if (respone.response.ok) {
            ScreenLoader.ShowModal('Обновлено активное<br>лобби.');
        } else {
            ScreenLoader.ShowModal('Не удалось<br>обновить лобби.');
        }
    }

    let profile = await getProfile();

    if (!profile.response.ok) {
        await ScreenLoader.ShowModal('Ошибка при<br>получении профиля');
        return;
    }

    let gameState = await getProfileGetActiveLobbyState();
    ScreenLoader.mainScreen.lobbyForm.id = gameState.data.id;

    if (!gameState.response.ok) {
        await ScreenLoader.ShowModal('Ошибка при получении<br>состояния лобби.');
        return;
    }

    window.location.hash = '/lobby/' + ScreenLoader.mainScreen.lobbyForm.id;

    await ScreenLoader.gameScreen.StartLobbyListener();

    if (gameState.data.isGameStarted) {
        ScreenLoader.mainScreen.visible = false;
        await ScreenLoader.gameScreen.StartGame();
    } else {
        let isWizardAlreadyAdded = false;
    
        for (let wizard of gameState.data.wizards) {
            if (wizard.profileId == profile.data.id) {
                isWizardAlreadyAdded = true;
                break;
            }
        }
    
        ScreenLoader.mainScreen.ShowLobbyForm(
            isWizardAlreadyAdded,
            gameState.data.creatorId == profile.data.id
        );
    }
}

async function StopGame() {
    await ScreenLoader.gameScreen.StopGame();
    await ScreenLoader.gameScreen.StopLobbyListener();
}