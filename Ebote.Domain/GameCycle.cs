using Ebote.Engine;

namespace Ebote.Domain;

public class GameCycle() : GameCycleAbstract(GameConstants.GameTickInMilliseconds)
{
    public IDictionary<Guid, IGameObject> GameObjects { get; set; } = new Dictionary<Guid, IGameObject>();

    public override Task Update()
    {
        foreach (var gameObject in GameObjects)
        {
            //todo
        }

        return Task.CompletedTask;
    }
}
