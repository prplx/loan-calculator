import { ICalculation } from '../types';

const API_URL = '/api';

export const calculateLoan = (body = {}): Promise<ICalculation> =>
  fetch(`${API_URL}/loan`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(response => response.json());
