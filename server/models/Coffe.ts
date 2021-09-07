const { v4: uuidv4 } = require('uuid');

declare type CoffeType = {
  id?: string;
  time?: Date;
  name: string;
  content: string;
  paid?: boolean;
  hash: string | null;
  preimage: string | null;
  request: string | null;
}

class Coffe {
  constructor(private coffes: CoffeType[] = []) {
    this.coffes = [];
  }
  public add({ time, name, content, paid, hash, preimage, request }: CoffeType) {
    const coffe: CoffeType = {
      id: uuidv4(),
      time: time || new Date(),
      name,
      content,
      paid: paid || false,
      hash: hash || null,
      preimage: preimage || null,
      request: request || null,
    };
    this.coffes.push(coffe);

    return coffe;
  }

  public findById(id: string) {
    return this.coffes.find(p => p.id === id);
  }

  public findByHash(hash: string) {
    return this.coffes.find(p => p.hash === hash);
  }

  public all() {
    return this.coffes;
  }

  public paid(hash: string) {
    let updatedCoffe;
    this.coffes = this.coffes.map(p => {
      if (p.hash === hash) {
        updatedCoffe = { ...p, paid: true };
        return updatedCoffe;
      }
      return p;
    });
    if (updatedCoffe) {
      return true;
    }
    return false;
  }
};

const coffes = new Coffe();

export default coffes;