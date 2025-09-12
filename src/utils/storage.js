import { STORAGE_KEYS, ERROR_MESSAGES } from "./constants";
import { objectUtils, dateUtils } from "./helpers";

/**
 * Enhanced localStorage wrapper with error handling, encryption, and expiration
 */
class StorageManager {
  constructor(options = {}) {
    this.prefix = options.prefix || "aryapathshala_";
    this.enableEncryption = options.enableEncryption || false;
    this.defaultExpiration = options.defaultExpiration || null; // in milliseconds
    this.maxStorageSize = options.maxStorageSize || 5 * 1024 * 1024; // 5MB
    this.compressionEnabled = options.compressionEnabled || false;
  }

  /**
   * Check if localStorage is available
   */
  isAvailable() {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      console.warn("localStorage is not available:", error);
      return false;
    }
  }

  /**
   * Get storage usage information
   */
  getStorageInfo() {
    if (!this.isAvailable()) return null;

    let totalSize = 0;
    let itemCount = 0;
    const items = [];

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const value = localStorage.getItem(key);
        const size = new Blob([value]).size;
        totalSize += size;
        itemCount++;

        if (key.startsWith(this.prefix)) {
          items.push({
            key: key,
            size: size,
            sizeFormatted: this._formatBytes(size),
          });
        }
      }
    }

    return {
      totalSize,
      totalSizeFormatted: this._formatBytes(totalSize),
      itemCount,
      items,
      availableSpace: this.maxStorageSize - totalSize,
      usagePercentage: (totalSize / this.maxStorageSize) * 100,
    };
  }

  /**
   * Set item in localStorage with options
   */
  setItem(key, value, options = {}) {
    if (!this.isAvailable()) {
      throw new Error(ERROR_MESSAGES.STORAGE.ACCESS_DENIED);
    }

    try {
      const fullKey = this.prefix + key;
      const expiration = options.expiration || this.defaultExpiration;
      const encrypt = options.encrypt || this.enableEncryption;
      const compress = options.compress || this.compressionEnabled;

      // Prepare data object
      const dataObject = {
        value: value,
        timestamp: Date.now(),
        expiration: expiration ? Date.now() + expiration : null,
        version: "1.0",
        metadata: {
          encrypted: encrypt,
          compressed: compress,
          type: typeof value,
          ...options.metadata,
        },
      };

      let serializedData = JSON.stringify(dataObject);

      // Apply compression if enabled
      if (compress) {
        serializedData = this._compress(serializedData);
      }

      // Apply encryption if enabled
      if (encrypt) {
        serializedData = this._encrypt(serializedData);
      }

      // Check storage quota
      const size = new Blob([serializedData]).size;
      const storageInfo = this.getStorageInfo();

      if (storageInfo && storageInfo.availableSpace < size) {
        // Try to clean up expired items
        this.cleanup();

        // Check again
        const updatedInfo = this.getStorageInfo();
        if (updatedInfo && updatedInfo.availableSpace < size) {
          throw new Error(ERROR_MESSAGES.STORAGE.QUOTA_EXCEEDED);
        }
      }

      localStorage.setItem(fullKey, serializedData);
      return true;
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        throw new Error(ERROR_MESSAGES.STORAGE.QUOTA_EXCEEDED);
      }
      console.error("Error setting localStorage item:", error);
      throw error;
    }
  }

  /**
   * Get item from localStorage
   */
  getItem(key, defaultValue = null) {
    if (!this.isAvailable()) {
      return defaultValue;
    }

    try {
      const fullKey = this.prefix + key;
      let serializedData = localStorage.getItem(fullKey);

      if (!serializedData) {
        return defaultValue;
      }

      // Decrypt if needed (check if data starts with encryption marker)
      if (this.enableEncryption && this._isEncrypted(serializedData)) {
        serializedData = this._decrypt(serializedData);
      }

      // Decompress if needed
      if (this.compressionEnabled && this._isCompressed(serializedData)) {
        serializedData = this._decompress(serializedData);
      }

      const dataObject = JSON.parse(serializedData);

      // Check expiration
      if (dataObject.expiration && Date.now() > dataObject.expiration) {
        this.removeItem(key);
        return defaultValue;
      }

      return dataObject.value;
    } catch (error) {
      console.error("Error getting localStorage item:", error);

      // Try to recover by removing corrupted data
      this.removeItem(key);
      return defaultValue;
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key) {
    if (!this.isAvailable()) return false;

    try {
      const fullKey = this.prefix + key;
      localStorage.removeItem(fullKey);
      return true;
    } catch (error) {
      console.error("Error removing localStorage item:", error);
      return false;
    }
  }

  /**
   * Check if item exists and is not expired
   */
  hasItem(key) {
    if (!this.isAvailable()) return false;

    try {
      const fullKey = this.prefix + key;
      const item = localStorage.getItem(fullKey);

      if (!item) return false;

      // Quick expiration check without full deserialization
      const quickParse = JSON.parse(item);
      if (quickParse.expiration && Date.now() > quickParse.expiration) {
        this.removeItem(key);
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get all keys with prefix
   */
  getAllKeys() {
    if (!this.isAvailable()) return [];

    const keys = [];
    for (let key in localStorage) {
      if (key.startsWith(this.prefix)) {
        keys.push(key.substring(this.prefix.length));
      }
    }
    return keys;
  }

  /**
   * Get multiple items at once
   */
  getMultiple(keys, defaultValue = null) {
    const result = {};
    keys.forEach((key) => {
      result[key] = this.getItem(key, defaultValue);
    });
    return result;
  }

  /**
   * Set multiple items at once
   */
  setMultiple(items, options = {}) {
    const results = {};
    for (let [key, value] of Object.entries(items)) {
      try {
        results[key] = this.setItem(key, value, options);
      } catch (error) {
        results[key] = false;
        console.error(`Error setting ${key}:`, error);
      }
    }
    return results;
  }

  /**
   * Update existing item (merge for objects)
   */
  updateItem(key, updater, options = {}) {
    const currentValue = this.getItem(key);

    if (typeof updater === "function") {
      const newValue = updater(currentValue);
      return this.setItem(key, newValue, options);
    } else if (
      typeof updater === "object" &&
      typeof currentValue === "object"
    ) {
      const mergedValue = objectUtils.deepMerge(currentValue || {}, updater);
      return this.setItem(key, mergedValue, options);
    } else {
      return this.setItem(key, updater, options);
    }
  }

  /**
   * Clean up expired items
   */
  cleanup() {
    if (!this.isAvailable()) return 0;

    let cleanedCount = 0;
    const keysToRemove = [];

    for (let key in localStorage) {
      if (key.startsWith(this.prefix)) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          if (data.expiration && Date.now() > data.expiration) {
            keysToRemove.push(key);
          }
        } catch (error) {
          // Remove corrupted data
          keysToRemove.push(key);
        }
      }
    }

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
      cleanedCount++;
    });

    return cleanedCount;
  }

  /**
   * Clear all items with prefix
   */
  clear() {
    if (!this.isAvailable()) return false;

    const keysToRemove = this.getAllKeys();
    keysToRemove.forEach((key) => {
      this.removeItem(key);
    });

    return true;
  }

  /**
   * Export all data
   */
  exportData() {
    if (!this.isAvailable()) return null;

    const data = {};
    const keys = this.getAllKeys();

    keys.forEach((key) => {
      data[key] = this.getItem(key);
    });

    return {
      data,
      exportDate: new Date().toISOString(),
      version: "1.0",
      prefix: this.prefix,
    };
  }

  /**
   * Import data
   */
  importData(exportedData, options = {}) {
    if (!exportedData || !exportedData.data) {
      throw new Error("Invalid import data format");
    }

    const { overwrite = false } = options;
    const results = {};

    for (let [key, value] of Object.entries(exportedData.data)) {
      try {
        if (!overwrite && this.hasItem(key)) {
          results[key] = { success: false, error: "Item already exists" };
          continue;
        }

        this.setItem(key, value);
        results[key] = { success: true };
      } catch (error) {
        results[key] = { success: false, error: error.message };
      }
    }
  }
}
