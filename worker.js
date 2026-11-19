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
        .light-card { background: #ffffff; border: 1px solid #fde68a; box-shadow: 0 8px 25px -5px rgba(245, 158, 11, 0.08), 0 4px 10px -6px rgba(0, 0, 0, 0.04); }
        .wallet-gradient-sms { background: linear-gradient(135deg, #facc15 0%, #f59e0b 55%, #d97706 100%); }
        .wallet-gradient-earn { background: linear-gradient(135deg, #ffffff 0%, #fef9c3 100%); border: 2px solid #facc15; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-amber-50/60 min-h-screen text-slate-900 flex flex-col items-center justify-center p-0 sm:p-4">

    <!-- PREMIUM APP TOAST ALERT BANNER -->
    <div id="app-toast" class="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-sm pointer-events-none opacity-0 -translate-y-4 transition-all duration-300">
        <div id="app-toast-card" class="flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-xl text-xs font-bold">
            <div id="app-toast-icon" class="w-7 h-7 rounded-xl flex items-center justify-center text-sm shrink-0 font-extrabold">✓</div>
            <p id="app-toast-msg" class="leading-snug flex-1">Notification message</p>
        </div>
    </div>

    <!-- MOBILE APP SHELL -->
    <div class="w-full max-w-md bg-[#fffdf7] h-screen sm:h-[88vh] sm:max-h-[820px] sm:rounded-[2.2rem] shadow-[0_20px_60px_rgba(245,158,11,0.18)] flex flex-col relative overflow-hidden border border-amber-200">

        <!-- AMBIENT WARM GLOW -->
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/2 -left-24 w-64 h-64 bg-amber-200/25 rounded-full blur-3xl pointer-events-none"></div>

        <!-- ==================== AUTH SCREEN (LOGIN / REGISTER) ==================== -->
        <div id="auth-container" class="flex-1 flex flex-col justify-center p-6 space-y-6 my-auto relative z-10 overflow-y-auto no-scrollbar">
            <div class="text-center space-y-3">
                <div class="inline-flex p-3 bg-white rounded-2xl shadow-md border border-amber-200">
                    <img src="https://i.ibb.co/C5VBSGcV/BSNL-New-Logo.png" alt="BSNL Logo" class="h-12 object-contain">
                </div>
                <div>
                    <h1 class="text-lg font-extrabold text-slate-900 tracking-tight">BSNL Partner Portal</h1>
                    <p class="text-xs text-slate-500 font-medium">Next-Gen SMS Broadcast & Rewards</p>
                </div>
                
                <!-- TOGGLE SWITCH -->
                <div class="bg-amber-100/80 p-1.5 rounded-2xl flex relative mt-4 border border-amber-200 shadow-inner">
                    <div id="toggle-bg" class="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl transition-all duration-300 shadow-sm left-1.5"></div>
                    <button onclick="switchAuthTab('login')" id="btn-tab-login" class="flex-1 py-2.5 text-xs font-extrabold relative z-10 text-slate-950 transition-colors">Login</button>
                    <button onclick="switchAuthTab('register')" id="btn-tab-register" class="flex-1 py-2.5 text-xs font-bold relative z-10 text-slate-600 transition-colors">Register</button>
                </div>
            </div>

            <!-- LOGIN FORM -->
            <div id="login-box" class="light-card rounded-3xl p-5 space-y-4">
                <form onsubmit="handleLogin(event)" class="space-y-4">
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">Mobile Number</label>
                        <div class="relative">
                            <span class="absolute left-3.5 top-3 text-slate-500 text-xs font-mono font-bold">+91</span>
                            <input type="tel" id="login-mobile" required placeholder="9876543210" class="w-full pl-11 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors">
                        </div>
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">Password</label>
                        <input type="password" id="login-password" required placeholder="••••••••" class="w-full px-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors">
                    </div>
                    <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl text-sm shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all">Sign In →</button>
                </form>
            </div>

            <!-- REGISTER FORM -->
            <div id="register-box" class="light-card rounded-3xl p-5 space-y-4 hidden">
                <form onsubmit="handleRegister(event)" class="space-y-3.5">
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Full Name</label>
                        <input type="text" id="reg-name" required placeholder="Enter your full name" class="w-full px-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Mobile Number</label>
                        <div class="relative">
                            <span class="absolute left-3.5 top-2.5 text-slate-500 text-xs font-mono font-bold">+91</span>
                            <input type="tel" id="reg-mobile" required placeholder="10-digit mobile" class="w-full pl-11 pr-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white">
                        </div>
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Create Password</label>
                        <input type="password" id="reg-password" required placeholder="Strong password" class="w-full px-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white">
                    </div>
                    <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl text-sm shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all mt-1">Create Account & Get ₹100 Bonus</button>
                </form>
            </div>
        </div>

        <!-- ==================== MAIN APP DASHBOARD ==================== -->
        <div id="app-dashboard" class="flex-1 flex flex-col hidden relative z-10 h-full overflow-hidden">
            
            <!-- LOCKED TOP APP BAR (3-LINE MENU LEFT + FIXED BSNL LOGO RIGHT) -->
            <div class="bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-amber-200 shrink-0 z-20 shadow-xs">
                <div class="flex items-center space-x-3">
                    <button onclick="toggleSidebar(true)" class="p-2 bg-amber-100 hover:bg-amber-200 rounded-xl text-slate-900 active:scale-95 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" d="M4 6h16M4 12h12M4 18h16"></path></svg>
                    </button>
                    <div>
                        <h2 id="app-header-title" class="text-sm font-extrabold text-slate-900 tracking-tight">Home</h2>
                        <p class="text-[10px] text-amber-700 font-mono font-bold" id="app-header-mobile"></p>
                    </div>
                </div>
                <!-- FIXED TOP-RIGHT LOGO -->
                <div class="bg-white px-2.5 py-1 rounded-xl shadow-sm border border-amber-200">
                    <img src="https://i.ibb.co/C5VBSGcV/BSNL-New-Logo.png" alt="BSNL Logo" class="h-6 object-contain">
                </div>
            </div>

            <!-- ==================== LEFT 3-LINE SIDEBAR DRAWER ==================== -->
            <div id="sidebar-backdrop" onclick="toggleSidebar(false)" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 hidden transition-opacity"></div>
            <div id="sidebar-drawer" class="fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-amber-200 z-50 transform -translate-x-full transition-transform duration-300 flex flex-col shadow-2xl">
                <div class="p-5 bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-500 border-b border-amber-300 flex items-center justify-between shrink-0">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-2xl bg-white text-amber-700 border border-amber-200 flex items-center justify-center font-extrabold text-base shadow-sm" id="sidebar-avatar">U</div>
                        <div>
                            <h3 id="sidebar-user-name" class="font-extrabold text-sm text-slate-950">User Name</h3>
                            <p id="sidebar-user-mob" class="text-[11px] text-slate-900 font-mono font-semibold">Mobile</p>
                        </div>
                    </div>
                    <button onclick="toggleSidebar(false)" class="w-7 h-7 rounded-lg bg-white/80 text-slate-800 hover:bg-white flex items-center justify-center text-xs font-bold">✕</button>
                </div>

                <div class="p-3 space-y-1 flex-1 overflow-y-auto no-scrollbar text-xs font-bold">
                    <button onclick="navigateTo('home')" class="w-full text-left px-3.5 py-3 rounded-xl hover:bg-amber-50 flex items-center space-x-3 text-slate-800 transition">
                        <span class="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">🏠</span>
                        <span>Home</span>
                    </button>
                    <button onclick="navigateTo('wallet')" class="w-full text-left px-3.5 py-3 rounded-xl hover:bg-amber-50 flex items-center space-x-3 text-slate-800 transition">
                        <span class="w-7 h-7 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center">💳</span>
                        <span>Wallets</span>
                    </button>
                    <button onclick="navigateTo('kyc')" class="w-full text-left px-3.5 py-3 rounded-xl hover:bg-amber-50 flex items-center space-x-3 text-slate-800 transition">
                        <span class="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">🪪</span>
                        <span>KYC Verification</span>
                    </button>
                    <button onclick="navigateTo('history')" class="w-full text-left px-3.5 py-3 rounded-xl hover:bg-amber-50 flex items-center space-x-3 text-slate-800 transition">
                        <span class="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">📊</span>
                        <span>History</span>
                    </button>
                    
                    <div class="pt-3 mt-2 border-t border-amber-100 space-y-1">
                        <p class="px-3.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Policies & Rules</p>
                        <button onclick="openPolicyModal('terms')" class="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-amber-50 flex items-center space-x-3 text-slate-700 text-[11px]">
                            <span>📄</span><span>Terms & Conditions</span>
                        </button>
                        <button onclick="openPolicyModal('refund')" class="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-amber-50 flex items-center space-x-3 text-slate-700 text-[11px]">
                            <span>🔄</span><span>Refund Policy</span>
                        </button>
                        <button onclick="openPolicyModal('rules')" class="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-amber-50 flex items-center space-x-3 text-slate-700 text-[11px]">
                            <span>⚖️</span><span>Rules & Regulations</span>
                        </button>
                        <a href="https://t.me/YourTelegramBot" target="_blank" class="w-full text-left px-3.5 py-2.5 rounded-xl bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300 flex items-center space-x-3 text-amber-900 text-[11px] font-extrabold mt-1">
                            <span>✈️</span><span>Customer Support</span>
                        </a>
                    </div>
                </div>

                <!-- REAL STORE BADGES & LOGOUT -->
                <div class="p-4 border-t border-amber-100 space-y-3 bg-amber-50/50 shrink-0">
                    <div class="grid grid-cols-2 gap-2">
                        <a href="#" onclick="showAlert('Google Play Store app link opening...', 'info'); return false;" class="bg-slate-950 text-white px-2.5 py-1.5 rounded-xl flex items-center space-x-2 hover:bg-slate-800 transition shadow-xs">
                            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.98 1.98 0 0 1-.61-1.44V3.254c0-.563.235-1.072.609-1.44zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1.5 1.5 0 0 1 0 2.598l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
                            <div class="leading-none">
                                <span class="text-[7px] uppercase tracking-wider text-slate-300 block">GET IT ON</span>
                                <span class="text-[10px] font-extrabold">Google Play</span>
                            </div>
                        </a>
                        <a href="#" onclick="showAlert('Apple App Store link opening...', 'info'); return false;" class="bg-slate-950 text-white px-2.5 py-1.5 rounded-xl flex items-center space-x-2 hover:bg-slate-800 transition shadow-xs">
                            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.32c.67-.81 1.12-1.94 1-3.07-.96.04-2.13.64-2.82 1.45-.61.71-1.15 1.87-1.01 2.98 1.07.08 2.16-.55 2.83-1.36z"/></svg>
                            <div class="leading-none">
                                <span class="text-[7px] tracking-tight text-slate-300 block">Download on the</span>
                                <span class="text-[10px] font-extrabold">App Store</span>
                            </div>
                        </a>
                    </div>
                    <button onclick="logout()" class="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold rounded-xl text-xs border border-red-200 transition">Sign Out</button>
                </div>
            </div>

            <!-- ==================== SCROLLABLE CONTENT AREA ==================== -->
            <div class="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4">

                <!-- 1. HOME SCREEN -->
                <div id="sec-home" class="space-y-4">
                    <!-- SMS Wallet Hero Card + Add Fund Button -->
                    <div class="wallet-gradient-sms p-5 rounded-3xl shadow-lg shadow-amber-500/20 border border-yellow-300 flex items-center justify-between relative overflow-hidden">
                        <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-white/25 rounded-full blur-xl"></div>
                        <div>
                            <span class="px-2.5 py-0.5 bg-white/85 rounded-md text-[9px] font-extrabold uppercase tracking-wider text-amber-950">SMS Wallet (Bonus Included)</span>
                            <p id="home-sms-wallet" class="text-2xl font-extrabold text-slate-950 font-mono mt-1.5">₹0.00</p>
                        </div>
                        <button onclick="openQrModal()" class="px-4 py-3 bg-white text-slate-950 hover:bg-amber-50 font-extrabold rounded-2xl text-xs shadow-md active:scale-95 transition flex items-center space-x-1.5 relative z-10 border border-amber-200">
                            <span>➕</span><span>Add Fund</span>
                        </button>
                    </div>

                    <!-- BONUS CLAIM CARDS (₹100 NEW REGISTRATION BONUS & ₹10 DAILY BONUS) -->
                    <div class="grid grid-cols-2 gap-2.5">
                        <!-- ₹100 Registration Bonus Claim -->
                        <div class="light-card p-3.5 rounded-2xl flex flex-col justify-between space-y-2.5">
                            <div>
                                <span class="px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md text-[9px] font-extrabold uppercase border border-amber-200">Welcome Gift</span>
                                <p class="text-sm font-extrabold text-slate-900 font-mono mt-1.5">₹100 Bonus</p>
                                <p class="text-[10px] text-slate-500 leading-tight mt-0.5">Adds to SMS Wallet</p>
                            </div>
                            <button id="btn-claim-reg-bonus" onclick="claimRegistrationBonus()" class="w-full py-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl text-[11px] shadow-xs active:scale-95 transition">Claim ₹100</button>
                        </div>

                        <!-- ₹10 Per Day Bonus Claim -->
                        <div class="light-card p-3.5 rounded-2xl flex flex-col justify-between space-y-2.5">
                            <div>
                                <span class="px-2 py-0.5 bg-yellow-100 text-yellow-900 rounded-md text-[9px] font-extrabold uppercase border border-yellow-300">Daily Reward</span>
                                <p class="text-sm font-extrabold text-slate-900 font-mono mt-1.5">₹10 / Day</p>
                                <p class="text-[10px] text-slate-500 leading-tight mt-0.5">For SMS Campaigns</p>
                            </div>
                            <button id="btn-claim-daily-bonus" onclick="claimDailyBonus()" class="w-full py-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl text-[11px] shadow-xs active:scale-95 transition">Claim ₹10</button>
                        </div>
                    </div>

                    <!-- SMS Broadcast Console Card -->
                    <div class="light-card p-5 rounded-3xl space-y-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2">
                                <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                                <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Bulk SMS Terminal</h3>
                            </div>
                            <span class="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">GATEWAY READY</span>
                        </div>

                        <form onsubmit="handleSendSms(event)" class="space-y-3.5">
                            <div>
                                <div class="flex justify-between items-center mb-1">
                                    <label class="text-[10px] font-bold uppercase tracking-wider text-slate-500">Target Recipients</label>
                                    <button type="button" onclick="generateMaskedNumbers()" class="text-[10px] text-amber-700 font-extrabold hover:underline">↻ Refresh List</button>
                                </div>
                                <input type="text" id="sms-recipients" required readonly class="w-full px-3.5 py-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-slate-900 font-mono font-bold">
                            </div>

                            <div>
                                <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Approved Promotional Template</label>
                                <div class="relative">
                                    <textarea id="sms-message" required readonly rows="3" class="w-full px-3.5 py-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-slate-700 resize-none leading-relaxed font-medium">Special BSNL 5G Network Expansion Offer! Recharge now & get unlimited benefits across India. Click to activate: https://bsnl.co.in</textarea>
                                    <span class="absolute bottom-2 right-2.5 text-[9px] font-extrabold uppercase bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded">Locked</span>
                                </div>
                            </div>

                            <button type="submit" id="send-sms-btn" class="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-2xl text-xs shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2">
                                <span>🚀</span><span>Send SMS Now</span>
                            </button>
                        </form>
                    </div>
                </div>

                <!-- 2. WALLETS SCREEN -->
                <div id="sec-wallet" class="space-y-4 hidden">
                    <div class="wallet-gradient-sms p-5 rounded-3xl shadow-md border border-yellow-300 flex items-center justify-between">
                        <div>
                            <p class="text-[10px] uppercase font-extrabold tracking-wider text-amber-950">SMS Wallet (Bonus Active)</p>
                            <p id="val-sms-wallet" class="text-2xl font-extrabold text-slate-950 font-mono mt-1">₹0.00</p>
                        </div>
                        <button onclick="openQrModal()" class="px-3.5 py-2.5 bg-white hover:bg-amber-50 text-slate-950 font-extrabold rounded-xl text-xs shadow-sm border border-amber-200">➕ Add Fund</button>
                    </div>

                    <div onclick="document.getElementById('wit-amount').focus()" class="wallet-gradient-earn p-5 rounded-3xl shadow-md cursor-pointer relative overflow-hidden">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="text-[10px] uppercase font-extrabold tracking-wider text-amber-800">Earning Wallet (Withdrawable)</p>
                                <p id="val-earning-wallet" class="text-2xl font-extrabold text-slate-950 font-mono mt-1">₹0.00</p>
                            </div>
                            <span class="px-2.5 py-1 bg-amber-400/30 border border-amber-400 rounded-lg text-[10px] font-extrabold text-amber-950">Available</span>
                        </div>
                    </div>

                    <div class="light-card p-5 rounded-3xl space-y-3.5">
                        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">💸 Withdraw Earning Balance</h3>
                        <form onsubmit="startWithdrawalProcess(event)" class="space-y-3">
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-slate-500 mb-1">Enter Amount (₹)</label>
                                <input type="number" step="1" id="wit-amount" required placeholder="Enter withdrawal amount" class="w-full px-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl text-sm text-slate-900 font-mono font-bold focus:outline-none focus:border-amber-500 focus:bg-white">
                            </div>
                            <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg shadow-amber-500/20 active:scale-[0.98] transition">Preview & Withdraw →</button>
                        </form>
                    </div>
                </div>

                <!-- 3. KYC SCREEN -->
                <div id="sec-kyc" class="space-y-4 hidden">
                    <div class="light-card p-5 rounded-3xl space-y-4">
                        <div class="flex justify-between items-center border-b border-amber-100 pb-3">
                            <div>
                                <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">🪪 KYC & Bank Link</h3>
                                <p class="text-[10px] text-slate-500 mt-0.5">Step-by-step identity verification</p>
                            </div>
                            <span id="kyc-status-badge" class="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">Unverified</span>
                        </div>
                        
                        <form id="kyc-form" onsubmit="handleKycSubmit(event)" class="space-y-3">
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-slate-600 mb-1">Step 1: Aadhaar Number</label>
                                <input type="text" id="kyc-aadhaar" required maxlength="12" placeholder="12-digit Aadhaar number" class="w-full px-3.5 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs text-slate-900 font-mono">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-slate-600 mb-1">Step 2: PAN Number</label>
                                <input type="text" id="kyc-pan" required maxlength="10" placeholder="ABCDE1234F" class="w-full px-3.5 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs text-slate-900 font-mono uppercase">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold uppercase text-slate-600 mb-1">Step 3: Account Holder Name</label>
                                <input type="text" id="kyc-acc-name" required placeholder="Full name as per bank" class="w-full px-3.5 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs text-slate-900">
                            </div>
                            <div class="grid grid-cols-2 gap-2.5">
                                <div>
                                    <label class="block text-[10px] font-bold uppercase text-slate-600 mb-1">Step 4: Account No</label>
                                    <input type="text" id="kyc-acc-no" required placeholder="Account number" class="w-full px-3.5 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs text-slate-900 font-mono">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold uppercase text-slate-600 mb-1">Step 5: IFSC Code</label>
                                    <input type="text" id="kyc-ifsc" required placeholder="SBIN0001234" class="w-full px-3.5 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs text-slate-900 font-mono uppercase">
                                </div>
                            </div>
                            <button type="submit" id="kyc-submit-btn" class="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-extrabold rounded-xl text-xs shadow-md mt-2">Verify & Lock KYC</button>
                        </form>

                        <div id="bank-change-container" class="hidden pt-3 border-t border-amber-100">
                            <button onclick="openBankChangeModal()" class="w-full py-3 bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold rounded-xl text-xs border border-amber-300 transition flex items-center justify-center space-x-2">
                                <span>🏦</span><span>Change Bank Account</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 4. HISTORY SCREEN -->
                <div id="sec-history" class="space-y-4 hidden">
                    <div class="bg-amber-100/80 p-1.5 rounded-2xl flex border border-amber-200 text-[11px] shadow-inner">
                        <button onclick="switchHistoryTab('deposits')" id="hist-btn-dep" class="flex-1 py-2 font-extrabold rounded-xl bg-amber-400 text-slate-950 shadow-xs transition-all">Deposits</button>
                        <button onclick="switchHistoryTab('withdrawals')" id="hist-btn-wit" class="flex-1 py-2 font-bold rounded-xl text-slate-600 transition-all">Withdrawals</button>
                        <button onclick="switchHistoryTab('sms')" id="hist-btn-sms" class="flex-1 py-2 font-bold rounded-xl text-slate-600 transition-all">SMS Logs</button>
                    </div>

                    <div id="history-content-list" class="space-y-2.5">
                        <p class="text-center text-xs text-slate-400 py-8">Loading records...</p>
                    </div>
                </div>

            </div>

            <!-- LOCKED BOTTOM APP NAVIGATION BAR -->
            <div class="bg-white/95 backdrop-blur-md border-t border-amber-200 px-2 py-2 flex justify-around items-center shrink-0 z-20">
                <button onclick="navigateTo('home')" id="nav-btn-home" class="flex flex-col items-center text-amber-800 text-[10px] font-extrabold space-y-1 px-3 py-1 rounded-xl bg-amber-100 border border-amber-300">
                    <span class="text-base">🏠</span><span>Home</span>
                </button>
                <button onclick="navigateTo('wallet')" id="nav-btn-wallet" class="flex flex-col items-center text-slate-500 hover:text-amber-700 text-[10px] font-bold space-y-1 px-3 py-1 rounded-xl">
                    <span class="text-base">💳</span><span>Wallet</span>
                </button>
                <button onclick="navigateTo('kyc')" id="nav-btn-kyc" class="flex flex-col items-center text-slate-500 hover:text-amber-700 text-[10px] font-bold space-y-1 px-3 py-1 rounded-xl">
                    <span class="text-base">🪪</span><span>KYC</span>
                </button>
                <button onclick="navigateTo('history')" id="nav-btn-history" class="flex flex-col items-center text-slate-500 hover:text-amber-700 text-[10px] font-bold space-y-1 px-3 py-1 rounded-xl">
                    <span class="text-base">📊</span><span>History</span>
                </button>
            </div>
        </div>
    </div>

    <!-- ==================== FULL-SCREEN QR MODAL WITH UPI APPS ==================== -->
    <div id="qr-modal" class="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-white border-2 border-amber-300 w-full max-w-sm rounded-[2rem] p-6 shadow-2xl flex flex-col items-center relative space-y-4">
            <button onclick="closeQrModal()" class="absolute top-4 right-4 bg-amber-100 hover:bg-amber-200 text-slate-800 w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm">✕</button>
            
            <div class="text-center">
                <span class="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[10px] font-extrabold uppercase border border-amber-300">Instant UPI Deposit</span>
                <h3 class="text-base font-extrabold text-slate-900 mt-1.5">Scan & Pay Any Amount</h3>
            </div>

            <div class="bg-white p-2.5 border-4 border-amber-400 rounded-3xl shadow-md">
                <img src="https://i.ibb.co/qLGftMvF/IMG-20261116-120334.jpg" alt="Payment QR" class="w-56 h-56 object-contain rounded-2xl">
            </div>

            <div class="w-full">
                <p class="text-[10px] text-center font-extrabold uppercase tracking-wider text-slate-500 mb-2">Pay Using Any UPI App</p>
                <div class="grid grid-cols-4 gap-2 text-center">
                    <a href="upi://pay" class="bg-amber-50 border border-amber-200 p-2 rounded-xl hover:border-amber-500 transition">
                        <div class="w-7 h-7 mx-auto rounded-full bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center">G</div>
                        <p class="text-[9px] font-bold text-slate-800 mt-1">GPay</p>
                    </a>
                    <a href="upi://pay" class="bg-amber-50 border border-amber-200 p-2 rounded-xl hover:border-amber-500 transition">
                        <div class="w-7 h-7 mx-auto rounded-full bg-purple-100 text-purple-700 font-extrabold text-xs flex items-center justify-center">Pe</div>
                        <p class="text-[9px] font-bold text-slate-800 mt-1">PhonePe</p>
                    </a>
                    <a href="upi://pay" class="bg-amber-50 border border-amber-200 p-2 rounded-xl hover:border-amber-500 transition">
                        <div class="w-7 h-7 mx-auto rounded-full bg-sky-100 text-sky-700 font-extrabold text-xs flex items-center justify-center">Py</div>
                        <p class="text-[9px] font-bold text-slate-800 mt-1">Paytm</p>
                    </a>
                    <a href="upi://pay" class="bg-amber-50 border border-amber-200 p-2 rounded-xl hover:border-amber-500 transition">
                        <div class="w-7 h-7 mx-auto rounded-full bg-orange-100 text-orange-700 font-extrabold text-xs flex items-center justify-center">B</div>
                        <p class="text-[9px] font-bold text-slate-800 mt-1">BHIM</p>
                    </a>
                </div>
            </div>

            <form onsubmit="handleDepositRequest(event)" class="w-full space-y-2.5 pt-2 border-t border-amber-100">
                <input type="number" step="1" id="dep-amount" required placeholder="Enter Paid Amount (₹)" class="w-full px-3.5 py-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-slate-900 font-mono font-bold">
                <input type="text" id="dep-utr" required placeholder="Enter 12-Digit UTR Number" class="w-full px-3.5 py-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-slate-900 font-mono font-bold">
                <button type="submit" class="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-extrabold rounded-xl text-xs shadow-md">Submit Deposit Request</button>
            </form>
        </div>
    </div>

    <!-- ==================== WITHDRAWAL PREVIEW MODAL ==================== -->
    <div id="withdraw-preview-modal" class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-white border-2 border-amber-300 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4">
            <div class="flex justify-between items-center border-b border-amber-100 pb-3">
                <h3 class="font-extrabold text-sm text-amber-800">🔍 Withdrawal Preview</h3>
                <button onclick="closeWithdrawModal()" class="text-slate-500 text-sm font-bold">✕</button>
            </div>
            <div class="space-y-3 text-xs">
                <div class="flex justify-between items-center bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                    <span class="text-slate-600 font-semibold">Payout Amount:</span>
                    <span id="prev-wit-amount" class="text-base font-extrabold font-mono text-slate-950">₹0</span>
                </div>
                <div class="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 space-y-1">
                    <p class="text-[10px] uppercase font-bold text-slate-500">Linked Bank Account:</p>
                    <p id="prev-bank-holder" class="font-extrabold text-slate-900 text-sm"></p>
                    <p id="prev-bank-details" class="font-mono text-amber-800 font-bold text-xs"></p>
                </div>
            </div>
            <div class="flex gap-2.5 pt-2">
                <button onclick="closeWithdrawModal()" class="w-1/2 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs">Cancel</button>
                <button onclick="confirmWithdrawal()" class="w-1/2 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-extrabold rounded-xl text-xs shadow-md">Confirm Payout</button>
            </div>
        </div>
    </div>

    <!-- ==================== CHANGE BANK ACCOUNT MODAL ==================== -->
    <div id="bank-change-modal" class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-white border-2 border-amber-300 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4">
            <div class="flex justify-between items-center border-b border-amber-100 pb-3">
                <h3 class="font-extrabold text-sm text-amber-800">🏦 Update Bank Account</h3>
                <button onclick="closeBankChangeModal()" class="text-slate-500 text-sm font-bold">✕</button>
            </div>
            <form onsubmit="handleBankUpdate(event)" class="space-y-3">
                <div>
                    <label class="block text-[10px] font-bold uppercase text-slate-600 mb-1">New Account Number</label>
                    <input type="text" id="new-acc-no" required placeholder="Enter new account number" class="w-full px-3.5 py-2.5 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-slate-900 font-mono">
                </div>
                <div>
                    <label class="block text-[10px] font-bold uppercase text-slate-600 mb-1">New IFSC Code</label>
                    <input type="text" id="new-ifsc" required placeholder="Enter new IFSC code" class="w-full px-3.5 py-2.5 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-slate-900 font-mono uppercase">
                </div>
                <button type="submit" class="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-extrabold rounded-xl text-xs shadow-md mt-2">Save Bank Details</button>
            </form>
        </div>
    </div>

    <!-- ==================== POLICY & RULES MODAL ==================== -->
    <div id="policy-modal" class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-white border-2 border-amber-300 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-3 relative max-h-[82vh] flex flex-col">
            <button onclick="closePolicyModal()" class="absolute top-4 right-4 bg-amber-100 text-slate-700 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center">✕</button>
            <h3 id="policy-title" class="font-extrabold text-sm text-amber-900 pr-8">Policy</h3>
            <div id="policy-content" class="text-xs text-slate-700 overflow-y-auto space-y-2.5 flex-1 pr-1 leading-relaxed"></div>
        </div>
    </div>

    <!-- ==================== CAMPAIGN PROGRESS & SUCCESS OVERLAY ==================== -->
    <div id="campaign-progress-modal" class="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-white border-2 border-amber-300 w-full max-w-xs rounded-3xl p-7 shadow-2xl flex flex-col items-center space-y-5 text-center">
            <div id="prog-spinner" class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            
            <div id="prog-bar-container" class="w-full bg-amber-100 h-3 rounded-full overflow-hidden hidden border border-amber-300 p-0.5">
                <div id="prog-fill" class="bg-gradient-to-r from-yellow-400 to-amber-500 h-full w-0 rounded-full transition-all duration-[10000ms] linear"></div>
            </div>
            
            <div id="prog-success-icon" class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-extrabold hidden border-2 border-emerald-400 shadow-md">✓</div>
            
            <p id="prog-status-text" class="text-xs font-extrabold text-slate-900 tracking-wide">Connecting to SMSC...</p>
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
                    card: 'bg-white border-emerald-400 text-emerald-950 shadow-emerald-500/15',
                    icon: 'bg-emerald-100 text-emerald-600 border border-emerald-300',
                    symbol: '✓'
                },
                error: {
                    card: 'bg-white border-rose-400 text-rose-950 shadow-rose-500/15',
                    icon: 'bg-rose-100 text-rose-600 border border-rose-300',
                    symbol: '✕'
                },
                warning: {
                    card: 'bg-white border-amber-400 text-amber-950 shadow-amber-500/20',
                    icon: 'bg-amber-100 text-amber-700 border border-amber-300',
                    symbol: '!'
                },
                info: {
                    card: 'bg-white border-yellow-400 text-slate-900 shadow-yellow-500/15',
                    icon: 'bg-yellow-100 text-amber-700 border border-yellow-300',
                    symbol: 'i'
                }
            };

            const cfg = styles[type] || styles.info;
            card.className = \`flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-xl text-xs font-bold \${cfg.card}\`;
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
                btnLogin.classList.add('text-slate-950', 'font-extrabold'); btnLogin.classList.remove('text-slate-600');
                btnReg.classList.add('text-slate-600'); btnReg.classList.remove('text-slate-950', 'font-extrabold');
                loginBox.classList.remove('hidden'); regBox.classList.add('hidden');
            } else {
                toggleBg.style.transform = 'translateX(100%)';
                btnReg.classList.add('text-slate-950', 'font-extrabold'); btnReg.classList.remove('text-slate-600');
                btnLogin.classList.add('text-slate-600'); btnLogin.classList.remove('text-slate-950', 'font-extrabold');
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
                        ? 'flex flex-col items-center text-amber-800 text-[10px] font-extrabold space-y-1 px-3 py-1 rounded-xl bg-amber-100 border border-amber-300'
                        : 'flex flex-col items-center text-slate-500 hover:text-amber-700 text-[10px] font-bold space-y-1 px-3 py-1 rounded-xl';
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
                showAlert('Account created with ₹100 welcome bonus ready to claim!', 'success');
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
            updateBonusButtonsUI();
            checkKycStatusUI();
            navigateTo('home');
        }

        function updateWalletsUI() {
            const smsVal = parseFloat(currentUser.sms_wallet) || 0;
            const earnVal = parseFloat(currentUser.earning_wallet) || 0;
            document.getElementById('home-sms-wallet').innerText = \`₹\${smsVal.toFixed(2)}\`;
            document.getElementById('val-sms-wallet').innerText = \`₹\${smsVal.toFixed(2)}\`;
            document.getElementById('val-earning-wallet').innerText = \`₹\${earnVal.toFixed(2)}\`;
        }

        function updateBonusButtonsUI() {
            const regBtn = document.getElementById('btn-claim-reg-bonus');
            if (parseInt(currentUser.reg_bonus_claimed) === 1) {
                regBtn.innerText = 'Claimed ✓';
                regBtn.disabled = true;
                regBtn.className = 'w-full py-2 bg-amber-100 text-amber-800 font-bold rounded-xl text-[11px] border border-amber-200 cursor-not-allowed';
            } else {
                regBtn.innerText = 'Claim ₹100';
                regBtn.disabled = false;
                regBtn.className = 'w-full py-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl text-[11px] shadow-xs active:scale-95 transition';
            }

            const todayStr = new Date().toISOString().slice(0, 10);
            const dailyBtn = document.getElementById('btn-claim-daily-bonus');
            if (currentUser.last_daily_bonus_date === todayStr) {
                dailyBtn.innerText = 'Claimed Today ✓';
                dailyBtn.disabled = true;
                dailyBtn.className = 'w-full py-2 bg-amber-100 text-amber-800 font-bold rounded-xl text-[11px] border border-amber-200 cursor-not-allowed';
            } else {
                dailyBtn.innerText = 'Claim ₹10';
                dailyBtn.disabled = false;
                dailyBtn.className = 'w-full py-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl text-[11px] shadow-xs active:scale-95 transition';
            }
        }

        async function claimRegistrationBonus() {
            const res = await fetch('/api/user/claim-bonus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser.id, type: 'registration' })
            });
            const data = await res.json();
            if (res.ok) {
                currentUser.sms_wallet = data.sms_wallet;
                currentUser.reg_bonus_claimed = 1;
                updateWalletsUI();
                updateBonusButtonsUI();
                showAlert('₹100 registration bonus added to SMS Wallet!', 'success');
            } else {
                showAlert(data.error || 'Could not claim registration bonus.', 'warning');
            }
        }

        async function claimDailyBonus() {
            const todayStr = new Date().toISOString().slice(0, 10);
            const res = await fetch('/api/user/claim-bonus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser.id, type: 'daily', date: todayStr })
            });
            const data = await res.json();
            if (res.ok) {
                currentUser.sms_wallet = data.sms_wallet;
                currentUser.last_daily_bonus_date = todayStr;
                updateWalletsUI();
                updateBonusButtonsUI();
                showAlert('₹10 daily bonus added to SMS Wallet!', 'success');
            } else {
                showAlert(data.error || 'Daily bonus already claimed today.', 'warning');
            }
        }

        function checkKycStatusUI() {
            if (currentUser.kyc_status === 'Verified') {
                document.getElementById('kyc-status-badge').innerText = '✓ Verified';
                document.getElementById('kyc-status-badge').className = 'px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300';
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
            const smsVal = parseFloat(currentUser.sms_wallet) || 0;
            if (smsVal < 0.50) {
                showAlert('Insufficient SMS Wallet balance. Claim bonus or add funds.', 'warning');
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
                        showAlert('SMS campaign completed.', 'success');
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
                btn.className = 'flex-1 py-2 font-extrabold rounded-xl transition-all ' + (t === tab ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-slate-600');
            });
            loadHistoryData(tab);
        }

        function statusBadgeClass(status) {
            const s = (status || '').toLowerCase();
            if (s === 'approved' || s === 'sent' || s === 'success') {
                return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
            }
            if (s === 'rejected' || s === 'failed') {
                return 'bg-rose-100 text-rose-800 border border-rose-300';
            }
            return 'bg-amber-100 text-amber-800 border border-amber-300';
        }

        async function loadHistoryData(type) {
            const listContainer = document.getElementById('history-content-list');
            listContainer.innerHTML = '<p class="text-center text-xs text-slate-400 py-8">Loading records...</p>';
            const res = await fetch(\`/api/user/history?userId=\${currentUser.id}&type=\${type}\`);
            const data = await res.json();
            if (!res.ok) {
                showAlert('Failed to load history.', 'error');
                return;
            }

            if (type === 'deposits') {
                listContainer.innerHTML = data.items.map(i => \`
                    <div class="light-card p-3.5 rounded-2xl text-xs space-y-1.5">
                        <div class="flex justify-between items-center">
                            <span class="font-extrabold text-slate-900 font-mono">Deposit • ₹\${parseFloat(i.amount).toFixed(2)}</span>
                            <span class="px-2.5 py-1 rounded-lg text-[10px] font-extrabold \${statusBadgeClass(i.status)}">\${i.status}</span>
                        </div>
                        <div class="flex justify-between text-[10px] text-slate-500 font-mono font-semibold">
                            <span>UTR: \${i.utr_number}</span>
                            <span>ID #\${i.id}</span>
                        </div>
                    </div>
                \`).join('') || '<p class="text-center text-xs text-slate-400 py-8">No deposit records found.</p>';
            } else if (type === 'withdrawals') {
                listContainer.innerHTML = data.items.map(i => \`
                    <div class="light-card p-3.5 rounded-2xl text-xs space-y-1.5">
                        <div class="flex justify-between items-center">
                            <span class="font-extrabold text-slate-900 font-mono">Withdrawal • ₹\${parseFloat(i.amount).toFixed(2)}</span>
                            <span class="px-2.5 py-1 rounded-lg text-[10px] font-extrabold \${statusBadgeClass(i.status)}">\${i.status}</span>
                        </div>
                        <p class="text-[10px] text-slate-600 font-mono break-all">Bank: \${i.payment_info}</p>
                        <p class="text-[10px] text-slate-400 font-mono">Ref ID #\${i.id}</p>
                    </div>
                \`).join('') || '<p class="text-center text-xs text-slate-400 py-8">No withdrawal records found.</p>';
            } else if (type === 'sms') {
                // Only time and deducted balance shown (no mobile numbers or message content)
                listContainer.innerHTML = data.items.map(i => \`
                    <div class="light-card p-3.5 rounded-2xl text-xs flex justify-between items-center">
                        <div class="space-y-1">
                            <p class="font-extrabold text-rose-700 font-mono text-sm">-₹\${parseFloat(i.cost || 0.5).toFixed(2)} Deducted</p>
                            <p class="text-[10px] text-slate-500 font-mono font-semibold">🕒 \${i.created_at || 'Recorded'}</p>
                        </div>
                        <span class="px-2.5 py-1 rounded-lg text-[10px] font-extrabold \${statusBadgeClass(i.status || 'Sent')}">\${i.status || 'Sent'}</span>
                    </div>
                \`).join('') || '<p class="text-center text-xs text-slate-400 py-8">No SMS deduction logs found.</p>';
            }
        }

        function openPolicyModal(type) {
            toggleSidebar(false);
            const modal = document.getElementById('policy-modal');
            const title = document.getElementById('policy-title');
            const content = document.getElementById('policy-content');
            modal.classList.remove('hidden');

            if (type === 'terms') {
                title.innerText = 'Terms & Conditions';
                content.innerHTML = \`
                    <p><strong>1. Account Eligibility:</strong> Users must register with a valid mobile number and strong password. Duplicate accounts on the same number are not permitted.</p>
                    <p><strong>2. Bonus Usage:</strong> Welcome bonus (₹100) and daily bonus (₹10) are credited to the SMS Wallet and are strictly intended for SMS campaign usage.</p>
                    <p><strong>3. Campaign Execution:</strong> Each SMS broadcast deducts applicable SMS Wallet balance and processes campaign delivery through the portal gateway.</p>
                    <p><strong>4. Account Security:</strong> Keep your login credentials confidential. Any unauthorized activity under your credentials remains your responsibility.</p>
                \`;
            } else if (type === 'refund') {
                title.innerText = 'Refund Policy';
                content.innerHTML = \`
                    <p><strong>1. Deposit Verification:</strong> Funds are credited to the SMS Wallet only after admin verification of a valid UTR/transaction reference.</p>
                    <p><strong>2. Invalid UTR / Failed Payments:</strong> Requests submitted with fake, duplicate, or unverified UTR numbers may be rejected without credit.</p>
                    <p><strong>3. Withdrawal Reversals:</strong> If a withdrawal request is declined by the admin, the debited amount is returned to your Earning Wallet.</p>
                    <p><strong>4. Completed SMS Campaigns:</strong> Once an SMS campaign is processed and deducted from the SMS Wallet, deductions are non-refundable.</p>
                \`;
            } else {
                title.innerText = 'Rules & Regulations';
                content.innerHTML = \`
                    <p><strong>1. Withdrawal Rules:</strong> Withdrawals can only be requested from the Earning Wallet. Minimum withdrawal is ₹5,000 and maximum withdrawal is ₹50,000 per request, subject to available balance.</p>
                    <p><strong>2. Deposit Rules:</strong> Scan the official QR code or pay via UPI app, enter the exact amount paid along with a valid UTR number, and wait for approval.</p>
                    <p><strong>3. KYC Rules:</strong> Complete Aadhaar, PAN, Account Holder Name, Account Number, and IFSC details step-by-step. Once submitted and verified, KYC details are permanently locked.</p>
                    <p><strong>4. Add / Change Bank Rules:</strong> After KYC verification, you can update only your Bank Account Number and IFSC Code using the "Change Bank Account" option; account holder name and ID details remain locked.</p>
                \`;
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
          INSERT INTO users (name, mobile, password, role, sms_wallet, earning_wallet, bonus_wallet, pan_no, bank_details, kyc_status, reg_bonus_claimed, last_daily_bonus_date) 
          VALUES (?, ?, ?, 'user', 0.00, 0.00, 0.00, '', '', 'Pending', 0, '')
        `).bind(name, mobile, password).run();
        
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/api/user/claim-bonus" && method === "POST") {
        const { userId, type, date } = await request.json();
        const user = await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(userId).first();
        if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });

        if (type === "registration") {
          if (parseInt(user.reg_bonus_claimed) === 1) {
            return new Response(JSON.stringify({ error: "Registration bonus already claimed" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
          }
          await env.DB.prepare("UPDATE users SET sms_wallet = sms_wallet + 100.00, reg_bonus_claimed = 1 WHERE id = ?").bind(userId).run();
        } else if (type === "daily") {
          const today = date || new Date().toISOString().slice(0, 10);
          if (user.last_daily_bonus_date === today) {
            return new Response(JSON.stringify({ error: "Daily ₹10 bonus already claimed today" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
          }
          await env.DB.prepare("UPDATE users SET sms_wallet = sms_wallet + 10.00, last_daily_bonus_date = ? WHERE id = ?").bind(today, userId).run();
        } else {
          return new Response(JSON.stringify({ error: "Invalid bonus type" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const updated = await env.DB.prepare("SELECT sms_wallet FROM users WHERE id = ?").bind(userId).first();
        return new Response(JSON.stringify({ success: true, sms_wallet: updated.sms_wallet }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
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
        if (!user || (parseFloat(user.sms_wallet) || 0) < smsCost) {
          return new Response(JSON.stringify({ error: "Insufficient SMS Wallet balance" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        const nowTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        await env.DB.prepare("UPDATE users SET sms_wallet = sms_wallet - ?, earning_wallet = earning_wallet + ? WHERE id = ?").bind(smsCost, earningGain, userId).run();
        await env.DB.prepare("INSERT INTO sms_logs (user_id, recipients, message, cost, status, created_at) VALUES (?, ?, ?, ?, 'Sent', ?)").bind(userId, recipients, message, smsCost, nowTime).run();
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
        if (!user || (parseFloat(user.earning_wallet) || 0) < amount) {
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
          const res = await env.DB.prepare("SELECT id, cost, status, created_at FROM sms_logs WHERE user_id = ? ORDER BY id DESC").bind(userId).all();
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
