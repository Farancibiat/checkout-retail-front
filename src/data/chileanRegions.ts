/**
 * Regiones de Chile (16 regiones) para selector de envío.
 * zoneId se envía al backend; se usa código corto para compatibilidad.
 */
export interface ChileanRegion {
  value: string;
  label: string;
}

export const CHILEAN_REGIONS: ChileanRegion[] = [
  { value: 'region-15', label: 'Arica y Parinacota' },
  { value: 'region-01', label: 'Tarapacá' },
  { value: 'region-02', label: 'Antofagasta' },
  { value: 'region-03', label: 'Atacama' },
  { value: 'region-04', label: 'Coquimbo' },
  { value: 'region-05', label: 'Valparaíso' },
  { value: 'region-13', label: 'Metropolitana de Santiago' },
  { value: 'region-06', label: "Libertador General Bernardo O'Higgins" },
  { value: 'region-07', label: 'Maule' },
  { value: 'region-16', label: 'Ñuble' },
  { value: 'region-08', label: 'Biobío' },
  { value: 'region-09', label: 'La Araucanía' },
  { value: 'region-14', label: 'Los Ríos' },
  { value: 'region-10', label: 'Los Lagos' },
  { value: 'region-11', label: 'Aysén del General Carlos Ibáñez del Campo' },
  { value: 'region-12', label: 'Magallanes y de la Antártica Chilena' },
];
