"""
RupeeReady AI - Agentic Financial System for Gig Workers
Main FastAPI Application with "Rupee Squad" Agents
"""

import os
from typing import Optional
from datetime import datetime

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

import google.generativeai as genai
import firebase_admin
from firebase_admin import credentials, firestore

# ============================================================================
# INITIALIZATION & CONFIGURATION
# ============================================================================

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="RupeeReady AI",
    description="Self-Driving Wallet for Gig Workers",
    version="1.0.0"
)

# CORS Configuration (Allow Frontend to communicate)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Firebase Admin SDK
try:
    firebase_creds_path = os.getenv("FIREBASE_CREDENTIALS_PATH", "backend/serviceAccountKey.json")
    
    # Check if Firebase is already initialized
    if not firebase_admin._apps:
        cred = credentials.Certificate(firebase_creds_path)
        firebase_admin.initialize_app(cred)
        print("✅ Firebase initialized successfully")
    
    db = firestore.client()
except Exception as e:
    print(f"⚠️ Firebase initialization error: {e}")
    db = None

# Initialize Google Gemini AI
try:
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")
    
    genai.configure(api_key=gemini_api_key)
    # Using the latest Gemini 2.5 Flash model
    model = genai.GenerativeModel('gemini-2.5-flash')
    print("✅ Gemini AI initialized successfully")
except Exception as e:
    print(f"⚠️ Gemini AI initialization error: {e}")
    model = None

# ============================================================================
# PYDANTIC MODELS (Request/Response Schemas)
# ============================================================================

class IncomeTransaction(BaseModel):
    """Schema for incoming income webhook from Mock Bank"""
    amount: float = Field(..., gt=0, description="Income amount received")
    source: Optional[str] = Field("gig_payment", description="Source of income")
    user_id: str = Field(default="default_user", description="User identifier")

class ExpenseRequest(BaseModel):
    """Schema for expense approval requests from Frontend"""
    amount: float = Field(..., gt=0, description="Expense amount")
    category: str = Field(..., description="Expense category (food, transport, etc.)")
    user_id: str = Field(default="default_user", description="User identifier")

class ExpenseResponse(BaseModel):
    """Response schema for expense check"""
    status: str  # "APPROVED" or "BLOCKED"
    message: str
    remaining_balance: Optional[float] = None
    motivation: Optional[str] = None

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def get_user_data(user_id: str) -> dict:
    """Fetch user financial data from Firestore"""
    if not db:
        raise HTTPException(status_code=500, detail="Database not initialized")
    
    try:
        user_ref = db.collection('users').document(user_id)
        user_doc = user_ref.get()
        
        if user_doc.exists:
            return user_doc.to_dict()
        else:
            # Create default user profile
            default_data = {
                "safe_balance": 0.0,
                "tax_vault": 0.0,
                "total_income": 0.0,
                "total_expenses": 0.0,
                "created_at": datetime.now().isoformat()
            }
            user_ref.set(default_data)
            return default_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def update_user_data(user_id: str, updates: dict):
    """Update user financial data in Firestore"""
    if not db:
        raise HTTPException(status_code=500, detail="Database not initialized")
    
    try:
        user_ref = db.collection('users').document(user_id)
        user_ref.update(updates)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database update error: {str(e)}")

def ask_gemini(prompt: str) -> str:
    """Consult Gemini AI for financial decisions"""
    if not model:
        raise HTTPException(status_code=500, detail="AI model not initialized")
    
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI consultation error: {str(e)}")

def lakshmi_motivate(context: str) -> str:
    """Lakshmi Agent: Generate motivational message"""
    motivations = {
        "income": "🎉 Great! Keep that income flowing!",
        "save": "💰 Smart move! Your future self will thank you!",
        "approved": "✅ Expense approved! Spend wisely!",
        "blocked": "🛡️ Protected your wallet! Every rupee counts!",
    }
    return motivations.get(context, "🚀 Keep going, you're doing great!")

# ============================================================================
# API ROUTES
# ============================================================================

@app.get("/")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "app": "RupeeReady AI",
        "message": "Self-Driving Wallet is running!",
        "firebase_status": "connected" if db else "disconnected",
        "ai_status": "connected" if model else "disconnected"
    }

@app.post("/webhook/income")
async def chanakya_income_agent(transaction: IncomeTransaction):
    """
    🧠 CHANAKYA - The Income Agent (CFO)
    Automatically allocates income between Tax Vault and Safe Balance
    """
    try:
        # Fetch current user data
        user_data = get_user_data(transaction.user_id)
        
        # Consult Gemini AI for tax allocation strategy
        ai_prompt = f"""
        You are Chanakya, a financial advisor for gig workers in India.
        
        User's Financial Profile:
        - Current Safe Balance: ₹{user_data.get('safe_balance', 0)}
        - Current Tax Vault: ₹{user_data.get('tax_vault', 0)}
        - Total Income (Historical): ₹{user_data.get('total_income', 0)}
        - New Income Received: ₹{transaction.amount}
        
        Question: What percentage of this new income (₹{transaction.amount}) should be saved for tax purposes?
        
        Respond with ONLY a number between 10 and 30 (representing percentage).
        Consider that Indian gig workers typically need to save 15-20% for taxes.
        Be conservative if this is a large income spike.
        """
        
        ai_response = ask_gemini(ai_prompt)
        
        # Parse AI response (extract percentage)
        try:
            tax_percentage = float(''.join(filter(str.isdigit, ai_response.split()[0])))
            tax_percentage = max(10, min(30, tax_percentage))  # Clamp between 10-30%
        except:
            tax_percentage = 20  # Default fallback
        
        # Calculate allocations
        tax_amount = (transaction.amount * tax_percentage) / 100
        safe_amount = transaction.amount - tax_amount
        
        # Update Firestore
        new_safe_balance = user_data.get('safe_balance', 0) + safe_amount
        new_tax_vault = user_data.get('tax_vault', 0) + tax_amount
        new_total_income = user_data.get('total_income', 0) + transaction.amount
        
        update_user_data(transaction.user_id, {
            "safe_balance": new_safe_balance,
            "tax_vault": new_tax_vault,
            "total_income": new_total_income,
            "last_income_date": datetime.now().isoformat()
        })
        
        # Log transaction
        db.collection('transactions').add({
            "user_id": transaction.user_id,
            "type": "income",
            "amount": transaction.amount,
            "tax_allocated": tax_amount,
            "safe_allocated": safe_amount,
            "tax_percentage": tax_percentage,
            "timestamp": datetime.now().isoformat()
        })
        
        return {
            "status": "success",
            "agent": "Chanakya",
            "message": f"Income processed successfully! {tax_percentage}% saved for taxes.",
            "breakdown": {
                "total_income": transaction.amount,
                "tax_vault_allocation": round(tax_amount, 2),
                "safe_balance_allocation": round(safe_amount, 2),
                "tax_percentage": tax_percentage
            },
            "new_balances": {
                "safe_balance": round(new_safe_balance, 2),
                "tax_vault": round(new_tax_vault, 2)
            },
            "motivation": lakshmi_motivate("income")
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Chanakya Agent Error: {str(e)}"
        )

@app.post("/api/check-expense", response_model=ExpenseResponse)
async def kavach_spending_shield(expense: ExpenseRequest):
    """
    🛡️ KAVACH - The Spending Shield Agent (Guardian)
    Evaluates expenses and protects against risky spending
    """
    try:
        # Fetch current user data
        user_data = get_user_data(expense.user_id)
        current_safe_balance = user_data.get('safe_balance', 0)
        
        # Check if expense exceeds available balance
        if expense.amount > current_safe_balance:
            return ExpenseResponse(
                status="BLOCKED",
                message=f"❌ Insufficient funds! You have ₹{current_safe_balance} but need ₹{expense.amount}.",
                remaining_balance=current_safe_balance,
                motivation=lakshmi_motivate("blocked")
            )
        
        # Consult Gemini AI for risk assessment
        ai_prompt = f"""
        You are Kavach, a spending guardian for gig workers.
        
        User's Current Financial State:
        - Safe Balance: ₹{current_safe_balance}
        - Proposed Expense: ₹{expense.amount}
        - Expense Category: {expense.category}
        - Remaining After Expense: ₹{current_safe_balance - expense.amount}
        
        Question: Is this expense financially safe?
        
        Respond with ONLY one word: "APPROVED" or "BLOCKED"
        
        Guidelines:
        - BLOCK if expense is >50% of safe balance
        - BLOCK if remaining balance would be <₹500
        - BLOCK if category is non-essential (entertainment, luxury) and balance is low
        - APPROVE essential categories (food, transport, healthcare, education)
        """
        
        ai_decision = ask_gemini(ai_prompt).upper()
        
        # Parse AI decision
        if "APPROVED" in ai_decision:
            # Update balances
            new_safe_balance = current_safe_balance - expense.amount
            new_total_expenses = user_data.get('total_expenses', 0) + expense.amount
            
            update_user_data(expense.user_id, {
                "safe_balance": new_safe_balance,
                "total_expenses": new_total_expenses,
                "last_expense_date": datetime.now().isoformat()
            })
            
            # Log transaction
            db.collection('transactions').add({
                "user_id": expense.user_id,
                "type": "expense",
                "amount": expense.amount,
                "category": expense.category,
                "status": "approved",
                "timestamp": datetime.now().isoformat()
            })
            
            return ExpenseResponse(
                status="APPROVED",
                message=f"✅ Expense approved! ₹{expense.amount} deducted from your safe balance.",
                remaining_balance=round(new_safe_balance, 2),
                motivation=lakshmi_motivate("approved")
            )
        
        else:
            # Expense blocked by AI
            return ExpenseResponse(
                status="BLOCKED",
                message=f"🛡️ Expense blocked for your financial safety. Category '{expense.category}' flagged as risky given current balance.",
                remaining_balance=current_safe_balance,
                motivation=lakshmi_motivate("blocked")
            )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Kavach Agent Error: {str(e)}"
        )

@app.get("/api/user/{user_id}/balance")
async def get_user_balance(user_id: str):
    """Get current user balance (for frontend dashboard)"""
    try:
        user_data = get_user_data(user_id)
        return {
            "user_id": user_id,
            "safe_balance": round(user_data.get('safe_balance', 0), 2),
            "tax_vault": round(user_data.get('tax_vault', 0), 2),
            "total_income": round(user_data.get('total_income', 0), 2),
            "total_expenses": round(user_data.get('total_expenses', 0), 2)
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching balance: {str(e)}"
        )

# ============================================================================
# APPLICATION STARTUP
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    
    print("\n" + "="*60)
    print("🚀 RupeeReady AI - Self-Driving Wallet Starting...")
    print("="*60)
    print(f"📍 Server: http://{host}:{port}")
    print(f"📚 Docs: http://{host}:{port}/docs")
    print("="*60 + "\n")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True
    )
