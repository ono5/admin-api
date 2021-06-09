// auth.go

package middleware

import (
	"strconv"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func IsAuthenticate(ctx *fiber.Ctx) error {
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

	if err != nil || !token.Valid {
		ctx.Status(fiber.StatusUnauthorized) // 401
		return ctx.JSON(fiber.Map{
			"message": "認証がされていません",
		})
	}

	return ctx.Next()
}

func GetUserID(ctx *fiber.Ctx) (uint, error) {
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
		return 0, err
	}

	payload := token.Claims.(*jwt.StandardClaims)
	id, _ := strconv.Atoi(payload.Subject)
	return uint(id), nil
}
