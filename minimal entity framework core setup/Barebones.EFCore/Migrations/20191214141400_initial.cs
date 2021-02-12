using Microsoft.EntityFrameworkCore.Migrations;

namespace Barebones.EFCore.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SomeModels",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FieldOne = table.Column<string>(nullable: true),
                    FieldTwo = table.Column<string>(nullable: true),
                    FieldThree = table.Column<string>(nullable: true),
                    FieldFour = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SomeModels", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SomeModels");
        }
    }
}
