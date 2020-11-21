using Microsoft.EntityFrameworkCore.Migrations;

namespace IllusoryWall.Migrations
{
    public partial class SetHitListDeleteBehavior : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HitLists_Users_UserId",
                table: "HitLists");

            migrationBuilder.AddForeignKey(
                name: "FK_HitLists_Users_UserId",
                table: "HitLists",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HitLists_Users_UserId",
                table: "HitLists");

            migrationBuilder.AddForeignKey(
                name: "FK_HitLists_Users_UserId",
                table: "HitLists",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
