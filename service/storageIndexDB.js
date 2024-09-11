let db
function openDatabase(dbName, version) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version,);
  
      request.onerror = (event) => {
        reject(event.target.error); 
      };
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        // Crear almacén de objetos (si no existe)
        if (!db.objectStoreNames.contains('expenses')) {
          db.createObjectStore('expenses', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('categories')) {
          db.createObjectStore('categories', { keyPath: 'name' });
        }
      };
    
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }

  export function getDbInstance(){
    return db
  }

  export function setDbInstance(dbInstance){
    db = dbInstance
  }

  export async function initDB() {
    try {
      db = await openDatabase('miBaseDeDatos', 1);
      console.log('Base de datos abierta:', db);
      return db;
    } catch (e) {
      console.log('Error al abrir la base de datos:', e);
    }
  }

 