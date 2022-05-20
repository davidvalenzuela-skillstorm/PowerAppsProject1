using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Control_Tower.Migrations
{
    public partial class NowWeHaveBookings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightPassenger");

            migrationBuilder.DropColumn(
                name: "FlightID",
                table: "Passengers");

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FlightID = table.Column<int>(type: "int", nullable: false),
                    PassengerID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.AddColumn<int>(
                name: "FlightID",
                table: "Passengers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FlightPassenger",
                columns: table => new
                {
                    FlightID = table.Column<int>(type: "int", nullable: false),
                    PassengersID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightPassenger", x => new { x.FlightID, x.PassengersID });
                    table.ForeignKey(
                        name: "FK_FlightPassenger_Flights_FlightID",
                        column: x => x.FlightID,
                        principalTable: "Flights",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FlightPassenger_Passengers_PassengersID",
                        column: x => x.PassengersID,
                        principalTable: "Passengers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlightPassenger_PassengersID",
                table: "FlightPassenger",
                column: "PassengersID");
        }
    }
}
