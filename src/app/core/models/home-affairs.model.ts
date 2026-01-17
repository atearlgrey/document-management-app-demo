export interface HomeAffairs {
    summary: ReportSummary;
    genderRatio: GenderRatio;
    staffList: StaffList;
    rewardStatistic: RewardStatistic;
}

export interface ReportSummary {
    title: string;
    description?: string;
}

export interface GenderRatio {
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
