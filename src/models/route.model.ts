export interface Route {
  path: string;
  title?: string;
  component?: any;
  layout?: any;
  redirectTo?: string;
}