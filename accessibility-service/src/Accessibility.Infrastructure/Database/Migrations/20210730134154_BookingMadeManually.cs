using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Accessibility.Infrastructure.Database.Migrations
{
    public partial class BookingMadeManually : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_made_manually",
                schema: "booking",
                table: "bookings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "public_customer_id",
                schema: "booking",
                table: "bookings",
                type: "uuid",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_made_manually",
                schema: "booking",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "public_customer_id",
                schema: "booking",
                table: "bookings");
        }
    }
}
