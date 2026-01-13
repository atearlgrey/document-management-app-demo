/**
 * Models cho Report data structure
 */

export interface ReportSummary {
  title: string;
  description?: string;
  totalRecords?: number;
  lastUpdated?: string;
  period?: string;
}

export interface ReportStatistic {
  label: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  icon?: string;
  color?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  category?: string;
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'doughnut' | 'area';
  title: string;
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
}

/**
 * Healthcare Report Data
 */
export interface HealthcareReport {
  summary: ReportSummary;
  statistics: ReportStatistic[];
  charts: ChartData[];
  facilities?: HealthcareFacility[];
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'health_center';
  address: string;
  capacity?: number;
  staff?: number;
  patients?: number;
}

/**
 * Education Report Data
 */
export interface EducationReport {
  summary: ReportSummary;
  statistics: ReportStatistic[];
  charts: ChartData[];
  schools?: EducationFacility[];
}

export interface EducationFacility {
  id: string;
  name: string;
  type: 'kindergarten' | 'primary' | 'secondary' | 'high_school';
  address: string;
  students?: number;
  teachers?: number;
  classrooms?: number;
}

/**
 * Agriculture Report Data
 */
export interface AgricultureReport {
  summary: ReportSummary;
  statistics: ReportStatistic[];
  charts: ChartData[];
  crops?: CropData[];
}

export interface CropData {
  id: string;
  name: string;
  type: string;
  area: number; // hectares
  yield: number; // tons
  season: string;
}

/**
 * Generic Report Interface
 */
export interface GenericReport {
  summary: ReportSummary;
  statistics: ReportStatistic[];
  charts: ChartData[];
  metadata?: Record<string, any>;
}
