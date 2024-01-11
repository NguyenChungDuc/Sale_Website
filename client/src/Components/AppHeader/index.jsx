import React, { useEffect, useState } from 'react';
import {
  Menu,
  Typography,
  Badge,
  Drawer,
  Table,
  InputNumber,
  Button,
  Form,
  Input,
} from 'antd';
import { HomeFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../../Api';

const AppHeader = () => {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <div className="appHeader">
      <Menu
        onClick={onMenuClick}
        mode="horizontal"
        className="appHeaderMenu"
        defaultSelectedKeys={['home']}
        items={[
          {
            label: <HomeFilled />,
            key: '',
          },
          {
            label: 'Men',
            key: 'men',
            children: [
              {
                label: "Men's Shirts",
                key: 'mens-shirts',
              },
              {
                label: "Men's Shoes",
                key: 'mens-shoes',
              },
              {
                label: "Men's Watches",
                key: 'mens-watches',
              },
            ],
          },
          {
            label: 'Women',
            key: 'women',
            children: [
              {
                label: "Women's Dresses",
                key: 'womens-dresses',
              },
              {
                label: "Women's Shoes",
                key: 'womens-shoes',
              },
              {
                label: "Women's Watches",
                key: 'womens-watches',
              },
              {
                label: "Women's Bags",
                key: 'womens-bags',
              },
              {
                label: "Women's Jewellery",
                key: 'womens-jewellery',
              },
            ],
          },
          {
            label: ' Accessories',
            key: 'accessories',
          },
        ]}
      />
      <Typography.Title level={2}>Chungduc_ Store</Typography.Title>
      <AppCart />
    </div>
  );
};

const AppCart = () => {
  const [cartDrawerVisible, setCartDrawerVisible] = useState(false);
  const [checkOutDrawerOpen, setCheckOutDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);
  const onConfirmOrder = (values) => {};
  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerVisible(true);
        }}
        count={7}
        className="iconShopping"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartDrawerVisible}
        onClose={() => setCartDrawerVisible(false)}
        title="Your Cart"
        size="default"
        width={700}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: 'Title',
              dataIndex: 'title',
            },
            {
              title: 'Price',
              dataIndex: 'price',

              render: (price) => `$${price}`,
            },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={value}
                    onChange={(value) => {
                      setCartItems((pre) =>
                        pre.map((cart) => {
                          if (record.id === cart.id) {
                            cart.total = cart.price * value;
                          }
                          return cart;
                        })
                      );
                    }}
                  />
                );
              },
            },
            {
              title: 'Total',
              dataIndex: 'total',
              render: (total) => `$${total}`,
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            console.log(data);
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return <span>Total : {total}</span>;
          }}
        />
        <Button
          onClick={() => {
            setCheckOutDrawerOpen(true);
          }}
          type="primary"
        >
          Checkout Your Cart
        </Button>
      </Drawer>
      <Drawer
        open={checkOutDrawerOpen}
        onClose={() => setCheckOutDrawerOpen(false)}
        title="Confirm Your Cart"
        size="default"
        width={450}
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please enter your name',
              },
            ]}
            label="Full Name"
            name="full_name"
          >
            <Input placeholder="Enter your name ..." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter a valid email ',
              },
            ]}
            label="Email"
            name="email"
          >
            <Input placeholder="Enter your email ..." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please enter your address',
              },
            ]}
            label="Address"
            name="address"
          >
            <Input placeholder="Enter your address ..." />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};
export default AppHeader;
