class OfferData {
    price: number;
    size: number;

    constructor(price: number, size: number) {
        this.price = price;
        this.size = size;
    }
}

class OrderBook {
    sequence: number;
    bids:Array <OfferData>;
    asks: Array<OfferData>;

    constructor(sequence: number, bids: Array<OfferData>, asks: Array<OfferData>) {
        this.sequence = sequence;
        this.bids = bids;
        this.asks = asks;
    }
}

export { OfferData, OrderBook};