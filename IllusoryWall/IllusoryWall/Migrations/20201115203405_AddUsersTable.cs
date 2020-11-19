using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IllusoryWall.Migrations
{
    public partial class AddUsersTable : Migration
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

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false),
                    Type = table.Column<string>(nullable: false),
                    Spice = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);

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

            migrationBuilder.DropTable(
                name: "Users");

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
