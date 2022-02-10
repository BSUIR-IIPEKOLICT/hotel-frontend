import React from 'react';
import { LinkProps } from 'next/link';
import Link from 'next/link';

export const RouteLink: React.FC<LinkProps> = ({
  href,
  children,
  ...props
}) => (
  <Link href={href}>
    <a>{children}</a>
  </Link>
);
