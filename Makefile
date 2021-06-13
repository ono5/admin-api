.PHONY: create-user create-product create-order up

# テストデータ作成
create-user:
	docker-compose run --rm backend sh -c "go run src/commands/user/populateUsers.go"

create-product:
	docker-compose run --rm backend sh -c "go run src/commands/product/populateProducts.go"

create-order:
	docker-compose run --rm backend sh -c "go run src/commands/order/populateOrders.go"

# コンテナ起動
up:
	docker-compose up
