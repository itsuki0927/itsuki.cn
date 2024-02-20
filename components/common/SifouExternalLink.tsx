import React from 'react';
import ExternalLink from './ExternalLink';
import Sifou from '../icon/Sifou';
import { SOCIAL } from '@/constants/app';

interface SifouExternalLinkProps {
  size?: number;
}

const SifouExternalLink = ({ size = 20 }: SifouExternalLinkProps) => {
  return (
    <ExternalLink href={SOCIAL.sifou}>
      <Sifou size={size} />
    </ExternalLink>
  );
};

export default SifouExternalLink;
