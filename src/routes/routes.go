// routes/routes.go
package routes

import (
	"admin/src/controllers"
	"admin/src/middleware"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	// GROUP
	api := app.Group("api")
	admin := api.Group("admin")

	// No Middleware
	admin.Post("register", controllers.Register)
	admin.Post("login", controllers.Login)

	// Middleware
	adminAuthenticated := admin.Use(middleware.IsAuthenticate)
	adminAuthenticated.Post("logout", controllers.Logout)
	adminAuthenticated.Get("user", controllers.User)
	adminAuthenticated.Post("info", controllers.UpdateInfo)
}
