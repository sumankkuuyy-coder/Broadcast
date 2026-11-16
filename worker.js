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
      // 1. REGISTER API
      if (path === "/api/register" && method === "POST") {
        const { name, mobile, password } = await request.json();
        if (!name || !mobile || !password) {
          return jsonResponse({ error: "All fields are required" }, 400, corsHeaders);
        }

        const existing = await env.DB.prepare("SELECT id FROM users WHERE mobile = ?").bind(mobile).first();
        if (existing) {
          return jsonResponse({ error: "Mobile number already registered" }, 400, corsHeaders);
        }

        await env.DB.prepare(
          "INSERT INTO users (name, mobile, password, sms_wallet, earning_wallet, bonus_wallet, role) VALUES (?, ?, ?, 100.0, 0.0, 100.0, 'user')"
        ).bind(name, mobile, password).run();

        return jsonResponse({ success: true, message: "Registration successful" }, 200, corsHeaders);
      }

      // 2. LOGIN API
      if (path === "/api/login" && method === "POST") {
        const { mobile, password } = await request.json();
        const user = await env.DB.prepare("SELECT * FROM users WHERE mobile = ? AND password = ?").bind(mobile, password).first();

        if (!user) {
          return jsonResponse({ error: "Invalid mobile number or password" }, 401, corsHeaders);
        }

        return jsonResponse({ success: true, user }, 200, corsHeaders);
      }

      // 3. COMPLETE SMS TASK API
      if (path === "/api/task/complete" && method === "POST") {
        const { userId } = await request.json();
        const user = await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(userId).first();

        if (!user) {
          return jsonResponse({ error: "User not found" }, 404, corsHeaders);
        }

        let smsWallet = user.sms_wallet;
        let bonusWallet = user.bonus_wallet;
        let earningWallet = user.earning_wallet;
        const cost = 0.50;
        const reward = 1.50;

        if (smsWallet >= cost) {
          smsWallet -= cost;
        } else if (bonusWallet >= cost) {
          bonusWallet -= cost;
        } else {
          return jsonResponse({ error: "Insufficient balance. Please add funds." }, 400, corsHeaders);
        }

        earningWallet += reward;

        await env.DB.prepare(
          "UPDATE users SET sms_wallet = ?, bonus_wallet = ?, earning_wallet = ? WHERE id = ?"
        ).bind(smsWallet, bonusWallet, earningWallet, userId).run();

        await env.DB.prepare(
          "INSERT INTO sms_logs (user_id, recipient_number, message_text, status) VALUES (?, ?, ?, ?)"
        ).bind(userId, "+9198XXXXXX10", "Amazon Diwali Mega Sale! Flat 50% cashback.", "Sent").run();

        return jsonResponse({ success: true, sms_wallet: smsWallet, bonus_wallet: bonusWallet, earning_wallet: earningWallet }, 200, corsHeaders);
      }

      // 4. ADD FUND REQUEST API
      if (path === "/api/fund/add" && method === "POST") {
        const { userId, amount, utr } = await request.json();
        if (!amount || amount < 500 || amount > 2000) {
          return jsonResponse({ error: "Amount must be between ₹500 and ₹2000" }, 400, corsHeaders);
        }

        await env.DB.prepare(
          "INSERT INTO add_fund_requests (user_id, amount, utr_number, status) VALUES (?, ?, ?, 'Pending')"
        ).bind(userId, amount, utr).run();

        return jsonResponse({ success: true, message: "Fund request submitted successfully" }, 200, corsHeaders);
      }

      // 5. WITHDRAWAL REQUEST API
      if (path === "/api/withdrawal/request" && method === "POST") {
        const { userId, amount, paymentInfo } = await request.json();
        if (!amount || amount < 5000 || amount > 50000) {
          return jsonResponse({ error: "Withdrawal limit is ₹5,000 to ₹50,000" }, 400, corsHeaders);
        }

        const user = await env.DB.prepare("SELECT earning_wallet FROM users WHERE id = ?").bind(userId).first();
        if (!user || user.earning_wallet < amount) {
          return jsonResponse({ error: "Insufficient earning wallet balance" }, 400, corsHeaders);
        }

        const newEarning = user.earning_wallet - amount;
        await env.DB.prepare("UPDATE users SET earning_wallet = ? WHERE id = ?").bind(newEarning, userId).run();

        await env.DB.prepare(
          "INSERT INTO withdrawals (user_id, amount, payment_info, status) VALUES (?, ?, ?, 'Pending')"
        ).bind(userId, amount, paymentInfo).run();

        return jsonResponse({ success: true, new_earning: newEarning, message: "Withdrawal requested successfully" }, 200, corsHeaders);
      }

      // 6. HISTORY API
      if (path === "/api/history" && method === "GET") {
        const userId = url.searchParams.get("userId");
        if (!userId) {
          return jsonResponse({ error: "User ID required" }, 400, corsHeaders);
        }

        const smsLogs = await env.DB.prepare("SELECT * FROM sms_logs WHERE user_id = ? ORDER BY id DESC").bind(userId).all();
        const fundRequests = await env.DB.prepare("SELECT * FROM add_fund_requests WHERE user_id = ? ORDER BY id DESC").bind(userId).all();
        const withdrawals = await env.DB.prepare("SELECT * FROM withdrawals WHERE user_id = ? ORDER BY id DESC").bind(userId).all();

        return jsonResponse({
          success: true,
          smsLogs: smsLogs.results || [],
          fundRequests: fundRequests.results || [],
          withdrawals: withdrawals.results || []
        }, 200, corsHeaders);
      }

      // 7. STEP-BY-STEP KYC UPDATE API
      if (path === "/api/kyc/update" && method === "POST") {
        const body = await request.json();
        const { userId, step } = body;

        if (step === 'aadhaar') {
          await env.DB.prepare("UPDATE users SET aadhaar_no = ? WHERE id = ?").bind(body.aadhaar, userId).run();
        } else if (step === 'pan') {
          await env.DB.prepare("UPDATE users SET pan_no = ? WHERE id = ?").bind(body.pan, userId).run();
        } else if (step === 'bank') {
          await env.DB.prepare(
            "UPDATE users SET bank_acc = ?, bank_ifsc = ?, bank_holder = ? WHERE id = ?"
          ).bind(body.bank_acc, body.bank_ifsc, body.bank_holder, userId).run();
        }

        return jsonResponse({ success: true, message: "KYC updated successfully" }, 200, corsHeaders);
      }

      // 8. UPDATE PROFILE & PHOTO API
      if (path === "/api/profile/update" && method === "POST") {
        const { userId, name, mobile, password, profile_pic } = await request.json();
        
        if (password && password.trim() !== "") {
          await env.DB.prepare(
            "UPDATE users SET name = ?, mobile = ?, password = ?, profile_pic = ? WHERE id = ?"
          ).bind(name, mobile, password, profile_pic, userId).run();
        } else {
          await env.DB.prepare(
            "UPDATE users SET name = ?, mobile = ?, profile_pic = ? WHERE id = ?"
          ).bind(name, mobile, profile_pic, userId).run();
        }

        return jsonResponse({ success: true, message: "Profile updated successfully" }, 200, corsHeaders);
      }

      // 9. ADMIN: FETCH ALL PENDING REQUESTS
      if (path === "/api/admin/requests" && method === "GET") {
        const funds = await env.DB.prepare("SELECT a.*, u.name, u.mobile FROM add_fund_requests a JOIN users u ON a.user_id = u.id ORDER BY a.id DESC").all();
        const withdrawals = await env.DB.prepare("SELECT w.*, u.name, u.mobile FROM withdrawals w JOIN users u ON w.user_id = u.id ORDER BY w.id DESC").all();

        return jsonResponse({
          success: true,
          funds: funds.results || [],
          withdrawals: withdrawals.results || []
        }, 200, corsHeaders);
      }

      // 10. ADMIN: APPROVE / REJECT ACTION
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

        return jsonResponse({ success: true, message: `Request ${action}` }, 200, corsHeaders);
      }

      // Default: Serve static assets
      return env.ASSETS.fetch(request);

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
