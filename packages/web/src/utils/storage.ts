// src/utils/storage.ts
const TOKEN_KEY = 'fittrackr_token';
const USER_KEY = 'fittrackr_user';

class StorageUtils {
  private static instance: StorageUtils;
  private storage: Storage;

  private constructor() {
    this.storage = window.localStorage;
  }

  public static getInstance(): StorageUtils {
    if (!StorageUtils.instance) {
      StorageUtils.instance = new StorageUtils();
    }
    return StorageUtils.instance;
  }

  public getStoredToken(): string | null {
    try {
      return this.storage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  }

  public setStoredToken(token: string): void {
    try {
      this.storage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  }

  public removeStoredToken(): void {
    try {
      this.storage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  public getStoredUser<T>(): T | null {
    try {
      const user = this.storage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  }

  public setStoredUser<T>(user: T): void {
    try {
      this.storage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error storing user:', error);
    }
  }

  public removeStoredUser(): void {
    try {
      this.storage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }

  public clearStorage(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

// Export singleton instance methods
const storageUtils = StorageUtils.getInstance();

export const getStoredToken = () => storageUtils.getStoredToken();
export const setStoredToken = (token: string) => storageUtils.setStoredToken(token);
export const removeStoredToken = () => storageUtils.removeStoredToken();
export const getStoredUser = <T>() => storageUtils.getStoredUser<T>();
export const setStoredUser = <T>(user: T) => storageUtils.setStoredUser(user);
export const removeStoredUser = () => storageUtils.removeStoredUser();
export const clearStorage = () => storageUtils.clearStorage();
