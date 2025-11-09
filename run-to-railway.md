# 🚂 راهنمای دیپلوی پروژه در Railway

## 📋 مقدمه

**Railway** یک پلتفرم ابری است که دیپلوی و مدیریت اپلیکیشن‌ها را بسیار ساده می‌کند. این راهنما به شما کمک می‌کند تا پروژه Fabulous Nails & Spa را روی Railway دیپلوی کنید.

---

## 🎯 پیش‌نیازها

### 1. ساخت حساب کاربری Railway:
- به [railway.app](https://railway.app) بروید
- روی "Start a New Project" کلیک کنید
- با GitHub یا Email ثبت‌نام کنید
- ✅ اکانت رایگان شامل **$5 اعتبار رایگان** ماهانه است

### 2. نصب Railway CLI (اختیاری اما توصیه می‌شود):

**Windows (با npm):**
```bash
npm install -g @railway/cli
```

**macOS (با Homebrew):**
```bash
brew install railway
```

**Linux:**
```bash
bash <(curl -fsSL cli.new/railway)
```

**تست نصب:**
```bash
railway --version
```

### 3. آماده‌سازی کد:
- کد خود را در GitHub یا GitLab قرار دهید
- یا از Railway CLI برای دیپلوی مستقیم استفاده کنید

---

## 🗄️ مرحله 1: راه‌اندازی MongoDB در Railway

### 1.1 ورود به Railway:
```bash
railway login
```
یک صفحه مرورگر باز می‌شود، ورود خود را تأیید کنید.

### 1.2 ایجاد پروژه جدید:
```bash
railway init
# نام پروژه را وارد کنید: fabulous-nails
```

یا از داشبورد Railway:
- "New Project" → "Empty Project" را انتخاب کنید
- نام پروژه: `fabulous-nails`

### 1.3 اضافه کردن MongoDB:

**روش 1: از طریق داشبورد (آسان‌تر):**
1. وارد پروژه خود شوید
2. "New" → "Database" → "Add MongoDB" کلیک کنید
3. Railway به صورت خودکار یک نمونه MongoDB راه‌اندازی می‌کند
4. به تب "Variables" بروید و `MONGO_URL` را کپی کنید

**روش 2: از طریق CLI:**
```bash
railway add --database mongodb
```

### 1.4 دریافت اطلاعات اتصال MongoDB:
```bash
railway variables
# یا
railway variables --json
```

یا از داشبورد:
- به سرویس MongoDB بروید
- تب "Connect" را انتخاب کنید
- "Mongo Connection URL" را کپی کنید

**⚠️ نکته مهم:** این URL را در یک جای امن ذخیره کنید!

فرمت URL:
```
mongodb://mongo:<password>@<host>:<port>
```

---

## 🔧 مرحله 2: آماده‌سازی Backend برای دیپلوی

### 2.1 بررسی فایل‌های مورد نیاز:
مطمئن شوید فایل‌های زیر در پوشه `backend` وجود دارند:

**`requirements.txt`** (وابستگی‌های Python)
**`server.py`** (فایل اصلی Backend)

### 2.2 ایجاد فایل `Procfile`:
در ریشه پروژه (یا در پوشه `backend`) فایلی به نام `Procfile` بسازید:

```bash
# محتوای Procfile
web: uvicorn server:app --host 0.0.0.0 --port $PORT
```

**توضیح:**
- `web:` → نوع سرویس
- `uvicorn` → ASGI server برای اجرای FastAPI
- `$PORT` → پورتی که Railway تخصیص می‌دهد

### 2.3 ایجاد فایل `railway.json` (اختیاری):
برای تنظیمات پیشرفته‌تر:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn server:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2.4 آپدیت کردن فایل `server.py`:

مطمئن شوید در فایل `server.py` کد زیر وجود دارد:

```python
import os
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

# دریافت متغیرهای محیطی
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'fabulous_nails')

# اتصال به MongoDB
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI()

# CORS برای دسترسی Frontend
from starlette.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**⚠️ نکته امنیتی:** در Production، `CORS_ORIGINS` را به آدرس Frontend خود محدود کنید.

---

## 🚀 مرحله 3: دیپلوی Backend در Railway

### 3.1 دیپلوی از طریق GitHub (توصیه می‌شود):

**الف) کد را در GitHub قرار دهید:**
```bash
git init
git add .
git commit -m "Initial commit for Railway deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

**ب) در Railway، پروژه را به GitHub متصل کنید:**
1. در داشبورد Railway: "New" → "GitHub Repo"
2. ریپازیتوری خود را انتخاب کنید
3. Root Directory را روی `/backend` تنظیم کنید (اگر Backend در زیرپوشه است)
4. "Deploy Now" را کلیک کنید

### 3.2 دیپلوی از طریق CLI:

```bash
# وارد پوشه backend شوید
cd backend

# لینک کردن به پروژه Railway
railway link

# دیپلوی کردن
railway up
```

Railway به صورت خودکار:
- Dependencies را نصب می‌کند (`pip install -r requirements.txt`)
- Backend را Build می‌کند
- Backend را روی یک URL عمومی دیپلوی می‌کند

### 3.3 تنظیم Environment Variables برای Backend:

**از طریق داشبورد:**
1. به سرویس Backend بروید
2. تب "Variables" را انتخاب کنید
3. متغیرهای زیر را اضافه کنید:

```env
MONGO_URL=<آدرس MongoDB که در مرحله 1.4 کپی کردید>
DB_NAME=fabulous_nails
CORS_ORIGINS=*
```

**از طریق CLI:**
```bash
railway variables --set MONGO_URL="mongodb://..."
railway variables --set DB_NAME="fabulous_nails"
railway variables --set CORS_ORIGINS="*"
```

### 3.4 دریافت URL عمومی Backend:

**از طریق داشبورد:**
1. به سرویس Backend بروید
2. تب "Settings" → "Public Networking" → "Generate Domain"
3. یک دامنه مانند `fabulous-nails-backend.up.railway.app` دریافت می‌کنید

**از طریق CLI:**
```bash
railway domain
```

**⚠️ نکته مهم:** این URL را یادداشت کنید، برای Frontend نیاز دارید!

### 3.5 تست Backend:
```bash
curl https://<your-backend-url>.up.railway.app/api/services
```

یا در مرورگر:
```
https://<your-backend-url>.up.railway.app/docs
```

باید Swagger UI را ببینید! ✅

---

## 🎨 مرحله 4: آماده‌سازی و دیپلوی Frontend

### 4.1 آپدیت فایل `.env` در Frontend:

در پوشه `frontend`، فایل `.env` را ویرایش کنید:

```env
# آدرس Backend از Railway
VITE_BACKEND_URL=https://<your-backend-url>.up.railway.app
```

**⚠️ توجه:** حتماً `https://` را در آدرس قرار دهید.

### 4.2 آپدیت `package.json` برای Build:

مطمئن شوید در `package.json` دستورات زیر وجود دارند:

```json
{
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 4.3 ایجاد فایل `Procfile` برای Frontend:

در پوشه `frontend` (یا در ریشه اگر Frontend در root است):

```bash
# Procfile
web: npm run preview -- --port $PORT --host 0.0.0.0
```

### 4.4 ایجاد اسکریپت Build:

در `package.json`، اطمینان حاصل کنید:

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 4.5 دیپلوی Frontend:

**روش 1: از طریق GitHub:**
1. در Railway: "New" → "GitHub Repo" (همان ریپازیتوری)
2. Root Directory: `/frontend`
3. Build Command: `yarn build`
4. Start Command: `yarn preview --port $PORT --host 0.0.0.0`

**روش 2: از طریق CLI:**
```bash
cd frontend
railway link
railway up
```

### 4.6 تنظیم Environment Variables برای Frontend:

```bash
railway variables --set VITE_BACKEND_URL="https://<backend-url>.up.railway.app"
```

یا از داشبورد:
- Variables → Add Variable
- Key: `VITE_BACKEND_URL`
- Value: `https://<backend-url>.up.railway.app`

### 4.7 دریافت URL عمومی Frontend:

1. به سرویس Frontend بروید
2. Settings → "Generate Domain"
3. یک URL مانند `fabulous-nails.up.railway.app` دریافت می‌کنید

### 4.8 آپدیت CORS در Backend:

حالا که URL Frontend دارید، CORS را محدود کنید:

1. برگردید به سرویس Backend
2. Variables → Edit `CORS_ORIGINS`
3. مقدار جدید:
```
https://<frontend-url>.up.railway.app
```

---

## 🔄 مرحله 5: بررسی و تست نهایی

### 5.1 بررسی لاگ‌ها:

**از طریق داشبورد:**
- به هر سرویس بروید
- تب "Deployments" → آخرین Deployment → "View Logs"

**از طریق CLI:**
```bash
# Backend logs
railway logs --service backend

# Frontend logs
railway logs --service frontend

# تمام logs
railway logs
```

### 5.2 تست Backend:
```bash
curl https://<backend-url>.up.railway.app/api/services
```

### 5.3 تست Frontend:
- در مرورگر به `https://<frontend-url>.up.railway.app` بروید
- صفحه اصلی باید نمایش داده شود
- ورود به پنل ادمین:
  - آدرس: `https://<frontend-url>.up.railway.app/admin/login`
  - نام کاربری: `admin`
  - رمز عبور: `admin123`

### 5.4 تست ارتباط Frontend-Backend:
1. وارد پنل ادمین شوید
2. یک سرویس جدید اضافه کنید
3. به صفحه اصلی برگردید و سرویس را مشاهده کنید

اگر همه‌چیز کار می‌کند، تبریک! 🎉 پروژه شما روی Railway دیپلوی شده است!

---

## 🐛 عیب‌یابی مشکلات رایج

### مشکل 1: Backend راه‌اندازی نمی‌شود

**خطا: `ModuleNotFoundError`**

**راه حل:**
- مطمئن شوید `requirements.txt` کامل است
- لاگ‌ها را چک کنید: `railway logs`
- Build را مجدداً اجرا کنید: `railway up --detach`

**خطا: `Connection to MongoDB refused`**

**راه حل:**
- `MONGO_URL` را در Variables چک کنید
- مطمئن شوید MongoDB service در حال اجرا است
- آدرس MongoDB را دوباره کپی کنید

```bash
# بررسی variables
railway variables

# تست اتصال
railway run python -c "from pymongo import MongoClient; print(MongoClient(os.environ['MONGO_URL']).server_info())"
```

---

### مشکل 2: Frontend به Backend متصل نمی‌شود

**خطا: `CORS Error` یا `Failed to fetch`**

**راه حل 1: بررسی Environment Variables:**
```bash
# Frontend variables
railway variables --service frontend

# باید VITE_BACKEND_URL را ببینید
```

**راه حل 2: بررسی CORS در Backend:**
```bash
# Backend variables
railway variables --service backend

# CORS_ORIGINS باید شامل آدرس Frontend باشد
```

**راه حل 3: Hard Refresh مرورگر:**
- `Ctrl + Shift + R` (Windows/Linux)
- `Cmd + Shift + R` (Mac)

**راه حل 4: بررسی Build:**
```bash
# Frontend را دوباره Build کنید
cd frontend
railway up --detach
```

---

### مشکل 3: Application Crashes بعد از مدتی

**دلیل: کمبود منابع یا Memory Leak**

**راه حل:**

1. **بررسی استفاده از منابع:**
   - به داشبورد Railway بروید
   - Metrics → CPU & Memory Usage را چک کنید

2. **افزایش منابع (در صورت نیاز):**
   - Settings → "Resources"
   - Memory Limit را افزایش دهید

3. **فعال کردن Auto-restart:**
```json
// در railway.json
{
  "deploy": {
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

4. **بررسی لاگ‌های Crash:**
```bash
railway logs --deployment <deployment-id>
```

---

### مشکل 4: دیپلوی Fail می‌شود

**راه حل:**

1. **بررسی لاگ‌های Build:**
```bash
railway logs --deployment <deployment-id>
```

2. **بررسی فایل‌های مورد نیاز:**
- `requirements.txt` (Backend)
- `package.json` (Frontend)
- `Procfile`

3. **تست Local Build:**
```bash
# Backend
pip install -r requirements.txt
uvicorn server:app

# Frontend
yarn install
yarn build
yarn preview
```

4. **پاک کردن Cache و Build مجدد:**
```bash
railway down
railway up --detach
```

---

## 📊 مرحله 6: مانیتورینگ و مدیریت

### 6.1 مشاهده Metrics:

**از داشبورد:**
- به هر سرویس بروید
- تب "Metrics" را انتخاب کنید
- CPU, Memory, Network را مشاهده کنید

**از CLI:**
```bash
railway status
```

### 6.2 مدیریت Deployments:

```bash
# لیست Deployments
railway deployments

# Rollback به نسخه قبلی
railway rollback <deployment-id>

# Restart سرویس
railway restart
```

### 6.3 مشاهده Real-time Logs:

```bash
# تمام logs
railway logs --follow

# فقط Backend
railway logs --service backend --follow

# فقط Frontend
railway logs --service frontend --follow
```

### 6.4 تنظیم Webhooks (اختیاری):

برای اطلاع از Deployments:
1. Settings → Webhooks
2. URL خود را اضافه کنید (مثلاً Slack, Discord)
3. Events مورد نظر را انتخاب کنید

---

## 💰 مدیریت هزینه‌ها

### برنامه رایگان (Starter):
- ✅ $5 اعتبار ماهانه
- ✅ 512 MB RAM
- ✅ 1 GB Disk
- ✅ Shared CPU

### نکات برای کاهش هزینه:

1. **استفاده بهینه از منابع:**
```bash
# خاموش کردن سرویس‌های غیرضروری
railway down --service <service-name>

# راه‌اندازی مجدد در صورت نیاز
railway up --service <service-name>
```

2. **حذف Deployments قدیمی:**
- Deployments → Select → Delete

3. **استفاده از MongoDB Atlas رایگان:**
- به جای MongoDB Railway، از [MongoDB Atlas Free Tier](https://www.mongodb.com/cloud/atlas/register) استفاده کنید
- 512 MB رایگان برای همیشه

### ارتقا به برنامه پولی:

اگر نیاز بیشتری دارید:
- Developer Plan: $20/ماه
- Team Plan: $100/ماه

---

## 🔒 بهبود امنیت در Production

### 1. تغییر اطلاعات پیش‌فرض:

**رمز عبور ادمین:**
در `backend/server.py`:
```python
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')
```

سپس در Railway Variables:
```bash
railway variables --set ADMIN_USERNAME="your-username"
railway variables --set ADMIN_PASSWORD="your-strong-password"
```

### 2. محدود کردن CORS:

به جای `*`، فقط آدرس Frontend را اجازه دهید:
```bash
railway variables --set CORS_ORIGINS="https://your-frontend.up.railway.app"
```

### 3. فعال کردن HTTPS (به صورت پیش‌فرض فعال است):

Railway به صورت خودکار SSL Certificate ارائه می‌دهد.

### 4. استفاده از Secrets برای اطلاعات حساس:

```bash
# به جای Variables معمولی
railway variables --set --secret ADMIN_PASSWORD="..."
```

### 5. Rate Limiting (اختیاری):

در `server.py`:
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get("/api/services")
@limiter.limit("100/minute")
async def get_services(request: Request):
    # ...
```

---

## 🔄 مرحله 7: آپدیت و به‌روزرسانی

### آپدیت خودکار از GitHub:

اگر از GitHub استفاده می‌کنید:
1. کد خود را تغییر دهید
2. Commit و Push کنید:
```bash
git add .
git commit -m "Update features"
git push
```
3. Railway به صورت خودکار دیپلوی جدید را شروع می‌کند! 🚀

### آپدیت دستی از CLI:

```bash
cd <project-directory>
railway up
```

### Rollback به نسخه قبلی:

```bash
# لیست Deployments
railway deployments

# Rollback
railway rollback <deployment-id>
```

---

## 🌐 اتصال دامنه سفارشی (Custom Domain)

### 1. اضافه کردن دامنه:

**از داشبورد:**
1. به سرویس Frontend بروید
2. Settings → Domains → "Add Domain"
3. دامنه خود را وارد کنید: `yourdomain.com`

**از CLI:**
```bash
railway domain add yourdomain.com
```

### 2. تنظیم DNS:

در پنل دامنه خود (مثل Namecheap, GoDaddy):

**رکورد A:**
```
Type: A
Name: @
Value: <Railway IP Address>
```

**رکورد CNAME:**
```
Type: CNAME
Name: www
Value: <your-app>.up.railway.app
```

### 3. بررسی اتصال:

ممکن است 24-48 ساعت طول بکشد تا DNS به‌روزرسانی شود.

```bash
# بررسی DNS
nslookup yourdomain.com

# یا
dig yourdomain.com
```

---

## 📚 منابع مفید

### مستندات Railway:
- [Railway Documentation](https://docs.railway.app/)
- [Railway CLI Reference](https://docs.railway.app/develop/cli)
- [Railway Pricing](https://railway.app/pricing)

### جامعه Railway:
- [Discord Community](https://discord.gg/railway)
- [GitHub Discussions](https://github.com/railwayapp/railway/discussions)

### آموزش‌های مفید:
- [Deploying FastAPI on Railway](https://docs.railway.app/guides/fastapi)
- [Deploying React Apps](https://docs.railway.app/guides/react)

---

## ✅ Checklist نهایی

قبل از Production:

- [ ] MongoDB راه‌اندازی شده و MONGO_URL تنظیم شده
- [ ] Backend دیپلوی شده و URL عمومی دارد
- [ ] Frontend دیپلوی شده و به Backend متصل است
- [ ] تمام Environment Variables تنظیم شده‌اند
- [ ] CORS به درستی پیکربندی شده
- [ ] رمز عبور پیش‌فرض ادمین تغییر کرده
- [ ] تمام صفحات و فیچرها تست شده‌اند
- [ ] لاگ‌ها چک شده و خطایی وجود ندارد
- [ ] استفاده از منابع مناسب است
- [ ] Monitoring فعال است

---

## 🎉 تبریک!

حالا پروژه شما روی Railway در حال اجرا است و از طریق اینترنت قابل دسترسی است! 🌍

**آدرس‌های عمومی:**
- 🌐 **Frontend:** https://your-app.up.railway.app
- 🔧 **Backend API:** https://your-backend.up.railway.app
- 📚 **API Docs:** https://your-backend.up.railway.app/docs

---

## 🆘 نیاز به کمک؟

اگر مشکلی پیش آمد:

1. **لاگ‌ها را چک کنید:**
```bash
railway logs --follow
```

2. **Variables را بررسی کنید:**
```bash
railway variables
```

3. **از جامعه Railway کمک بگیرید:**
- [Railway Discord](https://discord.gg/railway)
- [Railway Forum](https://help.railway.app/)

4. **مستندات را مطالعه کنید:**
- [Railway Docs](https://docs.railway.app/)

---

**موفق باشید! 🚀✨**
