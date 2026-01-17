import { ChartData, ReportSummary } from '@/core/models/report.model';

export interface Education {
    summary: ReportSummary;
    genderRatio: ChartData;
    teacherAndClassStatistics: ChartData;
    facilitiesStatus: ChartData;
    educationalList: EducationalList;
    educationStatistic: EducationStatistic;
}

export interface EducationalList {
    title: string;
    records: EducationalRecord[];
}

export interface EducationalRecord {
    educationLevel: string;
    schoolCount: number;
    classCount: number;
    teacherCount: number;
    studentCount: number;
}

export interface EducationStatistic {
    title: string;
    records: EducationStatisticRecord[];
}

export interface EducationStatisticRecord {
    content: string;
    result2023: number;
    result2024: number;
    unit?: string
}
