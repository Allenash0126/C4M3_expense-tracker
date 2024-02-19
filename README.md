#  家庭記帳本 (Expense-tracker)


## 功能
- 使用者可以登入、登出、註冊自己的帳戶
- 使用者的密碼經加密處理
- 使用者可以新增一筆紀錄
- 使用者僅可瀏覽本人的所有紀錄、不可看到其他使用者的紀錄
- 使用者可以修改一筆紀錄
- 使用者可以刪除一筆紀錄
- 上述功能執行成功與否，會有對應的訊息通知
- 使用者可依類別篩選出對應的紀錄


### 安裝
- 取得相關github資源：
https://github.com/Allenash0126/C4M3_expense-tracker.git

- 進入該路徑：
cd C4M3_expense-tracker

- 安裝 npm：
npm install

-  MySQL server 連線之預設設定如下：
host: '127.0.0.1'  // localhost, 
username: 'root', 
password: 'password', 
database: 'track', 'user', 'category'

- 分別執行資料庫建立、資料表建立、匯入種子資料：
npx sequelize db:migrate, 
npx sequelize db:seed:all

- 啟動專案： 
npm run dev

- 打開瀏覽器：
enter http://localhost:3000, 
you will see: express server is running on http://localhost:3000

### 工具（Tools）
- Visual Studio Code
- Express
- Express-Handlebars