import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { OS } from '../src';

const Root = () => {
  return <OS />
}

const root = createRoot(document.getElementById('root') as any)
root.render(<Root />);
