using Ebote.Engine;

namespace Ebote.Core;

public class Wizard
    (
        Guid profileId,
        MagicType magicType,
        string name,
        SideType sideType,
        Point spawnPosition,
        float width,
        float height
    ) : RectangleObjectAbstract(width, height)
{
    public Guid ProfileId { get; init; } = profileId;

    public string Name { get; init; } = name;

    public SideType SideType { get; init; } = sideType;

    public float CurrentHitPoints { get; private set; }

    public MagicType MagicType { get; set; } = magicType;

    public uint TimeToReviveInSeconds { get; set; }

    public Point SpawnPosition { get; set; } = spawnPosition;

    public Axis EyeDirection { get; set; }

    public void GetDamage(float damage)
    {
        CurrentHitPoints -= damage;

        if (CurrentHitPoints <= 0)
            _ = Death();
    }

    public void Spawn()
    {
        CurrentHitPoints = GameConstants.Consts.StartHitPoints;
        EyeDirection = sideType == SideType.Green ? new Axis(1, 0) : new Axis(-1, 0);
        ChangePosition(SpawnPosition);
    }

    public async Task Death()
    {
        TimeToReviveInSeconds = GameConstants.Consts.TimeToReviveInSeconds;

        while (TimeToReviveInSeconds > 0)
        {
            TimeToReviveInSeconds--;
            await Task.Delay(1000);
        }

        Spawn();
    }

    public void Move(Axis axis)
    {
        EyeDirection = axis;
        base.Move(new Point(axis.X * GameConstants.Consts.WizardSpeed, axis.Y * GameConstants.Consts.WizardSpeed));
    }
}
