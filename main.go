package main

import (
	"admin/src/database"
	"admin/src/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// Connection To Mysql
	database.Connect()
	// Migration
	database.AutoMigrate()

	// fiber API
	app := fiber.New()

	// CORSの設定
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	// Setup Routes
	routes.Setup(app)

	app.Listen(":3000")
}
