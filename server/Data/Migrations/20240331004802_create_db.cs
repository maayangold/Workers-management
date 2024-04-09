using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class create_db : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Job",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    role = table.Column<int>(type: "int", nullable: false),
                    managerial = table.Column<bool>(type: "bit", nullable: false),
                    startOfJob = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Job", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Workers",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tz = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    startOfWork = table.Column<DateTime>(type: "datetime2", nullable: false),
                    birthdate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    gender = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workers", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "JobWorker",
                columns: table => new
                {
                    jobsid = table.Column<int>(type: "int", nullable: false),
                    workersid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobWorker", x => new { x.jobsid, x.workersid });
                    table.ForeignKey(
                        name: "FK_JobWorker_Job_jobsid",
                        column: x => x.jobsid,
                        principalTable: "Job",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobWorker_Workers_workersid",
                        column: x => x.workersid,
                        principalTable: "Workers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobWorker_workersid",
                table: "JobWorker",
                column: "workersid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobWorker");

            migrationBuilder.DropTable(
                name: "Job");

            migrationBuilder.DropTable(
                name: "Workers");
        }
    }
}
