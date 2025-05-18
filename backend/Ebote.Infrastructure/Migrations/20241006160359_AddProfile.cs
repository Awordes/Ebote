using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ebote.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lobbies_Accounts_CreatorId",
                schema: "ebote",
                table: "Lobbies");

            migrationBuilder.AddColumn<Guid>(
                name: "ProfileId",
                schema: "ebote",
                table: "Accounts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Profiles",
                schema: "ebote",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profiles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_ProfileId",
                schema: "ebote",
                table: "Accounts",
                column: "ProfileId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Profiles_ProfileId",
                schema: "ebote",
                table: "Accounts",
                column: "ProfileId",
                principalSchema: "ebote",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lobbies_Profiles_CreatorId",
                schema: "ebote",
                table: "Lobbies",
                column: "CreatorId",
                principalSchema: "ebote",
                principalTable: "Profiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Profiles_ProfileId",
                schema: "ebote",
                table: "Accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_Lobbies_Profiles_CreatorId",
                schema: "ebote",
                table: "Lobbies");

            migrationBuilder.DropTable(
                name: "Profiles",
                schema: "ebote");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_ProfileId",
                schema: "ebote",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "ProfileId",
                schema: "ebote",
                table: "Accounts");

            migrationBuilder.AddForeignKey(
                name: "FK_Lobbies_Accounts_CreatorId",
                schema: "ebote",
                table: "Lobbies",
                column: "CreatorId",
                principalSchema: "ebote",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
