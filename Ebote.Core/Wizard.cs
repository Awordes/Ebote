using Ebote.Engine;

namespace Ebote.Core;

public class Wizard(
    Guid profileId,
    MagicType magicType,
    string name,
    SideType sideType,
    Point spawnPosition
    ) : RectangleObjectAbstract(GameConstants.Consts.WizardWidth, GameConstants.Consts.WizardHeight)
{
    public Guid ProfileId { get; init; } = profileId;

    public string Name { get; init; } = name;

    public SideType SideType { get; init; } = sideType;

    public MagicType MagicType { get; set; } = magicType;

    public Point SpawnPosition { get; set; } = spawnPosition;

    public float CurrentHitPoints { get; private set; }

    public float MaxHitPoints { get; private set; }

    public float CurrentSpeed { get; private set; }

    public Axis EyeDirection { get; set; }

    public WizardState State { get; set; } = WizardState.Idle;

    public uint TimeToReviveInSeconds { get; set; } = 0;

    private bool NextShootAvailable { get; set; } = true;

    public Bullet? Shoot(Axis? axis)
    {
        if (!IsAbleToShoot() || !NextShootAvailable) return null;

        var bullet = new Bullet(
            this,
            GameConstants.Consts.BulletWidth,
            GameConstants.Consts.BulletHeight,
            axis
        );

        _ = WaitToNextShoot();

        return bullet;
    }

    private async Task WaitToNextShoot()
    {
        NextShootAvailable = false;

        await Task.Delay(TimeSpan.FromMilliseconds(GameConstants.Consts.WizardAttackSpeed));

        NextShootAvailable = true;
    }

    public void GetDamage(float damage)
    {
        CurrentHitPoints -= damage;

        if (CurrentHitPoints <= 0)
            _ = Death();
    }

    public void Spawn()
    {
        CurrentHitPoints = GameConstants.Consts.StartHitPoints;
        MaxHitPoints = GameConstants.Consts.StartHitPoints;
        CurrentSpeed = GameConstants.Consts.WizardSpeed;
        State = WizardState.Idle;
        EyeDirection = SideType == SideType.Green ? new Axis(1, 0) : new Axis(-1, 0);
        ChangePosition(SpawnPosition);
    }

    public async Task Death()
    {
        TimeToReviveInSeconds = GameConstants.Consts.TimeToReviveInSeconds;
        State = WizardState.Dead;

        while (TimeToReviveInSeconds > 0)
        {
            TimeToReviveInSeconds--;
            await Task.Delay(TimeSpan.FromSeconds(1));
        }

        Spawn();
    }

    public void Move(Axis axis)
    {
        if (!IsAbleToMove()) return;

        EyeDirection = axis;
        base.Move(new Point(
            axis.X * CurrentSpeed,
            axis.Y * CurrentSpeed
        ));
    }

    private bool IsAbleToShoot()
        => State == WizardState.Idle
        || State == WizardState.Moving;

    private bool IsAbleToMove()
        => State != WizardState.Dead;
    
    public void Defence()
    {
        CurrentSpeed = GameConstants.Consts.WizardSpeed * 0.6F;

        State = WizardState.Defenced;
    }

    public void Undefence()
    {
        CurrentSpeed = GameConstants.Consts.WizardSpeed;

        State = WizardState.Idle;
    }
}
