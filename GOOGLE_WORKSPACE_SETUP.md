# Google Workspace/Gmail SMTP Setup for Contact Form

This document explains how to set up Gmail or Google Workspace SMTP for the contact form email functionality.

## Prerequisites

1. Google Account or Google Workspace account
2. Access to Google Account Security settings
3. 2-Factor Authentication enabled (required for App Passwords)

## Step 1: Enable 2-Factor Authentication

App Passwords require 2-Factor Authentication to be enabled on your Google account.

### For Personal Gmail:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", select "2-Step Verification"
3. Follow the setup process if not already enabled

### For Google Workspace:
1. Go to [Google Admin Console](https://admin.google.com) (if you're an admin)
2. Or ask your admin to enable 2FA for your account
3. Individual users can enable 2FA at [myaccount.google.com/security](https://myaccount.google.com/security)

## Step 2: Generate App Password

App Passwords allow less secure apps to access your Gmail account safely.

### Steps:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", select "App passwords"
   - If you don't see this option, make sure 2FA is enabled
3. Click "Select app" and choose "Mail"
4. Click "Select device" and choose "Other (custom name)"
5. Enter a name like "IAM Home Health Contact Form"
6. Click "Generate"
7. **Save the 16-character password** - you won't be able to see it again
8. Click "Done"

## Step 3: Configure Environment Variables

### 3.1 Local Development
Create `.env.local` file in your project root:

```env
# Gmail/Google Workspace Configuration
GMAIL_USER=contact@iamhomehealth.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop

# Email Configuration (where to send form submissions)
CONTACT_EMAIL=contact@iamhomehealth.com
```

**Important Notes:**
- `GMAIL_USER`: Your actual Gmail or Google Workspace email address
- `GMAIL_APP_PASSWORD`: The 16-character app password (with or without spaces)
- `CONTACT_EMAIL`: Where you want to receive contact form submissions (can be same as GMAIL_USER)

### 3.2 Netlify Deployment
1. Go to your [Netlify dashboard](https://app.netlify.com)
2. Select your site
3. Go to "Site settings" → "Environment variables"
4. Add the following variables:
   - `GMAIL_USER`: contact@iamhomehealth.com
   - `GMAIL_APP_PASSWORD`: your-16-character-app-password
   - `CONTACT_EMAIL`: contact@iamhomehealth.com

## Step 4: Test the Setup

### 4.1 Development Testing
1. Make sure your `.env.local` file is configured
2. Run `npm run dev`
3. Go to your contact form
4. Fill out and submit the form
5. Check your email for the contact form submission

### 4.2 Production Testing
1. Deploy to Netlify with environment variables set
2. Test the contact form on your live site
3. Verify emails are being received

## Step 5: Email Configuration Options

### Option 1: Send from your main email address
```env
GMAIL_USER=contact@iamhomehealth.com
CONTACT_EMAIL=contact@iamhomehealth.com
```
- Form submissions will be sent from and to the same address
- Simple setup, good for small businesses

### Option 2: Use a dedicated sending address
```env
GMAIL_USER=noreply@iamhomehealth.com
CONTACT_EMAIL=contact@iamhomehealth.com
```
- Create a separate email for sending (requires additional Google Workspace user)
- Form submissions sent from noreply@ to contact@
- Better for larger organizations

### Option 3: Forward to multiple addresses
```env
GMAIL_USER=contact@iamhomehealth.com
CONTACT_EMAIL=contact@iamhomehealth.com
```
- Set up email forwarding in Gmail to send to multiple recipients
- Or modify the code to send to multiple addresses

## Troubleshooting

### Common Issues

1. **"Invalid login" error**
   - Double-check your GMAIL_USER email address
   - Verify the App Password is correct (16 characters)
   - Make sure 2FA is enabled on your Google account

2. **"Username and Password not accepted"**
   - You might be using your regular password instead of an App Password
   - Generate a new App Password and try again

3. **Connection timeout**
   - Gmail SMTP might be blocked by your network
   - Try a different network or contact your ISP

4. **App Password option not available**
   - 2-Factor Authentication must be enabled first
   - Some Google Workspace admins disable App Passwords

### Testing SMTP Connection

You can test your SMTP settings locally:

```javascript
// Create a test file: test-email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@domain.com',
    pass: 'your-app-password',
  },
});

transporter.sendMail({
  from: 'your-email@domain.com',
  to: 'your-email@domain.com',
  subject: 'Test Email',
  text: 'This is a test email.',
}, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
```

Run with: `node test-email.js`

## Security Best Practices

1. **Use App Passwords** - Never use your actual Gmail password
2. **Rotate App Passwords** - Generate new ones periodically
3. **Limit App Password Names** - Use descriptive names for easy management
4. **Monitor Access** - Check Google Account activity regularly
5. **Revoke Unused Passwords** - Remove App Passwords for old projects

## Google Workspace Specific Notes

### For Workspace Admins:
1. **SMTP Authentication** might need to be enabled in Admin Console
2. **Less Secure App Access** settings may need adjustment
3. **2FA enforcement** can be set organization-wide

### For Workspace Users:
1. Check with your admin if SMTP is allowed
2. Some organizations restrict App Password generation
3. Your admin may need to enable external SMTP access

## Rate Limits

Gmail SMTP has the following limits:
- **Personal Gmail**: 500 emails per day
- **Google Workspace**: 2,000 emails per day (varies by plan)
- **Rate limiting**: ~1 email per second

For higher volumes, consider:
- Google Workspace Business plans (higher limits)
- Professional email services (SendGrid, Mailgun)
- Multiple Gmail accounts with load balancing

## Cost Considerations

- **Personal Gmail**: Free (with daily limits)
- **Google Workspace**: Starting at $6/user/month
- **No additional SMTP fees**: Unlike AWS SES, no per-email charges
- **Higher volume needs**: May require Business/Enterprise plans

## Alternative Setup: OAuth2 (Advanced)

For production applications with high volume, consider OAuth2 instead of App Passwords:

1. More secure than App Passwords
2. Doesn't require 2FA bypass
3. More complex setup
4. Better for applications with many users

## Support Resources

- [Google Workspace Support](https://support.google.com/a/)
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)
- [App Passwords Help](https://support.google.com/accounts/answer/185833)
- [Nodemailer Documentation](https://nodemailer.com/usage/using-gmail/)

## Monitoring and Maintenance

1. **Check email delivery** regularly
2. **Monitor bounce rates** in Gmail
3. **Update App Passwords** if they expire
4. **Review security alerts** from Google
5. **Test after Google updates** (rare but possible)