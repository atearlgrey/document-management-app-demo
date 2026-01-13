import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/**
 * Shared service để load data từ JSON files trong assets directory.
 * Hỗ trợ caching và error handling.
 */
@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) { }

  /**
   * Load data từ JSON file
   * @param jsonPath - Đường dẫn tương đối từ assets/ (ví dụ: 'data/reports/healthcare.json')
   * @returns Observable chứa data với type T
   */
  loadData<T>(jsonPath: string): Observable<T> {
    // Check cache trước
    if (this.cache.has(jsonPath)) {
      console.log(`[JsonDataService] Loading from cache: ${jsonPath}`);
      return of(this.cache.get(jsonPath) as T);
    }

    // Load từ file
    const fullPath = `${jsonPath}`;
    console.log(`[JsonDataService] Loading from file: ${fullPath}`);

    return this.http.get<T>(fullPath).pipe(
      tap(data => {
        // Cache data sau khi load thành công
        this.cache.set(jsonPath, data);
        console.log(`[JsonDataService] Cached data for: ${jsonPath}`);
      }),
      catchError(error => {
        console.error(`[JsonDataService] Error loading ${jsonPath}:`, error);
        return throwError(() => new Error(`Failed to load data from ${jsonPath}`));
      })
    );
  }

  /**
   * Load data với fallback nếu file không tồn tại
   * @param jsonPath - Đường dẫn tương đối từ assets/
   * @param fallbackData - Data mặc định nếu load thất bại
   * @returns Observable chứa data hoặc fallback data
   */
  loadDataWithFallback<T>(jsonPath: string, fallbackData: T): Observable<T> {
    return this.loadData<T>(jsonPath).pipe(
      catchError(error => {
        console.warn(`[JsonDataService] Using fallback data for ${jsonPath}`, error);
        return of(fallbackData);
      })
    );
  }

  /**
   * Lấy data từ cache (không load từ file)
   * @param jsonPath - Đường dẫn tương đối từ assets/
   * @returns Data đã cache hoặc null
   */
  getCachedData<T>(jsonPath: string): T | null {
    return this.cache.has(jsonPath) ? (this.cache.get(jsonPath) as T) : null;
  }

  /**
   * Clear toàn bộ cache
   */
  clearCache(): void {
    console.log('[JsonDataService] Clearing all cache');
    this.cache.clear();
  }

  /**
   * Clear cache cho một file cụ thể
   * @param jsonPath - Đường dẫn tương đối từ assets/
   */
  clearCacheForFile(jsonPath: string): void {
    if (this.cache.has(jsonPath)) {
      console.log(`[JsonDataService] Clearing cache for: ${jsonPath}`);
      this.cache.delete(jsonPath);
    }
  }

  /**
   * Check xem file đã được cache chưa
   * @param jsonPath - Đường dẫn tương đối từ assets/
   * @returns true nếu đã cache
   */
  isCached(jsonPath: string): boolean {
    return this.cache.has(jsonPath);
  }
}
