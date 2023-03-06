import classNames from 'classnames/bind';
import { Modal } from 'react-bootstrap';
import { create, InstanceProps } from 'react-modal-promise';
import { ModalOptions } from '~/models';
import styles from './AlertModal.module.scss';
import { Button } from '../button/Button';

interface AlertModalProps extends InstanceProps<void, void> {
  isOpen: boolean;
  onResolve: (args: any) => void;
  onReject: (args: any) => void;
  options: ModalOptions;
}

const cx = classNames.bind(styles);

const AlertModal = ({ isOpen, onResolve, onReject, options }: AlertModalProps) => {
  if (options.autoClose) {
    setTimeout(() => {
      onResolve(false);
    }, options.timeToClose);
  }

  return (
    <Modal dialogClassName={cx('modal')} show={isOpen} backdrop={'static'} centered>
      <Modal.Body>
        <div className={cx('wrapper')}>
          <div className={cx('alert-header')}>
            <p className={cx(options.type)}>{options.title}</p>
          </div>
          <div className={cx('alert-body')}>
            <p className={cx('content')}>{options.content}</p>
          </div>
          <div className={cx('alert-action', options.autoClose ? 'hide' : '')}>
            <Button rounded large btnType="outline-secondary" onClick={() => onResolve(false)}>Cancel</Button>
            <Button rounded large btnType="primary" onClick={() => onResolve(true)}>Ok</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export const alertModal = create(AlertModal);
