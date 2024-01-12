export abstract class BaseStorageService {
  storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  };

  get(key: string): string {
    return this.storage.getItem(key) || '';
  };

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  };
}
