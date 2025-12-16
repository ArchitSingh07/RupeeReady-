# RupeeReady AI - Backend Integration Guide

## 🎯 Overview

The frontend is now fully integrated with the FastAPI backend featuring three AI agents:
- **Chanakya** (CFO Agent): Manages income allocation and tax savings
- **Kavach** (Spending Shield): Evaluates and approves/blocks expenses
- **Lakshmi** (Motivator): Provides gamified encouragement

## 🔧 Setup Instructions

### 1. Backend Setup

```powershell
# Navigate to project root
cd C:\Users\singh\OneDrive\Desktop\RupeeReady

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install Python dependencies
pip install -r backend/requirements.txt

# Configure environment variables
# Edit backend/.env and add:
# - GEMINI_API_KEY=your_api_key_here
# - FIREBASE_CREDENTIALS_PATH=backend/serviceAccountKey.json

# Start the FastAPI server
python backend/main.py
```

Backend will run on: **http://localhost:8000**

### 2. Frontend Setup

```powershell
# Navigate to frontend
cd frontend

# Install Node dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:3000**

## 📡 API Integration

### New Files Added

1. **`frontend/src/services/api.ts`**
   - API service layer for backend communication
   - Functions: `getUserBalance()`, `checkExpense()`, `submitIncome()`

2. **`frontend/src/hooks/useFinancialData.ts`**
   - Custom React hook for real-time financial data
   - Auto-refreshes balance every 10 seconds
   - Handles loading, error states

3. **`frontend/.env`**
   - Environment configuration
   - `VITE_API_URL=http://localhost:8000`

### Updated Components

**`DashboardIndia.tsx`**
- Now uses `useFinancialData()` hook
- Displays real-time balance from Firebase
- Shows connection status with toast notifications
- Syncs with Chanakya & Kavach agents

## 🚀 Features Implemented

### ✅ Live Data Sync
- Dashboard automatically fetches user balance every 10 seconds
- Real-time updates when mock bank sends transactions
- Error handling with user-friendly notifications

### ✅ AI Agent Integration
- **Safe-to-Spend Widget**: Shows `balance.safe_balance` from backend
- **Tax Vault**: Displays `balance.tax_vault` (auto-calculated by Chanakya)
- **Total Income/Expenses**: Tracked in Firebase Firestore

### ✅ Backend Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Health check |
| `/api/user/{user_id}/balance` | GET | Fetch user financial data |
| `/webhook/income` | POST | Chanakya processes income |
| `/api/check-expense` | POST | Kavach evaluates expenses |

## 🧪 Testing the System

### Option 1: Using Mock Bank Simulator

```powershell
# Terminal 1: Start Backend
python backend/main.py

# Terminal 2: Start Frontend
cd frontend
npm run dev

# Terminal 3: Start Mock Bank
python backend/mock_bank.py
```

Watch the dashboard update in real-time as transactions flow!

### Option 2: Manual API Testing

Visit: **http://localhost:8000/docs**

Use the interactive Swagger UI to:
1. Submit income via `/webhook/income`
2. Check expenses via `/api/check-expense`
3. View balance via `/api/user/user_123/balance`

## 📊 Data Flow

```
Mock Bank Simulator
    ↓
POST /webhook/income (₹15,000)
    ↓
Chanakya Agent (Gemini AI)
    ├─ Calculates tax: 20% = ₹3,000
    ├─ Tax Vault: ₹3,000
    └─ Safe Balance: ₹12,000
    ↓
Firebase Firestore (Updated)
    ↓
Frontend Dashboard (Auto-refresh)
    └─ Displays: Safe ₹12,000 | Tax ₹3,000
```

## 🛡️ Expense Approval Flow

```
User attempts expense (₹500 for food)
    ↓
POST /api/check-expense
    ↓
Kavach Agent
    ├─ Checks balance
    ├─ AI evaluates risk
    └─ Decision: APPROVED/BLOCKED
    ↓
Frontend shows result
    └─ Toast notification + updated balance
```

## 🎨 UI Features

### Real-time Indicators
- **Live Badge**: Shows when data is syncing from backend
- **Agent Status**: Displays which agent last performed action
- **Connection Errors**: Toast notifications if backend is offline

### Data Display
- All amounts in Indian Rupees (₹)
- Auto-formatting with `formatIndianCurrency()`
- Loading states while fetching data

## 🔐 User Authentication (Future)

Currently uses hardcoded `user_123`. To implement auth:

1. Add login endpoint to backend
2. Store JWT token in frontend
3. Update API service to include Authorization header
4. Modify `useFinancialData` hook to use dynamic user ID

## 📝 Environment Variables

### Backend (`backend/.env`)
```env
GEMINI_API_KEY=your_gemini_api_key
FIREBASE_CREDENTIALS_PATH=backend/serviceAccountKey.json
HOST=0.0.0.0
PORT=8000
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000
VITE_DEFAULT_USER_ID=user_123
```

## 🐛 Troubleshooting

### Backend not connecting?
- Check if FastAPI server is running on port 8000
- Verify Firebase credentials are correct
- Ensure Gemini API key is valid

### Frontend shows "Backend Connection Error"?
- Verify `VITE_API_URL` in `frontend/.env`
- Check CORS is enabled in backend (already configured)
- Open browser console for detailed error messages

### Data not updating?
- Check browser Network tab for API call failures
- Verify user_id matches between frontend and backend
- Check Firebase console for database writes

## 📦 Dependencies

### Backend
- fastapi==0.104.1
- uvicorn==0.24.0
- google-generativeai==0.3.2
- firebase-admin==6.2.0
- python-dotenv==1.0.0

### Frontend
- React 18
- Vite 6
- Motion (Framer Motion)
- Sonner (Toast notifications)

## 🚀 Next Steps

1. Add transaction history endpoint to backend
2. Implement expense submission UI in dashboard
3. Create income entry form for manual testing
4. Add real-time WebSocket notifications
5. Implement user authentication system
6. Add expense category analytics

## 📞 Support

For issues or questions:
- Check FastAPI docs: http://localhost:8000/docs
- Review backend logs in terminal
- Inspect Network tab in browser DevTools

---

**Built with ❤️ for the Hackathon - RupeeReady AI Team**
