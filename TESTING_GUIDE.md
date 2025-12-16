# 🧪 TESTING INSTRUCTIONS - RupeeReady AI

## ✅ System Status

**Backend Server:** http://localhost:8000 (Running in background)
**Frontend App:** http://localhost:3000 (Running in background)
**API Docs:** http://localhost:8000/docs (Interactive testing)

---

## 🎯 What to Test

### 1. **Frontend Dashboard**
Open: http://localhost:3000

**Expected:**
- Dashboard loads with real-time data
- Safe Balance and Tax Vault displayed (synced from backend)
- Data auto-refreshes every 10 seconds
- Shows connection status

**Test Actions:**
- Navigate through the app (Login → Dashboard)
- Check if balance numbers update
- Look for "Live" badge indicating backend connection

---

### 2. **Mock Bank Simulator**

**To Run:**
```powershell
# Open a NEW terminal
cd C:\Users\singh\OneDrive\Desktop\RupeeReady
.\venv\Scripts\python.exe backend/mock_bank.py
```

**What It Does:**
- Simulates income and expense transactions every 15 seconds
- 60% income transactions (Chanakya agent processes)
- 40% expense transactions (Kavach agent approves/blocks)

**Expected Output:**
```
💰 INCOME: Rs.15,000 from Upwork Payment
✅ Chanakya Agent Response:
   Tax Allocated: Rs.3,750
   Safe Balance: Rs.11,250
   
🍽️ EXPENSE: Rs.500 for food
✅ Kavach Agent: APPROVED
   Remaining Balance: Rs.10,750
```

**Watch the Dashboard:**
- Numbers should update in real-time!
- Safe Balance increases with income
- Safe Balance decreases with approved expenses
- Tax Vault grows automatically

---

### 3. **Manual API Testing**

Open: http://localhost:8000/docs

**Test 1: Get Balance**
- Endpoint: `GET /api/user/user_123/balance`
- Click "Try it out" → Execute
- See current balances

**Test 2: Submit Income (Chanakya)**
- Endpoint: `POST /webhook/income`
- Click "Try it out"
- Body:
```json
{
  "user_id": "user_123",
  "amount": 5000,
  "source": "Manual Test Income"
}
```
- Execute and see Chanakya's tax calculation

**Test 3: Check Expense (Kavach)**
- Endpoint: `POST /api/check-expense`
- Click "Try it out"
- Body:
```json
{
  "user_id": "user_123",
  "amount": 200,
  "category": "food"
}
```
- See if Kavach APPROVES or BLOCKS

---

## 🔍 What to Verify

### ✅ Backend Integration Checklist

- [ ] Dashboard shows real balance from Firebase (not mock data)
- [ ] Balance updates when you submit income via API
- [ ] Balance updates when expense is approved
- [ ] Tax Vault increases automatically (Chanakya's AI calculation)
- [ ] Expenses get approved/blocked based on balance (Kavach's AI)
- [ ] Mock bank simulator causes dashboard to update in real-time
- [ ] No errors in browser console (F12 → Console tab)
- [ ] Backend logs show API requests (check terminal)

### ✅ AI Agents Working

**Chanakya (Income Agent):**
- [ ] Calculates tax percentage (10-30%)
- [ ] Splits income into Tax Vault + Safe Balance
- [ ] Updates Firebase database
- [ ] Returns motivational message

**Kavach (Spending Shield):**
- [ ] Checks if balance is sufficient
- [ ] AI evaluates if expense is risky
- [ ] Blocks expenses >50% of balance
- [ ] Approves essential categories
- [ ] Updates balance after approval

**Lakshmi (Motivator):**
- [ ] Shows encouraging messages after actions

---

## 🐛 Troubleshooting

### Dashboard shows "Backend Connection Error"
- Check if backend is running: http://localhost:8000
- Verify `.env` file in `frontend/` folder has correct URL
- Check browser console for CORS errors

### Numbers not updating
- Wait 10 seconds (auto-refresh interval)
- Click dashboard to force refresh
- Check if user_id matches (user_123)

### Mock bank shows "Server Offline"
- Backend must be running first
- Check firewall isn't blocking port 8000

---

## 📊 Expected Flow

1. **Start:** User has Rs.24,526 Safe Balance + Rs.8,342 Tax Vault
2. **Income arrives:** Rs.10,000 from Upwork
3. **Chanakya processes:** 25% tax = Rs.2,500 to vault, Rs.7,500 to safe
4. **New balances:** Rs.32,026 Safe + Rs.10,842 Tax
5. **Expense attempt:** Rs.500 for food
6. **Kavach checks:** Balance sufficient? Category essential? → APPROVED
7. **Final balances:** Rs.31,526 Safe + Rs.10,842 Tax

Watch this happen live! 🎬

---

## 📱 Mobile View
The frontend is responsive - try resizing your browser window!

---

**Everything should work seamlessly. The dashboard is now a LIVE financial system powered by AI agents!** 🚀
