export function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}



export function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}



export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(deepClone);
  if (obj instanceof Set) return new Set([...obj].map(deepClone));
  if (obj instanceof Map)
    return new Map([...obj.entries()].map(([k, v]) => [deepClone(k), deepClone(v)]));

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}


export function deepMerge(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return source;
  }
  
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key]) && isObject(target[key])) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
}


export function isObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}


export function isFunction(val) {
  return typeof val === 'function';
}


export function isString(val) {
  return typeof val === 'string';
}


export function isNumber(val) {
  return typeof val === 'number' && !isNaN(val);
}


export function isBoolean(val) {
  return typeof val === 'boolean';
}


export function isArray(val) {
  return Array.isArray(val);
}

export function isNull(val) {
  return val === null;
}

export function isUndefined(val) {
  return typeof val === 'undefined';
}

export function isEmpty(val) {
  if (isNull(val) || isUndefined(val)) return true;
  if (isString(val) || isArray(val)) return val.length === 0;
  if (isObject(val)) return Object.keys(val).length === 0;
  return false;
}


export function getType(val) {

  if (val === null) return 'null';

  if (val === undefined) return 'undefined';
  if (Array.isArray(val)) return 'array';
  if (val instanceof Date) return 'date';
  if (val instanceof RegExp) return 'regexp';
  if (val instanceof Error) return 'error';
  return typeof val;
}


export function getDetailedType(val) {
  const basicType = getType(val);
  
  if (basicType === 'object') {

    const constructor = val.constructor;
    if (constructor && constructor.name) {
      return constructor.name.toLowerCase();
    }
  }
  
  return basicType;
}


export function customMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}


export function customFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}


export function customReduce(array, callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;
  

  if (accumulator === undefined) {
    accumulator = array[0];
    startIndex = 1;
  }
  
  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  
  return accumulator;
}

export const LocalStorageManager = {
  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value);

      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('LocalStorage set error:', error);
      return false;
    }
  },

  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('LocalStorage get error:', error);
      return null;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('LocalStorage remove error:', error);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('LocalStorage clear error:', error);
      return false;
    }
  },

  exists(key) {
    return localStorage.getItem(key) !== null;
  },

  getAllKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
    }
    return keys;
  },


  getSize() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }
};

export class PromiseChain {
  constructor() {
    this.requests = [];
    this.results = [];
    this.errors = [];
  }

  addRequest(url, options = {}) {
    this.requests.push({ url, options });
    return this;
  }

  async execute() {
    this.results = [];
    this.errors = [];
    
    for (let i = 0; i < this.requests.length; i++) {
      const { url, options } = this.requests[i];
      
      try {
        console.log(`🔗 Executing request ${i + 1}/${this.requests.length}: ${url}`);
        
        const response = await this.makeRequest(url, options);
        this.results.push({
          index: i,
          url,
          success: true,
          data: response,
          timestamp: new Date().toISOString()
        });
        
        if (i < this.requests.length - 1) {
          await this.delay(100);
        }
        
      } catch (error) {
        this.errors.push({
          index: i,
          url,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        
        console.error(` Request ${i + 1} failed:`, error.message);
      }
    }
    
    return {
      results: this.results,
      errors: this.errors,
      completed: this.results.length,
      failed: this.errors.length,
      total: this.requests.length
    };
  }

  async makeRequest(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  clear() {
    this.requests = [];
    this.results = [];
    this.errors = [];
    return this;
  }

  getSummary() {
    return {
      totalRequests: this.requests.length,
      completedRequests: this.results.length,
      failedRequests: this.errors.length,
      successRate: this.requests.length > 0 ? 
        (this.results.length / this.requests.length * 100).toFixed(1) + '%' : '0%'
    };
  }
}

export const mockApiEndpoints = {
  mumbai: 'https://api.weatherapi.com/v1/current.json?key=c24e406fac3341349c865006250806&q=Mumbai',
  delhi: 'https://api.weatherapi.com/v1/current.json?key=c24e406fac3341349c865006250806&q=Delhi',
  bangalore: 'https://api.weatherapi.com/v1/current.json?key=c24e406fac3341349c865006250806&q=Bangalore',
  chennai: 'https://api.weatherapi.com/v1/current.json?key=c24e406fac3341349c865006250806&q=Chennai',
  kolkata: 'https://api.weatherapi.com/v1/current.json?key=c24e406fac3341349c865006250806&q=Kolkata'
};

export function createSequentialFetcher() {
  return new PromiseChain();
}

export async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.log(`Attempt ${attempt}/${maxRetries} failed:`, error.message);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}

