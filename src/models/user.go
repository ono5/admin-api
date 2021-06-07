// models/user.go
package models

import "golang.org/x/crypto/bcrypt"

type User struct {
	ID          uint
	FirstName   string
	LastName    string
	Email       string
	Password    []byte
	IsAmbassdor bool
}

func (u *User) SetPassword(pwd string) {
	// ハッシュパスワードを作成
	hashPwd, _ := bcrypt.GenerateFromPassword([]byte(pwd), 12)
	u.Password = hashPwd
}

func (u *User) ComparePassword(pwd string) error {
	return bcrypt.CompareHashAndPassword(u.Password, []byte(pwd))
}
