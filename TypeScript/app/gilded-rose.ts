export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  getQualityChange(item, days) {
    if (item.name == 'Sulfuras, Hand of Ragnaros') return 0;
    if (item.name == 'Aged Brie') { 
      if (item.quality == 50) return 0;
      if (days > 0) return 1 
        else return 2;
    }
    if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      if (days > 10) return 1
      else if (days > 5) return 2
      else if (days > 0) return 3
      else return -item.quality;
    }
    if (item.name == 'Conjured') {
      
    }
    if (item.quality <= 0) return 0;
    if (days > 0) return -1
      else return -2;
  }

  getSellInDaysChange(item) {
    if (item.name == 'Sulfuras, Hand of Ragnaros') return 0;
      else return 1;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].quality = this.items[i].quality + this.getQualityChange(this.items[i], this.items[i].sellIn);
      this.items[i].sellIn = this.items[i].sellIn - this.getSellInDaysChange(this.items[i]);
    }
    return this.items;
  }
}
