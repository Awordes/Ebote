using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ebote.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateLobby : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lobbies_Profiles_CreatorId",
                schema: "ebote",
                table: "Lobbies");

            migrationBuilder.AddColumn<Guid>(
                name: "ActiveLobbyId",
                schema: "ebote",
                table: "Profiles",
                type: "uuid",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatorId",
                schema: "ebote",
                table: "Lobbies",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.CreateIndex(
                name: "IX_Profiles_ActiveLobbyId",
                schema: "ebote",
                table: "Profiles",
                column: "ActiveLobbyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lobbies_Profiles_CreatorId",
                schema: "ebote",
                table: "Lobbies",
                column: "CreatorId",
                principalSchema: "ebote",
                principalTable: "Profiles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Profiles_Lobbies_ActiveLobbyId",
                schema: "ebote",
                table: "Profiles",
                column: "ActiveLobbyId",
                principalSchema: "ebote",
                principalTable: "Lobbies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lobbies_Profiles_CreatorId",
                schema: "ebote",
                table: "Lobbies");

            migrationBuilder.DropForeignKey(
                name: "FK_Profiles_Lobbies_ActiveLobbyId",
                schema: "ebote",
                table: "Profiles");

            migrationBuilder.DropIndex(
                name: "IX_Profiles_ActiveLobbyId",
                schema: "ebote",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "ActiveLobbyId",
                schema: "ebote",
                table: "Profiles");

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatorId",
                schema: "ebote",
                table: "Lobbies",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

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
    }
}
