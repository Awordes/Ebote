namespace Ebote.Infrastructure.Settings;

public class DbSettings
{
    public const string SectionName = nameof(DbSettings);

    public required string ConnectionString { get; set; }

    public required int MajorVersion { get; set; }

    public required int MinorVersion { get; set; }

    public required string SchemaName { get; set; }

    public required string EfMigrationsHistoryTableName { get; set; }
}
