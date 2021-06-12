// productController.go
package controllers

import (
	"admin/src/database"
	"admin/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func Products(ctx *fiber.Ctx) error {
	var products []models.Product

	// 全てのプロダクトを取得
	database.DB.Find(&products)

	return ctx.JSON(products)
}

func CreateProducts(ctx *fiber.Ctx) error {
	var product models.Product

	// リクエストデータをパースする
	if err := ctx.BodyParser(&product); err != nil {
		return err
	}

	// プロダクト取得
	database.DB.Create(&product)

	return ctx.JSON(product)
}

func GetProduct(ctx *fiber.Ctx) error {
	// リクエストからIDを取得
	id, _ := strconv.Atoi(ctx.Params("id"))

	var product models.Product
	product.ID = uint(id)

	// プロダクト検索
	database.DB.Find(&product)

	return ctx.JSON(product)
}

func UpdateProduct(ctx *fiber.Ctx) error {
	// リクエストからIDを取得
	id, _ := strconv.Atoi(ctx.Params("id"))

	product := models.Product{}
	product.ID = uint(id)

	if err := ctx.BodyParser(&product); err != nil {
		return err
	}

	// プロダクト更新
	database.DB.Model(&product).Updates(&product)

	return ctx.JSON(product)
}

func DeleteProduct(ctx *fiber.Ctx) error {
	// リクエストからIDを取得
	id, _ := strconv.Atoi(ctx.Params("id"))

	product := models.Product{}
	product.ID = uint(id)

	// プロダクト削除
	database.DB.Delete(&product)

	return nil
}
