
export function getLocalKey(key) {
    const savedInStorage = localStorage.getItem(key)
  
    if (!savedInStorage) {
      return []
    }
  
    return JSON.parse(savedInStorage)
  }