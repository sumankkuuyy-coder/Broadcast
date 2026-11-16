const USER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Fintech SMS Earning Platform</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style>
        @keyframes popupIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-popup { animation: popupIn 0.3s ease-out forwards; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin 0.8s linear infinite; }
        body.dark-mode { background-color: #0f172a; color: #f1f5f9; }
        body.dark-mode .app-card { background-color: #1e293b; border-color: #334155; color: #f8fafc; }
        body.dark-mode .app-bg { background-color: #0f172a; }
        body.dark-mode .app-input { background-color: #334155; border-color: #475569; color: #f8fafc; }
        body.dark-mode .app-subtext { color: #94a3b8; }
    </style>
</head>
<body class="bg-gray-100 min-h-screen text-gray-800 flex flex-col items-center justify-center p-0 sm:p-4">
    <div id="global-loader" class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 hidden flex flex-col items-center justify-center text-white">
        <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow mb-3"></div>
        <p id="loader-text" class="text-sm font-semibold tracking-wide">Processing...</p>
    </div>

    <!-- AUTH SECTION -->
    <div id="auth-container" class="app-card bg-white w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-2xl shadow-xl overflow-hidden border border-blue-100 p-6 flex flex-col justify-center">
        <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-blue-600 tracking-tight">Fintech SMS Earning</h1>
            <p class="app-subtext text-xs text-gray-500 mt-1">Secure & Fast Simulated Earning Platform</p>
        </div>
        <div class="flex bg-blue-50 p-1 rounded-xl mb-6 relative">
            <div id="toggle-bg" class="absolute w-1/2 h-[calc(100%-8px)] top-1 bg-blue-600 rounded-lg shadow-sm transition-all duration-300"></div>
            <button onclick="switchTab('login')" id="btn-login" class="w-1/2 py-2.5 text-sm font-semibold z-10 text-white transition-colors duration-200">Login</button>
            <button onclick="switchTab('register')" id="btn-register" class="w-1/2 py-2.5 text-sm font-semibold z-10 text-blue-700 transition-colors duration-200">Register</button>
        </div>
        <form id="form-login" onsubmit="handleLogin(event)" class="space-y-4">
            <div>
                <label class="app-subtext block text-xs font-semibold text-gray-600 uppercase mb-1">Mobile Number</label>
                <input type="tel" id="login-mobile" required placeholder="Enter mobile number" class="app-input w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="app-subtext block text-xs font-semibold text-gray-600 uppercase mb-1">Password</label>
                <input type="password" id="login-password" required placeholder="Enter password" class="app-input w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <button type="submit" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all active:scale-[0.98]">Login</button>
        </form>
        <form id="form-register" onsubmit="handleRegister(event)" class="space-y-4 hidden">
            <div>
                <label class="app-subtext block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label>
                <input type="text" id="reg-name" required placeholder="Enter your full name" class="app-input w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm">
            </div>
            <div>
                <label class="app-subtext block text-xs font-semibold text-gray-600 uppercase mb-1">Mobile Number</label>
                <input type="tel" id="reg-mobile" required placeholder="Enter mobile number" class="app-input w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm">
            </div>
            <div>
                <label class="app-subtext block text-xs font-semibold text-gray-600 uppercase mb-1">Create Password</label>
                <input type="password" id="reg-password" required placeholder="Create password" class="app-input w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm">
            </div>
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center text-xs text-blue-800 font-medium">🎁 Get <span class="font-bold">₹100 Sign-up Bonus</span> instantly!</div>
            <button type="submit" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all active:scale-[0.98]">Register Now</button>
        </form>
    </div>

    <!-- MAIN APP CONTAINER -->
    <div id="dashboard-container" class="app-bg bg-gray-50 w-full max-w-md min-h-screen sm:min-h-[700px] sm:rounded-2xl shadow-xl overflow-hidden hidden flex flex-col">
        <div class="bg-blue-700 text-white px-4 py-3.5 flex items-center justify-between shadow-md sticky top-0 z-20">
            <div class="flex items-center space-x-3">
                <button onclick="toggleDrawer()" class="p-1 hover:bg-blue-800 rounded-lg transition-all focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <h2 id="app-bar-title" class="font-bold text-base tracking-wide">Home</h2>
            </div>
            <span class="text-[11px] bg-blue-800 px-2.5 py-1 rounded-full font-semibold">Live</span>
        </div>

        <div id="view-home" class="p-4 space-y-4 flex-1 overflow-y-auto">
            <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-4 shadow-md">
                <p class="text-xs opacity-80">Welcome back,</p>
                <h3 id="home-user-name" class="text-lg font-bold">User</h3>
                <p class="text-[11px] mt-0.5 opacity-90">Complete daily SMS tasks & earn rewards.</p>
            </div>
            <div class="app-card bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
                <h3 class="font-bold text-xs mb-3 flex items-center justify-between">
                    <span>📱 Simulated SMS Campaign</span>
                    <span class="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">Reward: ₹1.50</span>
                </h3>
                <div class="space-y-3">
                    <div>
                        <label class="app-subtext block text-[10px] font-semibold text-gray-400 uppercase mb-1">Target Mobile Number</label>
                        <input type="text" id="task-mobile" readonly value="+91 98XXXXXX10" class="app-input w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono">
                    </div>
                    <div>
                        <label class="app-subtext block text-[10px] font-semibold text-gray-400 uppercase mb-1">Promotional Content</label>
                        <textarea readonly rows="3" class="app-input w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs">Amazon Diwali Mega Sale! Flat 50% cashback on smartphones & electronics. Grab deal now: https://amzn.in/diwali-sale</textarea>
                    </div>
                    <button id="send-sms-btn" onclick="startSmsTask()" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md text-xs transition-all active:scale-[0.98]">Send Promotional SMS (Charge: ₹0.50)</button>
                </div>
            </div>
        </div>

        <div id="view-wallet" class="p-4 space-y-4 flex-1 overflow-y-auto hidden">
            <div class="app-card bg-white border border-blue-200 rounded-2xl p-4 shadow-xs">
                <div class="flex justify-between items-start">
                    <div><p class="app-subtext text-xs font-bold text-gray-500 uppercase">SMS Wallet Balance</p><h3 id="bal-sms" class="text-2xl font-bold text-blue-600 mt-1">₹0.00</h3></div>
                    <button onclick="openAddFundModal()" class="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-xl font-semibold shadow-xs">+ Add Fund</button>
                </div>
                <div class="mt-3 pt-2.5 border-t border-gray-200/50 flex justify-between items-center text-xs">
                    <span class="app-subtext text-gray-500 font-medium">🎁 Included Bonus Balance:</span><span id="bal-bonus-inline" class="font-bold text-sky-500">₹0.00</span>
                </div>
            </div>
            <div class="app-card bg-white border border-indigo-200 rounded-2xl p-4 shadow-xs">
                <div class="flex justify-between items-center">
                    <div><p class="app-subtext text-xs font-bold text-gray-500 uppercase">Earning Wallet</p><h3 id="bal-earning" class="text-2xl font-bold text-indigo-600 mt-1">₹0.00</h3></div>
                    <button onclick="openWithdrawModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded-xl font-semibold shadow-xs">Withdraw</button>
                </div>
            </div>
        </div>

        <div id="view-history" class="p-4 space-y-4 flex-1 overflow-y-auto hidden">
            <h3 class="font-bold text-sm">Transaction History</h3>
            <div class="grid grid-cols-4 bg-gray-200/70 p-1 rounded-xl text-[11px] font-semibold gap-1">
                <button onclick="switchHistoryTab('sms')" id="tab-sms" class="py-1.5 bg-white text-blue-700 rounded-lg shadow-xs transition-all">Send SMS</button>
                <button onclick="switchHistoryTab('withdrawals')" id="tab-withdrawals" class="py-1.5 text-gray-600 rounded-lg transition-all">Withdraw</button>
                <button onclick="switchHistoryTab('funds')" id="tab-funds" class="py-1.5 text-gray-600 rounded-lg transition-all">Add Fund</button>
                <button onclick="switchHistoryTab('bonus')" id="tab-bonus" class="py-1.5 text-gray-600 rounded-lg transition-all">Bonus</button>
            </div>
            <div class="space-y-2.5">
                <div id="history-sms" class="space-y-2"><p class="text-xs text-gray-400 text-center py-6">Loading logs...</p></div>
                <div id="history-withdrawals" class="space-y-2 hidden"><p class="text-xs text-gray-400 text-center py-6">Loading withdrawals...</p></div>
                <div id="history-funds" class="space-y-2 hidden"><p class="text-xs text-gray-400 text-center py-6">Loading fund requests...</p></div>
                <div id="history-bonus" class="space-y-2 hidden"><div class="app-card bg-white p-3 rounded-xl text-xs flex justify-between"><span>Sign-Up Bonus</span><span class="font-bold text-emerald-500">+₹100.00</span></div></div>
            </div>
        </div>

        <div id="view-kyc" class="p-4 space-y-4 flex-1 overflow-y-auto hidden">
            <div class="app-card bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-2.5">
                <h4 class="font-bold text-xs text-blue-600 uppercase">Step 1: Aadhaar Verification</h4>
                <input type="text" id="kyc-aadhaar" maxlength="12" placeholder="12-digit Aadhaar Number" class="app-input w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono">
                <button id="btn-save-aadhaar" onclick="saveAadhaar()" class="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl text-xs">Verify & Lock Aadhaar</button>
            </div>
            <div id="step-pan-card" class="app-card bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-2.5 opacity-50 pointer-events-none">
                <h4 class="font-bold text-xs text-blue-600 uppercase">Step 2: PAN Card Verification</h4>
                <input type="text" id="kyc-pan" maxlength="10" placeholder="PAN Number" class="app-input w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono uppercase">
                <button id="btn-save-pan" onclick="savePan()" class="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl text-xs">Verify & Lock PAN</button>
            </div>
            <div id="step-bank-card" class="app-card bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-2.5 opacity-50 pointer-events-none">
                <h4 class="font-bold text-xs text-blue-600 uppercase">Step 3: Bank Account Details</h4>
                <input type="text" id="kyc-bank-acc" placeholder="Account Number" class="app-input w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono">
                <input type="text" id="kyc-bank-ifsc" placeholder="IFSC Code" class="app-input w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono uppercase">
                <input type="text" id="kyc-bank-holder" placeholder="Account Holder Name" class="app-input w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs">
                <button id="btn-save-bank" onclick="saveBankDetails()" class="w-full py-2.5 bg-emerald-600 text-white font-semibold rounded-xl text-xs">Save Bank Account</button>
            </div>
        </div>

        <div id="view-profile" class="p-4 space-y-4 flex-1 overflow-y-auto hidden">
            <div class="app-card bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3 text-center">
                <h4 id="profile-name-disp" class="font-bold text-sm">User</h4>
                <p id="profile-mobile-disp" class="app-subtext text-xs text-gray-500 font-mono"></p>
            </div>
        </div>
    </div>

    <!-- DRAWER -->
    <div id="nav-drawer" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 hidden flex justify-start">
        <div class="drawer-panel bg-white w-72 h-full shadow-2xl flex flex-col justify-between">
            <div>
                <div class="bg-blue-700 text-white p-5 flex items-center justify-between">
                    <div><h3 id="drawer-name" class="font-bold text-sm">User</h3><p id="drawer-mobile" class="text-[11px] opacity-80 font-mono"></p></div>
                    <button onclick="toggleDrawer()" class="text-white text-lg font-bold">✕</button>
                </div>
                <nav class="p-3 space-y-1 text-sm font-medium">
                    <button onclick="navigate('home')" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-blue-50">🏠 Home</button>
                    <button onclick="navigate('wallet')" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-blue-50">💳 Wallet</button>
                    <button onclick="navigate('history')" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-blue-50">📊 History</button>
                    <button onclick="navigate('kyc')" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-blue-50">🪪 KYC & Bank</button>
                    <button onclick="navigate('profile')" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-blue-50">👤 Profile</button>
                </nav>
            </div>
            <div class="p-4 border-t border-gray-200/30 space-y-3">
                <button onclick="handleLogout()" class="w-full py-2.5 bg-red-600 text-white font-bold rounded-xl text-xs shadow-md">🚪 Logout</button>
            </div>
        </div>
    </div>

    <!-- MODALS -->
    <div id="add-fund-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
        <div class="app-card bg-white w-full max-w-sm rounded-2xl p-5 text-center shadow-2xl">
            <h3 class="text-sm font-bold mb-1">Add Fund</h3>
            <input type="number" id="fund-amount" placeholder="Amount (₹500-2000)" class="app-input w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs mb-2">
            <input type="text" id="fund-utr" placeholder="12-digit UTR No" class="app-input w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs mb-3 font-mono">
            <div class="flex gap-2">
                <button onclick="closeAddFundModal()" class="w-1/2 py-2 bg-gray-200 rounded-xl text-xs">Cancel</button>
                <button onclick="submitAddFund()" class="w-1/2 py-2 bg-blue-600 text-white rounded-xl text-xs">Submit</button>
            </div>
        </div>
    </div>

    <div id="withdraw-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
        <div class="app-card bg-white w-full max-w-sm rounded-2xl p-5 text-center shadow-2xl">
            <h3 class="text-sm font-bold mb-1">Withdraw</h3>
            <input type="number" id="withdraw-amount" placeholder="Amount (₹5000-50000)" class="app-input w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs mb-2">
            <input type="text" id="withdraw-bank-info" readonly placeholder="Bank Details" class="app-input w-full px-3 py-2 bg-gray-100 border rounded-xl text-xs mb-3 font-mono">
            <div class="flex gap-2">
                <button onclick="closeWithdrawModal()" class="w-1/2 py-2 bg-gray-200 rounded-xl text-xs">Cancel</button>
                <button onclick="submitWithdrawal()" class="w-1/2 py-2 bg-indigo-600 text-white rounded-xl text-xs">Request</button>
            </div>
        </div>
    </div>

    <div id="popup-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
        <div class="app-card bg-white w-full max-w-sm rounded-2xl p-5 text-center shadow-2xl">
            <h3 id="popup-title" class="text-base font-bold mb-1"></h3>
            <p id="popup-message" class="app-subtext text-xs text-gray-600 mb-4"></p>
            <button onclick="closePopup()" class="w-full py-2.5 bg-gray-900 text-white font-semibold rounded-xl text-xs">OK</button>
        </div>
    </div>

    <script>
        let currentUser = null;
        function simulateLoading(text, cb) {
            const l = document.getElementById('global-loader');
            document.getElementById('loader-text').innerText = text;
            l.classList.remove('hidden');
            setTimeout(() => { l.classList.add('hidden'); if(cb) cb(); }, 1500);
        }
        function switchTab(t) {
            const lf = document.getElementById('form-login'), rf = document.getElementById('form-register'), bl = document.getElementById('btn-login'), br = document.getElementById('btn-register'), tb = document.getElementById('toggle-bg');
            if(t==='login') { tb.style.transform='translateX(0%)'; lf.classList.remove('hidden'); rf.classList.add('hidden'); bl.className='w-1/2 py-2.5 text-sm font-semibold z-10 text-white transition-colors duration-200'; br.className='w-1/2 py-2.5 text-sm font-semibold z-10 text-blue-700 transition-colors duration-200'; }
            else { tb.style.transform='translateX(100%)'; rf.classList.remove('hidden'); lf.classList.add('hidden'); br.className='w-1/2 py-2.5 text-sm font-semibold z-10 text-white transition-colors duration-200'; bl.className='w-1/2 py-2.5 text-sm font-semibold z-10 text-blue-700 transition-colors duration-200'; }
        }
        function toggleDrawer() { document.getElementById('nav-drawer').classList.toggle('hidden'); }
        function navigate(v) {
            toggleDrawer();
            ['home','wallet','history','kyc','profile'].forEach(x => document.getElementById('view-'+x).classList.add('hidden'));
            document.getElementById('view-'+v).classList.remove('hidden');
            if(v==='history') loadUserHistory();
            if(v==='kyc') renderKycSteps();
        }
        function switchHistoryTab(type) {
            ['sms','withdrawals','funds','bonus'].forEach(t => { document.getElementById('history-'+t).classList.add('hidden'); document.getElementById('tab-'+t).className='py-1.5 text-gray-600 rounded-lg transition-all'; });
            document.getElementById('history-'+type).classList.remove('hidden');
            document.getElementById('tab-'+type).className='py-1.5 bg-white text-blue-700 rounded-lg shadow-xs transition-all font-bold';
        }
        function showPopup(type, title, msg) {
            document.getElementById('popup-title').innerText = title;
            document.getElementById('popup-message').innerText = msg;
            document.getElementById('popup-modal').classList.remove('hidden');
        }
        function closePopup() { document.getElementById('popup-modal').classList.add('hidden'); }

        async function handleRegister(e) {
            e.preventDefault();
            const name = document.getElementById('reg-name').value, mobile = document.getElementById('reg-mobile').value, password = document.getElementById('reg-password').value;
            simulateLoading("Creating Account...", async () => {
                const res = await fetch('/api/register', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,mobile,password}) });
                const data = await res.json();
                if(res.ok) { showPopup('success', 'Success', 'Registered successfully!'); switchTab('login'); }
                else { showPopup('error', 'Failed', data.error); }
            });
        }
        async function handleLogin(e) {
            e.preventDefault();
            const mobile = document.getElementById('login-mobile').value, password = document.getElementById('login-password').value;
            simulateLoading("Logging in...", async () => {
                const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({mobile,password}) });
                const data = await res.json();
                if(res.ok) {
                    currentUser = data.user;
                    document.getElementById('auth-container').classList.add('hidden');
                    document.getElementById('dashboard-container').classList.remove('hidden');
                    loadDashboard();
                } else { showPopup('error', 'Login Failed', data.error); }
            });
        }
        function loadDashboard() {
            document.getElementById('home-user-name').innerText = currentUser.name;
            document.getElementById('drawer-name').innerText = currentUser.name;
            document.getElementById('drawer-mobile').innerText = currentUser.mobile;
            document.getElementById('profile-name-disp').innerText = currentUser.name;
            document.getElementById('profile-mobile-disp').innerText = currentUser.mobile;
            document.getElementById('bal-sms').innerText = \`₹\${currentUser.sms_wallet.toFixed(2)}\`;
            document.getElementById('bal-bonus-inline').innerText = \`₹\${currentUser.bonus_wallet.toFixed(2)}\`;
            document.getElementById('bal-earning').innerText = \`₹\${currentUser.earning_wallet.toFixed(2)}\`;
            renderKycSteps();
        }

        function renderKycSteps() {
            if (currentUser.aadhaar_no && currentUser.aadhaar_no.length === 12) {
                document.getElementById('kyc-aadhaar').value = currentUser.aadhaar_no;
                document.getElementById('kyc-aadhaar').disabled = true;
                document.getElementById('btn-save-aadhaar').classList.add('hidden');
                document.getElementById('step-pan-card').classList.remove('opacity-50', 'pointer-events-none');
            }
            if (currentUser.pan_no && currentUser.pan_no.length === 10) {
                document.getElementById('kyc-pan').value = currentUser.pan_no;
                document.getElementById('kyc-pan').disabled = true;
                document.getElementById('btn-save-pan').classList.add('hidden');
                document.getElementById('step-bank-card').classList.remove('opacity-50', 'pointer-events-none');
            }
            if (currentUser.bank_acc) {
                document.getElementById('kyc-bank-acc').value = currentUser.bank_acc;
                document.getElementById('kyc-bank-ifsc').value = currentUser.bank_ifsc;
                document.getElementById('kyc-bank-holder').value = currentUser.bank_holder;
                document.getElementById('withdraw-bank-info').value = \`\${currentUser.bank_acc} | \${currentUser.bank_ifsc} | \${currentUser.bank_holder}\`;
            }
        }

        async function saveAadhaar() {
            const aadhaar = document.getElementById('kyc-aadhaar').value.trim();
            if (aadhaar.length !== 12) { alert('Enter valid 12-digit Aadhaar'); return; }
            simulateLoading("Saving Aadhaar...", async () => {
                const res = await fetch('/api/kyc/update', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ userId: currentUser.id, step: 'aadhaar', aadhaar }) });
                if(res.ok) { currentUser.aadhaar_no = aadhaar; renderKycSteps(); showPopup('success', 'Saved', 'Aadhaar saved.'); }
            });
        }
        async function savePan() {
            const pan = document.getElementById('kyc-pan').value.trim().toUpperCase();
            if (pan.length !== 10) { alert('Enter valid 10-char PAN'); return; }
            simulateLoading("Saving PAN...", async () => {
                const res = await fetch('/api/kyc/update', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ userId: currentUser.id, step: 'pan', pan }) });
                if(res.ok) { currentUser.pan_no = pan; renderKycSteps(); showPopup('success', 'Saved', 'PAN saved.'); }
            });
        }
        async function saveBankDetails() {
            const bank_acc = document.getElementById('kyc-bank-acc').value.trim();
            const bank_ifsc = document.getElementById('kyc-bank-ifsc').value.trim().toUpperCase();
            const bank_holder = document.getElementById('kyc-bank-holder').value.trim();
            if(!bank_acc || !bank_ifsc || !bank_holder) { alert('Fill all bank details'); return; }
            simulateLoading("Saving Bank...", async () => {
                const res = await fetch('/api/kyc/update', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ userId: currentUser.id, step: 'bank', bank_acc, bank_ifsc, bank_holder }) });
                if(res.ok) {
                    currentUser.bank_acc = bank_acc; currentUser.bank_ifsc = bank_ifsc; currentUser.bank_holder = bank_holder;
                    renderKycSteps();
                    showPopup('success', 'Saved', 'Bank details saved.');
                }
            });
        }

        async function startSmsTask() {
            simulateLoading("Sending SMS...", async () => {
                const res = await fetch('/api/task/complete', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userId: currentUser.id}) });
                const data = await res.json();
                if(res.ok) {
                    currentUser.sms_wallet = data.sms_wallet; currentUser.earning_wallet = data.earning_wallet; currentUser.bonus_wallet = data.bonus_wallet;
                    loadDashboard();
                    showPopup('success', 'Success', 'Task completed!');
                } else { showPopup('error', 'Error', data.error); }
            });
        }
        function openAddFundModal() { document.getElementById('add-fund-modal').classList.remove('hidden'); }
        function closeAddFundModal() { document.getElementById('add-fund-modal').classList.add('hidden'); }
        async function submitAddFund() {
            const amount = parseFloat(document.getElementById('fund-amount').value), utr = document.getElementById('fund-utr').value;
            const res = await fetch('/api/fund/add', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userId: currentUser.id, amount, utr}) });
            closeAddFundModal();
            if(res.ok) showPopup('success', 'Submitted', 'Pending approval.');
            else showPopup('error', 'Error', 'Failed');
        }
        function openWithdrawModal() { document.getElementById('withdraw-modal').classList.remove('hidden'); }
        function closeWithdrawModal() { document.getElementById('withdraw-modal').classList.add('hidden'); }
        async function submitWithdrawal() {
            const amount = parseFloat(document.getElementById('withdraw-amount').value), paymentInfo = document.getElementById('withdraw-bank-info').value;
            const res = await fetch('/api/withdrawal/request', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({userId: currentUser.id, amount, paymentInfo}) });
            const data = await res.json();
            if(res.ok) { currentUser.earning_wallet = data.new_earning; loadDashboard(); closeWithdrawModal(); showPopup('success', 'Requested', 'Payout requested.'); }
            else { showPopup('error', 'Error', data.error); }
        }
        async function loadUserHistory() {
            const res = await fetch('/api/history?userId=' + currentUser.id);
            const data = await res.json();
            if(res.ok) {
                document.getElementById('history-sms').innerHTML = data.smsLogs.map(l => \`<div class="app-card bg-white p-2.5 rounded-xl border text-xs flex justify-between"><span>To: \${l.recipient_number}</span><span class="text-blue-600 font-bold">\${l.status}</span></div>\`).join('') || '<p class="text-xs text-center text-gray-400">No logs</p>';
                document.getElementById('history-withdrawals').innerHTML = data.withdrawals.map(w => \`<div class="app-card bg-white p-2.5 rounded-xl border text-xs flex justify-between"><span>₹\${w.amount}</span><span class="font-bold">\${w.status}</span></div>\`).join('') || '<p class="text-xs text-center text-gray-400">No withdrawals</p>';
                document.getElementById('history-funds').innerHTML = data.fundRequests.map(f => \`<div class="app-card bg-white p-2.5 rounded-xl border text-xs flex justify-between"><span>₹\${f.amount} (UTR: \${f.utr_number})</span><span class="font-bold">\${f.status}</span></div>\`).join('') || '<p class="text-xs text-center text-gray-400">No fund requests</p>';
            }
        }
        function handleLogout() { location.reload(); }
    </script>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (path === "/" || path === "/index.html") {
        return new Response(USER_HTML, { status: 200, headers: { "Content-Type": "text/html" } });
      }

      // 1. REGISTER API
      if (path === "/api/register" && method === "POST") {
        const { name, mobile, password } = await request.json();
        if (!name || !mobile || !password) return jsonResponse({ error: "All fields required" }, 400, corsHeaders);
        const existing = await env.DB.prepare("SELECT id FROM users WHERE mobile = ?").bind(mobile).first();
        if (existing) return jsonResponse({ error: "Mobile already registered" }, 400, corsHeaders);
        await env.DB.prepare("INSERT INTO users (name, mobile, password, sms_wallet, earning_wallet, bonus_wallet, role) VALUES (?, ?, ?, 100.0, 0.0, 100.0, 'user')").bind(name, mobile, password).run();
        return jsonResponse({ success: true }, 200, corsHeaders);
      }

      // 2. LOGIN API
      if (path === "/api/login" && method === "POST") {
        const { mobile, password } = await request.json();
        const user = await env.DB.prepare("SELECT * FROM users WHERE mobile = ? AND password = ?").bind(mobile, password).first();
        if (!user) return jsonResponse({ error: "Invalid mobile or password" }, 401, corsHeaders);
        return jsonResponse({ success: true, user }, 200, corsHeaders);
      }

      // 3. COMPLETE SMS TASK API
      if (path === "/api/task/complete" && method === "POST") {
        const { userId } = await request.json();
        const user = await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(userId).first();
        if (!user) return jsonResponse({ error: "User not found" }, 404, corsHeaders);
        let { sms_wallet, bonus_wallet, earning_wallet } = user;
        const cost = 0.50, reward = 1.50;
        if (sms_wallet >= cost) sms_wallet -= cost;
        else if (bonus_wallet >= cost) bonus_wallet -= cost;
        else return jsonResponse({ error: "Insufficient balance" }, 400, corsHeaders);
        earning_wallet += reward;
        await env.DB.prepare("UPDATE users SET sms_wallet = ?, bonus_wallet = ?, earning_wallet = ? WHERE id = ?").bind(sms_wallet, bonus_wallet, earning_wallet, userId).run();
        await env.DB.prepare("INSERT INTO sms_logs (user_id, recipient_number, message_text, status) VALUES (?, ?, ?, ?)").bind(userId, "+9198XXXXXX10", "Amazon Diwali Sale Offer", "Sent").run();
        return jsonResponse({ success: true, sms_wallet, bonus_wallet, earning_wallet }, 200, corsHeaders);
      }

      // 4. ADD FUND REQUEST API
      if (path === "/api/fund/add" && method === "POST") {
        const { userId, amount, utr } = await request.json();
        await env.DB.prepare("INSERT INTO add_fund_requests (user_id, amount, utr_number, status) VALUES (?, ?, ?, 'Pending')").bind(userId, amount, utr).run();
        return jsonResponse({ success: true }, 200, corsHeaders);
      }

      // 5. WITHDRAWAL REQUEST API
      if (path === "/api/withdrawal/request" && method === "POST") {
        const { userId, amount, paymentInfo } = await request.json();
        const user = await env.DB.prepare("SELECT earning_wallet FROM users WHERE id = ?").bind(userId).first();
        if (!user || user.earning_wallet < amount) return jsonResponse({ error: "Insufficient balance" }, 400, corsHeaders);
        const new_earning = user.earning_wallet - amount;
        await env.DB.prepare("UPDATE users SET earning_wallet = ? WHERE id = ?").bind(new_earning, userId).run();
        await env.DB.prepare("INSERT INTO withdrawals (user_id, amount, payment_info, status) VALUES (?, ?, ?, 'Pending')").bind(userId, amount, paymentInfo).run();
        return jsonResponse({ success: true, new_earning }, 200, corsHeaders);
      }

      // 6. HISTORY API
      if (path === "/api/history" && method === "GET") {
        const userId = url.searchParams.get("userId");
        const smsLogs = await env.DB.prepare("SELECT * FROM sms_logs WHERE user_id = ? ORDER BY id DESC").bind(userId).all();
        const fundRequests = await env.DB.prepare("SELECT * FROM add_fund_requests WHERE user_id = ? ORDER BY id DESC").bind(userId).all();
        const withdrawals = await env.DB.prepare("SELECT * FROM withdrawals WHERE user_id = ? ORDER BY id DESC").bind(userId).all();
        return jsonResponse({ success: true, smsLogs: smsLogs.results || [], fundRequests: fundRequests.results || [], withdrawals: withdrawals.results || [] }, 200, corsHeaders);
      }

      // 7. KYC & BANK DETAILS UPDATE API (FIXED FOR D1 SAVING)
      if (path === "/api/kyc/update" && method === "POST") {
        const { userId, step, aadhaar, pan, bank_acc, bank_ifsc, bank_holder } = await request.json();
        if (step === 'aadhaar') {
          await env.DB.prepare("UPDATE users SET aadhaar_no = ? WHERE id = ?").bind(aadhaar, userId).run();
        } else if (step === 'pan') {
          await env.DB.prepare("UPDATE users SET pan_no = ? WHERE id = ?").bind(pan, userId).run();
        } else if (step === 'bank') {
          await env.DB.prepare("UPDATE users SET bank_acc = ?, bank_ifsc = ?, bank_holder = ? WHERE id = ?").bind(bank_acc, bank_ifsc, bank_holder, userId).run();
        }
        return jsonResponse({ success: true }, 200, corsHeaders);
      }

      return new Response("Not Found", { status: 404 });

    } catch (err) {
      return jsonResponse({ error: err.message }, 500, corsHeaders);
    }
  }
};

function jsonResponse(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json" }
  });
}
