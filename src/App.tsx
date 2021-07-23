import React from 'react';
import { renderRoutes } from 'react-router-config';
import routes from '@/routes';
import { SSRProvider } from '@utils/context';
// console.log(import.meta.env.VITE_HOST);
const App: React.FC<{ content?: any }> = () => {
  return <SSRProvider value={{}}>{renderRoutes(routes)}</SSRProvider>;
};
export default App;
