+"""
Mock Bank Simulator - RupeeReady AI
Simulates real-time income transactions for testing the Chanakya Agent
"""

import requests
import time
import random
import json
from datetime import datetime

# ============================================================================
# CONFIGURATION
# ============================================================================

INCOME_ENDPOINT = "http://localhost:8000/webhook/income"
EXPENSE_ENDPOINT = "http://localhost:8000/api/check-expense"
USER_ID = "user_123"
TRANSACTION_INTERVAL = 15  # seconds

# Realistic income sources for gig workers
INCOME_SOURCES = [
    "Upwork Payment",
    "Fiverr Gig",
    "Swiggy Payout",
    "Client Invoice #102",
    "Uber Earnings",
    "Design Project B"
]

# Realistic expense categories and their typical ranges
EXPENSE_CATEGORIES = {
    "food": {"min": 200, "max": 2000, "emoji": "🍽️"},
    "transport": {"min": 100, "max": 1500, "emoji": "🚗"},
    "groceries": {"min": 500, "max": 3000, "emoji": "🛒"},
    "healthcare": {"min": 500, "max": 5000, "emoji": "💊"},
    "rent": {"min": 5000, "max": 15000, "emoji": "🏠"},
    "utilities": {"min": 500, "max": 2000, "emoji": "💡"},
    "entertainment": {"min": 300, "max": 3000, "emoji": "🎬"},
    "education": {"min": 1000, "max": 10000, "emoji": "📚"},
}

# ============================================================================
# MOCK BANK TRANSACTION SIMULATOR
# ============================================================================

def generate_income_transaction():
    """Generate a random income transaction"""
    return {
        "user_id": USER_ID,
        "amount": random.randint(5000, 50000),
        "source": random.choice(INCOME_SOURCES)
    }

def send_income_transaction(transaction):
    """Send income transaction webhook to FastAPI server"""
    try:
        print(f"\n{'='*60}")
        print(f"💰 INCOME: ₹{transaction['amount']:,} from {transaction['source']}")
        print(f"⏰ Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"{'='*60}")
        
        response = requests.post(
            INCOME_ENDPOINT,
            json=transaction,
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print("\n✅ Chanakya Agent Response:")
            print(json.dumps(result, indent=2))
            
            # Show key insights
            if "breakdown" in result:
                breakdown = result["breakdown"]
                print(f"\n💰 Tax Vault: ₹{breakdown.get('tax_vault_allocation', 0):,.2f}")
                print(f"💵 Safe Balance: ₹{breakdown.get('safe_balance_allocation', 0):,.2f}")
                print(f"📊 Tax Rate: {breakdown.get('tax_percentage', 0)}%")
            
            if "motivation" in result:
                print(f"\n{result['motivation']}")
                
        else:
            print(f"\n⚠️ Server Error: Status {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("\n❌ Server Offline: Not reachable. Retrying...")
    except requests.exceptions.Timeout:
        print("\n❌ Server Offline: Request timed out. Retrying...")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")

def run_simulator():
    """Main simulator loop - alternates between income and expenses"""
    print("\n" + "="*60)
    print("🏦 MOCK BANK SIMULATOR STARTED")
    print("="*60)
    print(f"💰 Income Endpoint: {INCOME_ENDPOINT}")
    print(f"💳 Expense Endpoint: {EXPENSE_ENDPOINT}")
    print(f"👤 User ID: {USER_ID}")
    print(f"⏱️  Interval: {TRANSACTION_INTERVAL} seconds")
    print(f"📊 Pattern: Income → Expense → Income → Expense...")
    print("="*60)
    print("\n⚡ Press Ctrl+C to stop the simulator\n")
    
    transaction_count = 0
    income_count = 0
    expense_count = 0
    
    try:
        while True:
            transaction_count += 1
            print(f"\n{'🔄'*30}")
            print(f"Transaction #{transaction_count}")
            
            # Alternate between income and expense
            # 60% income, 40% expense (gig workers earn more than they spend ideally)
            if random.random() < 0.6:
                # Generate and send income
                income_count += 1
                transaction = generate_income_transaction()
                send_income_transaction(transaction)
            else:
                # Generate and send expense
                expense_count += 1
                transaction, emoji = generate_expense_transaction()
                send_expense_transaction(transaction, emoji)
            
            # Show running statistics
            print(f"\n📊 Statistics: {income_count} incomes, {expense_count} expenses")
            
            # Wait before next transaction
            print(f"\n⏳ Waiting {TRANSACTION_INTERVAL} seconds until next transaction...")
            time.sleep(TRANSACTION_INTERVAL)
            
    except KeyboardInterrupt:
        print("\n\n" + "="*60)
        print("🛑 Mock Bank Simulator Stopped")
        print("="*60)
        print(f"📊 Total Transactions: {transaction_count}")
        print(f"💰 Income Transactions: {income_count}")
        print(f"💳 Expense Transactions: {expense_count}")
        print("="*60 + "\n")ver Error: Status {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("\n❌ Server Offline: Not reachable. Retrying...")
    except requests.exceptions.Timeout:
        print("\n❌ Server Offline: Request timed out. Retrying...")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")tivation']}")
                
        else:
            print(f"\n⚠️ Server Error: Status {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("\n❌ Bank Offline: Server not reachable. Retrying...")
    except requests.exceptions.Timeout:
        print("\n❌ Bank Offline: Request timed out. Retrying...")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")

def run_simulator():
    """Main simulator loop"""
    print("\n" + "="*60)
    print("🏦 MOCK BANK SIMULATOR STARTED")
    print("="*60)
    print(f"📡 Target: {API_ENDPOINT}")
    print(f"👤 User ID: {USER_ID}")
    print(f"⏱️  Interval: {TRANSACTION_INTERVAL} seconds")
    print(f"💰 Amount Range: ₹5,000 - ₹50,000")
    print("="*60)
    print("\n⚡ Press Ctrl+C to stop the simulator\n")
    
    transaction_count = 0
    
    try:
        while True:
            transaction_count += 1
            print(f"\n🔄 Transaction #{transaction_count}")
            
            # Generate and send transaction
            transaction = generate_transaction()
            send_transaction(transaction)
            
            # Wait before next transaction
            print(f"\n⏳ Waiting {TRANSACTION_INTERVAL} seconds until next transaction...")
            time.sleep(TRANSACTION_INTERVAL)
            
    except KeyboardInterrupt:
        print("\n\n" + "="*60)
        print("🛑 Mock Bank Simulator Stopped")
        print(f"📊 Total Transactions Sent: {transaction_count}")
        print("="*60 + "\n")

# ============================================================================
# ENTRY POINT
# ============================================================================

if __name__ == "__main__":
    run_simulator()
