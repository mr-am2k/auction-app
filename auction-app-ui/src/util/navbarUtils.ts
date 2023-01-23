import { ROUTES } from './routes';

export const hasNavbar = (path: string) => {
  const PAGES_WITH_NAVBAR = [
    '/',
    ROUTES.ABOUT_US,
    ROUTES.ADD_PRODUCT,
    ROUTES.MY_ACCOUNT,
    ROUTES.PRIVACY_AND_POLICY,
    ROUTES.PRODUCT,
    ROUTES.SHOP,
    ROUTES.TERMS_AND_CONDITIONS,
    `${ROUTES.MY_ACCOUNT}${ROUTES.ADD_PRODUCT}`,
  ];

  return PAGES_WITH_NAVBAR.includes(path);
};
