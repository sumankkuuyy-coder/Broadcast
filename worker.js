const USER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>BSNL Portal & Wallet</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-gray-100 min-h-screen text-gray-800 flex flex-col items-center p-3 sm:p-4 justify-center">

    <!-- AUTH CONTAINER (TOGGLE + FORMS) -->
    <div id="auth-container" class="w-full max-w-sm space-y-4 my-auto">
        <!-- LOGO HEADER -->
        <div class="text-center bg-white p-5 rounded-2xl shadow-xl border border-gray-100 space-y-3">
            <div class="flex justify-center">
                <img src="https://i.ibb.co/C5VBSGcV/BSNL-New-Logo.png" alt="BSNL Logo" class="h-14 object-contain">
            </div>
            <h1 class="text-sm font-bold text-gray-700 tracking-wide uppercase">BSNL Portal & Wallet</h1>
            
            <!-- TOGGLE SWITCH -->
            <div class="bg-gray-100 p-1 rounded-xl flex relative mt-3 border border-gray-200">
                <div id="toggle-bg" class="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-emerald-600 rounded-lg transition-all duration-300 shadow-sm left-1"></div>
                <button onclick="switchTab('login')" id="btn-tab-login" class="flex-1 py-2 text-xs font-bold relative z-10 text-white transition-colors">Login</button>
                <button onclick="switchTab('register')" id="btn-tab-register" class="flex-1 py-2 text-xs font-bold relative z-10 text-gray-600 transition-colors">Register</button>
            </div>
        </div>

        <!-- LOGIN FORM BOX -->
        <div id="login-box" class="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl">
            <form onsubmit="handleLogin(event)" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Mobile Number</label>
                    <input type="tel" id="login-mobile" required placeholder="Enter mobile" class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Password</label>
                    <input type="password" id="login-password" required placeholder="Enter password" class="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500">
                </div>
                <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all">Login to Account</button>
            </form>
        </div>

        <!-- REGISTER FORM BOX -->
        <div id="register-box" class="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl hidden">
            <form onsubmit="handleRegister(event)" class="space-y-3">
                <div>
                    <label class="block text-[11px] font-bold uppercase text-gray-500 mb-1">Full Name</label>
                    <input type="text" id="reg-name" required placeholder="Enter name" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs focus:outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold uppercase text-gray-500 mb-1">Mobile Number</label>
                    <input type="tel" id="reg-mobile" required placeholder="Enter mobile" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono focus:outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold uppercase text-gray-500 mb-1">Password</label>
                    <input type="password" id="reg-password" required placeholder="Create password" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs focus:outline-none focus:border-emerald-500">
                </div>
                <div>
                    <label class="block text-[11px] font-bold uppercase text-gray-500 mb-1">PAN Number</label>
                    <input type="text" id="reg-pan" placeholder="PAN No (Optional)" class="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-mono uppercase focus:outline-none focus:border-emerald-500">
                </div>
                <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md mt-2 transition-all">Register Now</button>
            </form>
        </div>
    </div>

    <!-- USER DASHBOARD -->
    <div id="user-dashboard" class="bg-white border border-gray-200 w-full max-w-xl rounded-2xl shadow-xl hidden flex flex-col min-h-[85vh] my-auto">
        <!-- Dashboard Header with Logo Fixed on Top-Right -->
        <div class="bg-emerald-700 text-white px-4 py-3.5 flex items-center justify-between rounded-t-2xl relative">
            <div>
                <h2 id="user-welcome-name" class="text-sm font-bold">👤 User Dashboard</h2>
                <p class="text-[10px] text-emerald-100 font-mono" id="user-welcome-mobile"></p>
            </div>
            
            <div class="flex items-center space-x-3">
                <button onclick="logout()" class="bg-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold">Logout</button>
                <img src="https://i.ibb.co/C5VBSGcV/BSNL-New-Logo.png" alt="BSNL Logo" class="h-8 bg-white p-1 rounded-lg shadow-sm">
            </div>
        </div>

        <div class="p-4 space-y-4 flex-1 overflow-y-auto">
            <!-- Wallets Grid -->
            <div class="grid grid-cols-3 gap-2">
                <div class="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-center">
                    <p class="text-[10px] uppercase font-bold text-emerald-800">SMS Wallet</p>
                    <p id="val-sms-wallet" class="text-sm font-bold text-emerald-900 mt-1 font-mono">₹0.00</p>
                </div>
                <div class="bg-teal-50 border border-teal-200 p-3 rounded-xl text-center">
                    <p class="text-[10px] uppercase font-bold text-teal-800">Earning</p>
                    <p id="val-earning-wallet" class="text-sm font-bold text-teal-900 mt-1 font-mono">₹0.00</p>
                </div>
                <div class="bg-amber-50 border border-amber-200 p-3 rounded-xl text-center">
                    <p class="text-[10px] uppercase font-bold text-amber-800">Bonus</p>
                    <p id="val-bonus-wallet" class="text-sm font-bold text-amber-900 mt-1 font-mono">₹0.00</p>
                </div>
            </div>

            <!-- Add Fund Section -->
            <div class="bg-gray-50 border p-4 rounded-xl space-y-3">
                <h3 class="text-xs font-bold text-emerald-700 uppercase">💰 Add Funds (SMS Wallet)</h3>
                <button type="button" onclick="openQrModal()" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm">
                    <span>📷 Show QR Code to Pay</span>
                </button>
                <form onsubmit="handleDepositRequest(event)" class="space-y-2.5 pt-2 border-t">
                    <input type="number" step="1" id="dep-amount" required placeholder="Enter Paid Amount (₹)" class="w-full px-3 py-2 bg-white border rounded-xl text-xs font-mono">
                    <input type="text" id="dep-utr" required placeholder="Enter UTR / Transaction ID" class="w-full px-3 py-2 bg-white border rounded-xl text-xs font-mono">
                    <button type="submit" class="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs">Submit Deposit Request</button>
                </form>
            </div>

            <!-- Withdraw Section -->
            <div class="bg-gray-50 border p-4 rounded-xl space-y-3">
                <h3 class="text-xs font-bold text-teal-700 uppercase">💸 Request Withdrawal (Earning Wallet)</h3>
                <form onsubmit="handleWithdrawalRequest(event)" class="space-y-2.5">
                    <input type="number" step="1" id="wit-amount" required placeholder="Enter Amount (₹)" class="w-full px-3 py-2 bg-white border rounded-xl text-xs font-mono">
                    <input type="text" id="wit-bank" required placeholder="Bank Details (Account / IFSC / Holder Name)" class="w-full px-3 py-2 bg-white border rounded-xl text-xs">
                    <button type="submit" class="w-full py-2.5 bg-teal-600 text-white font-bold rounded-xl text-xs">Request Withdrawal</button>
                </form>
            </div>
        </div>
    </div>

    <!-- FULL SCREEN QR MODAL -->
    <div id="qr-modal" class="fixed inset-0 bg-black/90 z-50 hidden flex flex-col items-center justify-center p-4">
        <div class="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl flex flex-col items-center relative space-y-4">
            <button onclick="closeQrModal()" class="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm">✕</button>
            
            <div class="text-center">
                <h3 class="text-base font-bold text-emerald-700">Scan & Pay via Any UPI App</h3>
                <p class="text-[11px] text-gray-500 mt-0.5">Scan QR using GPay, PhonePe, Paytm, etc.</p>
            </div>

            <div class="bg-white p-2 border-2 border-emerald-500 rounded-2xl shadow-inner">
                <img src="https://i.ibb.co/qLGftMvF/IMG-20261116-120334.jpg" alt="Payment QR Code" class="w-64 h-64 object-contain rounded-xl">
            </div>

            <div class="w-full text-center space-y-2">
                <p class="text-[11px] font-bold text-gray-500 uppercase">Supported UPI Apps</p>
                <div class="flex justify-center gap-3 py-1">
                    <span class="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-100">Google Pay</span>
                    <span class="px-2.5 py-1 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-lg border border-purple-100">PhonePe</span>
                    <span class="px-2.5 py-1 bg-sky-50 text-sky-700 text-[10px] font-bold rounded-lg border border-sky-100">Paytm</span>
                    <span class="px-2.5 py-1 bg-orange-50 text-orange-700 text-[10px] font-bold rounded-lg border border-orange-100">BHIM</span>
                </div>
            </div>

            <button onclick="closeQrModal()" class="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md">Done / Enter UTR</button>
        </div>
    </div>

    <script>
        let currentUser = null;

        function switchTab(tab) {
            const toggleBg = document.getElementById('toggle-bg');
            const btnLogin = document.getElementById('btn-tab-login');
            const btnReg = document.getElementById('btn-tab-register');
            const loginBox = document.getElementById('login-box');
            const regBox = document.getElementById('register-box');

            if (tab === 'login') {
                toggleBg.style.transform = 'translateX(0%)';
                btnLogin.classList.add('text-white');
                btnLogin.classList.remove('text-gray-600');
                btnReg.classList.add('text-gray-600');
                btnReg.classList.remove('text-white');
                loginBox.classList.remove('hidden');
                regBox.classList.add('hidden');
            } else {
                toggleBg.style.transform = 'translateX(100%)';
                btnReg.classList.add('text-white');
                btnReg.classList.remove('text-gray-600');
                btnLogin.classList.add('text-gray-600');
                btnLogin.classList.remove('text-white');
                regBox.classList.remove('hidden');
                loginBox.classList.add('hidden');
            }
        }

        function openQrModal() { document.getElementById('qr-modal').classList.remove('hidden'); }
        function closeQrModal() { document.getElementById('qr-modal').classList.add('hidden'); }

        async function handleLogin(e) {
            e.preventDefault();
            const mobile = document.getElementById('login-mobile').value, password = document.getElementById('login-password').value;
            const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile, password }) });
            const data = await res.json();
            if (res.ok) {
                currentUser = data.user;
                setupDashboard();
            } else { alert(data.error || 'Login failed'); }
        }

        async function handleRegister(e) {
            e.preventDefault();
            const payload = {
                name: document.getElementById('reg-name').value,
                mobile: document.getElementById('reg-mobile').value,
                password: document.getElementById('reg-password').value,
                pan_no: document.getElementById('reg-pan').value
            };
            const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const data = await res.json();
            if (res.ok) {
                alert('Registration successful! Please login.');
                switchTab('login');
            } else { alert(data.error || 'Registration failed'); }
        }

        function setupDashboard() {
            document.getElementById('auth-container').classList.add('hidden');
            document.getElementById('user-dashboard').classList.remove('hidden');
            document.getElementById('user-welcome-name').innerText = \`👤 \${currentUser.name}\`;
            document.getElementById('user-welcome-mobile').innerText = \`📱 \${currentUser.mobile}\`;
            updateUserWalletsUI();
        }

        function updateUserWalletsUI() {
            document.getElementById('val-sms-wallet').innerText = \`₹\${currentUser.sms_wallet || 0}\`;
            document.getElementById('val-earning-wallet').innerText = \`₹\${currentUser.earning_wallet || 0}\`;
            document.getElementById('val-bonus-wallet').innerText = \`₹\${currentUser.bonus_wallet || 0}\`;
        }

        async function handleDepositRequest(e) {
            e.preventDefault();
            const amount = document.getElementById('dep-amount').value, utr_number = document.getElementById('dep-utr').value;
            const res = await fetch('/api/user/deposit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: currentUser.id, amount, utr_number }) });
            if (res.ok) { alert('Deposit request submitted successfully!'); document.getElementById('dep-amount').value = ''; document.getElementById('dep-utr').value = ''; }
            else { alert('Error submitting request'); }
        }

        async function handleWithdrawalRequest(e) {
            e.preventDefault();
            const amount = document.getElementById('wit-amount').value, payment_info = document.getElementById('wit-bank').value;
            const res = await fetch('/api/user/withdraw', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: currentUser.id, amount, payment_info }) });
            const data = await res.json();
            if (res.ok) { alert('Withdrawal requested successfully!'); currentUser.earning_wallet = data.new_earning; updateUserWalletsUI(); document.getElementById('wit-amount').value = ''; document.getElementById('wit-bank').value = ''; }
            else { alert(data.error || 'Error requesting withdrawal'); }
        }

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
        const { name, mobile, password, pan_no } = await request.json();
        const existing = await env.DB.prepare("SELECT id FROM users WHERE mobile = ?").bind(mobile).first();
        if (existing) return new Response(JSON.stringify({ error: "Mobile number already registered" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        
        await env.DB.prepare(`
          INSERT INTO users (name, mobile, password, role, sms_wallet, earning_wallet, bonus_wallet, pan_no, bank_details) 
          VALUES (?, ?, ?, 'user', 0.00, 0.00, 0.00, ?, '')
        `).bind(name, mobile, password, pan_no || '').run();
        
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/api/user/deposit" && method === "POST") {
        const { userId, amount, utr_number } = await request.json();
        await env.DB.prepare("INSERT INTO add_fund_requests (user_id, amount, utr_number, status) VALUES (?, ?, ?, 'Pending')").bind(userId, amount, utr_number).run();
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "/api/user/withdraw" && method === "POST") {
        const { userId, amount, payment_info } = await request.json();
        const user = await env.DB.prepare("SELECT earning_wallet FROM users WHERE id = ?").bind(userId).first();
        if (!user || user.earning_wallet < amount) {
          return new Response(JSON.stringify({ error: "Insufficient earning wallet balance" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        await env.DB.prepare("UPDATE users SET earning_wallet = earning_wallet - ? WHERE id = ?").bind(amount, userId).run();
        await env.DB.prepare("INSERT INTO withdrawals (user_id, amount, payment_info, status) VALUES (?, ?, ?, 'Pending')").bind(userId, amount, payment_info).run();
        const updatedUser = await env.DB.prepare("SELECT earning_wallet FROM users WHERE id = ?").bind(userId).first();
        return new Response(JSON.stringify({ success: true, new_earning: updatedUser.earning_wallet }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      
      return new Response(USER_HTML, { status: 200, headers: { ...corsHeaders, "Content-Type": "text/html" } });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
  }
};
