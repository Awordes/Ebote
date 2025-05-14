using Ebote.Engine;

namespace Ebote.Core;

public class Bullet: RectangleObjectAbstract
{
    public Guid WizardId { get; set; }

    public SideType SideType { get; set; }

    public MagicType MagicType { get; set; }

    public Axis EyeDirection { get; set; }

    public Bullet(Wizard wizard, float width, float height, Axis? axis = null) : base(width, height)
    {
        WizardId = wizard.Id;
        SideType = wizard.SideType;
        MagicType = wizard.MagicType;
        EyeDirection = axis ?? wizard.EyeDirection;

        ChangePosition(wizard.Center);
    }

    public void MoveBullet()
    {
        base.Move(new Point(
            GameConstants.Consts.BulletSpeed * EyeDirection.X,
            GameConstants.Consts.BulletSpeed * EyeDirection.Y)
        );
    }
}
