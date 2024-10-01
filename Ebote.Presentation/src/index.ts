import { ScreenLoader } from "./Application/Screens/ScreenLoader";
import { MainScreen } from "./Application/Screens/Main/MainScreen";
import { getAccountCheckAuth } from "./client";

(async () => {
    await ScreenLoader.Init();
    await MainScreen.Init();
    var result = await getAccountCheckAuth();

    if (result.response.status != 200)
        console.log("Unauthorized");
})();