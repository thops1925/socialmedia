import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { decodeCredential } from '../Type/GoogleLogIn';

export const createOrGetUser = async (response: any, setUser: any) => {
  const decoded: decodeCredential = jwt_decode(response.credential);
  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };
  setUser(user);
  await axios.post(`http://localhost:3000/api/auth`, user);
};
