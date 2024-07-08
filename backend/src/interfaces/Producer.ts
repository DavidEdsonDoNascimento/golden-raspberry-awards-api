interface IViewModel {
  min: Array<IProducerViewModel>;
  max: Array<IProducerViewModel>;
}

interface IProducerViewModel {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export { IViewModel, IProducerViewModel };
