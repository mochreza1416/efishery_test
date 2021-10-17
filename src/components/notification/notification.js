import React from 'react';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled
} from "@ant-design/icons";
import notification from './duration';

const mapTypeNotif = type => {
  let props = {
    style: {
      background: '#f6ffed',
      'white-space': 'pre-line',
    },
    icon: (
      <CheckCircleFilled/>
    ),
    message: 'Success',
  };

  if (type === 'error') {
    props = {
      style: {
        background: '#fff1f0',
        'white-space': 'pre-line',
      },
      icon: (
        <CloseCircleFilled />
      ),
      message: 'Error',
    };
  } else if (type === 'warning') {
    props = {
      style: {
        background: '#fffbe6',
        'white-space': 'pre-line',
      },
      icon: (
        <ExclamationCircleFilled/>
      ),
      message: 'Warning',
    };
  } else if (type === 'info') {
    props = {
      style: {
        background: '#edf9ff',
        'white-space': 'pre-line',
      },
      icon: (
        <InfoCircleFilled/>
      ),
      message: 'Info',
    };
  }
  return props;
};

const Notif = (type, description) => {
  notification[type]({
    description,
    ...mapTypeNotif(type),
  });
};
export default Notif;
