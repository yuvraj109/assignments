import { useState } from "react"

const useLocalStorage = (key: string, initialValue: any)=>{
    const [ storedValue, setStoredValue] = useState(()=> {
        try{
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
            
        }
        catch(error){
            console.error(`Error reading localStorage key`, error)
            return initialValue
        }
    })
    const setValue = (value: any) => {
        try {
              if (value){
                setStoredValue(value)
                window.localStorage.setItem( key, JSON.stringify(value))
              }
        }
        catch (error) {
            console.error(`Error setting localStorage key :`, error)
        }
    }
    return [storedValue, setValue] as const
}
export default useLocalStorage