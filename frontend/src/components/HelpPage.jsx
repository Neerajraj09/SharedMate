import React from 'react';

const HelpPage = () => {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
      <iframe
        src="/help.html"
        title="SharedMate User Guide"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default HelpPage;
