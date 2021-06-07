// controllers/auathController.go

package controllers

import (
	"admin/src/database"
	"admin/src/models"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func Register(ctx *fiber.Ctx) error {
	var data map[string]string

	if err := ctx.BodyParser(&data); err != nil {
		return err
	}

	if data["password"] != data["password_confirm"] {
		ctx.Status(fiber.StatusBadRequest) // 400
		return ctx.JSON(fiber.Map{
			"message": "パスワードに誤りがあります",
		})
	}

	// ハッシュパスワードを作成
	pwd, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 12)

	user := models.User{
		FirstName:   data["first_name"],
		LastName:    data["last_name"],
		Email:       data["email"],
		Password:    pwd,
		IsAmbassdor: false,
	}

	// パスワードセット
	user.SetPassword(data["password"])

	// ユーザー作成
	database.DB.Create(&user)

	return ctx.JSON(user)
}

func Login(ctx *fiber.Ctx) error {
	var data map[string]string

	if err := ctx.BodyParser(&data); err != nil {
		return err
	}

	var user models.User
	database.DB.Where("email = ?", data["email"]).First(&user)

	if user.ID == 0 {
		ctx.Status(fiber.StatusBadRequest)
		return ctx.JSON(fiber.Map{
			"message": "ログイン情報に誤りがあります",
		})
	}

	// パスワードチェック
	err := user.ComparePassword(data["password"])
	if err != nil {
		ctx.Status(fiber.StatusBadRequest)
		return ctx.JSON(fiber.Map{
			"message": "ログイン情報に誤りがあります",
		})
	}

	// トークンの発行
	payload := jwt.StandardClaims{
		Subject:   strconv.Itoa(int(user.ID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, payload).SignedString([]byte("secret"))
	if err != nil {
		ctx.Status(fiber.StatusBadRequest)
		return ctx.JSON(fiber.Map{
			"message": "ログイン情報に誤りがあります",
		})
	}

	// Cookieに保存
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	ctx.Cookie(&cookie)

	return ctx.JSON(fiber.Map{
		"message": "success",
	})
}

func User(ctx *fiber.Ctx) error {
	// cookieから情報を取得
	cookie := ctx.Cookies("jwt")

	// token取得
	token, err := jwt.ParseWithClaims(
		cookie,
		&jwt.StandardClaims{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte("secret"), nil
		},
	)

	if err != nil {
		ctx.Status(fiber.StatusUnauthorized) // 401
		return ctx.JSON(fiber.Map{
			"message": "認証がされていません",
		})
	}

	// useridを取得する
	payload := token.Claims.(*jwt.StandardClaims)

	// ユーザー検索
	var user models.User
	database.DB.Where("id = ?", payload.Subject).First(&user)
	return ctx.JSON(user)
}
