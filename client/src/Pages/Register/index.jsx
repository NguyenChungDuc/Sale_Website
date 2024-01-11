import React from 'react';

import { Button, Form, Input } from 'antd';
import logo from '../../Assets/logo.png';

const RegisterPage = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <>
      <Form className="wrapper">
        <Form>
          <img
            src={logo}
            alt=""
            className="logo"
            style={{
              width: '200px',
              height: '70px',
              margin: '20px 0 0 20px',
            }}
          />
        </Form>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{
            width: '30%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: false,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input placeholder="Username" style={{ height: '40px' }} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: false,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input placeholder="Email" style={{ height: '40px' }} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: false,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password placeholder="Password" style={{ height: '40px' }} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              // className="login-form-button"
              style={{
                width: '100%',
                height: '40px',
                background: 'var(--color-text)',
                border: 'none',
              }}
            >
              Register
            </Button>
          </Form.Item>
          <Form.Item
            style={{ textAlign: 'center', color: 'var(--color-main)' }}
          >
            Have account ?{'  '}
            <a
              className="login-form-forgot"
              href="/login"
              style={{ color: 'var(--color-text)' }}
            >
              Login here!
            </a>
          </Form.Item>
        </Form>
      </Form>
    </>
  );
};

export default RegisterPage;
