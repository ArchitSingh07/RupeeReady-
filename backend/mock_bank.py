"""
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
    "Design Project B",
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
# HELPERS
# ============================================================================

def generate_income_transaction():
    """Generate a random income transaction"""
    return {
        "user_id": USER_ID,
        "amount": random.randint(5000, 50000),
        "source": random.choice(INCOME_SOURCES),
    }


def generate_expense_transaction():
    """Generate a random expense transaction"""
    category = random.choice(list(EXPENSE_CATEGORIES.keys()))
    rng = EXPENSE_CATEGORIES[category]
    amount = random.randint(rng["min"], rng["max"])
    return ({
        "user_id": USER_ID,
        "amount": amount,
        "category": category,
    }, rng.get("emoji", ""))


def send_income_transaction(transaction):
    """Send income webhook to backend"""
    try:
        print("\n" + "=" * 60)
        print(f"💰 INCOME: ₹{transaction['amount']:,} from {transaction['source']}")
        print(f"⏰ Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)

        resp = requests.post(INCOME_ENDPOINT, json=transaction, timeout=10)
        if resp.ok:
            print("✅ Success:")
            try:
                result = resp.json()
                print(json.dumps(result, indent=2))
                
                # Show key insights
                if "breakdown" in result:
                    breakdown = result["breakdown"]
                    print(f"\n💰 Tax Vault: ₹{breakdown.get('tax_vault_allocation', 0):,.2f}")
                    print(f"💵 Safe Balance: ₹{breakdown.get('safe_balance_allocation', 0):,.2f}")
                    print(f"📊 Tax Rate: {breakdown.get('tax_percentage', 0)}%")
                
                if "motivation" in result:
                    print(f"\n{result['motivation']}")
            except Exception:
                print(resp.text)
        else:
            print(f"⚠️ Server Error: Status {resp.status_code}")
            print(resp.text)

    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: is the backend running at http://localhost:8000 ?")
    except requests.exceptions.Timeout:
        print("❌ Request timed out")
    except Exception as e:
        print(f"❌ Error sending income: {e}")


def send_expense_transaction(transaction, emoji=""):
    """Send expense check request to backend"""
    try:
        print("\n" + "-" * 60)
        print(f"💳 EXPENSE: ₹{transaction['amount']:,} ({transaction['category']}) {emoji}")
        print(f"⏰ Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("-" * 60)

        resp = requests.post(EXPENSE_ENDPOINT, json=transaction, timeout=10)
        if resp.ok:
            print("✅ Success:")
            try:
                result = resp.json()
                print(json.dumps(result, indent=2))
                
                if "motivation" in result:
                    print(f"\n{result['motivation']}")
            except Exception:
                print(resp.text)
        else:
            print(f"⚠️ Server Error: Status {resp.status_code}")
            print(resp.text)

    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: is the backend running at http://localhost:8000 ?")
    except requests.exceptions.Timeout:
        print("❌ Request timed out")
    except Exception as e:
        print(f"❌ Error sending expense: {e}")


def run_simulator():
    """Main simulator loop - alternates between income and expense"""
    print("\n" + "=" * 60)
    print("🏦 MOCK BANK SIMULATOR STARTED")
    print("=" * 60)
    print(f"💰 Income Endpoint: {INCOME_ENDPOINT}")
    print(f"💳 Expense Endpoint: {EXPENSE_ENDPOINT}")
    print(f"👤 User ID: {USER_ID}")
    print(f"⏱️  Interval: {TRANSACTION_INTERVAL} seconds")
    print(f"📊 Pattern: Income → Expense → Income → Expense...")
    print("=" * 60)
    print("\n⚡ Press Ctrl+C to stop the simulator\n")

    transaction_count = 0
    income_count = 0
    expense_count = 0

    try:
        while True:
            transaction_count += 1
            print(f"\n{'🔄' * 30}")
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
        print("\n\n" + "=" * 60)
        print("🛑 Mock Bank Simulator Stopped")
        print("=" * 60)
        print(f"📊 Total Transactions: {transaction_count}")
        print(f"💰 Income Transactions: {income_count}")
        print(f"💳 Expense Transactions: {expense_count}")
        print("=" * 60 + "\n")


if __name__ == "__main__":
    run_simulator() 
