import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart, getAllProducts, getProductACategory } from '../../Api';
import {
  List,
  Card,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
  Spin,
  Select,
} from 'antd';
const Products = () => {
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('az');
  useEffect(() => {
    setLoading(true);
    (param?.categoryId
      ? getProductACategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setProducts(res.products);
      setLoading(false);
    });
  }, [param]);

  const getSortedItems = () => {
    const sortedItems = [...products];
    sortedItems.sort((a, b) => {
      if (sort === 'az') {
        return a.title.localeCompare(b.title);
      }
      if (sort === 'za') {
        return b.title.localeCompare(a.title);
      }
      if (sort === 'plh') {
        return a.price - b.price;
      }
      if (sort === 'phl') {
        return b.price - a.price;
      }
      if (sort === 'tr') {
        return b.rating - a.rating;
      }
    });
    return sortedItems;
  };
  if (loading) {
    return <Spin size="large" spinning className="productSpin" />;
  }
  return (
    <>
      <div className="formViewItems">
        <Typography.Text className="productViewItems">
          View Items Sorted By :
        </Typography.Text>
        <Select
          className="productSelect"
          defaultValue={'az'}
          onChange={(value) => {
            setSort(value);
          }}
          options={[
            {
              label: 'Alphabetical A-Z',
              value: 'az',
            },
            {
              label: 'Alphabetical Z-A',
              value: 'za',
            },
            {
              label: 'Price Low to High',
              value: 'plh',
            },
            {
              label: 'Price High to Low',
              value: 'phl',
            },
            {
              label: 'Top Rated',
              value: 'tr',
            },
          ]}
        ></Select>
      </div>
      <List
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon text={product.discountPercentage + '%'} color="red">
              <Card
                className="productCard"
                title={product.title}
                key={index}
                cover={
                  <Image className="productImage" src={product.thumbnail} />
                }
                actions={[
                  <Rate allowHalf disabled value={product.rating} />,
                  <AddToCart item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${product.price}{' '}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          product.price +
                            (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                      {/* <Typography.Paragraph>
                        Discount: {product.discountPercentage}%
                      </Typography.Paragraph> */}
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{
                        rows: '2',
                        expandable: 'true',
                        symbol: 'more',
                      }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                />
              </Card>
            </Badge.Ribbon>
          );
        }}
        // dataSource={products}
        dataSource={getSortedItems()}
      ></List>
    </>
  );
};

const AddToCart = ({ item }) => {
  const [loading, setloading] = useState(false);
  const addProductToCart = () => {
    setloading(true);
    addToCart(item.id).then((res) => {
      message.success(`${item.title} has been added to cart !`);
      setloading(false);
    });
  };
  return (
    <>
      <Button
        onClick={() => {
          addProductToCart();
        }}
        loading={loading}
        type="link"
      >
        Add to Cart
      </Button>
    </>
  );
};

export default Products;
