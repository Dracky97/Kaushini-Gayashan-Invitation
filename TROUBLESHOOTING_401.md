# Fixing the 401 Unauthorized Error

You're seeing a **401 Unauthorized** error when submitting the RSVP form. This is a common issue with Google Apps Script deployments. Here's how to fix it:

## Root Cause

The 401 error occurs when the Google Apps Script Web App doesn't have the correct permissions set. This typically happens when:
1. The deployment is not set to allow "Anyone" to access it
2. The script hasn't been properly authorized
3. The deployment is in draft mode

## Solution: Redeploy with Correct Permissions

### Step 1: Open Your Apps Script

1. Go to your Google Sheet with the RSVP data
2. Click **Extensions** → **Apps Script**

### Step 2: Check Current Deployments

1. Click the **Deploy** button (top right)
2. Click **Manage deployments**
3. You should see your current deployment listed

### Step 3: Create a New Deployment (Recommended)

Instead of editing the existing deployment, create a fresh one:

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure these settings **EXACTLY**:
   - **Description**: "RSVP Handler v2" (or any new description)
   - **Execute as**: **Me (your-email@gmail.com)**
   - **Who has access**: **Anyone** ⚠️ THIS IS CRITICAL

5. Click **Deploy**

### Step 4: Authorize the Script

You'll likely see an authorization screen:

1. Click **Authorize access**
2. Choose your Google account
3. You'll see a warning: "Google hasn't verified this app"
4. Click **Advanced**
5. Click **Go to [Your Project Name] (unsafe)**
6. Review the permissions (it needs access to your spreadsheet)
7. Click **Allow**

### Step 5: Copy the NEW Web App URL

After authorization, you'll see a new Web App URL:
- It will look like: `https://script.google.com/macros/s/AKfycbz.../exec`
- **Copy this entire URL**

### Step 6: Update Your .env File

1. Open the `.env` file in your project
2. Replace the old URL with the new one:
   ```
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_NEW_DEPLOYMENT_ID/exec
   ```
3. Save the file

### Step 7: Restart Your Dev Server

**IMPORTANT**: Environment variables are only loaded when the server starts.

1. Stop your development server (press `Ctrl+C` in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```
3. Hard refresh your browser: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

### Step 8: Test Again

1. Fill out the RSVP form
2. Submit it
3. Open the browser console (F12) to see diagnostic logs
4. Check your Google Sheet for the new entry

## Verification Checklist

Before testing, verify these settings in Apps Script:

- [ ] Deployment type is "Web app"
- [ ] "Execute as" is set to "Me"
- [ ] "Who has access" is set to "Anyone"
- [ ] You completed the authorization flow
- [ ] You copied the complete URL including `/exec`
- [ ] You updated the `.env` file with the new URL
- [ ] You restarted your development server
- [ ] You hard-refreshed your browser

## Still Getting 401?

### Option A: Check the Deployment Status

1. In Apps Script, click **Deploy** → **Manage deployments**
2. Make sure the deployment shows as "Active"
3. If it says "Draft", you need to deploy it properly

### Option B: Test the Script Directly

1. In Apps Script, select the `testRSVP` function from the dropdown
2. Click **Run** (▶️)
3. If this works, the script is fine - the issue is with the deployment
4. If this fails, check the execution log for errors

### Option C: Verify the URL

1. Copy your Web App URL
2. Paste it in a new browser tab
3. You should see: `{"status":"Wedding RSVP API is running","message":"Please use POST method to submit RSVP data"}`
4. If you see an error page, the deployment isn't working

### Option D: Check Browser Console Logs

With the diagnostic logging I added, you should see:

```
🔍 Diagnostic Info:
- Google Sheets URL configured: true
- URL: https://script.google.com/macros/s/...
- Form data: {name: "...", email: "...", ...}
📤 Sending RSVP to Google Sheets...
✅ Response received: Response {type: "opaque", ...}
```

If you see different output, share it for further diagnosis.

## Alternative: Use a Different Google Account

Sometimes organizational Google accounts have restrictions. Try:

1. Create a new Google Sheet with a personal Gmail account
2. Set up the Apps Script there
3. Deploy with that account

## Why "Anyone" is Safe

You might be concerned about setting access to "Anyone". Here's why it's safe:

- The script only accepts POST requests with specific data
- It validates all required fields
- It only writes to your specific spreadsheet
- No one can read your data through this endpoint
- The URL is not easily guessable
- You can revoke access anytime by deleting the deployment

## Need More Help?

If you're still stuck, check the console output and share:
1. The diagnostic logs from the browser console
2. Any errors from the Apps Script execution log
3. The deployment settings screenshot

---

**Next Step**: After fixing the 401 error, test the form again. You should see the RSVP appear in your Google Sheet within seconds.
