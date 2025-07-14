import { 
    debounce, 
    throttle, 
    deepMerge,
    PromiseChain,
    mockApiEndpoints,
    createSequentialFetcher,
    fetchWithRetry,
    customMap, 
    customFilter, 
    customReduce, 
    LocalStorageManager,
    isObject,
    isFunction,
    isString,
    isNumber,
    isBoolean,

    isArray,
    isNull,
    isUndefined,
    isEmpty,

    getType,
    getDetailedType
} from "./utility.js";


function searchItems(query) {
    const resultsContainer = document.getElementById('searchResults');
    
    if (!query.trim()) {
        resultsContainer.style.display = 'none';
        return;
    }
    
    resultsContainer.innerHTML = `
        <div style="padding: 20px; text-align: center; color: #666;">
            Searching for query: <strong>${query}</strong>
        </div>
    `;
    resultsContainer.style.display = 'block';
}

const debouncedSearch = debounce((query) => {
    console.log(`🔍 Debounced search: "${query}"`);
    searchItems(query);
}, 400);

let throttledCalls = 0;

function updateScrollIndicator(scrollTop) {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const scrollPercent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    
    const indicator = document.getElementById('scrollIndicator');
    if (indicator) {
        indicator.style.width = `${Math.max(0, Math.min(100, scrollPercent))}%`;
    }
    
    const scrollPercentDisplay = document.getElementById('scrollPercent');
    const throttleCount = document.getElementById('throttleCount');
    
    if (scrollPercentDisplay) {
        scrollPercentDisplay.textContent = scrollPercent.toFixed(1);
    }
    if (throttleCount) {
        throttleCount.textContent = throttledCalls;
    }
    
    console.log(`⚡ Throttled call #${throttledCalls}: ${scrollPercent.toFixed(1)}% progress`);
}

const throttledScrollHandler = throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    throttledCalls++;
    updateScrollIndicator(scrollTop);
}, 100);

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');
    
    if (!searchInput) return;
    
  
    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar-search')) {
            resultsContainer.style.display = 'none';
        }
    });
    
}

function initializeThrottle() {
    window.addEventListener('scroll', throttledScrollHandler);
    
}

function testArrayMethods() {
    const arrayInput = document.getElementById('arrayInput');
    const arrayResults = document.getElementById('arrayResults');
    
    if (!arrayInput || !arrayResults) return;
    
    try {
        const numbers = arrayInput.value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
        
        if (numbers.length === 0) {
            alert('Please enter valid numbers separated by commas');
            return;
        }
        
        const mapped = customMap(numbers, x => x * 2);
        const filtered = customFilter(numbers, x => x % 2 === 0);
        const sum = customReduce(numbers, (acc, x) => acc + x, 0);
        
        document.getElementById('originalArray').textContent = `[${numbers.join(', ')}]`;
        document.getElementById('mapResult').textContent = `[${mapped.join(', ')}]`;
        document.getElementById('filterResult').textContent = `[${filtered.join(', ')}]`;

        document.getElementById('reduceResult').textContent = sum;
        
        arrayResults.style.display = 'block';
        
        // console.log('Array Methods Test:');
        // console.log(`Original: [${numbers.join(', ')}]`);
        // console.log(`Map (×2): [${mapped.join(', ')}]`);
        // console.log(`Filter (even): [${filtered.join(', ')}]`);
        // console.log(`Reduce (sum): ${sum}`);
        
    } catch (error) {
        alert('Error: Please enter valid numbers separated by commas');
    }
}

function initializeArrayMethods() {
    const arrayTestBtn = document.getElementById('arrayTest');
    
    if (arrayTestBtn) {
        arrayTestBtn.addEventListener('click', testArrayMethods);
        console.log(' Array methods functionality initialized');
    }
}

function handleStorageSet() {
    const keyInput = document.getElementById('storageKey');
    const valueInput = document.getElementById('storageValue');
    const resultsDiv = document.getElementById('storageResults');
    const outputDiv = document.getElementById('storageOutput');
    
    const key = keyInput.value.trim();
    const valueStr = valueInput.value.trim();
    
    if (!key) {
        alert('Please enter a key');
        return;
    }
    
    if (!valueStr) {
        alert('Please enter a value');
        return;
    }
    
    try {
        let value;
        try {
            value = JSON.parse(valueStr);
        } catch {
            value = valueStr;
        }
        
        const success = LocalStorageManager.set(key, value);
        
        if (success) {
            outputDiv.innerHTML = `<div style="color: green;"> Successfully stored "${key}"</div>`;
            console.log(`Stored: ${key} =`, value);
        } else {
            outputDiv.innerHTML = `<div style="color: red;"> Failed to store "${key}"</div>`;
        }
        
        resultsDiv.style.display = 'block';
    } catch (error) {
        outputDiv.innerHTML = `<div style="color: red;"> Error: ${error.message}</div>`;
        resultsDiv.style.display = 'block';
    }
}

function handleStorageGet() {
    const keyInput = document.getElementById('storageKey');
    const resultsDiv = document.getElementById('storageResults');
    const outputDiv = document.getElementById('storageOutput');
    
    const key = keyInput.value.trim();
    
    if (!key) {
        alert('Please enter a key');
        return;
    }
    
    const value = LocalStorageManager.get(key);
    
    if (value !== null) {
        outputDiv.innerHTML = `
            <div style="color: blue;"> Retrieved "${key}":</div>
            <pre style="margin: 10px 0; padding: 10px; background: white; border-radius: 4px;">${JSON.stringify(value, null, 2)}</pre>
        `;
        console.log(` Retrieved: ${key} =`, value);
    } else {
        outputDiv.innerHTML = `<div style="color: orange;"> No value found for "${key}"</div>`;
    }
    
    resultsDiv.style.display = 'block';
}

function handleStorageRemove() {
    const keyInput = document.getElementById('storageKey');
    const resultsDiv = document.getElementById('storageResults');
    const outputDiv = document.getElementById('storageOutput');
    
    const key = keyInput.value.trim();
    
    if (!key) {
        alert('Please enter a key');
        return;
    }
    
    const success = LocalStorageManager.remove(key);
    
    if (success) {
        outputDiv.innerHTML = `<div style="color: green;"> Successfully removed "${key}"</div>`;
        console.log(` Removed: ${key}`);
    } else {
        outputDiv.innerHTML = `<div style="color: red;"> Failed to remove "${key}"</div>`;
    }
    
    resultsDiv.style.display = 'block';
}

function initializeLocalStorage() {
    const setBtn = document.getElementById('setStorage');
    const getBtn = document.getElementById('getStorage');
    const removeBtn = document.getElementById('removeStorage');
    
    if (setBtn) setBtn.addEventListener('click', handleStorageSet);
    if (getBtn) getBtn.addEventListener('click', handleStorageGet);
    if (removeBtn) removeBtn.addEventListener('click', handleStorageRemove);

    console.log('LocalStorage functionality initialized');
}

function parseInputValue(input) {
    const trimmed = input.trim();
    
    if (!trimmed) return undefined;
    
    try {
        return JSON.parse(trimmed);
    } catch (e) {
        if (trimmed === 'undefined') return undefined;
        if (trimmed.startsWith('function') || trimmed.includes('=>')) {
            return () => 'sample function';
        }
        if (trimmed === 'new Date()') {
            return new Date();
        }
        if (trimmed === 'new RegExp()' || trimmed.startsWith('/') && trimmed.endsWith('/')) {
            return /sample/;
        }
        
        return trimmed;
    }
}

function handleTypeCheck() {
    const input = document.getElementById('typeInput').value;
    const resultsDiv = document.getElementById('typeResults');
    const outputDiv = document.getElementById('typeOutput');
    
    if (!input.trim()) {
        alert('Please enter a value to check');
        return;
    }
    
    try {
        const value = parseInputValue(input);
        const type = getType(value);
        
        outputDiv.innerHTML = `<div style="font-size: 24px; font-weight: bold; color: #007bff; text-align: center; padding: 20px;">${type}</div>`;
        
        console.log(' Type check for:', input, '→', type);
        
    } catch (error) {
        outputDiv.innerHTML = `<div style="color: red;"> Error parsing input: ${error.message}</div>`;
        console.error('Type check error:', error);
    }
    
    resultsDiv.style.display = 'block';
}

function handleAllTypeChecks() {
    const testValues = [
        'null',
        'undefined', 
        '"hello world"',
        '42',
        'true',
        '[1, 2, 3]',
        '{"name": "John", "age": 30}',
        '""',
        '[]',
        '{}',
        'new Date()',
        '() => "function"'
    ];
    
    const resultsDiv = document.getElementById('typeResults');
    const outputDiv = document.getElementById('typeOutput');
    
    let html = '<div style="font-family: monospace;">';
    html += '<div style="color: #333; font-weight: bold; margin-bottom: 15px;"> Complete Type Check Demo</div>';
    
    testValues.forEach(testInput => {
        try {
            const value = parseInputValue(testInput);
            const basicType = getType(value);
            const detailedType = getDetailedType(value);
            const empty = isEmpty(value);
            
            html += `<div style="margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #007bff; border-radius: 4px;">`;
               html += `<div style="font-weight: bold; color: #0066cc;">Input: ${testInput}</div>`;
            html += `<div>Value: <span style="color: #28a745;">${JSON.stringify(value)}</span></div>`;
            html += `<div>Basic Type: <span style="color: #dc3545; font-weight: bold;">"${basicType}"</span></div>`;
              html += `<div>Detailed Type: <span style="color: #6f42c1; font-weight: bold;">"${detailedType}"</span></div>`;
            html += `<div>Is Empty: <span style="color: ${empty ? '#ffc107' : '#28a745'};">${empty ?  '': ''} ${empty}</span></div>`;
            html += `</div>`;
            
        } catch (error) {
            html += `<div style="margin: 10px 0; padding: 10px; background: #ffe6e6; border-left: 4px solid #dc3545; border-radius: 4px;">`;
            html += `<div style="font-weight: bold; color: #dc3545;">Input: ${testInput}</div>`;
            html += `<div style="color: red;"> Error: ${error.message}</div>`;
            html += `</div>`;
        }
    });
    
    html += '</div>';
    
    outputDiv.innerHTML = html;
    resultsDiv.style.display = 'block';
    
    console.log('🔍 Complete type check demo executed');
}

function initializeTypeCheckers() {
    const checkBtn = document.getElementById('checkType');
    const checkAllBtn = document.getElementById('checkAllTypes');
    
    if (checkBtn) checkBtn.addEventListener('click', handleTypeCheck);
    if (checkAllBtn) checkAllBtn.addEventListener('click', handleAllTypeChecks);
    
    console.log(' Type checker functionality initialized');
}

function parseObjectInput(input) {
    try {
        return JSON.parse(input.trim());
    } catch (error) {
        throw new Error(`Invalid JSON: ${error.message}`);
    }
}

function handleDeepMerge() {
    const targetInput = document.getElementById('targetObject');
    const sourceInput = document.getElementById('sourceObject');
    const resultsDiv = document.getElementById('deepMergeResults');
    const mergeResult = document.getElementById('mergeResult');
    
    const targetStr = targetInput.value.trim();
    const sourceStr = sourceInput.value.trim();
    
    if (!targetStr || !sourceStr) {
        alert('Please enter both target and source objects');
        return;
    }
    
    try {
        const target = parseObjectInput(targetStr);
        const source = parseObjectInput(sourceStr);
        
        const merged = deepMerge(target, source);

        mergeResult.textContent = JSON.stringify(merged, null, 2);
        
        resultsDiv.style.display = 'block';
        
        console.log(' Deep Merge Test:');
        console.log('Target:', target);
        console.log('Source:', source);
        console.log('Merged:', merged);
        
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Deep merge error:', error);
    }
}

function initializeDeepMerge() {
    const deepMergeBtn = document.getElementById('deepMergeTest');
    
    if (deepMergeBtn) {
        deepMergeBtn.addEventListener('click', handleDeepMerge);
        console.log('Deep merge functionality initialized');
    }
}

let currentChain = null;

function updateProgress(current, total) {
    const progressBar = document.getElementById('progressBar');
    const statusDiv = document.getElementById('promiseStatus');
    const progressContainer = document.getElementById('promiseProgress');
    
    if (progressBar && statusDiv) {
        const percentage = total > 0 ? (current / total) * 100 : 0;
        progressBar.style.width = `${percentage}%`;
        statusDiv.textContent = `Progress: ${current}/${total} requests completed (${percentage.toFixed(1)}%)`;
        progressContainer.style.display = 'block';
        statusDiv.style.display = 'block';
    }
}

function displayResults(summary, results, errors) {
    const resultsDiv = document.getElementById('promiseResults');
    const outputDiv = document.getElementById('promiseOutput');
    
    let html = '<div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">';
    
    if (results.length > 0) {
        results.forEach(result => {
            if (result.data && result.data.location && result.data.current) {
                const location = result.data.location;
                const current = result.data.current;
                html += `<div style="flex: 1; min-width: 250px; max-width: 350px; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">`;
                html += `<div style="font-weight: bold; font-size: 18px; margin-bottom: 10px;">${location.name}</div>`;
                html += `<div style="margin: 5px 0; color: #666;"><strong>Region:</strong> ${location.region}</div>`;
                 html += `<div style="margin: 5px 0; color: #666;"><strong>Country:</strong> ${location.country}</div>`;
                html += `<div style="margin: 5px 0; color: #666;"><strong>Temperature:</strong> ${current.temp_c}°C (${current.temp_f}°F)</div>`;
                  html += `<div style="margin: 5px 0; color: #666;"><strong>Condition:</strong> ${current.condition.text}</div>`;
                html += `<div style="margin: 5px 0; color: #666;"><strong>Humidity:</strong> ${current.humidity}%</div>`;
                html += `<div style="margin: 5px 0;  color: #666;"><strong>Wind:</strong> ${current.wind_kph} km/h ${current.wind_dir}</div>`;
                html += '</div>';
            } else {
                html += `<div style="flex: 1; min-width: 200px; max-width: 300px; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-left: 4px solid #dc3545;">`;
                html += `<div style="font-weight: bold; color: #dc3545; font-size: 16px;">No data found</div>`;
                 html += '</div>';
            }
        });
    }
    
    if (errors.length > 0) {
        errors.forEach(error => {
            html += `<div style="flex: 1; min-width: 200px; max-width: 300px; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border-left: 4px solid #dc3545;">`;
            html += `<div style="font-weight: bold; color: #dc3545; font-size: 16px;">Error</div>`;
            html += `<div style="margin: 5px 0; color: #666; font-size: 12px;">${error.error}</div>`;
            html += '</div>';
        });
    }
    
    html += '</div>';
    
    outputDiv.innerHTML = html;
    resultsDiv.style.display = 'block';
}

async function executePromiseChain() {
    const executeBtn = document.getElementById('executeChain');
    const originalText = executeBtn.textContent;
    
    try {
        executeBtn.textContent = ' Executing...';
        executeBtn.disabled = true;
        
        const selectedApis = [];
        const checkboxes = {
            'apiMumbai': 'mumbai',
            'apiDelhi': 'delhi', 
            'apiBangalore': 'bangalore',
            'apiChennai': 'chennai',
            'apiKolkata': 'kolkata'
        };
        
        Object.entries(checkboxes).forEach(([id, endpoint]) => {
            const checkbox = document.getElementById(id);
            if (checkbox && checkbox.checked) {
                selectedApis.push(endpoint);
            }
        });
        
        if (selectedApis.length === 0) {
            alert('Please select at least one Indian city');
            return;
        }
        
        currentChain = createSequentialFetcher();
        
        selectedApis.forEach(endpoint => {
            const url = mockApiEndpoints[endpoint];
            currentChain.addRequest(url);
        });
        
        console.log(' Starting weather API chain for Indian cities:', selectedApis);
        
        updateProgress(0, selectedApis.length);
        
        const startTime = Date.now();
        const summary = await currentChain.execute();
        const endTime = Date.now();
        
        updateProgress(summary.completed, summary.total);
        
       
        displayResults(summary, currentChain.results, currentChain.errors);
        
        console.log(`🎉 Weather API chain completed in ${endTime - startTime}ms`);
        console.log('Summary:', summary);
        
    } catch (error) {
        console.error('Weather API chain error:', error);
        alert(`Error executing weather API chain: ${error.message}`);
    } finally {
        executeBtn.textContent = originalText;
        executeBtn.disabled = false;
    }
}

function initializePromiseChain() {
    const executeBtn = document.getElementById('executeChain');
    
    if (executeBtn) executeBtn.addEventListener('click', executePromiseChain);
    
    console.log('Promise chain functionality initialized');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log(' Main.js loading...');
    
    initializeSearch();
    initializeThrottle();
    initializeArrayMethods();
    initializeLocalStorage();
    initializeTypeCheckers();
    initializeDeepMerge();
    initializePromiseChain();
    
    // console.log('Demo ready! Try:');
    // console.log('   - Type in search box (debounced 300ms)');
    // console.log('  - Scroll page (throttled 100ms)');
    // console.log('   - Test array methods with numbers');
    // console.log('   - Use LocalStorage with JSON data');
    // console.log(' - Check types of various values');
    // console.log('   - Watch progress bar and counters');
    // console.log('   - Perform deep merge on objects');
    // console.log('   - Execute promise chains with progress tracking');
});