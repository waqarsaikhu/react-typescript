import { Handler, Context, APIGatewayEvent } from 'aws-lambda';
import axios from 'axios';

interface User {
  id: string;
  name: string;
}

export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {


  try {
    const response = await axios.get(`https://65a7c7c594c2c5762da7897e.mockapi.io/api/v1/users`);
    const data: User = await response.data; 
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching user data' }),
    };
  }
};