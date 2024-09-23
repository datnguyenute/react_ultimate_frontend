import { ArrowRightOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    const response = await loginAPI(values.email, values.password);
    if (response.data) {
      message.success("Đăng nhập thành công");
      localStorage.setItem("access_token", response.data.access_token);
      setUser(response.data.user);
      navigate("/");
    } else {
      notification.error({
        message: "Login failed",
        description: JSON.stringify(response.message),
      });
    }
    setLoading(false);
  };
  return (
    <Row justify={"center"} style={{ marginTop: "20px" }}>
      <Col xs={24} md={14} xl={10}>
        <fieldset
          style={{
            margin: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <legend>Đăng nhập</legend>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ margin: "20px" }}
          >
            <Row justify={"center"}>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify={"center"}>
              <Col span={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    onKeyDown={(event) => {
                      if (event.key === "Enter") form.submit();
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify={"center"}>
              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  loading={loading}
                  type="primary"
                  onClick={() => {
                    form.submit();
                  }}
                >
                  Login
                </Button>
                <div>
                  <Link to={"/"}>
                    <span>Back to homepage</span> <ArrowRightOutlined />
                  </Link>
                </div>
              </Col>
            </Row>
            <Divider />
            <div>
              <span>Chưa có tài khoản?</span>{" "}
              <Link to={"/register"}>Đăng ký tại đây</Link>
            </div>
          </Form>
        </fieldset>
      </Col>
    </Row>
  );
};

export default Login;
