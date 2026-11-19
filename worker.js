const USER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>BSNL Broadcast & Wallet App</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-tap-highlight-color: transparent; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .glass-card { background: rgba(17, 24, 39, 0.75); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); }
        .wallet-gradient-sms { background: linear-gradient(135deg, #059669 0%, #047857 50%, #064e3b 100%); }
        .wallet-gradient-earn { background: linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #0c4a6e 100%); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-[#070b14] min-h-screen text-slate-100 flex flex-col items-center justify-center p-0 sm:p-4">

    <!-- PREMIUM APP TOAST ALERT BANNER (NO BROWSER DEFAULT POPUP) -->
    <div id="app-toast" class="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-sm pointer-events-none opacity-0 -translate-y-4 transition-all duration-300">
        <div id="app-toast-card" class="flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-xl text-xs font-bold">
            <div id="app-toast-icon" class="w-7 h-7 rounded-xl flex items-center justify-center text-sm shrink-0 font-extrabold">✓</div>
            <p id="app-toast-msg" class="leading-snug flex-1">Notification message</p>
        </div>
    </div>

    <!-- MOBILE APP SHELL -->
    <div class="w-full max-w-md bg-[#0b1120] min-h-screen sm:min-h-[86vh] sm:max-h-[90vh] sm:rounded-[2.2rem] shadow-[0_0_50px_rgba(16,185,129,0.12)] flex flex-col relative overflow-hidden border border-slate-800/80">

        <!-- AMBIENT BACKGROUND GLOW -->
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/2 -left-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- ==================== AUTH SCREEN (LOGIN / REGISTER) ==================== -->
        <div id="auth-container" class="flex-1 flex flex-col justify-center p-6 space-y-6 my-auto relative z-10">
            <div class="text-center space-y-3">
                <div class="inline-flex p-2.5 bg-white rounded-2xl shadow-lg shadow-emerald-950/50">
                    <img src="https://i.ibb.co/C5VBSGcV/BSNL-New-Logo.png" alt="BSNL Logo" class="h-12 object-contain">
                </div>
                <div>
                    <h1 class="text-lg font-extrabold text-white tracking-tight">BSNL Partner Portal</h1>
                    <p class="text-xs text-slate-400">Next-Gen SMS Broadcast & Rewards</p>
                </div>
                
                <!-- PREMIUM TOGGLE SWITCH -->
                <div class="bg-slate-900/90 p-1.5 rounded-2xl flex relative mt-4 border border-slate-800 shadow-inner">
                    <div id="toggle-bg" class="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl transition-all duration-300 shadow-md left-1.5"></div>
                    <button onclick="switchAuthTab('login')" id="btn-tab-login" class="flex-1 py-2.5 text-xs font-bold relative z-10 text-white transition-colors">Login</button>
                    <button onclick="switchAuthTab('register')" id="btn-tab-register" class="flex-1 py-2.5 text-xs font-bold relative z-10 text-slate-400 transition-colors">Register</button>
                </div>
            </div>

            <!-- LOGIN FORM -->
            <div id="login-box" class="glass-card rounded-3xl p-5 space-y-4 shadow-xl">
                <form onsubmit="handleLogin(event)" class="space-y-4">
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Mobile Number</label>
                        <div class="relative">
                            <span class="absolute left-3.5 top-3 text-slate-500 text-xs font-mono">+91</span>
                            <input type="tel" id="login-mobile" required placeholder="9876543210" class="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-emerald-500 transition-colors">
                        </div>
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
                        <input type="password" id="login-password" required placeholder="••••••••" class="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors">
                    </div>
                    <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition-all">Sign In →</button>
                </form>
            </div>

            <!-- REGISTER FORM (NO PAN) -->
            <div id="register-box" class="glass-card rounded-3xl p-5 space-y-4 shadow-xl hidden">
                <form onsubmit="handleRegister(event)" class="space-y-3.5">
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
                        <input type="text" id="reg-name" required placeholder="Enter your full name" class="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Mobile Number</label>
                        <div class="relative">
                            <span class="absolute left-3.5 top-2.5 text-slate-500 text-xs font-mono">+91</span>
                            <input type="tel" id="reg-mobile" required placeholder="10-digit mobile" class="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-emerald-500">
                        </div>
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Create Password</label>
                        <input type="password" id="reg-password" required placeholder="Strong password" class="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500">
                    </div>
                    <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition-all mt-1">Create Account</button>
                </form>
            </div>
        </div>

        <!-- ==================== MAIN APP DASHBOARD ==================== -->
        <div id="app-dashboard" class="flex-1 flex flex-col hidden relative z-10 overflow-hidden">
            
            <!-- TOP APP BAR (3-LINE MENU LEFT + FIXED BSNL LOGO RIGHT) -->
            <div class="bg-slate-900/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-800/80 sticky top-0 z-20">
                <div class="flex items-center space-x-3">
                    <button onclick="toggleSidebar(true)" class="p-2 bg-slate-800/80 hover:bg-slate-800 rounded-xl text-slate-200 active:scale-95 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 6h16M4 12h12M4 18h16"></path></svg>
                    </button>
                    <div>
                        <h2 id="app-header-title" class="text-sm font-extrabold text-white tracking-tight">Home</h2>
                        <p class="text-[10px] text-emerald-400 font-mono" id="app-header-mobile"></p>
                    </div>
                </div>
                <!-- FIXED TOP-RIGHT LOGO -->
                <div class="bg-white px-2 py-1 rounded-xl shadow-md">
                    <img src="https://i.ibb.co/C5VBSGcV/BSNL-New-Logo.png" alt="BSNL Logo" class="h-6 object-contain">
                </div>
            </div>

            <!-- ==================== LEFT 3-LINE SIDEBAR DRAWER ==================== -->
            <div id="sidebar-backdrop" onclick="toggleSidebar(false)" class="fixed inset-0 bg-black/75 backdrop-blur-xs z-40 hidden transition-opacity"></div>
            <div id="sidebar-drawer" class="fixed top-0 left-0 bottom-0 w-72 bg-[#0b1120] border-r border-slate-800 z-50 transform -translate-x-full transition-transform duration-300 flex flex-col shadow-2xl">
                <div class="p-5 bg-gradient-to-br from-emerald-900/50 to-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-base" id="sidebar-avatar">U</div>
                        <div>
                            <h3 id="sidebar-user-name" class="font-bold text-sm text-white">User Name</h3>
                            <p id="sidebar-user-mob" class="text-[11px] text-emerald-400 font-mono">Mobile</p>
                        </div>
                    </div>
                    <button onclick="toggleSidebar(false)" class="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs">✕</button>
                </div>

                <div class="p-3 space-y-1 flex-1 overflow-y-auto no-scrollbar text-xs font-semibold">
                    <button onclick="navigateTo('home')" class="w-full text-left px-3.5 py-3 rounded-xl hover:bg-slate-900 flex items-center space-x-3 text-slate-200 transition">
                        <span class="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">🏠</span>
                        <span>Home</span>
                    </button>
                    <button onclick="navigateTo('wallet')" class="w-full text-left px-3.5 py-3 rounded-xl hover:bg-slate-900 flex items-center space-x-3 text-slate-200 transition">
                        <span class="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">💳</span>
                        <span>Wallets</span>
                    </button>
                    <button onclick="navigateTo('kyc')" class="w-full text-left px-3.5 py-3 rounded-xl hover:bg-slate-900 flex items-center space-x-3 text-slate-200 transition">
                        <span class="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">🪪</span>
                        <span>KYC Verification</span>
                    </button>
                    <button onclick="navigateTo('history')" class="w-full text-left px-3.5 py-3 rounded-xl hover:bg-slate-900 flex items-center space-x-3 text-slate-200 transition">
                        <span class="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">📊</span>
                        <span>History</span>
                    </button>
                    
                    <div class="pt-3 mt-2 border-t border-slate-800/80 space-y-1">
                        <p class="px-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Help & Policies</p>
                        <button onclick="openPolicyModal('terms')" class="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-900 flex items-center space-x-3 text-slate-300 text-[11px]">
                            <span>📄</span><span>Terms & Conditions</span>
                        </button>
                        <button onclick="openPolicyModal('refund')" class="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-slate-900 flex items-center space-x-3 text-slate-300 text-[11px]">
                            <span>🔄</span><span>Refund Policy</span>
                        </button>
                        <a href="https://t.me/YourTelegramBot" target="_blank" class="w-full text-left px-3.5 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 flex items-center space-x-3 text-sky-400 text-[11px] font-bold mt-1">
                            <span>✈️</span><span>Customer Support</span>
                        </a>
                    </div>
                </div>

                <div class="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/60">
                    <div class="grid grid-cols-2 gap-2">
                        <div class="bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-xl flex items-center space-x-2 cursor-pointer hover:border-slate-700">
                            <span class="text-base">▶️</span>
                            <div>
                                <p class="text-[8px] text-slate-400 leading-none">GET IT ON</p>
                                <p class="text-[10px] font-bold text-white mt-0.5">Google Play</p>
                            </div>
                        </div>
                        <div class="bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-xl flex items-center space-x-2 cursor-pointer hover:border-slate-700">
                            <span class="text-base"></span>
                            <div>
                                <p class="text-[8px] text-slate-400 leading-none">Download on</p>
                                <p class="text-[10px] font-bold text-white mt-0.5">App Store</p>
                            </div>
                        </div>
                    </div>
                    <button onclick="logout()" class="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl text-xs border border-red-500/20 transition">Sign Out</button>
                </div>
            </div>

            <!-- ==================== SCROLLABLE CONTENT AREA ==================== -->
            <div class="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4 pb-24">

                <!-- 1. HOME SCREEN -->
                <div id="sec-home" class="space-y-4">
                    <div class="wallet-gradient-sms p-5 rounded-3xl shadow-lg shadow-emerald-950/50 border border-emerald-400/20 flex items-center justify-between relative overflow-hidden">
                        <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
                        <div>
                            <span class="px-2 py-0.5 bg-black/25 rounded-md text-[9px] font-bold uppercase tracking-wider text-emerald-100">SMS Wallet Balance</span>
                            <p id="home-sms-wallet" class="text-2xl font-extrabold text-white font-mono mt-1.5">₹0.00</p>
                        </div>
                        <button onclick="openQrModal()" class="px-4 py-3 bg-white text-emerald-900 hover:bg-emerald-50 font-extrabold rounded-2xl text-xs shadow-lg active:scale-95 transition flex items-center space-x-1.5 relative z-10">
                            <span>➕</span><span>Add Fund</span>
                        </button>
                    </div>

                    <div class="glass-card p-5 rounded-3xl space-y-4 shadow-xl">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2">
                                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                <h3 class="text-xs font-extrabold text-white uppercase tracking-wider">Bulk SMS Terminal</h3>
                            </div>
                            <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">GATEWAY READY</span>
                        </div>

                        <form onsubmit="handleSendSms(event)" class="space-y-3.5">
                            <div>
                                <div class="flex justify-between items-center mb-1">
                                    <label class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Recipients</label>
                                    <button type="button" onclick="generateMaskedNumbers()" class="text-[10px] text-emerald-400 font-bold hover:underline">↻ Refresh List</button>
                                </div>
                                <input type="text" id="sms-recipients" required readonly class="w-full px-3.5 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-emerald-300 font-mono">
                            </div>

                            <div>
                                <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Approved Promotional Template</label>
                                <div class="relative">
                                    <textarea id="sms-message" required readonly rows="3" class="w-full px-3.5 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-slate-300 resize-none leading-relaxed">Special BSNL 5G Network Expansion Offer! Recharge now & get unlimited benefits across India. Click to activate: https://bsnl.co.in</textarea>
                                    <span class="absolute bottom-2 right-2.5 text-[9px] font-bold uppercase bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Locked</span>
                                </div>
                            </div>

                            <button type="submit" id="send-sms-btn" class="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-emerald-600/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2">
                                <span>🚀</span><span>Send SMS Now</span>
                            </button>
                        </form>
                    </div>
                </div>

                <!-- 2. WALLETS SCREEN -->
                <div id="sec-wallet" class="space-y-4 hidden">
                    <div class="wallet-gradient-sms p-5 rounded-3xl shadow-lg border border-emerald-400/20 flex items-center justify-between">
                        <div>
                            <p class="text-[10px] uppercase font-bold tracking-wider text-emerald-200">SMS Wallet (Includes Bonus)</p>
                            <p id="val-sms-wallet" class="text-2xl font-extrabold text-white font-mono mt-1">₹0.00</p>
                        </div>
                        <button onclick="openQrModal()" class="px-3.5 py-2.5 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl text-xs backdrop-blur-xs border border-white/20">➕ Add Fund</button>
                    </div>

                    <div onclick="document.getElementById('wit-amount').focus()" class="wallet-gradient-earn p-5 rounded-3xl shadow-lg border border-sky-400/20 cursor-pointer relative overflow-hidden">
                        <div class="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="text-[10px] uppercase font-bold tracking-wider text-sky-200">Earning Wallet (Withdrawable)</p>
                                <p id="val-earning-wallet" class="text-2xl font-extrabold text-white font-mono mt-1">₹0.00</p>
                            </div>
                            <span class="px-2.5 py-1 bg-black/25 rounded-lg text-[10px] font-bold text-sky-100">Available</span>
                        </div>
                    </div>

                    <div class="glass-card p-5 rounded-3xl space-y-3.5 shadow-xl">
                        <h3 class="text-xs font-extrabold text-sky-400 uppercase tracking-wider">💸 Withdraw Earning Balance</h3>
                        <form onsubmit="startWithdrawalProcess(event)" class="space-y-3">
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Enter Amount (₹)</label>
                                <input type="number" step="1" id="wit-amount" required placeholder="Enter withdrawal amount" class="w-full px-4 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-sky-500">
                            </div>
                            <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-sky-600/25 active:scale-[0.98] transition">Preview & Withdraw →</button>
                        </form>
                    </div>
                </div>

                <!-- 3. KYC SCREEN -->
                <div id="sec-kyc" class="space-y-4 hidden">
                    <div class="glass-card p-5 rounded-3xl space-y-4 shadow-xl">
                        <div class="flex justify-between items-center border-b border-slate-800 pb-3">
                            <div>
                                <h3 class="text-xs font-extrabold text-white uppercase tracking-wider">🪪 KYC & Bank Link</h3>
                                <p class="text-[10px] text-slate-400 mt-0.5">Step-by-step identity verification</p>
                            </div>
                            <span id="kyc-status-badge" class="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Unverified</span>
                        </div>
                        
                        <form id="kyc-form" onsubmit="handleKycSubmit(event)" class="space-y-3">
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Step 1: Aadhaar Number</label>
                                <input type="text" id="kyc-aadhaar" required maxlength="12" placeholder="12-digit Aadhaar number" class="w-full px-3.5 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-white font-mono">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Step 2: PAN Number</label>
                                <input type="text" id="kyc-pan" required maxlength="10" placeholder="ABCDE1234F" class="w-full px-3.5 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-white font-mono uppercase">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Step 3: Account Holder Name</label>
                                <input type="text" id="kyc-acc-name" required placeholder="Full name as per bank" class="w-full px-3.5 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-white">
                            </div>
                            <div class="grid grid-cols-2 gap-2.5">
                                <div>
                                    <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Step 4: Account No</label>
                                    <input type="text" id="kyc-acc-no" required placeholder="Account number" class="w-full px-3 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-white font-mono">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1">Step 5: IFSC Code</label>
                                    <input type="text" id="kyc-ifsc" required placeholder="SBIN0001234" class="w-full px-3 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-white font-mono uppercase">
                                </div>
                            </div>
                            <button type="submit" id="kyc-submit-btn" class="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-xs shadow-lg mt-2">Verify & Lock KYC</button>
                        </form>

                        <div id="bank-change-container" class="hidden pt-3 border-t border-slate-800">
                            <button onclick="openBankChangeModal()" class="w-full py-3 bg-slate-900 hover:bg-slate-800 text-sky-400 font-bold rounded-xl text-xs border border-sky-500/30 transition flex items-center justify-center space-x-2">
                                <span>🏦</span><span>Change Bank Account</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 4. HISTORY SCREEN -->
                <div id="sec-history" class="space-y-4 hidden">
                    <div class="bg-slate-900/90 p-1.5 rounded-2xl flex border border-slate-800 text-[11px] shadow-inner">
                        <button onclick="switchHistoryTab('deposits')" id="hist-btn-dep" class="flex-1 py-2 font-bold rounded-xl bg-emerald-600 text-white shadow transition-all">Deposits</button>
                        <button onclick="switchHistoryTab('withdrawals')" id="hist-btn-wit" class="flex-1 py-2 font-bold rounded-xl text-slate-400 transition-all">Withdrawals</button>
                        <button onclick="switchHistoryTab('sms')" id="hist-btn-sms" class="flex-1 py-2 font-bold rounded-xl text-slate-400 transition-all">SMS Logs</button>
                    </div>

                    <div id="history-content-list" class="space-y-2.5">
                        <p class="text-center text-xs text-slate-500 py-8">Loading records...</p>
                    </div>
                </div>

            </div>

            <!-- BOTTOM APP NAVIGATION BAR -->
            <div class="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/90 px-2 py-2 flex justify-around items-center z-20">
                <button onclick="navigateTo('home')" id="nav-btn-home" class="flex flex-col items-center text-emerald-400 text-[10px] font-bold space-y-1 px-3 py-1 rounded-xl">
                    <span class="text-base">🏠</span><span>Home</span>
                </button>
                <button onclick="navigateTo('wallet')" id="nav-btn-wallet" class="flex flex-col items-center text-slate-400 hover:text-emerald-400 text-[10px] font-semibold space-y-1 px-3 py-1 rounded-xl">
                    <span class="text-base">💳</span><span>Wallet</span>
                </button>
                <button onclick="navigateTo('kyc')" id="nav-btn-kyc" class="flex flex-col items-center text-slate-400 hover:text-emerald-400 text-[10px] font-semibold space-y-1 px-3 py-1 rounded-xl">
                    <span class="text-base">🪪</span><span>KYC</span>
                </button>
                <button onclick="navigateTo('history')" id="nav-btn-history" class="flex flex-col items-center text-slate-400 hover:text-emerald-400 text-[10px] font-semibold space-y-1 px-3 py-1 rounded-xl">
                    <span class="text-base">📊</span><span>History</span>
                </button>
            </div>
        </div>
    </div>

    <!-- ==================== FULL-SCREEN QR MODAL WITH UPI APPS ==================== -->
    <div id="qr-modal" class="fixed inset-0 bg-[#070b14]/95 backdrop-blur-md z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-[#0f172a] border border-slate-800 w-full max-w-sm rounded-[2rem] p-6 shadow-2xl flex flex-col items-center relative space-y-4">
            <button onclick="closeQrModal()" class="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-slate-300 w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm">✕</button>
            
            <div class="text-center">
                <span class="px-2.5 py-0.5 bg-emerald-500/15 text-emerald-400 rounded-full text-[10px] font-bold uppercase">Instant UPI Deposit</span>
                <h3 class="text-base font-extrabold text-white mt-1.5">Scan & Pay Any Amount</h3>
            </div>

            <div class="bg-white p-2.5 border-4 border-emerald-500 rounded-3xl shadow-xl">
                <img src="https://i.ibb.co/qLGftMvF/IMG-20261116-120334.jpg" alt="Payment QR" class="w-56 h-56 object-contain rounded-2xl">
            </div>

            <div class="w-full">
                <p class="text-[10px] text-center font-bold uppercase tracking-wider text-slate-400 mb-2">Pay Using Any UPI App</p>
                <div class="grid grid-cols-4 gap-2 text-center">
                    <a href="upi://pay" class="bg-slate-900 border border-slate-800 p-2 rounded-xl hover:border-blue-500/50 transition">
                        <div class="w-7 h-7 mx-auto rounded-full bg-blue-500/20 text-blue-400 font-extrabold text-xs flex items-center justify-center">G</div>
                        <p class="text-[9px] font-bold text-slate-300 mt-1">GPay</p>
                    </a>
                    <a href="upi://pay" class="bg-slate-900 border border-slate-800 p-2 rounded-xl hover:border-purple-500/50 transition">
                        <div class="w-7 h-7 mx-auto rounded-full bg-purple-500/20 text-purple-400 font-extrabold text-xs flex items-center justify-center">Pe</div>
                        <p class="text-[9px] font-bold text-slate-300 mt-1">PhonePe</p>
                    </a>
                    <a href="upi://pay" class="bg-slate-900 border border-slate-800 p-2 rounded-xl hover:border-sky-500/50 transition">
                        <div class="w-7 h-7 mx-auto rounded-full bg-sky-500/20 text-sky-400 font-extrabold text-xs flex items-center justify-center">Py</div>
                        <p class="text-[9px] font-bold text-slate-300 mt-1">Paytm</p>
                    </a>
                    <a href="upi://pay" class="bg-slate-900 border border-slate-800 p-2 rounded-xl hover:border-orange-500/50 transition">
                        <div class="w-7 h-7 mx-auto rounded-full bg-orange-500/20 text-orange-400 font-extrabold text-xs flex items-center justify-center">B</div>
                        <p class="text-[9px] font-bold text-slate-300 mt-1">BHIM</p>
                    </a>
                </div>
            </div>

            <form onsubmit="handleDepositRequest(event)" class="w-full space-y-2.5 pt-2 border-t border-slate-800">
                <input type="number" step="1" id="dep-amount" required placeholder="Enter Paid Amount (₹)" class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono">
                <input type="text" id="dep-utr" required placeholder="Enter 12-Digit UTR Number" class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono">
                <button type="submit" class="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-xs shadow-lg">Submit Deposit Request</button>
            </form>
        </div>
    </div>

    <!-- ==================== WITHDRAWAL PREVIEW MODAL ==================== -->
    <div id="withdraw-preview-modal" class="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-[#0f172a] border border-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4">
            <div class="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 class="font-extrabold text-sm text-sky-400">🔍 Withdrawal Preview</h3>
                <button onclick="closeWithdrawModal()" class="text-slate-400 text-sm">✕</button>
            </div>
            <div class="space-y-3 text-xs">
                <div class="flex justify-between items-center bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                    <span class="text-slate-400">Payout Amount:</span>
                    <span id="prev-wit-amount" class="text-base font-extrabold font-mono text-emerald-400">₹0</span>
                </div>
                <div class="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                    <p class="text-[10px] uppercase font-bold text-slate-400">Linked Bank Account:</p>
                    <p id="prev-bank-holder" class="font-bold text-white text-sm"></p>
                    <p id="prev-bank-details" class="font-mono text-sky-300 text-xs"></p>
                </div>
            </div>
            <div class="flex gap-2.5 pt-2">
                <button onclick="closeWithdrawModal()" class="w-1/2 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs">Cancel</button>
                <button onclick="confirmWithdrawal()" class="w-1/2 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-xs shadow-lg">Confirm Payout</button>
            </div>
        </div>
    </div>

    <!-- ==================== CHANGE BANK ACCOUNT MODAL ==================== -->
    <div id="bank-change-modal" class="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-[#0f172a] border border-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4">
            <div class="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 class="font-extrabold text-sm text-sky-400">🏦 Update Bank Account</h3>
                <button onclick="closeBankChangeModal()" class="text-slate-400 text-sm">✕</button>
            </div>
            <form onsubmit="handleBankUpdate(event)" class="space-y-3">
                <div>
                    <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1">New Account Number</label>
                    <input type="text" id="new-acc-no" required placeholder="Enter new account number" class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono">
                </div>
                <div>
                    <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1">New IFSC Code</label>
                    <input type="text" id="new-ifsc" required placeholder="Enter new IFSC code" class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono uppercase">
                </div>
                <button type="submit" class="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-lg mt-2">Save Bank Details</button>
            </form>
        </div>
    </div>

    <!-- ==================== POLICY MODAL ==================== -->
    <div id="policy-modal" class="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-[#0f172a] border border-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-3 relative max-h-[80vh] flex flex-col">
            <button onclick="closePolicyModal()" class="absolute top-4 right-4 text-slate-400 text-sm font-bold">✕</button>
            <h3 id="policy-title" class="font-extrabold text-sm text-emerald-400">Policy</h3>
            <div id="policy-content" class="text-xs text-slate-300 overflow-y-auto space-y-2.5 flex-1 pr-1 leading-relaxed"></div>
        </div>
    </div>

    <!-- ==================== CAMPAIGN PROGRESS & SUCCESS OVERLAY ==================== -->
    <div id="campaign-progress-modal" class="fixed inset-0 bg-black/90 backdrop-blur-md z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-[#0f172a] border border-slate-800 w-full max-w-xs rounded-3xl p-7 shadow-2xl flex flex-col items-center space-y-5 text-center">
            <div id="prog-spinner" class="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            
            <div id="prog-bar-container" class="w-full bg-slate-900 h-3 rounded-full overflow-hidden hidden border border-slate-800 p-0.5">
                <div id="prog-fill" class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-0 rounded-full transition-all duration-[10000ms] linear"></div>
            </div>
            
            <div id="prog-success-icon" class="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl font-extrabold hidden border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/20">✓</div>
            
            <p id="prog-status-text" class="text-xs font-extrabold text-white tracking-wide">Connecting to SMSC...</p>
        </div>
    </div>

    <script>
        let currentUser = null, pendingWithdrawAmount = 0, historyTypeCache = 'deposits', toastTimer = null;

        function showAlert(message, type = 'info') {
            const toast = document.getElementById('app-toast');
            const card = document.getElementById('app-toast-card');
            const icon = document.getElementById('app-toast-icon');
            const text = document.getElementById('app-toast-msg');

            const styles = {
                success: {
                    card: 'bg-emerald-950/95 border-emerald-500/40 text-emerald-100 shadow-emerald-950/60',
                    icon: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
                    symbol: '✓'
                },
                error: {
                    card: 'bg-rose-950/95 border-rose-500/40 text-rose-100 shadow-rose-950/60',
                    icon: 'bg-rose-500/20 text-rose-400 border border-rose-500/40',
                    symbol: '✕'
                },
                warning: {
                    card: 'bg-amber-950/95 border-amber-500/40 text-amber-100 shadow-amber-950/60',
                    icon: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
                    symbol: '!'
                },
                info: {
                    card: 'bg-sky-950/95 border-sky-500/40 text-sky-100 shadow-sky-950/60',
                    icon: 'bg-sky-500/20 text-sky-400 border border-sky-500/40',
                    symbol: 'i'
                }
            };

            const cfg = styles[type] || styles.info;
            card.className = \`flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-xl text-xs font-bold \${cfg.card}\`;
            icon.className = \`w-7 h-7 rounded-xl flex items-center justify-center text-sm shrink-0 font-extrabold \${cfg.icon}\`;
            icon.innerText = cfg.symbol;
            text.innerText = message;

            clearTimeout(toastTimer);
            toast.classList.remove('opacity-0', '-translate-y-4');
            toast.classList.add('opacity-100', 'translate-y-0');

            toastTimer = setTimeout(() => {
                toast.classList.remove('opacity-100', 'translate-y-0');
                toast.classList.add('opacity-0', '-translate-y-4');
            }, 3000);
        }

        function generateMaskedNumbers() {
            const prefixes = ['8', '6', '7', '9'];
            let numbers = [];
            for(let i=0; i<4; i++) {
                let p = prefixes[Math.floor(Math.random() * prefixes.length)];
                let last4 = Math.floor(1000 + Math.random() * 9000);
                numbers.push(\`\${p}XXXXX\${last4}\`);
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
                btnLogin.classList.add('text-white'); btnLogin.classList.remove('text-slate-400');
                btnReg.classList.add('text-slate-400'); btnReg.classList.remove('text-white');
                loginBox.classList.remove('hidden'); regBox.classList.add('hidden');
            } else {
                toggleBg.style.transform = 'translateX(100%)';
                btnReg.classList.add('text-white'); btnReg.classList.remove('text-slate-400');
                btnLogin.classList.add('text-slate-400'); btnLogin.classList.remove('text-white');
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
                const navBtn = document.getElementById('nav-btn-' + s);
                if (navBtn) {
                    navBtn.className = s === section 
                        ? 'flex flex-col items-center text-emerald-400 text-[10px] font-bold space-y-1 px-3 py-1 rounded-xl bg-emerald-500/10'
                        : 'flex flex-col items-center text-slate-400 hover:text-emerald-400 text-[10px] font-semibold space-y-1 px-3 py-1 rounded-xl';
                }
            });
            document.getElementById('sec-' + section).classList.remove('hidden');
            const titles = { home: 'Home', wallet: 'My Wallets', kyc: 'KYC Verification', history: 'History' };
            document.getElementById('app-header-title').innerText = titles[section];
            if (section === 'history') loadHistoryData(historyTypeCache);
            if (section === 'home') generateMaskedNumbers();
        }

        async function handleLogin(e) {
            e.preventDefault();
            const mobile = document.getElementById('login-mobile').value, password = document.getElementById('login-password').value;
            const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile, password }) });
            const data = await res.json();
            if (res.ok) {
                currentUser = data.user;
                showAlert('Welcome back! Login successful.', 'success');
                setupAppDashboard();
            } else {
                showAlert(data.error || 'Invalid credentials.', 'error');
            }
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
            if (res.ok) {
                showAlert('Account created! Please sign in.', 'success');
                switchAuthTab('login');
            } else {
                showAlert(data.error || 'Registration failed.', 'error');
            }
        }

        function setupAppDashboard() {
            document.getElementById('auth-container').classList.add('hidden');
            document.getElementById('app-dashboard').classList.remove('hidden');
            document.getElementById('app-header-mobile').innerText = \`+91 \${currentUser.mobile}\`;
            document.getElementById('sidebar-user-name').innerText = currentUser.name;
            document.getElementById('sidebar-user-mob').innerText = \`+91 \${currentUser.mobile}\`;
            document.getElementById('sidebar-avatar').innerText = currentUser.name.charAt(0).toUpperCase();
            updateWalletsUI();
            checkKycStatusUI();
            navigateTo('home');
        }

        function updateWalletsUI() {
            const totalSms = (parseFloat(currentUser.sms_wallet) || 0) + (parseFloat(currentUser.bonus_wallet) || 0);
            document.getElementById('home-sms-wallet').innerText = \`₹\${totalSms.toFixed(2)}\`;
            document.getElementById('val-sms-wallet').innerText = \`₹\${totalSms.toFixed(2)}\`;
            document.getElementById('val-earning-wallet').innerText = \`₹\${(parseFloat(currentUser.earning_wallet) || 0).toFixed(2)}\`;
        }

        function checkKycStatusUI() {
            if (currentUser.kyc_status === 'Verified') {
                document.getElementById('kyc-status-badge').innerText = '✓ Verified';
                document.getElementById('kyc-status-badge').className = 'px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
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
                showAlert('KYC verified and locked successfully.', 'success');
                currentUser = data.user;
                checkKycStatusUI();
            } else {
                showAlert(data.error || 'Error submitting KYC.', 'error');
            }
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
                showAlert('Bank account updated.', 'success');
                currentUser = data.user;
                checkKycStatusUI();
                closeBankChangeModal();
            } else {
                showAlert(data.error || 'Error updating bank account.', 'error');
            }
        }

        async function handleSendSms(e) {
            e.preventDefault();
            const totalSms = (parseFloat(currentUser.sms_wallet) || 0) + (parseFloat(currentUser.bonus_wallet) || 0);
            if (totalSms < 0.50) {
                showAlert('Insufficient SMS Wallet balance. Please add funds.', 'warning');
                return;
            }

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
            statusText.innerText = 'Connecting to SMSC...';

            setTimeout(() => {
                spinner.classList.add('hidden');
                barCont.classList.remove('hidden');
                statusText.innerText = 'Broadcasting Messages...';
                fill.style.width = '0%';
                setTimeout(() => { fill.style.width = '100%'; }, 50);
            }, 2000);

            setTimeout(async () => {
                const res = await fetch('/api/user/sms', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: currentUser.id, recipients, message })
                });
                const data = await res.json();
                
                barCont.classList.add('hidden');
                if (res.ok) {
                    successIcon.classList.remove('hidden');
                    statusText.innerText = 'Message sent successfully';
                    currentUser.sms_wallet = data.new_sms_wallet;
                    currentUser.earning_wallet = data.new_earning_wallet;
                    updateWalletsUI();
                    generateMaskedNumbers();
                    if (!document.getElementById('sec-history').classList.contains('hidden')) {
                        loadHistoryData(historyTypeCache);
                    }
                    setTimeout(() => {
                        modal.classList.add('hidden');
                        showAlert('SMS campaign delivered & logged.', 'success');
                    }, 1500);
                } else {
                    modal.classList.add('hidden');
                    showAlert(data.error || 'Could not send SMS.', 'error');
                }
            }, 12000);
        }

        async function handleDepositRequest(e) {
            e.preventDefault();
            const amount = document.getElementById('dep-amount').value, utr_number = document.getElementById('dep-utr').value;
            const res = await fetch('/api/user/deposit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: currentUser.id, amount, utr_number }) });
            if (res.ok) {
                showAlert('Deposit request submitted for review.', 'success');
                closeQrModal();
                document.getElementById('dep-amount').value = '';
                document.getElementById('dep-utr').value = '';
                if (!document.getElementById('sec-history').classList.contains('hidden')) loadHistoryData('deposits');
            } else {
                showAlert('Error submitting deposit request.', 'error');
            }
        }

        function startWithdrawalProcess(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('wit-amount').value);
            if (amount < 5000 || amount > 50000) {
                showAlert('Amount must be between ₹5,000 and ₹50,000.', 'warning');
                return;
            }
            if ((parseFloat(currentUser.earning_wallet) || 0) < amount) {
                showAlert('Insufficient Earning Wallet balance.', 'error');
                return;
            }
            if (currentUser.kyc_status !== 'Verified') {
                showAlert('Complete KYC verification before withdrawing.', 'warning');
                navigateTo('kyc');
                return;
            }
            pendingWithdrawAmount = amount;
            document.getElementById('prev-wit-amount').innerText = \`₹\${amount}\`;
            document.getElementById('prev-bank-holder').innerText = currentUser.acc_holder_name || 'N/A';
            document.getElementById('prev-bank-details').innerText = \`A/C: \${currentUser.bank_acc_no} • IFSC: \${currentUser.bank_ifsc}\`;
            document.getElementById('withdraw-preview-modal').classList.remove('hidden');
        }

        function closeWithdrawModal() { document.getElementById('withdraw-preview-modal').classList.add('hidden'); }

        async function confirmWithdrawal() {
            closeWithdrawModal();
            const payment_info = \`A/C: \${currentUser.bank_acc_no}, IFSC: \${currentUser.bank_ifsc}, Name: \${currentUser.acc_holder_name}\`;
            const res = await fetch('/api/user/withdraw', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: currentUser.id, amount: pendingWithdrawAmount, payment_info }) });
            const data = await res.json();
            if (res.ok) {
                showAlert('Withdrawal request submitted successfully.', 'success');
                currentUser.earning_wallet = data.new_earning;
                updateWalletsUI();
                document.getElementById('wit-amount').value = '';
                if (!document.getElementById('sec-history').classList.contains('hidden')) loadHistoryData('withdrawals');
            } else {
                showAlert(data.error || 'Withdrawal failed.', 'error');
            }
        }

        function switchHistoryTab(tab) {
            historyTypeCache = tab;
            ['deposits', 'withdrawals', 'sms'].forEach(t => {
                const btn = document.getElementById('hist-btn-' + (t === 'deposits' ? 'dep' : t === 'withdrawals' ? 'wit' : 'sms'));
                btn.className = 'flex-1 py-2 font-bold rounded-xl transition-all ' + (t === tab ? 'bg-emerald-600 text-white shadow' : 'text-slate-400');
            });
            loadHistoryData(tab);
        }

        function statusBadgeClass(status) {
            const s = (status || '').toLowerCase();
            if (s === 'approved' || s === 'sent' || s === 'success') {
                return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
            }
            if (s === 'rejected' || s === 'failed') {
                return 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
            }
            return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
        }

        async function loadHistoryData(type) {
            const listContainer = document.getElementById('history-content-list');
            listContainer.innerHTML = '<p class="text-center text-xs text-slate-500 py-8">Loading records...</p>';
            const res = await fetch(\`/api/user/history?userId=\${currentUser.id}&type=\${type}\`);
            const data = await res.json();
            if (!res.ok) {
                showAlert('Failed to load history.', 'error');
                return;
            }

            if (type === 'deposits') {
                listContainer.innerHTML = data.items.map(i => \`
                    <div class="glass-card p-3.5 rounded-2xl text-xs space-y-1.5">
                        <div class="flex justify-between items-center">
                            <span class="font-extrabold text-white font-mono">Deposit • ₹\${parseFloat(i.amount).toFixed(2)}</span>
                            <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold \${statusBadgeClass(i.status)}">\${i.status}</span>
                        </div>
                        <div class="flex justify-between text-[10px] text-slate-400 font-mono">
                            <span>UTR: \${i.utr_number}</span>
                            <span>ID #\${i.id}</span>
                        </div>
                    </div>
                \`).join('') || '<p class="text-center text-xs text-slate-500 py-8">No deposit records found.</p>';
            } else if (type === 'withdrawals') {
                listContainer.innerHTML = data.items.map(i => \`
                    <div class="glass-card p-3.5 rounded-2xl text-xs space-y-1.5">
                        <div class="flex justify-between items-center">
                            <span class="font-extrabold text-white font-mono">Withdrawal • ₹\${parseFloat(i.amount).toFixed(2)}</span>
                            <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold \${statusBadgeClass(i.status)}">\${i.status}</span>
                        </div>
                        <p class="text-[10px] text-slate-400 font-mono break-all">Bank: \${i.payment_info}</p>
                        <p class="text-[10px] text-slate-500 font-mono">Ref ID #\${i.id}</p>
                    </div>
                \`).join('') || '<p class="text-center text-xs text-slate-500 py-8">No withdrawal records found.</p>';
            } else if (type === 'sms') {
                listContainer.innerHTML = data.items.map(i => \`
                    <div class="glass-card p-3.5 rounded-2xl text-xs space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="font-extrabold text-emerald-400 font-mono">SMS Broadcast • -₹\${parseFloat(i.cost || 0.5).toFixed(2)}</span>
                            <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold \${statusBadgeClass(i.status || 'Sent')}">\${i.status || 'Sent'}</span>
                        </div>
                        <p class="text-[10px] text-slate-300 font-mono bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">To: \${i.recipients}</p>
                        <p class="text-[11px] text-slate-400 leading-relaxed">Message: "\${i.message}"</p>
                        <p class="text-[10px] text-slate-500 font-mono">Log ID #\${i.id}</p>
                    </div>
                \`).join('') || '<p class="text-center text-xs text-slate-500 py-8">No SMS campaign logs found.</p>';
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
                content.innerHTML = '<p>1. Active SMS Wallet balance is required to run promotional broadcasts.</p><p>2. Payouts are processed strictly to verified bank accounts linked in KYC.</p><p>3. Verified KYC details are locked for security; only bank account & IFSC can be updated via settings.</p>';
            } else {
                title.innerText = 'Refund Policy';
                content.innerHTML = '<p>1. Deposits with invalid or duplicate UTR numbers will be declined.</p><p>2. Declined withdrawal requests are automatically credited back to your Earning Wallet.</p><p>3. Completed SMS broadcasts are non-refundable.</p>';
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
        const user = await env.DB.prepare("SELECT sms_wallet, bonus_wallet FROM users WHERE id = ?").bind(userId).first();
        const totalAvailable = (parseFloat(user?.sms_wallet) || 0) + (parseFloat(user?.bonus_wallet) || 0);
        if (!user || totalAvailable < smsCost) {
          return new Response(JSON.stringify({ error: "Insufficient SMS Wallet balance" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        await env.DB.prepare("UPDATE users SET sms_wallet = sms_wallet - ?, earning_wallet = earning_wallet + ? WHERE id = ?").bind(smsCost, earningGain, userId).run();
        await env.DB.prepare("INSERT INTO sms_logs (user_id, recipients, message, cost, status) VALUES (?, ?, ?, ?, 'Sent')").bind(userId, recipients, message, smsCost).run();
        const updated = await env.DB.prepare("SELECT sms_wallet, earning_wallet FROM users WHERE id = ?").bind(userId).first();
        return new Response(JSON.stringify({ success: true, new_sms_wallet: updated.sms_wallet, new_earning_wallet: updated.earning_wallet }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/api/user/deposit" && method === "POST") {
        const { userId, amount, utr_number } = await request.json();
        await env.DB.prepare("INSERT INTO add_fund_requests (user_id, amount, utr_number, status) VALUES (?, ?, ?, 'Pending')").bind(userId, amount, utr_number).run();
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/api/user/withdraw" && method === "POST") {
        const { userId, amount, payment_info } = await request.json();
        if (amount < 5000 || amount > 50000) {
          return new Response(JSON.stringify({ error: "Invalid withdrawal amount" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
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
