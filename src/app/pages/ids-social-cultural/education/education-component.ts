import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIChart } from 'primeng/chart';
import { Education } from '@/core/models/education.model';
import { JsonDataService } from '@/core/services/json-data.service';

@Component({
    selector: 'app-social-cultural-education',
    standalone: true,
    imports: [CommonModule, UIChart],
    templateUrl: './education-component.html',
    styleUrls: ['./education-component.scss']
})
export class EducationComponent implements OnInit {
    educationData: Education | null = null;
    doughnutOptions: any;
    barOptions: any;
    barOptions2: any;

    constructor(private jsonDataService: JsonDataService) {
    }

    ngOnInit(): void {
        this.initData();
    }

    initData(): void {
        this.jsonDataService.loadData<Education>('data/social-cultural/education.json')
            .subscribe({
                next: (data) => {
                    this.educationData = data;
                },
                error: (err) => {
                }
            });

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
        this.doughnutOptions = {
            responsive: true,              // 🔴 bắt buộc
            maintainAspectRatio: true,    // 🔴 cho phép scale theo container
            cutout: '50%',
            plugins: {
                legend: {
                    position: 'right', // 👉 hiển thị bên phải
                    labels: {
                        color: textColor,
                        usePointStyle: true,   // 👉 dùng chấm thay vì ô vuông
                        pointStyle: 'circle',  // 👉 chấm tròn
                        padding: 20            // 👉 giãn khoảng cách cho đẹp
                    }
                },
                datalabels: {
                    display: false
                }
            }
        };

        this.barOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                datalabels: {
                    display: true,
                    color: '#fff',
                    // anchor: 'end',   // neo vào point
                    // align: 'top',    // hiện phía trên
                    offset: 4,
                    font: {
                        // weight: 'bold',
                        size: 12
                    },
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        this.barOptions2 = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    display: true,
                    color: '#595959',
                    anchor: 'end',   // neo vào point
                    align: 'top',    // hiện phía trên
                    offset: 4,
                    font: {
                        // weight: 'bold',
                        size: 12
                    },
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    grace: '20%',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}
