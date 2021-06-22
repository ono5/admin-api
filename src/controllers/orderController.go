// controllers/orderController.go
package controllers

import (
	"admin/src/database"
	"admin/src/models"

	"github.com/gofiber/fiber/v2"
)

func Orders(ctx *fiber.Ctx) error {
	var orders []models.Order

	// DB検索
	database.DB.Preload("OrderItems").Find(&orders)

	for i, order := range orders {
		orders[i].Name = order.FullName()
		orders[i].Total = order.GetTotal()
	}

	return ctx.JSON(orders)
}

type CreateOrderRequest struct {
	Code      string
	FirstName string
	LastName  string
	Email     string
	Address   string
	Country   string
	City      string
	Zip       string
	Products  []map[string]int
}

func CreateOrder(ctx *fiber.Ctx) error {
	var request CreateOrderRequest

	// リクエストデータを取得
	if err := ctx.BodyParser(&request); err != nil {
		return err
	}

	// リクエストからコードを抜き出す
	link := models.Link{
		Code: request.Code,
	}

	// DB検索
	database.DB.Preload("User").First(&link)

	// 該当データがない場合はエラー
	if link.ID == 0 {
		ctx.Status(fiber.StatusBadRequest)
		return ctx.JSON(fiber.Map{
			"message": "無効なリンクです",
		})
	}

	// Orderを作成する
	order := models.Order{
		Code:            link.Code,
		UserID:          link.UserID,
		AmbassadorEmail: link.User.Email,
		FirstName:       request.FirstName,
		LastName:        request.LastName,
		Email:           request.Email,
		Address:         request.Address,
		Country:         request.Country,
		City:            request.City,
		Zip:             request.Zip,
	}

	// OrderをDBに保存
	database.DB.Create(&order)

	// リクエストからプロダクトを取得
	for _, requestProduct := range request.Products {
		product := models.Product{}
		product.ID = uint(requestProduct["product_id"])

		// productをDBに保存
		database.DB.First(&product)

		// トータルを算出
		total := product.Price * float64(requestProduct["quantity"])

		// OrderItemを作成
		item := models.OrderItem{
			OrderID:           order.ID,
			ProductTitle:      product.Title,
			Price:             product.Price,
			Quantity:          uint(requestProduct["quantity"]),
			AmbassadorRevenue: 0.1 * total,
			AdminRevenue:      0.9 * total,
		}

		// OrderItemをDBに保存
		database.DB.Create(&item)
	}

	return ctx.JSON(order)
}
