import React, { useState, useEffect } from "react";
import {Spin, Button} from 'antd'; // Popconfirm, Tooltip, Icon, 
// import StyleWrapper from "../../../utils/doPageWrapper.style";
import {LayoutContentWrappers, LayoutContent, FormField}  from "../../../utils/layoutWrapper";
import notif from '../../../components/notification/notification';
import Products from '../../../config/redux/action'

const { apiOptionArea, apiOptionSize } = Products;
const HargaPerikananHooks = ({history}) => {
  const [dataSource, setDataSource] = useState({area_kota:[],area_provinsi:[],size:[]});
  const [loading, setLoading] = useState({submit: false });
  const [model] = useState( {area_kota:'',area_provinsi:'',komoditas:'',price:'',size:'',tgl_parsed:''});

  
  const loadInit = async () => {
    const { data: respOptionArea } = await apiOptionArea()
    const { data: respOptionSize } = await apiOptionSize()
    const dataOptionArea = respOptionArea;
    const dataOptionSize = respOptionSize;

    setDataSource({
      area_kota: dataOptionArea.map((m,i)=>({value:i,text:m.city})),
      area_provinsi: dataOptionArea.map((m,i)=>({value:i,text:m.province})),
      size: dataOptionSize.map((m,i)=>({value:i,text:m.size}))
    });
  }

  useEffect(() => { loadInit() }, []);

  const RenderHeader = () => {
    const fields = [
      { name: 'area_provinsi', text: 'Provinsi', type: 'select', dataSource: dataSource.area_provinsi, disabled: false },
      { name: 'area_kota', text: 'Kota', type: 'select', dataSource: dataSource.area_kota, disabled: false },
      { name: 'komoditas', text: 'Komoditas', disabled: false },
      { name: 'price', text: 'Price', disabled: false },
      { name: 'size', text: 'Size', type: 'select', dataSource: dataSource.size, disabled: false },
      { name: 'tgl_parsed', text: 'Tanggal', disabled: false, type:'date-picker' },
    ]

    const submit = async () => {
      try {
        setLoading({ ...loading, submit: true });
        const respApi = null//await apiPost(payload);
        if (respApi.data && respApi.status === 200) {
          const resp = respApi.data;
          notif('success', resp.message);
        } else {
          if (respApi.response && respApi.response.data && respApi.response.data.error) {
            notif('error', respApi.response.data.error);
          } else {
            notif('error', respApi.message);
          }
          setLoading({ ...loading, submit: false });
        }
      } catch (err) {
        console.error(err);
        setLoading({ ...loading, submit: false });
      }
    }

    return (
      <LayoutContent style={{ marginBottom: 20 }}>
        <h4 className="ant-form-item-label" style={{ fontSize: '20px', fontWeight: 'bold', color: '#1d1d1d' }}>Silahkan Isi Harga Ikan Berdasarkan Lokasi</h4><br/><br/>
        <FormField
          model={model}
          fields={fields}
          onSubmit={null}
        />
        <div style={{ marginTop: 20}}>
          <Button type="primary" onClick={submit}>Submit</Button>
        </div>
      </LayoutContent>
    )
    
  }

  return (
    <Spin spinning={loading.submit}>
      <LayoutContentWrappers style={{ height: "auto" }}>
        {RenderHeader()}
      </LayoutContentWrappers>
    </Spin>
  );
}

export default HargaPerikananHooks;