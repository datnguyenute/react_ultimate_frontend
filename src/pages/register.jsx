import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    const response = await registerUserAPI(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );

    if (response.data) {
      notification.success({
        message: "Register user",
        description: "Register user success",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Register user",
        description: JSON.stringify(response.message),
      });
    }
  };
  return (
    <Row justify={"center"}>
      <Col xs={24} md={14} xl={10}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ margin: "50px" }}
        >
          <div style={{ textAlign: "center" }}>
            <h3>Đăng ký tài khoản</h3>
          </div>
          <Row justify={"center"}>
            <Col span={24}>
              <Form.Item
                label="Full name"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input your full name!",
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
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col span={24}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: new RegExp(/\d+/g),
                    message: "Wrong format!",
                  },
                ]}
              >
                <Input />
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
                type="primary"
                onClick={() => {
                  form.submit();
                }}
              >
                Register
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
            <span>Đã có tài khoản?</span>{" "}
            <Link to={"/login"}>Đăng nhập tại đây</Link>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
