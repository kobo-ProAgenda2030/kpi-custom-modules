export interface Profile {
  id: string;
  formation: string;
  address: string;
  phone: string;
  professionals: number;
  employes: number;
  department: string;
  province: string;
  municipality: string;
  waterConnections: number;
  connectionsWithMeter: number;
  connectionsWithoutMeter: number;
  publicPools: number;
  latrines: number;
  serviceContinuity: string;
}

export interface PostProfile {
  id?: string;
  organizationId?: string;
  formation: string;
  address: string;
  phone: string;
  professionals: number;
  employes: number;
  department: string;
  province: string;
  municipality: string;
  waterConnections: number;
  connectionsWithMeter: number;
  connectionsWithoutMeter: number;
  publicPools: number;
  latrines: number;
  serviceContinuity: string;
}
