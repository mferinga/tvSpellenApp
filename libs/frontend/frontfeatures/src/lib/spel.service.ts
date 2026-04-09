import React, { useState, useEffect, use } from "react";
import { Observable } from 'rxjs';
import { IApiResponse, ISpel } from '@org/data-api';
import { ExtractJwt } from "passport-jwt";

const API_BASE_URL = 'http://localhost:3333/api';

export class SpelService {
  static async getAllSpellen(): Promise<IApiResponse<ISpel>> {
    const response = await fetch(`${API_BASE_URL}/spel`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch spellen');
    }

    const data = (await response.json()) as IApiResponse<ISpel>;
    return data;
  }

  static async getBySpellenId(id: string): Promise<IApiResponse<ISpel>> {
    const response = await fetch(`${API_BASE_URL}/spel/${id}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch spel');
    }

    const data = (await response.json()) as IApiResponse<ISpel>;
    return data;
  }
}