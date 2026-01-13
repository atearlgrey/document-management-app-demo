# JSON Data Service - Usage Guide

## Tổng quan

`JsonDataService` là một shared service để load data từ JSON files trong thư mục `assets/`. Service hỗ trợ caching, error handling, và type-safe với TypeScript generics.

## Cài đặt

Service đã được tạo với `providedIn: 'root'`, không cần import vào providers.

## Cấu trúc thư mục

```
src/
├── app/
│   └── core/
│       ├── services/
│       │   └── json-data.service.ts
│       └── models/
│           └── report.model.ts
└── assets/
    └── data/
        └── reports/
            ├── healthcare.json
            ├── education.json
            └── agriculture.json
```

## Sử dụng cơ bản

### 1. Import service và model

```typescript
import { JsonDataService } from '../../../core/services/json-data.service';
import { HealthcareReport } from '../../../core/models/report.model';
```

### 2. Inject service vào component

```typescript
export class HealthcareComponent implements OnInit {
  reportData: HealthcareReport | null = null;
  
  constructor(private jsonDataService: JsonDataService) {}
}
```

### 3. Load data

```typescript
ngOnInit(): void {
  this.jsonDataService.loadData<HealthcareReport>('data/reports/healthcare.json')
    .subscribe({
      next: (data) => {
        this.reportData = data;
        console.log('Data loaded:', data);
      },
      error: (err) => {
        console.error('Error loading data:', err);
      }
    });
}
```

## API Methods

### `loadData<T>(jsonPath: string): Observable<T>`

Load data từ JSON file. Tự động cache sau lần load đầu tiên.

```typescript
this.jsonDataService.loadData<HealthcareReport>('data/reports/healthcare.json')
  .subscribe(data => console.log(data));
```

### `loadDataWithFallback<T>(jsonPath: string, fallbackData: T): Observable<T>`

Load data với fallback nếu file không tồn tại.

```typescript
const fallback: HealthcareReport = { summary: {...}, statistics: [], charts: [] };
this.jsonDataService.loadDataWithFallback('data/reports/healthcare.json', fallback)
  .subscribe(data => console.log(data));
```

### `getCachedData<T>(jsonPath: string): T | null`

Lấy data từ cache (không load từ file).

```typescript
const cached = this.jsonDataService.getCachedData<HealthcareReport>('data/reports/healthcare.json');
if (cached) {
  console.log('Using cached data:', cached);
}
```

### `clearCache(): void`

Clear toàn bộ cache.

```typescript
this.jsonDataService.clearCache();
```

### `clearCacheForFile(jsonPath: string): void`

Clear cache cho một file cụ thể.

```typescript
this.jsonDataService.clearCacheForFile('data/reports/healthcare.json');
```

### `isCached(jsonPath: string): boolean`

Check xem file đã được cache chưa.

```typescript
if (this.jsonDataService.isCached('data/reports/healthcare.json')) {
  console.log('Data is cached');
}
```

## Ví dụ hoàn chỉnh

Xem file `healthcare-component.ts` để tham khảo ví dụ hoàn chỉnh với:
- Loading state management
- Error handling
- Reload functionality
- Type-safe data binding

## Tạo JSON data mới

### 1. Tạo interface trong `report.model.ts`

```typescript
export interface CustomReport {
  summary: ReportSummary;
  data: any[];
}
```

### 2. Tạo file JSON trong `assets/data/`

```json
{
  "summary": {
    "title": "Custom Report",
    "description": "Description here"
  },
  "data": []
}
```

### 3. Sử dụng trong component

```typescript
this.jsonDataService.loadData<CustomReport>('data/custom-report.json')
  .subscribe(data => this.customData = data);
```

## Best Practices

1. **Type Safety**: Luôn sử dụng TypeScript interfaces cho data
2. **Error Handling**: Xử lý errors trong subscribe callback
3. **Loading States**: Hiển thị loading indicator khi load data
4. **Cache Management**: Clear cache khi cần refresh data
5. **Path Convention**: Đặt JSON files trong `assets/data/` theo category

## Troubleshooting

### Data không load được

- Kiểm tra đường dẫn JSON file (relative từ `assets/`)
- Kiểm tra file có tồn tại trong `assets/` folder
- Xem console log để debug

### Cache không hoạt động

- Kiểm tra đã gọi `loadData()` chưa
- Sử dụng `isCached()` để verify
- Clear cache với `clearCache()` nếu cần reset
