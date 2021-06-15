// productController.go
package controllers

import (
	"admin/src/database"
	"admin/src/models"
	"context"
	"encoding/json"
	"strconv"
	"time"

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

func ProductFrontend(ctx *fiber.Ctx) error {
	var products []models.Product
	var c = context.Background()
	redisKey := "products_frontend"
	expiredTime := 30 * time.Minute

	// products_frontend keyでRedisからデータを取得
	result, err := database.Cache.Get(c, redisKey).Result()
	if err != nil {
		database.DB.Find(&products)

		// Redisにデータを格納するため、エンコードする
		productBytes, err := json.Marshal(&products)
		if err != nil {
			panic(err)
		}

		// products_fronend keyでRedisにデータを格納
		err = database.Cache.Set(c, redisKey, productBytes, expiredTime).Err()
		if err != nil {
			panic(err)
		}
	} else {
		// デコードする
		json.Unmarshal([]byte(result), &products)
	}
	return ctx.JSON(products)
}
