namespace Ebote.Engine;

public abstract class GameCycleAbstract(int gameTickInMilliseconds)
{
    public int GameTickInMilliseconds { get; set; } = gameTickInMilliseconds;

    protected bool IsGameStarted { get; set; }

    public virtual void Start()
    {
        IsGameStarted = true;
        _ = Cycle();
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
