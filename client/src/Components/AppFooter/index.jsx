import React from 'react';
import { Typography } from 'antd';

const AppFooter = () => {
  return (
    <div className="appFooter">
      <Typography.Link>© 2021 - Ecommerce</Typography.Link>
      <Typography.Link href="#">Privacy policy</Typography.Link>
      <Typography.Link href="#">Terms & Conditions</Typography.Link>
      <Typography.Link href="#">Return Policy</Typography.Link>
      <Typography.Link href="tell: + 123456789">+123456789</Typography.Link>
    </div>
  );
};

export default AppFooter;
