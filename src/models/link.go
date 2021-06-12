// link.go
package models

type Link struct {
	Model
	Code     string    `json:"code"`
	UserID   uint      `json:"user_id"`
	User     User      `json:"user" gorm:"foreignKey:UserID"`
	Products []Product `json:"products" gorm:"many2many:link_products"`
}
