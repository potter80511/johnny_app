# 使用 Node.js 作為基礎映像
FROM node:18

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 yarn.lock 並安裝依賴
COPY package.json yarn.lock ./
RUN yarn install

# 複製應用程式原始碼
COPY . .

# 建立 Next.js 應用
RUN yarn build

# 暴露應用程式埠
EXPOSE 3000

# 啟動應用程式
CMD ["sh", "-c", "yarn install && yarn dev"]
