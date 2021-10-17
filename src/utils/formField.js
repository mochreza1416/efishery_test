import React, { useEffect } from "react";
import { Form, Row, Col, Button } from "antd";
import FormInput from "./formInput";

const App = (option) => {
  const { fields = [], onSubmit, model } = option || {};
  const [form] = Form.useForm();

  const formLayoutThree = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 },
    },
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (onSubmit) onSubmit(values);
  };
  
  useEffect(() => {
    form.setFieldsValue(model);
    if (model && model.valdate) form.validateFields(Object.keys(model));
  }, [model,form]);

  return (
    <Form
      {...(option.layout || formLayoutThree)}
      onSubmit={handleSubmit}
      className={option.className}
      form={form}
    >
      <Row gutter={option.gutter || 12}>
        {fields.map((m, key) => {
          if (m.type === "break") return <Col span={24} key={key}></Col>;
          if (m.type === "content") return <div key={key}>{m.content}</div>;
          if (m.type === "button-submit") {
            return (
              <Col span={24} key={key} {...m.optionAttr}>
                <div style={m.style}>
                  <Button
                    type="primary"
                    loading={m.loading}
                    icon={m.icon}
                    disabled={m.disable || m.disabled}
                    onClick={handleSubmit}
                  >
                    {m.text}
                  </Button>
                </div>
              </Col>
            );
          }

          return (
            <Col
              span={24}
              lg={8}
              {...(m.responsive || option.responsive)}
              key={key}
              style={m.style}
            >
              {FormInput(m, form)}
            </Col>
          );
        })}
      </Row>
    </Form>
  );
};

// export default Form.create()(App);
export default App;
