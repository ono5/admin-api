// models/user.go
package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	Model
	FirstName    string   `json:"first_name"`
	LastName     string   `json:"last_name"`
	Email        string   `json:"email" gorm:"unique"`
	Password     []byte   `json:"-"`
	IsAmbassador bool     `json:"-"`
	Revenue      *float64 `json:"revenue,omitempty" gorm:"-"` // 空の場合はエンコードから除外
}

func (u *User) SetPassword(pwd string) {
	// ハッシュパスワードを作成
	hashPwd, _ := bcrypt.GenerateFromPassword([]byte(pwd), 12)
	u.Password = hashPwd
}

func (u *User) ComparePassword(pwd string) error {
	return bcrypt.CompareHashAndPassword(u.Password, []byte(pwd))
}

type Admin User

func (a *Admin) CalculateRevenue(db *gorm.DB) {
	var orders []Order
	// Preloadで他のSQL内のリレーションを事前読み込む
	db.Preload("OrderItems").Find(&orders, &Order{
		UserID:   a.ID,
		Complete: true,
	})

	var revenue float64 = 0.0

	for _, order := range orders {
		for _, orderItem := range order.OrderItems {
			revenue += orderItem.AdminRevenue
		}
	}

	a.Revenue = &revenue

}

type Ambassador User

func (a *Ambassador) CalculateRevenue(db *gorm.DB) {
	var orders []Order
	// Preloadで他のSQL内のリレーションを事前読み込む
	db.Preload("OrderItems").Find(&orders, &Order{
		UserID:   a.ID,
		Complete: true,
	})

	var revenue float64 = 0.0

	for _, order := range orders {
		for _, orderItem := range order.OrderItems {
			revenue += orderItem.AmbassadorRevenue
		}
	}

	a.Revenue = &revenue
}
