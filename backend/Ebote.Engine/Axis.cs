namespace Ebote.Engine;

public struct Axis
{
    public float X { get; set; }

    public float Y { get; set; }

    public Axis()
    {
        X = 0;
        Y = 0;
    }

    public Axis(float x, float y)
    {
        X = x;
        Y = y;
    }
}
