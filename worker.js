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
    </style>
</head>
<body class="bg-gray-100 min-h-screen text-gray-800 flex flex-col items-center justify-center p-0 sm:p-4">
    <div id="global-loader" class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 hidden flex flex-col items-center justify-center text-white">
        <div class="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin-slow mb-3"></div>
        <p id="loader-text" class="text-sm font-semibold tracking-wide">Processing...</p>
    </div>

    <!-- AUTH SECTION -->
    <div id="auth-container" class="bg-white w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-2xl shadow-xl overflow-hidden border border-emerald-100 p-6 flex flex-col justify-center">
        <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-emerald-600 tracking-tight">Fintech SMS Earning</h1>
            <p class="text-xs text-gray-500 mt-1">Secure & Fast Simulated Earning Platform</p>
        </div>
        <div class="flex bg-emerald-50 p-1 rounded-xl mb-6 relative">
            <div id="toggle-bg" class="absolute w-1/2 h-[calc(100%-8px)] top-1 bg-emerald-600 rounded-lg shadow-sm transition-all duration-300"></div>
            <button onclick="switchTab('login')" id="btn-login" class="w-1/2 py-2.5 text-sm font-semibold z-10 text-white transition-colors duration-200">Login</button>
            <button onclick="switchTab('register')" id="btn-register" class="w-1/2 py-2.5 text-sm font-semibold z-10 text-emerald-700 transition-colors duration-200">Register</button>
        </div>
        <form id="form-login" onsubmit="handleLogin(event)" class="space-y-4">
            <div>
                <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Mobile Number</label>
                <input type="tel" id="login-mobile" required placeholder="Enter mobile number" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Password</label>
                <input type="password" id="login-password" required placeholder="Enter password" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            </div>
            <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all active:scale-[0.98]">Login</button>
        </form>
        <form id="form-register" onsubmit="handleRegister(event)" class="space-y-4 hidden">
            <div>
                <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label>
                <input type="text" id="reg-name" required placeholder="Enter your full name" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm">
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Mobile Number</label>
                <input type="tel" id="reg-mobile" required placeholder="Enter mobile number" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm">
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Create Password</label>
                <input type="password" id="reg-password" required placeholder="Create password" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm">
            </div>
            <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center text-xs text-emerald-800 font-medium">🎁 Get <span class="font-bold">₹100 Sign-up Bonus</span> instantly!</div>
            <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all active:scale-[0.98]">Register Now</button>
        </form>
    </div>

    <!-- MAIN APP CONTAINER -->
    <div id="dashboard-container" class="bg-gray-50 w-full max-w-md min-h-screen sm:min-h-[700px] sm:rounded-2xl shadow-xl overflow-hidden hidden flex flex-col">
        <div class="bg-emerald-700 text-white px-4 py-3.5 flex items-center justify-between shadow-md sticky top-0 z-20">
            <div class="flex items-center space-x-3">
                <button onclick="toggleDrawer()" class="p-1 hover:bg-emerald-800 rounded-lg transition-all focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <h2 id="app-bar-title" class="font-bold text-base tracking-wide">Home</h2>
            </div>
            <span class="text-[11px] bg-emerald-800 px-2.5 py-1 rounded-full font-semibold">Live</span>
        </div>

        <div id="view-home" class="p-4 space-y-4 flex-1 overflow-y-auto">
            <div class="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-4 shadow-md">
                <p class="text-xs opacity-80">Welcome back,</p>
                <h3 id="home-user-name" class="text-lg font-bold">User</h3>
                <p class="text-[11px] mt-0.5 opacity-90">Complete daily SMS tasks & earn rewards.</p>
            </div>
            <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
                <h3 class="font-bold text-xs mb-3 flex items-center justify-between">
                    <span>📱 Simulated SMS Campaign</span>
                    <span class="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Reward: ₹1.50</span>
                </h3>
                <div class="space-y-3">
                    <div>
                        <label class="block text-[10px] font-semibold text-gray-400 uppercase mb-1">Target Mobile Number</label>
                        <input type="text" id="task-mobile" readonly value="+91 98XXXXXX10" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] font-semibold text-gray-400 uppercase mb-1">Promotional Content</label>
                        <textarea readonly rows="3" class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs">Amazon Diwali Mega Sale! Flat 50% cashback on smartphones & electronics. Grab deal now: https://amzn.in/diwali-sale</textarea>
                    </div>
                    <button id="send-sms-btn" onclick="startSmsTask()" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md text-xs transition-all active:scale-[0.98]">Send Promotional SMS (Charge: ₹0.50)</button>
                </div>
            </div>
        </div>

        <div id="view-wallet" class="p-4 space-y-4 flex-1 overflow-y-auto hidden">
            <div class="bg-white border border-emerald-200 rounded-2xl p-4 shadow-xs">
                <div class="flex justify-between items-start">
                    <div><p class="text-xs font-bold text-gray-500 uppercase">SMS Wallet Balance</p><h3 id="bal-sms" class="text-2xl font-bold text-emerald-600 mt-1">₹0.00</h3></div>
                    <button onclick="openAddFundModal()" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-xl font-semibold shadow-xs">+ Add Fund</button>
                </div>
                <div class="mt-3 pt-2.5 border-t border-gray-200/50 flex justify-between items-center text-xs">
                    <span class="text-gray-500 font-medium">🎁 Included Bonus Balance:</span><span id="bal-bonus-inline" class="font-bold text-teal-600">₹0.00</span>
                </div>
            </div>
            <div class="bg-white border border-teal-200 rounded-2xl p-4 shadow-xs">
                <div class="flex justify-between items-center">
                    <div><p class="text-xs font-bold text-gray-500 uppercase">Earning Wallet</p><h3 id="bal-earning" class="text-2xl font-bold text-teal-600 mt-1">₹0.00</h3></div>
                    <button onclick="openWithdrawModal()" class="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1.5 rounded-xl font-semibold shadow-xs">Withdraw</button>
                </div>
            </div>
        </div>

        <div id="view-history" class="p-4 space-y-4 flex-1 overflow-y-auto hidden">
            <h3 class="font-bold text-sm">Transaction History</h3>
            <div class="grid grid-cols-4 bg-gray-200/70 p-1 rounded-xl text-[11px] font-semibold gap-1">
                <button onclick="switchHistoryTab('sms')" id="tab-sms" class="py-1.5 bg-white text-emerald-700 rounded-lg shadow-xs transition-all">Send SMS</button>
                <button onclick="switchHistoryTab('withdrawals')" id="tab-withdrawals" class="py-1.5 text-gray-600 rounded-lg transition-all">Withdraw</button>
                <button onclick="switchHistoryTab('funds')" id="tab-funds" class="py-1.5 text-gray-600 rounded-lg transition-all">Add Fund</button>
                <button onclick="switchHistoryTab('bonus')" id="tab-bonus" class="py-1.5 text-gray-600 rounded-lg transition-all">Bonus</button>
            </div>
            <div class="space-y-2.5">
                <div id="history-sms" class="space-y-2"><p class="text-xs text-gray-400 text-center py-6">Loading logs...</p></div>
                <div id="history-withdrawals" class="space-y-2 hidden"><p class="text-xs text-gray-400 text-center py-6">Loading withdrawals...</p></div>
                <div id="history-funds" class="space-y-2 hidden"><p class="text-xs text-gray-400 text-center py-6">Loading fund requests...</p></div>
                <div id="history-bonus" class="space-y-2 hidden"><div class="bg-white p-3 rounded-xl text-xs flex justify-between"><span>Sign-Up Bonus</span><span class="font-bold text-emerald-600">+₹100.00</span></div></div>
            </div>
        </div>

        <div id="view-kyc" class="p-4 space-y-4 flex-1 overflow-y-auto hidden">
            <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3">
                <h4 class="font-bold text-xs text-emerald-600 uppercase">KYC & Bank Details</h4>
                <input type="text" id="kyc-pan" maxlength="10" placeholder="PAN Card Number" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono uppercase">
                <input type="text" id="kyc-bank" placeholder="Bank Details / UPI (e.g. A/C & IFSC)" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs">
                <button onclick="saveFullKyc()" class="w-full py-2.5 bg-emerald-600 text-white font-semibold rounded-xl text-xs">Save KYC & Bank</button>
            </div>
        </div>

        <div id="view-profile" class="p-4 space-y-4 flex-1 overflow-y-auto hidden">
            <div class="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3 text-center">
                <h4 id="profile-name-disp" class="font-bold text-sm">User</h4>
                <p id="profile-mobile-disp" class="text-xs text-gray-500 font-mono"></p>
            </div>
        </div>
    </div>

    <!-- DRAWER -->
    <div id="nav-drawer" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 hidden flex justify-start">
        <div class="bg-white w-72 h-full shadow-2xl flex flex-col justify-between">
            <div>
                <div class="bg-emerald-700 text-white p-5 flex items-center justify-between">
                    <div><h3 id="drawer-name" class="font-bold text-sm">User</h3><p id="drawer-mobile" class="text-[11px] opacity-80 font-mono"></p></div>
                    <button onclick="toggleDrawer()" class="text-white text-lg font-bold">✕</button>
                </div>
                <nav class="p-3 space-y-1 text-sm font-medium">
                    <button onclick="navigate('home')" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50">🏠 Home</button>
                    <button onclick="navigate('wallet')" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50">💳 Wallet</button>
                    <button onclick="navigate('history')" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50">📊 History</button>
                    <button onclick="navigate('kyc')" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50">🪪 KYC & Bank</button>
                    <button onclick="navigate('profile')" class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50">👤 Profile</button>
                </nav>
            </div>
            <div class="p-4 border-t border-gray-200/30 space-y-3">
                <button onclick="handleLogout()" class="w-full py-2.5 bg-red-600 text-white font-bold rounded-xl text-xs shadow-md">🚪 Logout</button>
            </div>
        </div>
    </div>

    <!-- MODALS -->
    <div id="add-fund-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 text-center shadow-2xl">
            <h3 class="text-sm font-bold mb-1">Add Fund</h3>
            <input type="number" id="fund-amount" placeholder="Amount (₹500-2000)" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs mb-2">
            <input type="text" id="fund-utr" placeholder="12-digit UTR No" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs mb-3 font-mono">
            <div class="flex gap-2">
                <button onclick="closeAddFundModal()" class="w-1/2 py-2 bg-gray-200 rounded-xl text-xs">Cancel</button>
                <button onclick="submitAddFund()" class="w-1/2 py-2 bg-emerald-600 text-white rounded-xl text-xs">Submit</button>
            </div>
        </div>
    </div>

    <div id="withdraw-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 text-center shadow-2xl">
            <h3 class="text-sm font-bold mb-1">Withdraw</h3>
            <input type="number" id="withdraw-amount" placeholder="Amount (₹5000-50000)" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs mb-2">
            <input type="text" id="withdraw-bank-info" placeholder="Bank Details / UPI" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs mb-3 font-mono">
            <div class="flex gap-2">
                <button onclick="closeWithdrawModal()" class="w-1/2 py-2 bg-gray-200 rounded-xl text-xs">Cancel</button>
                <button onclick="submitWithdrawal()" class="w-1/2 py-2 bg-teal-600 text-white rounded-xl text-xs">Request</button>
            </div>
        </div>
    </div>

    <div id="popup-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 hidden z-50">
        <div class="bg-white w-full max-w-sm rounded-2xl p-5 text-center shadow-2xl">
            <h3 id="popup-title" class="text-base font-bold mb-1"></h3>
            <p id="popup-message" class="text-xs text-gray-600 mb-4"></p>
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
            if(t==='login') { tb.style.transform='translateX(0%)'; lf.classList.remove('hidden'); rf.classList.add('hidden'); bl.className='w-1/2 py-2.5 text-sm font-semibold z-10 text-white transition-colors duration-200'; br.className='w-1/2 py-2.5 text-sm font-semibold z-10 text-emerald-700 transition-colors duration-200'; }
            else { tb.style.transform='translateX(100%)'; rf.classList.remove('hidden'); lf.classList.add('hidden'); br.className='w-1/2 py-2.5 text-sm font-semibold z-10 text-white transition-colors duration-200'; bl.className='w-1/2 py-2.5 text-sm font-semibold z-10 text-emerald-700 transition-colors duration-200'; }
        }
        function toggleDrawer() { document.getElementById('nav-drawer').classList.toggle('hidden'); }
        function navigate(v) {
            toggleDrawer();
            ['home','wallet','history','kyc','profile'].forEach(x => document.getElementById('view-'+x).classList.add('hidden'));
            document.getElementById('view-'+v).classList.remove('hidden');
            if(v==='history') loadUserHistory();
        }
        function switchHistoryTab(type) {
            ['sms','withdrawals','funds','bonus'].forEach(t => { document.getElementById('history-'+t).classList.add('hidden'); document.getElementById('tab-'+t).className='py-1.5 text-gray-600 rounded-lg transition-all'; });
            document.getElementById('history-'+type).classList.remove('hidden');
            document.getElementById('tab-'+type).className='py-1.5 bg-white text-emerald-700 rounded-lg shadow-xs transition-all font-bold';
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
            document.getElementById('kyc-pan').value = currentUser.pan_no || '';
            document.getElementById('kyc-bank').value = currentUser.bank_details || '';
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
            const data = await res.json();
            closeAddFundModal();
            if(res.ok) showPopup('success', 'Submitted', 'Pending approval.');
            else showPopup('error', 'Error', data.error);
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
                document.getElementById('history-sms').innerHTML = data.smsLogs.map(l => \`<div class="bg-white p-2.5 rounded-xl border text-xs flex justify-between"><span>To: \${l.recipient_number}</span><span class="text-emerald-600 font-bold">\${l.status}</span></div>\`).join('') || '<p class="text-xs text-center text-gray-400">No logs</p>';
                document.getElementById('history-withdrawals').innerHTML = data.withdrawals.map(w => \`<div class="bg-white p-2.5 rounded-xl border text-xs flex justify-between"><span>₹\${w.amount}</span><span class="font-bold">\${w.status}</span></div>\`).join('') || '<p class="text-xs text-center text-gray-400">No withdrawals</p>';
                document.getElementById('history-funds').innerHTML = data.fundRequests.map(f => \`<div class="bg-white p-2.5 rounded-xl border text-xs flex justify-between"><span>₹\${f.amount} (UTR: \${f.utr_number})</span><span class="font-bold">\${f.status}</span></div>\`).join('') || '<p class="text-xs text-center text-gray-400">No fund requests</p>';
            }
        }
        async function saveFullKyc() {
            const payload = {
                userId: currentUser.id,
                pan: document.getElementById('kyc-pan').value,
                bank_details: document.getElementById('kyc-bank').value
            };
            await fetch('/api/kyc/update', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
            Object.assign(currentUser, { pan_no: payload.pan, bank_details: payload.bank_details });
            showPopup('success', 'Saved', 'KYC & Bank Details updated.');
        }
        function handleLogout() { location.reload(); }
    </script>
</body>
</html>`;

const ADMIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Admin Master Control Panel</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-gray-100 min-h-screen text-gray-800 flex flex-col items-center p-2 sm:p-4">

    <!-- ADMIN LOGIN -->
    <div id="admin-login-box" class="bg-white border border-emerald-100 w-full max-w-sm rounded-2xl p-6 shadow-xl my-auto">
        <div class="text-center mb-5">
            <h2 class="text-xl font-bold text-emerald-700">🔐 Master Admin Portal</h2>
            <p class="text-xs text-gray-500 mt-1">Authorized Personnel Only</p>
        </div>
        <form onsubmit="handleAdminLogin(event)" class="space-y-4">
            <div>
                <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Admin Mobile</label>
                <input type="tel" id="admin-mobile" required placeholder="Enter admin mobile" class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            </div>
            <div>
                <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Password</label>
                <input type="password" id="admin-password" required placeholder="Enter password" class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            </div>
            <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md text-sm">Login to Admin Panel</button>
        </form>
    </div>

    <!-- ADMIN DASHBOARD -->
    <div id="admin-dashboard" class="bg-white border border-gray-200 w-full max-w-3xl rounded-2xl shadow-xl hidden flex flex-col min-h-[85vh] overflow-hidden">
        <!-- Top Header -->
        <div class="bg-emerald-700 text-white px-4 py-3.5 flex items-center justify-between">
            <div>
                <h2 class="text-base font-bold">🛡️ Master Admin Control</h2>
                <p class="text-[11px] text-emerald-100">Payments, Withdrawals & Full User Control</p>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="refreshAllAdminData()" class="bg-emerald-800 hover:bg-emerald-900 px-3 py-1.5 rounded-lg text-xs font-semibold">🔄 Refresh</button>
                <button onclick="adminLogout()" class="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-xs font-semibold">Logout</button>
            </div>
        </div>

        <!-- 3-WAY TOGGLE SWITCH -->
        <div class="p-3 bg-gray-50 border-b border-gray-200">
            <div class="grid grid-cols-3 bg-emerald-100/80 p-1 rounded-xl text-xs font-bold gap-1">
                <button onclick="switchAdminTab('deposits')" id="tab-btn-deposits" class="py-2.5 bg-emerald-600 text-white rounded-lg shadow-xs transition-all">💰 New Deposits <span id="badge-deposits" class="ml-1 bg-white text-emerald-700 px-1.5 py-0.2 rounded-full text-[10px]">0</span></button>
                <button onclick="switchAdminTab('withdrawals')" id="tab-btn-withdrawals" class="py-2.5 text-emerald-800 rounded-lg transition-all">💸 Withdrawals <span id="badge-withdrawals" class="ml-1 bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded-full text-[10px]">0</span></button>
                <button onclick="switchAdminTab('users')" id="tab-btn-users" class="py-2.5 text-emerald-800 rounded-lg transition-all">👥 All Users <span id="badge-users" class="ml-1 bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded-full text-[10px]">0</span></button>
            </div>
        </div>

        <!-- TAB 1: NEW DEPOSITS -->
        <div id="sec-deposits" class="p-4 flex-1 overflow-y-auto space-y-3">
            <p class="text-xs text-gray-400 text-center py-8">Loading deposit requests...</p>
        </div>

        <!-- TAB 2: WITHDRAWALS -->
        <div id="sec-withdrawals" class="p-4 flex-1 overflow-y-auto space-y-3 hidden">
            <p class="text-xs text-gray-400 text-center py-8">Loading withdrawal requests...</p>
        </div>

        <!-- TAB 3: ALL USERS LIST -->
        <div id="sec-users" class="p-4 flex-1 overflow-y-auto space-y-3 hidden">
            <input type="text" id="user-search-input" onkeyup="filterUsersList()" placeholder="🔍 Search user by Name or Mobile..." class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <div id="users-list-container" class="space-y-2.5"></div>
        </div>
    </div>

    <!-- FULL USER DETAILS & EDIT MODAL -->
    <div id="user-detail-modal" class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 hidden flex items-center justify-center p-2 sm:p-4">
        <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
            <!-- Modal Header -->
            <div class="bg-emerald-700 text-white px-4 py-3 flex items-center justify-between">
                <div>
                    <h3 id="modal-user-title" class="font-bold text-sm">User Full Control</h3>
                    <p id="modal-user-sub" class="text-[11px] text-emerald-100">Edit Wallets, Password, Bank, KYC & View History</p>
                </div>
                <button onclick="closeUserModal()" class="bg-emerald-800 hover:bg-emerald-900 px-2.5 py-1 rounded-lg text-xs font-bold">✕ Close</button>
            </div>

            <!-- Modal Inner Tabs -->
            <div class="grid grid-cols-3 bg-gray-100 p-1.5 border-b text-xs font-bold gap-1">
                <button onclick="switchModalSubTab('edit')" id="subtab-edit" class="py-2 bg-white text-emerald-700 rounded-lg shadow-xs">✏️ Edit Account & Wallets</button>
                <button onclick="switchModalSubTab('kyc')" id="subtab-kyc" class="py-2 text-gray-600 rounded-lg">🏦 Bank & KYC</button>
                <button onclick="switchModalSubTab('history')" id="subtab-history" class="py-2 text-gray-600 rounded-lg">📜 User History</button>
            </div>

            <!-- Modal Body -->
            <div class="p-4 overflow-y-auto flex-1 space-y-4">
                <input type="hidden" id="edit-user-id">

                <!-- SUB-TAB 1: EDIT ACCOUNT & WALLETS -->
                <div id="modal-sec-edit" class="space-y-3">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label class="block text-[11px] font-bold text-gray-500 uppercase mb-1">Full Name</label>
                            <input type="text" id="edit-name" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs">
                        </div>
                        <div>
                            <label class="block text-[11px] font-bold text-gray-500 uppercase mb-1">Mobile Number</label>
                            <input type="text" id="edit-mobile" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono">
                        </div>
                        <div>
                            <label class="block text-[11px] font-bold text-gray-500 uppercase mb-1">Account Password</label>
                            <input type="text" id="edit-password" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono">
                        </div>
                        <div>
                            <label class="block text-[11px] font-bold text-gray-500 uppercase mb-1">Account Role</label>
                            <select id="edit-role" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div class="border-t pt-3">
                        <h4 class="text-xs font-bold text-emerald-700 mb-2">💳 Modify Wallet Balances (₹)</h4>
                        <div class="grid grid-cols-3 gap-2">
                            <div class="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                                <label class="block text-[10px] font-bold text-emerald-800 uppercase mb-1">SMS Wallet</label>
                                <input type="number" step="0.01" id="edit-sms-wallet" class="w-full px-2 py-1.5 bg-white border rounded-lg text-xs font-bold text-emerald-700">
                            </div>
                            <div class="bg-teal-50 p-2.5 rounded-xl border border-teal-200">
                                <label class="block text-[10px] font-bold text-teal-800 uppercase mb-1">Earning Wallet</label>
                                <input type="number" step="0.01" id="edit-earning-wallet" class="w-full px-2 py-1.5 bg-white border rounded-lg text-xs font-bold text-teal-700">
                            </div>
                            <div class="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                                <label class="block text-[10px] font-bold text-amber-800 uppercase mb-1">Bonus Wallet</label>
                                <input type="number" step="0.01" id="edit-bonus-wallet" class="w-full px-2 py-1.5 bg-white border rounded-lg text-xs font-bold text-amber-700">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SUB-TAB 2: BANK & KYC DETAILS -->
                <div id="modal-sec-kyc" class="space-y-3 hidden">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label class="block text-[11px] font-bold text-gray-500 uppercase mb-1">PAN Number</label>
                            <input type="text" id="edit-pan" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono uppercase">
                        </div>
                        <div class="sm:col-span-2">
                            <label class="block text-[11px] font-bold text-gray-500 uppercase mb-1">Bank Details</label>
                            <input type="text" id="edit-bank-details" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono">
                        </div>
                    </div>
                </div>

                <!-- SUB-TAB 3: USER FULL HISTORY -->
                <div id="modal-sec-history" class="space-y-3 hidden">
                    <div id="modal-history-content" class="space-y-3 text-xs">
                        <p class="text-center text-gray-400 py-6">Loading user history...</p>
                    </div>
                </div>
            </div>

            <!-- Modal Footer Save Button -->
            <div id="modal-save-footer" class="p-3 bg-gray-50 border-t flex gap-2">
                <button onclick="saveUserChangesByAdmin()" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md">💾 Save All User Changes</button>
            </div>
        </div>
    </div>

    <script>
        let allUsersCache = [];

        async function handleAdminLogin(e) {
            e.preventDefault();
            const mobile = document.getElementById('admin-mobile').value;
            const password = document.getElementById('admin-password').value;
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, password })
            });
            const data = await res.json();
            if (res.ok && data.user.role === 'admin') {
                document.getElementById('admin-login-box').classList.add('hidden');
                document.getElementById('admin-dashboard').classList.remove('hidden');
                refreshAllAdminData();
            } else {
                alert('Access Denied: Invalid admin credentials.');
            }
        }

        function switchAdminTab(tab) {
            ['deposits', 'withdrawals', 'users'].forEach(t => {
                document.getElementById('sec-' + t).classList.add('hidden');
                document.getElementById('tab-btn-' + t).className = 'py-2.5 text-emerald-800 rounded-lg transition-all';
            });
            document.getElementById('sec-' + tab).classList.remove('hidden');
            document.getElementById('tab-btn-' + tab).className = 'py-2.5 bg-emerald-600 text-white rounded-lg shadow-xs transition-all';
        }

        async function refreshAllAdminData() {
            await Promise.all([loadRequestsData(), loadAllUsers()]);
        }

        async function loadRequestsData() {
            const res = await fetch('/api/admin/requests');
            const data = await res.json();
            if (!res.ok) return;

            const pendingFunds = data.funds.filter(f => f.status === 'Pending').length;
            const pendingDraws = data.withdrawals.filter(w => w.status === 'Pending').length;
            document.getElementById('badge-deposits').innerText = pendingFunds;
            document.getElementById('badge-withdrawals').innerText = pendingDraws;

            // Render Deposits
            const depContainer = document.getElementById('sec-deposits');
            depContainer.innerHTML = data.funds.map(f => \`
                <div class="bg-gray-50 border border-gray-200 p-3.5 rounded-xl text-xs space-y-2">
                    <div class="flex justify-between items-center font-bold">
                        <span>👤 \${f.name} (\${f.mobile})</span>
                        <span class="text-emerald-700 text-sm">₹\${f.amount}</span>
                    </div>
                    <div class="flex justify-between text-[11px] text-gray-500 font-mono">
                        <span>UTR: <b class="text-gray-800">\${f.utr_number}</b></span>
                        <span class="px-2 py-0.5 rounded-full font-bold \${f.status === 'Pending' ? 'bg-amber-100 text-amber-800' : f.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">\${f.status}</span>
                    </div>
                    \${f.status === 'Pending' ? \`
                        <div class="flex gap-2 pt-1">
                            <button onclick="adminAction('fund', \${f.id}, 'Approved')" class="w-1/2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold">✓ Approve</button>
                            <button onclick="adminAction('fund', \${f.id}, 'Rejected')" class="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold">✕ Reject</button>
                        </div>
                    \` : ''}
                </div>
            \`).join('') || '<p class="text-xs text-gray-400 text-center py-8">No deposit requests found.</p>';

            // Render Withdrawals
            const drawContainer = document.getElementById('sec-withdrawals');
            drawContainer.innerHTML = data.withdrawals.map(w => \`
                <div class="bg-gray-50 border border-gray-200 p-3.5 rounded-xl text-xs space-y-2">
                    <div class="flex justify-between items-center font-bold">
                        <span>👤 \${w.name} (\${w.mobile})</span>
                        <span class="text-teal-700 text-sm">₹\${w.amount}</span>
                    </div>
                    <p class="text-[11px] text-gray-600 font-mono bg-white p-2 rounded-lg border">Bank/UPI: <b>\${w.payment_info}</b></p>
                    <div class="flex justify-between items-center text-[11px]">
                        <span class="text-gray-400">Request ID: #\${w.id}</span>
                        <span class="px-2 py-0.5 rounded-full font-bold \${w.status === 'Pending' ? 'bg-amber-100 text-amber-800' : w.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">\${w.status}</span>
                    </div>
                    \${w.status === 'Pending' ? \`
                        <div class="flex gap-2 pt-1">
                            <button onclick="adminAction('withdrawal', \${w.id}, 'Approved')" class="w-1/2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold">✓ Approve Payout</button>
                            <button onclick="adminAction('withdrawal', \${w.id}, 'Rejected')" class="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold">✕ Reject & Refund</button>
                        </div>
                    \` : ''}
                </div>
            \`).join('') || '<p class="text-xs text-gray-400 text-center py-8">No withdrawal requests found.</p>';
        }

        async function adminAction(type, id, action) {
            await fetch('/api/admin/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, id, action })
            });
            refreshAllAdminData();
        }

        async function loadAllUsers() {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (!res.ok) return;
            allUsersCache = data.users || [];
            document.getElementById('badge-users').innerText = allUsersCache.length;
            renderUsersList(allUsersCache);
        }

        function renderUsersList(users) {
            const container = document.getElementById('users-list-container');
            container.innerHTML = users.map(u => \`
                <div onclick="openUserModal(\${u.id})" class="bg-gray-50 hover:bg-emerald-50/70 border border-gray-200 p-3.5 rounded-xl cursor-pointer transition-all flex items-center justify-between">
                    <div class="space-y-1">
                        <div class="flex items-center space-x-2">
                            <span class="font-bold text-xs text-gray-800">\${u.name}</span>
                            <span class="text-[10px] px-2 py-0.5 rounded-full font-bold \${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-700'}">\${u.role}</span>
                        </div>
                        <p class="text-[11px] text-gray-500 font-mono">📱 \${u.mobile} | Pass: \${u.password}</p>
                        <div class="flex space-x-3 text-[11px] font-semibold pt-0.5">
                            <span class="text-emerald-700">SMS: ₹\${u.sms_wallet.toFixed(2)}</span>
                            <span class="text-teal-700">Earn: ₹\${u.earning_wallet.toFixed(2)}</span>
                            <span class="text-amber-700">Bonus: ₹\${u.bonus_wallet.toFixed(2)}</span>
                        </div>
                    </div>
                    <span class="text-xs font-bold text-emerald-700 bg-white border border-emerald-200 px-3 py-1.5 rounded-lg shadow-2xs">Manage →</span>
                </div>
            \`).join('') || '<p class="text-xs text-gray-400 text-center py-6">No users found.</p>';
        }

        function filterUsersList() {
            const q = document.getElementById('user-search-input').value.toLowerCase();
            const filtered = allUsersCache.filter(u => u.name.toLowerCase().includes(q) || u.mobile.includes(q));
            renderUsersList(filtered);
        }

        async function openUserModal(userId) {
            const user = allUsersCache.find(u => u.id === userId);
            if (!user) return;

            document.getElementById('edit-user-id').value = user.id;
            document.getElementById('modal-user-title').innerText = \`\${user.name} (ID: #\${user.id})\`;
            document.getElementById('edit-name').value = user.name || '';
            document.getElementById('edit-mobile').value = user.mobile || '';
            document.getElementById('edit-password').value = user.password || '';
            document.getElementById('edit-role').value = user.role || 'user';

            document.getElementById('edit-sms-wallet').value = user.sms_wallet;
            document.getElementById('edit-earning-wallet').value = user.earning_wallet;
            document.getElementById('edit-bonus-wallet').value = user.bonus_wallet;

            document.getElementById('edit-pan').value = user.pan_no || '';
            document.getElementById('edit-bank-details').value = user.bank_details || '';

            switchModalSubTab('edit');
            document.getElementById('user-detail-modal').classList.remove('hidden');

            // Fetch User History in Background
            const histBox = document.getElementById('modal-history-content');
            histBox.innerHTML = '<p class="text-center text-gray-400 py-6">Fetching user logs...</p>';
            const res = await fetch('/api/history?userId=' + user.id);
            const hData = await res.json();
            if (res.ok) {
                histBox.innerHTML = \`
                    <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                        <h5 class="font-bold text-emerald-800 mb-1.5">💰 Deposit History (\${hData.fundRequests.length})</h5>
                        \${hData.fundRequests.map(f => \`<div class="flex justify-between py-1 border-b border-emerald-100"><span>₹\${f.amount} (UTR: \${f.utr_number})</span><b>\${f.status}</b></div>\`).join('') || '<p class="text-gray-500">No deposits</p>'}
                    </div>
                    <div class="bg-teal-50 p-3 rounded-xl border border-teal-200">
                        <h5 class="font-bold text-teal-800 mb-1.5">💸 Withdrawal History (\${hData.withdrawals.length})</h5>
                        \${hData.withdrawals.map(w => \`<div class="flex justify-between py-1 border-b border-teal-100"><span>₹\${w.amount} (\${w.payment_info})</span><b>\${w.status}</b></div>\`).join('') || '<p class="text-gray-500">No withdrawals</p>'}
                    </div>
                    <div class="bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <h5 class="font-bold text-gray-800 mb-1.5">📱 SMS Task Logs (\${hData.smsLogs.length})</h5>
                        \${hData.smsLogs.slice(0, 15).map(s => \`<div class="flex justify-between py-1 border-b border-gray-100"><span>\${s.recipient_number}</span><span class="text-emerald-600 font-bold">\${s.status}</span></div>\`).join('') || '<p class="text-gray-500">No SMS sent</p>'}
                    </div>
                \`;
            }
        }

        function closeUserModal() {
            document.getElementById('user-detail-modal').classList.add('hidden');
        }

        function switchModalSubTab(sub) {
            ['edit', 'kyc', 'history'].forEach(s => {
                document.getElementById('modal-sec-' + s).classList.add('hidden');
                document.getElementById('subtab-' + s).className = 'py-2 text-gray-600 rounded-lg';
            });
            document.getElementById('modal-sec-' + sub).classList.remove('hidden');
            document.getElementById('subtab-' + sub).className = 'py-2 bg-white text-emerald-700 rounded-lg shadow-xs';
            document.getElementById('modal-save-footer').style.display = (sub === 'history') ? 'none' : 'flex';
        }

        async function saveUserChangesByAdmin() {
            const payload = {
                userId: parseInt(document.getElementById('edit-user-id').value),
                name: document.getElementById('edit-name').value,
                mobile: document.getElementById('edit-mobile').value,
                password: document.getElementById('edit-password').value,
                role: document.getElementById('edit-role').value,
                sms_wallet: parseFloat(document.getElementById('edit-sms-wallet').value) || 0,
                earning_wallet: parseFloat(document.getElementById('edit-earning-wallet').value) || 0,
                bonus_wallet: parseFloat(document.getElementById('edit-bonus-wallet').value) || 0,
                pan_no: document.getElementById('edit-pan').value,
                bank_details: document.getElementById('edit-bank-details').value
            };

            const res = await fetch('/api/admin/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert('✅ User details, balances & KYC updated successfully!');
                closeUserModal();
                refreshAllAdminData();
            } else {
                const err = await res.json();
                alert('Error: ' + err.error);
            }
        }

        function adminLogout() {
            document.getElementById('admin-dashboard').classList.add('hidden');
            document.getElementById('admin-login-box').classList.remove('hidden');
        }
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
      if (path === "/admin.html") {
        return new Response(ADMIN_HTML, { status: 200, headers: { "Content-Type": "text/html" } });
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
        if (!amount || amount < 500 || amount > 2000) return jsonResponse({ error: "Amount must be ₹500 - ₹2000" }, 400, corsHeaders);
        await env.DB.prepare("INSERT INTO add_fund_requests (user_id, amount, utr_number, status) VALUES (?, ?, ?, 'Pending')").bind(userId, amount, utr).run();
        return jsonResponse({ success: true }, 200, corsHeaders);
      }

      // 5. WITHDRAWAL REQUEST API
      if (path === "/api/withdrawal/request" && method === "POST") {
        const { userId, amount, paymentInfo } = await request.json();
        if (!amount || amount < 5000 || amount > 50000) return jsonResponse({ error: "Limit ₹5,000 to ₹50,000" }, 400, corsHeaders);
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

      // 7. USER KYC & BANK UPDATE API
      if (path === "/api/kyc/update" && method === "POST") {
        const { userId, pan, bank_details } = await request.json();
        await env.DB.prepare("UPDATE users SET pan_no = ?, bank_details = ? WHERE id = ?")
          .bind(pan || '', bank_details || '', userId).run();
        return jsonResponse({ success: true }, 200, corsHeaders);
      }

      // 8. ADMIN: FETCH ALL DEPOSITS & WITHDRAWALS
      if (path === "/api/admin/requests" && method === "GET") {
        const funds = await env.DB.prepare("SELECT a.*, u.name, u.mobile FROM add_fund_requests a JOIN users u ON a.user_id = u.id ORDER BY a.id DESC").all();
        const withdrawals = await env.DB.prepare("SELECT w.*, u.name, u.mobile FROM withdrawals w JOIN users u ON w.user_id = u.id ORDER BY w.id DESC").all();
        return jsonResponse({ success: true, funds: funds.results || [], withdrawals: withdrawals.results || [] }, 200, corsHeaders);
      }

      // 9. ADMIN: APPROVE / REJECT DEPOSIT OR WITHDRAWAL
      if (path === "/api/admin/action" && method === "POST") {
        const { type, id, action } = await request.json();
        if (type === 'fund') {
          const fundReq = await env.DB.prepare("SELECT * FROM add_fund_requests WHERE id = ?").bind(id).first();
          if (fundReq && fundReq.status === 'Pending' && action === 'Approved') {
            await env.DB.prepare("UPDATE users SET sms_wallet = sms_wallet + ? WHERE id = ?").bind(fundReq.amount, fundReq.user_id).run();
          }
          await env.DB.prepare("UPDATE add_fund_requests SET status = ? WHERE id = ?").bind(action, id).run();
        } else if (type === 'withdrawal') {
          const drawReq = await env.DB.prepare("SELECT * FROM withdrawals WHERE id = ?").bind(id).first();
          if (drawReq && drawReq.status === 'Pending' && action === 'Rejected') {
            await env.DB.prepare("UPDATE users SET earning_wallet = earning_wallet + ? WHERE id = ?").bind(drawReq.amount, drawReq.user_id).run();
          }
          await env.DB.prepare("UPDATE withdrawals SET status = ? WHERE id = ?").bind(action, id).run();
        }
        return jsonResponse({ success: true }, 200, corsHeaders);
      }

      // 10. ADMIN: GET ALL USERS LIST
      if (path === "/api/admin/users" && method === "GET") {
        const users = await env.DB.prepare("SELECT * FROM users ORDER BY id DESC").all();
        return jsonResponse({ success: true, users: users.results || [] }, 200, corsHeaders);
      }

      // 11. ADMIN: FULL USER UPDATE
      if (path === "/api/admin/user/update" && method === "POST") {
        const body = await request.json();
        await env.DB.prepare(`
          UPDATE users 
          SET name = ?, mobile = ?, password = ?, role = ?, 
              sms_wallet = ?, earning_wallet = ?, bonus_wallet = ?, 
              pan_no = ?, bank_details = ? 
          WHERE id = ?
        `).bind(
          body.name, body.mobile, body.password, body.role,
          body.sms_wallet, body.earning_wallet, body.bonus_wallet,
          body.pan_no, body.bank_details,
          body.userId
        ).run();
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
