import { getAccountCheckAuth } from "./api";
import { ScreenLoader } from "./ui/screenLoader";

(async () => {
    await ScreenLoader.Init();
    console.log(window.location);
    let response = await getAccountCheckAuth();
    console.log(response);
})();