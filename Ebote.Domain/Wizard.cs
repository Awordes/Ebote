using Ebote.Engine;

namespace Ebote.Domain;

public class Wizard (MagicType magicType, Point spawnPosition, float width, float height)
    : RectangleObjectAbstract(width, height)
{
    public float CurrentHitPoints { get; private set; }

    public MagicType MagicType { get; set; } = magicType;

    public uint TimeToReviveInSeconds { get; set; }

    public Point SpawnPosition { get; set; } = spawnPosition;

    public void GetDamage(float damage)
    {
        CurrentHitPoints -= damage;

        if (CurrentHitPoints <= 0)
            _ = Death();
    }

    public void Spawn()
    {
        CurrentHitPoints = GameConstants.StartHitPoints;
        ChangePosition(SpawnPosition);
    }

    public async Task Death()
    {
        TimeToReviveInSeconds = GameConstants.TimeToReviveInSeconds;

        while (TimeToReviveInSeconds > 0)
        {
            TimeToReviveInSeconds--;
            await Task.Delay(1000);
        }

        Spawn();
    }
}
