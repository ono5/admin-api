// linkController.go
package controllers

import (
	"admin/src/database"
	"admin/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func Link(ctx *fiber.Ctx) error {
	id, _ := strconv.Atoi(ctx.Params("id"))

	var links []models.Link

	database.DB.Where("user_id = ?", id).Find(&links)

	for i, link := range links {
		var orders []models.Order
		database.DB.Where("code = ? and complete = true", link.Code).Find(&orders)

		links[i].Orders = orders
	}

	return ctx.JSON(links)
}
