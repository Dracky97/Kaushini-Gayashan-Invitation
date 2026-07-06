# Google Sheets RSVP Integration Setup Guide

This guide will help you set up your wedding RSVP form to automatically save responses to a Google Spreadsheet.

## Overview

The RSVP form will send data to Google Sheets using Google Apps Script. Each submission will be recorded with:
- Timestamp
- Guest Name
- Email Address
- Attending Status (Yes/No)
- Number of Guests
- Message for the Couple
- IP Address (for tracking)

## Step-by-Step Setup

### 1. Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Wedding RSVP Responses"
4. Keep this tab open - you'll need it in the next steps

### 2. Set Up Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. Copy the entire contents of the [`google-apps-script/Code.gs`](google-apps-script/Code.gs) file
4. Paste it into the Apps Script editor
5. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
6. Name your project (e.g., "Wedding RSVP Handler")

### 3. Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "RSVP Form Handler" (or any description)
   - **Execute as**: Select **Me** (your Google account)
   - **Who has access**: Select **Anyone**
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. **IMPORTANT**: Copy the **Web app URL** that appears
   - It will look like: `https://script.google.com/macros/s/AKfycbz.../exec`
   - Save this URL - you'll need it in the next step

### 4. Configure Your Website

1. Open the [`.env`](.env) file in your project root
2. Replace `YOUR_DEPLOYMENT_ID` with your actual Web App URL:
   ```
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ACTUAL_DEPLOYMENT_ID/exec
   ```
3. Save the file

### 5. Test the Integration

#### Option A: Test in Apps Script (Recommended First)

1. In the Apps Script editor, select the `testRSVP` function from the dropdown
2. Click the **Run** button (▶️)
3. Check your Google Sheet - you should see a test entry appear

#### Option B: Test with Your Website

1. Restart your development server if it's running:
   ```bash
   npm run dev
   ```
2. Navigate to the RSVP section on your website
3. Fill out the form and submit
4. Check your Google Sheet - the response should appear within a few seconds

### 6. View Your Responses

1. Go back to your Google Sheet
2. You should see a new sheet tab called "RSVP Responses"
3. All form submissions will appear here with:
   - Formatted headers
   - Timestamp for each submission
   - All guest information

## Troubleshooting

### Form submits but data doesn't appear in Google Sheets

1. **Check the Web App URL**: Make sure you copied the complete URL including `/exec` at the end
2. **Verify deployment settings**: 
   - Execute as: **Me**
   - Who has access: **Anyone**
3. **Check Apps Script logs**:
   - Go to Apps Script editor
   - Click **Executions** (clock icon on left sidebar)
   - Look for any errors

### "Authorization required" error

1. Redeploy the script:
   - Go to **Deploy** → **Manage deployments**
   - Click the pencil icon (✏️) to edit
   - Click **Deploy**
2. Make sure you authorized the script to access your Google Sheets

### Form shows success but you want to verify it's working

1. Open your browser's Developer Console (F12)
2. Go to the **Console** tab
3. Submit the form
4. Look for any error messages
5. If you see a warning about "Google Sheets URL not configured", check your `.env` file

### Changes to .env file not taking effect

1. Stop your development server (Ctrl+C)
2. Restart it: `npm run dev`
3. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

## Customization

### Change the Sheet Name

In [`google-apps-script/Code.gs`](google-apps-script/Code.gs:15), modify:
```javascript
const SHEET_NAME = 'RSVP Responses';
```

### Add More Fields

1. Update the form in [`src/components/wedding/RSVPSection.tsx`](src/components/wedding/RSVPSection.tsx)
2. Update the `rowData` array in [`google-apps-script/Code.gs`](google-apps-script/Code.gs:60) to include new fields
3. Update the headers in [`google-apps-script/Code.gs`](google-apps-script/Code.gs:24)

### Email Notifications

To receive email notifications for each RSVP, add this to your Apps Script after line 73:

```javascript
// Send email notification
MailApp.sendEmail({
  to: 'your-email@example.com',
  subject: 'New Wedding RSVP from ' + data.name,
  body: `
    New RSVP Received!
    
    Name: ${data.name}
    Email: ${data.email}
    Attending: ${data.attending}
    Guests: ${data.attending === 'yes' ? data.guests : 'N/A'}
    Message: ${data.message || 'No message'}
    
    Time: ${timestamp}
  `
});
```

## Security Notes

- The Web App URL is public but only accepts POST requests with valid data
- The script validates required fields before saving
- IP addresses are logged for basic tracking
- Consider adding rate limiting if you expect high traffic
- Never commit your actual `.env` file to version control (it's in `.gitignore`)

## Data Management

### Export Responses

1. In Google Sheets, click **File** → **Download**
2. Choose your preferred format (Excel, CSV, PDF, etc.)

### Backup Your Data

Google Sheets automatically saves and versions your data, but you can:
1. Make a copy: **File** → **Make a copy**
2. Set up automatic backups using Google Takeout

### Clear Test Data

1. Select the rows you want to delete (don't delete the header row!)
2. Right-click → **Delete rows**

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the Apps Script execution logs
3. Verify your `.env` configuration
4. Check browser console for errors

## Files Reference

- [`google-apps-script/Code.gs`](google-apps-script/Code.gs) - Google Apps Script backend
- [`src/components/wedding/RSVPSection.tsx`](src/components/wedding/RSVPSection.tsx) - RSVP form component
- [`.env`](.env) - Environment configuration (not committed to git)
- [`.env.example`](.env.example) - Example environment configuration

---

**Congratulations!** Your RSVP form is now connected to Google Sheets. All responses will be automatically saved and organized for you.
