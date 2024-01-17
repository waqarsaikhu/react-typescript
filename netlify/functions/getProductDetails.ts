import axios from 'axios';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  const productId = event.pathParameters?.id;

  if (!productId) {
    return {
      statusCode: 400,
      body: 'Product ID is required',
    };
  }

  try {
    const response = await axios.get(`https://dummyjson.com/api/product/${productId}`);
    const product = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: 'Failed to fetch product data',
    };
  }
};
