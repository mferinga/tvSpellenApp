import React, { useState, useEffect, use } from "react";
import { Observable } from 'rxjs';
import { IApiResponse, ISpel } from '@org/data-api';

const API_BASE_URL = 'http://localhost:3000/api';

export class SpelService {
  static async getAll(): Promise<IApiResponse<ISpel>> {
    const response = await fetch(`${API_BASE_URL}/spel`);

    if (!response.ok) {
      throw new Error('Failed to fetch spellen');
    }

    const data = (await response.json()) as IApiResponse<ISpel>;
    return data;
  }

  static async getById(id: number): Promise<IApiResponse<ISpel>> {
    const response = await fetch(`${API_BASE_URL}/spel/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch spel');
    }

    const data = (await response.json()) as IApiResponse<ISpel>;
    return data;
  }
}