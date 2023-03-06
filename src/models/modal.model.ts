export interface ModalOptions {
  type: 'success' | 'warning' | 'error';
  title: string;
  content: string;
  autoClose?: boolean;
  timeToClose?: number;
}