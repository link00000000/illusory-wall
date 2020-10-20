using Microsoft.EntityFrameworkCore.Migrations;

namespace IllusoryWall.Migrations
{
    public partial class FixCascadeOnDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Damages_Enemies_EnemyId",
                table: "Damages");

            migrationBuilder.DropForeignKey(
                name: "FK_Drops_Enemies_EnemyId",
                table: "Drops");

            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Enemies_EnemyId",
                table: "Locations");

            migrationBuilder.AddForeignKey(
                name: "FK_Damages_Enemies_EnemyId",
                table: "Damages",
                column: "EnemyId",
                principalTable: "Enemies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Drops_Enemies_EnemyId",
                table: "Drops",
                column: "EnemyId",
                principalTable: "Enemies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Enemies_EnemyId",
                table: "Locations",
                column: "EnemyId",
                principalTable: "Enemies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Damages_Enemies_EnemyId",
                table: "Damages");

            migrationBuilder.DropForeignKey(
                name: "FK_Drops_Enemies_EnemyId",
                table: "Drops");

            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Enemies_EnemyId",
                table: "Locations");

            migrationBuilder.AddForeignKey(
                name: "FK_Damages_Enemies_EnemyId",
                table: "Damages",
                column: "EnemyId",
                principalTable: "Enemies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Drops_Enemies_EnemyId",
                table: "Drops",
                column: "EnemyId",
                principalTable: "Enemies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Enemies_EnemyId",
                table: "Locations",
                column: "EnemyId",
                principalTable: "Enemies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
