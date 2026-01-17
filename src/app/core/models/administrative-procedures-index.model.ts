import { ChartData, ReportSummary } from '@/core/models/report.model';

export interface AdministrativeProceduresIndex {
    summary: ReportSummary;
    satisfactionSurvey: ChartData;
    administrativeProcedure: ChartData;
    evaluationCriteria: EvaluationCriteria;
}

export interface EvaluationCriteria {
    title: string;
    records: EvaluationCriteriaRecord[];
}

export interface EvaluationCriteriaRecord {
    criteria: string;   // Tiêu chí
    score2023: number;  // Điểm năm 2023
    score2024: number;  // Điểm năm 2024
    note?: string;      // Ghi chú
}
