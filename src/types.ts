/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
  sort_order: number;
}

export interface Portfolio {
  id: number;
  title: string;
  emoji: string;
  category: string;
  description: string;
  url: string;
  sort_order: number;
}

export interface Pricing {
  id: number;
  name: string;
  price: number;
  period: string;
  features: string[];
  featured: boolean;
  sort_order: number;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
}
