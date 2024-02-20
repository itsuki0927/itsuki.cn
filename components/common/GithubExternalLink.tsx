import React from 'react';
import ExternalLink from './ExternalLink';
import { Github } from 'lucide-react';
import { SOCIAL } from '@/constants/app';

interface GithubExternalLinkProps {
  size?: number;
}

const GithubExternalLink = ({ size = 20 }: GithubExternalLinkProps) => {
  return (
    <ExternalLink href={SOCIAL.github}>
      <Github size={size} />
    </ExternalLink>
  );
};

export default GithubExternalLink;
