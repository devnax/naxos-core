import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import OSRoot from '../src/OSRoot';


const Root = () => {
  return <OSRoot />
}

const root = createRoot(document.getElementById('root') as any)
root.render(<Root />);
