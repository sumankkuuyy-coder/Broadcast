const USER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>BSNL Mobile App Portal</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-gray-900 min-h-screen text-gray-100 flex flex-col items-center justify-center p-0 sm:p-4 font-sans">

    <!-- MOBILE APP CONTAINER FRAME -->
    <div class="w-full max-w-md bg-gray-950 min-h-screen sm:min-h-[85vh] sm:rounded-3xl shadow-2xl flex flex-col relative overflow-hidden border border-gray-800">

        <!-- AUTH VIEW (LOGIN / REGISTER) -->
        <div id="auth-container" class="flex-1 flex flex-col justify-center p-6 space-y-6 my-auto">
            <div class="text-center space-y-3">
                <div class="flex justify-center">
                    <img src="https://i.ibb.co/C5VBSGcV/BSNL-New-Logo.png" alt="BSNL Logo" class="h-14 object-contain bg-white p-1 rounded-xl shadow">
                </div>
                <h1 class="text-base font-bold text-gray-200 uppercase tracking-wider">BSNL Secure Portal</h1>
                
                <!-- TOGGLE SWITCH -->
                <div class="bg-gray-900 p-1 rounded-xl flex relative mt-3 border border-gray-800">
                    <div id="toggle-bg" class="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-emerald-600 rounded-lg transition-all duration-300 shadow-sm left-1"></div>
                    <button onclick="switchAuthTab('login')" id="btn-tab-login" class="flex-1 py-2 text-xs font-bold relative z-10 text-white transition-colors">Login</button>
                    <button onclick="switchAuthTab('register')" id="btn-tab-register" class="flex-1 py-2 text-xs font-bold relative z-10 text-gray-400 transition-colors">Register</button>
                </div>
            </div>

            <!-- LOGIN BOX -->
            <div id="login-box" class="space-y-4">
                <form onsubmit="handleLogin(event)" class="space-y-3.5">
                    <div>
                        <label class="block text-[11px] font-bold uppercase text-gray-400 mb-1">Mobile Number</label>
                        <input type="tel" id="login-mobile" required placeholder="Enter mobile" class="w-full px-3.5 py-3 bg-gray-900 border border-gray-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold uppercase text-gray-400 mb-1">Password</label>
                        <input type="password" id="login-password" required placeholder="Enter password" class="w-full px-3.5 py-3 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500">
                    </div>
                    <button type="submit" class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-lg transition-all mt-2">Login to App</button>
                </form>
            </div>

            <!-- REGISTER BOX (No PAN) -->
            <div id="register-box" class="space-y-3 hidden">
                <form onsubmit="handleRegister(event)" class="space-y-3">
                    <div>
                        <label class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Full Name</label>
                        <input type="text" id="reg-name" required placeholder="Enter name" class="w-full px-3 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Mobile Number</label>
                        <input type="tel" id="reg-mobile" required placeholder="Enter mobile" class="w-full px-3 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs font-mono text-white">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Password</label>
                        <input type="password" id="reg-password" required placeholder="Create password" class="w-full px-3 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white">
                    </div>
                    <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-lg mt-1">Register Now</button>
                </form>
            </div>
        </div>

        <!-- APP DASHBOARD CONTAINER -->
        <div id="app-dashboard" class="flex-1 flex flex-col hidden relative">
            
            <!-- APP HEADER -->
            <div class="bg-gray-900 px-4 py-3.5 flex items-center justify-between border-b border-gray-800 sticky top-0 z-20">
                <div class="flex items-center space-x-3">
                    <button onclick="toggleSidebar(true)" class="text-gray-300 hover:text-white p-1">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <div>
                        <h2 id="app-header-title" class="text-sm font-bold text-white">Home</h2>
                        <p class="text-[10px] text-emerald-400 font-mono" id="app-header-mobile"></p>
                    </div>
                </div>
                <img src="https://i.ibb.co/C5VBSGcV/BSNL-New-Logo.png" alt="BSNL Logo" class="h-7 bg-white p-0.5 rounded-md shadow">
            </div>

            <!-- SIDEBAR DRAWER (3-LINE MENU) -->
            <div id="sidebar-backdrop" onclick="toggleSidebar(false)" class="fixed inset-0 bg-black/70 z-40 hidden transition-opacity"></div>
            <div id="sidebar-drawer" class="fixed top-0 left-0 bottom-0 w-72 bg-gray-950 border-r border-gray-800 z-50 transform -translate-x-full transition-transform duration-300 flex flex-col">
                <div class="p-5 bg-emerald-900/40 border-b border-gray-800 flex items-center justify-between">
                    <div>
                        <h3 id="sidebar-user-name" class="font-bold text-sm text-white">User Name</h3>
                        <p id="sidebar-user-mob" class="text-xs text-emerald-300 font-mono">Mobile</p>
                    </div>
                    <button onclick="toggleSidebar(false)" class="text-gray-400 hover:text-white text-base">✕</button>
                </div>
                <div class="p-3 space-y-1.5 flex-1 overflow-y-auto text-xs font-semibold">
                    <button onclick="navigateTo('home')" class="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-900 flex items-center space-x-3 text-gray-200"><span>🏠</span><span>Home</span></button>
                    <button onclick="navigateTo('wallet')" class="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-900 flex items-center space-x-3 text-gray-200"><span>💰</span><span>Wallets (SMS & Earning)</span></button>
                    <button onclick="navigateTo('kyc')" class="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-900 flex items-center space-x-3 text-gray-200"><span>🪪</span><span>KYC & Bank Details</span></button>
                    <button onclick="navigateTo('history')" class="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-900 flex items-center space-x-3 text-gray-200"><span>📊</span><span>Transaction History</span></button>
                    
                    <div class="pt-3 border-t border-gray-800 space-y-1.5">
                        <button onclick="openPolicyModal('terms')" class="w-full text-left px-4 py-2.5 rounded-xl hover:bg-gray-900 flex items-center space-x-3 text-gray-300 text-[11px]"><span>📄</span><span>Terms & Conditions</span></button>
                        <button onclick="openPolicyModal('refund')" class="w-full text-left px-4 py-2.5 rounded-xl hover:bg-gray-900 flex items-center space-x-3 text-gray-300 text-[11px]"><span>🔄</span><span>Refund Policy</span></button>
                        <a href="https://t.me/YourTelegramBot" target="_blank" class="w-full text-left px-4 py-2.5 rounded-xl hover:bg-gray-900 flex items-center space-x-3 text-sky-400 text-[11px]"><span>💬</span><span>Customer Support (Telegram)</span></a>
                    </div>
                </div>

                <!-- App Store Badges at Bottom of Sidebar -->
                <div class="p-4 border-t border-gray-800 space-y-3">
                    <div class="flex gap-2 justify-center">
                        <div class="bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-center cursor-pointer hover:bg-gray-800">
                            <p class="text-[8px] text-gray-400 uppercase">Get it on</p>
                            <p class="text-[10px] font-bold text-white">Google Play</p>
                        </div>
                        <div class="bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-center cursor-pointer hover:bg-gray-800">
                            <p class="text-[8px] text-gray-400 uppercase">Download on</p>
                            <p class="text-[10px] font-bold text-white">App Store</p>
                        </div>
                    </div>
                    <button onclick="logout()" class="w-full py-2.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold rounded-xl text-xs border border-red-800/50">Logout</button>
                </div>
            </div>

            <!-- MAIN CONTENT AREA -->
            <div class="flex-1 p-4 overflow-y-auto space-y-4 pb-20">

                <!-- 1. HOME SECTION -->
                <div id="sec-home" class="space-y-4">
                    <!-- SMS Wallet & Add Fund Button Header -->
                    <div class="bg-gray-900 border border-gray-800 p-4 rounded-2xl flex justify-between items-center">
                        <div>
                            <p class="text-[10px] uppercase font-bold text-emerald-400">SMS Wallet Balance</p>
                            <p id="home-sms-wallet" class="text-lg font-bold text-white font-mono mt-0.5">₹0.00</p>
                        </div>
                        <button onclick="openQrModal()" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow">➕ Add Fund</button>
                    </div>

                    <!-- SMS Broadcast Form -->
                    <div class="bg-gray-900 border border-gray-800 p-4 rounded-2xl space-y-3">
                        <h3 class="text-xs font-bold text-teal-400 uppercase">⚡ Send SMS Campaign</h3>
                        <form onsubmit="handleSendSms(event)" class="space-y-2.5">
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Recipients (Auto Masked 6-Digit)</label>
                                <input type="text" id="sms-recipients" required readonly class="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-emerald-300 font-mono">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Promotional Message (Read-Only)</label>
                                <textarea id="sms-message" required readonly rows="3" class="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-gray-300 resize-none">Special BSNL 5G Network Expansion Offer! Recharge now & get unlimited benefits across India. Click to activate: https://bsnl.co.in</textarea>
                            </div>
                            <button type="submit" id="send-sms-btn" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow">Send SMS</button>
                        </form>
                    </div>
                </div>

                <!-- 2. WALLET SECTION -->
                <div id="sec-wallet" class="space-y-4 hidden">
                    <div class="grid grid-cols-3 gap-2">
                        <div class="bg-gray-900 border border-gray-800 p-3 rounded-2xl text-center">
                            <p class="text-[9px] uppercase font-bold text-emerald-400">SMS Wallet</p>
                            <p id="val-sms-wallet" class="text-sm font-bold text-white mt-1 font-mono">₹0.00</p>
                        </div>
                        <div onclick="navigateTo('wallet')" class="bg-gray-900 border border-emerald-500/50 p-3 rounded-2xl text-center cursor-pointer">
                            <p class="text-[9px] uppercase font-bold text-teal-400">Earning Wallet</p>
                            <p id="val-earning-wallet" class="text-sm font-bold text-white mt-1 font-mono">₹0.00</p>
                        </div>
                        <div class="bg-gray-900 border border-gray-800 p-3 rounded-2xl text-center">
                            <p class="text-[9px] uppercase font-bold text-amber-400">Bonus</p>
                            <p id="val-bonus-wallet" class="text-sm font-bold text-white mt-1 font-mono">₹0.00</p>
                            <span class="text-[8px] text-gray-400 block mt-0.5">(Adds to SMS)</span>
                        </div>
                    </div>

                    <!-- Withdrawal Card -->
                    <div class="bg-gray-900 border border-gray-800 p-4 rounded-2xl space-y-3">
                        <h3 class="text-xs font-bold text-teal-400 uppercase">💸 Request Withdrawal (Earning Balance)</h3>
                        <p class="text-[10px] text-gray-400">Min withdrawal: ₹5,000 | Max withdrawal: ₹50,000</p>
                        <form onsubmit="startWithdrawalProcess(event)" class="space-y-2.5">
                            <input type="number" step="1" id="wit-amount" required placeholder="Enter Amount (₹5k - ₹50k)" class="w-full px-3 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white font-mono">
                            <button type="submit" class="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs">Proceed to Withdrawal</button>
                        </form>
                    </div>
                </div>

                <!-- 3. KYC SECTION -->
                <div id="sec-kyc" class="space-y-4 hidden">
                    <div class="bg-gray-900 border border-gray-800 p-4 rounded-2xl space-y-3">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xs font-bold text-emerald-400 uppercase">🪪 KYC & Bank Details</h3>
                            <span id="kyc-status-badge" class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Not Submitted</span>
                        </div>
                        <p class="text-[11px] text-gray-400">Fill details step-by-step. Once verified, details are locked.</p>
                        
                        <form id="kyc-form" onsubmit="handleKycSubmit(event)" class="space-y-2.5">
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-gray-400 mb-0.5">Aadhaar Number</label>
                                <input type="text" id="kyc-aadhaar" required placeholder="Enter 12-digit Aadhaar" class="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white font-mono">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-gray-400 mb-0.5">PAN Number</label>
                                <input type="text" id="kyc-pan" required placeholder="Enter PAN number" class="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white font-mono uppercase">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-gray-400 mb-0.5">Account Holder Name</label>
                                <input type="text" id="kyc-acc-name" required placeholder="As per bank passbook" class="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white">
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <label class="block text-[10px] font-bold uppercase text-gray-400 mb-0.5">Account Number</label>
                                    <input type="text" id="kyc-acc-no" required placeholder="Bank Account No" class="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white font-mono">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold uppercase text-gray-400 mb-0.5">IFSC Code</label>
                                    <input type="text" id="kyc-ifsc" required placeholder="IFSC Code" class="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white font-mono uppercase">
                                </div>
                            </div>
                            <button type="submit" id="kyc-submit-btn" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow mt-2">Submit & Verify KYC</button>
                        </form>

                        <div id="bank-change-container" class="hidden pt-2 border-t border-gray-800">
                            <button onclick="openBankChangeModal()" class="w-full py-2 bg-gray-800 hover:bg-gray-700 text-teal-400 font-bold rounded-xl text-xs border border-teal-500/30">🔄 Change Bank Account (Acc No / IFSC)</button>
                        </div>
                    </div>
                </div>

                <!-- 4. HISTORY SECTION -->
                <div id="sec-history" class="space-y-4 hidden">
                    <div class="bg-gray-900 p-1 rounded-xl flex border border-gray-800 text-[11px]">
                        <button onclick="switchHistoryTab('deposits')" id="hist-btn-dep" class="flex-1 py-2 font-bold rounded-lg bg-emerald-600 text-white transition-all">Deposits</button>
                        <button onclick="switchHistoryTab('withdrawals')" id="hist-btn-wit" class="flex-1 py-2 font-bold rounded-lg text-gray-400 transition-all">Withdrawals</button>
                        <button onclick="switchHistoryTab('sms')" id="hist-btn-sms" class="flex-1 py-2 font-bold rounded-lg text-gray-400 transition-all">SMS Logs</button>
                    </div>

                    <div id="history-content-list" class="space-y-2.5">
                        <p class="text-center text-xs text-gray-500 py-6">Loading history...</p>
                    </div>
                </div>

            </div>

            <!-- BOTTOM NAVIGATION BAR -->
            <div class="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-2 flex justify-around items-center z-10">
                <button onclick="navigateTo('home')" class="flex flex-col items-center text-gray-400 hover:text-emerald-400 text-[10px] space-y-0.5">
                    <span class="text-base">🏠</span><span>Home</span>
                </button>
                <button onclick="navigateTo('wallet')" class="flex flex-col items-center text-gray-400 hover:text-emerald-400 text-[10px] space-y-0.5">
                    <span class="text-base">💰</span><span>Wallet</span>
                </button>
                <button onclick="navigateTo('kyc')" class="flex flex-col items-center text-gray-400 hover:text-emerald-400 text-[10px] space-y-0.5">
                    <span class="text-base">🪪</span><span>KYC</span>
                </button>
                <button onclick="navigateTo('history')" class="flex flex-col items-center text-gray-400 hover:text-emerald-400 text-[10px] space-y-0.5">
                    <span class="text-base">📊</span><span>History</span>
                </button>
            </div>
        </div>

    </div>

    <!-- FULL SCREEN QR MODAL -->
    <div id="qr-modal" class="fixed inset-0 bg-black/90 z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-gray-950 border border-gray-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl flex flex-col items-center relative space-y-4">
            <button onclick="closeQrModal()" class="absolute top-4 right-4 bg-gray-900 hover:bg-gray-800 text-gray-300 w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm">✕</button>
            
            <div class="text-center">
                <h3 class="text-base font-bold text-emerald-400">Scan & Pay via Any UPI App</h3>
                <p class="text-[11px] text-gray-400 mt-0.5">GPay, PhonePe, Paytm, BHIM</p>
            </div>

            <div class="bg-white p-2 border-2 border-emerald-500 rounded-2xl shadow-inner">
                <img src="https://i.ibb.co/qLGftMvF/IMG-20261116-120334.jpg" alt="Payment QR" class="w-60 h-60 object-contain rounded-xl">
            </div>

            <form onsubmit="handleDepositRequest(event)" class="w-full space-y-2.5">
                <input type="number" step="1" id="dep-amount" required placeholder="Enter Paid Amount (₹)" class="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white font-mono">
                <input type="text" id="dep-utr" required placeholder="Enter UTR / Transaction ID" class="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white font-mono">
                <button type="submit" class="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow">Submit Deposit Request</button>
            </form>
        </div>
    </div>

    <!-- WITHDRAWAL PREVIEW MODAL -->
    <div id="withdraw-preview-modal" class="fixed inset-0 bg-black/90 z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-gray-950 border border-gray-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4">
            <div class="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 class="font-bold text-sm text-emerald-400">🔍 Withdrawal Preview</h3>
                <button onclick="closeWithdrawModal()" class="text-gray-400 text-sm">✕</button>
            </div>
            <div class="space-y-3 text-xs">
                <div class="flex justify-between bg-gray-900 p-2.5 rounded-xl"><span class="text-gray-400">Withdraw Amount:</span><span id="prev-wit-amount" class="font-bold font-mono text-white">₹0</span></div>
                <div class="bg-gray-900 p-3 rounded-xl space-y-1">
                    <p class="text-[10px] uppercase font-bold text-gray-400">Linked Bank Account:</p>
                    <p id="prev-bank-holder" class="font-bold text-white"></p>
                    <p id="prev-bank-details" class="font-mono text-emerald-300"></p>
                </div>
            </div>
            <div class="flex gap-2 pt-2">
                <button onclick="closeWithdrawModal()" class="w-1/2 py-2.5 bg-gray-800 text-gray-300 font-bold rounded-xl text-xs">Cancel</button>
                <button onclick="confirmWithdrawal()" class="w-1/2 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs">Confirm & Withdraw</button>
            </div>
        </div>
    </div>

    <!-- CHANGE BANK ACCOUNT MODAL -->
    <div id="bank-change-modal" class="fixed inset-0 bg-black/90 z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-gray-950 border border-gray-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4">
            <div class="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 class="font-bold text-sm text-teal-400">🔄 Change Bank Account</h3>
                <button onclick="closeBankChangeModal()" class="text-gray-400 text-sm">✕</button>
            </div>
            <form onsubmit="handleBankUpdate(event)" class="space-y-3">
                <div>
                    <label class="block text-[10px] font-bold uppercase text-gray-400 mb-1">New Account Number</label>
                    <input type="text" id="new-acc-no" required placeholder="Enter new account no" class="w-full px-3 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white font-mono">
                </div>
                <div>
                    <label class="block text-[10px] font-bold uppercase text-gray-400 mb-1">New IFSC Code</label>
                    <input type="text" id="new-ifsc" required placeholder="Enter new IFSC" class="w-full px-3 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white font-mono uppercase">
                </div>
                <button type="submit" class="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow mt-2">Update Bank Details</button>
            </form>
        </div>
    </div>

    <!-- POLICY MODAL -->
    <div id="policy-modal" class="fixed inset-0 bg-black/90 z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-gray-950 border border-gray-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-3 relative max-h-[80vh] flex flex-col">
            <button onclick="closePolicyModal()" class="absolute top-4 right-4 text-gray-400 text-sm font-bold">✕</button>
            <h3 id="policy-title" class="font-bold text-sm text-emerald-400">Policy</h3>
            <div id="policy-content" class="text-xs text-gray-300 overflow-y-auto space-y-2 flex-1 pr-1"></div>
        </div>
    </div>

    <!-- CAMPAIGN PROGRESS & SUCCESS OVERLAY MODAL -->
    <div id="campaign-progress-modal" class="fixed inset-0 bg-black/90 z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-gray-950 border border-gray-800 w-full max-w-xs rounded-3xl p-6 shadow-2xl flex flex-col items-center space-y-4 text-center">
            <div id="prog-spinner" class="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <div id="prog-bar-container" class="w-full bg-gray-900 h-3 rounded-full overflow-hidden hidden border border-gray-800">
                <div id="prog-fill" class="bg-emerald-500 h-full w-0 transition-all duration-[10000ms] linear"></div>
            </div>
            <div id="prog-success-icon" class="w-14 h-14 bg-emerald-600/20 text-emerald-400 rounded-full flex items-center justify-center text-2xl font-bold hidden border border-emerald-500/40">✓</div>
            <p id="prog-status-text" class="text-xs font-bold text-gray-200">Initiating Campaign...</p>
        </div>
    </div>

    <script>
        let currentUser = null, pendingWithdrawAmount = 0, historyTypeCache = 'deposits';

        function generateMaskedNumbers() {
            const prefixes = ['8', '6', '7', '9'];
            let numbers = [];
            for(let i=0; i<5; i++) {
                let p = prefixes[Math.floor(Math.random() * prefixes.length)];
                let rand = Math.floor(10000 + Math.random() * 90000);
                numbers.push(\`+91 \${p}*****\${rand}\`);
            }
            document.getElementById('sms-recipients').value = numbers.join(', ');
        }

        function switchAuthTab(tab) {
            const toggleBg = document.getElementById('toggle-bg');
            const btnLogin = document.getElementById('btn-tab-login');
            const btnReg = document.getElementById('btn-tab-register');
            const loginBox = document.getElementById('login-box');
            const regBox = document.getElementById('register-box');

            if (tab === 'login') {
                toggleBg.style.transform = 'translateX(0%)';
                btnLogin.classList.add('text-white'); btnLogin.classList.remove('text-gray-400');
                btnReg.classList.add('text-gray-400'); btnReg.classList.remove('text-white');
                loginBox.classList.remove('hidden'); regBox.classList.add('hidden');
            } else {
                toggleBg.style.transform = 'translateX(100%)';
                btnReg.classList.add('text-white'); btnReg.classList.remove('text-gray-400');
                btnLogin.classList.add('text-gray-400'); btnLogin.classList.remove('text-white');
                regBox.classList.remove('hidden'); loginBox.classList.add('hidden');
            }
        }

        function toggleSidebar(show) {
            const drawer = document.getElementById('sidebar-drawer');
            const backdrop = document.getElementById('sidebar-backdrop');
            if (show) { drawer.classList.remove('-translate-x-full'); backdrop.classList.remove('hidden'); }
            else { drawer.classList.add('-translate-x-full'); backdrop.classList.add('hidden'); }
        }

        function navigateTo(section) {
            toggleSidebar(false);
            ['home', 'wallet', 'kyc', 'history'].forEach(s => {
                document.getElementById('sec-' + s).classList.add('hidden');
            });
            document.getElementById('sec-' + section).classList.remove('hidden');
            const titles = { home: 'Home', wallet: 'Wallets & Withdrawal', kyc: 'KYC & Bank Details', history: 'Transaction History' };
            document.getElementById('app-header-title').innerText = titles[section];
            if (section === 'history') loadHistoryData(historyTypeCache);
            if (section === 'home') generateMaskedNumbers();
        }

        async function handleLogin(e) {
            e.preventDefault();
            const mobile = document.getElementById('login-mobile').value, password = document.getElementById('login-password').value;
            const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile, password }) });
            const data = await res.json();
            if (res.ok) { currentUser = data.user; setupAppDashboard(); }
            else { alert(data.error || 'Login failed'); }
        }

        async function handleRegister(e) {
            e.preventDefault();
            const payload = {
                name: document.getElementById('reg-name').value,
                mobile: document.getElementById('reg-mobile').value,
                password: document.getElementById('reg-password').value
            };
            const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const data = await res.json();
            if (res.ok) { alert('Registration successful! Please login.'); switchAuthTab('login'); }
            else { alert(data.error || 'Registration failed'); }
        }

        function setupAppDashboard() {
            document.getElementById('auth-container').classList.add('hidden');
            document.getElementById('app-dashboard').classList.remove('hidden');
            document.getElementById('app-header-mobile').innerText = \`📱 \${currentUser.mobile}\`;
            document.getElementById('sidebar-user-name').innerText = currentUser.name;
            document.getElementById('sidebar-user-mob').innerText = currentUser.mobile;
            updateWalletsUI();
            checkKycStatusUI();
            navigateTo('home');
        }

        function updateWalletsUI() {
            document.getElementById('home-sms-wallet').innerText = \`₹\${currentUser.sms_wallet || 0}\`;
            document.getElementById('val-sms-wallet').innerText = \`₹\${currentUser.sms_wallet || 0}\`;
            document.getElementById('val-earning-wallet').innerText = \`₹\${currentUser.earning_wallet || 0}\`;
            document.getElementById('val-bonus-wallet').innerText = \`₹\${currentUser.bonus_wallet || 0}\`;
        }

        function checkKycStatusUI() {
            if (currentUser.kyc_status === 'Verified') {
                document.getElementById('kyc-status-badge').innerText = '✓ Verified (Locked)';
                document.getElementById('kyc-status-badge').className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
                document.getElementById('kyc-aadhaar').value = currentUser.aadhaar_no || '';
                document.getElementById('kyc-pan').value = currentUser.pan_no || '';
                document.getElementById('kyc-acc-name').value = currentUser.acc_holder_name || '';
                document.getElementById('kyc-acc-no').value = currentUser.bank_acc_no || '';
                document.getElementById('kyc-ifsc').value = currentUser.bank_ifsc || '';
                
                ['kyc-aadhaar', 'kyc-pan', 'kyc-acc-name', 'kyc-acc-no', 'kyc-ifsc'].forEach(id => document.getElementById(id).disabled = true);
                document.getElementById('kyc-submit-btn').classList.add('hidden');
                document.getElementById('bank-change-container').classList.remove('hidden');
            }
        }

        async function handleKycSubmit(e) {
            e.preventDefault();
            const payload = {
                userId: currentUser.id,
                aadhaar_no: document.getElementById('kyc-aadhaar').value,
                pan_no: document.getElementById('kyc-pan').value,
                acc_holder_name: document.getElementById('kyc-acc-name').value,
                bank_acc_no: document.getElementById('kyc-acc-no').value,
                bank_ifsc: document.getElementById('kyc-ifsc').value
            };
            const res = await fetch('/api/user/kyc', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const data = await res.json();
            if (res.ok) {
                alert('KYC submitted and verified successfully!');
                currentUser = data.user;
                checkKycStatusUI();
            } else { alert(data.error || 'Error submitting KYC'); }
        }

        function openBankChangeModal() { document.getElementById('bank-change-modal').classList.remove('hidden'); }
        function closeBankChangeModal() { document.getElementById('bank-change-modal').classList.add('hidden'); }

        async function handleBankUpdate(e) {
            e.preventDefault();
            const payload = {
                userId: currentUser.id,
                bank_acc_no: document.getElementById('new-acc-no').value,
                bank_ifsc: document.getElementById('new-ifsc').value
            };
            const res = await fetch('/api/user/bank-update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const data = await res.json();
            if (res.ok) {
                alert('Bank account updated successfully!');
                currentUser = data.user;
                checkKycStatusUI();
                closeBankChangeModal();
            } else { alert(data.error || 'Error updating bank'); }
        }

        async function handleSendSms(e) {
            e.preventDefault();
            const recipients = document.getElementById('sms-recipients').value;
            const message = document.getElementById('sms-message').value;

            const modal = document.getElementById('campaign-progress-modal');
            const spinner = document.getElementById('prog-spinner');
            const barCont = document.getElementById('prog-bar-container');
            const fill = document.getElementById('prog-fill');
            const successIcon = document.getElementById('prog-success-icon');
            const statusText = document.getElementById('prog-status-text');

            modal.classList.remove('hidden');
            spinner.classList.remove('hidden');
            barCont.classList.add('hidden');
            successIcon.classList.add('hidden');
            statusText.innerText = 'Initializing Campaign...';

            // Phase 1: 2 sec round spinner
            setTimeout(() => {
                spinner.classList.add('hidden');
                barCont.classList.remove('hidden');
                statusText.innerText = 'Broadcasting Campaign...';
                fill.style.width = '0%';
                setTimeout(() => { fill.style.width = '100%'; }, 50);
            }, 2000);

            // Phase 2: 10 sec progress bar
            setTimeout(async () => {
                const res = await fetch('/api/user/sms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: currentUser.id, recipients, message }) });
                const data = await res.json();
                
                barCont.classList.add('hidden');
                successIcon.classList.remove('hidden');
                statusText.innerText = 'Message sent successfully';

                if (res.ok) {
                    currentUser.sms_wallet = data.new_sms_wallet;
                    updateWalletsUI();
                    generateMaskedNumbers();
                }

                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 1500);
            }, 12000);
        }

        async function handleDepositRequest(e) {
            e.preventDefault();
            const amount = document.getElementById('dep-amount').value, utr_number = document.getElementById('dep-utr').value;
            const res = await fetch('/api/user/deposit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: currentUser.id, amount, utr_number }) });
            if (res.ok) { alert('Deposit request submitted!'); closeQrModal(); document.getElementById('dep-amount').value = ''; document.getElementById('dep-utr').value = ''; }
            else { alert('Error submitting request'); }
        }

        function startWithdrawalProcess(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('wit-amount').value);
            if (amount < 5000 || amount > 50000) {
                alert('Withdrawal limit error: Min amount is ₹5,000 and Max amount is ₹50,000.');
                return;
            }
            if (currentUser.kyc_status !== 'Verified') {
                alert('Please complete your KYC first before requesting a withdrawal.');
                navigateTo('kyc');
                return;
            }
            pendingWithdrawAmount = amount;
            document.getElementById('prev-wit-amount').innerText = \`₹\${amount}\`;
            document.getElementById('prev-bank-holder').innerText = currentUser.acc_holder_name || 'N/A';
            document.getElementById('prev-bank-details').innerText = \`A/C: \${currentUser.bank_acc_no} | IFSC: \${currentUser.bank_ifsc}\`;
            document.getElementById('withdraw-preview-modal').classList.remove('hidden');
        }

        function closeWithdrawModal() { document.getElementById('withdraw-preview-modal').classList.add('hidden'); }

        async function confirmWithdrawal() {
            closeWithdrawModal();
            const payment_info = \`A/C: \${currentUser.bank_acc_no}, IFSC: \${currentUser.bank_ifsc}, Name: \${currentUser.acc_holder_name}\`;
            const res = await fetch('/api/user/withdraw', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: currentUser.id, amount: pendingWithdrawAmount, payment_info }) });
            const data = await res.json();
            if (res.ok) {
                alert('Withdrawal request successful!');
                currentUser.earning_wallet = data.new_earning;
                updateWalletsUI();
                document.getElementById('wit-amount').value = '';
            } else { alert(data.error || 'Withdrawal failed'); }
        }

        function switchHistoryTab(tab) {
            historyTypeCache = tab;
            ['deposits', 'withdrawals', 'sms'].forEach(t => {
                const btn = document.getElementById('hist-btn-' + (t === 'deposits' ? 'dep' : t === 'withdrawals' ? 'wit' : 'sms'));
                btn.className = 'flex-1 py-2 font-bold rounded-lg ' + (t === tab ? 'bg-emerald-600 text-white' : 'text-gray-400');
            });
            loadHistoryData(tab);
        }

        async function loadHistoryData(type) {
            const listContainer = document.getElementById('history-content-list');
            listContainer.innerHTML = '<p class="text-center text-xs text-gray-500 py-6">Loading...</p>';
            const res = await fetch(\`/api/user/history?userId=\${currentUser.id}&type=\${type}\`);
            const data = await res.json();
            if (!res.ok) return;

            if (type === 'deposits') {
                listContainer.innerHTML = data.items.map(i => \`
                    <div class="bg-gray-900 border border-gray-800 p-3 rounded-xl text-xs flex justify-between items-center">
                        <div>
                            <p class="font-bold text-white">Deposit: ₹\${i.amount}</p>
                            <p class="text-[10px] text-gray-400 font-mono">UTR: \${i.utr_number}</p>
                        </div>
                        <span class="px-2 py-1 rounded text-[10px] font-bold \${i.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : i.status === 'Rejected' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}">\${i.status}</span>
                    </div>
                \`).join('') || '<p class="text-center text-xs text-gray-500 py-6">No deposit history.</p>';
            } else if (type === 'withdrawals') {
                listContainer.innerHTML = data.items.map(i => \`
                    <div class="bg-gray-900 border border-gray-800 p-3 rounded-xl text-xs flex justify-between items-center">
                        <div>
                            <p class="font-bold text-white">Withdrawal: ₹\${i.amount}</p>
                            <p class="text-[10px] text-gray-400 truncate max-w-[180px]">\${i.payment_info}</p>
                        </div>
                        <span class="px-2 py-1 rounded text-[10px] font-bold \${i.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : i.status === 'Rejected' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}">\${i.status}</span>
                    </div>
                \`).join('') || '<p class="text-center text-xs text-gray-500 py-6">No withdrawal history.</p>';
            } else if (type === 'sms') {
                listContainer.innerHTML = data.items.map(i => \`
                    <div class="bg-gray-900 border border-gray-800 p-3 rounded-xl text-xs space-y-1">
                        <div class="flex justify-between font-bold text-white"><span>To: \${i.recipients}</span><span class="text-emerald-400">\${i.status}</span></div>
                        <p class="text-[11px] text-gray-300">"\${i.message}"</p>
                    </div>
                \`).join('') || '<p class="text-center text-xs text-gray-500 py-6">No SMS campaign logs.</p>';
            }
        }

        function openPolicyModal(type) {
            toggleSidebar(false);
            const modal = document.getElementById('policy-modal');
            const title = document.getElementById('policy-title');
            const content = document.getElementById('policy-content');
            modal.classList.remove('hidden');
            if(type === 'terms') {
                title.innerText = 'Terms & Conditions';
                content.innerHTML = '<p>1. Users must maintain sufficient SMS wallet balance to broadcast campaigns.</p><p>2. Withdrawals are processed strictly within limits (Min ₹5,000 / Max ₹50,000).</p><p>3. KYC details once submitted and verified cannot be modified directly except bank account number and IFSC.</p>';
            } else {
                title.innerText = 'Refund Policy';
                content.innerHTML = '<p>1. Deposit requests submitted with invalid UTR will be rejected by admin.</p><p>2. Rejected withdrawal amounts are automatically refunded back to the user earning wallet.</p><p>3. All campaign charges are final upon successful broadcast.</p>';
            }
        }
        function closePolicyModal() { document.getElementById('policy-modal').classList.add('hidden'); }

        function openQrModal() { document.getElementById('qr-modal').classList.remove('hidden'); }
        function closeQrModal() { document.getElementById('qr-modal').classList.add('hidden'); }
        function logout() { location.reload(); }
    </script>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };

    if (method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
      if (path === "/api/login" && method === "POST") {
        const { mobile, password } = await request.json();
        const user = await env.DB.prepare("SELECT * FROM users WHERE mobile = ? AND password = ?").bind(mobile, password).first();
        if (!user) return new Response(JSON.stringify({ error: "Invalid mobile or password" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        return new Response(JSON.stringify({ success: true, user }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/api/register" && method === "POST") {
        const { name, mobile, password } = await request.json();
        const existing = await env.DB.prepare("SELECT id FROM users WHERE mobile = ?").bind(mobile).first();
        if (existing) return new Response(JSON.stringify({ error: "Mobile number already registered" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        
        await env.DB.prepare(`
          INSERT INTO users (name, mobile, password, role, sms_wallet, earning_wallet, bonus_wallet, pan_no, bank_details, kyc_status) 
          VALUES (?, ?, ?, 'user', 0.00, 0.00, 0.00, '', '', 'Pending')
        `).bind(name, mobile, password).run();
        
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/api/user/kyc" && method === "POST") {
        const { userId, aadhaar_no, pan_no, acc_holder_name, bank_acc_no, bank_ifsc } = await request.json();
        await env.DB.prepare(`
          UPDATE users SET aadhaar_no = ?, pan_no = ?, acc_holder_name = ?, bank_acc_no = ?, bank_ifsc = ?, kyc_status = 'Verified' 
          WHERE id = ?
        `).bind(aadhaar_no, pan_no, acc_holder_name, bank_acc_no, bank_ifsc, userId).run();
        const user = await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(userId).first();
        return new Response(JSON.stringify({ success: true, user }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/api/user/bank-update" && method === "POST") {
        const { userId, bank_acc_no, bank_ifsc } = await request.json();
        await env.DB.prepare("UPDATE users SET bank_acc_no = ?, bank_ifsc = ? WHERE id = ?").bind(bank_acc_no, bank_ifsc, userId).run();
        const user = await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(userId).first();
        return new Response(JSON.stringify({ success: true, user }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/api/user/sms" && method === "POST") {
        const { userId, recipients, message } = await request.json();
        const smsCost = 0.50;
        const earningGain = 1.50;
        const user = await env.DB.prepare("SELECT sms_wallet FROM users WHERE id = ?").bind(userId).first();
        if (!user || user.sms_wallet < smsCost) {
          return new Response(JSON.stringify({ error: "Insufficient SMS Wallet balance" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        await env.DB.prepare("UPDATE users SET sms_wallet = sms_wallet - ?, earning_wallet = earning_wallet + ? WHERE id = ?").bind(smsCost, earningGain, userId).run();
        await env.DB.prepare("INSERT INTO sms_logs (user_id, recipients, message, status) VALUES (?, ?, ?, 'Sent')").bind(userId, recipients, message).run();
        const updated = await env.DB.prepare("SELECT sms_wallet FROM users WHERE id = ?").bind(userId).first();
        return new Response(JSON.stringify({ success: true, new_sms_wallet: updated.sms_wallet }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/api/user/deposit" && method === "POST") {
        const { userId, amount, utr_number } = await request.json();
        await env.DB.prepare("INSERT INTO add_fund_requests (user_id, amount, utr_number, status) VALUES (?, ?, ?, 'Pending')").bind(userId, amount, utr_number).run();
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/api/user/withdraw" && method === "POST") {
        const { userId, amount, payment_info } = await request.json();
        if (amount < 5000 || amount > 50000) {
          return new Response(JSON.stringify({ error: "Amount must be between ₹5,000 and ₹50,000" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        const user = await env.DB.prepare("SELECT earning_wallet FROM users WHERE id = ?").bind(userId).first();
        if (!user || user.earning_wallet < amount) {
          return new Response(JSON.stringify({ error: "Insufficient earning wallet balance" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        await env.DB.prepare("UPDATE users SET earning_wallet = earning_wallet - ? WHERE id = ?").bind(amount, userId).run();
        await env.DB.prepare("INSERT INTO withdrawals (user_id, amount, payment_info, status) VALUES (?, ?, ?, 'Pending')").bind(userId, amount, payment_info).run();
        const updatedUser = await env.DB.prepare("SELECT earning_wallet FROM users WHERE id = ?").bind(userId).first();
        return new Response(JSON.stringify({ success: true, new_earning: updatedUser.earning_wallet }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/api/user/history" && method === "GET") {
        const userId = url.searchParams.get("userId");
        const type = url.searchParams.get("type");
        let items = [];
        if (type === 'deposits') {
          const res = await env.DB.prepare("SELECT * FROM add_fund_requests WHERE user_id = ? ORDER BY id DESC").bind(userId).all();
          items = res.results || [];
        } else if (type === 'withdrawals') {
          const res = await env.DB.prepare("SELECT * FROM withdrawals WHERE user_id = ? ORDER BY id DESC").bind(userId).all();
          items = res.results || [];
        } else if (type === 'sms') {
          const res = await env.DB.prepare("SELECT * FROM sms_logs WHERE user_id = ? ORDER BY id DESC").bind(userId).all();
          items = res.results || [];
        }
        return new Response(JSON.stringify({ success: true, items }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      
      return new Response(USER_HTML, { status: 200, headers: { ...corsHeaders, "Content-Type": "text/html" } });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
  }
};
