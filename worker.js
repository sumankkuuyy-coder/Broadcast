export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 1. REGISTER
      if (path === "/api/register" && request.method === "POST") {
        const { name, mobile, password } = await request.json();
        if (!name || !mobile || !password) {
          return Response.json({ error: "All fields are required" }, { status: 400, headers: corsHeaders });
        }

        const existing = await env.DB.prepare("SELECT * FROM users WHERE mobile = ?").bind(mobile).first();
        if (existing) {
          return Response.json({ error: "Mobile number already registered" }, { status: 400, headers: corsHeaders });
        }

        await env.DB.prepare(
          "INSERT INTO users (name, mobile, password, sms_wallet, earning_wallet, role) VALUES (?, ?, ?, 0.0, 0.0, 'user')"
        ).bind(name, mobile, password).run();

        return Response.json({ success: true, message: "Registered successfully" }, { headers: corsHeaders });
      }

      // 2. LOGIN
      if (path === "/api/login" && request.method === "POST") {
        const { mobile, password } = await request.json();
        const user = await env.DB.prepare("SELECT * FROM users WHERE mobile = ? AND password = ?").bind(mobile, password).first();
        
        if (!user) {
          return Response.json({ error: "Invalid mobile number or password" }, { status: 401, headers: corsHeaders });
        }

        return Response.json({ success: true, user }, { headers: corsHeaders });
      }

      // 3. GET USER DATA & HISTORY
      if (path === "/api/user-data" && request.method === "GET") {
        const userId = url.searchParams.get("user_id");
        const user = await env.DB.prepare("SELECT id, name, mobile, sms_wallet, earning_wallet, role FROM users WHERE id = ?").bind(userId).first();
        const smsLogs = await env.DB.prepare("SELECT * FROM sms_logs WHERE user_id = ? ORDER BY id DESC LIMIT 50").bind(userId).all();
        const addFundReqs = await env.DB.prepare("SELECT * FROM add_fund_requests WHERE user_id = ? ORDER BY id DESC").bind(userId).all();
        const withdrawals = await env.DB.prepare("SELECT * FROM withdrawals WHERE user_id = ? ORDER BY id DESC").bind(userId).all();

        return Response.json({ success: true, user, smsLogs: smsLogs.results, addFundReqs: addFundReqs.results, withdrawals: withdrawals.results }, { headers: corsHeaders });
      }

      // 4. ADD FUND REQUEST
      if (path === "/api/add-fund" && request.method === "POST") {
        const { user_id, amount, utr_number } = await request.json();
        if (amount < 500 || amount > 2000) {
          return Response.json({ error: "Amount must be between ₹500 and ₹2,000" }, { status: 400, headers: corsHeaders });
        }

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

        await env.DB.prepare(
          "INSERT INTO add_fund_requests (user_id, amount, utr_number, status, expires_at) VALUES (?, ?, ?, 'Pending', ?)"
        ).bind(user_id, amount, utr_number, expiresAt).run();

        return Response.json({ success: true, message: "Add fund request submitted successfully" }, { headers: corsHeaders });
      }

      // 5. SEND SMS SIMULATION
      if (path === "/api/send-sms" && request.method === "POST") {
        const { user_id, masked_number, message_text } = await request.json();
        
        const user = await env.DB.prepare("SELECT sms_wallet FROM users WHERE id = ?").bind(user_id).first();
        if (!user || user.sms_wallet < 0.50) {
          return Response.json({ error: "Insufficient SMS Wallet balance. Please add funds." }, { status: 400, headers: corsHeaders });
        }

        await env.DB.prepare("UPDATE users SET sms_wallet = sms_wallet - 0.50, earning_wallet = earning_wallet + 2.50 WHERE id = ?").bind(user_id).run();

        await env.DB.prepare(
          "INSERT INTO sms_logs (user_id, recipient_number, message_text, status) VALUES (?, ?, ?, 'Sent')"
        ).bind(user_id, masked_number, message_text).run();

        return Response.json({ success: true, message: "SMS Sent successfully!" }, { headers: corsHeaders });
      }

      // 6. WITHDRAWAL REQUEST
      if (path === "/api/withdraw" && request.method === "POST") {
        const { user_id, amount, payment_info } = await request.json();
        if (amount < 5000 || amount > 30000) {
          return Response.json({ error: "Withdrawal amount must be between ₹5,000 and ₹30,000" }, { status: 400, headers: corsHeaders });
        }

        const today = new Date().toISOString().split('T')[0];
        const existingReq = await env.DB.prepare(
          "SELECT * FROM withdrawals WHERE user_id = ? AND DATE(created_at) = ?"
        ).bind(user_id, today).first();

        if (existingReq) {
          return Response.json({ error: "You can only make 1 withdrawal request per day." }, { status: 400, headers: corsHeaders });
        }

        const user = await env.DB.prepare("SELECT earning_wallet FROM users WHERE id = ?").bind(user_id).first();
        if (!user || user.earning_wallet < amount) {
          return Response.json({ error: "Insufficient Earning Wallet balance." }, { status: 400, headers: corsHeaders });
        }

        await env.DB.prepare("UPDATE users SET earning_wallet = earning_wallet - ? WHERE id = ?").bind(amount, user_id).run();
        await env.DB.prepare(
          "INSERT INTO withdrawals (user_id, amount, payment_info, status) VALUES (?, ?, ?, 'Pending')"
        ).bind(user_id, amount, payment_info).run();

        return Response.json({ success: true, message: "Withdrawal request submitted successfully!" }, { headers: corsHeaders });
      }

      // 7. ADMIN: GET ALL REQUESTS
      if (path === "/api/admin/data" && request.method === "GET") {
        const fundReqs = await env.DB.prepare("SELECT a.*, u.name, u.mobile FROM add_fund_requests a JOIN users u ON a.user_id = u.id ORDER BY a.id DESC").all();
        const withdrawals = await env.DB.prepare("SELECT w.*, u.name, u.mobile FROM withdrawals w JOIN users u ON w.user_id = u.id ORDER BY w.id DESC").all();
        return Response.json({ success: true, fundReqs: fundReqs.results, withdrawals: withdrawals.results }, { headers: corsHeaders });
      }

      // 8. ADMIN: APPROVE/DECLINE WITH SHORT REASON
      if (path === "/api/admin/action" && request.method === "POST") {
        const { type, id, action, reason } = await request.json();

        if (type === 'fund') {
          const req = await env.DB.prepare("SELECT * FROM add_fund_requests WHERE id = ?").bind(id).first();
          if (!req || req.status !== 'Pending') return Response.json({ error: "Invalid request" }, { status: 400, headers: corsHeaders });

          if (action === 'approve') {
            await env.DB.prepare("UPDATE add_fund_requests SET status = 'Approved', reason = NULL WHERE id = ?").bind(id).run();
            await env.DB.prepare("UPDATE users SET sms_wallet = sms_wallet + ? WHERE id = ?").bind(req.amount, req.user_id).run();
          } else {
            await env.DB.prepare("UPDATE add_fund_requests SET status = 'Declined', reason = ? WHERE id = ?").bind(reason || 'Invalid UTR', id).run();
          }
        } else if (type === 'withdraw') {
          const req = await env.DB.prepare("SELECT * FROM withdrawals WHERE id = ?").bind(id).first();
          if (!req || req.status !== 'Pending') return Response.json({ error: "Invalid request" }, { status: 400, headers: corsHeaders });

          if (action === 'approve') {
            await env.DB.prepare("UPDATE withdrawals SET status = 'Approved', reason = NULL WHERE id = ?").bind(id).run();
          } else {
            await env.DB.prepare("UPDATE withdrawals SET status = 'Rejected', reason = ? WHERE id = ?").bind(reason || 'Rejected by Admin', id).run();
            await env.DB.prepare("UPDATE users SET earning_wallet = earning_wallet + ? WHERE id = ?").bind(req.amount, req.user_id).run();
          }
        }

        return Response.json({ success: true, message: "Action updated successfully" }, { headers: corsHeaders });
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders });
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
    }
  }
};
