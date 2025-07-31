# Facebook Pixel Setup Guide

## What you need:
1. **Facebook Pixel ID** (you have this)
2. **Environment variable setup**
3. **Event tracking configuration**

## Step 1: Set up your Pixel ID

Create a `.env.local` file in your project root and add your Facebook Pixel ID:

```bash
# .env.local
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_actual_pixel_id_here
```

Replace `your_actual_pixel_id_here` with your actual Facebook Pixel ID.

## Step 2: Verify Implementation

The Facebook Pixel is now implemented with the following features:

### Automatic Tracking:
- ✅ **Page Views** - Tracks when users visit your pages
- ✅ **Form Submissions** - Tracks when users submit the consultation form
- ✅ **Button Clicks** - Tracks CTA button interactions
- ✅ **Video Interactions** - Tracks video play/pause/unmute actions
- ✅ **Scroll Depth** - Tracks how far users scroll (25%, 50%, 75%)

### Events Being Tracked:

1. **PageView** - Automatic on page load
2. **Lead** - When form is submitted (with value: 15,000 CZK)
3. **CustomEvent** - For button clicks, video interactions, and scroll depth

## Step 3: Test Your Implementation

1. **Install Facebook Pixel Helper** (Chrome extension)
2. **Visit your website** and check that the pixel is firing
3. **Test form submission** to ensure Lead events are tracked
4. **Test video interactions** to ensure video events are tracked

## Step 4: Verify in Facebook Events Manager

1. Go to Facebook Events Manager
2. Select your Pixel
3. Check "Test Events" to see real-time events
4. Verify that events are being received

## Customization Options

### Add More Events

You can add more tracking by importing the tracking functions:

```typescript
import { trackEvent, trackButtonClick } from '@/lib/facebook-pixel'

// Track custom events
trackEvent('Purchase', {
  value: 15000,
  currency: 'CZK',
  content_ids: ['consultation_package']
})

// Track button clicks
trackButtonClick('custom_button_name')
```

### Available Tracking Functions:

- `trackEvent(eventName, parameters)` - Track any custom event
- `trackFormSubmission(formData)` - Track form submissions
- `trackButtonClick(buttonName)` - Track button clicks
- `trackVideoInteraction(action)` - Track video interactions
- `trackScrollDepth(depth)` - Track scroll depth
- `trackPageView()` - Track page views

## Troubleshooting

### Pixel Not Loading:
1. Check that your Pixel ID is correct in `.env.local`
2. Ensure the environment variable starts with `NEXT_PUBLIC_`
3. Restart your development server

### Events Not Tracking:
1. Check browser console for errors
2. Verify Facebook Pixel Helper shows the pixel is active
3. Check that events appear in Facebook Events Manager

### Common Issues:
- **Pixel ID not found**: Make sure `.env.local` exists and has the correct Pixel ID
- **Events not firing**: Check that the pixel is initialized before tracking events
- **Duplicate events**: The implementation includes safeguards to prevent duplicate tracking

## Next Steps

1. **Replace the Pixel ID** in `.env.local` with your actual ID
2. **Test the implementation** using Facebook Pixel Helper
3. **Set up conversion tracking** in Facebook Ads Manager
4. **Create custom audiences** based on the tracked events

## Files Modified:

- `lib/facebook-pixel.ts` - Main pixel implementation
- `components/facebook-pixel.tsx` - React component for initialization
- `app/layout.tsx` - Added pixel component to layout
- `app/page.tsx` - Added event tracking to user interactions

The implementation is now complete and ready for your Facebook Pixel ID! 