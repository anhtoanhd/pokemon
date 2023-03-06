import { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { Route } from '~/models';

export interface IPublicRouteProps {
  route: Route;
}

export function PublicRoute({ route }: IPublicRouteProps) {
  const [t] = useTranslation();
  useEffect(() => {
    document.title = `Pokemon - ${route.title ? t(route.title) : t('TEXT.HOME')}`;
  }, [route, t]);

  if (route.redirectTo) {
    return <Navigate to={route.redirectTo} replace />;
  } else {
    const Page = route.component;
    let Layout: any = '';
    if (route.layout) {
      Layout = route.layout;
    } else if (route.layout === null) {
      Layout = Fragment;
    }
    return (
      <Layout>
        <Page />
      </Layout>
    );
  }
}
