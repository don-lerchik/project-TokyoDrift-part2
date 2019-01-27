const Randomize = {
  getInteger(min, max) {
    const rand = Math.floor(min + Math.random() * (max + 1 - min));
    return rand;
  },

  getString() {
    const rand = Math.random().toString(36).slice(2);
    return rand;
  },

  getArrayElem(array) {
    const rand = this.getInteger(0, array.length - 1);
    return array[rand];
  },

  getShuffleArray(array) {
    return [...array].sort(() => {
      return 0.5 - Math.random();
    });
  },

  getRandomArray(array) {
    const randArr = this.getShuffleArray(array).slice(0, this.getInteger(0, array.length - 1));
    return randArr;
  },

  getDateInInterval(countOfDays) {
    const today = Date.now();
    const past = new Date(today).setDate(new Date(today).getDate() - countOfDays);
    return this.getInteger(past, today);
  }
};

module.exports = Randomize;
