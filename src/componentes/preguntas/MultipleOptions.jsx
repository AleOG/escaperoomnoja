import { Modal, Form, Radio, Typography } from "antd";
const { Text, Paragraph } = Typography;

const MultipleOptions = ({ properties, visible, onCancel, onSubmit}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((err) => console.log("Validation failed:", err));
  };

  return (
    <Modal
      title={properties?.titulo || "Selecciona una opción"}
      open={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Aceptar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical">

        {properties?.pregunta && (<Paragraph style={{ marginTop: 8, marginBottom: 16 }}>
            <Text strong>{properties?.pregunta}</Text>
          </Paragraph>)}
        <Form.Item
          name="option"
          rules={[{ required: true, message: "Seleccione una opción" }]}
        >
          <Radio.Group>
            {properties.opciones.map((opt) => (
              <Radio key={opt.value} value={opt.value}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MultipleOptions;
