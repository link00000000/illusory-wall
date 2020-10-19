using Microsoft.EntityFrameworkCore.Migrations;

namespace IllusoryWall.Migrations
{
    public partial class EnemyNameUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Enemies",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext CHARACTER SET utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Enemies_Name",
                table: "Enemies",
                column: "Name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Enemies_Name",
                table: "Enemies");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Enemies",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
