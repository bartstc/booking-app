using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Accessibility.Infrastructure.Database.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "accessibility");

            migrationBuilder.EnsureSchema(
                name: "booking");

            migrationBuilder.EnsureSchema(
                name: "facility");

            migrationBuilder.EnsureSchema(
                name: "app");

            migrationBuilder.CreateTable(
                name: "bookings",
                schema: "booking",
                columns: table => new
                {
                    booking_id = table.Column<Guid>(type: "uuid", nullable: false),
                    creation_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    status = table.Column<short>(type: "smallint", nullable: false),
                    customer_id = table.Column<Guid>(type: "uuid", nullable: true),
                    facility_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bookings", x => x.booking_id);
                });

            migrationBuilder.CreateTable(
                name: "offers",
                schema: "facility",
                columns: table => new
                {
                    offer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    facility_id = table.Column<Guid>(type: "uuid", nullable: true),
                    name = table.Column<string>(type: "text", nullable: true),
                    price = table.Column<decimal>(type: "numeric", nullable: false),
                    currency = table.Column<string>(type: "text", nullable: true),
                    duration = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_offers", x => x.offer_id);
                });

            migrationBuilder.CreateTable(
                name: "outbox_notifications",
                schema: "app",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    type = table.Column<string>(type: "text", nullable: true),
                    occured_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    processed_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    data = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_outbox_notifications", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "schedules",
                schema: "accessibility",
                columns: table => new
                {
                    schedule_id = table.Column<Guid>(type: "uuid", nullable: false),
                    creation_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    creator_id = table.Column<Guid>(type: "uuid", nullable: true),
                    end_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    facility_id = table.Column<Guid>(type: "uuid", nullable: true),
                    modify_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    name = table.Column<string>(type: "text", nullable: true),
                    start_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    version = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_schedules", x => x.schedule_id);
                });

            migrationBuilder.CreateTable(
                name: "booked_records",
                schema: "booking",
                columns: table => new
                {
                    booked_record_id = table.Column<Guid>(type: "uuid", nullable: false),
                    booking_id = table.Column<Guid>(type: "uuid", nullable: false),
                    change_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    duration = table.Column<short>(type: "smallint", nullable: false),
                    status = table.Column<short>(type: "smallint", nullable: false),
                    employee_id = table.Column<Guid>(type: "uuid", nullable: true),
                    price = table.Column<decimal>(type: "numeric", nullable: true),
                    currency = table.Column<string>(type: "text", nullable: true),
                    offer_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_booked_records", x => x.booked_record_id);
                    table.ForeignKey(
                        name: "FK_booked_records_bookings_booking_id",
                        column: x => x.booking_id,
                        principalSchema: "booking",
                        principalTable: "bookings",
                        principalColumn: "booking_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "availabilities",
                schema: "accessibility",
                columns: table => new
                {
                    availability_id = table.Column<Guid>(type: "uuid", nullable: false),
                    start_time = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    end_time = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    priority = table.Column<short>(type: "smallint", nullable: false),
                    creation_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    creator_id = table.Column<Guid>(type: "uuid", nullable: true),
                    employee_id = table.Column<Guid>(type: "uuid", nullable: true),
                    schedule_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_availabilities", x => x.availability_id);
                    table.ForeignKey(
                        name: "FK_availabilities_schedules_schedule_id",
                        column: x => x.schedule_id,
                        principalSchema: "accessibility",
                        principalTable: "schedules",
                        principalColumn: "schedule_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_availabilities_schedule_id",
                schema: "accessibility",
                table: "availabilities",
                column: "schedule_id");

            migrationBuilder.CreateIndex(
                name: "IX_booked_records_booking_id",
                schema: "booking",
                table: "booked_records",
                column: "booking_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "availabilities",
                schema: "accessibility");

            migrationBuilder.DropTable(
                name: "booked_records",
                schema: "booking");

            migrationBuilder.DropTable(
                name: "offers",
                schema: "facility");

            migrationBuilder.DropTable(
                name: "outbox_notifications",
                schema: "app");

            migrationBuilder.DropTable(
                name: "schedules",
                schema: "accessibility");

            migrationBuilder.DropTable(
                name: "bookings",
                schema: "booking");
        }
    }
}
