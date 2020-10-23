using Microsoft.EntityFrameworkCore.Migrations;

namespace IllusoryWall.Migrations
{
    public partial class MakeModelValuesNull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Souls",
                table: "Locations",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "HP",
                table: "Locations",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<bool>(
                name: "Respawns",
                table: "Enemies",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AlterColumn<double>(
                name: "Rate",
                table: "Drops",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Souls",
                table: "Locations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "HP",
                table: "Locations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Respawns",
                table: "Enemies",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Rate",
                table: "Drops",
                type: "double",
                nullable: false,
                oldClrType: typeof(double),
                oldNullable: true);
        }
    }
}
