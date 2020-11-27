using Microsoft.EntityFrameworkCore.Migrations;

namespace IllusoryWall.Migrations
{
    public partial class HitlistEnemyCollectionAndUserCollection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HitLists_Enemies_EnemyId",
                table: "HitLists");

            migrationBuilder.DropIndex(
                name: "IX_HitLists_EnemyId",
                table: "HitLists");

            migrationBuilder.DropColumn(
                name: "EnemyId",
                table: "HitLists");

            migrationBuilder.AddColumn<int>(
                name: "HitListId",
                table: "Enemies",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Enemies_HitListId",
                table: "Enemies",
                column: "HitListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enemies_HitLists_HitListId",
                table: "Enemies",
                column: "HitListId",
                principalTable: "HitLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enemies_HitLists_HitListId",
                table: "Enemies");

            migrationBuilder.DropIndex(
                name: "IX_Enemies_HitListId",
                table: "Enemies");

            migrationBuilder.DropColumn(
                name: "HitListId",
                table: "Enemies");

            migrationBuilder.AddColumn<int>(
                name: "EnemyId",
                table: "HitLists",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_HitLists_EnemyId",
                table: "HitLists",
                column: "EnemyId");

            migrationBuilder.AddForeignKey(
                name: "FK_HitLists_Enemies_EnemyId",
                table: "HitLists",
                column: "EnemyId",
                principalTable: "Enemies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
