import React from 'react';
import { Form, Input, InputNumber, Select, DatePicker } from 'antd';
import { UploadControl } from './Upload';
import {
    CloseCircleFilled
  } from "@ant-design/icons";

const App = (opt = { colon: true }) => {
    // const [form] = Form.useForm();
    // const { getFieldDecorator } = form || {};
    const rules = [];

    if (!opt.data) opt.data = [];
    // if (!getFieldDecorator) return null;

    if (opt.required) {
        rules.push({
            required: true,
            message: (
                <div>
                    <CloseCircleFilled/>
                    {opt.text} can't be empty !
                </div>
            )
        })
    }

    switch (opt.type) {
        case 'textarea':
            return (
                <Form.Item label={opt.text} name={opt.name} rules={opt.rules}>
                    {/* {getFieldDecorator(opt.name, { rules })( */}
                        <Input.TextArea rows={4} style={{ width: '100%', ...opt.style }} maxLength={opt.max} disabled={opt.disabled} placeholder={opt.placeholder} onChange={opt.onChange}/>
                    {/* )} */}
                </Form.Item>
            )
        case 'date-picker':
            return (
                <Form.Item label={opt.text} name={opt.name} rules={opt.rules}>
                    {/* {getFieldDecorator(opt.name, { rules })( */}
                        <DatePicker
                            {...opt.optionDate}
                            style={{ width: '100%' }}
                            disabled={opt.disabled}
                            onChange={opt.onChange}
                            disabledDate={opt.disabledDate}
                            picker={opt.picker} />
                    {/* )} */}
                </Form.Item>
            )
        case 'date-range':
            return (
                <Form.Item label={opt.text} name={opt.name} rules={opt.rules}>
                    {/* {getFieldDecorator(opt.name, { rules })( */}
                        <DatePicker.RangePicker {...opt.optionDate} style={{ width: '100%', ...opt.style }} disabled={opt.disabled} onChange={opt.onChange} picker={opt.picker} />
                    {/* )} */}
                </Form.Item>
            )
        case 'number':
            return (
                <Form.Item label={opt.text} name={opt.name} rules={opt.rules}>
                    {/* {getFieldDecorator(opt.name, { rules })( */}
                        <InputNumber style={{ width: '100%', ...opt.style }} disabled={opt.disabled} placeholder={opt.placeholder} />
                    {/* )} */}
                </Form.Item>
            )
        case 'upload':
            return <UploadControl opt={opt} name={opt.name} rules={opt.rules} />;
        case 'select':
            return (
                <Form.Item label={opt.text} name={opt.name} rules={opt.rules}>
                    {/* {getFieldDecorator(opt.name, { rules })( */}
                        <Select
                            allowClear={opt.allowClear}
                            showSearch
                            labelInValue={false}
                            optionFilterProp="children"
                            style={{ width: '100%' }}
                            placeholder={opt.placeholder}
                            disabled={opt.disabled}
                            onChange={opt.onChange}
                            onSearch={opt.onSearch}
                            loading={opt.loading}
                            dropdownMatchSelectWidth={false}
                            defaultValue={opt.defaultValue}
                            {...opt.optionSelect}>
                                <Select.Option value="" key="" >Silahkan dipilih</Select.Option>
                            {(opt.dataSource || []).map(m => (
                                <Select.Option value={m.value} key={m.value} disabled={m.disabled}>{m.text}</Select.Option>
                            ))}
                        </Select>
                    {/* )} */}
                </Form.Item>
            )
        case 'content':
            return opt.content;
        default:
            return (
                <Form.Item label={opt.text} name={opt.name} colon={opt.colon} rules={opt.rules} >
                    {/* {getFieldDecorator(opt.name, { rules })( */}
                        <Input
                            style={{ ...opt.style }}
                            maxLength={opt.max}
                            disabled={opt.disabled}
                            placeholder={opt.placeholder}
                            onPressEnter={opt.onPressEnter}
                            onChange={opt.onChange}
                        />
                        {/* )} */}
                </Form.Item>
            )
    }
}

export default App;
