export interface PublicServiceCenter {
    summary: ReportSummary;
    processingPerformance: ProcessingPerformance;
    procedureByType: ProcessingPerformance;
    processingProgress: ProcessingProgress;
    resolutionPerformanceStatistics: ResolutionPerformanceStatistics;
}
export interface ReportSummary {
    title: string;
    description?: string;
}

export interface ProcessingPerformance {
    title: string;
    chart: ChartData;
}

export interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

export interface ChartDataset {
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
}

export interface ProcessingProgress {
    title: string;
    records: ProcessingProgressRecord[];
}

export interface ResolutionPerformanceStatistics {
    title: string;
    records: ResolutionPerformanceStatisticsRecord[];
}

export interface ProcessingProgressRecord {
    recordCode: string;
    procedureType: string;
    submittedDate: string;
    status: string;
    appointmentDate: string;
}

export interface ResolutionPerformanceStatisticsRecord {
    indicator: string;
    quantity: number | null;
    percentage?: number | null;
    unit?: string;
}
