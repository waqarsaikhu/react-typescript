import axios from 'axios';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products`);
    const products = response.data.products;

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: 'Failed to fetch product data',
    };
  }
};
