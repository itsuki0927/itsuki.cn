import React from 'react';
import ExternalLink from './ExternalLink';
import Juejin from '../icon/Juejin';
import { SOCIAL } from '@/constants/app';

interface JuejinExternalLinkProps {
  size?: number;
}

const JuejinExternalLink = ({ size }: JuejinExternalLinkProps) => {
  return (
    <ExternalLink href={SOCIAL.juejin}>
      <Juejin size={size} />
    </ExternalLink>
  );
};

export default JuejinExternalLink;
