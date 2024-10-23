import { getAccountCheckAuth } from "../api";
import { ScreenLoader } from "../UI/ScreenLoader";

export async function Route(route: 'login' | 'menu' | 'lobby'): Promise<void> {
    const currentRoute = window.location.hash;
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
            break;
    }
}

async function ShowMenuForm(): Promise<void> {
    ScreenLoader.mainScreen.Show('menu');
}

async function ShowLoginForm(): Promise<void> {
    ScreenLoader.mainScreen.Show('login');
}