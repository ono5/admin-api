// linkController.go
package controllers

import (
	"admin/src/database"
	"admin/src/middleware"
	"admin/src/models"
	"fmt"
	"strconv"

	"github.com/bxcodec/faker/v3"
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

type CreateLinkRequest struct {
	ProductIDs []int
}

func CreateLink(ctx *fiber.Ctx) error {
	var request CreateLinkRequest

	// リクエストデータからProductIDを取得
	if err := ctx.BodyParser(&request); err != nil {
		return err
	}

	fmt.Println(request)

	// ユーザーIDを取得
	id, _ := middleware.GetUserID(ctx)

	// リンク作成
	link := models.Link{
		UserID: id,
		Code:   faker.Username(),
	}

	// プロダクトID, ユーザーIDを紐づける
	for _, productID := range request.ProductIDs {
		product := models.Product{}
		product.ID = uint(productID)
		link.Products = append(link.Products, product)
	}

	// DB保存
	database.DB.Create(&link)

	return ctx.JSON(link)
}

func Stats(ctx *fiber.Ctx) error {
	// ユーザーIDを取得
	id, _ := middleware.GetUserID(ctx)

	// DB検索
	var links []models.Link
	database.DB.Find(&links, models.Link{
		UserID: id,
	})

	var result []interface{}
	var orders []models.Order

	for _, link := range links {
		// OrderItemsを先にロードしてからOrderデータを検索
		database.DB.Preload("OrderItems").Find(&orders, &models.Order{
			Code:     link.Code,
			Complete: true,
		})

		var revenue float64 = 0
		for _, order := range orders {
			revenue += order.GetTotal()
		}

		result = append(result, fiber.Map{
			"code":    link.Code,
			"count":   len(orders),
			"revenue": revenue,
		})
	}

	return ctx.JSON(result)
}
