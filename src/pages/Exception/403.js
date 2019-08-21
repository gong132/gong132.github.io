import React from 'react';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception403 = () => (
  <Exception
    type="403"
    desc='403'
    linkElement={Link}
    backText='403'
  />
);

export default Exception403;
