.PHONY: create-user create-product up

# テストデータ作成
create-user:
	docker-compose run --rm backend sh -c "go run src/commands/user/populateUsers.go"

create-product:
	docker-compose run --rm backend sh -c "go run src/commands/product/populateProducts.go"

# コンテナ起動
up:
	docker-compose up
