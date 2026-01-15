export interface AdministrativeProceduresIndex {
    summary: ReportSummary;
    satisfactionSurvey: SatisfactionSurvey;
    administrativeProcedure: AdministrativeProcedure;
    evaluationCriteria: EvaluationCriteria;
}

export interface ReportSummary {
    title: string;
    description?: string;
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

export interface SatisfactionSurvey {
    title: string;
    chart: ChartData;
}

export interface AdministrativeProcedure {
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
    pointBackgroundColor?: string | string[];
    pointBorderColor?: string | string[];
    pointRadius?: number;
    borderWidth?: number;
}
