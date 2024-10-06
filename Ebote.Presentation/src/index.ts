import { MainScreen } from "./Application/Screens/MainScreen";
import { ScreenLoader } from "./Application/Screens/ScreenLoader";

(async () => {
    await ScreenLoader.Init();
    await MainScreen.Init();
})();