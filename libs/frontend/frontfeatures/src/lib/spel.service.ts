import React, { useState, useEffect, use } from "react";
import { Observable } from 'rxjs';
import { IApiResponse, ISpel } from '@org/data-api';
import { ExtractJwt } from "passport-jwt";
import { SPELDATA_API_BASE_URL } from './api-config';

export class SpelService {
  static async getAllSpellen(): Promise<IApiResponse<ISpel>> {
    const response = await fetch(`${SPELDATA_API_BASE_URL}/spel`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch spellen');
    }

    const data = (await response.json()) as IApiResponse<ISpel>;
    return data;
  }

  static async getBySpellenId(id: string): Promise<IApiResponse<ISpel>> {
    const response = await fetch(`${SPELDATA_API_BASE_URL}/spel/${id}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch spel');
    }

    const data = (await response.json()) as IApiResponse<ISpel>;
    return data;
  }
}
