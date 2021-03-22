using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Accessibility.Infrastructure.Database.Migrations
{
    public partial class BookingDates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "creation_date",
                schema: "booking",
                table: "bookings",
                newName: "requested_date");

            migrationBuilder.AddColumn<DateTime>(
                name: "booked_date",
                schema: "booking",
                table: "bookings",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "booked_date",
                schema: "booking",
                table: "bookings");

            migrationBuilder.RenameColumn(
                name: "requested_date",
                schema: "booking",
                table: "bookings",
                newName: "creation_date");
        }
    }
}
