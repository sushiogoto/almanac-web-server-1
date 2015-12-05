
PATH := ./node_modules/.bin:$(PATH)
CLIENT := public
SERVER := ./server.js

build: $(CLIENT) $(SERVER)

$(CLIENT):
	BUNDLE=client NODE_ENV=production webpack --config ./webpack/prod.config.js

$(SERVER):
	BUNDLE=server NODE_ENV=production webpack --config ./webpack/prod.config.js

dev:
	nodemon -x babel-node -w ./api ./api & \
	babel-node ./dev-server & \
	wait

# lint:
# 	eslint api app webpack dev-server.js

test:
	echo THERE ARE NO TESTS YET

clean:
	rm -rf $(CLIENT) $(SERVER)

.PHONY: build dev lint test clean
