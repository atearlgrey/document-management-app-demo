import { ChartData, ReportSummary } from '@/core/models/report.model';

export interface HomeAffairs {
    summary: ReportSummary;
    genderRatio: ChartData;
    staffList: StaffList;
    rewardStatistic: RewardStatistic;
}


export interface StaffList {
    title: string;
    records: StaffListRecord[];
}

export interface StaffListRecord {
    fullName: string;      // Họ và tên
    position: string;      // Chức vụ
    gender: string;        // Giới tính
    joinDate: string;      // Ngày vào ngành (yyyy-MM-dd)
    status: string;   // Tình trạng
}

export interface RewardStatistic {
    title: string;
    records: RewardStatisticRerecord[];
}

export interface RewardStatisticRerecord {
    rewardType: string;   // Loại khen thưởng
    count2023: number;    // Số lượng năm 2023
    count2024: number;    // Số lượng năm 2024
}
