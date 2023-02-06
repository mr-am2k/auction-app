const baseUrl = 'http://localhost:8080';
const redirectUrl = 'http://localhost:3000';

export const ROUTES = {
  PRIVACY_AND_POLICY: '/privacy-and-policy',
  TERMS_AND_CONDITIONS: '/terms-and-conditions',
  ABOUT_US: '/about-us',
  SHOP: '/shop',
  MY_ACCOUNT: '/my-account',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCT: '/product',
  ADD_PRODUCT: '/add-product',
  PAY: '/pay',
  PRODUCT_SUBSCRIBE: '/products/subscribe',
  GOOGLE_LOGIN: `${baseUrl}/oauth2/authorize/google?redirect_uri=${redirectUrl}`,
};
