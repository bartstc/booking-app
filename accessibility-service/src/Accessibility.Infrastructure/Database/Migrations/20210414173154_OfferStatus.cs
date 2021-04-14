using Microsoft.EntityFrameworkCore.Migrations;

namespace Accessibility.Infrastructure.Database.Migrations
{
    public partial class OfferStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "status",
                schema: "facility",
                table: "offers",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "status",
                schema: "facility",
                table: "offers");
        }
    }
}
