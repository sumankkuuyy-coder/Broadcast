-- 1. Users Table (Stores user profiles, roles, and dual wallet balances)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  mobile TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  sms_wallet REAL DEFAULT 0.0,
  earning_wallet REAL DEFAULT 0.0,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Add Fund Requests Table (Tracks UPI add-fund requests and UTR verification)
CREATE TABLE IF NOT EXISTS add_fund_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  utr_number TEXT NOT NULL,
  status TEXT DEFAULT 'Pending', -- Pending, Approved, Declined
  reason TEXT,
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. SMS Logs Table (Tracks simulated SMS tasks sent by users)
CREATE TABLE IF NOT EXISTS sms_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  recipient_number TEXT NOT NULL,
  message_text TEXT NOT NULL,
  status TEXT DEFAULT 'Sent',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 4. Withdrawals Table (Tracks payout requests, 1-day limit, and approval status)
CREATE TABLE IF NOT EXISTS withdrawals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  payment_info TEXT NOT NULL,
  status TEXT DEFAULT 'Pending', -- Pending, Approved, Rejected
  reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
