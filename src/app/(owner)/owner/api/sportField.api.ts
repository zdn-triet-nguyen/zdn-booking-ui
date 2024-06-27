'use server';
import axios from 'axios';

import { cookies } from 'next/headers';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:3000';
export const getUserSportFields = async (
  page: number,
  size: number,
  sportFieldTypeId: string,
): Promise<any> => {
  const accessToken = cookies().get('access_token')?.value as string;
  try {
    const sportFieldTypeParam =
      sportFieldTypeId === 'all' ? '' : `&sportFieldTypeId=${sportFieldTypeId}`;
    const data = await axios.get(
      `${API_HOST}/sport-field/me?page=${page - 1}&size=${size}${sportFieldTypeParam}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data.data;
  } catch (error) {
    return error;
  }
};
export const getSportFieldById = async (id: string): Promise<any> => {
  const accessToken = cookies().get('access_token')?.value as string;

  try {
    const data = await axios.get(`${API_HOST}/sport-field/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};