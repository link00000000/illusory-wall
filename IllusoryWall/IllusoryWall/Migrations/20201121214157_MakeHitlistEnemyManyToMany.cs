using Microsoft.EntityFrameworkCore.Migrations;

namespace IllusoryWall.Migrations
{
    public partial class MakeHitlistEnemyManyToMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "EnemyHitListJoins",
                columns: table => new
                {
                    EnemyId = table.Column<int>(nullable: false),
                    HitListId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnemyHitListJoins", x => new { x.EnemyId, x.HitListId });
                    table.ForeignKey(
                        name: "FK_EnemyHitListJoins_Enemies_EnemyId",
                        column: x => x.EnemyId,
                        principalTable: "Enemies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EnemyHitListJoins_HitLists_HitListId",
                        column: x => x.HitListId,
                        principalTable: "HitLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EnemyHitListJoins_HitListId",
                table: "EnemyHitListJoins",
                column: "HitListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EnemyHitListJoins");

            migrationBuilder.AddColumn<int>(
                name: "HitListId",
                table: "Enemies",
                type: "int",
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
    }
}
