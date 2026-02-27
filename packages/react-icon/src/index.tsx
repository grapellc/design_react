import React from 'react';

/**
 * Mock implementation of @grape_design_react/react-icon
 * to satisfy build dependencies of documentation.
 */

const DummyIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="#eee" />
  </svg>
);

export const IconPlaceholder = DummyIcon;

// In a real scenario, this would be generated from SVG assets.
// We export an empty object or some defaults to allow the docs to compile.
export default {};
