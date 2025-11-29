# 部署指南 - Deploy to Vercel

## 🚀 部署步驟 (Step-by-Step)

### 步驟 1: 準備 Git Repository

```bash
# 進入專案根目錄
cd /Users/john/work/john/fukuoka-2025

# 初始化 Git（如果還沒有）
git init

# 新增所有檔案
git add .

# 提交
git commit -m "Add Fukuoka 2025 itinerary website"

# 在 GitHub 建立新的 repository
# 前往 https://github.com/new
# 建立名為 "fukuoka-2025" 的 repository

# 連接到 GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/fukuoka-2025.git

# 推送
git push -u origin main
```

### 步驟 2: 部署到 Vercel

#### 方法 A: 通過 Vercel 網站（最簡單）

1. 前往 [https://vercel.com](https://vercel.com)

2. 使用 GitHub 帳號登入

3. 點擊 "Add New Project"

4. 選擇 "Import Git Repository"

5. 找到並選擇你的 `fukuoka-2025` repository

6. **重要配置：**
   - Framework Preset: **Next.js**
   - Root Directory: **website**  ← 這很重要！
   - Build Command: `npm run build`（自動檢測）
   - Output Directory: 留空
   - Install Command: `npm install`（自動檢測）

7. 點擊 "Deploy"

8. 等待 2-3 分鐘，部署完成！

9. 你會獲得一個網址：`https://fukuoka-2025-xxx.vercel.app`

#### 方法 B: 通過 Vercel CLI

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 登入
vercel login

# 進入 website 目錄
cd website

# 部署
vercel

# 部署到生產環境
vercel --prod
```

### 步驟 3: 設定自定義域名（可選）

1. 在 Vercel 專案設定中
2. 前往 "Domains"
3. 添加你的自定義域名
4. 按照指示配置 DNS

### 步驟 4: 自動部署

Vercel 已經自動配置好 CI/CD！

每次你推送新的提交到 GitHub：
```bash
git add .
git commit -m "Update itinerary"
git push
```

Vercel 會自動檢測並重新部署（約 1-2 分鐘）

### 步驟 5: 分享你的網站

部署完成後，你可以：
- 📱 在手機上查看行程
- 🔗 分享網址給旅伴
- 📋 追蹤預約進度
- ⏰ 查看倒數計時

## 🔧 常見問題

### Q: 為什麼部署失敗？
A: 確認 Root Directory 設定為 `website`，而不是專案根目錄

### Q: 如何更新網站內容？
A: 修改 `data/itinerary.json` 或 `data/reservations.json`，然後 git push

### Q: 網站是免費的嗎？
A: 是的！Vercel 提供免費的 Hobby 方案，足夠個人使用

### Q: 如何查看部署日誌？
A: 在 Vercel Dashboard 中點擊部署記錄，可以查看詳細日誌

### Q: 可以設定密碼保護嗎？
A: Vercel 提供 Password Protection 功能（需要 Pro 方案）

## 📱 使用提示

### 添加到手機主畫面

**iOS Safari:**
1. 訪問你的網站
2. 點擊分享按鈕
3. 選擇「加入主畫面」
4. 像 App 一樣使用！

**Android Chrome:**
1. 訪問你的網站
2. 點擊選單
3. 選擇「加到主畫面」
4. 完成！

## 🎉 完成！

現在你有一個漂亮的旅遊規劃網站了！

網站連結格式：`https://your-project.vercel.app`

---

**祝你福岡之旅愉快！🌸**

