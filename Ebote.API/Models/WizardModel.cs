using Ebote.Core;

namespace Ebote.API.Models;

public class WizardModel
{
    public required string Name { get; set; }

    public SideType SideType { get; set; }

    public MagicType MagicType { get; set; }
}
