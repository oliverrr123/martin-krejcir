declare global {
  interface Window {
    fbq: any;
  }
}

// Facebook Pixel ID
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

// Initialize Facebook Pixel
export const initFacebookPixel = () => {
  if (typeof window === 'undefined') return;

  // Facebook Pixel base code
  (function (f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js',
    undefined,
    undefined,
    undefined
  );

  // Initialize the pixel
  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window === 'undefined' || !window.fbq) return;
  
  window.fbq('track', eventName, parameters);
};

// Track form submission
export const trackFormSubmission = (formData: any) => {
  trackEvent('Lead', {
    content_name: 'Consultation Form',
    content_category: 'Business Consultation',
    value: 15000, // Price in CZK
    currency: 'CZK',
    content_ids: ['consultation_package'],
    content_type: 'product'
  });
};

// Track page view
export const trackPageView = () => {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'PageView');
};

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
  trackEvent('CustomEvent', {
    event_name: 'Button Click',
    button_name: buttonName,
    content_category: 'CTA'
  });
};

// Track video interactions
export const trackVideoInteraction = (action: string) => {
  trackEvent('CustomEvent', {
    event_name: 'Video Interaction',
    video_action: action,
    content_category: 'Video'
  });
};

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  trackEvent('CustomEvent', {
    event_name: 'Scroll Depth',
    scroll_depth: depth,
    content_category: 'Engagement'
  });
};

// Track purchase completion
export const trackPurchase = (purchaseData: {
  value: number;
  currency: string;
  content_ids: string[];
  content_name?: string;
  content_category?: string;
}) => {
  trackEvent('Purchase', {
    value: purchaseData.value,
    currency: purchaseData.currency,
    content_ids: purchaseData.content_ids,
    content_name: purchaseData.content_name || 'Consultation Package',
    content_category: purchaseData.content_category || 'Business Consultation'
  });
};

// Track initiate checkout
export const trackInitiateCheckout = () => {
  trackEvent('InitiateCheckout', {
    content_name: 'Consultation Package',
    content_category: 'Business Consultation',
    value: 15000,
    currency: 'CZK',
    content_ids: ['consultation_package']
  });
}; 