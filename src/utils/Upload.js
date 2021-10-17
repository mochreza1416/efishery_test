import React from 'react';
import { Form, Upload, Tooltip, Button } from 'antd';
import {
    UpCircleFilled
  } from "@ant-design/icons";

export const UploadControl = ({ opt, getFieldDecorator }) => {
    const headers = { authorization: localStorage.getItem('token') };

    return (
        <Form.Item name={opt.name}>
            {getFieldDecorator(opt.name)(
                <Upload multiple={true} headers={headers} {...opt.config} disabled={opt.disabled} onChange={opt.onChange}
                    beforeUpload={opt.beforeUpload} accept={opt.accept} action={opt.action}
                    fileList={opt.fileList}>
                    <Tooltip title={opt.tooltip}>
                        <Button type="primary" ghost {...opt.propsButton} disabled={opt.disabled}>
                            <UpCircleFilled/> {opt.text}
                        </Button>
                    </Tooltip>
                </Upload>
            )}
        </Form.Item>
    );
}
