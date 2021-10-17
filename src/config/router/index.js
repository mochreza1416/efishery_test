import list_harga_perikanan from '../../container/pages/harga_perikanan/list_harga_perikanan';
import tambah_harga_perikanan from '../../container/pages/harga_perikanan/tambah_harga_perikanan';
import {
    FolderOpenFilled
  } from "@ant-design/icons";

const pageRoutes = () => {
  return [
    {
      icon: <FolderOpenFilled/>,
      link: "/list",
      path: "/list",
      name: "List Harga",
      component: list_harga_perikanan
    },
    {
      icon: <FolderOpenFilled/>,
      link: "/tambah",
      path: "/tambah",
      name: "Tambah Harga",
      component: tambah_harga_perikanan
    },
  ];
};

export default pageRoutes();
