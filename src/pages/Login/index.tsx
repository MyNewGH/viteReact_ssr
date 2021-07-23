import React, { useEffect } from 'react';
import { Button } from 'antd-mobile';
// import { useFetch } from 'use-http';
// async function  loadData(){
//   const options = {};
//   const {
//     loading,
//     data = []
//     // eslint-disable-next-line no-undef
//   } = useFetch<API.TodoBack>(
//     'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
//     options,
//     []
//   );
//   return {loading,data};
// }
const index: React.FC = () => {
  useEffect(() => {}, []);
  async function login() {}
  return (
    <div>
      <Button onClick={login}>登录</Button>
    </div>
  );
};

export default index;
