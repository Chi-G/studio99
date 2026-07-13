import React from 'react';

export function Logo({ className = "h-10 w-auto object-contain rounded-sm", forceWhite = false }) {
  if (forceWhite) {
    return <img src="/logo_white.png" alt="Studio99 Logo" className={className} />;
  }

  return (
    <>
      <img src="/logo_black.png" alt="Studio99 Logo" className={`dark:hidden ${className}`} />
      <img src="/logo_white.png" alt="Studio99 Logo" className={`hidden dark:block ${className}`} />
    </>
  );
}