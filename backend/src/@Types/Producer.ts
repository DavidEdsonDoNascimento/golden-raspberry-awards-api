export type ViewModel = {
  min: Array<ProducerViewModel>;
  max: Array<ProducerViewModel>;
}

export type ProducerViewModel = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}