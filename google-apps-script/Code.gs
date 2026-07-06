/**
 * Google Apps Script for Wedding RSVP Form
 * This script receives RSVP data and saves it to a Google Sheet
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet for your RSVPs
 * 2. Go to Extensions > Apps Script
 * 3. Copy this code into the script editor
 * 4. Update the SHEET_NAME variable below if needed
 * 5. Deploy as Web App (Deploy > New deployment)
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Copy the Web App URL and add it to your .env file
 */

// Configuration
const SHEET_NAME = 'RSVP Responses';

/**
 * Creates the RSVP sheet with headers if it doesn't exist
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Add headers
    sheet.getRange(1, 1, 1, 7).setValues([[
      'Timestamp',
      'Name',
      'Contact Number',
      'Attending',
      'Number of Guests',
      'Message',
      'IP Address'
    ]]);
    
    // Format header row
    sheet.getRange(1, 1, 1, 7)
      .setFontWeight('bold')
      .setBackground('#4a5568')
      .setFontColor('#ffffff');
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 7);
  }
  
  return sheet;
}

/**
 * Handles POST requests from the RSVP form
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.phone || !data.attending) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Missing required fields'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get or create the sheet
    const sheet = setupSheet();
    
    // Prepare the row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.name,
      data.phone,
      data.attending,
      data.attending === 'yes' ? (data.guests || '1') : 'N/A',
      data.message || '',
      e.parameter.userip || 'Unknown'
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Format the timestamp cell
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    
    // Send success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'RSVP recorded successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error and return error response
    Logger.log('Error: ' + error.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error processing RSVP: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'Wedding RSVP API is running',
      message: 'Please use POST method to submit RSVP data'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the script works
 */
function testRSVP() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        phone: '+94 77 123 4567',
        attending: 'yes',
        guests: '2',
        message: 'Looking forward to it!'
      })
    },
    parameter: {
      userip: '127.0.0.1'
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
