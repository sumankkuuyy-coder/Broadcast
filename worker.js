export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS Headers for smooth communication
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

        // Check if mobile already exists
        const existing = await env.DB.prepare("SELECT id FROM users WHERE mobile = ?").bind(mobile).first();
        if (existing) {
          return jsonResponse({ error: "Mobile number already registered" }, 400, corsHeaders);
        }

        // Insert new user with ₹100 sign-up bonus in sms_wallet & bonus_wallet
        await env.DB.prepare(
          "INSERT INTO users (name, mobile, password, sms_wallet, earning_wallet, bonus_wallet) VALUES (?, ?, ?, 100.0, 0.0, 100.0)"
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

      // 3. COMPLETE SMS TASK API (Deduct ₹0.50 from SMS/Bonus wallet, Add ₹1.50 to Earning wallet)
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

        // Check balance (use sms_wallet first, then bonus_wallet)
        if (smsWallet >= cost) {
          smsWallet -= cost;
        } else if (bonusWallet >= cost) {
          bonusWallet -= cost;
        } else {
          return jsonResponse({ error: "Insufficient balance. Please add funds." }, 400, corsHeaders);
        }

        earningWallet += reward;

        // Update database
        await env.DB.prepare(
          "UPDATE users SET sms_wallet = ?, bonus_wallet = ?, earning_wallet = ? WHERE id = ?"
        ).bind(smsWallet, bonusWallet, earningWallet, userId).run();

        // Log SMS task
        await env.DB.prepare(
          "INSERT INTO sms_logs (user_id, recipient_number, message_text, status) VALUES (?, ?, ?, ?)"
        ).bind(userId, "+919876543210", "Amazon Diwali Special Offer!", "Sent").run();

        return jsonResponse({ success: true, sms_wallet: smsWallet, bonus_wallet: bonusWallet, earning_wallet: earningWallet }, 200, corsHeaders);
      }

      // 4. ADD FUND REQUEST API (UTR Submission)
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

      // 5. WITHDRAWAL REQUEST API (Min ₹5,000, Max ₹50,000)
      if (path === "/api/withdrawal/request" && method === "POST") {
        const { userId, amount, paymentInfo } = await request.json();
        if (!amount || amount < 5000 || amount > 50000) {
          return jsonResponse({ error: "Withdrawal limit is ₹5,000 to ₹50,000" }, 400, corsHeaders);
        }

        const user = await env.DB.prepare("SELECT earning_wallet FROM users WHERE id = ?").bind(userId).first();
        if (!user || user.earning_wallet < amount) {
          return jsonResponse({ error: "Insufficient earning wallet balance" }, 400, corsHeaders);
        }

        // Deduct from earning wallet immediately upon request
        const newEarning = user.earning_wallet - amount;
        await env.DB.prepare("UPDATE users SET earning_wallet = ? WHERE id = ?").bind(newEarning, userId).run();

        await env.DB.prepare(
          "INSERT INTO withdrawals (user_id, amount, payment_info, status) VALUES (?, ?, ?, 'Pending')"
        ).bind(userId, amount, paymentInfo).run();

        return jsonResponse({ success: true, message: "Withdrawal requested successfully" }, 200, corsHeaders);
      }

      // 6. UPDATE PROFILE API
      if (path === "/api/profile/update" && method === "POST") {
        const { userId, name, mobile, password } = await request.json();
        
        if (password && password.trim() !== "") {
          await env.DB.prepare(
            "UPDATE users SET name = ?, mobile = ?, password = ? WHERE id = ?"
          ).bind(name, mobile, password, userId).run();
        } else {
          await env.DB.prepare(
            "UPDATE users SET name = ?, mobile = ? WHERE id = ?"
          ).bind(name, mobile, userId).run();
        }

        return jsonResponse({ success: true, message: "Profile updated successfully" }, 200, corsHeaders);
      }

      // Default: Serve static assets (index.html) via Cloudflare Workers Assets binding
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
