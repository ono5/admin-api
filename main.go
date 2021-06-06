package main

import (
	"admin/src/database"
	"admin/src/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// Connection To Mysql
	database.Connect()
	// Migration
	database.AutoMigrate()

	// fiber API
	app := fiber.New()

	// Setup Routes
	routes.Setup(app)

	app.Listen(":3000")
}
