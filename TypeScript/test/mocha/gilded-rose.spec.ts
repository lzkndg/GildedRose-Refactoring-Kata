import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';


describe('Gilded Rose', () => {
  // before(() => {  
  //   const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
  // });

  it('test item should have correct name', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('foo');
  });

  it('test item should have correct sellIn days', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(0);
  });

  it('test item should have correct sellIn days', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(0);
  });

  it('test item quality decreases twice as fast after sellIn days', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(8);
  });

  it('test item quality is never below zero', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  it('hand of ragnaros should not change quality or sellIn days', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);
  });

  it('aged brie should increase quality and decrease sellIn days', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(11);
  });

  it('aged brie increases quality twice as fast after sellIn days over', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(12);
  });

  it('aged brie does not increase quality over 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(50);
  });


  it('backstage passes increase quality by 1 if more than 10 days left', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(11);
    expect(items[0].quality).to.equal(11);
  });

  it('backstage passes increase quality by 2 if 5-10 days left', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 8, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(7);
    expect(items[0].quality).to.equal(12);
  });

  it('backstage passes increase quality by 3 if 0-4 days left', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(13);
  });

  it('backstage passes quality is 0 after sellIn is 0', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  it('conjured item quality degrades by 2', () => {
    const gildedRose = new GildedRose([new Item('Conjured Something', 10, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(8);
  });

  it('conjured item quality degrades by 4 after sellIn is 0', () => {
    const gildedRose = new GildedRose([new Item('Conjured Something', 0, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(6);
  });
});
