import { ChartData, ReportSummary } from '@/core/models/report.model';

export interface PublicServiceCenter {
    summary: ReportSummary;
    processingPerformance: ChartData;
    procedureByType: ChartData;
    processingProgress: ProcessingProgress;
    resolutionPerformanceStatistics: ResolutionPerformanceStatistics;
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
