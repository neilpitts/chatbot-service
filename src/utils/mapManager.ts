export class MapManager<K, V> {
    private map: Map<K, V>;
  
    constructor(initialEntries?: readonly (readonly [K, V])[]) {
      this.map = new Map<K, V>(initialEntries);
    }
  
    public addItem(key: K, value: V): void {
      this.map.set(key, value);
    }
  
    public removeItem(key: K): boolean {
      return this.map.delete(key);
    }
  
    public getItem(key: K): V | undefined {
      return this.map.get(key);
    }
  
    public hasItem(key: K): boolean {
      return this.map.has(key);
    }
  
    public clearAll(): void {
      this.map.clear();
    }
  
    public getSize(): number {
      return this.map.size;
    }
  
    public printMap(): void {
      this.map.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
    }
  }
  