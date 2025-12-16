# RupeeReady - AI Financial Coach Platform

RupeeReady is an intelligent financial coaching platform that combines real-time transaction monitoring with AI-driven advice. It features two specialized AI agents—**Chanakya** (Wealth Manager) and **Kavach** (Expense Guardian)—to help users manage their finances effectively.

**Live Demo:** [https://rupeeready.web.app/](https://rupeeready.web.app/)

##  Features

- **Dual AI Agent System:**
  - **Chanakya:** Focuses on income growth, investment strategies, and long-term wealth planning.
  - **Kavach:** Acts as a firewall for expenses, analyzing transactions in real-time and flagging unnecessary spending.
- **Real-time Dashboard:** Live tracking of income, expenses, and savings with interactive visualizations.
- **Mock Bank Simulation:** A built-in simulation engine to generate realistic income and expense scenarios for testing the AI agents.
- **Expense Approval Workflow:** "Kavach" reviews high-value or suspicious transactions before they are finalized.
- **Secure Architecture:** Built with Firebase for secure authentication and data storage.

##  Architecture

The project follows a modern full-stack architecture:

### Frontend
- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Shadcn UI
- **Animations:** Framer Motion
- **State Management:** Custom React Hooks
- **Hosting:** Firebase Hosting

### Backend
- **Framework:** FastAPI (Python)
- **AI Engine:** Google Gemini (gemini-2.5-flash)
- **Database:** Firebase Firestore (via Admin SDK)
- **Simulation:** Custom Python-based banking simulator

### Data Flow
1. **User Action/Simulation:** Transactions are initiated via the UI or the Mock Bank.
2. **Backend Processing:** FastAPI receives the transaction data.
3. **AI Analysis:** 
   - Income events are analyzed by **Chanakya** for allocation advice.
   - Expense events are analyzed by **Kavach** for approval/rejection.
4. **Database Update:** Approved transactions and AI insights are stored in Firestore.
5. **Frontend Update:** The React dashboard polls for updates and reflects the new financial state in real-time.

##  Getting Started Locally

Follow these steps to run the project on your local machine.

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- Firebase Project Credentials

### 1. Clone the Repository
`ash
git clone https://github.com/yourusername/rupeeready.git
cd rupeeready
` 

### 2. Backend Setup
Navigate to the backend directory and set up the Python environment.

`ash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
` 

**Configuration:**
Create a .env file in the ackend directory with the following keys:
`env
GOOGLE_API_KEY=your_gemini_api_key
FIREBASE_CREDENTIALS=path/to/your/firebase-adminsdk.json
` 
*Note: You will need to download your Firebase Admin SDK JSON file and place it in the backend folder.*

**Run the Server:**
`ash
uvicorn main:app --reload
` 
The backend will start at http://localhost:8000.

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory.

`ash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
` 
The frontend will start at http://localhost:5173.

##  Testing

The project includes a **Mock Bank** feature to simulate transactions.
1. Go to the "Mock Bank" tab in the application.
2. Select "Simulate Income" to trigger Chanakya.
3. Select "Simulate Expense" to trigger Kavach.
4. Observe the AI responses and dashboard updates in real-time.

##  License

This project is licensed under the MIT License.
