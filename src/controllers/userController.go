// userController.go
package controllers

import (
	"admin/src/database"
	"admin/src/models"

	"github.com/gofiber/fiber/v2"
)

func Ambassadors(ctx *fiber.Ctx) error {
	var users []models.User

	database.DB.Where("is_ambassador = true").Find(&users)

	return ctx.JSON(users)
}

func Ranking(ctx *fiber.Ctx) error {
	var users []models.User

	// ambassadorデータを検索
	database.DB.Find(&users, models.User{
		IsAmbassador: true,
	})

	var results []interface{}
	for _, user := range users {
		// userにambassadorの型を持たせる
		ambassador := models.Ambassador(user)
		// Revenueを計算
		ambassador.CalculateRevenue(database.DB)
		// key: ユーザー名, value: お買い上げ金
		results = append(results, fiber.Map{
			user.Name(): ambassador.Revenue,
		})
	}

	return ctx.JSON(results)
}
