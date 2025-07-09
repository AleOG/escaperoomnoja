import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { username, password } = values;
    setLoading(true);

    // Simulación de login (esto debería ser una llamada a API)
    setTimeout(() => {
      setLoading(false);
      if (username === "admin" && password === "1234") {
        message.success("Inicio de sesión exitoso");
        navigate("/home");
      } else {
        message.error("Usuario o contraseña incorrectos");
      }
    }, 1000);
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to right, #83a4d4, #b6fbff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{ width: 350, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
        bordered={false}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
          Iniciar Sesión
        </Title>
        <Form
          name="login"
          layout="vertical"
          onFinish={handleLogin}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Usuario"
            name="username"
            rules={[{ required: true, message: "Ingresa tu nombre de usuario" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Usuario"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Ingresa tu contraseña" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ marginTop: 10 }}
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
