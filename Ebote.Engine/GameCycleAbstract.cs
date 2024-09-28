namespace Ebote.Engine;

public abstract class GameCycleAbstract(int gameTickInMilliseconds)
{
    public int GameTickInMilliseconds { get; set; } = gameTickInMilliseconds;

    private bool IsGameStarted { get; set; }

    public void Start()
    {
        IsGameStarted = true;
    }

    public void Stop()
    {
        IsGameStarted = false;
    }

    public async Task Cycle()
    {
        while(IsGameStarted)
        {
            await Update();
            await Task.Delay(GameTickInMilliseconds);
        }
    }

    public abstract Task Update();
}
