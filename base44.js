import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "689c9184984e0f97d4c43e98", 
  requiresAuth: false // Ensure authentication is required for all operations
});


export const Product = base44.entities.Product;

export const Order = base44.entities.Order;

export const Machine = base44.entities.Machine;

export const Assembly = base44.entities.Assembly;

export const MaintenanceRecord = base44.entities.MaintenanceRecord;



// auth sdk:
export const User = base44.auth;