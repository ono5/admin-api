.PHONY: create-user up

# テストデータ作成
create-user:
	docker-compose run --rm backend sh -c "go run src/commands/populateUsers.go"

# コンテナ起動
up:
	docker-compose up
